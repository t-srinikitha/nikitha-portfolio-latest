import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const publishedArticles = [
  {
    id: 1,
    title: "Living with Depression: A Personal Take on Mental Health Screening",
    description: "A raw, honest critique of current mental health screening methods from someone who's lived through it. Exploring the flaws in systems like the Beck Depression Inventory and proposing better alternatives.",
    status: "published",
    category: "Mental Health & Systems",
    date: "2024",
    readTime: "8 min read",
    excerpt: "These days, depression has been hitting me hard. I find myself withdrawing from people, losing interest in work, and feeling constantly drained. Some days are particularly dark - I feel like a complete failure and break down crying..."
  }
];

const plannedArticles = [
  {
    id: 1,
    title: "The Sintex Story: How One Product Bet Transformed a Company",
    description: "Exploring the overhead tank innovation that saved Sintex and inspired my journey to IIT.",
    category: "Personal Story",
    status: "planned"
  },
  {
    id: 2,
    title: "Building Developer Tools: A Systems Approach",
    description: "How I apply systems thinking to design tools that developers actually want to use.",
    category: "Technical",
    status: "planned"
  },
  {
    id: 3,
    title: "AI Product Management: Beyond the Hype",
    description: "Practical insights on building AI products that solve real problems.",
    category: "AI & Product",
    status: "planned"
  }
];

export default function WritingPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Writings</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Notes on systems thinking, first‑principles product, and building with AI.
        </p>
      </div>

      {/* Published Articles */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          Published
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {publishedArticles.map((article) => (
            <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors mb-2">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed mb-3">
                      {article.description}
                    </CardDescription>
                    <div className="text-sm text-muted-foreground italic mb-4">
                      "{article.excerpt}"
                    </div>
                  </div>
                  <Badge variant="secondary" className="ml-4">{article.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{article.category}</Badge>
                    <span className="text-sm text-muted-foreground">{article.date}</span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{article.readTime}</span>
                  </div>
                  <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                    <Link to="/writing/depression-mental-health-screening">
                      Read Article
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Planned Articles */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Lightbulb className="h-6 w-6" />
          In the Pipeline
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plannedArticles.map((article) => (
            <Card key={article.id} className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {article.status}
                  </Badge>
                </div>
                <CardDescription className="text-sm">
                  {article.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{article.category}</Badge>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <Card className="bg-muted/50 border-dashed">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold mb-3">Have a Topic in Mind?</h3>
            <p className="text-muted-foreground mb-4">
              I'm always open to suggestions for articles. If there's something 
              you'd like me to write about, let me know!
            </p>
            <Button>Suggest a Topic</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


