// Break-even model. Defaults reproduce the V2 table exactly:
// device margin ₹1.4 L per paying plant (₹3 L price − ₹1.6 L cost),
// cartridge margin ₹4.32 L per active plant per year (₹1,600 − ₹400) × 360 tests.

export type Inputs = {
  devicePrice: number; // ₹
  deviceCost: number; // ₹
  cartridgePrice: number; // ₹
  cartridgeCost: number; // ₹
  testsPerYear: number; // per active plant
  fixedLakh: number; // ₹ lakh per year
  pilotsY2: number; // pilot plants in Year 2 (buy cartridges, not devices)
  payingY3: number;
  payingY4: number;
  growth: number; // new paying plants per year from Year 5
};

export const BASE: Inputs = {
  devicePrice: 300000,
  deviceCost: 160000,
  cartridgePrice: 1600,
  cartridgeCost: 400,
  testsPerYear: 360,
  fixedLakh: 150,
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
  device: number;
  cartridge: number;
  total: number;
  fixed: number;
  operating: number;
  cumulative: number;
};

const r1 = (n: number) => Math.round(n * 10) / 10;

export function project(i: Inputs, lastYear = 8): Row[] {
  const deviceMargin = (i.devicePrice - i.deviceCost) / 1e5;
  const cartMargin = ((i.cartridgePrice - i.cartridgeCost) * i.testsPerYear) / 1e5;
  const rows: Row[] = [];
  let active = 0;
  let cumulative = 0;
  for (let year = 2; year <= lastYear; year++) {
    const newPilot = year === 2 ? i.pilotsY2 : 0;
    const newPaying = year === 3 ? i.payingY3 : year === 4 ? i.payingY4 : year >= 5 ? i.growth : 0;
    active += newPilot + newPaying;
    const device = newPaying * deviceMargin;
    const cartridge = active * cartMargin;
    const total = device + cartridge;
    const operating = total - i.fixedLakh;
    cumulative += operating;
    rows.push({
      year,
      newPaying,
      newPilot,
      active,
      device: r1(device),
      cartridge: r1(cartridge),
      total: r1(total),
      fixed: r1(i.fixedLakh),
      operating: r1(operating),
      cumulative: r1(cumulative),
    });
  }
  return rows;
}

export function summarise(i: Inputs, rows: Row[]) {
  const cartMarginPlant = ((i.cartridgePrice - i.cartridgeCost) * i.testsPerYear) / 1e5;
  const plantsToCoverFixed = cartMarginPlant > 0 ? Math.ceil(i.fixedLakh / cartMarginPlant) : Infinity;
  const opBreakeven = rows.find((r) => r.operating > 0)?.year ?? null;
  const trough = Math.min(0, ...rows.map((r) => r.cumulative));
  const troughYear = rows.find((r) => r.cumulative === trough)?.year ?? null;
  const payback = rows.find((r, idx) => idx > 0 && r.cumulative >= 0 && rows[idx - 1].cumulative < 0)?.year ?? null;
  return { cartMarginPlant: Math.round(cartMarginPlant * 100) / 100, plantsToCoverFixed, opBreakeven, trough: r1(trough), troughYear, payback };
}

export const PRESETS: { id: string; label: string; note: string; inputs: Inputs }[] = [
  { id: "base", label: "V2 base case", note: "The table in the plan: 35 plants, no growth after Year 4.", inputs: BASE },
  { id: "growth", label: "Keep selling", note: "Same economics, but 15 new paying plants every year after Year 4.", inputs: { ...BASE, growth: 15 } },
  { id: "cheap", label: "Cheaper cartridge", note: "Cartridge sells at ₹1,000, the bottom of the range.", inputs: { ...BASE, cartridgePrice: 1000 } },
  { id: "fewer", label: "Fewer tests", note: "Plants test every other day: 180 tests a year.", inputs: { ...BASE, testsPerYear: 180 } },
];
