import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Calendar, ExternalLink, Play } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnimatedProgress } from "@/components/ui/progress-animated"

// Mock project data
const projects: Record<string, any> = {
  "ai-debugging-assistant": {
    title: "AI Debugging Assistant",
    tagline: "K8s root cause analysis tool that actually understands your stack",
    progress: 70,
    lastUpdated: "December 15, 2024",
    status: "active",
    techStack: ["Python", "Kubernetes", "OpenAI", "FastAPI", "Redis"],
    demoUrl: "https://debug.drdroid.io",
    waitlistUrl: "https://forms.gle/waitlist",
    problem: [
      "Debugging distributed systems is still mostly manual detective work",
      "Engineers spend 60% of their time figuring out what went wrong, not fixing it",
      "Kubernetes logs are scattered across dozens of services and pods",
      "Root cause analysis takes hours even for experienced teams"
    ],
    approach: [
      "AI agent that understands your K8s cluster topology and service dependencies",
      "Correlates logs, metrics, and events across all related components",
      "Provides natural language explanations of what likely went wrong",
      "Suggests specific remediation steps based on similar past incidents"
    ],
    progress_items: [
      { item: "K8s cluster integration", completed: true },
      { item: "Log aggregation pipeline", completed: true },
      { item: "AI reasoning engine", completed: true },
      { item: "Web dashboard", completed: false },
      { item: "Slack/Teams integration", completed: false },
      { item: "Historical analysis", completed: false }
    ]
  },
  "mantis-iac": {
    title: "Mantis IaC",
    tagline: "Infrastructure as Code that feels like writing documentation",
    progress: 30,
    lastUpdated: "December 12, 2024", 
    status: "active",
    techStack: ["Go", "YAML", "Terraform", "Kubernetes", "Docker"],
    githubUrl: "https://github.com/mantishq/mantis",
    waitlistUrl: "https://mantis.dev/waitlist",
    problem: [
      "Terraform is powerful but has a steep learning curve",
      "YAML hell is real - complex infrastructure needs hundreds of lines",
      "State management is fragile and scary",
      "Team collaboration on infrastructure changes is painful"
    ],
    approach: [
      "Human-readable configuration that compiles to industry standards",
      "Built-in best practices and security guardrails",
      "Distributed state management that just works",
      "Real-time collaboration with conflict resolution",
      "One-click rollbacks with detailed change previews"
    ],
    progress_items: [
      { item: "Core language design", completed: true },
      { item: "Terraform compiler", completed: false },
      { item: "State management system", completed: false },
      { item: "CLI tool", completed: false },
      { item: "Web UI", completed: false },
      { item: "Team collaboration features", completed: false }
    ]
  }
}

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? projects[slug] : null

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Project not found</h1>
          <Link to="/" className="text-primary hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    )
  }

  const completedItems = project.progress_items.filter((item: any) => item.completed).length
  const totalItems = project.progress_items.length

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Back Navigation */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-4xl font-bold text-foreground">
              {project.title}
            </h1>
            <Badge
              variant={project.status === "active" ? "default" : "secondary"}
              className="ml-4"
            >
              {project.status === "active" ? "Active" : "Planning"}
            </Badge>
          </div>
          
          <p className="text-xl text-muted-foreground mb-6">
            {project.tagline}
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Last updated {project.lastUpdated}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {project.demoUrl && (
              <Button asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <Play className="h-4 w-4 mr-2" />
                  View Demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  GitHub
                </a>
              </Button>
            )}
            {project.waitlistUrl && (
              <Button variant="outline" asChild>
                <a href={project.waitlistUrl} target="_blank" rel="noopener noreferrer">
                  Join Waitlist
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* The Problem */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              The Problem
            </h2>
            <Card>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {project.problem.map((point: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* My Approach */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              My Approach
            </h2>
            <Card>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {project.approach.map((point: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Progress */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Progress
            </h2>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Overall Progress</span>
                  <span className="text-2xl font-mono">{project.progress}%</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <AnimatedProgress
                  value={project.progress}
                  className="h-3"
                  delay={500}
                />
                
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">
                    Milestones ({completedItems}/{totalItems} completed)
                  </h4>
                  <div className="space-y-2">
                    {project.progress_items.map((item: any, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            item.completed
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted border-2 border-muted-foreground"
                          }`}
                        >
                          {item.completed && (
                            <div className="w-1 h-1 bg-current rounded-full" />
                          )}
                        </div>
                        <span
                          className={
                            item.completed
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }
                        >
                          {item.item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Tech Stack */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Tech Stack
            </h2>
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech: string) => (
                    <Badge key={tech} variant="outline" className="text-sm py-1 px-3">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}