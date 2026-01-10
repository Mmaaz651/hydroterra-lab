import { Link } from "wouter";
import { Atom, Mail, MapPin, Twitter, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t mt-20">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Atom className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold font-display tracking-tight text-primary">AIMMLab</span>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed text-sm">
              We design and deploy AI and mathematical methodologies to enhance public health preparedness 
              and address global socio-ecological challenges.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 rounded-full bg-background border hover:border-primary/50 text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-background border hover:border-primary/50 text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-background border hover:border-primary/50 text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground text-lg">Research</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/research/disease-modeling" className="hover:text-primary transition-colors">Disease Modeling</Link></li>
              <li><Link href="/research/aquatic-ecosystems" className="hover:text-primary transition-colors">Aquatic Ecosystems</Link></li>
              <li><Link href="/research/ghg-emissions" className="hover:text-primary transition-colors">GHG Emissions</Link></li>
              <li><Link href="/research/data-science" className="hover:text-primary transition-colors">AI & Data Science</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground text-lg">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3 items-start">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>
                  University of Toronto<br />
                  Toronto, ON, Canada
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href="mailto:contact@aimmlab.org" className="hover:text-primary hover:underline transition-colors">
                  contact@aimmlab.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} AIMMLab. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
