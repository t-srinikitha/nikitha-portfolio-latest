interface SectionProps {
  title?: string
  subtitle?: string
  children?: React.ReactNode
  className?: string
  containerClassName?: string
}

export function Section({ title, subtitle, children, className = "", containerClassName = "" }: SectionProps) {
  return (
    <section className={`py-16 lg:py-20 ${className}`}>
      <div className={`max-w-6xl mx-auto px-6 lg:px-8 ${containerClassName}`}>
        {(title || subtitle) && (
          <div className="mb-10">
            {title && (
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-base lg:text-lg text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}


