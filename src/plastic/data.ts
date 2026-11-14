// PlasticOptics microsite content.
// Primary source: "PlasticOptics" Google Doc, V2 tab (stages, unit economics,
// break-even, Stage 0 budget). Long-range material (Stage 3+, removal, cost-down
// levers) comes from the "Plasticoptics Master Plan". External facts carry sources.
// Money is INR. L = lakh (1e5), Cr = crore (1e7).

export const EMAIL = "t.srinikitha@gmail.com";

export const PAGES = [
  { path: "/plastic", label: "Overview" },
  { path: "/plastic/numbers", label: "Numbers" },
  { path: "/plastic/market", label: "Go-to-market" },
  { path: "/plastic/roadmap", label: "Roadmap" },
  { path: "/plastic/science", label: "Science" },
];

// Right-rail facts, shown on every page.
export const KEY_NUMBERS: { k: string; v: string; note?: string }[] = [
  { k: "The ask", v: "₹23.8 L", note: "the full Stage 0 budget · ~6 months" },
  { k: "Time to result", v: "20–30 min", note: "vs 72 hrs+ at a lab" },
  { k: "Device", v: "₹1.6 L → ₹3–4.5 L", note: "cost → price" },
  { k: "Cartridge", v: "₹400 → ₹1–2 K", note: "cost → price, one per test" },
  { k: "Lab test today", v: "₹3–5 K", note: "per test, 72 hrs+" },
  { k: "Break-even", v: "35 plants", note: "operating, Year 4" },
  { k: "Licensed plants in India", v: "6,200+", note: "packaged drinking water" },
];

/* ───────────────────────── V2: overview ───────────────────────── */

export const goal =
  "Build an effective and fast industrial device that can detect and remove microplastics from water, food and air.";

export const surfaces = [
  {
    name: "Drinking water",
    verdict: "Start here",
    feasibility:
      "There is enough research on detecting microplastics in water to give a strong set of directions to pursue.",
  },
  {
    name: "Food",
    verdict: "Next",
    feasibility:
      "Items like salt and masalas are an extension of the water work. Pursue once the technology is validated and proven on water.",
  },
  {
    name: "Air",
    verdict: "Later",
    feasibility:
      "Today's method lets airborne particles settle on a surface or passes air through a filter, then runs detection on that.",
  },
];

export const whereToStart =
  "Water is the best bet, and the work done there extends to the other surfaces. The largest revenue potential is likely in food, across both detection and removal. Everything below is about detecting and removing microplastics in drinking water.";

export const whoPays = {
  who: "Plants bottling water and beverages.",
  why: "They run reverse osmosis, but RO filters themselves release microplastics, and the source water carries them too. Plants don't know how much ends up in the product, and have no way to remove microplastics other than RO.",
};

export const today = {
  method: "FTIR or Raman spectroscopy is the only way to measure microplastics today.",
  facts: [
    { v: "72 hrs+", k: "from sample collection to result" },
    { v: "Few labs", k: "prepared samples go to university or private labs" },
    { v: "Long queues", k: "high waiting times at the labs that exist" },
    { v: "₹3–5 K", k: "spent per test" },
  ],
  punchline: "So nobody tests routinely.",
};

export const objective = {
  text: "A benchtop device the plant's quality-control team can run without training. It counts microplastics in 20–30 minutes, so a plant can test every batch, not just one.",
  how: "Differential staining with dyes, and AI particle counting.",
  revenue:
    "The device is a sale. Each test then uses a new cartridge, so continued use of the device creates recurring cartridge revenue.",
  pilot: "Uravu Labs, Bengaluru, is the intended first pilot partner.",
};

export const stages = [
  {
    n: 0,
    name: "Prove the technology",
    when: "Now → ~6 months",
    objective: "Differential staining + AI-based counting, checked against Raman/FTIR.",
    spend: "Reagents, collaboration with professors, lab setup, Raman/FTIR reference testing",
    funding: "~₹23.8 L",
    current: true,
  },
  {
    n: 1,
    name: "Prototype and pilots",
    when: "Months 6 → 24",
    objective: "Design and build the working prototype. Pilot at 10 plants.",
    spend: "Core team, 3–4 prototype rounds, 10 pilot units, patent filing",
    funding: "₹2 Cr · pre-seed + grants",
  },
  {
    n: 2,
    name: "Revenue and surface expansion",
    when: "Years 2 → 4",
    objective:
      "35+ plants reordering test cartridges by Year 4, enough to cover operating costs; 50+ is the stretch goal. Removal work starts. Detection R&D starts on food items such as salt.",
    spend:
      "Contract manufacturing, tooling, method validation, first sales hire, field service, inventory",
    funding: "₹10 Cr",
  },
];

export const unitEconomics = {
  incumbent: { label: "Today's option: a Raman spectrometer plus the lab equipment to run it", v: "~₹1.5 Cr" },
  deviceCost: [
    { item: "Microscope, optical filters, container, software", v: 120000 },
    { item: "Assembly, calibration, installation, shipping", v: 40000 },
  ],
  devicePrice: "₹3–4.5 L",
  cartridgeCost: 400,
  // ₹400 is the planning cost per finished cartridge. Bench consumables today are ₹193
  // (Master Plan); the rest is an allowance for what a lab bench doesn't need.
  cartridgeBreakdown: [
    { item: "Consumables at the lab bench today: membrane, dyes, glassware", v: 193 },
    { item: "Allowance for housing, assembly, quality checks, delivery", v: 207 },
  ],
  cartridgePrice: "₹1,000–2,000",
  labPerTest: "₹3,000–5,000",
  caveat: "These numbers will change with more research and more conversations with potential customers.",
};

export const budget = [
  { item: "My stipend", v: 4.5 },
  { item: "Research collaboration", v: 4 },
  { item: "Optical equipment", v: 4 },
  { item: "Lab space and equipment", v: 3 },
  { item: "Analytical balance", v: 2.8 },
  { item: "Reagents and membranes", v: 2 },
  { item: "AI counting", v: 2 },
  { item: "Sample collection", v: 1 },
  { item: "Raman/FTIR reference testing", v: 0.5 },
];

export const stage0Done = [
  "Counts equivalent to or better than Raman spectroscopy on the same samples.",
  "The method holds up in real-world water: against iron, organics and turbidity.",
  "An accurate sense of the system's maintenance, and of what a cartridge will finally cost.",
  "Multiple customer conversations and at least one active pilot.",
];

export const afterStage0 = "After Stage 0: apply for BIRAC BIG or NIDHI-PRAYAS, plus incubation.";

export const founder = {
  name: "Sri Nikitha T",
  bio: "IIT Kharagpur and Ashoka University. 8+ years building from 0→1 across manufacturing, government and technology: process innovation and wastage reduction at NRB Bearings, industrial wastewater treatment and lab setup at Ecosattva, Innovation Fellow with the Government of Telangana, and most recently AI product management.",
};

/* ───────────────────────── Market facts (sourced) ───────────────────────── */

export const SOURCES = {
  bis: {
    label: "BIS, compulsory certification of packaged drinking water (Sept 2022)",
    url: "https://services.bis.gov.in/php/BIS_2.0/BISBlog/?p=610",
  },
  ibef: {
    label: "IBEF, India packaged drinking water industry outlook",
    url: "https://www.ibef.org/blogs/india-packaged-drinking-water-industry-demand-trends-and-market-outlook",
  },
  california: {
    label: "California State Water Board, microplastics policy handbook (2022)",
    url: "https://www.waterboards.ca.gov/drinking_water/certlic/drinkingwater/docs/2022/mp-hndbk.pdf",
  },
  californiaNews: {
    label: "CalMatters, California approves microplastics testing (Sept 2022)",
    url: "https://calmatters.org/environment/2022/09/california-microplastics-testing-drinking-water-sources/",
  },
  eu: {
    label: "Commission Delegated Decision (EU) 2024/1441",
    url: "https://eur-lex.europa.eu/eli/dec_del/2024/1441/oj/eng",
  },
  jrc: {
    label: "EU Joint Research Centre, methodology to measure microplastics in drinking water (2024)",
    url: "https://joint-research-centre.ec.europa.eu/jrc-news-and-updates/new-methodology-measure-microplastics-eus-drinking-water-2024-04-23_en",
  },
  fssai: {
    label: "Business Standard, FSSAI launches project on microplastics in food (Aug 2024)",
    url: "https://business-standard.com/amp/health/fssai-launches-project-to-tackle-microplastic-contamination-in-food-124081800288_1.html",
  },
  uravu: {
    label: "Mongabay India, Uravu Labs air-to-water (Aug 2024)",
    url: "https://india.mongabay.com/2024/08/innovative-air-to-water-tech-using-liquid-desiccant-makes-affordable-renewable-water/",
  },
};

export const market = {
  licensedPlants: 6200, // BIS licences for packaged drinking water, IS 14543 (">6,200", Sept 2022)
  packagedWaterMarketCr: 32040, // IBEF, 2025
  packagedWaterMarket2032Cr: 57850,
};

export const whyNow = [
  {
    when: "2022",
    where: "California",
    what: "Became the first government in the world to require microplastics testing of drinking water. Its 2022 plan schedules testing of treated water for 2026–2028. The board estimated $1,000–2,000 per sample by FTIR/Raman.",
    src: ["california", "californiaNews"] as const,
  },
  {
    when: "2024",
    where: "European Union",
    what: "Adopted a standard methodology for measuring microplastics in drinking water, the step before adding them to the drinking-water watch list. It needs at least 1,000 litres per sample.",
    src: ["eu", "jrc"] as const,
  },
  {
    when: "2024",
    where: "India · FSSAI",
    what: "Launched a project on micro- and nano-plastics as emerging food contaminants with CSIR-IITR, ICAR-CIFT and BITS Pilani, to validate detection methods and measure prevalence.",
    src: ["fssai"] as const,
  },
];

/* ───────────────────────── Go-to-market ───────────────────────── */

export const pathToMarket = [
  {
    step: "Prove",
    stage: "Stage 0 · ~6 months · ₹23.8 L",
    body: "Match Raman on the same samples. Hold up against iron, organics and turbidity. Pin down cartridge cost and maintenance. Open at least one pilot.",
  },
  {
    step: "Pilot",
    stage: "Stage 1 · months 6–24 · ₹2 Cr",
    body: "3–4 prototype rounds. 10 pilot units at 10 plants, buying cartridges. File the patent. Learn real testing frequency and willingness to pay.",
  },
  {
    step: "Convert",
    stage: "Year 3–4",
    body: "Turn pilots into references and sell to paying plants: 10 in Year 3, 15 in Year 4. Each sale is a device plus a stream of cartridge reorders.",
  },
  {
    step: "Manufacture and serve",
    stage: "Stage 2 · Years 2–4 · ₹10 Cr",
    body: "Contract manufacturing, tooling, method validation, first sales hire, field service, inventory. Target: 35+ plants reordering cartridges by Year 4 (operating break-even), 50+ as the stretch goal.",
  },
];

export const risks = [
  {
    risk: "The chemistry is accurate",
    test: "Staining + AI counts agree with Raman/FTIR on the same samples.",
    when: "Stage 0",
  },
  {
    risk: "It works on real water",
    test: "Counts hold up with iron, organics and turbidity present.",
    when: "Stage 0",
  },
  {
    risk: "The cartridge is cheap to make",
    test: "Cartridge cost lands near ₹400 or below, with known maintenance.",
    when: "Stage 0",
  },
  {
    risk: "Plants will pay",
    test: "Plants accept ₹1,000–2,000 per cartridge and ₹3–4.5 L per device.",
    when: "Stage 0 conversations → Stage 1 pilots",
  },
  {
    risk: "Plants test often enough",
    test: "Plants test about once a day (360 a year), which gives ₹4.32 L of cartridge gross profit per plant a year.",
    when: "Stage 1 pilots",
  },
  {
    risk: "Demand exists without a mandate",
    test: "India sets no microplastics limit for drinking water yet, so early demand must come from quality and brand. Pilots convert to paid without regulation forcing it.",
    when: "Stage 1 → 2",
  },
];

export const unknowns = [
  "The final cartridge cost and price. Every number here will move after Stage 0 and real customer conversations.",
  "How often plants will actually test, which sets cartridge revenue per plant.",
  "How long a plant takes from pilot to purchase order.",
  "How ₹1.5 Cr a year of operating costs splits across R&D, G&A and sales once the team is hired.",
  "Whether Indian regulation (BIS/FSSAI) moves toward a microplastics limit, and when.",
];

export const fundingPath = [
  { label: "Stage 0 · the ask", v: "₹23.8 L", how: "The full Stage 0 budget, asked for now" },
  { label: "After Stage 0", v: "—", how: "BIRAC BIG or NIDHI-PRAYAS, plus incubation" },
  { label: "Stage 1", v: "₹2 Cr", how: "Pre-seed + grants" },
  { label: "Stage 2", v: "₹10 Cr", how: "Manufacturing, sales and field service" },
];

/* ───────────────────────── Roadmap (Master Plan, long range) ───────────────────────── */

export type Track = "detect" | "remove" | "scale";

export const longArc: {
  n: number;
  name: string;
  track: Track;
  body: string;
  gate?: string;
  capital: string;
  range?: [number, number]; // lakh
  newTech?: boolean;
}[] = [
  {
    n: 3,
    name: "Continuous detection",
    track: "detect",
    body: "An inline monitor that samples the plant's water line and reports counts within minutes. Staining and imaging must happen in flow, with no manual filtering. Images from the benchtop devices train the model.",
    gate: "A plant runs it on its line and acts on the readings.",
    capital: "est. ₹5–10 Cr",
    range: [500, 1000],
    newTech: true,
  },
  {
    n: 4,
    name: "Removal pilot",
    track: "remove",
    body: "Metal-phenolic networks, including tamarind and iron, bind microplastics, but only at millilitre volumes today. Scale them to a pilot unit treating cubic metres per hour at one partner plant, verified by our monitors.",
    gate: "The pilot removes microplastics consistently at a cost the plant accepts.",
    capital: "est. ₹10–20 Cr",
    range: [1000, 2000],
    newTech: true,
  },
  {
    n: 5,
    name: "Plant-scale removal",
    track: "remove",
    body: "Full-scale removal at bottling lines and treatment plants. The inline monitor measures incoming water, sets the dose and verifies the output. Revenue per cubic metre treated.",
    gate: "A plant certifies its water microplastic-free with our system.",
    capital: "est. ₹50–100 Cr",
    range: [5000, 10000],
    newTech: true,
  },
  {
    n: 6,
    name: "Scale",
    track: "scale",
    body: "More bottling and beverage plants in India, then the EU and US as regulation arrives. Municipal treatment follows once cost per cubic metre falls far enough.",
    capital: "Revenue + growth capital",
  },
];

export const capitalByStage: { n: number; name: string; range: [number, number]; label: string; track: Track | "now" }[] = [
  { n: 0, name: "Prove the technology", range: [23.8, 23.8], label: "₹23.8 L", track: "now" },
  { n: 1, name: "Prototype and pilots", range: [200, 200], label: "₹2 Cr", track: "detect" },
  { n: 2, name: "Revenue and expansion", range: [1000, 1000], label: "₹10 Cr", track: "detect" },
  { n: 3, name: "Continuous detection", range: [500, 1000], label: "₹5–10 Cr", track: "detect" },
  { n: 4, name: "Removal pilot", range: [1000, 2000], label: "₹10–20 Cr", track: "remove" },
  { n: 5, name: "Plant-scale removal", range: [5000, 10000], label: "₹50–100 Cr", track: "remove" },
];

export const costKeys = ["Chemistry", "Filter media", "Hardware", "Making it", "Delivery, installation, service"];

// Long-range targets at production volume (Master Plan), ₹.
export const longRangeProducts = [
  { name: "Inline monitor", stage: "Stage 3", cost: [0, 0, 600000, 150000, 250000], price: 3500000 },
  { name: "Monitor consumables, per month", stage: "Stage 3", cost: [3000, 6000, 0, 2000, 4000], price: 50000 },
  { name: "Removal at pilot, per m³", stage: "Stage 4", cost: [60, 15, 30, 30, 15], price: 200 },
  { name: "Removal at full scale, per m³", stage: "Stage 5", cost: [24, 6, 12, 12, 6], price: 200 },
];

// Consumables per test at the bench today vs target at volume (Master Plan), ₹, scale 0–200.
export const testCostSteps: { label: string; kind: "total" | "cut" | "add"; from: number; to: number; detail: string }[] = [
  { label: "Bench today", kind: "total", from: 0, to: 193, detail: "Filter ₹120, reagents ₹43, glassware and water ₹30" },
  { label: "Buy membranes direct", kind: "cut", from: 135, to: 193, detail: "Filter ₹120 → ₹62" },
  { label: "13 mm filters, not 25 mm", kind: "cut", from: 100, to: 135, detail: "About 70% less membrane · ₹62 → ₹27" },
  { label: "Bulk dye, machine dosing", kind: "cut", from: 66, to: 100, detail: "Reagents ₹43 → ₹9" },
  { label: "Automated handling", kind: "cut", from: 45, to: 66, detail: "Glassware and handling ₹30 → ₹9" },
  { label: "Channel and logistics", kind: "add", from: 45, to: 60, detail: "Delivery to customer +₹15" },
  { label: "Target", kind: "total", from: 0, to: 60, detail: "Chemistry ₹9, filter ₹27, making ₹9, delivery ₹15" },
];

export const levers = [
  { name: "Cheaper, reusable binding chemistry", stages: "4, 5", low: 20, high: 28, how: "Tamarind and other plant polyphenols instead of tannic acid; recover the metal" },
  { name: "Buy membranes direct, then make our own", stages: "1–3", low: 20, high: 25, how: "Skip distributors, then cast membranes in-house" },
  { name: "Dose only what the water needs", stages: "5", low: 10, high: 20, how: "The inline monitor sets the dose instead of fixed worst-case dosing" },
  { name: "13 mm filters instead of 25 mm", stages: "1–3", low: 10, high: 15, how: "About 70% less membrane area" },
  { name: "Dose into existing plant tanks", stages: "5", low: 10, high: 14, how: "Use the coagulation stage plants already run, no new tanks" },
  { name: "Standard removal modules", stages: "4, 5", low: 5, high: 10, how: "Identical skids built in volume instead of custom builds per plant" },
  { name: "Bulk dye, machine dosing", stages: "1–3", low: 5, high: 8, how: "Dye by the gram, dosed by the microlitre" },
  { name: "Design for volume manufacturing", stages: "1–3", low: 5, high: 8, how: "Injection-moulded housings, fewer parts" },
  { name: "Indian sourcing and assembly", stages: "1–3", low: 5, high: 8, how: "Local optics and electronics, no import duty" },
  { name: "Fewer confirmation tests", stages: "1–3", low: 3, high: 5, how: "Fewer samples sent for Raman or FTIR once the model is trusted" },
];

/* ───────────────────────── Research collaborators ───────────────────────── */

export const collaborators = [
  {
    name: "Prof. Sarit S. Agasti",
    role: "Associate Professor, New Chemistry Unit",
    org: "JNCASR, Bengaluru",
    work: "Chemistry for imaging and sensing, including super-resolution microscopy methods.",
    url: "https://www.jncasr.ac.in/faculty/sagasti",
  },
  {
    name: "Prof. Suryasarathi Bose",
    role: "Professor, Department of Materials Engineering",
    org: "IISc, Bengaluru",
    work: "Polymer materials for water. His group developed a hydrogel that removes microplastics from water (2024).",
    url: "https://iisc.ac.in/events/novel-hydrogel-removes-microplastics-from-water/",
  },
];
