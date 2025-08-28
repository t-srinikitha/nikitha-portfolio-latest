import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Ships", href: "/ships" },
  { name: "Now", href: "/now" },
  { name: "Writing", href: "/writing", disabled: true },
]

export function Header() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
            Nikitha Thummanapalli
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors relative",
                  item.disabled
                    ? "text-muted-foreground cursor-not-allowed"
                    : location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
                {location.pathname === item.href && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}

            {/* Resume Link */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              Resume
              <ExternalLink className="h-3 w-3" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}