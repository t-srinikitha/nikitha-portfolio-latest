import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
      title: "Microplastics Research",
      subtitle: "Team FishEye | Frugal Science Course, Stanford University",
      description: "Developed a device to detect microplastics in waterbodies as part of the Frugal Science course by Prof. Manu Prakash at Stanford University, addressing critical environmental health concerns.",
      highlights: [
        "Developed a device to detect microplastics in waterbodies as part of Frugal Science course by Prof. Manu Prakash",
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

function ProjectCard({ event, isVisible, isFirstInYear, isLastInYear }: { 
  event: TimelineEvent; 
  isVisible: boolean;
  isFirstInYear: boolean;
  isLastInYear: boolean;
}) {
  return (
    <div className={`relative transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'}`}>
      {/* Mobile Layout */}
      <div className="md:hidden pb-8">
        <div className="ml-6 pl-6 border-l-2 border-primary/30">
          <Card className="bg-white/5 border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="mb-3">
                <h3 className="text-2xl font-bold mb-1 text-white">{event.title}</h3>
                {event.subtitle && (
                  <p className="text-gray-400 text-sm mb-1">{event.subtitle}</p>
                )}
                {event.period && (
                  <p className="text-primary text-xs font-medium">{event.period}</p>
                )}
              </div>

              <p className="text-gray-300 leading-relaxed mb-4 text-sm">
                {event.description}
              </p>

              {event.highlights && event.highlights.length > 0 && (
                <div className="mb-4">
                  <ul className="space-y-2">
                    {event.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-gray-300 text-sm leading-relaxed flex items-start gap-2">
                        <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {event.metrics && event.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {event.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center p-3 bg-black/20 rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-1">{metric.value}</div>
                      <div className="text-gray-300 text-xs">{metric.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {event.links && event.links.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {event.links.map((link, idx) => (
                    <Badge key={idx} variant="outline" className="text-gray-300 border-gray-600 hover:border-primary transition-colors text-xs">
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-1"
                      >
                        {link.label} <ExternalLink className="h-3 w-3" />
                      </a>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="flex gap-8 lg:gap-12">
          {/* Spacer for year column */}
          <div className="flex-shrink-0 w-28 lg:w-36"></div>
          
          {/* Timeline connector */}
          <div className="flex-shrink-0 relative">
            <div className={`w-1 ${isLastInYear ? 'h-full' : 'h-24'} bg-gradient-to-b from-primary/50 via-primary/30 to-primary/20`}></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-2 border-black shadow-md"></div>
          </div>

          {/* Content Card */}
          <div className="flex-1 pb-12">
            <Card className="bg-white/5 border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 text-white">{event.title}</h3>
                    {event.subtitle && (
                      <p className="text-gray-400 text-base mb-2">{event.subtitle}</p>
                    )}
                    {event.period && (
                      <p className="text-primary text-sm font-medium mb-4">{event.period}</p>
                    )}
                  </div>
                  {event.badge && (
                    <Badge variant="secondary">{event.badge}</Badge>
                  )}
                </div>

                <p className="text-gray-300 leading-relaxed mb-6">
                  {event.description}
                </p>

                {event.highlights && event.highlights.length > 0 && (
                  <div className="mb-6">
                    <ul className="space-y-3">
                      {event.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-gray-300 leading-relaxed flex items-start gap-3">
                          <span className="text-primary mt-2 flex-shrink-0">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {event.metrics && event.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {event.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center p-4 bg-black/20 rounded-lg">
                        <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                        <div className="text-gray-300 text-sm">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {event.links && event.links.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {event.links.map((link, idx) => (
                      <Badge key={idx} variant="outline" className="text-gray-300 border-gray-600 hover:border-primary transition-colors">
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-1"
                        >
                          {link.label} <ExternalLink className="h-3 w-3" />
                        </a>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function YearSection({ year, events, visibleIndices, startIndex, setRef }: { 
  year: number; 
  events: TimelineEvent[];
  visibleIndices: Set<number>;
  startIndex: number;
  setRef: (index: number, el: HTMLDivElement | null) => void;
}) {
  return (
    <div className="relative">
      {/* Year Header - Mobile */}
      <div className="md:hidden mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
          </div>
          <div className="text-4xl font-bold text-primary">{year}</div>
        </div>
      </div>

      {/* Year Header - Desktop */}
      <div className="hidden md:block mb-8">
        <div className="flex gap-8 lg:gap-12">
          <div className="flex-shrink-0 w-28 lg:w-36">
            <div className="sticky top-1/2 -translate-y-1/2 h-fit">
              <div className="text-5xl lg:text-6xl font-bold text-primary mb-3">{year}</div>
              <div className="h-1 w-20 bg-primary"></div>
            </div>
          </div>
          <div className="flex-shrink-0 w-1"></div>
          <div className="flex-1"></div>
        </div>
      </div>

      {/* Projects for this year */}
      <div className="space-y-0">
        {events.map((event, eventIndex) => {
          const globalIndex = startIndex + eventIndex;
          const isFirstInYear = eventIndex === 0;
          const isLastInYear = eventIndex === events.length - 1;
          
          return (
            <div
              key={`${year}-${eventIndex}`}
              ref={(el) => {
                setRef(globalIndex, el);
              }}
            >
              <ProjectCard 
                event={event} 
                isVisible={true}
                isFirstInYear={isFirstInYear}
                isLastInYear={isLastInYear}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ClimatePage() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const years = Object.keys(timelineEventsByYear)
    .map(Number)
    .sort((a, b) => a - b);

  // Calculate total number of events
  const totalEvents = years.reduce((sum, year) => sum + timelineEventsByYear[year].length, 0);
  
  // Initialize refs array
  useEffect(() => {
    itemRefs.current = new Array(totalEvents).fill(null);
  }, [totalEvents]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set([...prev, index]));
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px"
        }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [totalEvents]);

  let globalIndex = 0;
  
  const setRef = (index: number, el: HTMLDivElement | null) => {
    itemRefs.current[index] = el;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="gap-2 text-white hover:text-primary">
            <a href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </a>
          </Button>
        </div>

        {/* Page Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            Climate & Sustainability Journey
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            A timeline of my work in sustainability, climate innovation, and environmental impact from 2017-2021
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Mobile: Vertical line on the left */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>
          
          {/* Desktop: Vertical line */}
          <div className="hidden md:block absolute left-[120px] lg:left-[144px] top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/30 to-transparent"></div>

          <div className="space-y-0">
            {years.map((year) => {
              const events = timelineEventsByYear[year];
              const startIndex = globalIndex;
              globalIndex += events.length;
              
              return (
                <YearSection
                  key={year}
                  year={year}
                  events={events}
                  visibleIndices={visibleItems}
                  startIndex={startIndex}
                  setRef={setRef}
                />
              );
            })}
          </div>
        </div>

        {/* Background Statement */}
        <div className="mt-20 text-center">
          <Card className="bg-primary/10 border-primary/20 backdrop-blur-sm inline-block">
            <CardContent className="p-8">
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
                Early in my career, I immersed myself in innovation and sustainability across diverse industries—from manufacturing and process innovation to grassroots innovation, water treatment, and sustainable housing solutions. This journey has given me a deep, multifaceted understanding of systems and how to drive meaningful impact. Across each role, I've focused on creating systematic change that extends beyond individual projects. Today, that same passion for sustainable impact continues to drive me forward as I engage with teams and explore new opportunities to make a difference.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
