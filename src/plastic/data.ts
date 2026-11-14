// PlasticOptics microsite content.
// Primary source: "PlasticOptics" Google Doc, V2 tab (stages, unit economics,
// break-even, Stage 0 budget). Long-range material (Stage 3+, removal, cost-down
// levers) comes from the "Plasticoptics Master Plan". External facts carry sources.
// Money is INR. L = lakh (1e5), Cr = crore (1e7).

export const EMAIL = "t.srinikitha@gmail.com";

export const PAGES = [
  { path: "/plastic", label: "Overview" },
  { path: "/plastic/numbers", label: "Financials" },
  { path: "/plastic/market", label: "Go-to-Market" },
  { path: "/plastic/roadmap", label: "Roadmap" },
  { path: "/plastic/science", label: "Technology" },
];

// Right-rail facts, shown on every page.
export const KEY_NUMBERS: { k: string; v: string; note?: string }[] = [
  { k: "Funding request", v: "₹23.8 L", note: "Stage 0, six months" },
  { k: "Time to result", v: "20–30 min", note: "Laboratory: 72 hours+" },
  { k: "Device", v: "₹1.6 L → ₹3–4.5 L", note: "Cost → price" },
  { k: "Cartridge", v: "₹400 → ₹1–2 K", note: "Cost → price" },
  { k: "Laboratory test (current)", v: "₹3–5 K", note: "Per test" },
  { k: "Operating break-even", v: "35 plants", note: "Year 4" },
  { k: "Licensed plants in India", v: "6,200+", note: "Packaged drinking water" },
];

/* ───────────────────────── V2: overview ───────────────────────── */

export const goal =
  "To develop a fast, industrial-grade system that detects and removes microplastics from water, food and air.";

export const surfaces = [
  {
    name: "Drinking water",
    verdict: "Phase 1",
    feasibility:
      "An established research base exists for detection methods.",
  },
  {
    name: "Food",
    verdict: "Phase 2",
    feasibility:
      "Salt and spices extend the water method. Development follows validation in water.",
  },
  {
    name: "Air",
    verdict: "Phase 3",
    feasibility:
      "Airborne particles are collected on a surface or filter prior to detection.",
  },
];

export const whereToStart =
  "Drinking water is the initial focus, and the detection method extends to food and air. Food represents the largest long-term revenue opportunity. The sections below address drinking water.";

export const whoPays = {
  who: "Water and Beverage Bottling Plants",
  why: "Bottling plants rely on reverse osmosis, which removes up to 99% of microplastics from source water. After an unknown number of operating cycles, RO membranes may begin to release microplastics into the product. Plants currently cannot quantify microplastic levels in finished product, and therefore cannot determine when membrane performance has declined.",
};

export const today = {
  method: "Current method: FTIR or Raman spectroscopy.",
  facts: [
    { v: "72 hours+", k: "From sample collection to result" },
    { v: "Limited capacity", k: "Few university and private laboratories" },
    { v: "Long lead times", k: "Extended queues at existing laboratories" },
    { v: "₹3,000–5,000", k: "Cost per test" },
  ],
  punchline: "As a result, routine microplastic testing is not performed.",
};

export const objective = {
  text: "A benchtop analyser operated by plant quality-control staff without specialist training. Microplastic counts are reported within 20–30 minutes, enabling testing of every production batch.",
  how: "Differential staining with AI-based particle counting.",
  revenue:
    "A one-time device sale, followed by recurring cartridge sales at one cartridge per test.",
  pilot: "Uravu Labs, Bengaluru (proposed).",
};

export const stages = [
  {
    n: 0,
    name: "Technology validation",
    when: "Now → ~6 months",
    objective: "Validation of differential staining and AI counting against Raman/FTIR.",
    spend: "Reagents, collaboration with professors, lab setup, Raman/FTIR reference testing",
    funding: "~₹23.8 L",
    current: true,
  },
  {
    n: 1,
    name: "Prototype and pilots",
    when: "Months 6 → 24",
    objective: "Development of a working prototype and pilots at 10 plants.",
    spend: "Core team, 3–4 prototype rounds, 10 pilot units, patent filing",
    funding: "₹2 Cr · pre-seed + grants",
  },
  {
    n: 2,
    name: "Commercial launch",
    when: "Years 2 → 4",
    objective:
      "35 or more plants by Year 4, with a target of 50. Initiation of removal R&D and food (salt) R&D.",
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
    { item: "Bench consumables (current)", v: 193 },
    { item: "Housing, assembly, quality control, delivery", v: 207 },
  ],
  cartridgePrice: "₹1,000–2,000",
  labPerTest: "₹3,000–5,000",
  caveat: "All figures are preliminary estimates and will be refined through Stage 0 and customer interviews.",
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
  "Counts equivalent to or better than Raman spectroscopy on identical samples.",
  "Method performance confirmed in the presence of iron, organic matter and turbidity.",
  "Maintenance requirements and final cartridge cost established.",
  "Customer interviews completed and at least one active pilot in place.",
];

export const afterStage0 = "On completion of Stage 0, the company will apply for BIRAC BIG or NIDHI-PRAYAS funding and incubation support.";

export const founder = {
  name: "Sri Nikitha T",
  bio: "IIT Kharagpur and Ashoka University. Over eight years of experience across manufacturing, government and technology, including process innovation at NRB Bearings, industrial wastewater treatment at Ecosattva, the Innovation Fellowship with the Government of Telangana, and AI product management.",
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
    what: "First jurisdiction to require microplastic testing of drinking water. Testing of treated water is scheduled for 2026–2028. Estimated cost: $1,000–2,000 per sample.",
    src: ["california", "californiaNews"] as const,
  },
  {
    when: "2024",
    where: "European Union",
    what: "Adopted a standard method for measuring microplastics in drinking water, ahead of watch-list inclusion. The method requires a minimum sample of 1,000 litres.",
    src: ["eu", "jrc"] as const,
  },
  {
    when: "2024",
    where: "India · FSSAI",
    what: "Launched a project on micro- and nano-plastics in food with CSIR-IITR, ICAR-CIFT and BITS Pilani to validate detection methods.",
    src: ["fssai"] as const,
  },
];

/* ───────────────────────── Go-to-market ───────────────────────── */

export const pathToMarket = [
  {
    step: "Validate",
    stage: "Stage 0 · ~6 months · ₹23.8 L",
    body: "Demonstrate agreement with Raman. Confirm performance with iron, organic matter and turbidity. Establish cartridge cost. Secure one pilot.",
  },
  {
    step: "Pilot",
    stage: "Stage 1 · months 6–24 · ₹2 Cr",
    body: "Three to four prototype iterations. Ten pilot plants purchasing cartridges. Patent filing. Measurement of testing frequency and price acceptance.",
  },
  {
    step: "Convert",
    stage: "Year 3–4",
    body: "Pilot plants serve as references. Ten paying plants in Year 3 and fifteen in Year 4. Each sale comprises one device and recurring cartridges.",
  },
  {
    step: "Scale",
    stage: "Stage 2 · Years 2–4 · ₹10 Cr",
    body: "Contract manufacturing, tooling, method validation, sales and field service. Target of 35 or more plants by Year 4, rising to 50.",
  },
];

export const risks = [
  {
    risk: "Measurement accuracy",
    test: "Counts agree with Raman/FTIR on identical samples.",
    when: "Stage 0",
  },
  {
    risk: "Field performance",
    test: "Counts remain accurate with iron, organic matter and turbidity present.",
    when: "Stage 0",
  },
  {
    risk: "Cartridge cost",
    test: "Production cost of ₹400 or less per cartridge.",
    when: "Stage 0",
  },
  {
    risk: "Pricing",
    test: "Plants accept ₹1,000–2,000 per cartridge and ₹3–4.5 lakh per device.",
    when: "Stage 0–1",
  },
  {
    risk: "Usage frequency",
    test: "Approximately one test per day, yielding ₹4.32 lakh of cartridge gross profit per plant per year.",
    when: "Stage 1",
  },
  {
    risk: "Demand without regulation",
    test: "India has no microplastic limit for drinking water. Pilots must convert to paid contracts on quality and brand value.",
    when: "Stage 1–2",
  },
];

export const unknowns = [
  "Final cartridge cost and price.",
  "Testing frequency per plant.",
  "Length of the sales cycle from pilot to purchase order.",
  "Allocation of ₹1.5 crore of annual operating costs across R&D, G&A and sales.",
  "Timing of any BIS or FSSAI microplastic limit.",
];

export const fundingPath = [
  { label: "Stage 0 · current request", v: "₹23.8 L", how: "Full Stage 0 budget" },
  { label: "After Stage 0", v: "—", how: "BIRAC BIG or NIDHI-PRAYAS; incubation" },
  { label: "Stage 1", v: "₹2 Cr", how: "Pre-seed and grants" },
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
    body: "An inline monitor installed on the water line, reporting counts within minutes. Staining and imaging occur in flow. Benchtop data trains the model.",
    gate: "A plant acts on monitor readings.",
    capital: "est. ₹5–10 Cr",
    range: [500, 1000],
    newTech: true,
  },
  {
    n: 4,
    name: "Removal pilot",
    track: "remove",
    body: "Metal-phenolic networks (tamarind and iron) bind microplastics at millilitre scale. Target: cubic metres per hour at one partner plant.",
    gate: "Consistent removal at a cost acceptable to the plant.",
    capital: "est. ₹10–20 Cr",
    range: [1000, 2000],
    newTech: true,
  },
  {
    n: 5,
    name: "Plant-scale removal",
    track: "remove",
    body: "Full-scale removal at bottling and treatment plants. The monitor measures inflow, sets dosage and verifies output. Revenue per cubic metre treated.",
    gate: "A plant certifies its water as microplastic-free.",
    capital: "est. ₹50–100 Cr",
    range: [5000, 10000],
    newTech: true,
  },
  {
    n: 6,
    name: "Scale",
    track: "scale",
    body: "Expansion across India, followed by the EU and US. Municipal treatment once cost per cubic metre declines.",
    capital: "Revenue + growth capital",
  },
];

export const capitalByStage: { n: number; name: string; range: [number, number]; label: string; track: Track | "now" }[] = [
  { n: 0, name: "Technology validation", range: [23.8, 23.8], label: "₹23.8 L", track: "now" },
  { n: 1, name: "Prototype and pilots", range: [200, 200], label: "₹2 Cr", track: "detect" },
  { n: 2, name: "Commercial launch", range: [1000, 1000], label: "₹10 Cr", track: "detect" },
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
  { name: "Cheaper, reusable binding chemistry", stages: "4, 5", low: 20, high: 28, how: "Plant polyphenols in place of tannic acid; metal recovery" },
  { name: "Direct membrane sourcing", stages: "1–3", low: 20, high: 25, how: "Direct procurement, then in-house membrane casting" },
  { name: "Dose to demand", stages: "5", low: 10, high: 20, how: "Dosage set by the inline monitor" },
  { name: "13 mm filters, not 25 mm", stages: "1–3", low: 10, high: 15, how: "About 70% less membrane area" },
  { name: "Dose into existing plant tanks", stages: "5", low: 10, high: 14, how: "Use of existing coagulation stage" },
  { name: "Standard removal modules", stages: "4, 5", low: 5, high: 10, how: "Standardised skids built in volume" },
  { name: "Bulk dye, machine dosing", stages: "1–3", low: 5, high: 8, how: "Dye by the gram, dosed by the microlitre" },
  { name: "Design for volume manufacturing", stages: "1–3", low: 5, high: 8, how: "Injection-moulded housings, fewer parts" },
  { name: "Indian sourcing and assembly", stages: "1–3", low: 5, high: 8, how: "Local optics and electronics, no import duty" },
  { name: "Fewer confirmation tests", stages: "1–3", low: 3, high: 5, how: "Reduced Raman/FTIR confirmation" },
];

/* ───────────────────────── Research collaborators ───────────────────────── */

export const collaborators = [
  {
    name: "Prof. Sarit S. Agasti",
    role: "Associate Professor, New Chemistry Unit",
    org: "JNCASR, Bengaluru",
    work: "Imaging and sensing chemistry; super-resolution microscopy.",
    url: "https://www.jncasr.ac.in/faculty/sagasti",
  },
  {
    name: "Prof. Suryasarathi Bose",
    role: "Professor, Department of Materials Engineering",
    org: "IISc, Bengaluru",
    work: "Polymer materials for water treatment, including a microplastic-removing hydrogel (2024).",
    url: "https://iisc.ac.in/events/novel-hydrogel-removes-microplastics-from-water/",
  },
];
