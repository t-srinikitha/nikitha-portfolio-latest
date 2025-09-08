import { Link } from "react-router-dom"
import { ProjectCard } from "@/components/project-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/layout/section"
import { MapPin } from "lucide-react"

const projects = [
  {
    name: "Wedsmart",
    description: "An Indian wedding emissions calculator to estimate and reduce CO₂ footprint.",
    progress: 100,
    status: "completed" as const,
    techStack: ["React", "Node", "Postgres"],
    slug: "wedsmart",
    lastUpdated: "recently"
  },
  {
    name: "Tailor CRM",
    description: "Order taking and tracking tool for boutique tailors to run on time.",
    progress: 75,
    status: "active" as const,
    techStack: ["Next.js", "Prisma", "SQLite"],
    slug: "tailor-crm",
    lastUpdated: "this month"
  },
  {
    name: "Weekly Meal Planner",
    description: "Creates weekly family meal plans from your preferences—with auto grocery lists.",
    progress: 60,
    status: "active" as const,
    techStack: ["TypeScript", "Supabase", "Tailwind"],
    slug: "weekly-meal-planner",
    lastUpdated: "this week"
  }
]

export default function HomePage() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Section className="pt-24 lg:pt-32 bg-hero">
        <div className="grid gap-10 lg:gap-14 lg:grid-cols-12 items-center">
          <div className="max-w-3xl lg:col-span-7">
              <p className="text-sm text-muted-foreground mb-3">{greeting}</p>
              <h1 className="text-5xl lg:text-7xl font-light tracking-tight text-foreground mb-6 leading-tight">
                I'm Sri Nikitha, <span className="font-serif italic">AI Product Manager</span>
                <br />
                based out of Bangalore
              </h1>
              
              <div className="mt-4">
                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  I build developer tools and AI systems that remove friction from real workflows.
                  Trained at IIT Kharagpur and Ashoka University; 3+ years shipping devtools end‑to‑end.
                </p>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <Button asChild>
                  <a href="mailto:t.srinikitha@gmail.com">Contact me</a>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-muted-foreground">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-gentle" />
                  Available for consulting
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  Based in Bangalore, India
                </span>
              </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative w-full max-w-sm mx-auto">
              <img
                src="/profile.jpg"
                alt="Portrait of Sri Nikitha T"
                className="w-full aspect-square object-cover rounded-xl shadow-lg border"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement
                  if (target.src.includes("profile.jpg")) {
                    target.src = "/placeholder.svg"
                  }
                }}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Standout Section */}
      <Section title="What guides my work" subtitle="A systems lens with end‑to‑end ownership">
        <div className="max-w-3xl space-y-4 text-muted-foreground">
          <p>
            I look at products as systems—people, incentives, and constraints. I try to find the smallest
            change that eases a real user pain and compounds over time. I’m comfortable working across
            product, design, and engineering (including prompts and agents) so teams can ship with clarity.
          </p>
          <p>
            A personal note: when I was 15, a story about Sintex’s overhead tank showed me how a clear product
            bet can move an entire company. That idea pushed me to IIT Kharagpur and Ashoka, and later into
            building developer tools and AI products.
          </p>
        </div>
      </Section>

      {/* Philosophy Section */}
      <Section title="Thinking & Philosophy">
        <div className="max-w-3xl space-y-5">
            <p className="text-muted-foreground text-lg">
              I practice first principles thinking: breaking problems down to their fundamentals,
              challenging assumptions, and rebuilding solutions from the ground up. This helps me
              ship simpler systems that scale.
            </p>
            <p className="text-muted-foreground text-lg">
              I am obsessive about users and their pain points. Every roadmap, spec, and metric ties
              back to real workflows, friction, and outcomes. Products win when users feel understood.
            </p>
        </div>
      </Section>

      {/* Process Section */}
      <Section title="My approach" subtitle="From problem to shipped product">
        <div className="grid md:grid-cols-3 gap-6 text-muted-foreground">
          <div>
            <h3 className="font-semibold text-foreground mb-2">Frame</h3>
            <p>Clarify the problem, the users it affects, the constraints, and what success looks like.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Model</h3>
            <p>Map workflows and incentives; choose the smallest intervention that meaningfully helps.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Build & Iterate</h3>
            <p>Ship a minimal version, instrument it, talk to users often, and refine quickly.</p>
          </div>
        </div>
      </Section>

      {/* Current Projects Section */}
      <Section title="Projects" subtitle="Gallery of selected work" className="bg-muted/30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
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
      </Section>

      {/* Writing Section */}
      <Section title="Writing">
        <div className="max-w-2xl">
          <Card className="border-dashed border-2 border-muted">
            <CardContent className="py-10 px-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Read my blogs
                  <span className="sr-only"> — essays on systems, product, and AI</span>
                </h3>
                <p className="text-muted-foreground">
                  Essays on product, systems, and AI.
                </p>
              </div>
              <Button asChild>
                <Link to="/writing">View all blogs</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Contact CTA */}
      <Section className="pb-24">
        <div className="max-w-2xl">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Available for consulting
              </h3>
              <p className="text-muted-foreground mb-4">
                I help teams with AI product strategy, 0→1 discovery, and devtools UX.
              </p>
              <Button asChild>
                <a href="mailto:t.srinikitha@gmail.com">Get in touch</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  )
}