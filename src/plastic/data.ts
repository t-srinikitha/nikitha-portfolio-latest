// PlasticOptics microsite content.
// Primary source: "PlasticOptics" Google Doc, V2 tab (stages, unit economics,
// Stage 0 budget). Long-range material (Stage 3+, removal, cost-down levers)
// comes from the "Plasticoptics Master Plan". External facts carry sources.
// Market sizes and total capital are back-of-the-envelope estimates.
// Money is INR. L = lakh (1e5), Cr = crore (1e7).

export const EMAIL = "t.srinikitha@gmail.com";

export const PAGES = [
  { path: "/plastic", label: "Overview" },
  { path: "/plastic/science", label: "Technology" },
  { path: "/plastic/market", label: "Go-To-Market" },
  { path: "/plastic/numbers", label: "Business Model" },
  { path: "/plastic/roadmap", label: "R&D Roadmap" },
];

/* ───────────────────────── V2: overview ───────────────────────── */

export const goal =
  "To develop a fast, industrial-grade system that detects and removes microplastics from water, food and air.";

export const surfaces = [
  {
    name: "Drinking water",
    verdict: "Phase 1",
    feasibility:
      "Detection methods for microplastics in water are well established in research. The first product is built for water bottling plants.",
  },
  {
    name: "Food",
    verdict: "Phase 2",
    feasibility:
      "Salt and spices are prepared as liquid samples and tested with the same staining and imaging method used for water. Food testing will be developed after the method is validated in water.",
  },
  {
    name: "Air",
    verdict: "Phase 3",
    feasibility:
      "Airborne particles are collected on a filter, which is then tested with the same method.",
  },
];

export const whereToStart =
  "Drinking water is the first market because detection methods for water are the most established. Food and air follow, using the same detection method. Food represents the largest long-term revenue opportunity.";

export const whoPays = {
  who: "Water and Beverage Bottling Plants",
  why: "Bottling plants rely on reverse osmosis, which removes up to 99% of microplastics from source water. After an unknown number of operating cycles, RO membranes begin to release microplastics into the product. Plants currently cannot quantify microplastic levels in finished product, and therefore cannot determine when membrane performance has declined.",
};

export const today = {
  method: "Plants that test today must use Raman or FTIR spectroscopy.",
  facts: [
    { v: "No commercial service", k: "Testing is available only at a few university and private laboratories, with long queues." },
    { v: "72 hours or more", k: "Time from sample collection to result. The batch has usually shipped by then." },
  ],
  punchline: "As a result, bottling plants do not test for microplastics routinely.",
};

export const objective = {
  text: "A benchtop analyser operated by plant quality-control staff without specialist training. Microplastic counts are reported within 20–30 minutes, enabling testing of every production batch.",
  how: "Differential staining with AI-based particle counting.",
  revenue:
    "A one-time sale of the analyser at ₹5 lakh, followed by a subscription of 30 test cartridges a month at ₹30,000.",
  pilot: "Uravu Labs, Bengaluru (proposed).",
};

export const stages = [
  {
    n: 0,
    name: "Technology validation",
    when: "Now → ~6 months",
    objective: "Validation of differential staining and AI counting against Raman/FTIR.",
    spend: "Reagents, collaboration with professors, lab setup, Raman/FTIR reference testing",
    current: true,
  },
  {
    n: 1,
    name: "Prototype and pilots",
    when: "Months 6 → 24",
    objective: "Development of a working prototype and pilots at 10 plants.",
    spend: "Core team, 3–4 prototype rounds, 10 pilot units, patent filing",
  },
  {
    n: 2,
    name: "Commercial launch",
    when: "Years 2 → 4",
    objective:
      "Sales to 35 plants by Year 4. Research on microplastic removal and on food testing (salt) begins.",
    spend:
      "Contract manufacturing, tooling, method validation, first sales hire, field service, inventory",
  },
];

export const unitEconomics = {
  incumbent: { label: "Raman spectrometer and lab equipment", v: "~₹1.5 Cr" },
  deviceCost: [
    { item: "Microscope, optical filters, container, software", v: 120000 },
    { item: "Assembly, calibration, installation, shipping", v: 40000 },
  ],
  devicePrice: "₹5,00,000",
  cartridgeCost: 400,
  // ₹400 is the planning cost per finished cartridge. Bench consumables today are ₹193
  // (Master Plan); the rest is an allowance for what a lab bench doesn't need.
  cartridgeBreakdown: [
    { item: "Bench consumables (current)", v: 193 },
    { item: "Housing, assembly, quality control, delivery", v: 207 },
  ],
  cartridgePrice: "₹1,000",
  labPerTest: "₹5,000",
  caveat: "All figures are preliminary estimates and will be refined through Stage 0 and customer interviews.",
};

export const budget = [
  { item: "Research collaboration", v: 8.5 },
  { item: "Optical equipment", v: 4 },
  { item: "Lab space and equipment", v: 3 },
  { item: "Analytical balance", v: 2.8 },
  { item: "Reagents and membranes", v: 2 },
  { item: "AI token costs", v: 2 },
  { item: "Sample collection", v: 1 },
  { item: "Raman/FTIR reference testing", v: 0.5 },
];

export const stage0Done = [
  "Microplastics counted by PlasticOptics are equivalent to those counted by Raman spectroscopy on the same samples.",
  "The method counts microplastics accurately in water that contains iron, organic matter or suspended solids.",
  "The maintenance requirements of the analyser and the final cost of a cartridge are known.",
  "Customer interviews are complete, and at least one plant is running a pilot.",
];

export const afterStage0 = "On completion of Stage 0, the company will apply for BIRAC BIG or NIDHI-PRAYAS funding and incubation support.";

export const founder = {
  name: "Sri Nikitha T",
  bio: "Over eight years of experience across manufacturing, government and technology, including process innovation at NRB Bearings, industrial wastewater treatment at Ecosattva, the Innovation Fellowship with the Government of Telangana, and AI product management. Educated at IIT Kharagpur and Ashoka University.",
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
  bisleri: {
    label: "Business Today, Bisleri has 128 plants (Sept 2023)",
    url: "https://businesstoday.in/interactive/photo-essay/bisleris-thirst-for-dominance-how-jayanti-chauhan-is-propelling-the-brand-to-greater-heights-110-28-09-2023",
  },
  indiaVolume: {
    label: "Research and Markets, India packaged water: 24.92 billion litres in 2024",
    url: "https://www.researchandmarkets.com/report/india-packaged-water-market",
  },
  unu: {
    label: "UNU-INWEH, Global Bottled Water Industry (2023): 350 billion litres, US$270 billion",
    url: "https://unu.edu/inweh/collection/global-bottled-water-industry-review-impacts-and-trends",
  },
  mpDetection: {
    label: "MarketsandMarkets, microplastic detection market: US$4.76 billion in 2024",
    url: "https://www.marketsandmarkets.com/Market-Reports/microplastic-detection-market-17417476.html",
  },
  foodTesting: {
    label: "Fortune Business Insights, food safety testing market: US$24.24 billion in 2024",
    url: "https://www.fortunebusinessinsights.com/food-safety-testing-market-108286",
  },
  fssaiLabs: {
    label: "FSSAI, notified food testing laboratories (206 as of January 2024)",
    url: "https://fssai.gov.in/cms/food-laboratories.php",
  },
  airIndia: {
    label: "IMARC, India air quality monitoring market: US$170 million in 2024",
    url: "https://www.imarcgroup.com/india-air-quality-monitoring-market",
  },
  airGlobal: {
    label: "IMARC, air quality monitoring market: US$5.2 billion in 2024",
    url: "https://imarcgroup.com/air-quality-monitoring-market-statistics",
  },
  airStations: {
    label: "CREA, Tracing the Hazy Air 2025: 1,524 monitoring stations in India",
    url: "https://energyandcleanair.org/publication/tracing-the-hazy-air-2025-progress-report-on-national-clean-air-programme-ncap/",
  },
  matter: {
    label: "Tech.eu, Matter raises $10M (Aug 2023)",
    url: "https://tech.eu/2023/08/11/matter-10m-microplastics-filtration-technology/",
  },
  polygone: {
    label: "Business Wire, PolyGone Systems raises $4M seed (Feb 2026)",
    url: "https://www.businesswire.com/news/home/20260218402495/en/PolyGone-Systems-Raises-$4M-Seed-Round-to-Scale-Microplastic-Monitoring-and-Removal",
  },
  klar2o: {
    label: "Startbase, Klar2O raises €4.5M Series A (Sept 2025)",
    url: "https://www.startbase.com/news/45-mio-e-series-a-fuer-klar2o/",
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
  nationalBrandPlants: 500, // estimate: plants bottling for national brands; Bisleri alone has 128
  indiaVolumeBnL: 24.92, // 2024
  globalVolumeBnL: 350, // 2021
  removalPerM3: 200, // target price of removal, ₹ per cubic metre (20 paise per litre)
  usd: 85, // ₹ per US$, for conversion
};

/* ───────────────────────── Current status ───────────────────────── */

export const status = {
  summary: "PlasticOptics is at the idea stage. The method has not yet been tested in the laboratory.",
  inPlace: [
    "Access to a Raman spectrometer for reference testing.",
    "Most of the materials required for the Stage 0 experiments.",
    "Initial discussions with bottling plants and brands.",
    "Agreement from Prof. Sarit S. Agasti (JNCASR) and Prof. Suryasarathi Bose (IISc) to collaborate.",
  ],
  conclusion:
    "The funding requested pays for the experiments that establish whether the method works, and for a first prototype.",
};

/* ───────────────────────── Capital for the full objective (estimate) ───────────────────────── */

// ₹ crore. The first line comes from the business case in model.ts, rounded.
// The removal and inline-detection lines follow the Master Plan estimates.
export const missionCapital = [
  {
    programme: "Bottling-plant analyser",
    scope: "Validation, product development and operating losses until the business is profitable.",
    low: 5,
    high: 5,
  },
  {
    programme: "Detection in food and air",
    scope: "Sample preparation, validation against reference methods, and a product variant for each.",
    low: 5,
    high: 10,
  },
  {
    programme: "Continuous detection",
    scope: "An inline monitor that stains and images water in flow. This requires a new instrument.",
    low: 5,
    high: 10,
  },
  {
    programme: "Removal pilot",
    scope: "Removal chemistry scaled from millilitres to cubic metres per hour at one partner plant.",
    low: 10,
    high: 20,
  },
  {
    programme: "Plant-scale removal",
    scope: "Full-scale removal units, their manufacture, and installation at bottling and treatment plants.",
    low: 50,
    high: 100,
  },
];

export const comparables = [
  { name: "Matter", where: "United Kingdom", raised: "US$10 million", round: "Series A, 2023", what: "Microplastic filtration for washing machines and wastewater.", src: "matter" as const },
  { name: "PolyGone Systems", where: "United States", raised: "US$4 million", round: "Seed, 2026", what: "Microplastic monitoring and removal. The round followed about US$2.3 million in grants.", src: "polygone" as const },
  { name: "Klar2O", where: "Germany", raised: "€4.5 million", round: "Series A, 2025", what: "Removal of microplastics and PFAS from drinking water.", src: "klar2o" as const },
];

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
    stage: "Stage 0 · ~6 months",
    body: "Demonstrate agreement with Raman. Confirm performance with iron, organic matter and turbidity. Establish cartridge cost. Secure one pilot.",
  },
  {
    step: "Pilot",
    stage: "Stage 1 · months 6–24",
    body: "Three to four prototype iterations. Ten pilot plants purchasing cartridges. Patent filing. Measurement of testing frequency and price acceptance.",
  },
  {
    step: "Convert",
    stage: "Year 3–4",
    body: "Pilot plants serve as references. Ten paying plants in Year 3 and fifteen in Year 4. Each sale comprises one device and recurring cartridges.",
  },
  {
    step: "Scale",
    stage: "Stage 2 · Years 2–4",
    body: "Contract manufacturing, tooling, method validation, sales and field service. Target of 35 plants by Year 4, followed by 25 new plants each year.",
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
    test: "Plants accept ₹1,000 per cartridge and ₹5 lakh per analyser.",
    when: "Stage 0–1",
  },
  {
    risk: "Usage frequency",
    test: "Approximately one test per day, yielding ₹2.16 lakh of cartridge gross profit per plant per year.",
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
  "Number of plants that bottle for national brands, and who approves the purchase at each.",
  "Operating costs once the analyser is on sale, assumed at ₹1.5 crore a year.",
  "Timing of any BIS or FSSAI microplastic limit.",
];

/* ───────────────────────── Roadmap (Master Plan, long range) ───────────────────────── */

export type Track = "detect" | "remove" | "scale";

export const longArc: {
  n: number;
  name: string;
  track: Track;
  body: string;
  gate?: string;
  newTech?: boolean;
}[] = [
  {
    n: 3,
    name: "Continuous detection",
    track: "detect",
    body: "An inline monitor installed on the water line, reporting counts within minutes. Staining and imaging occur in flow. Benchtop data trains the model.",
    gate: "A plant acts on monitor readings.",
    newTech: true,
  },
  {
    n: 4,
    name: "Removal pilot",
    track: "remove",
    body: "Metal-phenolic networks (tamarind and iron) bind microplastics at millilitre scale. Target: cubic metres per hour at one partner plant.",
    gate: "Consistent removal at a cost acceptable to the plant.",
    newTech: true,
  },
  {
    n: 5,
    name: "Plant-scale removal",
    track: "remove",
    body: "Full-scale removal at bottling and treatment plants. The monitor measures inflow, sets dosage and verifies output. Revenue per cubic metre treated.",
    gate: "A plant certifies its water as microplastic-free.",
    newTech: true,
  },
  {
    n: 6,
    name: "Scale",
    track: "scale",
    body: "Expansion across India, followed by the EU and US. Municipal treatment once cost per cubic metre declines.",
  },
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
