// Sections shared by the Overview and Business Model pages.
import { comparables, market, missionCapital, stages } from "./data";
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
  const indiaRemoval = round((market.indiaVolumeBnL * 1e6 * market.removalPerM3) / 1e7, 10);
  return {
    ratio: Math.round(ratio),
    indiaCart,
    indiaDevice,
    indiaRemoval,
    brandCart: (market.nationalBrandPlants * base.cartRevPlant) / 100,
    brandDevice: (market.nationalBrandPlants * BASE.devicePrice) / 1e7,
    globalCart: round(indiaCart * ratio, 100),
    globalDevice: round(indiaDevice * ratio, 100),
    globalRemoval: round((market.globalVolumeBnL * 1e6 * market.removalPerM3) / 1e7, 100),
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
              <tr>
                <td>Removal, per year</td>
                <td className="r">{cr(z.indiaRemoval)}</td>
                <td className="r">{withUsd(z.globalRemoval)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={notes ? "mt-3 text-[13.5px] muted max-w-[70ch]" : "hidden"}>
          India has {market.licensedPlants.toLocaleString("en-IN")}+ licensed packaged drinking water plants <Src id="bis" />.
          Each plant is counted at one ₹5 lakh analyser and ₹{base.cartRevPlant.toFixed(1)} lakh of cartridges a year. India
          bottles about 25 billion litres a year <Src id="indiaVolume" /> and the world about{" "}
          {market.globalVolumeBnL} billion litres <Src id="unu" />, so the global figures are the India figures multiplied
          by {z.ratio}, at India prices. Removal is priced at ₹{market.removalPerM3} per cubic metre, which is 20 paise per
          litre. US dollar figures use ₹{market.usd} per dollar.
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
      <Stat v={`${base.plantsAtBreakeven} plants`} k={`Active plants in Year ${base.breakeven}`} />
      <Stat v={crore(base.revenueAtBreakeven ?? 0)} k={`Revenue in Year ${base.breakeven}`} />
    </div>
  );
}

export function BreakEvenTable({ lastYear = 6 }: { lastYear?: number }) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="po-table text-[14px]">
          <thead>
            <tr>
              <th>Year</th>
              <th className="r">Plants</th>
              <th className="r hidden sm:table-cell">Revenue</th>
              <th className="r hidden sm:table-cell !whitespace-normal">Operating costs</th>
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
                  <td className="r hidden sm:table-cell">{r.revenue.toFixed(1)}</td>
                  <td className="r hidden sm:table-cell">{r.opex.toFixed(1)}</td>
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
        ₹ lakh. Year 1 includes ₹{BASE.validationLakh} lakh of technology validation. Years 1 and 2 include ₹
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
            <th className="r">Plants</th>
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
        Removal is costed for water only. Removal of microplastics from food and air is not yet defined and is not
        included.
      </p>
    </div>
  );
}

/** The single sequence of stages. `detail` adds the work and the completion test. */
export function StageList({ detail }: { detail?: boolean }) {
  return (
    <ol className="border-t hair">
      {stages.map((x) => (
        <li key={x.n} className="grid grid-cols-[44px_1fr] md:grid-cols-[56px_1fr] gap-x-4 py-5 border-b hair">
          <div className={`num text-[28px] leading-none ${x.current ? "text-[var(--po-accent)]" : ""}`}>{x.n}</div>
          <div>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-medium text-[16px]">{x.name}</h3>
              <span className="mono text-[12px] muted">{x.when}</span>
              {x.current && <span className="chip !bg-[var(--po-lime)] !text-black">Current</span>}
            </div>
            <p className="mt-1.5 text-[14.5px] max-w-[62ch]">{x.objective}</p>
            {detail && x.work && <p className="mt-1 text-[13.5px] muted max-w-[62ch]">{x.work}</p>}
            {detail && x.gate && (
              <p className="mt-2 text-[13.5px] max-w-[62ch]">
                <span className="muted">Complete when: </span>
                {x.gate}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
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
