import { Link } from "react-router-dom";
import {
  capitalByStage,
  costKeys,
  levers,
  longArc,
  longRangeProducts,
  stages,
  surfaces,
  testCostSteps,
  type Track,
} from "../data";
import { Axis, Block, Callout, Figure, Gridlines, NextLinks, PageHead, RangeRow, inr } from "../ui";

const TRACK_COLOR: Record<Track | "now", string> = {
  detect: "var(--po-detect)",
  remove: "var(--po-accent)",
  scale: "var(--po-ink)",
  now: "var(--po-ink)",
};
const COST_COLORS = ["#2a78d6", "#1baf7a", "#eda100", "#e87ba4", "#6250d6"];

function ArcCard({ n, name, body, gate, capital, track, newTech, current, when }: {
  n: string;
  name: string;
  body: string;
  gate?: string;
  capital: string;
  track: Track;
  newTech?: boolean;
  current?: boolean;
  when?: string;
}) {
  return (
    <article
      className={`bg-[var(--po-paper)] p-5 flex flex-col gap-2.5 ${
        current ? "border-2 border-[var(--po-ink)]" : newTech ? "border border-dashed border-[var(--po-line-2)]" : "border hair"
      }`}
    >
      <div className="flex items-baseline gap-3">
        <span className="num text-[26px] leading-none" style={{ color: TRACK_COLOR[track] }}>
          {n}
        </span>
        <h3 className="font-medium text-[16px] leading-tight">{name}</h3>
        {current && <span className="ml-auto chip !bg-[var(--po-lime)] !text-black">Now</span>}
      </div>
      {when && <div className="mono text-[11.5px] muted">{when}</div>}
      <p className="text-[13.5px] ink2 leading-relaxed">{body}</p>
      <dl className="mt-auto pt-2 grid gap-1.5 text-[13px]">
        {gate && (
          <div>
            <dt className="mono text-[10px] uppercase tracking-wide muted">Next stage when</dt>
            <dd>{gate}</dd>
          </div>
        )}
        <div>
          <dt className="mono text-[10px] uppercase tracking-wide muted">Capital</dt>
          <dd className="num">{capital}</dd>
        </div>
      </dl>
    </article>
  );
}

function Band({ label, color, children }: { label: string; color: string; children: React.ReactNode }) {
  return (
    <div className="relative border hair p-3 md:p-4" style={{ background: `color-mix(in srgb, ${color} 6%, transparent)` }}>
      <div className="mono text-[11px] tracking-[0.12em] mb-3" style={{ color }}>
        {label}
      </div>
      {children}
    </div>
  );
}

export default function Roadmap() {
  const logPos = (lakh: number) => (Math.log10(lakh) / 4) * 100; // ₹1 L … ₹100 Cr
  const near = stages.map((s) => ({
    n: String(s.n),
    name: s.name,
    body: s.objective,
    capital: s.funding,
    when: s.when,
    current: s.current,
  }));

  return (
    <>
      <PageHead
        kicker="PlasticOptics · Roadmap"
        title="Measure first. Then remove."
        lede={
          <p>
            The goal is fast, industrial-scale removal of microplastics from drinking water. That needs detection fast
            enough to run continuously at a plant, and removal chemistry that works at plant volumes at a cost per cubic
            metre plants will pay. Neither exists today. Detection comes first because the chemistry exists now, and
            because removal can only be dosed, proven and sold against a measurement.
          </p>
        }
      />

      <Block id="arc" tag="The long arc" title="Seven stages. Each one funds the next.">
        <div className="grid gap-4">
          <Band label="DETECT · BATCH" color="var(--po-detect)">
            <div className="grid md:grid-cols-3 gap-3">
              {near.map((s) => (
                <ArcCard key={s.n} {...s} track="detect" />
              ))}
            </div>
          </Band>
          <Band label="DETECT · CONTINUOUS" color="var(--po-detect)">
            <ArcCard {...longArc[0]} n={String(longArc[0].n)} />
          </Band>
          <p className="text-[12.5px] muted px-1">
            ↓ The inline monitor becomes the control system for removal: it measures incoming water, sets the dose and
            verifies the output.
          </p>
          <Band label="REMOVE" color="var(--po-accent)">
            <div className="grid md:grid-cols-2 gap-3">
              {longArc.slice(1, 3).map((s) => (
                <ArcCard key={s.n} {...s} n={String(s.n)} />
              ))}
            </div>
          </Band>
          <ArcCard {...longArc[3]} n={String(longArc[3].n)} />
        </div>
        <p className="mt-4 text-[12.5px] muted">Dashed outlines mark stages that need new technology.</p>
      </Block>

      <Block id="capital" tag="Capital" title="Capital required by stage.">
        <Figure title="Estimated capital, ₹" note="Log scale. Stages 3–5 are early estimates.">
          <Axis labels={[[0, "₹1 L"], [25, "₹10 L"], [50, "₹1 Cr"], [75, "₹10 Cr"], [100, "₹100 Cr"]]} />
          <div className="grid gap-2">
            {capitalByStage.map((c) => {
              const a = logPos(c.range[0]);
              const b = logPos(c.range[1]);
              return (
                <RangeRow key={c.n} sub={`Stage ${c.n}`} label={c.name} value={c.label}>
                  <Gridlines ticks={[0, 25, 50, 75, 100]} />
                  <div
                    className="absolute top-1 bottom-1 min-w-[6px] rounded-[2px]"
                    style={{ left: `${a}%`, width: `${Math.max(b - a, 0.8)}%`, background: TRACK_COLOR[c.track] }}
                    title={`Stage ${c.n} · ${c.label}`}
                  />
                </RangeRow>
              );
            })}
            <RangeRow sub="Stage 6" label="Scale" value="Revenue">
              <span className="absolute inset-0 flex items-center text-[12px] muted">Revenue plus growth capital</span>
            </RangeRow>
          </div>
        </Figure>
      </Block>

      <Block
        id="long-range-economics"
        tag="Long-range economics"
        title="Monitoring and removal, at target costs."
        intro={
          <p>
            Targets at production volume for the products after the benchtop device. Prices come from what the product is
            worth to the plant. All of these will be tested with buyers before each stage.
          </p>
        }
      >
        <Figure title="Target cost and price per product" note="Each bar is the price. Coloured segments are cost; grey is gross margin.">
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] mb-5">
            {costKeys.map((k, i) => (
              <span key={k} className="inline-flex items-center gap-1.5">
                <i className="h-2.5 w-2.5 inline-block" style={{ background: COST_COLORS[i] }} />
                {k}
              </span>
            ))}
            <span className="inline-flex items-center gap-1.5">
              <i className="h-2.5 w-2.5 inline-block bg-[var(--po-line-2)]" />
              Gross margin
            </span>
          </div>
          <div className="grid gap-5">
            {longRangeProducts.map((p) => {
              const cost = p.cost.reduce((a, b) => a + b, 0);
              const m = Math.round(((p.price - cost) / p.price) * 100);
              return (
                <div key={p.name}>
                  <div className="flex flex-wrap justify-between gap-x-4 items-baseline mb-1.5 text-[13.5px]">
                    <span className="font-medium">
                      {p.name} <span className="mono text-[11px] muted ml-1">{p.stage}</span>
                    </span>
                    <span className="num text-[12px] ink2">
                      cost {inr(cost)} · price {inr(p.price)}
                    </span>
                  </div>
                  <div className="flex h-6 gap-[2px]" role="img" aria-label={`${p.name}: cost ${inr(cost)}, price ${inr(p.price)}, ${m}% margin`}>
                    {p.cost.map((v, i) =>
                      v ? (
                        <span
                          key={i}
                          className="h-full flex-none min-w-[3px]"
                          style={{ width: `${(v / p.price) * 100}%`, background: COST_COLORS[i] }}
                          title={`${costKeys[i]}: ${inr(v)}`}
                        />
                      ) : null,
                    )}
                    <span className="h-full flex-1 bg-[var(--po-line-2)] flex items-center justify-end pr-2 num text-[11px]">{m}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Figure>
      </Block>

      <Block
        id="cost-down"
        tag="Cost-down"
        title="How the cost of a test falls."
        intro={<p>Consumables per test on the lab bench today, and the target at production volume.</p>}
      >
        <div className="grid gap-6">
          <Figure title="Consumables per test: bench today → target" note="₹193 → ₹60, a 69% cut.">
            <Axis labels={[[0, "₹0"], [25, "₹50"], [50, "₹100"], [75, "₹150"], [100, "₹200"]]} />
            <div className="grid gap-2">
              {testCostSteps.map((s) => {
                const d = s.to - s.from;
                const value = s.kind === "total" ? inr(s.to) : s.kind === "cut" ? `−${inr(d)}` : `+${inr(d)}`;
                const bg = s.kind === "total" ? "var(--po-ink)" : s.kind === "cut" ? "var(--po-accent)" : "var(--po-muted)";
                return (
                  <RangeRow
                    key={s.label}
                    label={s.label}
                    value={value}
                    bold={s.kind === "total"}
                    valueClass={s.kind === "cut" ? "text-[var(--po-accent)]" : ""}
                  >
                    <Gridlines ticks={[0, 25, 50, 75, 100]} />
                    <div className="absolute top-1 bottom-1 rounded-[2px]" style={{ left: `${s.from / 2}%`, width: `${d / 2}%`, background: bg }} title={s.detail} />
                  </RangeRow>
                );
              })}
            </div>
          </Figure>

          <Figure title="Cost reduction levers" note="Cut to unit cost in the stages each lever applies to. Levers overlap, so cuts don't add.">
            <Axis labels={[[0, "0%"], [33.33, "10%"], [66.67, "20%"], [100, "30%"]]} />
            <div className="grid gap-2">
              {levers.map((l) => (
                <RangeRow key={l.name} sub={`Stage ${l.stages}`} label={l.name} value={`${l.low}–${l.high}%`}>
                  <Gridlines ticks={[0, 33.33, 66.67, 100]} />
                  <div className="absolute top-1 bottom-1 left-0 bg-[var(--po-accent-soft)]" style={{ width: `${(l.low / 30) * 100}%` }} />
                  <div
                    className="absolute top-1 bottom-1 bg-[var(--po-accent)]"
                    style={{ left: `${(l.low / 30) * 100}%`, width: `${((l.high - l.low) / 30) * 100}%` }}
                    title={l.how}
                  />
                </RangeRow>
              ))}
            </div>
          </Figure>
        </div>
      </Block>

      <Block id="beyond-water" tag="Beyond water" title="Food and air reuse the same detection core.">
        <div className="grid md:grid-cols-2 gap-4">
          {surfaces.slice(1).map((s) => (
            <div key={s.name} className="border hair bg-[var(--po-paper)] p-5">
              <div className="flex items-baseline justify-between">
                <h3 className="font-medium">{s.name}</h3>
                <span className="chip">{s.verdict}</span>
              </div>
              <p className="mt-2 text-[14px] ink2">{s.feasibility}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Callout tone="accent">Food is likely the largest revenue opportunity, across both detection and removal. R&D on salt starts in Stage 2.</Callout>
        </div>
        <p className="mt-6 text-[13.5px] muted">
          Back to the <Link to="/plastic" className="ulink">overview</Link>.
        </p>
      </Block>

      <Block id="read-next" tag="Go deeper">
        <NextLinks
          items={[
            { to: "/plastic/science", title: "Science", body: "How differential staining and AI counting work, and how we check against Raman." },
            { to: "/plastic/market", title: "Go-to-market", body: "Who buys first, why now, and what has to be true." },
          ]}
        />
      </Block>
    </>
  );
}
