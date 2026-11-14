// All PlasticOptics page content lives here so it can be updated
// without touching layout code in src/pages/PlasticOptics.tsx.
// Currency is INR; "L" = lakh, "Cr" = crore.

export const hero = {
  eyebrow: "PlasticOptics · Stage 0",
  title: "Count microplastics in drinking water in under 30 minutes, at the plant.",
  summary:
    "A benchtop device and single-use test cartridge that lets a bottling plant's quality-control team measure microplastics in every batch, without training and without waiting days for a lab.",
  status: "Raising ₹23.8 lakh to prove the technology",
};

export const goal =
  "Build an effective, fast, industrial device that can detect and remove microplastics from water, food and air.";

export const problem = {
  intro:
    "Bottling plants already run reverse osmosis. But RO filters themselves shed microplastics, and the source water carries them too. Plants don't know how much is in their product, and they have no practical way to find out.",
  today: [
    { value: "72 hrs+", label: "from sample collection to result" },
    { value: "FTIR / Raman", label: "the only accepted methods today" },
    { value: "Few labs", label: "university and private, with long queues" },
    { value: "₹3–5K", label: "spent per test today" },
  ],
  punchline: "So almost nobody tests routinely, and no one tests every batch.",
};

export const solution = {
  headline: "A benchtop device any QC team can run",
  points: [
    { title: "20–30 minutes", body: "From sample to particle count, on site, instead of 72+ hours at an external lab." },
    { title: "No training", body: "Built for the plant's existing quality-control team, not for spectroscopy specialists." },
    { title: "Every batch", body: "Fast and cheap enough to test each batch, not one sample a quarter." },
  ],
  method: {
    title: "How it works",
    steps: [
      { step: "Stain", body: "Differential staining dyes in a single-use cartridge make plastic particles light up distinctly from everything else in the sample." },
      { step: "Image", body: "A microscope and optical filters capture the stained sample." },
      { step: "Count", body: "AI-based particle counting turns the image into a microplastics count." },
    ],
  },
  model:
    "The device is sold once. Each test uses a fresh cartridge, so every batch a plant tests creates recurring cartridge revenue.",
};

export const whyWater = {
  intro:
    "Microplastics show up in water, food and air. Water is where to start: the research base is strongest, and the method carries over to the other two.",
  surfaces: [
    { name: "Drinking water", tag: "Start here", body: "There is enough research on microplastics detection in water to give a strong set of directions to pursue." },
    { name: "Food", tag: "Next", body: "Items like salt and masalas are an extension of the water work. Pursue once the technology is validated on water. This is likely the largest revenue opportunity across detection and removal." },
    { name: "Air", tag: "Later", body: "Today's method lets airborne particles settle on a surface or passes air through a filter, then runs detection on that. The same detection core applies." },
  ],
};

export const customer = {
  who: "Water bottling and beverage plants",
  why: "They run RO but can't measure what their filters and source water put into the product, and the only way to measure today is slow, external and expensive.",
  pilot: "Uravu Labs, Bangalore, as the intended first pilot partner.",
};

export const stages = [
  {
    stage: "0",
    name: "Prove the technology",
    timeline: "Now → ~6 months",
    objective: "Differential staining + AI-based counting, validated against Raman/FTIR.",
    spend: "Reagents, collaboration with professors, lab setup, Raman/FTIR reference testing",
    funding: "~₹23.8 L",
    current: true,
  },
  {
    stage: "1",
    name: "Prototype and pilots",
    timeline: "Months 6 → 24",
    objective: "Design and build a working prototype. Pilot at 10 plants.",
    spend: "Core team, 3–4 prototype rounds, 10 pilot units, patent filing",
    funding: "₹2 Cr (pre-seed + grants)",
  },
  {
    stage: "2",
    name: "Revenue and surface expansion",
    timeline: "Years 2 → 4",
    objective: "~50+ customers reordering cartridges. Removal work begins. Detection R&D shifts to food (e.g. salt).",
    spend: "Contract manufacturing, tooling, method validation, first sales hire, field service, inventory",
    funding: "₹10 Cr",
  },
];

export const unitEconomics = {
  compare: { label: "Current market option (lab-grade instrument)", value: "~₹1.5 Cr" },
  costBreakdown: [
    { item: "Microscope, optical filters, container, software", cost: "₹1,20,000" },
    { item: "Assembly, calibration, installation, shipping", cost: "₹40,000" },
  ],
  device: { cost: "~₹1.6 L", price: "₹3–4.5 L" },
  cartridge: { cost: "₹400", price: "₹1,000–2,000" },
  caveat: "Early estimates. These will change with more research and more conversations with potential customers.",
};

// Projection, ₹ lakh. Assumes ₹1.5 Cr fixed costs per year.
export const projection = [
  { year: "Year 2", newPaying: 0, newPilot: 10, active: 10, deviceMargin: 0.0, cartridgeMargin: 43.2, totalMargin: 43.2, fixed: 150.0, operating: -106.8, cumulative: -106.8 },
  { year: "Year 3", newPaying: 10, newPilot: 0, active: 20, deviceMargin: 14.0, cartridgeMargin: 86.4, totalMargin: 100.4, fixed: 150.0, operating: -49.6, cumulative: -156.4 },
  { year: "Year 4", newPaying: 15, newPilot: 0, active: 35, deviceMargin: 21.0, cartridgeMargin: 151.2, totalMargin: 172.2, fixed: 150.0, operating: 22.2, cumulative: -134.2 },
  { year: "Year 5", newPaying: 0, newPilot: 0, active: 35, deviceMargin: 0.0, cartridgeMargin: 151.2, totalMargin: 151.2, fixed: 150.0, operating: 1.2, cumulative: -133.0 },
  { year: "Year 6", newPaying: 0, newPilot: 0, active: 35, deviceMargin: 0.0, cartridgeMargin: 151.2, totalMargin: 151.2, fixed: 150.0, operating: 1.2, cumulative: -131.8 },
];

export const breakevenNote =
  "With ₹1.5 Cr in fixed costs a year, operations break even in Year 4 at ~35 active plants buying cartridges. The projection deliberately assumes no new plants after Year 4.";

export const ask = {
  total: "₹23.8 lakh",
  purpose: "Stage 0: prove the technology over ~6 months",
  budget: [
    { item: "My stipend", lakh: 4.5 },
    { item: "Research collaboration", lakh: 4 },
    { item: "Optical equipment", lakh: 4 },
    { item: "Lab space and equipment", lakh: 3 },
    { item: "Analytical balance", lakh: 2.8 },
    { item: "Reagents and membranes", lakh: 2 },
    { item: "AI counting", lakh: 2 },
    { item: "Sample collection", lakh: 1 },
    { item: "Raman/FTIR reference testing", lakh: 0.5 },
  ],
};

export const stage0Outcomes = [
  "Results equivalent to or better than Raman spectroscopy on the same samples.",
  "The method holds up in real-world water: against iron, organics and turbidity.",
  "A clear picture of maintenance, and of what a cartridge will finally cost.",
  "Multiple customer conversations and at least one active pilot.",
];

export const afterStage0 =
  "With Stage 0 done, the project is positioned to apply for BIRAC BIG or NIDHI-PRAYAS, along with incubation.";

export const founder = {
  name: "Sri Nikitha T",
  bio: "Studied at IIT Kharagpur and Ashoka University. 8+ years building from 0→1 across manufacturing, government and technology: process innovation and wastage reduction at NRB Bearings, industrial wastewater treatment and lab setup at Ecosattva, Innovation Fellow with the Government of Telangana, and most recently AI product management.",
  email: "t.srinikitha@gmail.com",
};
