import { discovery, market, objective, pathToMarket, risks, whyNow } from "../data";
import { Block, Callout, Conclusion, PageHead, Src } from "../ui";

const segments = [
  { name: "Premium packaged water brands", size: "Backbay, Uravu, Smartwater and other brands that compete on purity", when: "Stages 1–2" },
  { name: "Injectable pharmaceutical manufacturers", size: "Already count particles in every batch; cannot identify plastic", when: "Stages 1–2" },
  { name: "Export beverage contractors", size: "Buyers in Europe and Australia are beginning to set requirements", when: "Stages 1–2" },
  { name: "Other packaged drinking water plants", size: `${market.licensedPlants.toLocaleString("en-IN")}+ BIS-licensed in India in total`, when: "Stage 2 onward" },
  { name: "Food producers", size: "Salt, sugar, milk and other staples", when: "Phase 2" },
];

export default function Market() {
  return (
    <>
      <PageHead
        title="Go-to-Market Strategy"
        lede={
          <p>
            PlasticOptics will sell first to customers that already value purity or already count particles, and build wider
            demand through awareness. The plan is five pilot plants in Stage 1, 20 plants in Year 3 and 60 by the end of
            Year 4.
          </p>
        }
      />

      <Block
        id="customer"
        toc="Customers"
        title="Target Customers"
        intro={
          <>
            {discovery.map((d) => (
              <p key={d}>{d}</p>
            ))}
          </>
        }
      >
        <table className="po-table">
          <thead>
            <tr>
              <th>Segment</th>
              <th>Detail</th>
              <th className="r">Stage</th>
            </tr>
          </thead>
          <tbody>
            {segments.map((s) => (
              <tr key={s.name}>
                <td className="font-medium">{s.name}</td>
                <td className="ink2">{s.size}</td>
                <td className="r">{s.when}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 grid sm:grid-cols-2 gap-4 text-[14px]">
          <div>
            <div className="font-medium">User</div>
            <p className="mt-1">Plant quality-control staff. No spectroscopy training is required.</p>
          </div>
          <div>
            <div className="font-medium">First pilot</div>
            <p className="mt-1">
              {objective.pilot} Producer of packaged drinking water from air. <Src id="uravu" />
            </p>
          </div>
        </div>
      </Block>

      <Block id="value" title="Value Proposition" intro={<p>Cost and time of one microplastic test, under each approach.</p>}>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border hair bg-[var(--po-paper)] p-5">
            <div className="font-medium">External laboratory (SGS or Eurofins)</div>
            <div className="num text-[28px] mt-2">₹75,000</div>
            <div className="text-[13px] muted">per sample, quotes obtained by PlasticOptics</div>
            <ul className="mt-4 text-[13.5px] grid gap-1.5 ink2">
              <li>Results in 10 days or more</li>
              <li>Samples often shipped abroad</li>
              <li>Results arrive after the batch has shipped</li>
            </ul>
          </div>
          <div className="border-2 border-[var(--po-ink)] bg-[var(--po-paper)] p-5">
            <div className="font-medium">PlasticOptics, on site</div>
            <div className="num text-[28px] mt-2">₹2,000</div>
            <div className="text-[13px] muted">per test cartridge, with a ₹8 lakh analyser</div>
            <ul className="mt-4 text-[13.5px] grid gap-1.5 ink2">
              <li>Results in 20–30 minutes</li>
              <li>Performed on site by quality-control staff</li>
              <li>Every batch can be tested</li>
            </ul>
          </div>
        </div>
        <Conclusion>
          One laboratory test costs as much as 37 PlasticOptics tests, and a PlasticOptics result is available before the
          batch leaves the plant.
        </Conclusion>
      </Block>

      <Block
        id="why-now"
       
        title="Regulatory Context"
        intro={<p>Regulators have begun to establish methods and requirements for microplastic measurement.</p>}
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
            All current methods rely on spectroscopy. Routine monitoring will require a rapid on-site screening method,
            with spectroscopy retained for confirmation.
          </Callout>
        </div>
      </Block>

      <Block id="path" title="Market Entry Plan">
        <ol className="grid md:grid-cols-3 gap-px bg-[var(--po-line)] border hair">
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
       
        title="Principal Risks"
        intro={<p>Each risk is paired with a validation test and a stage. Stage 0 addresses technical and cost risk.</p>}
      >
        <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
          <table className="po-table min-w-[560px]">
            <thead>
              <tr>
                <th>Risk</th>
                <th>Validation</th>
                <th className="r">Stage</th>
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
    </>
  );
}
