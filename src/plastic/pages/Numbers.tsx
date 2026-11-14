import { useEffect, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { BASE, PRESETS, project, summarise, type Inputs, type Row } from "../model";
import { market } from "../data";
import { Block, Callout, PageHead, Src, Stat, inr } from "../ui";
import { PnlTable } from "../PnlTable";

type Field = {
  key: keyof Inputs;
  label: string;
  min: number;
  max: number;
  step: number;
  fmt: (v: number) => string;
  note?: string;
};

const FIELDS: { group: string; fields: Field[] }[] = [
  {
    group: "Device",
    fields: [
      { key: "devicePrice", label: "Device price", min: 150000, max: 600000, step: 10000, fmt: inr, note: "V2 range ₹3–4.5 L; the table uses ₹3 L" },
      { key: "deviceCost", label: "Device cost", min: 80000, max: 300000, step: 5000, fmt: inr, note: "V2: ₹1.2 L parts + ₹0.4 L assembly" },
    ],
  },
  {
    group: "Cartridge",
    fields: [
      { key: "cartridgePrice", label: "Cartridge price", min: 600, max: 3000, step: 50, fmt: inr, note: "Planning price ₹1,600, inside the ₹1,000–2,000 range" },
      { key: "cartridgeCost", label: "Cartridge cost", min: 50, max: 1000, step: 10, fmt: inr, note: "₹400 planning cost; bench consumables are ₹193 today" },
      { key: "testsPerYear", label: "Tests per plant per year", min: 50, max: 730, step: 10, fmt: (v) => `${v}`, note: "360 ≈ one test a day" },
    ],
  },
  {
    group: "Operating costs, a year",
    fields: [
      { key: "rdLakh", label: "R&D", min: 0, max: 300, step: 5, fmt: (v) => `₹${v} L`, note: "Scientists, lab, prototypes, validation" },
      { key: "gaLakh", label: "G&A", min: 0, max: 200, step: 5, fmt: (v) => `₹${v} L`, note: "Founder, finance, legal, patents, office" },
      { key: "salesLakh", label: "Sales & field service", min: 0, max: 200, step: 5, fmt: (v) => `₹${v} L`, note: "Sales hire, installation, service visits" },
    ],
  },
  {
    group: "Plants",
    fields: [
      { key: "pilotsY2", label: "Pilot plants, Year 2", min: 0, max: 30, step: 1, fmt: (v) => `${v}`, note: "Buy cartridges, not devices" },
      { key: "payingY3", label: "New paying plants, Year 3", min: 0, max: 50, step: 1, fmt: (v) => `${v}` },
      { key: "payingY4", label: "New paying plants, Year 4", min: 0, max: 50, step: 1, fmt: (v) => `${v}` },
      { key: "growth", label: "New paying plants a year, Year 5+", min: 0, max: 50, step: 1, fmt: (v) => `${v}`, note: "V2 assumes 0" },
    ],
  },
];

function useNarrow() {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return narrow;
}

function Chart({ rows }: { rows: Row[] }) {
  const narrow = useNarrow();
  const W = narrow ? 360 : 640;
  const H = narrow ? 240 : 260;
  const padL = 40;
  const padR = 12;
  const padT = 16;
  const padB = 34;
  const vals = rows.flatMap((r) => [r.operating, r.cumulative, 0]);
  let lo = Math.min(...vals);
  let hi = Math.max(...vals);
  const span = hi - lo || 1;
  lo -= span * 0.08;
  hi += span * 0.08;
  const y = (v: number) => padT + ((hi - v) / (hi - lo)) * (H - padT - padB);
  const step = (W - padL - padR) / rows.length;
  const x = (i: number) => padL + step * i + step / 2;
  const bw = Math.min(34, step * 0.5);
  const niceStep = (() => {
    const raw = (hi - lo) / 4;
    const p = Math.pow(10, Math.floor(Math.log10(raw)));
    return [1, 2, 2.5, 5, 10].map((m) => m * p).find((s) => s >= raw) ?? raw;
  })();
  const ticks: number[] = [];
  for (let t = Math.ceil(lo / niceStep) * niceStep; t <= hi; t += niceStep) ticks.push(Math.round(t));
  const line = rows.map((r, i) => `${i ? "L" : "M"}${x(i)},${y(r.cumulative)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Operating profit bars and cumulative line by year, ₹ lakh">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke={t === 0 ? "var(--po-ink)" : "var(--po-line)"} strokeWidth={t === 0 ? 1 : 1} />
          <text x={padL - 8} y={y(t) + 3.5} textAnchor="end" fontSize="10.5" fill="var(--po-muted)" fontFamily="var(--po-mono)">
            {t}
          </text>
        </g>
      ))}
      {rows.map((r, i) => (
        <g key={r.year}>
          <rect
            x={x(i) - bw / 2}
            width={bw}
            y={Math.min(y(0), y(r.operating))}
            height={Math.max(1, Math.abs(y(0) - y(r.operating)))}
            fill={r.operating > 0 ? "var(--po-ink)" : "var(--po-line-2)"}
          >
            <title>{`Year ${r.year}: operating ${r.operating.toFixed(1)}, cumulative ${r.cumulative.toFixed(1)} (₹ lakh)`}</title>
          </rect>
          <text x={x(i)} y={H - padB + 16} textAnchor="middle" fontSize="11" fill="var(--po-ink-2)" fontFamily="var(--po-mono)">
            Y{r.year}
          </text>
          <text x={x(i)} y={H - padB + 29} textAnchor="middle" fontSize="9.5" fill="var(--po-muted)" fontFamily="var(--po-mono)">
            {narrow ? r.active : `${r.active} plants`}
          </text>
        </g>
      ))}
      <path d={line} fill="none" stroke="var(--po-accent)" strokeWidth="2" />
      {rows.map((r, i) => (
        <circle key={r.year} cx={x(i)} cy={y(r.cumulative)} r="3.2" fill="var(--po-paper)" stroke="var(--po-accent)" strokeWidth="2" />
      ))}
    </svg>
  );
}

export default function Numbers() {
  const [inputs, setInputs] = useState<Inputs>(BASE);
  const [preset, setPreset] = useState("base");
  const rows = useMemo(() => project(inputs, 8), [inputs]);
  const s = useMemo(() => summarise(inputs, rows), [inputs, rows]);

  const set = (k: keyof Inputs, v: number) => {
    setInputs((p) => ({ ...p, [k]: v }));
    setPreset("");
  };

  const cartRevPlant = (inputs.cartridgePrice * inputs.testsPerYear) / 1e5;
  const plants = market.licensedPlants;
  const poolCart = (cartRevPlant * plants) / 100; // Cr
  const poolDevice = ((inputs.devicePrice / 1e5) * plants) / 100; // Cr

  const sens = [1000, 1600, 2000].map((p) => ({
    p,
    cells: [180, 360, 720].map((t) => Math.ceil(s.opex / (((p - inputs.cartridgeCost) * t) / 1e5))),
  }));

  return (
    <>
      <PageHead
        kicker="PlasticOptics · Numbers"
        title="The numbers, with every assumption exposed."
        lede={
          <p>
            The model below starts from the V2 break-even table and reproduces it exactly. Move any assumption and the
            whole plan updates: margins, the plants needed, the break-even year and the size of the hole before it.
          </p>
        }
      />

      <Block id="assumptions" tag="Assumptions" title="Start from a case, then change anything.">
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setInputs(p.inputs);
                setPreset(p.id);
              }}
              aria-pressed={preset === p.id}
              className={`text-[13px] px-3 py-1.5 border rounded transition-colors ${
                preset === p.id ? "bg-[var(--po-ink)] text-[var(--po-bg)] border-[var(--po-ink)]" : "hair hover:bg-[var(--po-paper)]"
              }`}
            >
              {p.label}
            </button>
          ))}
          {preset !== "base" && (
            <button
              type="button"
              onClick={() => {
                setInputs(BASE);
                setPreset("base");
              }}
              className="text-[13px] px-3 py-1.5 inline-flex items-center gap-1.5 muted hover:text-[var(--po-ink)]"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          )}
        </div>
        <p className="mt-3 text-[13px] muted min-h-[1.5em]">{PRESETS.find((p) => p.id === preset)?.note ?? "Custom case."}</p>

        <div className="mt-6 grid md:grid-cols-2 gap-px bg-[var(--po-line)] border hair">
          {FIELDS.map((g) => (
            <fieldset key={g.group} className="bg-[var(--po-paper)] p-5 grid gap-5 content-start">
              <legend className="sr-only">{g.group}</legend>
              <div className="mono text-[10.5px] uppercase tracking-wide muted">{g.group}</div>
              {g.fields.map((f) => (
                <label key={f.key} className="grid gap-1.5">
                  <span className="flex items-baseline justify-between gap-2 text-[13px]">
                    <span>{f.label}</span>
                    <span className="num text-[13px]">{f.fmt(inputs[f.key])}</span>
                  </span>
                  <input
                    type="range"
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    value={inputs[f.key]}
                    onChange={(e) => set(f.key, Number(e.target.value))}
                    aria-label={f.label}
                  />
                  {f.note && <span className="text-[11.5px] muted leading-snug">{f.note}</span>}
                </label>
              ))}
            </fieldset>
          ))}
        </div>
        <p className="mt-4 text-[12.5px] muted max-w-[70ch]">
          The V2 plan budgets ₹1.5 Cr a year of operating costs; the split across R&D, G&A and sales is a planning
          estimate. Cost of goods is not an operating cost here: it is already netted out in gross profit.
        </p>
      </Block>

      <Block id="results" tag="Results" title="What these assumptions imply.">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <Stat v={`₹${s.cartGrossPlant.toFixed(2)} L`} k="Cartridge gross profit per plant per year" />
          <Stat v={Number.isFinite(s.plantsToCover) ? `${s.plantsToCover} plants` : "never"} k={`Active plants to cover ₹${s.opex} L of operating costs`} accent />
          <Stat v={s.opBreakeven ? `Year ${s.opBreakeven}` : "Not by Year 8"} k="First year of operating profit" />
          <Stat v={`₹${(-s.trough / 100).toFixed(2)} Cr`} k={`Deepest cumulative deficit${s.troughYear ? ` (Year ${s.troughYear})` : ""}`} />
          <Stat v={s.payback ? `Year ${s.payback}` : "Not by Year 8"} k="Cumulative turns positive" />
          <Stat v={Number.isFinite(s.plantsToCover) ? `${((s.plantsToCover / plants) * 100).toFixed(1)}%` : "–"} k={`of ${plants.toLocaleString("en-IN")}+ licensed plants needed to break even`} />
        </div>

        <div className="mt-8 border hair bg-[var(--po-paper)] p-4 md:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
            <div className="font-medium text-[14.5px]">Operating profit and cumulative, ₹ lakh</div>
            <div className="flex gap-4 text-[12px] muted">
              <span className="inline-flex items-center gap-1.5">
                <i className="inline-block h-2.5 w-2.5 bg-[var(--po-ink)]" /> Operating profit
              </span>
              <span className="inline-flex items-center gap-1.5">
                <i className="inline-block h-0.5 w-4 bg-[var(--po-accent)]" /> Cumulative
              </span>
            </div>
          </div>
          <Chart rows={rows} />
        </div>

        <div className="mt-6">
          <PnlTable rows={rows} />
        </div>
        <p className="mt-3 text-[12.5px] muted">
          Pilot plants buy cartridges; their pilot units are funded by the Stage 1 raise. Plants added in a year buy cartridges for the full year. No churn. Year 1 has no revenue and is funded by the Stage 0 and Stage 1 raises.
        </p>
      </Block>

      <Block
        id="use-of-funds"
        tag="Use of funds"
        title="The raises pay for more than operating losses."
        intro={
          <p>
            The P&L above shows operating losses only. The three raises also pay for building the product, the pilots and
            the manufacturing base: things that are not yearly operating costs.
          </p>
        }
      >
        <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
          <table className="po-table min-w-[560px]">
            <thead>
              <tr>
                <th>Raise</th>
                <th>When</th>
                <th>Pays for</th>
                <th className="r">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-medium whitespace-nowrap">Stage 0 · the ask</td>
                <td className="whitespace-nowrap ink2">Now → ~6 months</td>
                <td className="ink2">Reagents, research collaboration, lab, optics, Raman/FTIR reference tests, stipend</td>
                <td className="r">₹23.8 L</td>
              </tr>
              <tr>
                <td className="font-medium whitespace-nowrap">Stage 1</td>
                <td className="whitespace-nowrap ink2">Months 6 → 24</td>
                <td className="ink2">Core team, 3–4 prototype rounds, 10 pilot units, patent filing, and the Year 2 operating loss</td>
                <td className="r">₹2 Cr</td>
              </tr>
              <tr>
                <td className="font-medium whitespace-nowrap">Stage 2</td>
                <td className="whitespace-nowrap ink2">Years 2 → 4</td>
                <td className="ink2">
                  Contract manufacturing, tooling, method validation, inventory, first sales hire, field service, the Year 3
                  operating loss, and the start of removal and food R&D
                </td>
                <td className="r">₹10 Cr</td>
              </tr>
              <tr className="em">
                <td>Total</td>
                <td />
                <td className="ink2 !font-normal">Deepest operating deficit in the model: ₹{(-s.trough / 100).toFixed(2)} Cr</td>
                <td className="r">₹12.24 Cr</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[13px] muted max-w-[68ch]">
          An itemised use of funds for Stages 1 and 2 comes after Stage 0, once cartridge cost, testing frequency and price
          are measured rather than estimated.
        </p>
      </Block>

      <Block
        id="sensitivity"
        tag="Sensitivity"
        title="Cartridge price and testing frequency decide everything."
        intro={
          <p>
            Active plants needed to cover ₹{s.opex} L of operating costs, at a cartridge cost of{" "}
            {inr(inputs.cartridgeCost)}. The device sale barely matters; the cartridge is the business.
          </p>
        }
      >
        <div className="overflow-x-auto">
          <table className="po-table max-w-[520px]">
            <thead>
              <tr>
                <th>Cartridge price ↓ · tests a year →</th>
                <th className="r">180</th>
                <th className="r">360</th>
                <th className="r">720</th>
              </tr>
            </thead>
            <tbody>
              {sens.map((row) => (
                <tr key={row.p}>
                  <td className="num">{inr(row.p)}</td>
                  {row.cells.map((c, i) => (
                    <td key={i} className={`r ${row.p === 1600 && i === 1 ? "bg-[var(--po-lime)] font-semibold" : ""}`}>
                      {Number.isFinite(c) && c > 0 ? c : "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`mt-6 ${Number.isFinite(sens[0].cells[0]) && sens[0].cells[0] > 0 ? "" : "hidden"}`}>
          <Callout>
            Even the worst corner (₹1,000 cartridges, a test every other day) needs {sens[0].cells[0]} plants:{" "}
            {((sens[0].cells[0] / plants) * 100).toFixed(1)}% of licensed packaged-water plants. That is why Stage 1 pilots
            must measure real testing frequency and price acceptance before anything else.
          </Callout>
        </div>
      </Block>

      <Block
        id="market-size"
        tag="Market size"
        title="Bottom up, from licensed plants."
        intro={
          <p>
            India has {plants.toLocaleString("en-IN")}+ BIS-licensed packaged drinking-water manufacturers <Src id="bis" />,
            in a packaged-water market of about ₹{market.packagedWaterMarketCr.toLocaleString("en-IN")} Cr in 2025, projected
            to reach ₹{market.packagedWaterMarket2032Cr.toLocaleString("en-IN")} Cr by 2032 <Src id="ibef" />. Beverage
            plants come on top.
          </p>
        }
      >
        <div className="grid sm:grid-cols-3 gap-2">
          <Stat v={`₹${cartRevPlant.toFixed(2)} L`} k={`Cartridge revenue per plant per year (${inr(inputs.cartridgePrice)} × ${inputs.testsPerYear})`} />
          <Stat v={`₹${Math.round(poolCart).toLocaleString("en-IN")} Cr`} k="A year, if every licensed plant tested at this rate" accent />
          <Stat v={`₹${Math.round(poolDevice).toLocaleString("en-IN")} Cr`} k="One-time device revenue across all licensed plants" />
        </div>
        <p className="mt-5 text-[13px] muted max-w-[68ch]">
          This is the packaged-water ceiling at today's assumed prices, not a forecast. It excludes beverage plants, testing
          labs, utilities, food and every removal product on the roadmap.
        </p>
      </Block>
    </>
  );
}
