import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  name: string
  description: string
  progress?: number
  status?: "active" | "planning" | "completed"
  techStack?: string[]
  slug?: string
  link?: string
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
  link,
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
        "h-full transition-all duration-300 hover:shadow-hover cursor-pointer group border border-transparent",
        slug && "hover:-translate-y-1",
        "hover:border-primary/30"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base sm:text-lg mb-1 group-hover:text-primary transition-colors">
              {name}
            </CardTitle>
            <CardDescription className="text-sm">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {techStack.map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs py-0.5">
                {tech}
              </Badge>
            ))}
          </div>
        )}

        {(slug || link) && (
          <div
            className={cn(
              "flex items-center text-sm text-primary transition-all duration-200",
              isHovered ? "opacity-100 translate-x-1" : "opacity-0 translate-x-0"
            )}
          >
            <span>See more</span>
            {link && link !== "#" ? (
              <ExternalLink className="h-4 w-4 ml-1" />
            ) : (
              <ArrowRight className="h-4 w-4 ml-1" />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )

  // Handle external links
  if (link && link !== "#" && !link.startsWith("/")) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {cardContent}
      </a>
    )
  }

  // Handle internal routing with slug
  if (slug) {
    return (
      <Link to={`/project/${slug}`}>
        {cardContent}
      </Link>
    )
  }

  // Default: no link
  return cardContent
}