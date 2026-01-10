import { PageHeader } from "@/components/PageHeader";
import { usePublications } from "@/hooks/use-lab-data";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, FileText, Calendar } from "lucide-react";

export default function Publications() {
  const { data: publications, isLoading } = usePublications();

  // Sort by year descending
  const sortedPubs = publications?.sort((a, b) => b.year - a.year);

  // Fallback data
  const fallbackPubs = [
    {
      id: 1,
      title: "Disproportionate impact of the COVID-19 pandemic on socially vulnerable communities: The case of Jane and Finch in Toronto, Ontario",
      authors: "Kong J., Nia Z.M., Prescod C., Westin M., Fevrier K., Bawa S.",
      venue: "Public Health",
      year: 2024,
      link: "#",
      abstract: "This study investigates the disproportionate impact of COVID-19 on the Jane and Finch community, highlighting significant disparities in infection rates and healthcare access."
    },
    {
      id: 2,
      title: "Environmental Semantic Clustering-Guided Multimodal Fusion for Enhanced Interpretability in Methane Emission Prediction",
      authors: "Wang L., Kong J., Smith A.",
      venue: "arXiv preprint",
      year: 2024,
      link: "#",
      abstract: "Introducing ST-CAN, a Spatial-Temporal Cross-Attention Network for integrating sparse ground-based methane data with satellite imagery."
    },
    {
      id: 3,
      title: "Mathematical modeling of aquatic ecosystem dynamics under climate change scenarios",
      authors: "Doe J., Kong J.",
      venue: "Ecological Modelling",
      year: 2023,
      link: "#",
      abstract: "A comprehensive model predicting phytoplankton blooms in response to rising water temperatures and nutrient runoff."
    }
  ];

  const displayPubs = (publications && publications.length > 0) ? sortedPubs : fallbackPubs;

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Publications" 
        description="Our latest contributions to scientific literature and conferences." 
      />

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {isLoading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="p-6 border rounded-xl space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ))
            ) : (
              displayPubs?.map((pub) => (
                <div key={pub.id} className="bg-card border rounded-xl p-6 md:p-8 hover:shadow-lg hover:border-primary/30 transition-all group">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                          <Calendar className="w-3.5 h-3.5" /> {pub.year}
                        </span>
                        {pub.venue && (
                           <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                             <FileText className="w-3.5 h-3.5" /> {pub.venue}
                           </span>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold font-display text-foreground group-hover:text-primary transition-colors">
                        {pub.title}
                      </h3>
                      
                      <p className="text-sm text-primary font-medium italic">
                        {pub.authors}
                      </p>
                      
                      {pub.abstract && (
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl">
                          {pub.abstract}
                        </p>
                      )}
                    </div>

                    {pub.link && (
                      <a 
                        href={pub.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="shrink-0 p-3 rounded-full bg-secondary text-foreground hover:bg-primary hover:text-white transition-all self-start mt-2 md:mt-0"
                        title="View Publication"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
