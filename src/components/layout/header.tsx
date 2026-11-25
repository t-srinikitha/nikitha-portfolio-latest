import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { MAILTO } from "@/lib/site"

export function Header() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream dark:bg-cream-dark border-b border-black dark:border-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            to="/"
            className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity"
          >
            Sri Nikitha T
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <a href="/plasticoptics" className="text-sm hover:opacity-60 transition-opacity hidden sm:block">
              Plasticoptics
            </a>
            <a
              href={MAILTO}
              className="text-sm px-4 py-1.5 border border-black dark:border-white rounded-full hover:bg-black hover:text-cream dark:hover:bg-white dark:hover:text-cream-dark transition-colors"
            >
              Contact
            </a>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 hover:opacity-60 transition-opacity"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
