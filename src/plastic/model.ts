// Operating model, ₹ lakh. A simple P&L by year:
//   revenue (devices + cartridges) − COGS = gross profit
//   gross profit − (R&D + G&A + sales & field service) = operating profit
// Base case: analyser ₹5 L price / ₹1.6 L cost, cartridge ₹1,000 price / ₹400
// cost at 360 tests a plant a year, and ₹1.5 Cr a year of operating costs (V2).
// Plants: 10 pilots in Year 2, 10 paying in Year 3, 15 in Year 4, then 25 a year. Pilot plants buy cartridges; their devices are pilot units
// funded by the Stage 1 raise, so they carry no device revenue or COGS.

export type Inputs = {
  devicePrice: number; // ₹
  deviceCost: number; // ₹
  cartridgePrice: number; // ₹
  cartridgeCost: number; // ₹
  testsPerYear: number; // per active plant
  rdLakh: number; // R&D, ₹ lakh a year
  gaLakh: number; // G&A, ₹ lakh a year
  salesLakh: number; // sales & field service, ₹ lakh a year
  pilotsY2: number;
  payingY3: number;
  payingY4: number;
  growth: number; // new paying plants a year from Year 5
};

export const BASE: Inputs = {
  devicePrice: 500000,
  deviceCost: 160000,
  cartridgePrice: 1000,
  cartridgeCost: 400,
  testsPerYear: 360,
  rdLakh: 70,
  gaLakh: 40,
  salesLakh: 40,
  pilotsY2: 10,
  payingY3: 10,
  payingY4: 15,
  growth: 25,
};

/** Capital raised across Stages 0–2, ₹ lakh. */
export const CAPITAL = { stage0: 23.3, stage1: 200, stage2: 1000 };
export const CAPITAL_TOTAL = CAPITAL.stage0 + CAPITAL.stage1 + CAPITAL.stage2;
export const HORIZON = 12;

export type Row = {
  year: number;
  newPaying: number;
  newPilot: number;
  active: number;
  deviceRev: number;
  cartRev: number;
  revenue: number;
  deviceCogs: number;
  cartCogs: number;
  cogs: number;
  gross: number;
  grossPct: number;
  rd: number;
  ga: number;
  sales: number;
  opex: number;
  operating: number;
  cumulative: number;
  recovered: number | null; // operating profit accumulated from operating break-even onwards
};

const r1 = (n: number) => Math.round(n * 10) / 10;
const L = (rupees: number) => rupees / 1e5;

export function opexOf(i: Inputs) {
  return i.rdLakh + i.gaLakh + i.salesLakh;
}

export function project(i: Inputs, lastYear = HORIZON): Row[] {
  const rows: Row[] = [];
  let active = 0;
  let cumulative = 0;
  let recovered: number | null = null;
  for (let year = 2; year <= lastYear; year++) {
    const newPilot = year === 2 ? i.pilotsY2 : 0;
    const newPaying = year === 3 ? i.payingY3 : year === 4 ? i.payingY4 : year >= 5 ? i.growth : 0;
    active += newPilot + newPaying;
    const tests = active * i.testsPerYear;
    const deviceRev = L(newPaying * i.devicePrice);
    const cartRev = L(tests * i.cartridgePrice);
    const deviceCogs = L(newPaying * i.deviceCost);
    const cartCogs = L(tests * i.cartridgeCost);
    const revenue = deviceRev + cartRev;
    const cogs = deviceCogs + cartCogs;
    const gross = revenue - cogs;
    const opex = opexOf(i);
    const operating = gross - opex;
    cumulative += operating;
    if (recovered === null && operating > 0) recovered = 0;
    if (recovered !== null) recovered += operating;
    rows.push({
      year,
      newPaying,
      newPilot,
      active,
      deviceRev: r1(deviceRev),
      cartRev: r1(cartRev),
      revenue: r1(revenue),
      deviceCogs: r1(deviceCogs),
      cartCogs: r1(cartCogs),
      cogs: r1(cogs),
      gross: r1(gross),
      grossPct: revenue > 0 ? Math.round((gross / revenue) * 100) : 0,
      rd: r1(i.rdLakh),
      ga: r1(i.gaLakh),
      sales: r1(i.salesLakh),
      opex: r1(opex),
      operating: r1(operating),
      cumulative: r1(cumulative),
      recovered: recovered === null ? null : r1(recovered),
    });
  }
  return rows;
}

export function summarise(i: Inputs, rows: Row[]) {
  const cartGrossPlant = L((i.cartridgePrice - i.cartridgeCost) * i.testsPerYear);
  const opex = opexOf(i);
  const plantsToCover = cartGrossPlant > 0 ? Math.ceil(opex / cartGrossPlant) : Infinity;
  const opBreakeven = rows.find((r) => r.operating > 0)?.year ?? null;
  const trough = Math.min(0, ...rows.map((r) => r.cumulative));
  const troughYear = rows.find((r) => r.cumulative === trough)?.year ?? null;
  const payback = rows.find((r, idx) => idx > 0 && r.cumulative >= 0 && rows[idx - 1].cumulative < 0)?.year ?? null;
  const opRow = rows.find((r) => r.operating > 0) ?? null;
  const investRow = rows.find((r) => r.recovered !== null && r.recovered >= CAPITAL_TOTAL) ?? null;
  const lossesBefore = r1(-rows.filter((r) => !opRow || r.year < opRow.year).reduce((a, r) => a + Math.min(0, r.operating), 0));
  return {
    cartGrossPlant: Math.round(cartGrossPlant * 100) / 100,
    opex,
    plantsToCover,
    opBreakeven,
    trough: r1(trough),
    troughYear,
    payback,
    plantsAtOpBreakeven: opRow?.active ?? null,
    investBreakeven: investRow?.year ?? null,
    plantsAtInvest: investRow?.active ?? null,
    lossesBefore,
  };
}

/** P&L row definitions shared by the Overview and Numbers tables. */
export const PNL_ROWS: { label: string; key: keyof Row; kind: "count" | "money" | "pct"; style?: "head" | "sub" | "total" | "key" }[] = [
  { label: "Active plants", key: "active", kind: "count", style: "head" },
  { label: "Revenue", key: "revenue", kind: "money", style: "total" },
  { label: "Devices", key: "deviceRev", kind: "money", style: "sub" },
  { label: "Cartridges", key: "cartRev", kind: "money", style: "sub" },
  { label: "Cost of goods", key: "cogs", kind: "money", style: "total" },
  { label: "Devices", key: "deviceCogs", kind: "money", style: "sub" },
  { label: "Cartridges", key: "cartCogs", kind: "money", style: "sub" },
  { label: "Gross profit", key: "gross", kind: "money", style: "total" },
  { label: "Gross margin", key: "grossPct", kind: "pct", style: "sub" },
  { label: "Operating costs", key: "opex", kind: "money", style: "total" },
  { label: "R&D", key: "rd", kind: "money", style: "sub" },
  { label: "G&A", key: "ga", kind: "money", style: "sub" },
  { label: "Sales & field service", key: "sales", kind: "money", style: "sub" },
  { label: "Operating profit", key: "operating", kind: "money", style: "key" },
  { label: "Cumulative", key: "cumulative", kind: "money", style: "total" },
];

export const PRESETS: { id: string; label: string; note: string; inputs: Inputs }[] = [
  { id: "base", label: "Base case", note: "35 plants by Year 4, then 25 new plants each year.", inputs: BASE },
  { id: "slow", label: "Slow growth", note: "15 new plants each year from Year 5.", inputs: { ...BASE, growth: 15 } },
  { id: "fast", label: "Fast growth", note: "40 new plants each year from Year 5.", inputs: { ...BASE, growth: 40 } },
  { id: "fewer", label: "Low usage", note: "180 tests per plant per year instead of 360.", inputs: { ...BASE, testsPerYear: 180 } },
];
