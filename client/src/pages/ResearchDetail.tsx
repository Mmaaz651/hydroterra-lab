import { useRoute } from "wouter";
import { useResearchArea } from "@/hooks/use-lab-data";
import { PageHeader } from "@/components/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { NotFound } from "./not-found";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function ResearchDetail() {
  const [match, params] = useRoute("/research/:slug");
  const slug = match ? params.slug : "";
  const { data: area, isLoading, error } = useResearchArea(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-96 bg-muted animate-pulse" />
        <div className="container mx-auto px-4 py-12 max-w-4xl space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3" />
        </div>
      </div>
    );
  }

  if (error || !area) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        {/* Abstract background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <Link href="/research">
            <a className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors text-sm font-medium">
              <ArrowLeft className="w-4 h-4" /> Back to Research
            </a>
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display max-w-4xl">
            {area.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {area.imageUrl && (
            <div className="rounded-2xl overflow-hidden shadow-xl mb-12">
              <img src={area.imageUrl} alt={area.title} className="w-full h-auto" />
            </div>
          )}
          
          <div className="prose prose-lg prose-slate max-w-none">
            <p className="lead text-xl md:text-2xl font-display text-primary/80 mb-8">
              {area.description}
            </p>
            
            {/* 
               In a real app, this content would likely be rich text / HTML.
               For this demo, we're rendering text but simulating structured content.
            */}
            <div className="space-y-6 text-muted-foreground">
               <h3 className="text-2xl font-bold text-foreground mt-8">Overview</h3>
               <p>
                 Our research in {area.title.toLowerCase()} aims to address critical gaps in our understanding of 
                 complex systems. By leveraging advanced mathematical frameworks and data-driven approaches, 
                 we develop robust models that can inform policy and decision-making.
               </p>
               
               <h3 className="text-2xl font-bold text-foreground mt-8">Methodology</h3>
               <p>
                 We employ a combination of differential equations, stochastic processes, and machine learning algorithms.
                 This multi-faceted approach allows us to capture both the deterministic trends and the inherent 
                 uncertainty in natural phenomena.
               </p>
               
               <h3 className="text-2xl font-bold text-foreground mt-8">Impact</h3>
               <p>
                 The findings from this research stream have been instrumental in guiding interventions and resource 
                 allocation. We collaborate closely with industry partners and government agencies to ensure our 
                 models are grounded in reality and our results are actionable.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
