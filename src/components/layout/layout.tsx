import { Header } from "./header"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-cream dark:bg-cream-dark text-black dark:text-white font-mono relative">
      {/* Classic Mac Diamond Checkerboard Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(45deg, currentColor 25%, transparent 25%),
            linear-gradient(-45deg, currentColor 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, currentColor 75%),
            linear-gradient(-45deg, transparent 75%, currentColor 75%)
          `,
          backgroundSize: '8px 8px',
          backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
        }}
      />
      <Header />
      <main className="pt-14 relative z-10">
        {children}
      </main>
    </div>
  )
}
