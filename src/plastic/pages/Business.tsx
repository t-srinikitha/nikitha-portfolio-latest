import { discovery, incumbent, landedCost, market, objective, pathToMarket, prices, risks, whyNow } from "../data";
import { Block, Callout, Conclusion, PageHead, Src, Sub, inr } from "../ui";

const segments = [
  {
    name: "Premium packaged water brands",
    size: "Backbay, Uravu, Smartwater and other brands that compete on purity",
    when: "Stages 1–2",
  },
  {
    name: "Injectable pharmaceutical manufacturers",
    size: "Already count particles in every batch; cannot identify plastic",
    when: "Stages 1–2",
  },
  {
    name: "Export beverage contractors",
    size: "Buyers in Europe and Australia are beginning to set requirements",
    when: "Stages 1–2",
  },
  {
    name: "Other packaged drinking water plants",
    size: `${market.licensedPlants.toLocaleString("en-IN")}+ BIS-licensed in India in total`,
    when: "Stage 2 onward",
  },
  {
    name: "Food producers",
    size: "Salt, sugar, milk and other staples",
    when: "Phase 2",
  },
];

import { BreakEvenTable, MarketSize, sizing } from "../sections";

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

export default function Business() {
  return (
    <>
      <PageHead
        title="Business"
        lede={
          <p>
            PlasticOptics sells a benchtop analyser and single-use test cartridges to customers that already value purity
            or already count particles. The plan is five pilot plants in Stage 1, 20 plants in Year 3 and 60 by the end of
            Year 4.
          </p>
        }
      />

      <Block id="market" title="Market">
        <Sub
          id="customer"
                    title="Target Customers"
          intro={
            <>
              {discovery.map((d) => (
                <p key={d}>{d}</p>
              ))}
            </>
          }
        >
          <table className="po-table">
            <thead>
              <tr>
                <th>Segment</th>
                <th>Detail</th>
                <th className="r">Stage</th>
              </tr>
            </thead>
            <tbody>
              {segments.map((s) => (
                <tr key={s.name}>
                  <td className="font-medium">{s.name}</td>
                  <td className="ink2">{s.size}</td>
                  <td className="r">{s.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 grid sm:grid-cols-2 gap-4 text-[14px]">
            <div>
              <div className="font-medium">User</div>
              <p className="mt-1">Plant quality-control staff. No spectroscopy training is required.</p>
            </div>
            <div>
              <div className="font-medium">First pilot</div>
              <p className="mt-1">
                {objective.pilot} Producer of packaged drinking water from air. <Src id="uravu" />
              </p>
            </div>
          </div>
        </Sub>

        <Sub
          id="value"
          title="Value Proposition"
          intro={<p>Cost and time of one microplastic test, under each approach.</p>}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border hair bg-[var(--po-paper)] p-5">
              <div className="font-medium">External laboratory (SGS or Eurofins)</div>
              <div className="num text-[28px] mt-2">₹75,000</div>
              <div className="text-[13px] muted">per sample, quotes obtained by PlasticOptics</div>
              <ul className="mt-4 text-[13.5px] grid gap-1.5 ink2">
                <li>SGS: results in more than 10 days</li>
                <li>SGS: samples shipped abroad</li>
                <li>Results arrive after the batch has shipped</li>
              </ul>
            </div>
            <div className="border-2 border-[var(--po-ink)] bg-[var(--po-paper)] p-5">
              <div className="font-medium">PlasticOptics, on site</div>
              <div className="num text-[28px] mt-2">₹2,000</div>
              <div className="text-[13px] muted">per test cartridge, with a ₹8 lakh analyser</div>
              <ul className="mt-4 text-[13.5px] grid gap-1.5 ink2">
                <li>Results in 20–30 minutes</li>
                <li>Performed on site by quality-control staff</li>
                <li>Every batch can be tested</li>
              </ul>
            </div>
          </div>
          <Conclusion>
            One laboratory test costs as much as 37 PlasticOptics tests, and a PlasticOptics result is available before
            the batch leaves the plant.
          </Conclusion>
        </Sub>

        <Sub
          id="regulation"

          title="Regulatory Context"
          intro={<p>Regulators have begun to establish methods and requirements for microplastic measurement.</p>}
        >
          <ol className="border-l hair ml-1.5">
            {whyNow.map((w) => (
              <li key={w.where} className="relative pl-6 pb-7 last:pb-0">
                <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--po-accent)]" />
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="num text-[13px]">{w.when}</span>
                  <span className="font-medium">{w.where}</span>
                </div>
                <p className="mt-1 text-[14px] ink2 max-w-[62ch]">
                  {w.what}{" "}
                  {w.src.map((s) => (
                    <span key={s} className="mr-2">
                      <Src id={s} />
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <Callout>
              All current methods rely on spectroscopy. Routine monitoring will require a rapid on-site screening method,
              with spectroscopy retained for confirmation.
            </Callout>
          </div>
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

      <Block id="go-to-market" title="Go-To-Market">
        <Sub id="path" title="Market Entry Plan">
          <ol className="grid md:grid-cols-3 gap-px bg-[var(--po-line)] border hair">
            {pathToMarket.map((p, i) => (
              <li key={p.step} className="bg-[var(--po-paper)] p-5">
                <div className="flex items-baseline gap-3">
                  <span className="num text-[13px] muted">0{i + 1}</span>
                  <h4 className="serif text-[22px] leading-none">{p.step}</h4>
                </div>
                <div className="mt-2 mono text-[11.5px] muted">{p.stage}</div>
                <p className="mt-3 text-[14px] ink2 leading-relaxed">{p.body}</p>
              </li>
            ))}
          </ol>
        </Sub>

        <Sub
          id="risks"

          title="Principal Risks"
          intro={
            <p>Each risk is paired with a validation test and a stage. Stage 0 addresses technical and cost risk.</p>
          }
        >
          <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
            <table className="po-table min-w-[560px]">
              <thead>
                <tr>
                  <th>Risk</th>
                  <th>Validation</th>
                  <th className="r">Stage</th>
                </tr>
              </thead>
              <tbody>
                {risks.map((r) => (
                  <tr key={r.risk}>
                    <td className="font-medium whitespace-nowrap pr-6">{r.risk}</td>
                    <td className="ink2">{r.test}</td>
                    <td className="r !font-sans !whitespace-normal text-[12.5px] min-w-[110px]">{r.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Sub>
      </Block>

      <Block id="model" title="Business Model">
        <Sub id="pricing" title="Pricing and Unit Economics">
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
          <div className="mt-8">
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
          </div>
          <p className="mt-3 text-[13.5px] muted">Preliminary figures. A commercial Raman or FTIR system costs about {incumbent.equipment}.</p>
          <Conclusion>
            Prices are set for an {prices.marginPct}% margin. At one test a day, a plant buys 360 cartridges a year,
            worth {inr(sizing.cartPerPlant)}. A laboratory test costs {incumbent.perTest} today.
          </Conclusion>
        </Sub>

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

        <Sub id="assumptions" title="Assumptions to be Tested">
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
        </Sub>
      </Block>
    </>
  );
}
