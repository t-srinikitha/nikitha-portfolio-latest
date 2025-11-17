import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ExternalLink } from "lucide-react";

export default function WritingPage() {
  const substackUrl = "https://tsrinikitha.substack.com/";

  useEffect(() => {
    // Small delay to show the message, then redirect
    const timer = setTimeout(() => {
      window.location.replace(substackUrl);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="max-w-md w-full mx-4">
        <CardContent className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Redirecting to Substack</h2>
            <p className="text-muted-foreground">
              Taking you to my writings on Substack...
            </p>
          </div>
          <Button asChild className="w-full">
            <a href={substackUrl} target="_blank" rel="noopener noreferrer">
              Continue to Substack
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <p className="text-sm text-muted-foreground">
            If you're not redirected automatically,{" "}
            <a
              href={substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              click here
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}


