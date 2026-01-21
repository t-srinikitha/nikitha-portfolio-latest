import { Github, Linkedin, Twitter, Mail } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/t-srinikitha",
    icon: Github,
  },
  {
    name: "Twitter",
    href: "https://x.com/sri_nikitha",
    icon: Twitter,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/sri-nikitha-thummanapalli/",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:t.srinikitha@gmail.com",
    icon: Mail,
  },
]

export function Footer() {
  return (
    <footer className="border-t border-black dark:border-white py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:opacity-60 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-4 w-4" fill="currentColor" />
                  <span className="sr-only">{link.name}</span>
                </a>
              )
            })}
          </div>
          
          {/* Copyright */}
          <p className="text-xs opacity-60">
            © {new Date().getFullYear()} Sri Nikitha T
          </p>
        </div>
      </div>
    </footer>
  )
}
