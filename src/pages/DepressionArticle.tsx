import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Link } from "react-router-dom";

export default function DepressionArticle() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Back Button */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="gap-2">
          <Link to="/writing">
            <ArrowLeft className="h-4 w-4" />
            Back to Writings
          </Link>
        </Button>
      </div>

      {/* Article Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="gap-1">
            <Tag className="h-3 w-3" />
            Health system
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <Calendar className="h-3 w-3" />
            2024
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" />
            8 min read
          </Badge>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 leading-tight">
          Mental Health Screening is a sham
        </h1>
        
        <p className="text-xl text-muted-foreground leading-relaxed">
          A raw, honest critique of current mental health screening methods from someone who's lived through it. 
          Exploring the flaws in systems like the Beck Depression Inventory and proposing better alternatives.
        </p>
      </div>

      {/* Article Content */}
      <Card className="mb-8">
        <CardContent className="p-8 prose prose-lg max-w-none">
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              These days, depression has been hitting me hard. I find myself withdrawing from people, 
              losing interest in work, and feeling constantly drained. Some days are particularly dark - 
              I feel like a complete failure and break down crying. The scariest part? There are times 
              when life feels meaningless. I've caught myself looking out at my neighbor's two-story 
              building, calculating if the height would be enough to end it all. I know these thoughts 
              aren't right - I have a beautiful daughter who loves me and needs me. But these feelings 
              and thoughts just don't go away, no matter how much I try to fight them.
            </p>

            <p>
              Like any reasonable person would, I asked my husband to take me to a doctor. The first 
              few sessions were spent discussing my feelings - just talking things through. Then came 
              an interesting session with some questionnaire called the "Beck Depression Inventory" or 
              something similar. It had about 21 questions, each with a score attached. Add up the 
              scores, and apparently, that tells you if you're depressed or not. Sounds simple, right? 
              Maybe too simple. Sometimes I wonder if these tests are just too basic and unscientific. 
              They rely heavily on you being self-aware enough to answer accurately.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              The Problems I Noticed
            </h2>

            <p>
              I noticed several issues with the test. First, there's this gap between what you think 
              you feel and what you actually feel - they're not always the same thing. Then there's 
              the whole self-awareness piece - what about people who can't even admit to themselves 
              that they're sad? Or those who are terrified to tell anyone about their suicidal thoughts?
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900">
              1. Language Barriers
            </h3>

            <p>
              The language barrier is another huge problem. The test is in English - how would my 
              mother understand words like "discouraged" or "depression"? These tests need to be 
              available in local languages.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900">
              2. How Tests Are Conducted
            </h3>

            <p>
              But what bothers me most is how these tests are conducted. They're so invasive - just 
              mechanically going through questions one by one. Our thoughts don't work that way - 
              they're messy and unpatterned. Most patients just want someone to listen and understand. 
              It reminds me of those Global Poverty Index surveys where they barge into slums asking 
              personal questions about debt. There's this entitled assumption that people should just 
              answer these intrusive questions.
            </p>

            <p>
              During my test, the doctor jumped from asking about weaknesses straight to questions 
              about suicide. How is that okay? The question about suicide was so direct and insensitive - 
              something like "Do you want to kill yourself?" How can they ask such a question so bluntly? 
              Even if somebody doesn't want to confront those thoughts, they're forced to answer these 
              questions, which feels so inhumane. It's like they're treating the most vulnerable, 
              painful thoughts as just another checkbox to tick.
            </p>

            <p>
              And sometimes, the options they give you just don't fit. Like this question:
            </p>

            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-6">
              "0 I don't feel that I look any worse than I used to.<br/>
              1 I am worried that I am looking old or unattractive.<br/>
              2 I feel there are permanent changes in my appearance that make me look unattractive<br/>
              3 I believe that I look ugly."
            </blockquote>

            <p>
              None of these options matched what I was feeling.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              A Better Way Forward
            </h2>

            <p>
              I think these questions are outdated and lack emotional intelligence. We should have 
              more scientific ways to detect depression - maybe by analyzing information consumption 
              patterns or brain activity. And doctors should treat this less like a questionnaire 
              and more like an experience sheet, with different levels for different experiences 
              like sadness and suicidal thoughts.
            </p>

            <p>
              This is just my perspective as someone going through it all. Maybe there's a better 
              way to help people like me.
            </p>

          </div>
        </CardContent>
      </Card>

    </div>
  );
}
