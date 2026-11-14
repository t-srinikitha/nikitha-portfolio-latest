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
  { k: "The ask", v: "₹23.8 L", note: "Stage 0 · 6 months" },
  { k: "Time to result", v: "20–30 min", note: "Lab: 72 hrs+" },
  { k: "Device", v: "₹1.6 L → ₹3–4.5 L", note: "cost → price" },
  { k: "Cartridge", v: "₹400 → ₹1–2 K", note: "cost → price" },
  { k: "Lab test today", v: "₹3–5 K", note: "per test" },
  { k: "Break-even", v: "35 plants", note: "Year 4" },
  { k: "Licensed plants in India", v: "6,200+", note: "packaged drinking water" },
];

/* ───────────────────────── V2: overview ───────────────────────── */

export const goal =
  "A fast industrial device that detects and removes microplastics from water, food and air.";

export const surfaces = [
  {
    name: "Drinking water",
    verdict: "Start here",
    feasibility:
      "Strong research base for detection.",
  },
  {
    name: "Food",
    verdict: "Next",
    feasibility:
      "Salt and masalas extend the water method. Starts after water is validated.",
  },
  {
    name: "Air",
    verdict: "Later",
    feasibility:
      "Particles are collected on a surface or filter, then detected.",
  },
];

export const whereToStart =
  "Water first. The method extends to food and air. Food is the largest revenue opportunity. This page covers drinking water.";

export const whoPays = {
  who: "Water and beverage bottling plants",
  why: "Plants use reverse osmosis. RO filters release microplastics. Source water contains them too. Plants cannot measure the level in their product. RO is their only removal step.",
};

export const today = {
  method: "Today: FTIR or Raman spectroscopy only.",
  facts: [
    { v: "72 hrs+", k: "Sample to result" },
    { v: "Few labs", k: "University and private" },
    { v: "Long queues", k: "High waiting times" },
    { v: "₹3–5 K", k: "Per test" },
  ],
  punchline: "No plant tests routinely.",
};

export const objective = {
  text: "A benchtop device for the plant's QC team. No training. Counts microplastics in 20–30 minutes. Every batch gets tested.",
  how: "Differential staining and AI particle counting.",
  revenue:
    "One-time device sale. One cartridge per test. Recurring revenue.",
  pilot: "Uravu Labs, Bengaluru (intended).",
};

export const stages = [
  {
    n: 0,
    name: "Prove the technology",
    when: "Now → ~6 months",
    objective: "Validate staining and AI counting against Raman/FTIR.",
    spend: "Reagents, collaboration with professors, lab setup, Raman/FTIR reference testing",
    funding: "~₹23.8 L",
    current: true,
  },
  {
    n: 1,
    name: "Prototype and pilots",
    when: "Months 6 → 24",
    objective: "Build the prototype. Pilot at 10 plants.",
    spend: "Core team, 3–4 prototype rounds, 10 pilot units, patent filing",
    funding: "₹2 Cr · pre-seed + grants",
  },
  {
    n: 2,
    name: "Revenue and surface expansion",
    when: "Years 2 → 4",
    objective:
      "35+ plants by Year 4. Stretch: 50+. Start removal R&D. Start food R&D (salt).",
    spend:
      "Contract manufacturing, tooling, method validation, first sales hire, field service, inventory",
    funding: "₹10 Cr",
  },
];

export const unitEconomics = {
  incumbent: { label: "Raman spectrometer and lab equipment", v: "~₹1.5 Cr" },
  deviceCost: [
    { item: "Microscope, optical filters, container, software", v: 120000 },
    { item: "Assembly, calibration, installation, shipping", v: 40000 },
  ],
  devicePrice: "₹3–4.5 L",
  cartridgeCost: 400,
  // ₹400 is the planning cost per finished cartridge. Bench consumables today are ₹193
  // (Master Plan); the rest is an allowance for what a lab bench doesn't need.
  cartridgeBreakdown: [
    { item: "Bench consumables today", v: 193 },
    { item: "Housing, assembly, QC, delivery", v: 207 },
  ],
  cartridgePrice: "₹1,000–2,000",
  labPerTest: "₹3,000–5,000",
  caveat: "Estimates. Stage 0 and customer interviews will update them.",
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
  "Counts match or beat Raman on the same samples.",
  "Method works with iron, organics and turbidity present.",
  "Maintenance needs and final cartridge cost known.",
  "Customer interviews done. At least one active pilot.",
];

export const afterStage0 = "Next: BIRAC BIG or NIDHI-PRAYAS, and incubation.";

export const founder = {
  name: "Sri Nikitha T",
  bio: "IIT Kharagpur. Ashoka University. 8+ years in manufacturing, government and technology. Process innovation at NRB Bearings. Industrial wastewater treatment at Ecosattva. Innovation Fellow, Government of Telangana. AI product manager.",
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
    what: "First government to require microplastics testing of drinking water. Treated-water testing planned for 2026–2028. Estimated cost: $1,000–2,000 per sample.",
    src: ["california", "californiaNews"] as const,
  },
  {
    when: "2024",
    where: "European Union",
    what: "Standard method for microplastics in drinking water. Precedes the watch list. Requires 1,000 litres per sample.",
    src: ["eu", "jrc"] as const,
  },
  {
    when: "2024",
    where: "India · FSSAI",
    what: "Project on micro- and nano-plastics in food, with CSIR-IITR, ICAR-CIFT and BITS Pilani. Validates detection methods.",
    src: ["fssai"] as const,
  },
];

/* ───────────────────────── Go-to-market ───────────────────────── */

export const pathToMarket = [
  {
    step: "Prove",
    stage: "Stage 0 · ~6 months · ₹23.8 L",
    body: "Match Raman. Handle iron, organics and turbidity. Fix cartridge cost. Open one pilot.",
  },
  {
    step: "Pilot",
    stage: "Stage 1 · months 6–24 · ₹2 Cr",
    body: "3–4 prototype rounds. 10 pilot plants buying cartridges. Patent filed. Measure test frequency and price.",
  },
  {
    step: "Convert",
    stage: "Year 3–4",
    body: "Pilots become references. 10 paying plants in Year 3. 15 in Year 4. Each sale: one device plus cartridges.",
  },
  {
    step: "Scale",
    stage: "Stage 2 · Years 2–4 · ₹10 Cr",
    body: "Contract manufacturing, tooling, method validation, sales, field service. 35+ plants by Year 4. Stretch: 50+.",
  },
];

export const risks = [
  {
    risk: "Accuracy",
    test: "Counts agree with Raman/FTIR on the same samples.",
    when: "Stage 0",
  },
  {
    risk: "Real water",
    test: "Counts hold with iron, organics and turbidity.",
    when: "Stage 0",
  },
  {
    risk: "Cartridge cost",
    test: "₹400 or less per cartridge.",
    when: "Stage 0",
  },
  {
    risk: "Price",
    test: "Plants pay ₹1,000–2,000 per cartridge and ₹3–4.5 L per device.",
    when: "Stage 0–1",
  },
  {
    risk: "Usage",
    test: "About one test a day. ₹4.32 L cartridge gross profit per plant a year.",
    when: "Stage 1",
  },
  {
    risk: "Demand",
    test: "No Indian limit yet. Pilots convert to paid on quality and brand value alone.",
    when: "Stage 1–2",
  },
];

export const unknowns = [
  "Final cartridge cost and price.",
  "Actual testing frequency per plant.",
  "Sales cycle from pilot to purchase order.",
  "Split of ₹1.5 Cr operating costs across R&D, G&A and sales.",
  "Timing of any BIS or FSSAI microplastics limit.",
];

export const fundingPath = [
  { label: "Stage 0 · the ask", v: "₹23.8 L", how: "Full Stage 0 budget" },
  { label: "After Stage 0", v: "—", how: "BIRAC BIG or NIDHI-PRAYAS, incubation" },
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
    body: "Inline monitor on the water line. Counts in minutes. Staining and imaging in flow. Benchtop images train the model.",
    gate: "A plant acts on its readings.",
    capital: "est. ₹5–10 Cr",
    range: [500, 1000],
    newTech: true,
  },
  {
    n: 4,
    name: "Removal pilot",
    track: "remove",
    body: "Metal-phenolic networks (tamarind, iron) bind microplastics at millilitre scale. Scale to cubic metres per hour at one plant.",
    gate: "Consistent removal at an accepted cost.",
    capital: "est. ₹10–20 Cr",
    range: [1000, 2000],
    newTech: true,
  },
  {
    n: 5,
    name: "Plant-scale removal",
    track: "remove",
    body: "Full-scale removal at bottling and treatment plants. The monitor measures, doses and verifies. Revenue per cubic metre.",
    gate: "A plant certifies microplastic-free water.",
    capital: "est. ₹50–100 Cr",
    range: [5000, 10000],
    newTech: true,
  },
  {
    n: 6,
    name: "Scale",
    track: "scale",
    body: "More plants in India. Then the EU and US. Municipal treatment once cost per cubic metre falls.",
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
  { name: "Cheaper, reusable binding chemistry", stages: "4, 5", low: 20, high: 28, how: "Plant polyphenols replace tannic acid. Metal recovered." },
  { name: "Direct membrane sourcing", stages: "1–3", low: 20, high: 25, how: "No distributors. In-house membranes later." },
  { name: "Dose to demand", stages: "5", low: 10, high: 20, how: "Monitor sets the dose." },
  { name: "13 mm filters, not 25 mm", stages: "1–3", low: 10, high: 15, how: "About 70% less membrane area" },
  { name: "Dose into existing plant tanks", stages: "5", low: 10, high: 14, how: "Existing coagulation stage. No new tanks." },
  { name: "Standard removal modules", stages: "4, 5", low: 5, high: 10, how: "Identical skids, built in volume." },
  { name: "Bulk dye, machine dosing", stages: "1–3", low: 5, high: 8, how: "Dye by the gram, dosed by the microlitre" },
  { name: "Design for volume manufacturing", stages: "1–3", low: 5, high: 8, how: "Injection-moulded housings, fewer parts" },
  { name: "Indian sourcing and assembly", stages: "1–3", low: 5, high: 8, how: "Local optics and electronics, no import duty" },
  { name: "Fewer confirmation tests", stages: "1–3", low: 3, high: 5, how: "Fewer Raman/FTIR checks." },
];

/* ───────────────────────── Research collaborators ───────────────────────── */

export const collaborators = [
  {
    name: "Prof. Sarit S. Agasti",
    role: "Associate Professor, New Chemistry Unit",
    org: "JNCASR, Bengaluru",
    work: "Imaging and sensing chemistry. Super-resolution microscopy.",
    url: "https://www.jncasr.ac.in/faculty/sagasti",
  },
  {
    name: "Prof. Suryasarathi Bose",
    role: "Professor, Department of Materials Engineering",
    org: "IISc, Bengaluru",
    work: "Polymer materials for water. Microplastic-removing hydrogel (2024).",
    url: "https://iisc.ac.in/events/novel-hydrogel-removes-microplastics-from-water/",
  },
];
