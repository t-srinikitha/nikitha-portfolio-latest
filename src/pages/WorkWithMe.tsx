import { Download, Mail, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/layout/footer";

export default function WorkWithMe() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Headline */}
        <div className="mb-16">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Product Manager who codes,<br />
            Engineer who ships
          </h1>
          <p className="text-sm opacity-60">Open to opportunities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* What I'm Looking For */}
          <div>
            <h2 className="text-sm font-medium mb-6 opacity-60">
              What I'm Looking For
            </h2>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="opacity-40">→</span>
                <span>AI Engineer or Technical PM roles building AI products</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="opacity-40">→</span>
                <span>Teams that value PMs who can code</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="opacity-40">→</span>
                <span>Opportunities to work on developer tools or AI products</span>
              </li>
            </ul>
          </div>

          {/* What I Bring */}
          <div>
            <h2 className="text-sm font-medium mb-6 opacity-60">
              What I Bring
            </h2>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="opacity-40">→</span>
                <span>
                  Ships real products —{" "}
                  <Link to="/projects" className="underline inline-flex items-center gap-1">
                    view projects <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="opacity-40">→</span>
                <span>PM experience + engineering skills (growing)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="opacity-40">→</span>
                <span>DevOps/infrastructure expertise (rare for PMs)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="opacity-40">→</span>
                <span>Can translate between technical and business</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-black/10 dark:border-white/10 mb-16" />

        {/* Social Proof */}
        <div className="text-center mb-16">
          <p className="text-sm opacity-70">
            Currently writing{" "}
            <a
              href="https://devopsforpms.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              DevOps for Product Managers
            </a>{" "}
            newsletter, read by 500+ PMs
          </p>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a 
            href="/resume.pdf" 
            download
            className="inline-flex items-center gap-2 px-5 py-2 border border-black dark:border-white rounded-full text-sm hover:bg-black hover:text-cream dark:hover:bg-white dark:hover:text-cream-dark transition-colors"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
          
          <a 
            href="mailto:t.srinikitha@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2 bg-black text-cream dark:bg-white dark:text-cream-dark rounded-full text-sm hover:opacity-80 transition-opacity"
          >
            <Mail className="h-4 w-4" />
            Get in touch
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
