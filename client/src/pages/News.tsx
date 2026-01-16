import { PageHeader } from "@/components/PageHeader";
import { useNewsList } from "@/hooks/use-lab-data";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function News() {
  const { data: news, isLoading } = useNewsList();

  const fallbackNews = [
    {
      id: 1,
      title: "Exciting Opportunity for Aspiring Postdocs!",
      content: "The Canada Postdoctoral Research Award Program is now open—a fantastic opportunity to join HydroTerra Lab or another lab in Canada for a 2-year fully funded postdoctoral position. Open to International researchers. Award Amount: $70,000/year.",
      date: new Date().toISOString(),
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "New Satellite-Based Soil Moisture Dataset Released",
      content: "We are excited to announce the release of our high-resolution soil moisture dataset covering agricultural regions across Prince Edward Island.",
      date: new Date(Date.now() - 86400000 * 5).toISOString(),
      imageUrl: null
    }
  ];

  const displayNews = (news && news.length > 0) ? news : fallbackNews;

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Lab News" 
        description="Updates, announcements, and recent activities from our group." 
      />

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10">
            {isLoading ? (
               Array(4).fill(0).map((_, i) => (
                 <div key={i} className="space-y-4">
                   <Skeleton className="h-64 rounded-xl" />
                   <Skeleton className="h-8 w-3/4" />
                   <Skeleton className="h-4 w-1/4" />
                   <Skeleton className="h-20 w-full" />
                 </div>
               ))
            ) : (
              displayNews?.map((item) => (
                <div key={item.id} className="group bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col h-full">
                  <div className="relative h-64 overflow-hidden bg-secondary">
                    {item.imageUrl ? (
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary/20 font-display text-4xl font-bold">
                        HydroTerra
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                      {format(new Date(item.date), 'MMMM d, yyyy')}
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <h2 className="text-2xl font-bold font-display mb-4 group-hover:text-primary transition-colors leading-tight">
                      {item.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed flex-grow">
                      {item.content}
                    </p>
                    <div className="mt-6 pt-6 border-t flex justify-end">
                      <button className="text-primary font-semibold hover:underline text-sm">Read Full Story</button>
                    </div>
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
