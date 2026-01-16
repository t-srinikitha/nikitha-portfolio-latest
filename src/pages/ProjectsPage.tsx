import { ProjectCard } from "@/components/project-card";

const allProjects = [
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
    name: "Advaita Birthday",
    description: "A fun, interactive birthday website featuring dinosaur-themed games and activities including bubble popping, spinner games, dancing animations, drawing tools, and typing games.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    link: "https://happy-birthday-advaita.vercel.app/"
  },
  {
    id: 7,
    name: "Know Your Architecture",
    description: "An interactive architecture visualization tool that helps understand and explore system architectures through visual representations.",
    techStack: ["JavaScript", "CSS", "HTML", "Web Visualization"],
    link: "https://github.com/t-srinikitha/know-your-architecture"
  },
  {
    id: 8,
    name: "The Green Indian Wedding Toolkit",
    description: "A comprehensive toolkit and resource guide for planning environmentally conscious Indian weddings, providing practical tips, checklists, and sustainable alternatives.",
    techStack: ["Sustainability", "Content", "Resource Toolkit", "Wedding Planning"],
    link: "https://www.notion.so/The-Green-Indian-Wedding-Toolkit-9081b8732ff54248b1f369f591a51929"
  }
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">Projects</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {allProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}
