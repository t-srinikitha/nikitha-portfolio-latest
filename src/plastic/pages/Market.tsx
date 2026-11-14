import { fundingPath, market, objective, pathToMarket, risks, unknowns, whyNow, whoPays } from "../data";
import { Block, Callout, NextLinks, PageHead, Src } from "../ui";

const segments = [
  { name: "Packaged drinking-water plants", size: `${market.licensedPlants.toLocaleString("en-IN")}+ BIS-licensed in India`, when: "First" },
  { name: "Beverage bottling plants", size: "Same RO and filtration exposure", when: "First" },
  { name: "Testing labs", size: "Screening before Raman/FTIR", when: "Next" },
  { name: "Water utilities", size: "After inline monitoring", when: "Later" },
];

export default function Market() {
  return (
    <>
      <PageHead
        kicker="PlasticOptics · Go-to-market"
        title="Go-to-market"
        lede={
          <p>
            Customer, value, timing, path to revenue and key risks.
          </p>
        }
      />

      <Block id="customer" tag="Customer" title={whoPays.who} intro={<p>{whoPays.why}</p>}>
        <table className="po-table">
          <thead>
            <tr>
              <th>Segment</th>
              <th>Detail</th>
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
            <p className="mt-1">Plant QC team. No spectroscopy training.</p>
          </div>
          <div>
            <div className="mono text-[10.5px] uppercase tracking-wide muted">First pilot</div>
            <p className="mt-1">
              {objective.pilot} Packaged water made from air. <Src id="uravu" />
            </p>
          </div>
        </div>
      </Block>

      <Block
        id="value"
        tag="Why a plant pays"
        title="Value to the plant"
        intro={
          <p>
            Annual cost of daily testing. 360 tests a year.
          </p>
        }
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border hair bg-[var(--po-paper)] p-5">
            <div className="mono text-[10.5px] uppercase tracking-wide muted">External lab · FTIR / Raman</div>
            <div className="num text-[28px] mt-2">₹10.8–18 L</div>
            <div className="text-[13px] muted">a year · 360 tests × ₹3,000–5,000</div>
            <ul className="mt-4 text-[13.5px] grid gap-1.5 ink2">
              <li>72 hours+ to result</li>
              <li>Samples shipped to external labs</li>
              <li>Batch ships before the result</li>
            </ul>
          </div>
          <div className="border-2 border-[var(--po-ink)] bg-[var(--po-paper)] p-5">
            <div className="mono text-[10.5px] uppercase tracking-wide muted">PlasticOptics · on site</div>
            <div className="num text-[28px] mt-2">₹6.6–11.7 L</div>
            <div className="text-[13px] muted">year one · ₹3–4.5 L device + 360 × ₹1,000–2,000</div>
            <ul className="mt-4 text-[13.5px] grid gap-1.5 ink2">
              <li>20–30 minutes to result</li>
              <li>Run on site by the QC team</li>
              <li>
                <span className="num">₹3.6–7.2 L</span> a year after year one
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-5 text-[13.5px] muted max-w-[66ch]">
          Core value: the result arrives before the batch ships.
        </p>
      </Block>

      <Block
        id="why-now"
        tag="Why now"
        title="Regulation"
        intro={<p>Regulators are setting the first methods and requirements.</p>}
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
            All current methods rely on spectroscopy. Routine monitoring needs a fast on-site screen. Spectroscopy remains
            for confirmation.
          </Callout>
        </div>
      </Block>

      <Block id="path" tag="Path to market" title="Four steps">
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
        title="Key risks"
        intro={<p>Each risk has a test and a stage. Stage 0 addresses technical and cost risk for ₹23.8 lakh.</p>}
      >
        <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
          <table className="po-table min-w-[560px]">
            <thead>
              <tr>
                <th>Risk</th>
                <th>Test</th>
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

      <Block id="funding" tag="Funding" title="Funding path">
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

      <Block id="unknowns" tag="Open questions" title="Open questions">
        <ul className="grid gap-3">
          {unknowns.map((u) => (
            <li key={u} className="grid grid-cols-[18px_1fr] gap-2 text-[15px]">
              <span className="text-[var(--po-accent)]">?</span>
              <span>{u}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="read-next" tag="More">
        <NextLinks
          items={[
            { to: "/plastic/numbers", title: "Numbers", body: "P&L and break-even model." },
            { to: "/plastic/roadmap", title: "Roadmap", body: "Detection to removal." },
          ]}
        />
      </Block>
    </>
  );
}
