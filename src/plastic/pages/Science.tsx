import { stage0Done } from "../data";
import { Block, Callout, NextLinks, PageHead, Src } from "../ui";

const steps = [
  { n: "01", t: "Sample", b: "Water drawn from the batch or line." },
  { n: "02", t: "Filter", b: "A cartridge membrane traps particles." },
  { n: "03", t: "Stain", b: "Dyes mark plastic particles apart from natural ones." },
  { n: "04", t: "Image and count", b: "Microscope and optical filters image the membrane. AI counts stained particles." },
];

const compare = [
  ["Time to result", "72 hours+", "20–30 minutes"],
  ["Where", "External lab", "On site"],
  ["Who runs it", "Spectroscopy specialist", "Plant QC team"],
  ["Cost per test", "₹3,000–5,000", "₹1,000–2,000 cartridge"],
  ["Equipment to buy", "~₹1.5 Cr: Raman spectrometer + lab equipment", "₹3–4.5 L device"],
  ["Tells you", "Polymer identity and count", "Microplastic count"],
  ["Role", "Reference and confirmation", "Routine screening"],
];

function Membrane() {
  // Deterministic scatter: plastics fluoresce (accent), natural particles stay grey.
  const pts = Array.from({ length: 70 }, (_, i) => {
    const a = i * 2.39996;
    const r = Math.sqrt((i + 0.5) / 70) * 92;
    const plastic = (i * 7) % 5 === 0 || (i * 3) % 11 === 0;
    return { x: 110 + r * Math.cos(a), y: 110 + r * Math.sin(a), s: 1.6 + ((i * 13) % 7) * 0.45, plastic };
  });
  return (
    <svg viewBox="0 0 220 220" className="w-full max-w-[260px] h-auto" role="img" aria-label="Illustration of a filter membrane with stained plastic particles glowing among unstained natural particles">
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

export default function Science() {
  return (
    <>
      <PageHead
        kicker="PlasticOptics · Science"
        title="Science"
        lede={
          <p>
            Spectroscopy identifies each particle chemically. It is slow and expensive. PlasticOptics counts plastic
            particles with dyes, optics and software. Low cost. On site.
          </p>
        }
      />

      <Block id="method" tag="Method" title="Method">
        <div className="grid md:grid-cols-[1fr_240px] gap-8 items-center">
          <ol className="grid gap-5">
            {steps.map((s) => (
              <li key={s.n} className="grid grid-cols-[32px_1fr] gap-3">
                <span className="num text-[13px] muted pt-1">{s.n}</span>
                <div>
                  <h3 className="font-medium">{s.t}</h3>
                  <p className="text-[14px] ink2 mt-0.5">{s.b}</p>
                </div>
              </li>
            ))}
          </ol>
          <figure className="flex flex-col items-center gap-2">
            <Membrane />
            <figcaption className="text-[12px] muted text-center">Illustration. Stained plastics fluoresce.</figcaption>
          </figure>
        </div>
      </Block>

      <Block id="compare" tag="Comparison" title="Versus spectroscopy">
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
      </Block>

      <Block
        id="validation"
        tag="Stage 0"
        title="Validation"
        intro={<p>Same samples, two methods: ours and Raman/FTIR. Research collaborators: Prof. Sarit S. Agasti (JNCASR) and Prof. Suryasarathi Bose (IISc).</p>}
      >
        <ol className="grid gap-3">
          {stage0Done.map((d, i) => (
            <li key={d} className="grid grid-cols-[28px_1fr] gap-3 text-[15px]">
              <span className="num text-[13px] muted pt-0.5">0{i + 1}</span>
              <span>{d}</span>
            </li>
          ))}
        </ol>
        <div className="mt-8 grid sm:grid-cols-3 gap-px bg-[var(--po-line)] border hair">
          {[
            ["Iron", "Iron particles must not count as plastic."],
            ["Organics", "Organic matter can bind dyes. Staining must separate it."],
            ["Turbidity", "Suspended solids can hide particles."],
          ].map(([t, b]) => (
            <div key={t} className="bg-[var(--po-paper)] p-4">
              <div className="font-medium">{t}</div>
              <p className="mt-1 text-[13px] ink2">{b}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block
        id="standards"
        tag="Regulation"
        title="Standards"
        intro={<p>Results must map to official size classes.</p>}
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
      </Block>

      <Block id="removal" tag="Removal" title="Removal chemistry">
        <p className="ink2 max-w-[62ch]">
          Metal-phenolic networks (tamarind, iron) bind microplastics. Proven at millilitre scale only. Scaling to cubic
          metres per hour is the hardest step in the plan.
        </p>
        <div className="mt-6">
          <Callout tone="accent">Removal requires measurement. Detection comes first.</Callout>
        </div>
      </Block>

      <Block id="read-next" tag="More">
        <NextLinks
          items={[
            { to: "/plastic/roadmap", title: "Roadmap", body: "Detection to removal." },
            { to: "/plastic/numbers", title: "Numbers", body: "P&L and break-even model." },
          ]}
        />
      </Block>
    </>
  );
}
