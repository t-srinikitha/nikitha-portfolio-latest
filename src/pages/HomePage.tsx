import { useState, useEffect } from "react"
import { ProjectCard } from "@/components/project-card"
import { Card, CardContent } from "@/components/ui/card"

const taglines = [
  "developer tools",
  "infrastructure", 
  "AI systems"
]

const currentProjects = [
  {
    name: "AI Debugging Assistant",
    description: "K8s root cause analysis tool",
    progress: 70,
    status: "active" as const,
    techStack: ["Python", "Kubernetes", "OpenAI"],
    slug: "ai-debugging-assistant",
    lastUpdated: "2 days ago"
  },
  {
    name: "Mantis IaC",
    description: "Open-source Terraform alternative", 
    progress: 30,
    status: "active" as const,
    techStack: ["Go", "Infrastructure as Code"],
    slug: "mantis-iac", 
    lastUpdated: "1 week ago"
  }
]

export default function HomePage() {
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Building{" "}
              <span className="text-primary transition-all duration-500 ease-in-out">
                {taglines[currentTaglineIndex]}
              </span>
              <br />
              from first principles
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              AI PM Consultant at{" "}
              <span className="text-foreground font-medium">Mantis</span>
              {" & "}
              <span className="text-foreground font-medium">DrDroid</span>
              , specializing in developer experience and infrastructure tooling.
            </p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-gentle"></div>
                <span>Available for consulting</span>
              </div>
              <span>•</span>
              <span>Based in Bangalore, India</span>
            </div>
          </div>
        </div>
      </section>

      {/* Current Projects Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Current Projects
            </h2>
            <p className="text-muted-foreground">
              What I'm building right now
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProjects.map((project) => (
              <ProjectCard key={project.name} {...project} />
            ))}
            <ProjectCard
              name=""
              description=""
              progress={0}
              status="planning"
              isComingSoon={true}
            />
          </div>
        </div>
      </section>

      {/* Writing Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Writing
            </h2>
            
            <Card className="border-dashed border-2 border-muted">
              <CardContent className="py-12 text-center">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  Thoughts coming soon
                </h3>
                <p className="text-muted-foreground">
                  Building first. Writing about it later.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}