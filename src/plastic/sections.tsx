// Sections shared by the Overview, Business Model and R&D Roadmap pages.
import { breakEven, incumbent, market, phases, prices, problem, stages } from "./data";
import { Src } from "./ui";

const fmt = (n: number) => n.toLocaleString("en-IN");
const cr = (n: number) => `₹${fmt(Math.round(n))} Cr`;

/** The three phases: water first, then food and air. */
export function PhaseCards() {
  return (
    <div className="grid md:grid-cols-3 gap-px bg-[var(--po-line)] border hair">
      {phases.map((x) => (
        <div key={x.n} className={`p-5 ${x.n === 1 ? "bg-white" : "bg-[var(--po-paper)]"}`}>
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="serif text-[24px] leading-none">{x.name}</h3>
            <span
              className={`mono text-[10.5px] uppercase tracking-wide px-1.5 py-0.5 whitespace-nowrap ${
                x.n === 1 ? "bg-[var(--po-ink)] text-[var(--po-bg)]" : "bg-[var(--po-chip)] ink2"
              }`}
            >
              Phase {x.n}
            </span>
          </div>
          <p className="mt-3 text-[14px] ink2 leading-relaxed">{x.text}</p>
        </div>
      ))}
    </div>
  );
}

/** The problem in three short cards. */
export function ProblemCards() {
  return (
    <div className="grid md:grid-cols-3 gap-px bg-[var(--po-line)] border hair">
      {problem.map((x) => (
        <div key={x.k} className="bg-[var(--po-paper)] p-5">
          <h3 className="serif text-[22px] leading-none">{x.k}</h3>
          <p className="mt-3 text-[14px] ink2 leading-relaxed">{x.text}</p>
          {x.src.length > 0 && (
            <div className="mt-3 flex gap-3">
              {x.src.map((id) => (
                <Src key={id} id={id} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const YEARS = 5;

/** Phase 1 as a timeline: stages run in parallel from Year 3. */
export function StageTimeline() {
  return (
    <div>
      <div className="grid md:grid-cols-[230px_1fr] gap-4 mb-2">
        <div className="hidden md:block" />
        <div className="grid grid-cols-5 mono text-[11px] muted">
          {Array.from({ length: YEARS }, (_, i) => (
            <div key={i} className="border-l hair pl-1.5">
              Year {i + 1}
            </div>
          ))}
        </div>
      </div>
      <ol className="grid gap-3 md:gap-2">
        {stages.map((x) => (
          <li key={x.n} className="md:grid md:grid-cols-[230px_1fr] md:gap-4 md:items-center">
            <div className="flex items-baseline gap-2 text-[14px]">
              <span className={`num ${x.current ? "text-[var(--po-accent)]" : "muted"}`}>{x.n}</span>
              <span className="font-medium leading-snug">{x.name}</span>
            </div>
            <div className="relative h-7 mt-1.5 md:mt-0 bg-[var(--po-paper)] border hair">
              <div
                className={`absolute inset-y-0 flex items-center justify-end pr-1.5 mono text-[11px] ${
                  x.current ? "bg-[var(--po-accent)] text-white" : "bg-[var(--po-ink)] text-[var(--po-bg)]"
                }`}
                style={{ left: `${(x.start / YEARS) * 100}%`, width: `${((x.end - x.start) / YEARS) * 100}%` }}
                title={x.when}
              >
                {x.ongoing && "→"}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Each stage of Phase 1 with its notes and funding. */
export function StageList({ detail = true }: { detail?: boolean }) {
  return (
    <ol className="border-t hair">
      {stages.map((x) => (
        <li key={x.n} className="grid grid-cols-[36px_1fr] md:grid-cols-[48px_1fr_220px] gap-x-4 gap-y-2 py-5 border-b hair">
          <div className={`num text-[26px] leading-none ${x.current ? "text-[var(--po-accent)]" : ""}`}>{x.n}</div>
          <div>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-medium text-[16px]">{x.name}</h3>
              <span className="mono text-[12px] muted">{x.when}</span>
              {x.current && <span className="chip !bg-[var(--po-lime)] !text-black">Current</span>}
            </div>
            <p className="mt-1.5 text-[14.5px] max-w-[60ch]">{x.what}</p>
            {detail && (
              <ul className="mt-2 grid gap-1 text-[13.5px] ink2 max-w-[60ch] list-disc pl-4">
                {x.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="col-start-2 md:col-start-3 md:text-right">
            <div className="text-[12px] muted">Funding</div>
            <div className="num text-[14px] mt-0.5">{x.funding.split(" (")[0]}</div>
            {x.funding.includes(" (") && (
              <div className="text-[12.5px] ink2 leading-snug mt-0.5">{x.funding.split(" (")[1].replace(/\)$/, "")}</div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

const pct = (a: number, b: number) => Math.round((1 - a / b) * 100);

/** Current methods against PlasticOptics. */
export function CostComparison() {
  const layers = [
    {
      name: "Current methods (Raman or FTIR spectroscopy)",
      strong: false,
      cards: [
        { k: "Equipment", v: incumbent.equipment, d: "Raman spectrometer and supporting laboratory equipment." },
        { k: "Personnel", v: "Specialist staff", d: "Trained spectroscopists to prepare samples and operate the instrument." },
        { k: "Per test", v: incumbent.perTest, d: "Market rate. Results in 10 days or more." },
      ],
    },
    {
      name: "PlasticOptics",
      strong: true,
      cards: [
        { k: "Equipment", v: "₹8 L", d: "Benchtop analyser." },
        { k: "Personnel", v: "None", d: "Operated by the plant's existing quality-control staff." },
        { k: "Per test", v: "₹2,000", d: "Single-use test cartridge. Results in 20–30 minutes." },
      ],
    },
  ];
  return (
    <div className="grid gap-6">
      {layers.map((layer) => (
        <div key={layer.name}>
          <h4 className="font-medium">{layer.name}</h4>
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
  );
}
export const savings = { equipment: pct(8, 150), perTest: pct(2000, 75000) };

/** The break-even table, as written in the founder's plan. */
export function BreakEvenTable() {
  const dash = (v: string | number) => (v === "" ? "–" : v);
  return (
    <>
      <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
        <table className="po-table text-[13.5px] min-w-[620px] md:min-w-0">
          <thead>
            <tr>
              <th>Year</th>
              <th className="r !whitespace-normal">Active plants (new)</th>
              <th className="r !whitespace-normal">Cartridge sales</th>
              <th className="r !whitespace-normal">Device sales and maintenance</th>
              <th className="r">Revenue</th>
              <th className="r !whitespace-normal">Capital infusion</th>
              <th className="r !whitespace-normal">Overall costs</th>
            </tr>
            <tr className="text-[12px]">
              <td className="muted !font-normal !whitespace-normal">How calculated</td>
              <td className="r muted !whitespace-normal">Plants on device (new)</td>
              <td className="r muted !whitespace-normal">₹2k × 360 × active plants</td>
              <td className="r muted !whitespace-normal">₹8 L × active plants</td>
              <td className="r muted !whitespace-normal">Sales and maintenance</td>
              <td className="r muted !whitespace-normal">EV, Seed, Series A</td>
              <td className="r muted !whitespace-normal">G&amp;A, S&amp;M, COGS</td>
            </tr>
          </thead>
          <tbody>
            {breakEven.map((r) => (
              <tr key={r.year}>
                <td className="whitespace-nowrap">Year {r.year}</td>
                <td className="r">
                  {r.active} ({r.added})
                </td>
                <td className="r">{r.cartridges}</td>
                <td className="r">{r.device}</td>
                <td className="r font-medium">{r.revenue}</td>
                <td className="r">{dash(r.capital)}</td>
                <td className="r">{dash(r.costs)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[13.5px] muted max-w-[70ch]">
        Cartridge and device figures are in ₹ lakh. Prices are set for an {prices.marginPct}% margin: ₹2,000 per
        cartridge and ₹8 lakh per analyser. The device column includes service and maintenance for each active plant.
        Costs beyond Year 1 are not yet modelled.
      </p>
    </>
  );
}

/** Bottom-up market size for bottled water at PlasticOptics prices, ₹ crore. */
export const sizing = (() => {
  const ratio = market.globalVolumeBnL / market.indiaVolumeBnL;
  const cartPerPlant = prices.cartridge * prices.testsPerYear; // ₹ per plant per year
  const indiaCart = (market.licensedPlants * cartPerPlant) / 1e7;
  const indiaDevice = (market.licensedPlants * prices.device) / 1e7;
  const round = (n: number) => Math.round(n / 100) * 100;
  return { ratio: Math.round(ratio), cartPerPlant, indiaCart, indiaDevice, globalCart: round(indiaCart * ratio), globalDevice: round(indiaDevice * ratio) };
})();

const usd = (croreValue: number) => {
  const m = (croreValue * 1e7) / market.usd / 1e6;
  return m >= 1000 ? `US$${(m / 1000).toFixed(1)} billion` : `US$${Math.round(m / 10) * 10} million`;
};
const withUsd = (n: number) => (
  <>
    {cr(n)} <span className="block sm:inline muted font-sans text-[12.5px] whitespace-nowrap">({usd(n)})</span>
  </>
);

export function MarketSize() {
  const z = sizing;
  return (
    <div className="grid gap-8">
      <div className="min-w-0">
        <h3 className="font-medium">Packaged drinking water, at PlasticOptics prices</h3>
        <div className="mt-3">
          <table className="po-table text-[14px]">
            <thead>
              <tr>
                <th>Revenue</th>
                <th className="r">India</th>
                <th className="r">Global</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Test cartridges, per year</td>
                <td className="r">{cr(z.indiaCart)}</td>
                <td className="r">{withUsd(z.globalCart)}</td>
              </tr>
              <tr>
                <td>Analysers, service and maintenance, per year</td>
                <td className="r">{cr(z.indiaDevice)}</td>
                <td className="r">{withUsd(z.globalDevice)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[13.5px] muted max-w-[70ch]">
          India has {fmt(market.licensedPlants)}+ licensed packaged drinking water plants <Src id="bis" />. Each plant is
          counted at ₹8 lakh a year for the analyser, service and maintenance, and 360 cartridges at ₹2,000. India bottles
          about 25 billion litres a year <Src id="indiaVolume" /> and the world about {market.globalVolumeBnL} billion
          litres <Src id="unu" />, so the global figures are the India figures multiplied by {z.ratio}, at India prices.
          US dollar figures use ₹{market.usd} per dollar.
        </p>
      </div>
      <div className="min-w-0">
        <h3 className="font-medium">Food and air, existing spend on testing</h3>
        <div className="mt-3">
          <table className="po-table text-[14px]">
            <thead>
              <tr>
                <th>Market</th>
                <th className="r">India</th>
                <th className="r">Global</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Food safety testing <Src id="foodTesting" />
                </td>
                <td className="r !whitespace-normal">
                  206 notified laboratories <Src id="fssaiLabs" />
                </td>
                <td className="r !whitespace-normal">US$24 billion a year</td>
              </tr>
              <tr>
                <td>
                  Air quality monitoring <Src id="airGlobal" />
                </td>
                <td className="r !whitespace-normal">
                  US$170 million a year <Src id="airIndia" />
                </td>
                <td className="r !whitespace-normal">US$5.2 billion a year</td>
              </tr>
              <tr>
                <td>
                  Microplastic detection, all media <Src id="mpDetection" />
                </td>
                <td className="r">–</td>
                <td className="r !whitespace-normal">US$4.8 billion a year</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
