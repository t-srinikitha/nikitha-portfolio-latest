import { Header } from "./header"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-cream dark:bg-cream-dark text-black dark:text-white font-sans relative">
      <Header />
      <main className="pt-14 print:pt-0 relative z-10">
        {children}
      </main>
    </div>
  )
}
