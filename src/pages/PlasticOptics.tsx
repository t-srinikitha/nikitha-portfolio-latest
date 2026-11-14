import { useEffect } from "react";
import { ArrowDown, Mail } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import {
  hero,
  goal,
  problem,
  solution,
  whyWater,
  customer,
  stages,
  unitEconomics,
  projection,
  breakevenNote,
  ask,
  stage0Outcomes,
  afterStage0,
  founder,
} from "@/content/plasticoptics";

const SECTIONS = [
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "why-water", label: "Why water" },
  { id: "roadmap", label: "Roadmap" },
  { id: "economics", label: "Economics" },
  { id: "ask", label: "The ask" },
  { id: "founder", label: "Founder" },
];

const border = "border-black/20 dark:border-white/20";

function Marker({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline">
      <span
        aria-hidden
        className="absolute inset-0 -skew-y-1 -rotate-1"
        style={{
          backgroundColor: "#DFFF00",
          clipPath: "polygon(1% 15%, 99% 5%, 100% 85%, 2% 95%)",
          opacity: 0.8,
        }}
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

function fmt(n: number) {
  return n.toFixed(1);
}

export default function PlasticOptics() {
  useEffect(() => {
    const prev = document.title;
    document.title = "PlasticOptics — Sri Nikitha T";
    return () => {
      document.title = prev;
    };
  }, []);

  const maxMargin = Math.max(...projection.map((p) => p.totalMargin), projection[0].fixed) * 1.1;
  const fixedPct = (projection[0].fixed / maxMargin) * 100;
  const maxBudget = Math.max(...ask.budget.map((b) => b.lakh));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 md:pt-24">
        <p className="text-xs uppercase tracking-widest opacity-60 mb-6">{hero.eyebrow}</p>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-3xl">
          {hero.title}
        </h1>
        <p className="mt-6 text-base md:text-lg leading-relaxed opacity-80 max-w-2xl">
          {hero.summary}
        </p>

        <div className="mt-8 inline-flex items-center gap-3 px-4 py-2 border border-black dark:border-white text-sm">
          <span className="h-2 w-2 rounded-full bg-[#DFFF00] ring-1 ring-black dark:ring-white" />
          {hero.status}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={`mailto:${founder.email}?subject=PlasticOptics`}
            className="inline-flex items-center gap-2 px-5 py-2 border border-black dark:border-white rounded-full text-sm hover:bg-black hover:text-cream dark:hover:bg-white dark:hover:text-cream-dark transition-colors"
          >
            <Mail className="h-4 w-4" /> Talk to me
          </a>
          <a
            href="#ask"
            className="inline-flex items-center gap-2 px-5 py-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
          >
            See the ask <ArrowDown className="h-4 w-4" />
          </a>
        </div>

        {/* Contents */}
        <nav aria-label="Sections" className="mt-14 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {SECTIONS.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} className="opacity-60 hover:opacity-100 transition-opacity">
              <span className="opacity-60">{String(i + 1).padStart(2, "0")}</span> {s.label}
            </a>
          ))}
        </nav>
      </section>

      {/* Problem */}
      <Section id="problem" index={1} label="Problem" title="Plants can't measure the microplastics in what they bottle.">
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
            <li key={s.step} className="relative">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-xs opacity-50">{i + 1}</span>
                <span className="font-bold">{s.step}</span>
                {i < solution.method.steps.length - 1 && (
                  <span aria-hidden className="hidden md:inline opacity-40 ml-auto">→</span>
                )}
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
            <div
              key={s.name}
              className={`p-6 border ${i === 0 ? "border-black dark:border-white" : border}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold">{s.name}</h3>
                <span
                  className={`text-xs px-2 py-0.5 border ${
                    i === 0 ? "bg-[#DFFF00] text-black border-black" : border
                  }`}
                >
                  {s.tag}
                </span>
              </div>
              <p className="text-sm leading-relaxed opacity-75">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm opacity-60 max-w-2xl">Long-term goal: {goal}</p>
      </Section>

      {/* Roadmap */}
      <Section id="roadmap" index={4} label="Roadmap" title="Three stages, from proof to revenue.">
        <ol className="space-y-0">
          {stages.map((s) => (
            <li
              key={s.stage}
              className={`grid grid-cols-1 md:grid-cols-[120px_1fr_180px] gap-4 md:gap-8 p-6 border -mt-px ${
                s.current ? "border-black dark:border-white relative z-10" : border
              }`}
            >
              <div>
                <p className="text-xs opacity-60">Stage</p>
                <p className="text-3xl font-bold">{s.stage}</p>
                {s.current && (
                  <span className="inline-block mt-2 text-xs px-2 py-0.5 bg-[#DFFF00] text-black border border-black">
                    Now
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg">{s.name}</h3>
                <p className="text-xs opacity-60 mt-1">{s.timeline}</p>
                <p className="mt-3 text-sm leading-relaxed">{s.objective}</p>
                <p className="mt-2 text-sm leading-relaxed opacity-65">{s.spend}</p>
              </div>
              <div className="md:text-right">
                <p className="text-xs opacity-60">Funding</p>
                <p className="font-bold text-lg">{s.funding}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Economics */}
      <Section id="economics" index={5} label="Unit economics" title="A device sale, then a cartridge every test.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: "Device", ...unitEconomics.device, note: "One-time sale per plant" },
            { name: "Test cartridge", ...unitEconomics.cartridge, note: "Consumed every test, reordered continuously" },
          ].map((u) => (
            <div key={u.name} className={`p-6 border ${border}`}>
              <h3 className="font-bold mb-1">{u.name}</h3>
              <p className="text-xs opacity-60 mb-5">{u.note}</p>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-xs opacity-60">Cost</dt>
                  <dd className="text-xl font-bold">{u.cost}</dd>
                </div>
                <div>
                  <dt className="text-xs opacity-60">Price</dt>
                  <dd className="text-xl font-bold">{u.price}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="opacity-60 mb-2">Device cost breakdown</p>
            <ul className="space-y-1">
              {unitEconomics.costBreakdown.map((c) => (
                <li key={c.item} className="flex justify-between gap-4">
                  <span className="opacity-80">{c.item}</span>
                  <span className="font-medium whitespace-nowrap">{c.cost}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="opacity-60 mb-2">For comparison</p>
            <p>
              {unitEconomics.compare.label}: <span className="font-bold">{unitEconomics.compare.value}</span>
            </p>
            <p className="mt-1">
              Plants spend <span className="font-bold">₹3,000–5,000</span> per lab test today.
            </p>
          </div>
        </div>
        <p className="mt-6 text-xs opacity-60">{unitEconomics.caveat}</p>

        {/* Breakeven */}
        <h3 className="mt-16 mb-2 font-bold text-lg">Path to break-even</h3>
        <p className="text-sm opacity-75 max-w-2xl mb-8">{breakevenNote}</p>

        <figure aria-label="Total margin by year against ₹150 lakh fixed costs">
          <div className="flex items-center gap-2 mb-6 text-xs opacity-70">
            <span aria-hidden className="w-6 border-t border-dashed border-black dark:border-white" />
            Fixed costs ₹{projection[0].fixed} L / yr
          </div>
          <div className="relative h-48 flex items-end gap-3 md:gap-6 border-b border-black dark:border-white">
            <div
              aria-hidden
              className="absolute left-0 right-0 z-10 border-t border-dashed border-black dark:border-white"
              style={{ bottom: `${fixedPct}%` }}
            />
            {projection.map((p) => {
              const profitable = p.operating > 0;
              return (
                <div key={p.year} className="flex-1 flex flex-col items-center justify-end h-full">
                  <span className="text-xs mb-1 font-medium">{fmt(p.totalMargin)}</span>
                  <div
                    className={`w-full max-w-[56px] border border-black dark:border-white ${
                      profitable ? "bg-[#DFFF00]" : "bg-black/10 dark:bg-white/15"
                    }`}
                    style={{ height: `${(p.totalMargin / maxMargin) * 100}%` }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex gap-3 md:gap-6 mt-2">
            {projection.map((p) => (
              <div key={p.year} className="flex-1 text-center text-xs">
                <p>{p.year}</p>
                <p className="opacity-60">{p.active} plants</p>
              </div>
            ))}
          </div>
          <figcaption className="mt-3 text-xs opacity-60">
            Total margin (device + cartridge), ₹ lakh. Highlighted years cover fixed costs.
          </figcaption>
        </figure>

        <div className="mt-10 overflow-x-auto -mx-6 px-6">
          <table className="w-full min-w-[640px] text-sm border-collapse">
            <thead>
              <tr className="text-left text-xs opacity-60">
                <th className="py-2 pr-4 font-normal">₹ lakh</th>
                {projection.map((p) => (
                  <th key={p.year} className="py-2 px-2 font-normal text-right">{p.year}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ["New paying plants", "newPaying", false],
                  ["New pilot plants", "newPilot", false],
                  ["Active plants", "active", false],
                  ["Device margin", "deviceMargin", true],
                  ["Cartridge margin", "cartridgeMargin", true],
                  ["Total margin", "totalMargin", true],
                  ["Fixed costs", "fixed", true],
                  ["Operating profit", "operating", true],
                  ["Cumulative", "cumulative", true],
                ] as const
              ).map(([label, key, money]) => (
                <tr
                  key={key}
                  className={`border-t ${border} ${key === "operating" ? "font-bold" : ""}`}
                >
                  <td className="py-2 pr-4 whitespace-nowrap">{label}</td>
                  {projection.map((p) => {
                    const v = p[key] as number;
                    return (
                      <td
                        key={p.year}
                        className={`py-2 px-2 text-right tabular-nums ${
                          key === "operating" && v > 0 ? "bg-[#DFFF00] text-black" : ""
                        }`}
                      >
                        {money ? fmt(v) : v}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Ask */}
      <Section id="ask" index={6} label="The ask" title={`${ask.total} to prove the technology.`}>
        <p className="text-base opacity-80 mb-10">{ask.purpose}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-sm font-medium opacity-60 mb-4">Where the money goes (₹ lakh)</h3>
            <ul className="space-y-3">
              {ask.budget.map((b) => (
                <li key={b.item} className="text-sm">
                  <div className="flex justify-between gap-4 mb-1">
                    <span>{b.item}</span>
                    <span className="font-medium tabular-nums">{b.lakh}</span>
                  </div>
                  <div className="h-2 border border-black/30 dark:border-white/30">
                    <div
                      className="h-full bg-black dark:bg-white"
                      style={{ width: `${(b.lakh / maxBudget) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
              <li className={`flex justify-between pt-3 border-t ${border} text-sm font-bold`}>
                <span>Total</span>
                <span className="tabular-nums">
                  {ask.budget.reduce((s, b) => s + b.lakh, 0).toFixed(1)}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium opacity-60 mb-4">What Stage 0 delivers</h3>
            <ul className="space-y-4">
              {stage0Outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-sm leading-relaxed">
                  <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 bg-[#DFFF00] ring-1 ring-black dark:ring-white" />
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
          If you want to help make every batch of drinking water measurable, let's talk.
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
