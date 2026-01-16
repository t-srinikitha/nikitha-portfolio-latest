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
        "h-full w-full transition-all duration-300 hover:shadow-md cursor-pointer group border border-white/20 bg-white/5 hover:bg-white/10",
        (link && link !== "#") || slug ? "hover:-translate-y-0.5" : "",
        "hover:border-primary/30"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2 px-4 pt-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-sm font-semibold mb-1.5 group-hover:text-primary transition-colors line-clamp-2 text-white">
              {name}
            </CardTitle>
            <CardDescription className="text-xs leading-relaxed line-clamp-3 text-gray-300">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4 space-y-2">
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {techStack.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="outline" className="text-[10px] py-0 px-1.5 h-5 text-white border-white/30">
                {tech}
              </Badge>
            ))}
            {techStack.length > 3 && (
              <Badge variant="outline" className="text-[10px] py-0 px-1.5 h-5 text-white border-white/30">
                +{techStack.length - 3}
              </Badge>
            )}
          </div>
        )}

        {(slug || link) && (
          <div
            className={cn(
              "flex items-center text-xs text-primary transition-all duration-200",
              isHovered ? "opacity-100 translate-x-0.5" : "opacity-0 translate-x-0"
            )}
          >
            <span>View</span>
            {link && link !== "#" ? (
              <ExternalLink className="h-3 w-3 ml-1" />
            ) : (
              <ArrowRight className="h-3 w-3 ml-1" />
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
        className="block h-full"
      >
        {cardContent}
      </a>
    )
  }

  // Handle internal routing with slug
  if (slug) {
    return (
      <Link to={`/project/${slug}`} className="block h-full">
        {cardContent}
      </Link>
    )
  }

  // Handle links that are "#" - make them non-clickable but keep styling
  if (link === "#") {
    return cardContent
  }

  // Default: no link
  return cardContent
}