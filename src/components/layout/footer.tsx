import { Github, Linkedin, Twitter, Mail } from "lucide-react"

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/nikitha-thummanapalli",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/nikithat",
    icon: Twitter,
  },
  {
    name: "GitHub",
    href: "https://github.com/nikithat",
    icon: Github,
  },
  {
    name: "Email",
    href: "mailto:nikitha@example.com",
    icon: Mail,
  },
]

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-6">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{link.name}</span>
                </a>
              )
            })}
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>Building developer tools from first principles</p>
            <p className="mt-1">© 2024 Nikitha Thummanapalli</p>
          </div>
        </div>
      </div>
    </footer>
  )
}