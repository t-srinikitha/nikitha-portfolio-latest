import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Mail, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function WorkWithMe() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        {/* Headline */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-4xl font-bold mb-4 text-white">
          Product Manager who codes, Engineer who ships
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* What I'm Looking For */}
          <Card className="bg-white/5 border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6 text-white">
                What I'm Looking For
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-300">
                    AI Engineer or Technical PM roles building AI products
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-300">
                    Teams that value PMs who can code
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-300">
                    Opportunities to work on developer tools or AI products
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* What I Bring */}
          <Card className="bg-white/5 border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6 text-white">
                What I Bring
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-300">
                    Ships real products -{" "}
                    <Link
                      to="/projects"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      view projects
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-300">
                    PM experience + engineering skills(growing)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-300">
                    DevOps/infrastructure expertise (rare for PMs)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-300">
                    Can translate between technical and business
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Social Proof */}
        <div className="text-center mb-12">
          <p className="text-lg text-gray-300">
            Currently writing{" "}
            <a
              href="https://devopsforpms.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              DevOps for Product Managers
            </a>{" "}
            newsletter, read by 500+ PMs
          </p>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button
            variant="default"
            size="lg"
            asChild
            className="w-full sm:w-auto"
          >
            <a href="/resume.pdf" download>
              <Download className="h-4 w-4 mr-2" />
              Download Resume (PDF)
            </a>
          </Button>
          
          <Button
            variant="secondary"
            size="lg"
            asChild
            className="w-full sm:w-auto"
          >
            <a href="mailto:t.srinikitha@gmail.com">
              <Mail className="h-4 w-4 mr-2" />
              Get in touch
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
