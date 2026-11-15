import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  goal,
  surfaces,
  whereToStart,
  whoPays,
  today,
  objective,
  stages,
  unitEconomics as ue,
  budget,
  stage0Done,
  afterStage0,
  founder,
  market,
  status,
  collaborators,
} from "../data";
import { Block, Callout, Conclusion, PageHead, Src, Stat, inr } from "../ui";
import { BASE, crore } from "../model";
import { BreakEvenStats, BreakEvenTable, MarketSize, MissionCapital, base as s, missionTotal, missionUsd, sizing } from "../sections";

const deviceCost = ue.deviceCost.reduce((a, c) => a + c.v, 0);

const comparison = [
  {
    name: "Current methods (Raman or FTIR spectroscopy)",
    strong: false,
    cards: [
      { k: "Equipment", v: "₹1.5 Cr", d: "Raman spectrometer and supporting laboratory equipment." },
      { k: "Personnel", v: "Specialist staff", d: "Trained spectroscopists to prepare samples and operate the instrument." },
      { k: "Per test", v: "₹5,000", d: "Results in 72 hours or more." },
    ],
  },
  {
    name: "PlasticOptics",
    strong: true,
    cards: [
      { k: "Equipment", v: "₹5 L", d: "Benchtop analyser." },
      { k: "Personnel", v: "None", d: "Operated by the plant's existing quality-control staff." },
      { k: "Per test", v: "₹1,000", d: "Single-use test cartridge. Results in 20–30 minutes." },
    ],
  },
];

export default function Overview() {
  const budgetTotal = budget.reduce((a, b) => a + b.v, 0);
  const brandShare = s.plantsAtBreakeven ? Math.round((s.plantsAtBreakeven / market.nationalBrandPlants) * 100) : null;

  return (
    <>
      <PageHead
        title="Microplastic Detection and Removal for Water, Food and Air"
        lede={
          <>
            <p>{goal}</p>
            <p className="mt-3">
              The first product addresses drinking water: a benchtop analyser with single-use test cartridges. It enables
              quality-control teams at bottling plants to test every production batch within 20–30 minutes.
            </p>
          </>
        }
      />

      <Block id="market-focus" title="Initial Market Focus">
        <div className="grid md:grid-cols-3 gap-px bg-[var(--po-line)] border hair">
          {surfaces.map((x, i) => (
            <div key={x.name} className="bg-[var(--po-paper)] p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-medium">{x.name}</h3>
                <span
                  className={`mono text-[10.5px] uppercase tracking-wide px-1.5 py-0.5 whitespace-nowrap ${
                    i === 0 ? "bg-[var(--po-ink)] text-[var(--po-bg)]" : "bg-[var(--po-chip)] ink2"
                  }`}
                >
                  {x.verdict}
                </span>
              </div>
              <p className="mt-3 text-[14px] ink2 leading-relaxed">{x.feasibility}</p>
            </div>
          ))}
        </div>
        <Conclusion>{whereToStart}</Conclusion>
      </Block>

      <Block id="customer" toc="Customer" title={`Customer: ${whoPays.who}`} intro={<p>{whoPays.why}</p>}>
        <p className="font-medium">{today.method}</p>
        <div className="mt-4 grid sm:grid-cols-2 gap-2">
          {today.facts.map((f) => (
            <Stat key={f.v} v={f.v} k={f.k} />
          ))}
        </div>
        <div className="mt-8">
          <Callout tone="accent">
            <span className="serif text-[22px]">{today.punchline}</span>
          </Callout>
        </div>
      </Block>

      <Block id="product" toc="Product" title="Product: Benchtop Analyser" intro={<p>{objective.text}</p>}>
        <dl className="grid md:grid-cols-3 gap-px bg-[var(--po-line)] border hair text-[14px]">
          <div className="bg-[var(--po-paper)] p-5">
            <dt className="font-medium">Method</dt>
            <dd className="mt-1.5 ink2">
              {objective.how}{" "}
              <Link to="/plastic/science" className="ulink">
                Technology
              </Link>
            </dd>
          </div>
          <div className="bg-[var(--po-paper)] p-5">
            <dt className="font-medium">Revenue model</dt>
            <dd className="mt-1.5 ink2">{objective.revenue}</dd>
          </div>
          <div className="bg-[var(--po-paper)] p-5">
            <dt className="font-medium">Pilot partner</dt>
            <dd className="mt-1.5 ink2">{objective.pilot}</dd>
          </div>
        </dl>
      </Block>

      <Block id="cost-comparison" title="Cost Comparison">
        <div className="grid gap-6">
          {comparison.map((layer) => (
            <div key={layer.name}>
              <h3 className="font-medium">{layer.name}</h3>
              <div
                className={`mt-3 grid sm:grid-cols-3 gap-px border ${
                  layer.strong ? "bg-[var(--po-ink)] border-[var(--po-ink)]" : "bg-[var(--po-line)] hair"
                }`}
              >
                {layer.cards.map((c) => (
                  <div key={c.k} className="bg-[var(--po-paper)] p-5">
                    <div className="text-[13px] muted">{c.k}</div>
                    <div
                      className={`mt-1 text-[24px] leading-tight ${c.v.startsWith("₹") ? "num" : "serif"} ${
                        layer.strong ? "text-[var(--po-accent)]" : ""
                      }`}
                    >
                      {c.v}
                    </div>
                    <p className="mt-2 text-[13.5px] ink2 leading-snug">{c.d}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Conclusion>
          PlasticOptics lowers equipment cost by 97% and cost per test by 80%, requires no specialist staff, and returns
          results in minutes rather than days.
        </Conclusion>
      </Block>

      <Block id="unit-economics" title="Unit Economics">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border hair bg-[var(--po-paper)]">
            <h3 className="px-5 pt-5 font-medium">Benchtop analyser</h3>
            <table className="po-table mt-3">
              <tbody>
                {ue.deviceCost.map((c) => (
                  <tr key={c.item}>
                    <td className="!pl-5">{c.item}</td>
                    <td className="r !pr-5">{inr(c.v)}</td>
                  </tr>
                ))}
                <tr className="em">
                  <td className="!pl-5">COGS</td>
                  <td className="r !pr-5">{inr(deviceCost)}</td>
                </tr>
                <tr className="em">
                  <td className="!pl-5 !border-b-0">Market price</td>
                  <td className="r !pr-5 !border-b-0 text-[var(--po-accent)]">{ue.devicePrice}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="border hair bg-[var(--po-paper)]">
            <h3 className="px-5 pt-5 font-medium">Test cartridge</h3>
            <table className="po-table mt-3">
              <tbody>
                {ue.cartridgeBreakdown.map((c) => (
                  <tr key={c.item}>
                    <td className="!pl-5">{c.item}</td>
                    <td className="r !pr-5">{inr(c.v)}</td>
                  </tr>
                ))}
                <tr className="em">
                  <td className="!pl-5">COGS</td>
                  <td className="r !pr-5">{inr(ue.cartridgeCost)}</td>
                </tr>
                <tr className="em">
                  <td className="!pl-5 !border-b-0">Market price</td>
                  <td className="r !pr-5 !border-b-0 text-[var(--po-accent)]">{ue.cartridgePrice}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-4 text-[13.5px] muted max-w-[68ch]">
          The ₹400 cartridge COGS is a planning estimate. Bench consumables currently cost ₹193 per test and are projected
          to fall to ₹60 at volume (see{" "}
          <Link to="/plastic/roadmap#cost-down" className="ulink">
            Cost Reduction
          </Link>
          ). All figures will be refined through Stage 0 and customer interviews.
        </p>
        <Conclusion>
          Gross margin is 68% on each analyser and 60% on each cartridge. A plant on the subscription of{" "}
          {BASE.testsPerMonth} cartridges a month pays ₹{s.cartRevPlant.toFixed(1)} lakh a year, of which ₹
          {s.cartGrossPlant.toFixed(2)} lakh is gross profit.
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
          128 <Src id="bisleri" />. These plants represent ₹{Math.round(sizing.brandCart)} crore a year. Removal, global
          sales, and food and air testing are each larger markets than the first product.
        </Conclusion>
      </Block>

      <Block
        id="break-even"
        toc="Break-even"
        title="Break-even: Bottling Plant Business"
        intro={
          <p>
            The first business is the sale of analysers and cartridge subscriptions to bottling plants. This section
            shows the cash that business requires and the year in which it becomes profitable. It excludes the cost of
            food, air and removal research.
          </p>
        }
      >
        <BreakEvenStats />
        <div className="mt-8">
          <BreakEvenTable />
        </div>
        <Conclusion>
          The bottling-plant business requires about ₹{(s.cashRequired / 100).toFixed(1)} crore and reaches operating profit in Year{" "}
          {s.breakeven}, when {s.plantsAtBreakeven} plants each pay ₹30,000 a month for cartridges. That is {brandShare}%
          of the estimated {market.nationalBrandPlants} plants that bottle for national brands.
        </Conclusion>
        <Link to="/plastic/numbers" className="mt-8 inline-flex items-center gap-2 btn btn-ghost">
          Business Model <ArrowRight className="h-4 w-4" />
        </Link>
      </Block>

      <Block
        id="total-capital"
        toc="Total Capital"
        title="Total Capital for the Full Objective"
        intro={
          <p>
            The objective is industrial-scale detection and removal of microplastics in water, food and air. The table
            is a back-of-the-envelope estimate of the capital this requires, by programme.
          </p>
        }
      >
        <MissionCapital />
        <Conclusion>
          The full objective requires an estimated ₹{missionTotal.low}–{missionTotal.high} crore ({missionUsd}) over
          about ten years. Two-thirds of this is plant-scale removal, which is committed only after the removal pilot
          succeeds. The ₹{budgetTotal.toFixed(1)} lakh requested now funds the first step of the first programme.
        </Conclusion>
      </Block>

      <Block id="stages" title="Development Stages">
        <ol className="border-t hair">
          {stages.map((x) => (
            <li key={x.n} className="grid grid-cols-[44px_1fr] md:grid-cols-[56px_1fr] gap-x-4 gap-y-2 py-5 border-b hair">
              <div className={`num text-[28px] leading-none ${x.current ? "text-[var(--po-accent)]" : ""}`}>{x.n}</div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-medium text-[16px]">{x.name}</h3>
                  <span className="mono text-[12px] muted">{x.when}</span>
                  {x.current && <span className="chip !bg-[var(--po-lime)] !text-black">Current</span>}
                </div>
                <p className="mt-1.5 text-[14.5px]">{x.objective}</p>
                <p className="mt-1 text-[13.5px] muted">{x.spend}</p>
              </div>
            </li>
          ))}
        </ol>
        <Conclusion>
          Work on microplastic removal begins in parallel with Stage 2 and continues after it. The{" "}
          <Link to="/plastic/roadmap" className="ulink">
            R&D Roadmap
          </Link>{" "}
          sets out the removal stages.
        </Conclusion>
      </Block>

      <Block id="stage-0" title="Stage 0 Milestones" intro={<p>Stage 0 is complete when the following are true.</p>}>
        <ol className="grid gap-3">
          {stage0Done.map((d, i) => (
            <li key={d} className="grid grid-cols-[28px_1fr] gap-3 text-[15.5px]">
              <span className="num text-[13px] muted pt-0.5">0{i + 1}</span>
              <span>{d}</span>
            </li>
          ))}
        </ol>
        <Conclusion>{afterStage0}</Conclusion>
      </Block>

      <Block id="status" title="Current Status" intro={<p>{status.summary}</p>}>
        <h3 className="font-medium">In place today</h3>
        <ul className="mt-3 grid gap-2.5 border-t hair pt-4">
          {status.inPlace.map((x) => (
            <li key={x} className="text-[15.5px]">
              {x}
            </li>
          ))}
        </ul>
        <Conclusion>{status.conclusion}</Conclusion>
      </Block>

      <Block
        id="funding"
        toc="Funding Requirement"
        title={<>Funding Requirement: ₹{budgetTotal.toFixed(1)} Lakh</>}
        intro={<p>The request covers the full Stage 0 budget for six months.</p>}
      >
        <table className="po-table max-w-[520px] text-[14px]">
          <thead>
            <tr>
              <th>Item</th>
              <th className="r">₹ lakh</th>
            </tr>
          </thead>
          <tbody>
            {budget.map((b) => (
              <tr key={b.item}>
                <td>{b.item}</td>
                <td className="r">{b.v.toFixed(1)}</td>
              </tr>
            ))}
            <tr className="em">
              <td>Total</td>
              <td className="r">{budgetTotal.toFixed(1)}</td>
            </tr>
          </tbody>
        </table>
        <Conclusion>Research collaboration and optical equipment account for about half of the budget.</Conclusion>
      </Block>

      <Block id="team" title="Founder and Research Collaborators">
        <div className="grid sm:grid-cols-[112px_1fr] gap-6 items-start">
          <img src="/Profile.jpeg" alt={founder.name} className="w-28 h-28 object-cover grayscale border hair" />
          <div>
            <h3 className="font-medium">{founder.name}, Founder</h3>
            <p className="mt-2 ink2 max-w-[62ch]">{founder.bio}</p>
            <a href="/climate" className="mt-3 inline-block ulink text-[13.5px] muted">
              Climate and sustainability work
            </a>
          </div>
        </div>
        <div className="mt-8 grid md:grid-cols-2 gap-px bg-[var(--po-line)] border hair">
          {collaborators.map((c) => (
            <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="group bg-[var(--po-paper)] p-5 hover:bg-white transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-medium">{c.name}</h3>
                  <div className="text-[13px] muted mt-0.5">
                    {c.role}, {c.org}
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 muted shrink-0" />
              </div>
              <p className="mt-3 text-[13.5px] ink2 leading-relaxed">{c.work}</p>
            </a>
          ))}
        </div>
      </Block>
    </>
  );
}
