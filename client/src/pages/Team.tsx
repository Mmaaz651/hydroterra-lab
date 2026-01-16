import { PageHeader } from "@/components/PageHeader";
import { useTeam } from "@/hooks/use-lab-data";
import { Skeleton } from "@/components/ui/skeleton";
import { Linkedin, Twitter, Globe, Mail } from "lucide-react";

export default function Team() {
  const { data: team, isLoading } = useTeam();

  // Fallback data
  const fallbackTeam = [
    {
      id: 1,
      name: "Sara Sadri, Ph.D., P.Eng., C.R.C.",
      role: "Canada Research Chair in Remote Sensing and Water Security",
      bio: "Associate Professor of Climate Change and Adaptation. Expert in remote sensing hydrology, statistical data science, climate change impacts, and water and food security, with extensive experience in AI-driven analysis of large-scale environmental and socio-economic data.",
      imageUrl: "",
      linkedin: "https://www.linkedin.com/in/sara-sadri-ab5370164/",
      twitter: "#",
      website: "#"
    }
  ];

  const displayTeam = (team && team.length > 0) ? team : fallbackTeam;

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Our Team" 
        description="Meet the researchers and students behind our innovative work." 
      />

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="bg-card rounded-2xl p-6 space-y-4 border">
                  <Skeleton className="w-32 h-32 rounded-full mx-auto" />
                  <div className="space-y-2 text-center">
                    <Skeleton className="h-6 w-3/4 mx-auto" />
                    <Skeleton className="h-4 w-1/2 mx-auto" />
                  </div>
                  <Skeleton className="h-20 w-full" />
                </div>
              ))
            ) : (
              displayTeam?.map((member) => (
                <div key={member.id} className="bg-card border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="p-8 flex flex-col items-center text-center">
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary/10 mb-6 shadow-inner group-hover:border-primary/30 transition-colors">
                      {member.imageUrl ? (
                        <img 
                          src={member.imageUrl} 
                          alt={member.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                      ) : (
                        <div className="w-full h-full bg-secondary flex items-center justify-center text-3xl font-bold text-muted-foreground">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold font-display text-foreground mb-1">
                      {member.name}
                    </h3>
                    <div className="text-primary font-medium mb-4">{member.role}</div>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {member.bio}
                    </p>
                    
                    <div className="flex gap-4 mt-auto">
                      {member.linkedin && (
                        <a href={member.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {member.twitter && (
                        <a href={member.twitter} className="text-muted-foreground hover:text-primary transition-colors">
                          <Twitter className="w-5 h-5" />
                        </a>
                      )}
                      {member.website && (
                        <a href={member.website} className="text-muted-foreground hover:text-primary transition-colors">
                          <Globe className="w-5 h-5" />
                        </a>
                      )}
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
