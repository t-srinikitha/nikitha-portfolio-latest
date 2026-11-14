import { fundingPath, market, objective, pathToMarket, risks, unknowns, whyNow, whoPays } from "../data";
import { Block, Callout, NextLinks, PageHead, Src } from "../ui";

const segments = [
  { name: "Packaged drinking-water plants", size: `${market.licensedPlants.toLocaleString("en-IN")}+ BIS-licensed in India`, when: "First" },
  { name: "Beverage bottling plants", size: "Same RO + filtration problem", when: "First" },
  { name: "Testing labs", size: "Faster screening before Raman/FTIR", when: "Next" },
  { name: "Water utilities", size: "Once inline monitoring exists", when: "Later" },
];

export default function Market() {
  return (
    <>
      <PageHead
        kicker="PlasticOptics · Go-to-market"
        title="What it takes to bring this to market."
        lede={
          <p>
            Who buys first, why they would pay, why the timing works, the steps from lab to revenue, and the assumptions
            that have to hold. Each assumption is paired with the stage that tests it.
          </p>
        }
      />

      <Block id="customer" tag="Customer" title={whoPays.who} intro={<p>{whoPays.why}</p>}>
        <table className="po-table">
          <thead>
            <tr>
              <th>Segment</th>
              <th>Why / size</th>
              <th className="r">When</th>
            </tr>
          </thead>
          <tbody>
            {segments.map((s) => (
              <tr key={s.name}>
                <td className="font-medium">{s.name}</td>
                <td className="ink2">{s.size}</td>
                <td className="r">
                  <span className={`mono text-[11px] px-1.5 py-0.5 ${s.when === "First" ? "bg-[var(--po-ink)] text-[var(--po-bg)]" : "bg-[var(--po-chip)]"}`}>
                    {s.when}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 grid sm:grid-cols-2 gap-4 text-[14px]">
          <div>
            <div className="mono text-[10.5px] uppercase tracking-wide muted">User</div>
            <p className="mt-1">The plant's own quality-control team, with no training in spectroscopy.</p>
          </div>
          <div>
            <div className="mono text-[10.5px] uppercase tracking-wide muted">First pilot</div>
            <p className="mt-1">
              {objective.pilot} Uravu makes packaged drinking water from air. <Src id="uravu" />
            </p>
          </div>
        </div>
      </Block>

      <Block
        id="value"
        tag="Why a plant pays"
        title="Testing every day with a lab would cost more, and every answer would arrive three days late."
        intro={
          <p>
            Nobody tests daily today, because labs make it impractical. The comparison below shows what routine testing
            would cost either way, at one test a day for a year, using the price ranges in the plan.
          </p>
        }
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border hair bg-[var(--po-paper)] p-5">
            <div className="mono text-[10.5px] uppercase tracking-wide muted">External lab · FTIR / Raman</div>
            <div className="num text-[28px] mt-2">₹10.8–18 L</div>
            <div className="text-[13px] muted">a year · 360 tests × ₹3,000–5,000</div>
            <ul className="mt-4 text-[13.5px] grid gap-1.5 ink2">
              <li>72 hours+ from sample to result</li>
              <li>Samples prepared and shipped to a few labs</li>
              <li>The batch has shipped before the answer arrives</li>
            </ul>
          </div>
          <div className="border-2 border-[var(--po-ink)] bg-[var(--po-paper)] p-5">
            <div className="mono text-[10.5px] uppercase tracking-wide muted">PlasticOptics · on site</div>
            <div className="num text-[28px] mt-2">₹6.6–11.7 L</div>
            <div className="text-[13px] muted">year one · ₹3–4.5 L device + 360 × ₹1,000–2,000</div>
            <ul className="mt-4 text-[13.5px] grid gap-1.5 ink2">
              <li>20–30 minutes from sample to result</li>
              <li>Run by the QC team on the line</li>
              <li>
                <span className="num">₹3.6–7.2 L</span> a year after year one
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-5 text-[13.5px] muted max-w-[66ch]">
          The real product is the result before the batch ships. Cost parity with labs is a floor, not the pitch.
        </p>
      </Block>

      <Block
        id="why-now"
        tag="Why now"
        title="Measurement is moving from research papers to rulebooks."
        intro={<p>Governments are writing the first methods and requirements for measuring microplastics in drinking water and food.</p>}
      >
        <ol className="border-l hair ml-1.5">
          {whyNow.map((w) => (
            <li key={w.where} className="relative pl-6 pb-7 last:pb-0">
              <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--po-accent)]" />
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="num text-[13px]">{w.when}</span>
                <span className="font-medium">{w.where}</span>
              </div>
              <p className="mt-1 text-[14px] ink2 max-w-[62ch]">
                {w.what}{" "}
                {w.src.map((s) => (
                  <span key={s} className="mr-2">
                    <Src id={s} />
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <Callout>
            Every one of these methods depends on slow, expensive spectroscopy. When monitoring becomes routine, plants
            will need a fast first screen they can run themselves, with spectroscopy kept for confirmation.
          </Callout>
        </div>
      </Block>

      <Block id="path" tag="Path to market" title="Four steps from the lab bench to reorders.">
        <ol className="grid md:grid-cols-2 gap-px bg-[var(--po-line)] border hair">
          {pathToMarket.map((p, i) => (
            <li key={p.step} className="bg-[var(--po-paper)] p-5">
              <div className="flex items-baseline gap-3">
                <span className="num text-[13px] muted">0{i + 1}</span>
                <h3 className="serif text-[22px] leading-none">{p.step}</h3>
              </div>
              <div className="mt-2 mono text-[11.5px] muted">{p.stage}</div>
              <p className="mt-3 text-[14px] ink2 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ol>
      </Block>

      <Block
        id="what-must-be-true"
        tag="What has to be true"
        title="Six assumptions, and when each one gets tested."
        intro={<p>The plan is a sequence of cheap tests before expensive ones. Stage 0 retires the technical and cost risk for ₹23.8 lakh.</p>}
      >
        <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
          <table className="po-table min-w-[560px]">
            <thead>
              <tr>
                <th>Assumption</th>
                <th>How we find out</th>
                <th className="r">When</th>
              </tr>
            </thead>
            <tbody>
              {risks.map((r) => (
                <tr key={r.risk}>
                  <td className="font-medium whitespace-nowrap pr-6">{r.risk}</td>
                  <td className="ink2">{r.test}</td>
                  <td className="r !font-sans !whitespace-normal text-[12.5px] min-w-[110px]">{r.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>

      <Block id="funding" tag="Funding path" title="Each stage earns the right to raise the next.">
        <ol className="grid sm:grid-cols-4 gap-px bg-[var(--po-line)] border hair">
          {fundingPath.map((f) => (
            <li key={f.label} className="bg-[var(--po-paper)] p-4">
              <div className="mono text-[10.5px] uppercase tracking-wide muted">{f.label}</div>
              <div className="num text-[20px] mt-1">{f.v}</div>
              <div className="text-[13px] ink2 mt-1 leading-snug">{f.how}</div>
            </li>
          ))}
        </ol>
      </Block>

      <Block id="unknowns" tag="Open questions" title="What I don't know yet.">
        <ul className="grid gap-3">
          {unknowns.map((u) => (
            <li key={u} className="grid grid-cols-[18px_1fr] gap-2 text-[15px]">
              <span className="text-[var(--po-accent)]">?</span>
              <span>{u}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="read-next" tag="Go deeper">
        <NextLinks
          items={[
            { to: "/plastic/numbers", title: "Numbers", body: "Change price, testing frequency or fixed costs and watch break-even move." },
            { to: "/plastic/roadmap", title: "Roadmap", body: "What comes after the benchtop device: inline monitoring, then removal." },
          ]}
        />
      </Block>
    </>
  );
}
