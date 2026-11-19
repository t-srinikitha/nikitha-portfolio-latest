import { incumbent, landedCost, market, prices } from "../data";
import { BreakEvenTable, MarketSize, sizing } from "../sections";
import { Block, Conclusion, PageHead, inr, Sub } from "../ui";

const cards = [
  {
    title: "Benchtop analyser",
    rows: [
      ["Price", "₹8,00,000"],
      ["Landed cost", "₹1,60,000"],
    ],
    margin: "80%",
  },
  {
    title: "Test cartridge",
    rows: [
      ["Price", "₹2,000"],
      ["Landed cost", "₹400"],
    ],
    margin: "80%",
  },
];

const assumptions = [
  { a: "Analyser price", v: "₹8 lakh", t: "Pilots in Stage 1" },
  { a: "Cartridge price", v: "₹2,000", t: "Pilots in Stage 1" },
  { a: "Tests per plant", v: "360 a year", t: "Pilots in Stage 1" },
  { a: "Cartridge landed cost", v: "₹400", t: "Stage 0" },
  { a: "Analyser landed cost", v: "₹1.6 lakh", t: "Prototypes in Stage 1" },
  {
    a: "Active plants",
    v: "20 in Year 3, 60 in Year 4, 120 in Year 5",
    t: "Stage 2",
  },
];

export default function Numbers() {
  return (
    <>
      <PageHead
        title="Business Model"
        lede={
          <p>
            PlasticOptics sells a benchtop analyser and single-use test cartridges, with service and maintenance. This
            page sets out the prices, the input costs, the revenue of the benchtop analyser business and the size of the
            market.
          </p>
        }
      />

      <Block id="pricing" title="Pricing and Unit Economics">
        <Sub id="revenue-model" title="Revenue Model">
          <div className="grid md:grid-cols-2 gap-4">
            {cards.map((c) => (
              <div key={c.title} className="border hair bg-[var(--po-paper)]">
                <h4 className="px-5 pt-5 font-medium">{c.title}</h4>
                <table className="po-table mt-3">
                  <tbody>
                    {c.rows.map(([k, v]) => (
                      <tr key={k}>
                        <td className="!pl-5">{k}</td>
                        <td className="r !pr-5">{v}</td>
                      </tr>
                    ))}
                    <tr className="em">
                      <td className="!pl-5 !border-b-0">Margin</td>
                      <td className="r !pr-5 !border-b-0 text-[var(--po-accent)]">{c.margin}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          <Conclusion>
            Prices are set for an {prices.marginPct}% margin. At one test a day, a plant buys 360 cartridges a year,
            worth {inr(sizing.cartPerPlant)}. A laboratory test costs {incumbent.perTest} today.
          </Conclusion>
        </Sub>

        <Sub id="unit-economics" title="Unit Economics">
          <table className="po-table max-w-[620px] text-[14px]">
            <thead>
              <tr>
                <th>Item</th>
                <th>Inputs</th>
                <th className="r !whitespace-normal">Total landed cost</th>
              </tr>
            </thead>
            <tbody>
              {landedCost.map((x) => (
                <tr key={x.item}>
                  <td className="font-medium whitespace-nowrap pr-4">{x.item}</td>
                  <td className="ink2">
                    {x.inputs.map((i) => (
                      <span key={i} className="block">
                        {i}
                      </span>
                    ))}
                  </td>
                  <td className="r">{x.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Conclusion>
            These are preliminary figures and will change with development and market research. A commercial Raman or
            FTIR system costs about {incumbent.equipment}.
          </Conclusion>
        </Sub>
      </Block>

      <Block id="outlook" title="Break-even and Market Size">
        <Sub
          id="break-even"
          title="Break-even"
          intro={
            <p>
              Research, team expansion and operating costs continue throughout Phase 1. For simplicity, this view covers
              the benchtop analyser only.
            </p>
          }
        >
          <BreakEvenTable />
          <Conclusion>
            With 120 active plants in Year 5, revenue from the benchtop analyser reaches ₹18.24 crore. The cost side
            will be modelled as Stage 0 and the pilots establish actual costs.
          </Conclusion>
        </Sub>

        <Sub
          id="market-size"
          title="Market Size"
          intro={
            <p>
              These are back-of-the-envelope estimates. The packaged water figures are built from plant counts, volumes
              and PlasticOptics prices. The food and air figures are existing testing markets.
            </p>
          }
        >
          <MarketSize />
          <Conclusion>
            At PlasticOptics prices, India's packaged drinking water plants represent ₹{Math.round(sizing.indiaCart)}{" "}
            crore a year in cartridges. Year 5's 120 plants are {((120 / market.licensedPlants) * 100).toFixed(1)}% of
            these plants. Food and air testing are each larger markets than the first product.
          </Conclusion>
        </Sub>
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
          Every figure on this page is an estimate. Stage 0 tests the cartridge cost, and the pilots in Stage 1 test
          price and usage.
        </Conclusion>
      </Block>
    </>
  );
}
