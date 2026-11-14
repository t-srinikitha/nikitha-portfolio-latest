// Operating model, ₹ lakh. A simple P&L by year:
//   revenue (devices + cartridges) − COGS = gross profit
//   gross profit − (R&D + G&A + sales & field service) = operating profit
// Defaults reproduce the V2 plan: device ₹3 L price / ₹1.6 L cost, cartridge
// ₹1,600 price / ₹400 cost at 360 tests a plant a year, and ₹1.5 Cr a year of
// operating costs. Pilot plants buy cartridges; their devices are pilot units
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
  devicePrice: 300000,
  deviceCost: 160000,
  cartridgePrice: 1600,
  cartridgeCost: 400,
  testsPerYear: 360,
  rdLakh: 70,
  gaLakh: 40,
  salesLakh: 40,
  pilotsY2: 10,
  payingY3: 10,
  payingY4: 15,
  growth: 0,
};

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
};

const r1 = (n: number) => Math.round(n * 10) / 10;
const L = (rupees: number) => rupees / 1e5;

export function opexOf(i: Inputs) {
  return i.rdLakh + i.gaLakh + i.salesLakh;
}

export function project(i: Inputs, lastYear = 8): Row[] {
  const rows: Row[] = [];
  let active = 0;
  let cumulative = 0;
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
  return {
    cartGrossPlant: Math.round(cartGrossPlant * 100) / 100,
    opex,
    plantsToCover,
    opBreakeven,
    trough: r1(trough),
    troughYear,
    payback,
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
  { id: "base", label: "V2 base case", note: "The plan as written: 35 plants by Year 4, no new plants after that.", inputs: BASE },
  { id: "growth", label: "Keep selling", note: "Same economics, with 15 new paying plants every year after Year 4: 50 plants in Year 5.", inputs: { ...BASE, growth: 15 } },
  { id: "cheap", label: "Cheaper cartridge", note: "Cartridge sells at ₹1,000, the bottom of the range.", inputs: { ...BASE, cartridgePrice: 1000 } },
  { id: "fewer", label: "Fewer tests", note: "Plants test every other day: 180 tests a year.", inputs: { ...BASE, testsPerYear: 180 } },
];
