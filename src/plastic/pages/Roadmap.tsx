import { stageOrder } from "../data";
import { StageList } from "../sections";
import { Block, Conclusion, PageHead } from "../ui";

export default function Roadmap() {
  return (
    <>
      <PageHead
        title="R&D Roadmap"
        lede={
          <p>
            The objective is industrial-scale detection and removal of microplastics in water, food and air. The work is
            planned as a single sequence of seven stages, beginning with a benchtop analyser for drinking water.
          </p>
        }
      />

      <Block id="stages" title="Development Stages">
        <StageList detail />
        <Conclusion>
          Stages 0 to 2 run in sequence and build the first business. Research for Stages 3 and 4 begins during Stage 2.
          Stages 5 and 6 begin only after removal has been demonstrated at one plant.
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
