import { ExternalLink } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { useTitle } from "@/lib/site";

interface TimelineEvent {
  year: number;
  title: string;
  subtitle?: string;
  description: string;
  highlights?: string[];
  links?: { label: string; url: string }[];
  badge?: string;
  metrics?: { value: string; label: string }[];
  period?: string;
}

// Group events by year - each year can have multiple separate projects
const timelineEventsByYear: Record<number, TimelineEvent[]> = {
  2017: [
    {
      year: 2017,
      title: "Senior Executive",
      subtitle: "Center for Process Innovation and Sustainable Development | NRB Bearings Limited | Hyderabad",
      description: "The youngest woman to lead operations of a vital chemical process in 54 years history of NRB Bearings. Led comprehensive process review across all manufacturing plants to identify root causes of wastage and quality issues, implementing innovative solutions for sustainable operations.",
      highlights: [
        "Reviewed entire processes across all manufacturing plants to identify root causes of wastage and quality issues",
        "Developed and implemented measures to reduce wastage and improve process efficiency",
        "Identified processes requiring innovation to utilize waste to power other processes",
        "Managed vital processes for export operations with focus on sustainability and efficiency",
        "Managed 10-member team in operator-friendly way to successfully execute production plan"
      ],
      metrics: [
        { value: "90%", label: "Wastage Reduction" },
        { value: "10", label: "Team Members Managed" }
      ]
    }
  ],
  2018: [
    {
      year: 2018,
      title: "Water Treatment & Restoration",
      subtitle: "Ecosattva",
      period: "March - May 2018",
      description: "Worked on nala restoration and industrial waste water treatment plants, focusing on building sustainable water treatment infrastructure and improving bio-mechanical plant efficiency through innovative ecological solutions.",
      highlights: [
        "Worked on nala restoration projects to improve water quality and ecosystem health",
        "Designed and implemented industrial waste water treatment plant solutions",
        "Built and established laboratory facilities to measure and monitor treatment quality",
        "Devised innovative methods to increase bio-mechanical plant efficiency by planting trees from rivers like Kam",
        "Developed systems for continuous monitoring and quality assessment of water treatment processes"
      ],
      metrics: [
        { value: "100%", label: "Lab Established" }
      ]
    },
    {
      year: 2018,
      title: "Innovation Fellow",
      subtitle: "TSIC | Govt. of Telangana",
      period: "May 2018 - May 2019",
      description: "Structured and initiated programs for inspiring and encouraging innovators and entrepreneurs from rural areas. Led comprehensive programs across Telangana to bridge formal and informal innovation ecosystems, building partnerships and enabling technology transfers.",
      highlights: [
        "Conceptualised and executed 100 days 100 innovations program to celebrate the real stories of grassroots innovators by associating with three most influential print media and TV networks",
        "Designed and implemented Activation Workshops to sensitize students of rural problems",
        "Strategized, budgeted and administered Startup India Telangana Yatra to conduct awareness camps and bootcamps to inspire youth and discover talent in the 14 districts of the state",
        "Collaborated with Palle Srujana at National Innovation Foundation (NIF) in conducting state-wide innovation exhibitions that witnessed 10,000+ enthusiasts and farmers in rural districts",
        "Partnered with Communications Department in disseminating rural knowledge in 33 districts",
        "Co-ordinated with the Office of Principal Scientific Advisor and Ministry of Commerce in assisting 70+ innovators to sign MoUs for the technology transfer with large corporates",
        "Built partnerships with 12 district administrators, 19 state and national incubators, 40 colleges and 25 successful entrepreneurs and other NGOs to nurture innovation at the ground-level"
      ],
      links: [
        { label: "Fellowship Programme Announcement", url: "https://www.thehindu.com/news/cities/Hyderabad/fellowship-programme-for-innovators-takes-off/article23867612.ece" }
      ],
      metrics: [
        { value: "5,000+", label: "Students Mobilised" },
        { value: "200+", label: "Entrepreneurs Discovered" },
        { value: "33", label: "Districts Covered" },
        { value: "70+", label: "Innovators with MoUs" },
        { value: "20", label: "Start-ups Mentored" },
        { value: "₹1.3 Cr", label: "Funding Enabled" }
      ]
    }
  ],
  2019: [
    {
      year: 2019,
      title: "Frugal Innovation Platform",
      subtitle: "Independent Project",
      period: "May - August 2019",
      description: "Worked on developing a frugal innovation platform concept to bridge the gap between formal and informal innovation ecosystems. Explored feasibility and business models but discontinued due to feasibility challenges.",
      highlights: [
        "Explored business models to bridge formal and informal innovation ecosystems",
        "Conducted feasibility studies and market research",
        "Discontinued project after thorough evaluation of challenges"
      ],
      links: [
        { label: "Ideation 1", url: "https://www.notion.so/Ideation-1-cb0d5d188b344d7f860bb2ccbed0a9e2?pvs=21" },
        { label: "Ideation 2", url: "https://www.notion.so/Ideation-2-9e2e49a9323b451cad3df52088a10364?pvs=21" },
        { label: "Structure", url: "https://www.notion.so/Structure-7633dc8b5c7d488da6463ca8e1394b1d?pvs=21" }
      ]
    },
    {
      year: 2019,
      title: "Professional Fellow",
      subtitle: "Pollinate Group | Hyderabad",
      period: "October - November 2019",
      description: "Assessed poverty levels in informal settlements through Global Scan and Poverty Probability Index (PPI) surveys. Led comprehensive data collection and analysis to understand the needs of underserved communities and recommend sustainable solutions.",
      highlights: [
        "Led a diverse team of 5 in mapping and visiting 12 slums for carrying out assessment surveys",
        "Devised survey questions using human-centric design that deeply involved 24 respondents",
        "Collected qualitative and quantitative data on education, health and energy requirements",
        "Analysed the data and made poverty comparisons of Hyderabad, Bangalore and Chitvan, Nepal",
        "Recommended innovative products to reduce health risks sustainably, including 'Solar Electric Mosquito bat'",
        "Suggested ways to compile better quality data for future assessments",
        "Identified that Hyderabad slums have an average of 28.7% likelihood below BPL (Below Poverty Line)"
      ],
      metrics: [
        { value: "12", label: "Slums Surveyed" },
        { value: "24", label: "Respondents Engaged" },
        { value: "5", label: "Team Members Led" },
        { value: "28.7%", label: "BPL Likelihood (Hyderabad)" }
      ]
    },
    {
      year: 2019,
      title: "Masters Applications",
      subtitle: "Graduate School Applications",
      period: "December 2019",
      description: "Applied for Masters programs in sustainability and innovation, receiving admission offers from top schools for sustainability studies: SEAS (School for Environment and Sustainability) at University of Michigan and Bren School at UC Santa Barbara.",
      highlights: [
        "Received admission offer from SEAS (School for Environment and Sustainability) at University of Michigan - one of the top schools for sustainability studies",
        "Received admission offer from Bren School at UC Santa Barbara - one of the top schools for sustainability studies"
      ],
      metrics: [
        { value: "2", label: "Masters Admits" },
        { value: "SEAS", label: "UMich" },
        { value: "Bren", label: "UCSB" }
      ]
    }
  ],
  2020: [
    {
      year: 2020,
      title: "Sustainable Housing with FRP",
      subtitle: "5Elements SDG",
      period: "2020 - 2021",
      description: "Led comprehensive market research and analysis of the FRP (Fiber-Reinforced Plastic) market for sustainable housing. Delivered a $300K project in 3 months, facilitating collaboration between a company from Vadodara and a French startup to develop a machine enabling rapid construction of G+1 structures in 48 hours.",
      highlights: [
        "Conducted extensive market research and analysis of the FRP market for sustainable housing applications",
        "Facilitated collaboration between a Vadodara-based company and a French startup",
        "Delivered $300K project within 3 months",
        "Designed and delivered a machine that enables rapid construction of G+1 structures in 48 hours",
        "Established 11 strategic partnerships for sustainable housing project"
      ],
      metrics: [
        { value: "3 months", label: "Project Delivery" },
        { value: "$300K", label: "Project Value" },
        { value: "48hrs", label: "G+1 Construction Time" },
        { value: "11", label: "Partnerships Established" }
      ]
    }
  ],
  2021: [
    {
      year: 2021,
      title: "Microplastics Research",
      subtitle: "Team FishEye | Frugal Science Course, Stanford University",
      description: "Tried to build a Raman spectrometer to detect microplastics in waterbodies as part of the Frugal Science course by Prof. Manu Prakash at Stanford University, addressing critical environmental health concerns.",
      highlights: [
        "Tried to build a Raman spectrometer to detect microplastics in waterbodies as part of Frugal Science course by Prof. Manu Prakash",
        "Addressed critical environmental health concerns related to microplastics contamination",
        "Worked on innovative, low-cost solutions for environmental monitoring",
        "Focused on detecting microplastics that affect zooplanktons responsible for 90% of the oxygen we breathe"
      ],
      links: [
        { label: "Team FishEye Project", url: "https://www.notion.so/Team-FishEye-a2dc826721a14dd88e1217f9154f4444?pvs=21" },
        { label: "Frugal Science", url: "https://www.frugalscience.org/" }
      ]
    },
    {
      year: 2021,
      title: "WedSmart",
      subtitle: "Sustainable Wedding Solutions",
      description: "Launched WedSmart, a platform to transform Indian weddings into sustainable and green affairs. Built a calculator for calculating emissions from weddings in India, helping couples make environmentally conscious decisions.",
      highlights: [
        "Started ideating on sustainable wedding solutions to change the paradigm of Indian weddings",
        "Built a platform to help couples make environmentally conscious decisions for their weddings",
        "Created calculator for calculating emissions from weddings in India",
        "Focused on transforming wedding celebrations into sustainable affairs"
      ],
      links: [
        { label: "WedSmart", url: "https://wedsmart.super.site" }
      ]
    }
  ]
};

const years = Object.keys(timelineEventsByYear)
  .map(Number)
  .sort((a, b) => a - b);

function Event({ event }: { event: TimelineEvent }) {
  return (
    <div className="p-6 border border-black/20 dark:border-white/20">
      <h3 className="font-medium mb-1">{event.title}</h3>
      {event.subtitle && <p className="text-xs opacity-60">{event.subtitle}</p>}
      {event.period && <p className="text-xs opacity-60 mt-1">{event.period}</p>}
      <p className="text-sm opacity-70 mt-4">{event.description}</p>

      {event.highlights && event.highlights.length > 0 && (
        <ul className="mt-4 space-y-2 list-disc pl-5 text-sm opacity-70">
          {event.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}

      {event.metrics && event.metrics.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {event.metrics.map((m) => (
            <span key={m.label} className="text-xs px-2 py-1 border border-black/20 dark:border-white/20">
              <span className="font-bold">{m.value}</span> {m.label}
            </span>
          ))}
        </div>
      )}

      {event.links && event.links.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {event.links.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm underline underline-offset-4 opacity-70 hover:opacity-100 transition-opacity"
            >
              {l.label} <ExternalLink className="h-3 w-3" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ClimatePage() {
  useTitle("Climate & Sustainability Journey | Sri Nikitha T");

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-2">Climate & Sustainability Journey</h1>
        <p className="text-sm opacity-60 mb-12">
          A timeline of my work in sustainability, climate innovation, and environmental impact from 2017-2021
        </p>

        <div className="space-y-12">
          {years.map((year) => (
            <section key={year} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <h2 className="md:col-span-1 md:sticky md:top-20 text-2xl font-bold">{year}</h2>
              <div className="md:col-span-3 space-y-4">
                {timelineEventsByYear[year].map((event) => (
                  <Event key={event.title} event={event} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-16 pt-12 border-t border-black/10 dark:border-white/10 text-sm leading-relaxed opacity-80">
          Early in my career, I immersed myself in innovation and sustainability across diverse industries, from manufacturing and process innovation to grassroots innovation, water treatment, and sustainable housing solutions. This journey has given me a deep, multifaceted understanding of systems and how to drive meaningful impact. Across each role, I've focused on creating systematic change that extends beyond individual projects. Today, that same passion for sustainable impact continues to drive me forward as I engage with teams and explore new opportunities to make a difference.
        </p>
      </div>

      <Footer />
    </div>
  );
}
