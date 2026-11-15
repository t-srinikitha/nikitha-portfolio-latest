// Break-even of the benchtop analyser business on its own, ₹ lakh unless stated.
// Revenue: the benchtop analyser and cartridge subscription, sold to bottling
// plants. Research for later stages (food, in-line analysis, removal) is not
// included; it is funded separately.
//
//   revenue (analysers + cartridges) − COGS = gross profit
//   gross profit − operating costs = operating profit
//   operating profit − one-time costs (validation, product development) = cash flow
//
// Cash required is the lowest point of cumulative cash flow plus a reserve for
// inventory, receivables and contingency.
// Year 1 is technology validation followed by the start of product development.
// Pilot plants receive their analyser as part of product development and buy cartridges.

export type Inputs = {
  devicePrice: number; // ₹
  deviceCost: number; // ₹
  cartridgePrice: number; // ₹
  cartridgeCost: number; // ₹
  testsPerMonth: number; // cartridges per active plant
  opexLakh: number; // operating costs a year from Year 2
  opexY1Lakh: number; // operating costs in Year 1, after validation
  validationLakh: number; // Stage 0, Year 1
  developmentLakh: [number, number]; // prototypes, pilot analysers, patent, method validation: Year 1, Year 2
  pilotsY2: number;
  payingY3: number;
  payingY4: number;
  growth: number; // new paying plants a year from Year 5
  reservePct: number; // inventory, receivables and contingency, % of the cumulative deficit
};

export const BASE: Inputs = {
  devicePrice: 500000,
  deviceCost: 160000,
  cartridgePrice: 1000,
  cartridgeCost: 400,
  testsPerMonth: 30,
  opexLakh: 150,
  opexY1Lakh: 75,
  validationLakh: 23.8,
  developmentLakh: [40, 60],
  pilotsY2: 10,
  payingY3: 10,
  payingY4: 15,
  growth: 25,
  reservePct: 20,
};

export const HORIZON = 12;

export type Row = {
  year: number;
  newPaying: number;
  newPilot: number;
  active: number;
  deviceRev: number;
  cartRev: number;
  revenue: number;
  gross: number;
  opex: number;
  operating: number;
  oneTime: number;
  cash: number;
  cumulative: number;
};

const r1 = (n: number) => Math.round(n * 10) / 10;
const L = (rupees: number) => rupees / 1e5;

export function project(i: Inputs, lastYear = HORIZON): Row[] {
  const rows: Row[] = [];
  let active = 0;
  let cumulative = 0;
  for (let year = 1; year <= lastYear; year++) {
    const newPilot = year === 2 ? i.pilotsY2 : 0;
    const newPaying = year === 3 ? i.payingY3 : year === 4 ? i.payingY4 : year >= 5 ? i.growth : 0;
    active += newPilot + newPaying;
    const tests = active * i.testsPerMonth * 12;
    const deviceRev = L(newPaying * i.devicePrice);
    const cartRev = L(tests * i.cartridgePrice);
    const revenue = deviceRev + cartRev;
    const gross = revenue - L(newPaying * i.deviceCost) - L(tests * i.cartridgeCost);
    const opex = year === 1 ? i.opexY1Lakh : i.opexLakh;
    const operating = gross - opex;
    const oneTime = year === 1 ? i.validationLakh + i.developmentLakh[0] : year === 2 ? i.developmentLakh[1] : 0;
    const cash = operating - oneTime;
    cumulative += cash;
    rows.push({
      year,
      newPaying,
      newPilot,
      active,
      deviceRev: r1(deviceRev),
      cartRev: r1(cartRev),
      revenue: r1(revenue),
      gross: r1(gross),
      opex: r1(opex),
      operating: r1(operating),
      oneTime: r1(oneTime),
      cash: r1(cash),
      cumulative: r1(cumulative),
    });
  }
  return rows;
}

export function summarise(i: Inputs, rows: Row[]) {
  const testsPerYear = i.testsPerMonth * 12;
  const cartRevPlant = L(i.cartridgePrice * testsPerYear);
  const cartGrossPlant = L((i.cartridgePrice - i.cartridgeCost) * testsPerYear);
  const deviceGross = L(i.devicePrice - i.deviceCost);
  const be = rows.find((r) => r.operating > 0) ?? null;
  const deficit = -Math.min(0, ...rows.map((r) => r.cumulative));
  const reserve = (deficit * i.reservePct) / 100;
  return {
    cartRevPlant: Math.round(cartRevPlant * 100) / 100,
    cartGrossPlant: Math.round(cartGrossPlant * 100) / 100,
    deviceGross: Math.round(deviceGross * 100) / 100,
    plantsToCover: cartGrossPlant > 0 ? Math.ceil(i.opexLakh / cartGrossPlant) : Infinity,
    breakeven: be?.year ?? null,
    plantsAtBreakeven: be?.active ?? null,
    revenueAtBreakeven: be?.revenue ?? null,
    operatingAtBreakeven: be?.operating ?? null,
    deficit: r1(deficit),
    reserve: r1(reserve),
    cashRequired: r1(deficit + reserve),
    oneTime: r1(i.validationLakh + i.developmentLakh[0] + i.developmentLakh[1]),
  };
}

/** Downside cases for the same business. */
export const SCENARIOS: { id: string; label: string; change: string; inputs: Inputs }[] = [
  { id: "base", label: "Base case", change: "30 tests a month; 60 plants by Year 5", inputs: BASE },
  { id: "usage", label: "Half the testing", change: "15 tests a month per plant", inputs: { ...BASE, testsPerMonth: 15 } },
  {
    id: "sales",
    label: "Half the sales",
    change: "Half as many plants each year",
    inputs: { ...BASE, pilotsY2: 5, payingY3: 5, payingY4: 8, growth: 12 },
  },
  { id: "price", label: "Lower cartridge price", change: "₹800 per cartridge", inputs: { ...BASE, cartridgePrice: 800 } },
  { id: "cost", label: "Higher operating costs", change: "₹2 Cr a year", inputs: { ...BASE, opexLakh: 200, opexY1Lakh: 100 } },
];

export const crore = (lakh: number, d = 1) => `₹${(lakh / 100).toFixed(d)} Cr`;
