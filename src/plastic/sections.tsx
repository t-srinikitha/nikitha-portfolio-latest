// Sections shared by the Overview and Business Model pages.
import { airOption, comparables, market, missionCapital, stageGroups, stages, type StageMarket } from "./data";
import { BASE, SCENARIOS, crore, project, summarise } from "./model";
import { Src, Stat } from "./ui";

const rows = project(BASE);
export const base = summarise(BASE, rows);

const round = (n: number, to: number) => Math.round(n / to) * to;
const cr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")} Cr`;
const usd = (croreValue: number) => {
  const m = (croreValue * 1e7) / market.usd / 1e6;
  return m >= 1000 ? `US$${(m / 1000).toFixed(1)} billion` : `US$${round(m, 10)} million`;
};

/** Bottom-up market size for bottled water at PlasticOptics prices, ₹ crore. */
export const sizing = (() => {
  const ratio = market.globalVolumeBnL / market.indiaVolumeBnL;
  const indiaCart = (market.licensedPlants * base.cartRevPlant) / 100;
  const indiaDevice = (market.licensedPlants * BASE.devicePrice) / 1e7;
  return {
    ratio: Math.round(ratio),
    indiaCart,
    indiaDevice,
    brandCart: (market.nationalBrandPlants * base.cartRevPlant) / 100,
    brandDevice: (market.nationalBrandPlants * BASE.devicePrice) / 1e7,
    globalCart: round(indiaCart * ratio, 100),
    globalDevice: round(indiaDevice * ratio, 100),
  };
})();

const withUsd = (n: number) => (
  <>
    {cr(n)} <span className="block sm:inline muted font-sans text-[12.5px] whitespace-nowrap">({usd(n)})</span>
  </>
);

export function MarketSize({ notes = true }: { notes?: boolean }) {
  const z = sizing;
  return (
    <div className="grid gap-8">
      <div className="min-w-0">
        <h3 className="font-medium">Bottled water, at PlasticOptics prices</h3>
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
                <td>Analysers, one-time</td>
                <td className="r">{cr(z.indiaDevice)}</td>
                <td className="r">{withUsd(z.globalDevice)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={notes ? "mt-3 text-[13.5px] muted max-w-[70ch]" : "hidden"}>
          India has {market.licensedPlants.toLocaleString("en-IN")}+ licensed packaged drinking water plants <Src id="bis" />.
          Each plant is counted at one ₹5 lakh analyser and ₹{base.cartRevPlant.toFixed(1)} lakh of cartridges a year. India
          bottles about 25 billion litres a year <Src id="indiaVolume" /> and the world about{" "}
          {market.globalVolumeBnL} billion litres <Src id="unu" />, so the global figures are the India figures multiplied
          by {z.ratio}, at India prices. US dollar figures use ₹{market.usd} per dollar.
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
        <p className={notes ? "mt-3 text-[13.5px] muted max-w-[70ch]" : "hidden"}>
          These are existing markets that microplastic testing of food and air would sell into. Published estimates of
          food testing spend in India differ by more than ten times and are not used here. India operates 1,524 air
          quality monitoring stations <Src id="airStations" />. The share of these markets available to PlasticOptics
          cannot be estimated until the method is validated for food and air.
        </p>
      </div>
    </div>
  );
}

export function BreakEvenStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      <Stat v={crore(base.cashRequired)} k="Cash required to reach operating profit" accent />
      <Stat v={`Year ${base.breakeven}`} k="First year of operating profit" />
      <Stat v={`${base.plantsAtBreakeven} plants`} k={`Bottling plants using the analyser in Year ${base.breakeven}`} />
      <Stat v={crore(base.revenueAtBreakeven ?? 0)} k={`Revenue in Year ${base.breakeven}`} />
    </div>
  );
}

const scenarioResults = SCENARIOS.map((sc) => summarise(sc.inputs, project(sc.inputs)));
export const scenarioRange = {
  latest: Math.max(...scenarioResults.map((x) => x.breakeven ?? 99)),
  low: Math.min(...scenarioResults.map((x) => x.cashRequired)),
  high: Math.max(...scenarioResults.map((x) => x.cashRequired)),
};

export function BreakEvenTable({ lastYear = 6 }: { lastYear?: number }) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="po-table text-[14px]">
          <thead>
            <tr>
              <th>Year</th>
              <th className="r !whitespace-normal">Bottling plants</th>
              <th className="r">Revenue</th>
              <th className="r !whitespace-normal">Operating profit</th>
              <th className="r !whitespace-normal">Cumulative cash</th>
            </tr>
          </thead>
          <tbody>
            {rows
              .filter((r) => r.year <= lastYear)
              .map((r) => (
                <tr key={r.year} className={r.year === base.breakeven ? "em" : ""}>
                  <td className="whitespace-nowrap">Year {r.year}</td>
                  <td className="r">{r.active}</td>
                  <td className="r">{r.revenue.toFixed(1)}</td>
                  <td className={`r ${r.operating < 0 ? "text-[var(--po-accent)]" : ""} ${r.year === base.breakeven ? "bg-[var(--po-lime)]" : ""}`}>
                    {r.operating.toFixed(1)}
                  </td>
                  <td className="r">{r.cumulative.toFixed(1)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[13.5px] muted max-w-[70ch]">
        ₹ lakh. The break-even covers the benchtop analyser for bottling plants only. Research for food, in-line
        analysis and removal is funded separately and is not included. Year 1 includes ₹{BASE.validationLakh} lakh of
        technology validation. Years 1 and 2 include ₹
        {((BASE.developmentLakh[0] + BASE.developmentLakh[1]) / 100).toFixed(0)} crore of product development: prototypes,
        ten pilot analysers, a patent filing and validation of the method. Operating costs are ₹
        {(BASE.opexLakh / 100).toFixed(1)} crore a year from Year 2. Cash required is the largest cumulative deficit of{" "}
        {crore(base.deficit)}, plus a {BASE.reservePct}% reserve for inventory, receivables and contingency.
      </p>
    </>
  );
}

export function ScenarioTable() {
  return (
    <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
      <table className="po-table text-[14px] min-w-[560px]">
        <thead>
          <tr>
            <th>Case</th>
            <th>Assumption changed</th>
            <th className="r !whitespace-normal">Operating profit from</th>
            <th className="r !whitespace-normal">Plants</th>
            <th className="r !whitespace-normal">Cash required</th>
          </tr>
        </thead>
        <tbody>
          {SCENARIOS.map((sc) => {
            const x = summarise(sc.inputs, project(sc.inputs));
            return (
              <tr key={sc.id} className={sc.id === "base" ? "em" : ""}>
                <td className="whitespace-nowrap">{sc.label}</td>
                <td className="ink2 !font-normal">{sc.change}</td>
                <td className="r">{x.breakeven ? `Year ${x.breakeven}` : "Not reached"}</td>
                <td className="r">{x.plantsAtBreakeven ?? "–"}</td>
                <td className="r">{crore(x.cashRequired)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export const missionTotal = {
  low: missionCapital.reduce((a, m) => a + m.low, 0),
  high: missionCapital.reduce((a, m) => a + m.high, 0),
};
export const missionUsd = `US$${Math.round((missionTotal.low * 1e7) / market.usd / 1e6)}–${Math.round((missionTotal.high * 1e7) / market.usd / 1e6)} million`;

export function MissionCapital() {
  return (
    <div>
      <table className="po-table text-[14px]">
        <thead>
          <tr>
            <th>Stage</th>
            <th>Work</th>
            <th className="r">₹ crore</th>
          </tr>
        </thead>
        <tbody>
          {missionCapital.map((m) => (
            <tr key={m.programme}>
              <td className="num whitespace-nowrap">{m.stage}</td>
              <td>
                <span className="font-medium">{m.programme}</span>
                <span className="block ink2">{m.scope}</span>
              </td>
              <td className="r">{m.low === m.high ? m.low : `${m.low}–${m.high}`}</td>
            </tr>
          ))}
          <tr className="em">
            <td />
            <td>Total</td>
            <td className="r">
              {missionTotal.low}–{missionTotal.high}
            </td>
          </tr>
        </tbody>
      </table>
      <p className="mt-3 text-[13.5px] muted max-w-[70ch]">
        Removal is costed for water only. Removal from food and air, and detection in air, are not yet defined and are
        not included.
      </p>
    </div>
  );
}

const MARKETS: { id: StageMarket; label: string }[] = [
  { id: "water", label: "Water" },
  { id: "food", label: "Food" },
  { id: "air", label: "Air" },
];
const tone: Record<StageMarket, string> = {
  water: "bg-[var(--po-detect-soft)] text-[var(--po-detect)]",
  food: "bg-[var(--po-accent-soft)] text-[var(--po-accent)]",
  air: "bg-[var(--po-chip)] text-[var(--po-ink-2)]",
};

function StageCard({ x, detail }: { x: (typeof stages)[number]; detail?: boolean }) {
  return (
    <div
      className={`h-full bg-[var(--po-paper)] border p-4 ${
        x.current ? "border-[var(--po-ink)] border-2" : "hair"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <span className={`num shrink-0 grid place-items-center w-6 h-6 rounded-full text-[12px] ${tone[x.market]}`}>{x.n}</span>
        <h3 className="font-medium text-[15px] leading-tight">{x.name}</h3>
        {x.current && <span className="chip !bg-[var(--po-lime)] !text-black ml-auto">Current</span>}
      </div>
      <p className="mt-2 text-[13.5px] ink2 leading-snug">{detail ? x.objective : x.short}</p>
      {detail && x.work && <p className="mt-1.5 text-[13px] muted leading-snug">{x.work}</p>}
      <div className="mt-2 mono text-[11.5px] muted">{x.when}</div>
      <p className="mt-3 pt-2.5 border-t hair text-[13px] leading-snug">
        <span className="muted">Proves: </span>
        {x.gate}
      </p>
    </div>
  );
}

/** The stages as a map: one column per market (water, food, air), grouped into Detect, Monitor and Remove.
 *  On phones the columns collapse into one list, and each card carries its market. */
export function StageMap({ detail }: { detail?: boolean }) {
  return (
    <div>
      <div className="hidden md:grid md:grid-cols-[1.7fr_1fr_1fr] gap-3 mb-1">
        {MARKETS.map((m) => (
          <div key={m.id} className={`mono text-[11.5px] uppercase tracking-wide px-3 py-1.5 text-center ${tone[m.id]}`}>
            {m.label}
          </div>
        ))}
      </div>
      {stageGroups.map((g) => {
        const items = stages.filter((x) => x.group === g.name);
        const last = g.name === "Remove";
        return (
          <section key={g.name} className="mt-6">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 pb-2 border-b hair">
              <h3 className="serif text-[22px] leading-none">{g.name}</h3>
              <span className="text-[13.5px] muted">{g.line}</span>
            </div>
            <ol className="mt-3 grid gap-3">
              {items.map((x, i) => (
                <li key={x.n} className="md:grid md:grid-cols-[1.7fr_1fr_1fr] md:gap-3">
                  <div className={x.market === "food" ? "md:col-start-2" : "md:col-start-1"}>
                    <span className={`md:hidden inline-block mb-1.5 mono text-[10.5px] uppercase tracking-wide px-1.5 py-0.5 ${tone[x.market]}`}>
                      {MARKETS.find((m) => m.id === x.market)?.label}
                    </span>
                    <StageCard x={x} detail={detail} />
                  </div>
                  {last && i === items.length - 1 && (
                    <div className="mt-3 md:mt-0 md:col-start-3">
                      <span className={`md:hidden inline-block mb-1.5 mono text-[10.5px] uppercase tracking-wide px-1.5 py-0.5 ${tone.air}`}>
                        Air
                      </span>
                      <div className="h-full border border-dashed border-[var(--po-line-2)] p-4">
                        <div className="flex items-center gap-2.5">
                          <span className={`num shrink-0 grid place-items-center w-6 h-6 rounded-full text-[12px] ${tone.air}`}>+</span>
                          <h3 className="font-medium text-[15px] leading-tight">{airOption.name}</h3>
                        </div>
                        <p className="mt-2 text-[13.5px] ink2 leading-snug">{detail ? airOption.objective : airOption.short}</p>
                        <div className="mt-2 mono text-[11.5px] muted">Later option</div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  );
}

export function Comparables() {
  return (
    <div>
      <table className="po-table text-[14px]">
        <thead>
          <tr>
            <th>Company</th>
            <th>Product</th>
            <th className="r">Raised</th>
          </tr>
        </thead>
        <tbody>
          {comparables.map((c) => (
            <tr key={c.name}>
              <td className="pr-4">
                <span className="font-medium">{c.name}</span>
                <span className="block text-[12.5px] muted">{c.where}</span>
              </td>
              <td className="ink2">
                {c.what} <Src id={c.src} />
              </td>
              <td className="r !whitespace-normal">
                {c.raised}
                <span className="block font-sans text-[12.5px] muted">{c.round}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
