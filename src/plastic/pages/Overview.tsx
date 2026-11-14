import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  goal,
  surfaces,
  whereToStart,
  whoPays,
  today,
  objective,
  stages,
  unitEconomics as ue,
  v2Projection,
  budget,
  stage0Done,
  afterStage0,
  founder,
  market,
} from "../data";
import { Block, Callout, NextLinks, PageHead, Src, Stat, inr } from "../ui";
import { KeyNumbers } from "../PlasticLayout";

const deviceCost = ue.deviceCost.reduce((s, c) => s + c.v, 0);

export default function Overview() {
  const budgetTotal = budget.reduce((s, b) => s + b.v, 0);
  const maxBudget = Math.max(...budget.map((b) => b.v));
  const share = ((35 / market.licensedPlants) * 100).toFixed(1);

  return (
    <>
      <PageHead
        kicker="PlasticOptics · Overview"
        title="Microplastics in drinking water, counted at the plant in 30 minutes."
        lede={
          <>
            <p>
              <span className="text-[var(--po-ink)]">The goal:</span> {goal.charAt(0).toLowerCase() + goal.slice(1)}
            </p>
            <p className="mt-3">
              The first product is a benchtop device and a single-use test cartridge that let a bottling plant's own
              quality-control team count microplastics in every batch, instead of waiting three days for a lab.
            </p>
          </>
        }
      />

      <div className="xl:hidden mb-12">
        <KeyNumbers inline />
      </div>

      <Block id="where-to-start" tag="Where to start" title="Water first. The method extends to food and air.">
        <div className="grid md:grid-cols-3 gap-px bg-[var(--po-line)] border hair">
          {surfaces.map((s, i) => (
            <div key={s.name} className="bg-[var(--po-paper)] p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-medium">{s.name}</h3>
                <span
                  className={`mono text-[10.5px] uppercase tracking-wide px-1.5 py-0.5 whitespace-nowrap ${
                    i === 0 ? "bg-[var(--po-ink)] text-[var(--po-bg)]" : "bg-[var(--po-chip)] ink2"
                  }`}
                >
                  {s.verdict}
                </span>
              </div>
              <div className="mt-3 mono text-[10.5px] uppercase tracking-wide muted">Feasibility</div>
              <p className="mt-1 text-[13.5px] ink2 leading-relaxed">{s.feasibility}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 ink2 max-w-[62ch]">{whereToStart}</p>
      </Block>

      <Block id="who-pays" tag="Who pays and why" title={whoPays.who} intro={<p>{whoPays.why}</p>}>
        <p className="font-medium">{today.method}</p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
          {today.facts.map((f) => (
            <Stat key={f.k} v={f.v} k={f.k} />
          ))}
        </div>
        <div className="mt-8">
          <Callout tone="accent">
            <span className="serif text-[22px]">{today.punchline}</span>
          </Callout>
        </div>
      </Block>

      <Block id="objective" tag="Objective" title="A benchtop device any QC team can run." intro={<p>{objective.text}</p>}>
        <dl className="grid md:grid-cols-3 gap-px bg-[var(--po-line)] border hair text-[14px]">
          <div className="bg-[var(--po-paper)] p-5">
            <dt className="mono text-[10.5px] uppercase tracking-wide muted">How</dt>
            <dd className="mt-1.5">{objective.how}</dd>
            <dd className="mt-3">
              <Link to="/plastic/science" className="ulink text-[13px] muted">
                How the method works
              </Link>
            </dd>
          </div>
          <div className="bg-[var(--po-paper)] p-5">
            <dt className="mono text-[10.5px] uppercase tracking-wide muted">Revenue</dt>
            <dd className="mt-1.5">{objective.revenue}</dd>
          </div>
          <div className="bg-[var(--po-paper)] p-5">
            <dt className="mono text-[10.5px] uppercase tracking-wide muted">First pilot</dt>
            <dd className="mt-1.5">{objective.pilot}</dd>
          </div>
        </dl>
      </Block>

      <Block id="stages" tag="Tech & business stages" title="Three stages, from proof to revenue.">
        <ol className="border-t hair">
          {stages.map((s) => (
            <li key={s.n} className="grid grid-cols-[44px_1fr] md:grid-cols-[56px_1fr_170px] gap-x-4 gap-y-2 py-5 border-b hair">
              <div className={`num text-[28px] leading-none ${s.current ? "text-[var(--po-accent)]" : ""}`}>{s.n}</div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-medium text-[16px]">{s.name}</h3>
                  <span className="mono text-[12px] muted">{s.when}</span>
                  {s.current && <span className="chip !bg-[var(--po-lime)] !text-black">Now</span>}
                </div>
                <p className="mt-1.5 text-[14px]">{s.objective}</p>
                <p className="mt-1 text-[13px] muted">{s.spend}</p>
              </div>
              <div className="col-start-2 md:col-start-3 md:text-right">
                <div className="mono text-[10.5px] uppercase tracking-wide muted">Funding</div>
                <div className="num text-[15px]">{s.funding}</div>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-[13.5px] muted">
          After Stage 2 the plan moves from detection to removal.{" "}
          <Link to="/plastic/roadmap" className="ulink">
            See the full roadmap
          </Link>
          .
        </p>
      </Block>

      <Block
        id="unit-economics"
        tag="Unit economics"
        title="A device once. A cartridge every test."
        intro={<p>The cartridge is used up in every test, so a plant testing batch after batch keeps buying them.</p>}
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border hair bg-[var(--po-paper)]">
            <div className="px-5 pt-5 flex items-baseline justify-between">
              <h3 className="font-medium">PlasticOptics device</h3>
              <span className="mono text-[11px] muted">one per plant</span>
            </div>
            <table className="po-table mt-3">
              <tbody>
                {ue.deviceCost.map((c) => (
                  <tr key={c.item}>
                    <td className="!pl-5">{c.item}</td>
                    <td className="r !pr-5">{inr(c.v)}</td>
                  </tr>
                ))}
                <tr className="em">
                  <td className="!pl-5">Cost</td>
                  <td className="r !pr-5">{inr(deviceCost)}</td>
                </tr>
                <tr className="em">
                  <td className="!pl-5 !border-b-0">Price ceiling</td>
                  <td className="r !pr-5 !border-b-0 text-[var(--po-accent)]">{ue.devicePrice}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="border hair bg-[var(--po-paper)]">
            <div className="px-5 pt-5 flex items-baseline justify-between">
              <h3 className="font-medium">Test cartridge</h3>
              <span className="mono text-[11px] muted">one per test</span>
            </div>
            <table className="po-table mt-3">
              <tbody>
                <tr>
                  <td className="!pl-5">Test cartridge with differential staining dyes</td>
                  <td className="r !pr-5">{inr(ue.cartridgeCost)}</td>
                </tr>
                <tr className="em">
                  <td className="!pl-5">Cost per cartridge</td>
                  <td className="r !pr-5">{inr(ue.cartridgeCost)}</td>
                </tr>
                <tr className="em">
                  <td className="!pl-5 !border-b-0">Price</td>
                  <td className="r !pr-5 !border-b-0 text-[var(--po-accent)]">{ue.cartridgePrice}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Stat v={ue.incumbent.v} k={`${ue.incumbent.label}. Our device price is 2–3% of it.`} />
          <Stat v={ue.labPerTest} k="What companies spend per lab test today, with a 72-hour wait." />
          <Stat v="₹1,000–2,000" k="Our cartridge per test, with a result in 20–30 minutes." accent />
        </div>
        <p className="mt-5 text-[13px] muted">{ue.caveat}</p>
      </Block>

      <Block
        id="break-even"
        tag="Break-even"
        title="35 active plants cover ₹1.5 Cr a year in fixed costs."
        intro={
          <p>
            Assuming the costs above, operations break even in Year 4 with ~35 active plants buying cartridges. That is
            about {share}% of India's {market.licensedPlants.toLocaleString("en-IN")}+ licensed packaged drinking-water
            plants. <Src id="bis" />
          </p>
        }
      >
        <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
          <table className="po-table min-w-[620px]">
            <thead>
              <tr>
                <th>₹ lakh</th>
                {v2Projection.map((r) => (
                  <th key={r.year} className="r">
                    Year {r.year}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ["New paying plants", "newPaying", false],
                  ["New pilot plants", "newPilot", false],
                  ["Active plants", "active", false],
                  ["Device margin", "device", true],
                  ["Cartridge margin", "cartridge", true],
                  ["Total margin", "total", true],
                  ["Fixed costs", "fixed", true],
                  ["Operating profit", "operating", true],
                  ["Cumulative", "cumulative", true],
                ] as const
              ).map(([label, key, money]) => (
                <tr key={key} className={key === "operating" ? "em" : ""}>
                  <td className="whitespace-nowrap">{label}</td>
                  {v2Projection.map((r) => {
                    const v = r[key] as number;
                    const pos = key === "operating" && v > 0;
                    return (
                      <td key={r.year} className={`r ${pos ? "bg-[var(--po-lime)]" : ""} ${money && v < 0 ? "muted" : ""}`}>
                        {money ? v.toFixed(1) : v}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-4 text-[14px]">
          <Callout>
            <b>Read it this way.</b> Each active plant brings ₹4.32 L of cartridge margin a year. ₹150 L ÷ ₹4.32 L ≈ 35
            plants to cover fixed costs.
          </Callout>
          <Callout tone="accent">
            <b>What the table doesn't show.</b> The cumulative deficit bottoms at −₹1.56 Cr in Year 3, and 35 plants only
            hold it flat. Paying it back takes growth beyond 35.
          </Callout>
        </div>
        <Link to="/plastic/numbers" className="mt-6 inline-flex items-center gap-2 btn btn-ghost">
          Change the assumptions in the model <ArrowRight className="h-4 w-4" />
        </Link>
      </Block>

      <Block
        id="investment"
        tag="Investment"
        title={<>₹{budgetTotal.toFixed(1)} lakh to prove the technology.</>}
        intro={<p>Stage 0 runs for about six months. Here is every rupee.</p>}
      >
        <ul className="grid gap-2.5">
          {budget.map((b) => (
            <li key={b.item} className="grid grid-cols-[1fr_auto] sm:grid-cols-[220px_1fr_56px] gap-x-4 gap-y-1 items-center text-[14px]">
              <span>{b.item}</span>
              <span className="num text-right sm:order-3">{b.v.toFixed(1)}</span>
              <span className="col-span-2 sm:col-span-1 sm:order-2 h-2 bg-[var(--po-chip)]">
                <span className="block h-full bg-[var(--po-ink)]" style={{ width: `${(b.v / maxBudget) * 100}%` }} />
              </span>
            </li>
          ))}
          <li className="grid grid-cols-[1fr_auto] sm:grid-cols-[220px_1fr_56px] gap-x-4 pt-3 mt-1 border-t hair font-semibold text-[14px]">
            <span>Total, ₹ lakh</span>
            <span className="num text-right sm:order-3">{budgetTotal.toFixed(1)}</span>
            <span className="hidden sm:block sm:order-2" />
          </li>
        </ul>
      </Block>

      <Block id="stage-0" tag="Stage 0 · done means" title="What ₹23.8 lakh buys.">
        <ol className="grid gap-3">
          {stage0Done.map((d, i) => (
            <li key={d} className="grid grid-cols-[28px_1fr] gap-3 text-[15px]">
              <span className="num text-[13px] muted pt-0.5">0{i + 1}</span>
              <span>{d}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-[14px] ink2">{afterStage0}</p>
      </Block>

      <Block id="founder" tag="Founder" title={founder.name}>
        <div className="grid sm:grid-cols-[112px_1fr] gap-6 items-start">
          <img src="/Profile.jpeg" alt={founder.name} className="w-28 h-28 object-cover grayscale border hair" />
          <div>
            <p className="ink2 max-w-[60ch]">{founder.bio}</p>
            <a href="/climate" className="mt-3 inline-block ulink text-[13.5px] muted">
              Full climate and sustainability track record
            </a>
          </div>
        </div>
      </Block>

      <Block id="read-next" tag="Go deeper">
        <NextLinks
          items={[
            { to: "/plastic/numbers", title: "Numbers", body: "The break-even model with every assumption exposed. Change them and watch the plan move." },
            { to: "/plastic/market", title: "Go-to-market", body: "Who buys first, why now, what a plant saves, and what has to be true." },
            { to: "/plastic/roadmap", title: "Roadmap", body: "From batch detection to continuous monitoring to removal at plant scale." },
            { to: "/plastic/science", title: "Science", body: "Differential staining, AI counting, and how we check ourselves against Raman." },
          ]}
        />
      </Block>
    </>
  );
}
