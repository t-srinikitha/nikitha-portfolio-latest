import { focus, stage0Done } from "../data";
import { PhaseCards, StageList, StageTimeline } from "../sections";
import { Block, Callout, PageHead, Src, Sub } from "../ui";

const order = [
  {
    t: "Water first",
    b: "Research on detection and removal in water is sufficient to begin, and the methods for food and air build on it.",
  },
  {
    t: "Test cartridge before analyser",
    b: "The cartridge is the core of the system. The analyser is built around a cartridge that works in real water.",
  },
  {
    t: "Testing service during the pilots",
    b: "A ₹5,000 testing service builds the data set and early demand before the analyser is sold.",
  },
  {
    t: "Raman and removal in parallel",
    b: "Once the analyser sells, the Raman spectrometer adds the identity and source of each particle, and the removal kit acts on what the analyser measures.",
  },
  {
    t: "Food and air after Phase 1",
    b: "Food and air use the same detection method with different sample preparation, and follow once Phase 1 reaches product–market fit.",
  },
];

const steps = [
  {
    n: "01",
    t: "Sample",
    b: "Water is drawn from the production batch or line.",
  },
  {
    n: "02",
    t: "Filter",
    b: "A membrane within the cartridge captures particles.",
  },
  {
    n: "03",
    t: "Stain",
    b: "Differential dyes distinguish plastic particles from natural particles.",
  },
  {
    n: "04",
    t: "Image and count",
    b: "A microscope with optical filters images the membrane. AI software counts the stained particles.",
  },
];

const compare = [
  ["Time to result", "10 days or more", "20–30 minutes"],
  ["Location", "External laboratory; samples often shipped abroad", "On site"],
  ["Operator", "Spectroscopy specialist", "Plant quality-control staff"],
  ["Cost per test", "₹75,000", "₹2,000 cartridge"],
  ["Capital equipment", "₹1.5 crore: Raman spectrometer and laboratory equipment", "₹8 lakh analyser"],
  ["Output", "Polymer identity and count", "Microplastic count and plastic class"],
  ["Application", "Reference and confirmation", "Routine screening"],
];

function Membrane() {
  // Deterministic scatter: plastics fluoresce (accent), natural particles stay grey.
  const pts = Array.from({ length: 70 }, (_, i) => {
    const a = i * 2.39996;
    const r = Math.sqrt((i + 0.5) / 70) * 92;
    const plastic = (i * 7) % 5 === 0 || (i * 3) % 11 === 0;
    return {
      x: 110 + r * Math.cos(a),
      y: 110 + r * Math.sin(a),
      s: 1.6 + ((i * 13) % 7) * 0.45,
      plastic,
    };
  });
  return (
    <svg
      viewBox="0 0 220 220"
      className="w-full max-w-[260px] h-auto"
      role="img"
      aria-label="Illustration of a filter membrane with stained plastic particles glowing among unstained natural particles"
    >
      <defs>
        <radialGradient id="glow" r="1">
          <stop offset="0" stopColor="var(--po-accent)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--po-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="110" cy="110" r="104" fill="#1b1a1f" />
      <circle cx="110" cy="110" r="104" fill="none" stroke="var(--po-line-2)" strokeWidth="2" />
      {pts.map((p, i) =>
        p.plastic ? (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={p.s * 3.2} fill="url(#glow)" />
            <circle cx={p.x} cy={p.y} r={p.s} fill="#ffb59a" />
          </g>
        ) : (
          <circle key={i} cx={p.x} cy={p.y} r={p.s * 0.8} fill="#5b5964" />
        ),
      )}
    </svg>
  );
}

export default function Technology() {
  return (
    <>
      <PageHead
        title="Technology"
        lede={
          <p>
            Spectroscopy identifies each particle chemically, which makes it slow and costly. PlasticOptics counts plastic
            particles with dyes, optics and software, at low cost and on site. The roadmap below sets out the order of
            the work.
          </p>
        }
      />

      <Block id="how" title="How It Works">
        <Sub id="method" title="Measurement Method">
          <div className="grid md:grid-cols-[1fr_240px] gap-8 items-center">
            <ol className="grid gap-5">
              {steps.map((s) => (
                <li key={s.n} className="grid grid-cols-[32px_1fr] gap-3">
                  <span className="num text-[13px] muted pt-1">{s.n}</span>
                  <div>
                    <h4 className="font-medium">{s.t}</h4>
                    <p className="text-[14px] ink2 mt-0.5">{s.b}</p>
                  </div>
                </li>
              ))}
            </ol>
            <figure className="flex flex-col items-center gap-2">
              <Membrane />
              <figcaption className="text-[12px] muted text-center">
                Illustration: stained plastic particles fluoresce.
              </figcaption>
            </figure>
          </div>
        </Sub>

        <Sub id="compare" title="Comparison with Spectroscopy">
          <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
            <table className="po-table min-w-[520px]">
              <thead>
                <tr>
                  <th />
                  <th>FTIR / Raman lab</th>
                  <th>PlasticOptics</th>
                </tr>
              </thead>
              <tbody>
                {compare.map(([k, a, b]) => (
                  <tr key={k}>
                    <td className="muted whitespace-nowrap">{k}</td>
                    <td className="ink2">{a}</td>
                    <td className="font-medium">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Sub>

        <Sub id="removal" title="Removal Chemistry">
          <p className="ink2 max-w-[62ch]">
            Metal-phenolic networks (tamarind and iron) bind microplastics, but have been demonstrated only at millilitre
            scale. Scaling to cubic metres per hour is the principal technical challenge in the plan.
          </p>
          <div className="mt-6">
            <Callout tone="accent">Removal depends on measurement. Detection is therefore developed first.</Callout>
          </div>
        </Sub>
      </Block>

      <Block id="validation-group" title="Validation">
        <Sub
          id="validation"
          title="Validation Plan"
          intro={
            <p>
              Each sample is analysed by both PlasticOptics and Raman/FTIR. Research collaborators: Prof. Sarit S.
              Agasti (JNCASR) and Prof. Suryasarathi Bose (IISc).
            </p>
          }
        >
          <ol className="grid gap-3">
            {stage0Done.map((d, i) => (
              <li key={d} className="grid grid-cols-[28px_1fr] gap-3 text-[14px]">
                <span className="num text-[13px] muted pt-0.5">0{i + 1}</span>
                <span>{d}</span>
              </li>
            ))}
          </ol>
          <div className="mt-8 grid sm:grid-cols-3 gap-px bg-[var(--po-line)] border hair">
            {[
              ["Iron", "Iron particles must be excluded from plastic counts."],
              ["Organics", "Organic matter can bind dyes; differential staining must distinguish it."],
              ["Turbidity", "Suspended solids can obscure particles."],
            ].map(([t, b]) => (
              <div key={t} className="bg-[var(--po-paper)] p-4">
                <div className="font-medium">{t}</div>
                <p className="mt-1 text-[13px] ink2">{b}</p>
              </div>
            ))}
          </div>
        </Sub>

        <Sub
          id="standards"
          title="Regulatory Size Classes"
          intro={<p>Results must align with official size classifications.</p>}
        >
          <table className="po-table">
            <thead>
              <tr>
                <th>Method</th>
                <th>Size range</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-medium">
                  EU drinking water, 2024 <Src id="eu" />
                </td>
                <td className="num">20 µm – 5 mm</td>
                <td className="ink2">Filter cascade; at least 1,000 litres per sample; counts per m³</td>
              </tr>
              <tr>
                <td className="font-medium">
                  California, 2022 <Src id="californiaNews" />
                </td>
                <td className="num">&gt; 20 or 50 µm</td>
                <td className="ink2">Source water first, treated water next; FTIR or Raman</td>
              </tr>
            </tbody>
          </table>
        </Sub>
      </Block>

      <Block id="roadmap" title="R&D Roadmap" intro={<p>The work is planned in three phases, beginning with water.</p>}>
        <Sub id="phases" title="Water, Food and Air">
          <PhaseCards />
        </Sub>

        <Sub id="stages" title="Phase 1 Stages" intro={<p>{focus}</p>}>
          <StageTimeline />
          <div className="mt-10">
            <StageList detail />
          </div>
        </Sub>

        <Sub id="order" title="Reasons for this Order">
          <dl className="border-t hair">
            {order.map((x) => (
              <div key={x.t} className="grid md:grid-cols-[240px_1fr] gap-x-6 gap-y-1 py-4 border-b hair">
                <dt className="font-medium">{x.t}</dt>
                <dd className="ink2 max-w-[60ch]">{x.b}</dd>
              </div>
            ))}
          </dl>
        </Sub>
      </Block>
    </>
  );
}
