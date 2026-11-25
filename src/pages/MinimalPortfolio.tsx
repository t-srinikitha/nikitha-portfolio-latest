import { Github, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react";
import { Checkerboard } from "@/components/layout/checkerboard";
import { Footer } from "@/components/layout/footer";
import { MAILTO, useTitle } from "@/lib/site";

const building = [
  {
    title: "The problem",
    text: "Microplastics are in our water and food. Testing for them today needs a lab, a spectrometer and days of waiting.",
  },
  {
    title: "My approach",
    text: "Fluorescence plus AI particle counting, tested on Indian water from day one.",
  },
  {
    title: "In the lab now",
    text: "Stage 0: proving the science. I'm running fluorescence experiments on Kaveri river samples in my home lab and cross-checking results with Raman spectroscopy.",
  },
  {
    title: "Looking for",
    text: "Academic collaborators, pilot partners in beverages and water, and funding for lab equipment.",
  },
];

const milestones = [
  {
    label: "Stanford",
    title: "Frugal Science",
    text: "Team FishEye in Prof. Manu Prakash's Frugal Science course. Our first attempt at low-cost microplastics detection.",
    tags: ["Frugal Science", "2021"],
  },
  {
    label: "NRB Bearings",
    title: "Manufacturing Process Ownership",
    text: "Traced corroded-bearing wastage to a coating step run by monthly-rotating apprentices. Took over the process and cut wastage by 90%.",
    tags: ["Manufacturing", "90% less wastage"],
  },
  {
    label: "Facets.cloud",
    title: "Product Management",
    text: "Took the product from 0 to $410K ARR with 15+ enterprise customers and 500+ users.",
    tags: ["$410K ARR", "15 Customers"],
  },
];

const alsoDid = [
  { label: "DrDroid (YC-backed)", text: "Led product strategy for an AI SRE agent." },
  { label: "French Startup", text: "Delivered a ₹1Cr sustainable housing project in 3 months." },
  { label: "Telangana Government", text: "Designed innovation courses across 33 districts." },
];

function Divider() {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="border-t border-black/10 dark:border-white/10" />
    </div>
  );
}

export default function MinimalPortfolio() {
  useTitle("Sri Nikitha T | Founder, PlasticOptics");

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative border-b border-black/10 dark:border-white/10">
      <Checkerboard />
      <section className="relative max-w-4xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Text Content */}
          <div className="lg:col-span-2 space-y-6">
            <p className="text-sm opacity-60">Hello, I'm</p>
            
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Sri Nikitha T
            </h1>
            
            <p className="text-lg">
              <span className="relative inline-block">
                <span 
                  className="absolute inset-0 -skew-y-1 -rotate-1 scale-x-105"
                  style={{ 
                    backgroundColor: "#DFFF00",
                    clipPath: 'polygon(2% 15%, 98% 5%, 100% 85%, 3% 95%)',
                    opacity: 1
                  }}
                />
                <span className="relative text-black">Founder, PlasticOptics</span>
              </span>
            </p>

            <p className="font-mono text-xl lg:text-2xl leading-snug max-w-xl">
              In 2021 our team tried to build a Raman spectrometer out of origami to find
              microplastics. It was the wrong tool. Now I'm working on the right one.
            </p>

            <p className="text-sm leading-relaxed opacity-70 max-w-lg">
              I'm building PlasticOptics to measure and remove microplastics, starting with a fast,
              affordable test for drinking water. Materials engineer (IIT Kharagpur), Young India Fellow
              (Ashoka). 8+ years building across government, manufacturing and developer tools.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href={MAILTO}
                className="inline-flex items-center gap-2 px-5 py-2 whitespace-nowrap border border-black dark:border-white rounded-full text-sm hover:bg-black hover:text-cream dark:hover:bg-white dark:hover:text-cream-dark transition-colors"
              >
                Get in touch
              </a>
              <a 
                href="/plasticoptics"
                className="inline-flex items-center gap-2 px-5 py-2 whitespace-nowrap text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                What I'm building <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Social */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="https://github.com/t-srinikitha" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity">
                <Github className="h-4 w-4" fill="currentColor" />
              </a>
              <a href="https://x.com/sri_nikitha" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity">
                <Twitter className="h-4 w-4" fill="currentColor" />
              </a>
              <a href="https://linkedin.com/in/sri-nikitha-thummanapalli/" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity">
                <Linkedin className="h-4 w-4" fill="currentColor" />
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="lg:col-span-1">
            <div className="aspect-square max-w-[240px] mx-auto lg:mx-0 overflow-hidden border border-black dark:border-white">
              <img
                src="/Profile.jpeg"
                alt="Sri Nikitha T"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Building */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold mb-8">What I'm Building</h2>
        <p className="text-lg mb-8 max-w-2xl">A test cartridge and benchtop analyser that count microplastics in drinking water.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {building.map((x) => (
            <div key={x.title} className="p-6 border border-black/20 dark:border-white/20">
              <h3 className="font-medium mb-2">{x.title}</h3>
              <p className="text-sm opacity-70">{x.text}</p>
            </div>
          ))}
        </div>
        <a
          href="/plasticoptics"
          className="mt-8 inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
        >
          Read more about PlasticOptics <ArrowRight className="h-4 w-4" />
        </a>
      </section>

      <Divider />

      {/* Story */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold mb-8">My Story</h2>
        <div className="max-w-2xl space-y-4 text-sm leading-relaxed opacity-80">
          <p>
            When I was 15, my father told me the story of Sintex: a pipe manufacturer pivoted to
            making overhead tanks because of an idea from an IITian.
          </p>
          <p>My father said I should become that IITian. So I did.</p>
          <p>
            But at IIT, I realized most problems aren't solved with just better engineering. They
            need better understanding. So I went to Ashoka University to learn how to think in
            systems, not just solutions.
          </p>
          <p>
            In 2021, in Prof. Manu Prakash's Frugal Science course at Stanford, our team tried to
            build a Raman spectrometer out of origami to detect microplastics. Raman turned out to
            be a poor tool for counting particles. The problem stayed with me.
          </p>
          <p>
            Different industries, same approach: understand the system, then build. This time the
            system is water.
          </p>
        </div>
      </section>

      <Divider />

      {/* Journey */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold mb-8">My Journey</h2>
        <div className="space-y-8">
          {milestones.map((m) => (
            <div key={m.label} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <p className="md:col-span-1 text-xs opacity-50">{m.label}</p>
              <div className="md:col-span-3">
                <h3 className="font-medium mb-2">{m.title}</h3>
                <p className="text-sm opacity-70 mb-3">{m.text}</p>
                <div className="flex flex-wrap gap-2">
                  {m.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 border border-black/20 dark:border-white/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <dl className="mt-12 pt-8 border-t border-black/10 dark:border-white/10 space-y-3">
          {alsoDid.map((x) => (
            <div key={x.label} className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-1">
              <dt className="md:col-span-1 text-xs opacity-60">{x.label}</dt>
              <dd className="md:col-span-3 text-sm opacity-70">{x.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Divider />

      {/* Connect */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-medium mb-4">Working on microplastics?</h2>
        <p className="text-sm opacity-70 mb-8 max-w-md mx-auto">
          Connect with me if you are interested in solving the microplastics problem.
        </p>
        <a
          href={MAILTO}
          className="inline-flex items-center gap-2 px-6 py-2.5 border border-black dark:border-white rounded-full text-sm hover:bg-black hover:text-cream dark:hover:bg-white dark:hover:text-cream-dark transition-colors"
        >
          <Mail className="h-4 w-4" />
          Get in touch
        </a>
      </section>

      <Footer />
    </div>
  );
}
