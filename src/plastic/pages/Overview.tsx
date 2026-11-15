import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import {
  goal,
  surfaces,
  whereToStart,
  whoPays,
  today,
  objective,
  budget,
  stage0Done,
  afterStage0,
  founder,
  status,
  collaborators,
} from "../data";
import { Block, Callout, Conclusion, PageHead, Stat } from "../ui";
import { BreakEvenStats, MarketSize, MissionCapital, StageList, base as s, missionTotal, missionUsd, sizing } from "../sections";


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

      <Block
        id="stages"
        title="Development Stages"
        intro={<p>The company's plan is a single sequence of seven stages. Stage 0 is the current stage.</p>}
      >
        <StageList />
        <Conclusion>
          Stages 0 to 2 build the first business, a benchtop analyser for bottling plants. Stages 3 to 6 extend detection
          to food, add removal and in-line analysis, and take both to scale. The{" "}
          <Link to="/plastic/roadmap" className="ulink">
            R&D Roadmap
          </Link>{" "}
          describes each stage.
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

      <Block id="market-size" title="Market Size" intro={<p>These are back-of-the-envelope estimates.</p>}>
        <MarketSize notes={false} />
        <Conclusion>
          The benchtop analyser for bottling plants in India is a market of ₹{Math.round(sizing.indiaCart)} crore a year
          in cartridges. Global sales and food and air testing are each larger markets than the first product.
          The basis for each figure is set out under{" "}
          <Link to="/plastic/numbers#market-size" className="ulink">
            Business Model
          </Link>
          .
        </Conclusion>
      </Block>

      <Block
        id="break-even"
        toc="Break-even"
        title="Break-even"
        intro={
          <p>
            Revenue comes from the analyser and cartridge subscription, sold to bottling plants from Year 3 and to food
            producers from Year 5. The removal pilot runs in Years 4 to 6 as a cost.
          </p>
        }
      >
        <BreakEvenStats />
        <Conclusion>
          The company requires about ₹{(s.cashRequired / 100).toFixed(1)} crore and becomes profitable in Year{" "}
          {s.breakeven}, with {s.plantsAtBreakeven} water plants and {s.foodAtBreakeven} food producers, each paying ₹30,000
          a month for cartridges. The year-by-year
          figures are set out under{" "}
          <Link to="/plastic/numbers#break-even" className="ulink">
            Business Model
          </Link>
          .
        </Conclusion>
      </Block>

      <Block
        id="total-capital"
        toc="Total Capital"
        title="Total Capital for the Full Objective"
        intro={<p>This is a back-of-the-envelope estimate of the capital required to complete all seven stages.</p>}
      >
        <MissionCapital />
        <Conclusion>
          The full objective requires an estimated ₹{missionTotal.low}–{missionTotal.high} crore ({missionUsd}) over
          about ten years. Two-thirds of this is Stage 6, which is committed only after removal and in-line analysis
          have been demonstrated. The ₹{budgetTotal.toFixed(1)} lakh requested now funds Stage 0.
        </Conclusion>
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
