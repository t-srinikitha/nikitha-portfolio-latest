import { useState, useEffect } from "react";
import { Github, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/layout/footer";

const roles = ["Builder", "Systems Thinker", "AI Product Manager"];

export default function MinimalPortfolio() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Text Content */}
          <div className="lg:col-span-2 space-y-6">
            <p className="text-sm opacity-60">Hello, I'm</p>
            
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Sri Nikitha T
            </h1>
            
            <p className="text-lg">
              <span className="relative inline-block">
                <span 
                  className="absolute inset-0 -skew-y-1 -rotate-1 scale-x-105"
                  style={{ 
                    backgroundColor: '#DFFF00',
                    clipPath: 'polygon(2% 15%, 98% 5%, 100% 85%, 3% 95%)',
                    opacity: 0.8
                  }}
                />
                <span className="relative">{roles[currentRoleIndex]}</span>
              </span>
            </p>

            <p className="text-sm leading-relaxed opacity-70 max-w-lg">
              Problem solver with 8+ years of experience building products 
              from 0→1→scale across government, manufacturing, and developer tools.
              IIT Kharagpur & Ashoka University alumnus.
            </p>

            {/* CTA */}
            <div className="flex gap-4 pt-4">
              <a 
                href="mailto:t.srinikitha@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2 border border-black dark:border-white rounded-full text-sm hover:bg-black hover:text-cream dark:hover:bg-white dark:hover:text-cream-dark transition-colors"
              >
                Get in touch
              </a>
              <Link 
                to="/projects"
                className="inline-flex items-center gap-2 px-5 py-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                View projects <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Social */}
            <div className="flex gap-4 pt-4">
              <a href="https://github.com/t-srinikitha" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity">
                <Github className="h-4 w-4" fill="currentColor" />
              </a>
              <a href="https://x.com/sri_nikitha" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity">
                <Twitter className="h-4 w-4" fill="currentColor" />
              </a>
              <a href="https://linkedin.com/in/sri-nikitha-thummanapalli/" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity">
                <Linkedin className="h-4 w-4" fill="currentColor" />
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="lg:col-span-1">
            <div className="aspect-square max-w-[240px] mx-auto lg:mx-0 overflow-hidden border border-black dark:border-white">
              <img
                src="/Profile.jpeg"
                alt="Sri Nikitha T"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-t border-black/10 dark:border-white/10" />
      </div>

      {/* Quote */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <blockquote className="text-xl lg:text-2xl text-center leading-relaxed">
          "Do what feels like play to you,<br />
          but looks like work to others"
        </blockquote>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-t border-black/10 dark:border-white/10" />
      </div>

      {/* What I Do */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-sm font-medium mb-8 opacity-60">What I Do</h2>
        
        <p className="text-lg mb-8 max-w-2xl">
          Talk → Understand → Empathise → Build → Feedback → Iterate → Repeat
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-black/20 dark:border-white/20">
            <h3 className="font-medium mb-2">User-centric approach</h3>
            <p className="text-sm opacity-70">
              I talk to users and understand their problems deeply before building anything.
            </p>
          </div>
          <div className="p-6 border border-black/20 dark:border-white/20">
            <h3 className="font-medium mb-2">From Zero to Product</h3>
            <p className="text-sm opacity-70">
              Earlier building policies, now building products with AI. It feels empowering.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-t border-black/10 dark:border-white/10" />
      </div>

      {/* Key Milestones */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-sm font-medium mb-8 opacity-60">Key Milestones</h2>

        <div className="space-y-8">
          {/* DrDroid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
            <div className="md:col-span-1">
              <p className="text-xs opacity-50">DrDroid (YC-backed)</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-2">Building AI Agents</h3>
              <p className="text-sm opacity-70 mb-3">
                Leading product strategy for an AI SRE agent that automates debugging 
                and incident resolution. From user research to shipping AI-powered automation.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 border border-black/20 dark:border-white/20">AI/ML</span>
                <span className="text-xs px-2 py-1 border border-black/20 dark:border-white/20">SRE Automation</span>
              </div>
            </div>
          </div>

          {/* Facets */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
            <div className="md:col-span-1">
              <p className="text-xs opacity-50">Facets.cloud</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-2">Product Leadership</h3>
              <p className="text-sm opacity-70 mb-3">
                Scaled from 0 to $410K ARR. 
                Built product-market fit with 15+ enterprise customers and 500+ users.
                Conducted 100+ user interviews for product feedback and feature prioritization.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 border border-black/20 dark:border-white/20">$410K ARR</span>
                <span className="text-xs px-2 py-1 border border-black/20 dark:border-white/20">15 Customers</span>
              </div>
            </div>
          </div>

          {/* France */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
            <div className="md:col-span-1">
              <p className="text-xs opacity-50">French Startup</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-2">International Manufacturing</h3>
              <p className="text-sm opacity-70 mb-3">
                Delivered ₹1Cr project for sustainable housing. 
                End-to-end FRP manufacturing setup in 3 months.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 border border-black/20 dark:border-white/20">₹1Cr Value</span>
                <span className="text-xs px-2 py-1 border border-black/20 dark:border-white/20">3-Month Delivery</span>
              </div>
            </div>
          </div>

          {/* Telangana */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
            <div className="md:col-span-1">
              <p className="text-xs opacity-50">Telangana Government</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-2">State-wide Entrepreneurship Programs</h3>
              <p className="text-sm opacity-70 mb-3">
                Designed innovation courses across 31 districts. Telangana became India's first 
                state with a Grassroots Innovation Policy. Two innovators received Padma Shri, 
                one featured in a Netflix movie.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 border border-black/20 dark:border-white/20">Policy Design</span>
                <span className="text-xs px-2 py-1 border border-black/20 dark:border-white/20">31 Districts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-t border-black/10 dark:border-white/10" />
      </div>

      {/* My Story */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-sm font-medium mb-8 opacity-60">My Story</h2>
        
        <div className="max-w-2xl space-y-4 text-sm leading-relaxed opacity-80">
          <p>
            When I was 15, my father told me the story of Sintex — a pipe manufacturer 
            pivoted to making overhead tanks because of an idea from an IITian.
          </p>
          <p>
            My father said I should become that IITian. So I did.
          </p>
          <p>
            But at IIT, I realized most problems aren't solved with just better engineering — 
            they need better understanding. So I went to Ashoka University to learn how to 
            think in systems, not just solutions.
          </p>
          <p>
            Now I ship across government, manufacturing, and developer tools. Different 
            industries, same approach: understand the system, then build.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-t border-black/10 dark:border-white/10" />
      </div>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-medium mb-4">Let's build something together</h2>
        <p className="text-sm opacity-70 mb-8 max-w-md mx-auto">
          Product strategy, system design, or AI-powered solutions.
        </p>
        <a 
          href="mailto:t.srinikitha@gmail.com"
          className="inline-flex items-center gap-2 px-6 py-2.5 border border-black dark:border-white rounded-full text-sm hover:bg-black hover:text-cream dark:hover:bg-white dark:hover:text-cream-dark transition-colors"
        >
          <Mail className="h-4 w-4" />
          Get in touch
        </a>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
