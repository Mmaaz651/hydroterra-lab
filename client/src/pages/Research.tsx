import { PageHeader } from "@/components/PageHeader";
import { useResearchAreas } from "@/hooks/use-lab-data";
import { Link } from "wouter";
import { ArrowRight, Database, Activity, Droplets, Globe } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Map icons to slugs for hardcoded icons if fetched data doesn't have URLs
const iconMap: Record<string, any> = {
  "disease-modeling": Activity,
  "aquatic-ecosystems": Droplets,
  "ghg-emissions": Globe,
  "data-science": Database,
};

export default function Research() {
  const { data: areas, isLoading } = useResearchAreas();

  // Fallback data if DB is empty
  const defaultAreas = [
    {
      id: 1,
      title: "Disease Modeling",
      slug: "disease-modeling",
      description: "We use mathematical models to understand the transmission dynamics of infectious diseases. Our work focuses on informing public health policy through rigorous quantitative analysis.",
      imageUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2000&auto=format&fit=crop" // Virus/medical visualization
    },
    {
      id: 2,
      title: "Aquatic Ecosystem Dynamics",
      slug: "aquatic-ecosystems",
      description: "Investigating the impact of environmental stressors on aquatic life. We model population dynamics and interactions within complex water ecosystems.",
      imageUrl: "https://images.unsplash.com/photo-1583212235753-bce297c58059?q=80&w=2000&auto=format&fit=crop" // Water/ocean abstract
    },
    {
      id: 3,
      title: "Oil Sands GHG Emissions",
      slug: "ghg-emissions",
      description: "Developing methodologies to estimate and forecast greenhouse gas emissions, specifically focusing on industrial outputs and their environmental impact.",
      imageUrl: "https://images.unsplash.com/photo-1611273426728-700d08e29b30?q=80&w=2000&auto=format&fit=crop" // Industrial/pollution abstract
    },
    {
      id: 4,
      title: "AI & Data Science",
      slug: "data-science",
      description: "Applying advanced machine learning techniques to biological and environmental data. We build predictive models that can handle large-scale, noisy datasets.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop" // Data visualization
    }
  ];

  const displayAreas = (areas && areas.length > 0) ? areas : defaultAreas;

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Our Research" 
        description="Exploring the intersection of mathematics, artificial intelligence, and biological systems."
        pattern="grid"
      />

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-24">
            {isLoading ? (
               // Loading state
               Array(3).fill(0).map((_, i) => (
                 <div key={i} className="flex flex-col md:flex-row gap-8">
                    <Skeleton className="w-full md:w-1/2 h-64 rounded-2xl" />
                    <div className="w-full md:w-1/2 space-y-4">
                      <Skeleton className="h-10 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                 </div>
               ))
            ) : (
              displayAreas.map((area, index) => {
                const Icon = iconMap[area.slug] || Activity;
                const isEven = index % 2 === 0;

                return (
                  <div key={area.id} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
                    <div className="w-full md:w-1/2">
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                        <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                        {/* Research Area Image */}
                        <img 
                          src={area.imageUrl || "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80"} 
                          alt={area.title}
                          className="w-full aspect-[4/3] object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </div>
                    
                    <div className="w-full md:w-1/2 space-y-6">
                      <div className="flex items-center gap-3 text-primary mb-2">
                         <div className="p-2 bg-primary/10 rounded-lg">
                           <Icon className="w-6 h-6" />
                         </div>
                         <span className="text-sm font-bold uppercase tracking-widest">Research Area {index + 1}</span>
                      </div>
                      
                      <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">
                        {area.title}
                      </h2>
                      
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {area.description}
                      </p>
                      
                      <div className="pt-4">
                        <Link href={`/research/${area.slug}`}>
                          <button className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group">
                            Read Detailed Overview <ArrowRight className="w-5 h-5" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
