import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedProgress } from "@/components/ui/progress-animated"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  name: string
  description: string
  progress: number
  status: "active" | "planning" | "completed"
  techStack?: string[]
  slug?: string
  lastUpdated?: string
  isComingSoon?: boolean
}

export function ProjectCard({
  name,
  description,
  progress,
  status,
  techStack = [],
  slug,
  lastUpdated,
  isComingSoon = false
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  if (isComingSoon) {
    return (
      <Card className="h-full transition-all duration-300 hover:shadow-hover border-dashed border-2 border-muted">
        <CardContent className="flex items-center justify-center h-48 p-6">
          <div className="text-center">
            <div className="text-2xl mb-2">✨</div>
            <h3 className="font-semibold text-muted-foreground mb-1">Coming Soon</h3>
            <p className="text-sm text-muted-foreground">Next project in the pipeline</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const cardContent = (
    <Card
      className={cn(
        "h-full transition-all duration-300 hover:shadow-hover cursor-pointer group",
        slug && "hover:-translate-y-1"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg mb-1 group-hover:text-primary transition-colors">
                {name}
              </CardTitle>
              <CardDescription className="text-sm">
                {description}
              </CardDescription>
            </div>
            <Badge
              variant={status === "active" ? "default" : status === "completed" ? "secondary" : "outline"}
              className="ml-2 text-xs"
            >
              {status === "active" ? "Active" : status === "completed" ? "Done" : "Planning"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-mono text-xs">{progress}%</span>
            </div>
            <AnimatedProgress
              value={progress}
              delay={300}
              className="h-1.5"
            />
          </div>

          {techStack.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {techStack.slice(0, 3).map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs py-0">
                  {tech}
                </Badge>
              ))}
              {techStack.length > 3 && (
                <Badge variant="outline" className="text-xs py-0">
                  +{techStack.length - 3}
                </Badge>
              )}
            </div>
          )}

          {lastUpdated && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>Updated {lastUpdated}</span>
            </div>
          )}

          {slug && (
            <div
              className={cn(
                "flex items-center text-sm text-primary transition-all duration-200",
                isHovered ? "opacity-100 translate-x-1" : "opacity-0 translate-x-0"
              )}
            >
              <span>See more</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          )}
        </CardContent>
    </Card>
  )

  return slug ? (
    <Link to={`/project/${slug}`}>
      {cardContent}
    </Link>
  ) : (
    cardContent
  )
}