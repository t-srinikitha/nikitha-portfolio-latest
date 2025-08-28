import { Calendar, Wrench, BookOpen, Brain } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const nowSections = [
  {
    icon: Wrench,
    title: "Building",
    items: [
      "AI Debugging Assistant for K8s (70% complete)",
      "Mantis IaC MVP and community (30% complete)", 
      "DrDroid integration for better debugging workflows"
    ]
  },
  {
    icon: BookOpen,
    title: "Learning",
    items: [
      "AI agents and multi-step reasoning systems",
      "n8n workflows for automation",
      "v0.dev for rapid prototyping",
      "Advanced Kubernetes patterns"
    ]
  },
  {
    icon: BookOpen,
    title: "Reading",
    items: [
      "\"The Staff Engineer's Path\" by Tanya Reilly",
      "\"Accelerate\" by Nicole Forsgren, Jez Humble",
      "Various technical blogs and research papers on AI infrastructure"
    ]
  },
  {
    icon: Brain,
    title: "Thinking About",
    items: [
      "How can we make debugging distributed systems as easy as debugging local code?",
      "What would infrastructure-as-code look like if we started from scratch today?",
      "How do we balance developer velocity with system reliability in AI-powered tools?"
    ]
  }
]

export default function NowPage() {
  const lastUpdated = "December 15, 2024"

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Now
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            What I'm focused on right now
          </p>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-12">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-gentle"></div>
              <Badge variant="outline" className="text-green-700 border-green-300">
                Available for consulting
              </Badge>
            </div>
            <span className="text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">
              Particularly interested in developer tools and AI infrastructure projects
            </span>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {nowSections.map((section) => {
            const Icon = section.icon
            return (
              <Card key={section.title} className="h-fit">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <Icon className="h-5 w-5 text-primary" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Contact Section */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Interested in collaborating?
            </h3>
            <p className="text-muted-foreground mb-4">
              I'm always open to discussing interesting projects, especially around developer tools, infrastructure, and AI.
            </p>
            <a
              href="mailto:nikitha@example.com"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Let's chat →
            </a>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-muted-foreground">
            Inspired by Derek Sivers' <a href="https://sivers.org/now" className="text-primary hover:underline">now page movement</a>
          </p>
        </div>
      </div>
    </div>
  )
}