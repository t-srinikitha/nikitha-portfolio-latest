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
  collaborators,
} from "../data";
import { Block, Callout, Conclusion, PageHead, Src, Stat, inr } from "../ui";
import { BASE, CAPITAL_TOTAL, project, summarise } from "../model";

const rows = project(BASE);
const s = summarise(BASE, rows);
const deviceCost = ue.deviceCost.reduce((a, c) => a + c.v, 0);
const cr = (lakh: number) => `₹${(lakh / 100).toFixed(2)} Cr`;

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
  const investShare = s.plantsAtInvest ? ((s.plantsAtInvest / market.licensedPlants) * 100).toFixed(1) : null;

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
          Gross margin is 68% on each analyser and 60% on each cartridge. Each active plant generates ₹
          {s.cartGrossPlant.toFixed(2)} lakh of cartridge gross profit per year at 360 tests.
        </Conclusion>
      </Block>

      <Block id="stages" title="Development Stages">
        <ol className="border-t hair">
          {stages.map((x) => (
            <li key={x.n} className="grid grid-cols-[44px_1fr] md:grid-cols-[56px_1fr_150px] gap-x-4 gap-y-2 py-5 border-b hair">
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
              <div className="col-start-2 md:col-start-3 md:text-right num text-[15px]">{x.funding}</div>
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
        <Conclusion>Research collaboration and optical equipment account for half of the budget.</Conclusion>
      </Block>

      <Block
        id="investment-breakeven"
        title="Investment Breakeven"
        intro={
          <>
            <p>
              The ₹{budgetTotal.toFixed(1)} lakh Stage 0 request funds technology validation. Stage 0 generates no revenue,
              and the request is not repaid on its own. Bringing the analyser to market requires {cr(CAPITAL_TOTAL)} across
              Stages 0 to 2: ₹{budgetTotal.toFixed(1)} lakh, ₹2 crore and ₹10 crore. Investment breakeven is measured
              against that total.
            </p>
          </>
        }
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Stat v={cr(CAPITAL_TOTAL)} k="Capital required, Stages 0–2" />
          <Stat v={`${cr(s.lossesBefore)}`} k={`Operating losses, Years 2–${(s.opBreakeven ?? 2) - 1}`} />
          <Stat v={`Year ${s.opBreakeven}`} k={`Operating break-even, ${s.plantsAtOpBreakeven} plants`} />
          <Stat v={`Year ${s.investBreakeven}`} k={`Investment breakeven, ${s.plantsAtInvest} plants`} accent />
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="po-table text-[14px]">
            <thead>
              <tr>
                <th>Year</th>
                <th className="r">Plants</th>
                <th className="r hidden sm:table-cell">Revenue</th>
                <th className="r !whitespace-normal">Operating profit</th>
                <th className="r">Recovered</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const mark = r.year === s.opBreakeven || r.year === s.investBreakeven;
                return (
                  <tr key={r.year} className={mark ? "em" : ""}>
                    <td className="whitespace-nowrap">
                      Year {r.year}
                      {r.year === s.opBreakeven && <span className="ml-2 text-[12px] muted !font-normal hidden sm:inline">operating break-even</span>}
                      {r.year === s.investBreakeven && <span className="ml-2 text-[12px] muted !font-normal hidden sm:inline">investment breakeven</span>}
                    </td>
                    <td className="r">{r.active}</td>
                    <td className="r hidden sm:table-cell">{r.revenue.toFixed(1)}</td>
                    <td className={`r ${r.operating < 0 ? "text-[var(--po-accent)]" : ""}`}>{r.operating.toFixed(1)}</td>
                    <td className={`r ${r.year === s.investBreakeven ? "bg-[var(--po-lime)]" : ""}`}>
                      {r.recovered === null ? "–" : `${r.recovered.toFixed(1)}`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[13px] muted max-w-[70ch]">
          ₹ lakh. Assumptions: analyser ₹5 lakh; cartridge ₹1,000; 360 tests per plant per year; operating costs of ₹1.5
          crore per year. Plants: 10 pilots in Year 2, 10 paying plants in Year 3, 15 in Year 4 and 25 more each year from
          Year 5. Operating costs are held constant; higher sales and service costs at scale would delay both break-even
          points.
        </p>

        <Conclusion>
          Operating losses of {cr(s.lossesBefore)} in Years 2 to {(s.opBreakeven ?? 2) - 1} are funded from the capital raised.
          From Year {s.opBreakeven}, operating profit accumulates against the {cr(CAPITAL_TOTAL)} invested, and the full
          amount is recovered in Year {s.investBreakeven}, with {s.plantsAtInvest} plants active. That is {investShare}% of
          India's {market.licensedPlants.toLocaleString("en-IN")}+ licensed packaged drinking water plants. <Src id="bis" />
        </Conclusion>

        <Link to="/plastic/numbers" className="mt-8 inline-flex items-center gap-2 btn btn-ghost">
          Financial Modeling <ArrowRight className="h-4 w-4" />
        </Link>
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
