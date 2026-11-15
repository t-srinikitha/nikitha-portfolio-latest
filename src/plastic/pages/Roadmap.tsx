import { stageOrder } from "../data";
import { StageMap } from "../sections";
import { Block, Conclusion, PageHead } from "../ui";

export default function Roadmap() {
  return (
    <>
      <PageHead
        title="R&D Roadmap"
        lede={
          <p>
            The objective is industrial-scale detection and removal of microplastics in water, food and air. The work is
            planned as seven stages in three groups, Detect, Monitor and Remove, beginning with a benchtop analyser for drinking water.
          </p>
        }
      />

      <Block id="stages" title="Development Stages">
        <StageMap detail />
        <Conclusion>
          Stages 0 to 2 build the first business, the benchtop analyser for bottling plants. Food research begins in Year
          3 and food sales in Year 5. In-line analysis comes before removal, because removal can be proven only against
          continuous measurement. Air is a later option outside the numbered stages.
        </Conclusion>
      </Block>

      <Block id="order" title="Reasons for this Order">
        <dl className="border-t hair">
          {stageOrder.map((x) => (
            <div key={x.t} className="grid md:grid-cols-[220px_1fr] gap-x-6 gap-y-1 py-4 border-b hair">
              <dt className="font-medium">{x.t}</dt>
              <dd className="ink2 max-w-[60ch]">{x.b}</dd>
            </div>
          ))}
        </dl>
        <Conclusion>Each stage depends on the measurement or the result delivered by the stage before it.</Conclusion>
      </Block>
    </>
  );
}
