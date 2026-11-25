import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import {
  EMAIL,
  goal,
  stage0Done,
  focus,
  discovery,
  customers,
  landedCost,
  microplasticsIndex,
  budget,
  founder,
  status,
  collaborators,
} from "../data";
import { Block, Conclusion, PageHead, Sub } from "../ui";
import { BreakEvenTable, CostComparison, PhaseCards, ProblemCards, StageList, StageTimeline, savings } from "../sections";

export default function Overview() {
  const budgetTotal = budget.reduce((a, b) => a + b.v, 0);

  return (
    <>
      <PageHead
        title="Test water for microplastics on site, in 30 minutes"
        lede={
          <p>
            A laboratory quoted us ₹75,000 per sample. We are building a cartridge and analyser designed to do it for
            ₹2,000. {goal}
          </p>
        }
      />
      <dl className="grid sm:grid-cols-2 gap-8 pb-12 md:pb-16">
        <div>
          <dd className="num text-[40px] md:text-[56px] leading-none font-bold muted">₹75,000</dd>
          <dt className="mt-3 text-[13px] muted">one laboratory test, as quoted to us in 2026</dt>
        </div>
        <div>
          <dd className="num text-[40px] md:text-[56px] leading-none font-bold text-[var(--po-accent)]">₹2,000</dd>
          <dt className="mt-3 text-[13px] muted">target price of one cartridge, read by an ₹8 lakh analyser</dt>
        </div>
      </dl>

      <Block id="problem" title="The Problem">
        <ProblemCards />
        <Conclusion>
          Bottled water plants will need to know what their water contains. Today they cannot find out quickly or
          cheaply.
        </Conclusion>
      </Block>

      <Block id="product-market" title="Product and Market">
        <Sub
          id="product"
          title="The Product"
          intro={
            <p>
              A single-use cartridge captures the microplastics in a water sample. A benchtop analyser reads it in 20–30
              minutes. Plant staff run it without a laboratory or a specialist.{" "}
              <Link to="/plasticoptics/technology" className="ulink">
                How it works
              </Link>
            </p>
          }
        >
          <CostComparison />
          <Conclusion>
            Equipment costs {savings.equipment}% less and each test {savings.perTest}% less.
          </Conclusion>
        </Sub>

        <Sub id="customers" title="Target Customers">
          <ul className="grid gap-2 max-w-[64ch]">
            {discovery.map((d) => (
              <li key={d} className="text-[14px]">
                {d}
              </li>
            ))}
          </ul>
          <div className="mt-6 grid md:grid-cols-3 gap-px bg-[var(--po-line)] border hair">
            {customers.map((c) => (
              <div key={c.name} className="bg-[var(--po-paper)] p-5">
                <h4 className="font-medium">{c.name}</h4>
                <p className="mt-2 text-[14px] ink2 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
          <h4 className="mt-10 font-medium">The Microplastics Index</h4>
          <ul className="mt-2 grid gap-2 max-w-[64ch]">
            {microplasticsIndex.map((x) => (
              <li key={x} className="text-[14px]">
                {x}
              </li>
            ))}
          </ul>
        </Sub>

        <Sub
          id="economics"
          title="Unit Economics and Break-even"
          intro={<p>Prices are set for an 80% margin: ₹2,000 per cartridge and ₹8 lakh per analyser.</p>}
        >
          <table className="po-table max-w-[620px] text-[14px]">
            <thead>
              <tr>
                <th>Item</th>
                <th>Inputs</th>
                <th className="r !whitespace-normal">Total landed cost</th>
              </tr>
            </thead>
            <tbody>
              {landedCost.map((x) => (
                <tr key={x.item}>
                  <td className="font-medium whitespace-nowrap pr-4">{x.item}</td>
                  <td className="ink2">
                    {x.inputs.map((i) => (
                      <span key={i} className="block">
                        {i}
                      </span>
                    ))}
                  </td>
                  <td className="r">{x.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-[13.5px] muted">Preliminary figures.</p>

          <h4 className="mt-10 mb-4 font-medium">Break-even for the benchtop analyser only</h4>
          <BreakEvenTable />
          <Conclusion>
            Revenue reaches ₹18.24 crore in Year 5 with 120 active plants. Costs will be modelled once Stage 0 and the
            pilots establish them.
          </Conclusion>
        </Sub>
      </Block>

      <Block id="plan" title="The Plan" intro={<p>Stage 0 is the first step of Phase 1. Food and air follow water.</p>}>
        <Sub id="phases" title="Water, Food and Air">
          <PhaseCards />
        </Sub>

        <Sub id="stages" title="Phase 1 Stages" intro={<p>{focus}</p>}>
          <StageTimeline />
          <div className="mt-10">
            <StageList detail={false} />
          </div>
          <p className="mt-6 text-[14px]">
            <Link to="/plasticoptics/technology#roadmap" className="ulink">
              Each stage in detail
            </Link>
          </p>
        </Sub>
      </Block>

      <Block
        id="ask"
        toc="The Ask"
        title={<>The Ask: ₹{budgetTotal.toFixed(1)} Lakh for Stage 0</>}
        intro={<p>Nine months to build and validate the test cartridge.</p>}
      >
        <Sub id="status" title="Progress to Date" intro={<p>{status.summary}</p>}>
          <ul className="grid gap-2">
            {status.inPlace.map((x) => (
              <li key={x} className="text-[14px]">
                {x}
              </li>
            ))}
          </ul>
        </Sub>

        <Sub id="funding" title="Use of Funds">
          <h4 className="font-medium">What it proves</h4>
          <ol className="mt-3 mb-10 grid gap-3">
            {stage0Done.map((d, i) => (
              <li key={d} className="grid grid-cols-[28px_1fr] gap-3">
                <span className="num text-[13px] muted pt-0.5">0{i + 1}</span>
                <span>{d}</span>
              </li>
            ))}
          </ol>
          <h4 className="mb-3 font-medium">What it buys</h4>
          <table className="po-table max-w-[520px] text-[14px]">
            <thead>
              <tr>
                <th>Category</th>
                <th className="r">₹ lakh</th>
              </tr>
            </thead>
            <tbody>
              {budget.map((b) => (
                <tr key={b.item}>
                  <td>{b.item}</td>
                  <td className="r">{b.v.toFixed(1)}</td>
                </tr>
              ))}
              <tr className="em">
                <td>Total</td>
                <td className="r">{budgetTotal.toFixed(1)}</td>
              </tr>
            </tbody>
          </table>
        </Sub>

        <Sub id="team" title="Team">
          <div className="grid sm:grid-cols-[112px_1fr] gap-6 items-start">
            <img src="/Profile.jpeg" alt={founder.name} className="w-28 h-28 object-cover grayscale border hair" />
            <div>
              <h4 className="font-medium">{founder.name}, Founder</h4>
              <p className="mt-2 ink2 max-w-[62ch]">{founder.bio}</p>
            </div>
          </div>
          <div className="mt-8 grid md:grid-cols-2 gap-px bg-[var(--po-line)] border hair">
            {collaborators.map((c) => (
              <a
                key={c.name}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[var(--po-paper)] p-5 hover:bg-[var(--po-paper-hover)] transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-medium">{c.name}</h4>
                    <div className="text-[13px] muted mt-0.5">
                      {c.role}, {c.org}
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 muted shrink-0" />
                </div>
                <p className="mt-3 text-[13.5px] ink2 leading-relaxed">{c.work}</p>
              </a>
            ))}
          </div>
        </Sub>

        <div className="po-sub">
          <p className="max-w-[62ch]">Researchers, water and beverage companies, funders: I'd like to hear from you.</p>
          <a href={`mailto:${EMAIL}?subject=PlasticOptics`} className="btn mt-5">
            Get in touch
          </a>
        </div>
      </Block>
    </>
  );
}
