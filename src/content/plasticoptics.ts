// All PlasticOptics page content lives here so it can be updated
// without touching layout code in src/pages/PlasticOptics.tsx.
// Source of truth: "Plasticoptics Master Plan" (Nov 2026).
// Currency is INR; "L" = lakh, "Cr" = crore.

export const hero = {
  eyebrow: "PlasticOptics · Stage 0",
  title: "Measure, then remove, microplastics in India's drinking water.",
  summary:
    "PlasticOptics starts with what works today: a lab method that detects microplastics with Nile Red dye, built into a benchtop analyzer any plant can run. Each stage funds the next, from batch detection to continuous detection to removal at plant scale.",
  status: "Raising ₹8–10 lakh for Stage 0 · 4–6 months",
};

export const goal =
  "Fast, industrial-scale removal of microplastics from drinking water. That needs detection fast enough to run continuously at a plant, and removal chemistry that works at plant volumes, at a cost per cubic metre plants will pay. Neither exists today.";

export const problem = {
  intro:
    "Microplastics are in India's drinking water. Bottling plants run reverse osmosis, but RO filters themselves shed microplastics and the source water carries them too. Plants don't know how much ends up in their product.",
  today: [
    { value: "$1–2K", label: "per sample at a spectroscopy lab (Raman / FTIR)" },
    { value: "Days", label: "from sample collection to result" },
    { value: "Few labs", label: "university and private, with long queues" },
    { value: "Zero", label: "water plants that measure or remove them routinely" },
  ],
  punchline: "So no water plant measures microplastics, and none removes them.",
};

export const solution = {
  headline: "Start with a benchtop analyzer any plant can run",
  points: [
    { title: "Same day", body: "Sample in, count out the same day, on site, instead of days at an external lab." },
    { title: "No chemist", body: "Built for the plant's existing quality-control team, not for spectroscopy specialists." },
    { title: "Every batch", body: "Cheap enough per test to check each batch, not one sample a quarter." },
  ],
  method: {
    title: "How it works",
    steps: [
      { step: "Filter", body: "The water sample passes through a small membrane filter that traps the particles." },
      { step: "Stain", body: "Nile Red dye binds to plastic particles so they fluoresce distinctly from everything else." },
      { step: "Count", body: "The analyzer images the filter and an AI model counts the microplastics." },
    ],
  },
  model:
    "Revenue from analyzers and single-use test cartridges first, then inline-monitor consumables, then removal sold per cubic metre of water treated. Detection is sold first and pays for removal.",
};

export const customer = {
  who: "Packaged water and beverage plants, then testing labs and water utilities",
  why: "They can't measure what their filters and source water put into the product, and the only way to measure today is slow, external and expensive.",
  pilot: "Uravu Labs, Bangalore, as the intended first pilot partner.",
};

export const whyWater = {
  intro:
    "Microplastics show up in water, food and air. Drinking water is where to start: the research base is strongest and the detection method carries over to the others.",
  surfaces: [
    { name: "Drinking water", tag: "Now", body: "Enough published research on detection in water to give a strong set of directions. Everything in the stages below is about water." },
    { name: "Food", tag: "Later", body: "Items like salt and masalas extend naturally from the water work once the method is validated." },
    { name: "Air", tag: "Later", body: "Airborne particles are settled onto a surface or caught on a filter, then run through the same detection." },
  ],
};

export type Track = "detect" | "remove" | "other";

export const stagesIntro =
  "Detection comes first because the chemistry exists today, and because removal can only be dosed, proven and sold against a measurement.";

export const stages: {
  n: string;
  name: string;
  track: Track;
  body: string;
  gate?: string;
  capital: string;
  capitalLakh?: [number, number];
  current?: boolean;
  newTech?: boolean;
}[] = [
  {
    n: "0",
    name: "Pathway",
    track: "other",
    body: "Check Nile Red counts against Raman on real Indian water. Ask bottling plants, water utilities and testing labs what a test must do and what it must cost.",
    gate: "The chemistry works and buyers name a price.",
    capital: "₹8–10 L · 4–6 months",
    capitalLakh: [8, 10],
    current: true,
  },
  {
    n: "1",
    name: "Batch detection",
    track: "detect",
    body: "Benchtop analyzer: sample in, count out the same day, no chemist. Sold to packaged water and beverage plants and testing labs, with revenue from machines and test cartridges.",
    gate: "Customers reorder cartridges unprompted.",
    capital: "est. ₹1–2 Cr",
    capitalLakh: [100, 200],
  },
  {
    n: "2",
    name: "Continuous detection",
    track: "detect",
    body: "An inline monitor that samples the plant's water line and reports counts within minutes. Staining and imaging must happen in flow, with no manual filtering. Stage 1 images train the model.",
    gate: "A plant runs it on its line and acts on the readings.",
    capital: "est. ₹5–10 Cr",
    capitalLakh: [500, 1000],
    newTech: true,
  },
  {
    n: "3",
    name: "Removal pilot",
    track: "remove",
    body: "Metal-phenolic networks, including tamarind and iron, bind microplastics, but only at millilitre volumes today. Scale them to a pilot unit treating cubic metres per hour at one partner plant, verified by our monitors.",
    gate: "The pilot removes microplastics consistently at a cost the plant accepts.",
    capital: "est. ₹10–20 Cr",
    capitalLakh: [1000, 2000],
    newTech: true,
  },
  {
    n: "4",
    name: "Plant-scale removal",
    track: "remove",
    body: "Full-scale removal at bottling lines and treatment plants. The Stage 2 monitor measures incoming water, sets the dose and verifies the output. Revenue per cubic metre treated.",
    gate: "A plant certifies its water microplastic-free with our system.",
    capital: "est. ₹50–100 Cr",
    capitalLakh: [5000, 10000],
    newTech: true,
  },
  {
    n: "5",
    name: "Scale",
    track: "other",
    body: "More bottling and beverage plants in India, then the EU and US as regulation arrives. Municipal treatment follows once cost per cubic metre falls far enough.",
    capital: "Revenue + growth capital",
  },
];

export const unitEconomicsIntro =
  "Prices come from what the product is worth to the plant. Costs are targets at production volume, since today's lab costs (₹100 a filter, ₹1,330 an hour of Raman) will not hold at scale. All figures will be tested with buyers in Stage 0.";

export const costKeys = [
  "Chemistry",
  "Filter media",
  "Hardware",
  "Making it",
  "Delivery, installation, service",
];

// Target cost split (same order as costKeys) and price, in ₹.
export const products: { name: string; stage: string; cost: number[]; price: number }[] = [
  { name: "Benchtop analyzer", stage: "Stage 1", cost: [0, 0, 300000, 75000, 125000], price: 2000000 },
  { name: "Test cartridge", stage: "Stage 1", cost: [9, 27, 0, 9, 15], price: 400 },
  { name: "Inline monitor", stage: "Stage 2", cost: [0, 0, 600000, 150000, 250000], price: 3500000 },
  { name: "Monitor consumables, per month", stage: "Stage 2", cost: [3000, 6000, 0, 2000, 4000], price: 50000 },
  { name: "Removal at pilot, per m³", stage: "Stage 3", cost: [60, 15, 30, 30, 15], price: 200 },
  { name: "Removal at full scale, per m³", stage: "Stage 4", cost: [24, 6, 12, 12, 6], price: 200 },
];

// Stage 1 consumables per test, ₹. kind: total | cut | add. [from, to] on a ₹0–200 scale.
export const testCostSteps: { label: string; kind: "total" | "cut" | "add"; from: number; to: number; detail: string }[] = [
  { label: "Bench today", kind: "total", from: 0, to: 193, detail: "Filter ₹120, reagents ₹43, glassware and water ₹30" },
  { label: "Buy membranes direct", kind: "cut", from: 135, to: 193, detail: "Filter ₹120 → ₹62" },
  { label: "13 mm filters instead of 25 mm", kind: "cut", from: 100, to: 135, detail: "About 70% less membrane · ₹62 → ₹27" },
  { label: "Bulk dye, machine dosing", kind: "cut", from: 66, to: 100, detail: "Reagents ₹43 → ₹9" },
  { label: "Automated handling", kind: "cut", from: 45, to: 66, detail: "Glassware and handling ₹30 → ₹9" },
  { label: "Channel and logistics", kind: "add", from: 45, to: 60, detail: "Delivery to customer +₹15" },
  { label: "Target", kind: "total", from: 0, to: 60, detail: "Chemistry ₹9, filter ₹27, making ₹9, delivery ₹15" },
];

// Cut to unit cost, % range, in the stages each lever applies to.
export const levers: { name: string; stages: string; low: number; high: number; how: string }[] = [
  { name: "Cheaper, reusable binding chemistry", stages: "3, 4", low: 20, high: 28, how: "Tamarind and other plant polyphenols instead of tannic acid; recover the metal" },
  { name: "Buy membranes direct, then make our own", stages: "1, 2", low: 20, high: 25, how: "Skip distributors, then cast membranes in-house" },
  { name: "Dose only what the water needs", stages: "4", low: 10, high: 20, how: "The inline monitor sets the dose instead of fixed worst-case dosing" },
  { name: "13 mm filters instead of 25 mm", stages: "1, 2", low: 10, high: 15, how: "About 70% less membrane area" },
  { name: "Dose into existing plant tanks", stages: "4", low: 10, high: 14, how: "Use the coagulation stage plants already run, no new tanks" },
  { name: "Standard removal modules", stages: "3, 4", low: 5, high: 10, how: "Identical skids built in volume instead of custom builds per plant" },
  { name: "Bulk dye, machine dosing", stages: "1, 2", low: 5, high: 8, how: "Nile Red by the gram, dosed by the microlitre" },
  { name: "Design for volume manufacturing", stages: "1, 2", low: 5, high: 8, how: "Injection-moulded housings, fewer parts" },
  { name: "Indian sourcing and assembly", stages: "1, 2", low: 5, high: 8, how: "Local optics and electronics, no import duty" },
  { name: "Fewer confirmation tests", stages: "1, 2", low: 3, high: 5, how: "Fewer samples sent for Raman or FTIR once the model is trusted" },
];

export const ask = {
  total: "₹8–10 lakh",
  duration: "4–6 months",
  purpose: "Prove Nile Red detection works on Indian water, and learn what plants will pay.",
};

export const stage0Outcomes = [
  "Nile Red counts that match or beat Raman spectroscopy on the same real Indian water samples.",
  "The method holds up against real-world water: iron, organics and turbidity.",
  "Bottling plants, utilities and testing labs name what a test must do and what they will pay for it.",
  "A clear picture of cartridge cost and maintenance, and at least one active pilot conversation.",
];

export const afterStage0 =
  "With Stage 0 done, the project is positioned to apply for BIRAC BIG or NIDHI-PRAYAS, along with incubation, to fund Stage 1.";

export const summary = [
  { lead: "Stage 0 needs ₹8–10 lakh and 4–6 months", rest: " to prove Nile Red works on Indian water and to learn what plants will pay." },
  { lead: "Detection is sold first and pays for removal.", rest: " The money is in consumables and treatment, at 70–85% gross margin." },
  { lead: "The end state is a plant that measures microplastics continuously and removes them", rest: ", at a target ₹60 cost and ₹200 price per cubic metre. The hardest step is scaling binding chemistry from millilitres to cubic metres per hour." },
];

export const founder = {
  name: "Sri Nikitha T",
  bio: "Studied at IIT Kharagpur and Ashoka University. 8+ years building from 0→1 across manufacturing, government and technology: process innovation and wastage reduction at NRB Bearings, industrial wastewater treatment and lab setup at Ecosattva, Innovation Fellow with the Government of Telangana, and most recently AI product management.",
  email: "t.srinikitha@gmail.com",
};
