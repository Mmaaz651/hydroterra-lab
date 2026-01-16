import { Link } from "wouter";
import { Mail, MapPin, Twitter, Linkedin, Github } from "lucide-react";
import upeiLogo from "@assets/upei_logo_1768275866728.png";
import hydroTerraLogo from "@assets/HydroTerra_1768538920331.png";

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t mt-20">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center group w-fit">
              <img src={hydroTerraLogo} alt="HydroTerra Lab Logo" className="h-14 w-auto object-contain" />
              <div className="flex flex-col justify-center ml-3 pl-3 border-l border-border h-8">
                <span className="text-base font-bold font-display tracking-tight text-primary">HydroTerra Lab</span>
                <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-medium">Water & Food Systems</span>
              </div>
              <img src={upeiLogo} alt="UPEI Logo" className="h-8 w-auto object-contain ml-4" />
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed text-sm">
              HydroTerra Lab advances data-driven research on water and food systems using satellite remote sensing 
              and geospatial analytics. We develop models of soil moisture, drought, food security, and agricultural water stress.
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
              <li><Link href="/research/soil-moisture" className="hover:text-primary transition-colors">Soil Moisture Modeling</Link></li>
              <li><Link href="/research/drought-monitoring" className="hover:text-primary transition-colors">Drought Monitoring</Link></li>
              <li><Link href="/research/food-security" className="hover:text-primary transition-colors">Food Security</Link></li>
              <li><Link href="/research/water-stress" className="hover:text-primary transition-colors">Agricultural Water Stress</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground text-lg">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3 items-start">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>
                  University of Prince Edward Island<br />
                  Charlottetown, PE, Canada
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href="mailto:contact@hydroterra.org" className="hover:text-primary hover:underline transition-colors">
                  contact@hydroterra.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} HydroTerra Lab. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
