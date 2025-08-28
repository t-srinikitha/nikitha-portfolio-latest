import { Link } from "react-router-dom"
import { ArrowLeft, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect } from "react"

export default function Custom404() {
  useEffect(() => {
    // Easter egg for developers
    console.log(`
    🔍 Hey there, developer!
    
    Looks like you found a page that doesn't exist.
    But since you're here checking the console, 
    you might be interested in what I'm building.
    
    Check out my projects: ${window.location.origin}
    
    - Nikitha
    `)
  }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <Card className="border-dashed border-2">
          <CardContent className="p-12">
            {/* Terminal Icon */}
            <div className="mb-6">
              <Terminal className="h-16 w-16 text-muted-foreground mx-auto" />
            </div>

            {/* Error Message */}
            <h1 className="text-3xl font-bold text-foreground mb-2">
              404
            </h1>
            
            <h2 className="text-lg font-semibold text-muted-foreground mb-4">
              Page Not Found
            </h2>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              This page seems to have gone missing. Maybe it's debugging itself in production? 🤔
            </p>

            {/* Actions */}
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              
              <div className="text-xs text-muted-foreground">
                <p>Lost? Try checking the console for a surprise 👋</p>
              </div>
            </div>

            {/* Fun Footer */}
            <div className="mt-8 pt-8 border-t border-dashed">
              <p className="text-xs text-muted-foreground">
                "There are only two hard problems in Computer Science:<br />
                cache invalidation and naming things."<br />
                <span className="italic">— Phil Karlton</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}