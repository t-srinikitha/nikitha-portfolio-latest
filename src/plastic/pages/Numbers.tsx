import { market, unitEconomics as ue } from "../data";
import { BASE, crore, project } from "../model";
import {
  BreakEvenStats,
  BreakEvenTable,
  Comparables,
  MarketSize,
  MissionCapital,
  ScenarioTable,
  base as s,
  missionTotal,
  missionUsd,
  scenarioRange,
  sizing,
} from "../sections";
import { Block, Conclusion, PageHead, Src, inr } from "../ui";

const deviceCost = ue.deviceCost.reduce((a, c) => a + c.v, 0);
const monthlyPrice = BASE.testsPerMonth * BASE.cartridgePrice;
const monthlyCost = BASE.testsPerMonth * BASE.cartridgeCost;
const pct = (price: number, cost: number) => `${Math.round(((price - cost) / price) * 100)}%`;
const L2 = (rupees: number) => (rupees / 1e5).toFixed(2);

const yearOne = {
  revenue: BASE.devicePrice + monthlyPrice * 12,
  cogs: deviceCost + monthlyCost * 12,
};
const later = { revenue: monthlyPrice * 12, cogs: monthlyCost * 12 };
const labPerYear = 5000 * BASE.testsPerMonth * 12;

const cashPositive = project(BASE).find((r) => r.cumulative > 0)?.year ?? null;

const assumptions = [
  { a: "Analyser price", v: ue.devicePrice, t: "Customer interviews in Stage 0; pilots in Stage 1" },
  { a: "Cartridge price", v: ue.cartridgePrice, t: "Customer interviews in Stage 0; pilots in Stage 1" },
  { a: "Tests per plant", v: `${BASE.testsPerMonth} a month`, t: "Pilots in Stage 1" },
  { a: "Cartridge COGS", v: inr(BASE.cartridgeCost), t: "Stage 0" },
  { a: "Analyser COGS", v: inr(deviceCost), t: "Prototypes in Stage 1" },
  { a: "Plants", v: "10 pilots in Year 2, 60 plants by Year 5", t: "Stages 1 and 2" },
  { a: "Food producers", v: "10 in Year 5, then 15 a year", t: "Stage 3" },
  { a: "Food research", v: "₹1 crore, Years 3 and 4", t: "Stage 3" },
  { a: "Removal pilot", v: "₹1 crore a year, Years 4 to 6", t: "Stage 4" },
  { a: "Operating costs", v: "₹1.5 crore a year", t: "Stage 1" },
];

export default function Numbers() {
  const brandShare = s.plantsAtBreakeven ? Math.round((s.plantsAtBreakeven / market.nationalBrandPlants) * 100) : null;

  return (
    <>
      <PageHead
        title="Business Model"
        lede={
          <p>
            PlasticOptics sells a benchtop analyser to bottling plants, followed by a monthly subscription of test
            cartridges. This page sets out the economics of one plant, the size of the market, the cash the first
            business requires, and the capital required for the full objective.
          </p>
        }
      />

      <Block id="revenue-model" title="Revenue Model">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border hair bg-[var(--po-paper)]">
            <h3 className="px-5 pt-5 font-medium">Benchtop analyser, one-time sale</h3>
            <table className="po-table mt-3">
              <tbody>
                <tr>
                  <td className="!pl-5">Market price</td>
                  <td className="r !pr-5">{ue.devicePrice}</td>
                </tr>
                <tr>
                  <td className="!pl-5">COGS</td>
                  <td className="r !pr-5">{inr(deviceCost)}</td>
                </tr>
                <tr className="em">
                  <td className="!pl-5 !border-b-0">Gross profit</td>
                  <td className="r !pr-5 !border-b-0 text-[var(--po-accent)]">
                    {inr(BASE.devicePrice - deviceCost)} ({pct(BASE.devicePrice, deviceCost)})
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="border hair bg-[var(--po-paper)]">
            <h3 className="px-5 pt-5 font-medium">Cartridge subscription, {BASE.testsPerMonth} tests a month</h3>
            <table className="po-table mt-3">
              <tbody>
                <tr>
                  <td className="!pl-5">Market price, per month</td>
                  <td className="r !pr-5">{inr(monthlyPrice)}</td>
                </tr>
                <tr>
                  <td className="!pl-5">COGS, per month</td>
                  <td className="r !pr-5">{inr(monthlyCost)}</td>
                </tr>
                <tr className="em">
                  <td className="!pl-5 !border-b-0">Gross profit, per month</td>
                  <td className="r !pr-5 !border-b-0 text-[var(--po-accent)]">
                    {inr(monthlyPrice - monthlyCost)} ({pct(monthlyPrice, monthlyCost)})
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Conclusion>
          The analyser is sold once, and the subscription continues for as long as the plant tests. A cartridge is
          priced at {ue.cartridgePrice} and a laboratory test costs {ue.labPerTest}.
        </Conclusion>
      </Block>

      <Block id="one-plant" title="Economics of One Plant">
        <table className="po-table max-w-[560px] text-[14px]">
          <thead>
            <tr>
              <th>₹ lakh</th>
              <th className="r">Year 1</th>
              <th className="r !whitespace-normal">Each later year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Revenue</td>
              <td className="r">{L2(yearOne.revenue)}</td>
              <td className="r">{L2(later.revenue)}</td>
            </tr>
            <tr>
              <td>COGS</td>
              <td className="r">{L2(yearOne.cogs)}</td>
              <td className="r">{L2(later.cogs)}</td>
            </tr>
            <tr className="em">
              <td>Gross profit</td>
              <td className="r">{L2(yearOne.revenue - yearOne.cogs)}</td>
              <td className="r">{L2(later.revenue - later.cogs)}</td>
            </tr>
            <tr>
              <td className="ink2">Cost to the plant of the same tests at a laboratory</td>
              <td className="r">{L2(labPerYear)}</td>
              <td className="r">{L2(labPerYear)}</td>
            </tr>
          </tbody>
        </table>
        <Conclusion>
          One plant generates ₹{L2(yearOne.revenue - yearOne.cogs)} lakh of gross profit in its first year and ₹
          {L2(later.revenue - later.cogs)} lakh in each later year. The plant pays less than half of what the same tests
          cost at a laboratory. Operating costs of ₹{(BASE.opexLakh / 100).toFixed(1)} crore a year are covered by the
          cartridge gross profit of {s.plantsToCover} plants.
        </Conclusion>
      </Block>

      <Block
        id="market-size"
        title="Market Size"
        intro={
          <p>
            These are back-of-the-envelope estimates. The bottled water figures are built from plant counts, volumes and
            PlasticOptics prices. The food and air figures are existing testing markets.
          </p>
        }
      >
        <MarketSize />
        <Conclusion>
          The bottling-plant analyser in India is a market of ₹{Math.round(sizing.indiaCart)} crore a year in cartridges.
          About {market.nationalBrandPlants} plants bottle for national brands and are the first buyers; Bisleri alone has
          128 <Src id="bisleri" />. These plants represent ₹{Math.round(sizing.brandCart)} crore a year in cartridges and ₹
          {Math.round(sizing.brandDevice)} crore in analysers. The count of {market.nationalBrandPlants} is an estimate
          and will be confirmed in customer interviews. Global sales and food and air testing are each larger markets
          than the first product.
        </Conclusion>
      </Block>

      <Block
        id="break-even"
        toc="Break-even"
        title="Break-even"
        intro={
          <p>
            This is the cash the company requires and the year in which it becomes profitable. Revenue comes from water
            plants from Year 3 and from food producers from Year {BASE.foodStart}. The removal pilot is a cost in this
            period and earns no revenue.
          </p>
        }
      >
        <BreakEvenStats />
        <div className="mt-8">
          <BreakEvenTable lastYear={8} />
        </div>
        <Conclusion>
          The company requires about ₹{(s.cashRequired / 100).toFixed(1)} crore and reaches operating profit in Year{" "}
          {s.breakeven}, with {s.plantsAtBreakeven} water plants and {s.foodAtBreakeven} food producers. The water plants
          are {brandShare}% of the estimated {market.nationalBrandPlants} plants that bottle for national brands.
          {cashPositive && (
            <>
              {" "}
              Cumulative cash turns positive in Year {cashPositive} if operating costs remain flat. Sales and service
              costs will rise as customers are added, so Year {cashPositive} is the earliest case.
            </>
          )}
        </Conclusion>

        <h3 className="mt-12 font-medium">Downside cases</h3>
        <div className="mt-3">
          <ScenarioTable />
        </div>
        <Conclusion>
          In each case the company reaches operating profit by Year {scenarioRange.latest} and requires between ₹
          {(scenarioRange.low / 100).toFixed(1)} crore and ₹{(scenarioRange.high / 100).toFixed(1)} crore. Slower sales
          and higher operating costs increase the cash required the most.
        </Conclusion>
      </Block>

      <Block
        id="total-capital"
        toc="Total Capital"
        title="Total Capital for the Full Objective"
        intro={
          <p>
            The objective is industrial-scale detection and removal of microplastics in water, food and air. The table
            is a back-of-the-envelope estimate of the capital this requires, by stage.
          </p>
        }
      >
        <MissionCapital />
        <p className="mt-2 text-[13.5px] muted max-w-[70ch]">
          The first line is the business case above. The other lines are estimates that will be revised as each
          stage is defined.
        </p>

        <h3 className="mt-10 font-medium">Capital raised by comparable companies</h3>
        <div className="mt-3">
          <Comparables />
        </div>
        <Conclusion>
          The full objective requires an estimated ₹{missionTotal.low}–{missionTotal.high} crore ({missionUsd}) over
          about ten years. Two-thirds of this is Stage 6, which is committed only after removal and in-line analysis
          have been demonstrated. Companies in the United Kingdom, the United States and Germany have each raised US$4–10 million to
          bring one microplastic product to early commercial scale.
        </Conclusion>
      </Block>

      <Block id="assumptions" title="Assumptions to be Tested">
        <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
          <table className="po-table text-[14px] min-w-[520px]">
            <thead>
              <tr>
                <th>Assumption</th>
                <th>Value used</th>
                <th>Tested in</th>
              </tr>
            </thead>
            <tbody>
              {assumptions.map((x) => (
                <tr key={x.a}>
                  <td className="font-medium whitespace-nowrap pr-4">{x.a}</td>
                  <td className="num">{x.v}</td>
                  <td className="ink2">{x.t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Conclusion>
          Every figure on this page is an estimate. Stage 0 tests the cartridge cost, and the pilots in Stage 1 test price
          and usage.
        </Conclusion>
      </Block>
    </>
  );
}
