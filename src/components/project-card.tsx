import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"

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
  techStack = [],
  slug,
  link,
  isComingSoon = false
}: ProjectCardProps) {

  if (isComingSoon) {
    return (
      <div className="p-6 border border-dashed border-black/20 dark:border-white/20">
        <p className="text-sm opacity-40">Coming soon</p>
      </div>
    )
  }

  const cardContent = (
    <div className="group p-6 border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-medium text-sm">{name}</h3>
        {(link && link !== "#") && (
          <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-60 transition-opacity" />
        )}
      </div>

      {/* Description */}
      <p className="text-sm opacity-60 mb-4 line-clamp-2">
        {description}
      </p>

      {/* Tech Stack */}
      {techStack.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {techStack.slice(0, 3).map((tech) => (
            <span 
              key={tech} 
              className="text-xs px-2 py-0.5 border border-black/20 dark:border-white/20"
            >
              {tech}
            </span>
          ))}
          {techStack.length > 3 && (
            <span className="text-xs px-2 py-0.5 opacity-50">
              +{techStack.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
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
      <Link to={`/project/${slug}`} className="block">
        {cardContent}
      </Link>
    )
  }

  // Default
  return cardContent
}
