import { ExternalLink, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const ships = [
  {
    year: "2024",
    items: [
      {
        name: "Mantis IaC MVP",
        impact: "Open-source launch",
        link: "https://github.com/mantishq/mantis",
        date: "Dec 2024"
      },
      {
        name: "DrDroid Integration",
        impact: "K8s debugging platform",
        link: "https://drdroid.io",
        date: "Oct 2024"
      },
      {
        name: "v0 + AI Website",
        impact: "AI-powered web builder",
        link: "https://v0.dev",
        date: "Aug 2024"
      }
    ]
  },
  {
    year: "2023", 
    items: [
      {
        name: "Facets Public API",
        impact: "$410K ARR",
        link: "https://facets.cloud/api",
        date: "Nov 2023"
      },
      {
        name: "Developer Portal",
        impact: "50% faster onboarding",
        link: "https://facets.cloud/developers",
        date: "Sep 2023"
      },
      {
        name: "RBAC System",
        impact: "Enterprise security",
        date: "Jun 2023"
      }
    ]
  },
  {
    year: "2022",
    items: [
      {
        name: "K8s Platform (0→1)",
        impact: "Infrastructure foundation",
        date: "Dec 2022"
      },
      {
        name: "Headless CMS",
        impact: "$60K revenue",
        date: "Jul 2022"
      }
    ]
  }
]

export default function ShipsPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Ships
          </h1>
          <p className="text-xl text-muted-foreground">
            Things I've built and launched over the years
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-12">
          {ships.map((yearGroup, yearIndex) => (
            <div key={yearGroup.year} className="relative">
              {/* Year Header */}
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full font-bold text-lg">
                  {yearGroup.year.slice(-2)}
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-foreground">
                    {yearGroup.year}
                  </h2>
                </div>
                
                {/* Connecting line to next year */}
                {yearIndex < ships.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-12 bg-border" />
                )}
              </div>

              {/* Items */}
              <div className="ml-16 space-y-4">
                {yearGroup.items.map((item, itemIndex) => (
                  <Card
                    key={`${yearGroup.year}-${itemIndex}`}
                    className="transition-all duration-200 hover:shadow-hover group"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                              {item.name}
                            </h3>
                            {item.link && (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                          
                          <p className="text-muted-foreground mb-3">
                            {item.impact}
                          </p>
                          
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{item.date}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            This list includes major launches and milestones. Lots of smaller experiments and learnings in between.
          </p>
        </div>
      </div>
    </div>
  )
}