import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "@/components/project-card";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Github, Linkedin, Twitter } from "lucide-react";

const roles = ["Builder", "Systems Thinker", "AI\u00A0Product\u00A0Manager"];

const projects = [
  {
    id: 4,
    name: "Tailor CRM",
    description: "Order taking and tracking tool for tailors to manage customer orders, measurements, and delivery schedules.",
    techStack: ["Local Business", "CRM", "SaaS"],
    progress: 100,
    status: "completed" as const,
    link: "#"
  },
  {
    id: 6,
    name: "Advaita Birthday",
    description: "A fun, interactive birthday website featuring dinosaur-themed games and activities including bubble popping, spinner games, dancing animations, drawing tools, and typing games.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    progress: 100,
    status: "completed" as const,
    link: "https://happy-birthday-advaita.vercel.app/"
  },
  {
    id: 7,
    name: "Know Your Architecture",
    description: "An interactive architecture visualization tool that helps understand and explore system architectures through visual representations.",
    techStack: ["JavaScript", "CSS", "HTML", "Web Visualization"],
    progress: 100,
    status: "completed" as const,
    link: "https://github.com/t-srinikitha/know-your-architecture"
  }
];

export default function MinimalPortfolio() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 1. Hero Section - Improved */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-4">
                
                <p className="text-xl text-gray-400 mb-2">Hello</p>

                <h1 className="text-5xl lg:text-7xl font-light leading-tight mb-4 text-white">
                  I'm Sri Nikitha, <span className="font-serif italic text-primary">{roles[currentRoleIndex]}</span>
                  <br />
                  based out of Bangalore
                </h1>
              </div>
              
              <div className="space-y-4">
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                Problem solver with 8+ years of experience in building products from ground up to scale across government, manufacturing, and developer tools. Alum of IIT Kharagpur and Ashoka University. 
                </p>
                
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="default"
                    size="lg"
                    asChild
                  >
                    <a href="mailto:t.srinikitha@gmail.com">
                      Get in touch
                    </a>
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="lg"
                    asChild
                  >
                    <a href="projects">
                      View my work
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Profile & Info */}
            <div className="lg:col-span-5 space-y-6">
              {/* Profile Photo */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                    <img
                      src="/Profile.jpeg"
                      alt="Sri Nikitha T"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-white/20 to-transparent blur-xl"></div>
                </div>
              </div>
              
              {/* Info Card */}
              <Card className="bg-white/5 border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-white">
                    What I do
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                   Talk → Understand → Empathise → Build → Set feedback loop → Iterate → Repeat
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center lg:justify-start mt-8 space-x-6">
            <a
              href="https://github.com/t-srinikitha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-all duration-200 hover:scale-110"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://x.com/sri_nikitha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-all duration-200 hover:scale-110"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/sri-nikitha-thummanapalli/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-all duration-200 hover:scale-110"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Quote Section */}
      <section className="py-20 bg-white text-black relative">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <blockquote className="text-3xl lg:text-4xl font-medium leading-relaxed">
            "Do what feels like play to you, but looks like work to others"
          </blockquote>
        </div>
      </section>

      {/* 3. Why I am a Product Manager Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Why I am a Product Manager</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Solving problems and building products feels like play to me.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white/5 border-white/20 hover:border-primary/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-primary transition-colors">Empathising with Users</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  I like talking to users and understanding their problems.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/20 hover:border-primary/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-primary transition-colors">Building Things</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  I love to build things. Earlier, I was building policies. Now, I'm building products using AI. It feels empowering.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. What Did I Achieve Section */}
      <section className="py-20 bg-white text-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">What Did I Achieve?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sometimes I feel I did nothing. Sometimes I feel maybe I did something. 
              I really don't know the answer. I'm just reflecting.
            </p>
          </div>
          
          <div className="space-y-12">
            {/* Telangana Story */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="lg:order-2">
                <h3 className="text-2xl font-bold mb-4">Grassroots Innovation Policy Implementation</h3>
                <p className="text-gray-600 mb-4">
                  Led the design and implementation of Telangana's first Grassroots Innovation Policy, establishing entrepreneurship programs and innovation hubs across the state. Built the framework for identifying and supporting grassroots innovators, connecting them with resources, mentorship, and markets.
                </p>
                <div className="bg-gray-50 border-l-4 border-primary p-4 rounded-r-lg mb-4">
                  <p className="text-gray-700 italic">
                    "Programs I designed are still running across 31 districts, with Telangana being the only state with a dedicated Grassroots Innovation Policy."
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Policy Design</Badge>
                  <Badge variant="secondary">31 Districts</Badge>
                  <Badge variant="secondary">Netflix Documentary</Badge>
                </div>
              </div>
              <div className="lg:order-1 bg-white border-2 border-gray-200 rounded-2xl p-6 text-center flex items-center justify-center min-h-[120px]">
                <img 
                  src="/telangana-logo.jpg" 
                  alt="Telangana Government Logo" 
                  className="max-h-16 max-w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const next = e.currentTarget.nextElementSibling as HTMLElement | null;
                    if (next) next.style.display = 'block';
                  }}
                />
                <div className="text-gray-400 text-sm" style={{display: 'none'}}>Telangana Government Logo</div>
              </div>
            </div>

            {/* France Project */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">International Manufacturing Project Delivery</h3>
                <p className="text-gray-600 mb-4">
                  Executed end-to-end project management for a French startup's sustainable housing initiative. Conducted comprehensive market research on Fiber-Reinforced Plastic (FRP) manufacturing in India, established supplier networks, and delivered custom die manufacturing within 3 months.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">₹1Cr Project Value</Badge>
                  <Badge variant="secondary">3-Month Delivery</Badge>
                  <Badge variant="secondary">International Client</Badge>
                </div>
              </div>
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center flex items-center justify-center min-h-[120px]">
                <img 
                  src="/five elements.png" 
                  alt="French Startup Logo" 
                  className="max-h-16 max-w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const next = e.currentTarget.nextElementSibling as HTMLElement | null;
                    if (next) next.style.display = 'block';
                  }}
                />
                <div className="text-gray-400 text-sm" style={{display: 'none'}}>French Startup Logo</div>
              </div>
            </div>

            {/* Facets Story */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="lg:order-2">
                <h3 className="text-2xl font-bold mb-4">Product Leadership: Scaling to $410K ARR</h3>
                <p className="text-gray-600 mb-4">
                  Led product strategy and execution as the founding Product Manager at Facets, a cloud infrastructure platform. Built product-market fit from zero revenue to $410K ARR and 15 enterprise customers through user-centric development and cross-functional collaboration.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">$410K ARR Growth</Badge>
                  <Badge variant="secondary">15 Enterprise Customers</Badge>
                  <Badge variant="secondary">Product-Market Fit</Badge>
                </div>
              </div>
              <div className="lg:order-1 bg-white border-2 border-gray-200 rounded-2xl p-6 text-center flex items-center justify-center min-h-[120px]">
                <img 
                  src="/facets.png" 
                  alt="Facets Logo" 
                  className="max-h-16 max-w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const next = e.currentTarget.nextElementSibling as HTMLElement | null;
                    if (next) next.style.display = 'block';
                  }}
                />
                <div className="text-gray-400 text-sm" style={{display: 'none'}}>Facets Logo</div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 6. Side Projects Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Side Projects</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Personal projects that showcase my passion for building solutions to real-world problems.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="secondary" 
              size="lg"
              asChild
            >
              <a href="/projects">
                View All Projects
              </a>
            </Button>
          </div>
        </div>
      </section>


      {/* 8. My Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-black">My Story</h2>
          </div>
          
          <div className="bg-black border border-gray-700 rounded-lg p-8">
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <div>
               
                <p>
                  When I was 15, my father told me the story of Sintex - a company manufacturing 
                  plastic pipes that was about to go bankrupt. They recruited an IITian who said 
                  they could build an overhead tank, already existing in other countries. They did 
                  it and disrupted the market.
                </p>
                <p className="mt-4">
                  My father said I should become that IITian. I thought IITians are the only problem solvers, 
                  and going to an IIT would make me the best problem solver. So I strived to become 
                  exactly that.
                </p>
              </div>
              
              <div>
             
                <p>
                  I'm the first generation to earn an IIT degree and a liberal arts degree too. I worked across manufacturing, government, sustainability, B2B SaaS, and developer tools. 
                  I'm inherently inquisitive to learn different things to solve any kind of problems.
                </p>
                <p className="mt-4">
                  I had two spinal surgeries and a bicornuate uterus, super complicated pregnancy. Gathered so much courage and I became a mother, now figuring my shit out and realizing how mothers are 
                  a different breed. Currently, I'm consulting for <strong>DrDroid</strong>(YC-backed), an AI SRE agent 
                  for automatic debugging and resolution of issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Footer CTA */}
      <section className="py-20 bg-white text-black">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Build Something Together</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you need help with product strategy, system design, or building 
            AI-powered solutions, I'd love to collaborate.
          </p>
          <Button 
            variant="default"
            size="lg"
            asChild
          >
            <a href="mailto:t.srinikitha@gmail.com">
              Get in Touch
            </a>
          </Button>
        </div>
      </section>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}