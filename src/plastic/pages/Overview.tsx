import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import {
  goal,
  focus,
  discovery,
  customers,
  landedCost,
  incumbent,
  microplasticsIndex,
  budget,
  founder,
  status,
  collaborators,
} from "../data";
import { Block, Conclusion, PageHead, Sub } from "../ui";
import { BreakEvenTable, CostComparison, PhaseCards, StageList, StageTimeline, WhyNow, savings } from "../sections";

export default function Overview() {
  const budgetTotal = budget.reduce((a, b) => a + b.v, 0);

  return (
    <>
      <PageHead
        title="Microplastic Detection and Removal for Water, Food and Air"
        lede={
          <>
            <p>{goal}</p>
            <p className="mt-3">
              PlasticOptics begins with drinking water in India, where a court-ordered warning label is now in force and
              a single laboratory test costs ₹75,000 and takes more than ten days.
            </p>
          </>
        }
      />

      <Block id="problem" title="The Problem and the Product">
        <Sub
          id="why-now"
          title="Why Now"
          intro={<p>A labelling requirement is now in force in India, and testing is scarce, slow and expensive.</p>}
        >
          <WhyNow />
          <Conclusion>
            Bottled water companies will need to know what their product contains. A company that can test has a
            competitive advantage, and development must begin now to be ready when labelling and certification
            regulations arrive.
          </Conclusion>
        </Sub>

        <Sub
          id="product"
          title="The Product"
          intro={
            <p>
              A single-use test cartridge captures the microplastics in a water sample, and a benchtop analyser reads
              it. A plant's quality-control staff receive a particle count and the plastic class within 20–30 minutes,
              without a laboratory or a specialist. The{" "}
              <Link to="/plastic/science" className="ulink">
                Technology
              </Link>{" "}
              page describes the method.
            </p>
          }
        >
          <CostComparison />
          <Conclusion>
            PlasticOptics lowers equipment cost by {savings.equipment}% and cost per test by {savings.perTest}%, and
            returns results in minutes rather than days.
          </Conclusion>
        </Sub>

        <Sub id="phases" title="Water, Food and Air">
          <PhaseCards />
          <Conclusion>
            Water comes first because the research is sufficient to begin, and because the methods for food and air are
            built on it.
          </Conclusion>
        </Sub>
      </Block>

      <Block id="plan" title="Market and Plan">
        <Sub id="customers" title="Target Customers">
          <h4 className="font-medium">What customers have said</h4>
          <ul className="mt-3 grid gap-2.5 border-t hair pt-4 max-w-[64ch]">
            {discovery.map((d) => (
              <li key={d} className="text-[15px]">
                {d}
              </li>
            ))}
          </ul>
          <h4 className="mt-10 font-medium">First customers</h4>
          <div className="mt-3 grid md:grid-cols-3 gap-px bg-[var(--po-line)] border hair">
            {customers.map((c) => (
              <div key={c.name} className="bg-[var(--po-paper)] p-5">
                <h4 className="font-medium">{c.name}</h4>
                <p className="mt-2 text-[14px] ink2 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
          <h4 className="mt-10 font-medium">Building awareness: the Microplastics Index</h4>
          <ul className="mt-3 grid gap-2.5 border-t hair pt-4 max-w-[64ch]">
            {microplasticsIndex.map((x) => (
              <li key={x} className="text-[15px]">
                {x}
              </li>
            ))}
          </ul>
          <Conclusion>
            The first customers are those who already value purity or already count particles. Demand from the wider
            market will be built through the Microplastics Index, which begins in Stage 0.
          </Conclusion>
        </Sub>

        <Sub id="stages" title="Phase 1 Stages" intro={<p>{focus}</p>}>
          <StageTimeline />
          <div className="mt-10">
            <StageList detail={false} />
          </div>
          <Conclusion>
            Stages 0 and 1 run in sequence. From Year 3 the benchtop analyser is sold while the Raman spectrometer and
            the removal kit are developed in parallel. The{" "}
            <Link to="/plastic/roadmap" className="ulink">
              R&D Roadmap
            </Link>{" "}
            describes each stage.
          </Conclusion>
        </Sub>

        <Sub
          id="economics"
          title="Unit Economics and Break-even"
          intro={
            <p>
              The input costs of the test cartridge and the benchtop analyser are well understood. Prices are set for an
              80% margin: ₹2,000 per cartridge and ₹8 lakh per analyser.
            </p>
          }
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
          <p className="mt-3 text-[13.5px] muted max-w-[70ch]">
            These are preliminary figures and will change with development and market research.
          </p>
          <h4 className="mt-10 font-medium">Break-even for the benchtop analyser</h4>
          <p className="mt-2 mb-4 text-[14.5px] ink2 max-w-[64ch]">
            Research, team expansion and operating costs continue throughout Phase 1. For simplicity, this view covers
            the benchtop analyser only.
          </p>
          <BreakEvenTable />
          <Conclusion>
            With 120 active plants in Year 5, revenue from the benchtop analyser reaches ₹18.24 crore. The cost side
            will be modelled as Stage 0 and the pilots establish actual costs.
          </Conclusion>
        </Sub>
      </Block>

      <Block
        id="ask"
        toc="The Ask"
        title={<>The Ask (Stage 0): ₹{budgetTotal.toFixed(1)} Lakh</>}
        intro={<p>The request covers the full Stage 0 budget: nine months to build and validate the test cartridge.</p>}
      >
        <Sub id="status" title="Progress to Date" intro={<p>{status.summary}</p>}>
          <h4 className="font-medium">In place today</h4>
          <ul className="mt-3 grid gap-2.5 border-t hair pt-4">
            {status.inPlace.map((x) => (
              <li key={x} className="text-[15.5px]">
                {x}
              </li>
            ))}
          </ul>
          <Conclusion>{status.conclusion}</Conclusion>
        </Sub>

        <Sub id="funding" title="Use of Funds">
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
          <Conclusion>Research collaboration and optical equipment account for about half of the budget.</Conclusion>
        </Sub>

        <Sub id="team" toc="Team" title="Founder and Research Collaborators">
          <div className="grid sm:grid-cols-[112px_1fr] gap-6 items-start">
            <img src="/Profile.jpeg" alt={founder.name} className="w-28 h-28 object-cover grayscale border hair" />
            <div>
              <h4 className="font-medium">{founder.name}, Founder</h4>
              <p className="mt-2 ink2 max-w-[62ch]">{founder.bio}</p>
              <a href="/climate" className="mt-3 inline-block ulink text-[13.5px] muted">
                Climate and sustainability work
              </a>
            </div>
          </div>
          <div className="mt-8 grid md:grid-cols-2 gap-px bg-[var(--po-line)] border hair">
            {collaborators.map((c) => (
              <a
                key={c.name}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[var(--po-paper)] p-5 hover:bg-white transition-colors"
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
      </Block>
    </>
  );
}
