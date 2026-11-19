import { focus } from "../data";
import { PhaseCards, StageList, StageTimeline } from "../sections";
import { Block, Conclusion, PageHead } from "../ui";

const order = [
  {
    t: "Water first",
    b: "Research on detection and removal in water is sufficient to begin, and the methods for food and air build on it.",
  },
  {
    t: "Test cartridge before analyser",
    b: "The cartridge is the core of the system. The analyser is built around a cartridge that works in real water.",
  },
  {
    t: "Testing service during the pilots",
    b: "A ₹5,000 testing service builds the data set and early demand before the analyser is sold.",
  },
  {
    t: "Raman and removal in parallel",
    b: "Once the analyser sells, the Raman spectrometer adds the identity and source of each particle, and the removal kit acts on what the analyser measures.",
  },
  {
    t: "Food and air after Phase 1",
    b: "Food and air use the same detection method with different sample preparation, and follow once Phase 1 reaches product–market fit.",
  },
];

export default function Roadmap() {
  return (
    <>
      <PageHead
        title="R&D Roadmap"
        lede={
          <p>
            The goal is to measure and remove microplastics from water, food and air. The work is planned in three phases,
            beginning with water.
          </p>
        }
      />

      <Block id="phases" title="Three Phases">
        <PhaseCards />
      </Block>

      <Block id="stages" title="Phase 1 Stages" intro={<p>{focus}</p>}>
        <StageTimeline />
        <div className="mt-10">
          <StageList detail />
        </div>
        <Conclusion>
          Phase 1 research and product–market fit take about four years. From Year 3, the Raman spectrometer and the
          removal kit are developed while the benchtop analyser is sold.
        </Conclusion>
      </Block>

      <Block id="order" title="Reasons for this Order">
        <dl className="border-t hair">
          {order.map((x) => (
            <div key={x.t} className="grid md:grid-cols-[240px_1fr] gap-x-6 gap-y-1 py-4 border-b hair">
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
