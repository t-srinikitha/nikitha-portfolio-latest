import {
  costKeys,
  levers,
  longArc,
  longRangeProducts,
  stages,
  surfaces,
  testCostSteps,
  type Track,
} from "../data";
import { Axis, Block, Callout, Figure, Gridlines, PageHead, RangeRow, inr } from "../ui";

const TRACK_COLOR: Record<Track | "now", string> = {
  detect: "var(--po-detect)",
  remove: "var(--po-accent)",
  scale: "var(--po-ink)",
  now: "var(--po-ink)",
};
const COST_COLORS = ["#2a78d6", "#1baf7a", "#eda100", "#e87ba4", "#6250d6"];

function ArcCard({ n, name, body, gate, track, newTech, current, when }: {
  n: string;
  name: string;
  body: string;
  gate?: string;
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
        {current && <span className="ml-auto chip !bg-[var(--po-lime)] !text-black">Current</span>}
      </div>
      {when && <div className="mono text-[11.5px] muted">{when}</div>}
      <p className="text-[13.5px] ink2 leading-relaxed">{body}</p>
      {gate && (
        <dl className="mt-auto pt-2 text-[13px]">
          <dt className="text-[12.5px] muted">Objective before the next stage</dt>
          <dd>{gate}</dd>
        </dl>
      )}
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
    when: s.when,
    current: s.current,
  }));

  return (
    <>
      <PageHead
        title="R&D Roadmap"
        lede={
          <p>
            The long-term objective is industrial-scale removal of microplastics from water, food and air, beginning with
            drinking water. This requires continuous detection and removal chemistry that operates at plant volumes.
            Neither is available today.
            Detection is developed first, as removal must be dosed and verified against measurement.
          </p>
        }
      />

      <Block id="arc" title="Development Stages">
        <div className="grid gap-4">
          <Band label="DETECTION · BATCH" color="var(--po-detect)">
            <div className="grid md:grid-cols-3 gap-3">
              {near.map((s) => (
                <ArcCard key={s.n} {...s} track="detect" />
              ))}
            </div>
          </Band>
          <Band label="DETECTION · CONTINUOUS" color="var(--po-detect)">
            <ArcCard {...longArc[0]} n={String(longArc[0].n)} />
          </Band>
          <p className="text-[12.5px] muted px-1">
            ↓ The inline monitor serves as the control system for removal. It measures inflow, sets dosage and verifies
            output.
          </p>
          <Band label="REMOVAL" color="var(--po-accent)">
            <div className="grid md:grid-cols-2 gap-3">
              {longArc.slice(1, 3).map((s) => (
                <ArcCard key={s.n} {...s} n={String(s.n)} />
              ))}
            </div>
          </Band>
          <ArcCard {...longArc[3]} n={String(longArc[3].n)} />
        </div>
        <p className="mt-4 text-[12.5px] muted">Dashed outlines indicate stages that require new technology.</p>
      </Block>

      <Block
        id="long-range-economics"
       
        title="Target Unit Economics"
        intro={
          <p>
            Targets at production volume. Pricing reflects value to the plant and will be validated with buyers before each
            stage.
          </p>
        }
      >
        <Figure title="Target cost and price per product" note="Each bar represents price. Coloured segments represent cost; grey represents gross margin.">
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
       
        title="Cost Reduction"
        intro={<p>Consumables per test, from current bench cost to the target at volume. The financial model assumes ₹400 per cartridge; these reductions are not included.</p>}
      >
        <div className="grid gap-6">
          <Figure title="Consumables per test: bench today → target" note="From ₹193 to ₹60, a reduction of 69%.">
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

          <Figure title="Cost reduction levers" note="Reduction in unit cost by stage. Levers overlap; reductions are not additive.">
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

      <Block id="beyond-water" title="Food and Air Applications">
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
          <Callout tone="accent">Food represents the largest long-term revenue opportunity. Salt R&D begins in Stage 2.</Callout>
        </div>
      </Block>
    </>
  );
}
