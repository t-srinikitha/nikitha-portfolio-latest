import * as React from "react"
import { cn } from "@/lib/utils"

interface AnimatedProgressProps {
  value: number
  className?: string
  showPercentage?: boolean
  delay?: number
}

const AnimatedProgress = React.forwardRef<
  HTMLDivElement,
  AnimatedProgressProps
>(({ className, value, showPercentage = false, delay = 0, ...props }, ref) => {
  const [animatedValue, setAnimatedValue] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return (
    <div
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <div
        className="h-full bg-primary transition-all duration-2000 ease-out animate-pulse-gentle"
        style={{ width: `${animatedValue}%` }}
      />
      {showPercentage && (
        <span className="absolute -top-6 right-0 text-xs text-muted-foreground font-mono">
          {Math.round(animatedValue)}%
        </span>
      )}
    </div>
  )
})
AnimatedProgress.displayName = "AnimatedProgress"

export { AnimatedProgress }