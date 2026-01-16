import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Projects", href: "/projects" },
]

export function Header() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMinimal, setIsMinimal] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const togglePortfolio = undefined

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <Link
            to="/"
            className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
          >
            Sri Nikitha T
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/projects"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Projects
            </Link>
            <a
              href="https://devopsforpms.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
            >
              Devops for Product Managers
              <ExternalLink className="h-3 w-3" />
            </a>
            <Button
              variant="default"
              size="sm"
              asChild
            >
              <Link to="/work-with-me">
                Work with me
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}