import { useEffect } from "react";
import { ArrowDown, Mail } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import {
  hero,
  goal,
  problem,
  solution,
  customer,
  whyWater,
  stagesIntro,
  stages,
  unitEconomicsIntro,
  costKeys,
  products,
  testCostSteps,
  levers,
  ask,
  stage0Outcomes,
  afterStage0,
  summary,
  founder,
  type Track,
} from "@/content/plasticoptics";

const SECTIONS = [
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "why-water", label: "Why water" },
  { id: "stages", label: "Stages" },
  { id: "economics", label: "Economics" },
  { id: "ask", label: "The ask" },
  { id: "founder", label: "Founder" },
];

const border = "border-black/20 dark:border-white/20";
const LIME = "#DFFF00";

// Detection = excitation blue, removal = Nile Red emission.
const TRACK_TEXT: Record<Track, string> = {
  detect: "text-[#2c5cc9] dark:text-[#7c9dff]",
  remove: "text-[#c5401e] dark:text-[#ff6b45]",
  other: "",
};
const TRACK_BG: Record<Track, string> = {
  detect: "bg-[#2c5cc9] dark:bg-[#7c9dff]",
  remove: "bg-[#c5401e] dark:bg-[#ff6b45]",
  other: "bg-black dark:bg-white",
};
const COST_COLORS = ["#2a78d6", "#1baf7a", "#eda100", "#e87ba4", "#6250d6"];

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

function Marker({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline">
      <span
        aria-hidden
        className="absolute inset-0 -skew-y-1 -rotate-1"
        style={{ backgroundColor: LIME, clipPath: "polygon(1% 15%, 99% 5%, 100% 85%, 2% 95%)", opacity: 0.8 }}
      />
      <span className="relative dark:text-black">{children}</span>
    </span>
  );
}

function Section({
  id,
  index,
  label,
  title,
  children,
}: {
  id: string;
  index: number;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-t border-black/10 dark:border-white/10" />
      </div>
      <section id={id} className="max-w-4xl mx-auto px-6 py-16 md:py-20 scroll-mt-16">
        <p className="text-xs uppercase tracking-widest opacity-60 mb-3">
          {String(index).padStart(2, "0")} / {label}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-8 max-w-2xl">{title}</h2>
        {children}
      </section>
    </>
  );
}

function ChartCard({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <figure className={`p-5 md:p-6 border ${border}`}>
      <figcaption className="mb-6">
        <h3 className="font-bold">{title}</h3>
        {note && <p className="mt-1 text-sm opacity-70">{note}</p>}
      </figcaption>
      {children}
    </figure>
  );
}

/** Label | track | value row used by the range charts. */
function Row({
  label,
  sub,
  value,
  valueClass = "",
  bold,
  children,
}: {
  label: string;
  sub?: string;
  value: string;
  valueClass?: string;
  bold?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[110px_1fr_64px] md:grid-cols-[220px_1fr_96px] gap-3 items-center">
      <div className={`text-xs md:text-sm leading-snug ${bold ? "font-bold" : ""}`}>
        {sub && <span className="block text-[10px] md:text-xs opacity-60">{sub}</span>}
        {label}
      </div>
      <div className="relative h-5">{children}</div>
      <div className={`text-xs md:text-sm text-right tabular-nums ${bold ? "font-bold" : ""} ${valueClass}`}>{value}</div>
    </div>
  );
}

function Gridlines({ ticks }: { ticks: number[] }) {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      {ticks.map((t) => (
        <i key={t} className="absolute top-0 bottom-0 w-px bg-black/10 dark:bg-white/10" style={{ left: `${Math.min(t, 99.8)}%` }} />
      ))}
    </div>
  );
}

function Axis({ labels }: { labels: [number, string][] }) {
  return (
    <div aria-hidden className="grid grid-cols-[110px_1fr_64px] md:grid-cols-[220px_1fr_96px] gap-3 mb-2">
      <span />
      <div className="relative h-4 text-[10px] md:text-xs opacity-60 tabular-nums">
        {labels.map(([pos, l], i) => (
          <span
            key={l}
            className="absolute whitespace-nowrap"
            style={{
              left: `${pos}%`,
              transform: i === 0 ? "none" : i === labels.length - 1 ? "translateX(-100%)" : "translateX(-50%)",
            }}
          >
            {l}
          </span>
        ))}
      </div>
      <span />
    </div>
  );
}

function StageCard({ s }: { s: (typeof stages)[number] }) {
  return (
    <article
      className={`p-5 flex flex-col gap-3 bg-cream dark:bg-cream-dark ${
        s.current
          ? "border-2 border-black dark:border-white"
          : s.newTech
            ? "border border-dashed border-black/50 dark:border-white/50"
            : `border ${border}`
      }`}
    >
      <div className="flex items-baseline gap-3">
        <span className={`text-3xl font-bold leading-none ${TRACK_TEXT[s.track]}`}>{s.n}</span>
        <h3 className="font-bold text-lg leading-tight">{s.name}</h3>
        {s.current && (
          <span className="ml-auto text-xs px-2 py-0.5 border border-black text-black" style={{ backgroundColor: LIME }}>
            Now
          </span>
        )}
      </div>
      <p className="text-sm leading-relaxed opacity-80">{s.body}</p>
      <dl className="mt-auto grid gap-2 text-sm">
        {s.gate && (
          <div>
            <dt className="text-[10px] uppercase tracking-widest opacity-60">Next stage when</dt>
            <dd>{s.gate}</dd>
          </div>
        )}
        <div>
          <dt className="text-[10px] uppercase tracking-widest opacity-60">Capital</dt>
          <dd className="font-bold">{s.capital}</dd>
        </div>
      </dl>
    </article>
  );
}

function Band({ track, label, children }: { track: Track; label: string; children: React.ReactNode }) {
  return (
    <div className="relative pl-0 md:pl-10">
      <p
        className={`text-xs tracking-widest font-bold mb-3 md:mb-0 md:absolute md:left-0 md:top-0 md:h-full md:[writing-mode:vertical-rl] md:rotate-180 md:text-center ${TRACK_TEXT[track]}`}
      >
        {label}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-2 items-stretch">{children}</div>
    </div>
  );
}

function Arrow({ dashed }: { dashed?: boolean }) {
  return (
    <span aria-hidden className={`hidden md:flex items-center justify-center text-lg ${dashed ? "opacity-50" : "opacity-80"}`}>
      {dashed ? "⇢" : "→"}
    </span>
  );
}

export default function PlasticOptics() {
  useEffect(() => {
    const prev = document.title;
    document.title = "PlasticOptics — Sri Nikitha T";
    return () => {
      document.title = prev;
    };
  }, []);

  const byN = Object.fromEntries(stages.map((s) => [s.n, s]));
  const logPos = (lakh: number) => (Math.log10(lakh) / 4) * 100; // ₹1 L … ₹100 Cr

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-12 md:pt-24">
        <p className="text-xs uppercase tracking-widest opacity-60 mb-6">{hero.eyebrow}</p>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-3xl">{hero.title}</h1>
        <p className="mt-6 text-base md:text-lg leading-relaxed opacity-80 max-w-2xl">{hero.summary}</p>

        <div className="mt-8 inline-flex items-center gap-3 px-4 py-2 border border-black dark:border-white text-sm">
          <span className="h-2 w-2 rounded-full ring-1 ring-black dark:ring-white" style={{ backgroundColor: LIME }} />
          {hero.status}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={`mailto:${founder.email}?subject=PlasticOptics`}
            className="inline-flex items-center gap-2 px-5 py-2 border border-black dark:border-white rounded-full text-sm hover:bg-black hover:text-cream dark:hover:bg-white dark:hover:text-cream-dark transition-colors"
          >
            <Mail className="h-4 w-4" /> Talk to me
          </a>
          <a href="#ask" className="inline-flex items-center gap-2 px-5 py-2 text-sm opacity-70 hover:opacity-100 transition-opacity">
            See the ask <ArrowDown className="h-4 w-4" />
          </a>
        </div>

        {/* In short */}
        <div className="mt-14 p-6 border border-black dark:border-white">
          <p className="text-xs uppercase tracking-widest opacity-60 mb-4">In short</p>
          <ol className="grid gap-4">
            {summary.map((s, i) => (
              <li key={i} className="grid grid-cols-[24px_1fr] gap-3 text-sm md:text-base leading-relaxed">
                <span className="h-6 w-6 grid place-items-center text-xs bg-black text-cream dark:bg-white dark:text-cream-dark">
                  {i + 1}
                </span>
                <span>
                  <b>{s.lead}</b>
                  {s.rest}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <nav aria-label="Sections" className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {SECTIONS.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} className="opacity-60 hover:opacity-100 transition-opacity">
              <span className="opacity-60">{String(i + 1).padStart(2, "0")}</span> {s.label}
            </a>
          ))}
        </nav>
      </section>

      {/* Problem */}
      <Section id="problem" index={1} label="Problem" title="Nobody can measure the microplastics in what they bottle.">
        <p className="text-base leading-relaxed opacity-80 max-w-2xl">{problem.intro}</p>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-black/20 dark:bg-white/20 border border-black/20 dark:border-white/20">
          {problem.today.map((t) => (
            <div key={t.label} className="bg-cream dark:bg-cream-dark p-5">
              <p className="text-xl md:text-2xl font-bold">{t.value}</p>
              <p className="mt-2 text-xs leading-snug opacity-70">{t.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-lg md:text-xl font-medium max-w-2xl">
          <Marker>{problem.punchline}</Marker>
        </p>
        <p className="mt-8 text-sm leading-relaxed opacity-70 max-w-2xl">
          <span className="font-bold opacity-100">The goal: </span>
          {goal}
        </p>
      </Section>

      {/* Solution */}
      <Section id="solution" index={2} label="Solution" title={solution.headline}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solution.points.map((p) => (
            <div key={p.title} className={`p-6 border ${border}`}>
              <h3 className="font-bold text-lg mb-2">{p.title}</h3>
              <p className="text-sm leading-relaxed opacity-75">{p.body}</p>
            </div>
          ))}
        </div>

        <h3 className="mt-14 mb-6 text-sm font-medium opacity-60">{solution.method.title}</h3>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solution.method.steps.map((s, i) => (
            <li key={s.step}>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-xs opacity-50">{i + 1}</span>
                <span className="font-bold">{s.step}</span>
                {i < solution.method.steps.length - 1 && <span aria-hidden className="hidden md:inline opacity-40 ml-auto">→</span>}
              </div>
              <p className="text-sm leading-relaxed opacity-75">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 p-6 border border-black dark:border-white">
          <p className="text-xs uppercase tracking-widest opacity-60 mb-2">Business model</p>
          <p className="text-base leading-relaxed">{solution.model}</p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="opacity-60 mb-1">Who pays</p>
            <p className="font-medium">{customer.who}</p>
            <p className="mt-2 opacity-75 leading-relaxed">{customer.why}</p>
          </div>
          <div>
            <p className="opacity-60 mb-1">First pilot</p>
            <p className="font-medium">{customer.pilot}</p>
          </div>
        </div>
      </Section>

      {/* Why water */}
      <Section id="why-water" index={3} label="Why water first" title="Start with drinking water. Extend to food and air.">
        <p className="text-base leading-relaxed opacity-80 max-w-2xl mb-10">{whyWater.intro}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyWater.surfaces.map((s, i) => (
            <div key={s.name} className={`p-6 border ${i === 0 ? "border-black dark:border-white" : border}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold">{s.name}</h3>
                <span
                  className={`text-xs px-2 py-0.5 border ${i === 0 ? "text-black border-black" : border}`}
                  style={i === 0 ? { backgroundColor: LIME } : undefined}
                >
                  {s.tag}
                </span>
              </div>
              <p className="text-sm leading-relaxed opacity-75">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Stages */}
      <Section id="stages" index={4} label="Stages" title="Detect first. Then remove. Each stage funds the next.">
        <p className="text-base leading-relaxed opacity-80 max-w-2xl mb-10">{stagesIntro}</p>

        <div className="grid gap-6">
          <StageCard s={byN["0"]} />
          <Band track="detect" label="DETECT">
            <StageCard s={byN["1"]} />
            <Arrow dashed />
            <StageCard s={byN["2"]} />
          </Band>
          <p className="text-xs opacity-70 md:pl-10 -my-2">
            ↓ The Stage 2 monitor becomes the control system of Stage 4: it measures incoming water, sets the dose and verifies the output.
          </p>
          <Band track="remove" label="REMOVE">
            <StageCard s={byN["3"]} />
            <Arrow dashed />
            <StageCard s={byN["4"]} />
          </Band>
          <StageCard s={byN["5"]} />
        </div>
        <p className="mt-4 text-xs opacity-60">Dashed outlines and arrows mark steps that need new technology.</p>

        <div className="mt-12">
          <ChartCard title="Capital required by stage" note="Estimates, on a log scale.">
            <Axis labels={[[0, "₹1 L"], [25, "₹10 L"], [50, "₹1 Cr"], [75, "₹10 Cr"], [100, "₹100 Cr"]]} />
            <div className="grid gap-2">
              {stages.map((s) => (
                <Row key={s.n} sub={`Stage ${s.n}`} label={s.name} value={s.capitalLakh ? s.capital.replace("est. ", "").split(" · ")[0] : "Revenue"}>
                  {s.capitalLakh ? (
                    <>
                      <Gridlines ticks={[0, 25, 50, 75, 100]} />
                      <div
                        className={`absolute top-1 bottom-1 min-w-[6px] ${TRACK_BG[s.track]}`}
                        style={{ left: `${logPos(s.capitalLakh[0])}%`, width: `${logPos(s.capitalLakh[1]) - logPos(s.capitalLakh[0])}%` }}
                        title={`Stage ${s.n} · ${s.capital}`}
                      />
                    </>
                  ) : (
                    <span className="absolute inset-0 flex items-center text-xs opacity-60">Funded by revenue plus growth capital</span>
                  )}
                </Row>
              ))}
            </div>
          </ChartCard>
        </div>
      </Section>

      {/* Economics */}
      <Section id="economics" index={5} label="Unit economics" title="Detection pays for removal, at 70–85% gross margin.">
        <p className="text-base leading-relaxed opacity-80 max-w-2xl mb-10">{unitEconomicsIntro}</p>

        <div className="grid gap-8">
          <ChartCard title="Target cost and price per product" note="Each bar is the price. Coloured segments are cost; grey is gross margin.">
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs mb-6">
              {costKeys.map((k, i) => (
                <span key={k} className="inline-flex items-center gap-2">
                  <i className="h-3 w-3 inline-block" style={{ backgroundColor: COST_COLORS[i] }} />
                  {k}
                </span>
              ))}
              <span className="inline-flex items-center gap-2">
                <i className="h-3 w-3 inline-block bg-black/15 dark:bg-white/20" />
                Gross margin
              </span>
            </div>
            <div className="grid gap-5">
              {products.map((p) => {
                const cost = p.cost.reduce((a, b) => a + b, 0);
                const mPct = Math.round(((p.price - cost) / p.price) * 100);
                return (
                  <div key={p.name}>
                    <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 items-baseline mb-1.5 text-sm">
                      <span className="font-bold">
                        {p.name} <span className="font-normal text-xs opacity-60 ml-1">{p.stage}</span>
                      </span>
                      <span className="text-xs tabular-nums opacity-80">
                        cost <b>{inr(cost)}</b> · price <b>{inr(p.price)}</b>
                      </span>
                    </div>
                    <div className="flex h-6 gap-0.5" role="img" aria-label={`${p.name}: cost ${inr(cost)}, price ${inr(p.price)}, ${mPct}% gross margin`}>
                      {p.cost.map((v, i) =>
                        v ? (
                          <span
                            key={i}
                            className="h-full min-w-[3px] flex-none"
                            style={{ width: `${(v / p.price) * 100}%`, backgroundColor: COST_COLORS[i] }}
                            title={`${costKeys[i]}: ${inr(v)} · ${Math.round((v / cost) * 100)}% of cost`}
                          />
                        ) : null,
                      )}
                      <span
                        className="h-full flex-1 bg-black/15 dark:bg-white/20 flex items-center justify-end pr-2 text-xs tabular-nums"
                        title={`Gross margin: ${inr(p.price - cost)} · ${mPct}% of price`}
                      >
                        {mPct}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </ChartCard>

          <ChartCard title="Stage 1 test cost: bench today to target" note="Consumables per test fall from ₹193 to ₹60, a 69% cut.">
            <Axis labels={[[0, "₹0"], [25, "₹50"], [50, "₹100"], [75, "₹150"], [100, "₹200"]]} />
            <div className="grid gap-2">
              {testCostSteps.map((s) => {
                const d = s.to - s.from;
                const value = s.kind === "total" ? inr(s.to) : s.kind === "cut" ? `−${inr(d)}` : `+${inr(d)}`;
                const color =
                  s.kind === "total" ? "bg-black dark:bg-white" : s.kind === "cut" ? TRACK_BG.remove : "bg-black/40 dark:bg-white/40";
                return (
                  <Row
                    key={s.label}
                    label={s.label}
                    value={value}
                    bold={s.kind === "total"}
                    valueClass={s.kind === "cut" ? TRACK_TEXT.remove : ""}
                  >
                    <Gridlines ticks={[0, 25, 50, 75, 100]} />
                    <div
                      className={`absolute top-1 bottom-1 ${color}`}
                      style={{ left: `${s.from / 2}%`, width: `${d / 2}%` }}
                      title={s.detail}
                    />
                  </Row>
                );
              })}
            </div>
          </ChartCard>

          <ChartCard
            title="Cost reduction levers"
            note="Cut to unit cost in the stages each lever applies to. Levers overlap, so cuts don't add."
          >
            <Axis labels={[[0, "0%"], [33.33, "10%"], [66.67, "20%"], [100, "30%"]]} />
            <div className="grid gap-2">
              {levers.map((l) => (
                <Row key={l.name} sub={`Stage ${l.stages}`} label={l.name} value={`${l.low}–${l.high}%`}>
                  <Gridlines ticks={[0, 33.33, 66.67, 100]} />
                  <div className="absolute top-1 bottom-1 left-0 bg-[#c5401e]/20 dark:bg-[#ff6b45]/25" style={{ width: `${(l.low / 30) * 100}%` }} />
                  <div
                    className={`absolute top-1 bottom-1 ${TRACK_BG.remove}`}
                    style={{ left: `${(l.low / 30) * 100}%`, width: `${((l.high - l.low) / 30) * 100}%` }}
                    title={`${l.how} · ${l.low}–${l.high}%`}
                  />
                </Row>
              ))}
            </div>
          </ChartCard>
        </div>
      </Section>

      {/* Ask */}
      <Section id="ask" index={6} label="The ask" title={`${ask.total} and ${ask.duration} to prove the chemistry.`}>
        <p className="text-base opacity-80 mb-10 max-w-2xl">{ask.purpose}</p>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10">
          <div className="p-6 border-2 border-black dark:border-white self-start">
            <p className="text-xs uppercase tracking-widest opacity-60">Stage 0 · Pathway</p>
            <p className="mt-3 text-4xl font-bold">{ask.total}</p>
            <p className="mt-1 text-sm opacity-70">{ask.duration}</p>
            <p className={`mt-6 pt-4 border-t ${border} text-sm`}>
              <span className="opacity-60">Next stage when: </span>
              {byN["0"].gate}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium opacity-60 mb-4">What Stage 0 delivers</h3>
            <ul className="space-y-4">
              {stage0Outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-sm leading-relaxed">
                  <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 ring-1 ring-black dark:ring-white" style={{ backgroundColor: LIME }} />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
            <p className={`mt-8 pt-6 border-t ${border} text-sm opacity-75 leading-relaxed`}>{afterStage0}</p>
          </div>
        </div>
      </Section>

      {/* Founder */}
      <Section id="founder" index={7} label="Founder" title={founder.name}>
        <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8 items-start">
          <div className="w-40 aspect-square overflow-hidden border border-black dark:border-white">
            <img src="/Profile.jpeg" alt={founder.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-base leading-relaxed opacity-80 max-w-2xl">{founder.bio}</p>
            <a href="/climate" className="inline-block mt-4 text-sm underline underline-offset-4 opacity-70 hover:opacity-100">
              Full climate and sustainability track record →
            </a>
          </div>
        </div>
      </Section>

      {/* Closing CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center border-t border-black/10 dark:border-white/10">
        <p className="text-xl md:text-2xl font-bold max-w-xl mx-auto leading-snug">
          If you want to help make India's drinking water measurable, and then clean, let's talk.
        </p>
        <a
          href={`mailto:${founder.email}?subject=PlasticOptics`}
          className="mt-8 inline-flex items-center gap-2 px-6 py-2.5 border border-black dark:border-white rounded-full text-sm hover:bg-black hover:text-cream dark:hover:bg-white dark:hover:text-cream-dark transition-colors"
        >
          <Mail className="h-4 w-4" /> {founder.email}
        </a>
      </section>

      <Footer />
    </div>
  );
}
