import { ProjectCard } from "@/components/project-card";
import { Footer } from "@/components/layout/footer";

const allProjects = [
  {
    id: 1,
    name: "Advaita Birthday",
    description: "A fun, interactive birthday website featuring dinosaur-themed games and activities including bubble popping, spinner games, and drawing tools.",
    techStack: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    link: "https://happy-birthday-advaita.vercel.app/"
  },
  {
    id: 2,
    name: "Know Your Architecture",
    description: "An interactive architecture visualization tool that helps understand and explore system architectures through visual representations.",
    techStack: ["JavaScript", "CSS", "HTML"],
    link: "https://github.com/t-srinikitha/know-your-architecture"
  },
  {
    id: 3,
    name: "The Green Indian Wedding Toolkit",
    description: "A comprehensive toolkit and resource guide for planning environmentally conscious Indian weddings.",
    techStack: ["Sustainability", "Content", "Resource Toolkit"],
    link: "https://www.notion.so/The-Green-Indian-Wedding-Toolkit-9081b8732ff54248b1f369f591a51929"
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
  },
  {
    id: 6,
    name: "Letter to Self",
    description: "A reflective journaling app for writing letters to your future self.",
    techStack: ["Next.js", "React", "TypeScript"],
    link: "/letter-to-self"
  }
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-sm opacity-60">
            Side projects and experiments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
