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
}

const timelineEvents: TimelineEvent[] = [
  {
    year: 2017,
    title: "Senior Executive",
    subtitle: "NRB Bearings Limited | Hyderabad",
    description: "The youngest woman to lead operations of a vital chemical process in 54 years history of NRB Bearings. Managed manufacturing operations with a focus on sustainability and efficiency.",
    highlights: [
      "Managed 10-member team in operator-friendly way to successfully execute production plan",
      "Continuously monitored and analysed energy consumption patterns for a three-month period",
      "Implemented measures to reduce utility and increase efficiency of Manganese Phosphating Unit",
      "Studied and examined operations in two manufacturing plants to assess root cause of corrosion"
    ],
    metrics: [
      { value: "90%", label: "Export Loss Reduction" },
      { value: "10", label: "Team Members Managed" }
    ]
  },
  {
    year: 2018,
    title: "Professional Fellow",
    subtitle: "Pollinate Group | Hyderabad",
    description: "Assessed poverty levels in informal settlements through Global Scan and Poverty Probability Index (PPI) surveys, focusing on sustainable solutions for energy and health.",
    highlights: [
      "Led a diverse team of 5 in mapping and visiting 12 slums for carrying out assessment surveys",
      "Constituted survey questions using human-centric design that deeply involved 24 respondents",
      "Collected qualitative and quantitative data on education, health and energy requirements",
      "Recommended 'Solar Electric Mosquito bat' to reduce health risks sustainably"
    ],
    metrics: [
      { value: "12", label: "Slums Surveyed" },
      { value: "24", label: "Respondents Engaged" },
      { value: "5", label: "Team Members Led" }
    ]
  },
  {
    year: 2019,
    title: "Innovation Fellow",
    subtitle: "TSIC | Govt. of Telangana",
    description: "Structured and initiated programs for inspiring and encouraging innovators and entrepreneurs from rural areas. Began the journey of bridging formal and informal innovation ecosystems.",
    highlights: [
      "Conceptualised and executed 100 days 100 innovations program",
      "Designed and implemented Activation Workshops to sensitize students of rural problems",
      "Strategized, budgeted and administered Startup India Telangana Yatra across 14 districts",
      "Collaborated with Palle Srujana at National Innovation Foundation (NIF)"
    ],
    links: [
      { label: "Ideation 1", url: "https://www.notion.so/Ideation-1-cb0d5d188b344d7f860bb2ccbed0a9e2?pvs=21" },
      { label: "Ideation 2", url: "https://www.notion.so/Ideation-2-9e2e49a9323b451cad3df52088a10364?pvs=21" },
      { label: "Structure", url: "https://www.notion.so/Structure-7633dc8b5c7d488da6463ca8e1394b1d?pvs=21" }
    ]
  },
  {
    year: 2020,
    title: "Scaling Impact",
    subtitle: "TSIC | Govt. of Telangana",
    description: "Expanded programs across all 33 districts of Telangana, building partnerships and enabling technology transfers for grassroots innovators.",
    highlights: [
      "Built partnerships with 12 district administrators, 19 state and national incubators, 40 colleges and 25 successful entrepreneurs",
      "Co-ordinated with Office of Principal Scientific Advisor and Ministry of Commerce",
      "Assisted 70+ innovators to sign MoUs for technology transfer with large corporates",
      "Mobilised 5,000+ students and discovered 200+ entrepreneurs across 33 districts"
    ],
    metrics: [
      { value: "5,000+", label: "Students Mobilised" },
      { value: "200+", label: "Entrepreneurs Discovered" },
      { value: "33", label: "Districts Covered" },
      { value: "70+", label: "Innovators with MoUs" }
    ]
  },
  {
    year: 2021,
    title: "Research & Innovation",
    subtitle: "Team FishEye & WedSmart",
    description: "Developed solutions for microplastics detection and sustainable wedding practices, combining research with practical applications.",
    highlights: [
      "Developed a device to detect microplastics in waterbodies as part of Frugal Science course by Prof. Manu Prakash",
      "Started ideating on sustainable wedding solutions to change the paradigm of Indian weddings",
      "Mentored and facilitated funds for 20 promising grassroots start-ups on agriculture and water",
      "Enabled funding of ₹1.3 Cr to commercialise rural innovations in India, Kenya and other countries"
    ],
    links: [
      { label: "Team FishEye Project", url: "https://www.notion.so/Team-FishEye-a2dc826721a14dd88e1217f9154f4444?pvs=21" },
      { label: "WedSmart", url: "https://wedsmart.super.site" },
      { label: "Frugal Science", url: "https://www.frugalscience.org/" }
    ],
    metrics: [
      { value: "20", label: "Start-ups Mentored" },
      { value: "₹1.3 Cr", label: "Funding Enabled" }
    ]
  }
];

function TimelineItem({ event, isVisible }: { event: TimelineEvent; isVisible: boolean }) {
  return (
    <div className={`relative transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Mobile Layout */}
      <div className="md:hidden pb-12">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
            </div>
          </div>
          <div className="flex-1">
            <div className="text-3xl font-bold text-primary mb-1">{event.year}</div>
            <h3 className="text-2xl font-bold mb-1 text-white">{event.title}</h3>
            {event.subtitle && (
              <p className="text-gray-400 text-sm mb-3">{event.subtitle}</p>
            )}
          </div>
        </div>
        <div className="ml-6 pl-6 border-l-2 border-primary/30">
          <Card className="bg-white/5 border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            <CardContent className="p-6">
              <p className="text-gray-300 leading-relaxed mb-4">
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
      <div className="hidden md:flex gap-8 lg:gap-12 pb-20">
        {/* Year Label */}
        <div className="flex-shrink-0 w-28 lg:w-36">
          <div className="sticky top-1/2 -translate-y-1/2 h-fit">
            <div className="text-5xl lg:text-6xl font-bold text-primary mb-3">{event.year}</div>
            <div className="h-1 w-20 bg-primary"></div>
          </div>
        </div>

        {/* Timeline Line & Dot */}
        <div className="flex-shrink-0 relative">
          <div className="w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-primary/20"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-black shadow-lg"></div>
        </div>

        {/* Content Card */}
        <div className="flex-1">
          <Card className="bg-white/5 border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-2 text-white">{event.title}</h3>
                  {event.subtitle && (
                    <p className="text-gray-400 text-lg mb-4">{event.subtitle}</p>
                  )}
                </div>
                {event.badge && (
                  <Badge variant="secondary">{event.badge}</Badge>
                )}
              </div>

              <p className="text-gray-300 leading-relaxed mb-6 text-lg">
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
                      <div className="text-4xl font-bold text-primary mb-2">{metric.value}</div>
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
  );
}

export default function ClimatePage() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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
          threshold: 0.2,
          rootMargin: "0px 0px -100px 0px"
        }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

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
            {timelineEvents.map((event, index) => (
              <div
                key={event.year}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
              >
                <TimelineItem 
                  event={event} 
                  isVisible={visibleItems.has(index)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Closing Statement */}
        <div className="mt-20 text-center">
          <Card className="bg-primary/10 border-primary/20 backdrop-blur-sm inline-block">
            <CardContent className="p-8">
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
                I worked with 100s of frugal innovators across the country. I was moved by their sheer passion for innovation and solving local problems. I wanted to do something for them. So, I started observing the frugal innovation ecosystem and ideated on a couple of problems. In the end, I built a business model to bridge a gap between formal and informal innovation ecosystems.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
