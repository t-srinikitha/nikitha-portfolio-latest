import { ProjectCard } from "@/components/project-card";

const allProjects = [
  {
    id: 1,
    name: "DrDroid - AI SRE Agent",
    description: "An AI-powered Site Reliability Engineering (SRE) agent designed to automate incident response, root cause analysis, and proactive system health monitoring for complex cloud infrastructures.",
    techStack: ["AI/ML", "SRE", "DevOps", "Cloud", "Product Management"],
    link: "#"
  },
  {
    id: 2,
    name: "Waste Management Platform",
    description: "A comprehensive platform for industrial waste management, optimizing collection, processing, and disposal workflows while ensuring regulatory compliance and promoting circular economy principles.",
    techStack: ["Sustainability", "IoT", "Logistics", "B2B SaaS", "Product Management"],
    link: "#"
  },
  {
    id: 3,
    name: "Wedsmart",
    description: "Calculator for calculating emissions from weddings in India, helping couples make environmentally conscious decisions.",
    techStack: ["Sustainability", "Consumer Tech", "Impact"],
    link: "#"
  },
  {
    id: 4,
    name: "Tailor CRM",
    description: "Order taking and tracking tool for tailors to manage customer orders, measurements, and delivery schedules.",
    techStack: ["Local Business", "CRM", "SaaS"],
    link: "#"
  },
  {
    id: 5,
    name: "Weekly Meal Planner",
    description: "Creates weekly meal plans for families based on dietary requirements, preferences, and available ingredients.",
    techStack: ["Health & Wellness", "AI/ML", "Consumer App"],
    link: "#"
  }
];

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A collection of products I've built across different domains, 
          showcasing my approach to solving real-world problems with technology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
}
