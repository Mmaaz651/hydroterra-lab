import { SectionHeader } from "@/components/SectionHeader";
import { Link } from "wouter";
import { ArrowRight, Activity, Globe, Droplets, Database, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNewsList, useResearchAreas } from "@/hooks/use-lab-data";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: news, isLoading: newsLoading } = useNewsList();
  const { data: research, isLoading: researchLoading } = useResearchAreas();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-24 md:py-32 overflow-hidden">
        {/* Abstract shapes/bg */}
        <div className="absolute inset-0 opacity-10 pattern-grid-lg" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform translate-x-1/4" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium tracking-wide">
                Welcome to AIMMLab
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-[1.1] tracking-tight">
                Artificial Intelligence & Mathematical Modelling
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed max-w-xl">
                We design and deploy AI and mathematical methodologies to enhance public health preparedness 
                and response to emerging infectious disease outbreaks and environmental challenges.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/research">
                  <button className="bg-white text-primary px-8 py-3.5 rounded-lg font-semibold hover:bg-white/90 transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2 group">
                    Our Research
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/join-us">
                  <button className="bg-transparent border border-white/30 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-white/10 transition-all active:scale-95">
                    Join the Team
                  </button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden md:block"
            >
               {/* Network Visualization Placeholder - Represents AI/Math Model */}
               <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-8 flex items-center justify-center">
                 <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-accent/40 opacity-50" />
                 {/* Decorative circles representing nodes */}
                 <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-accent rounded-full animate-pulse" />
                 <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-white rounded-full animate-pulse delay-700" />
                 <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-secondary rounded-full animate-pulse delay-300" />
                 
                 {/* Connection lines (SVG) */}
                 <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
                   <path d="M25 25 L75 75" stroke="white" strokeWidth="0.5" />
                   <path d="M25 25 L50 66" stroke="white" strokeWidth="0.5" />
                   <path d="M75 75 L50 66" stroke="white" strokeWidth="0.5" />
                 </svg>

                 <div className="relative text-center space-y-4">
                   <div className="mx-auto w-24 h-24 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                     <Activity className="w-10 h-10 text-white" />
                   </div>
                   <h3 className="text-2xl font-display font-semibold">Data Driven Solutions</h3>
                   <p className="text-sm text-white/70">Bridging the gap between theory and application</p>
                 </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Research Areas Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader 
            title="Our Research Areas" 
            subtitle="We focus on developing novel methodologies for complex socio-ecological challenges."
            align="center"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Hardcoded for immediate visual if DB empty, but wired to be dynamic */}
            <ResearchCard 
              icon={<Activity className="w-8 h-8" />}
              title="Disease Modeling"
              desc="Mathematical models for infectious disease transmission and control strategies."
              href="/research/disease-modeling"
              delay={0}
            />
            <ResearchCard 
              icon={<Droplets className="w-8 h-8" />}
              title="Aquatic Ecosystems"
              desc="Understanding dynamics of aquatic environments and impact of pollutants."
              href="/research/aquatic-ecosystems"
              delay={0.1}
            />
            <ResearchCard 
              icon={<Globe className="w-8 h-8" />}
              title="GHG Emissions"
              desc="Estimating greenhouse gas emissions from industrial sources."
              href="/research/ghg-emissions"
              delay={0.2}
            />
            <ResearchCard 
              icon={<Database className="w-8 h-8" />}
              title="AI & Data Science"
              desc="Leveraging machine learning for complex pattern recognition in biological data."
              href="/research/data-science"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Latest News Preview */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <SectionHeader title="Latest Updates" className="mb-0" />
            <Link href="/news">
              <span className="flex items-center gap-1 text-primary font-medium hover:underline cursor-pointer">
                View all news <ChevronRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {newsLoading ? (
               Array(3).fill(0).map((_, i) => (
                 <div key={i} className="space-y-3">
                   <Skeleton className="h-48 w-full rounded-xl" />
                   <Skeleton className="h-4 w-3/4" />
                   <Skeleton className="h-4 w-1/2" />
                 </div>
               ))
            ) : (
              news?.slice(0, 3).map((item, i) => (
                <NewsCard key={item.id} item={item} index={i} />
              ))
            )}
            
            {!newsLoading && (!news || news.length === 0) && (
              <div className="col-span-3 text-center py-12 text-muted-foreground">
                No news updates yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Interested in joining our lab?</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            We are always looking for passionate researchers, postdocs, and students to join our dynamic team.
          </p>
          <Link href="/join-us">
            <button className="bg-white text-primary px-10 py-4 rounded-lg font-bold text-lg hover:bg-secondary transition-all shadow-xl hover:shadow-2xl active:scale-95">
              Explore Opportunities
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function ResearchCard({ icon, title, desc, href, delay }: { icon: React.ReactNode, title: string, desc: string, href: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <Link href={href} className="block h-full">
        <div className="bg-card border hover:border-primary/50 rounded-xl p-6 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group cursor-pointer flex flex-col">
          <div className="bg-primary/5 text-primary w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-bold font-display mb-3 text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed flex-grow">
            {desc}
          </p>
          <div className="mt-6 flex items-center text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
            Learn more <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function NewsCard({ item, index }: { item: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group cursor-pointer"
    >
      <Link href={`/news`}>
        <div className="bg-card rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition-all h-full flex flex-col">
          {item.imageUrl ? (
            <div className="aspect-video overflow-hidden">
               {/* News image */}
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ) : (
            <div className="aspect-video bg-secondary flex items-center justify-center text-muted-foreground">
              <Activity className="h-8 w-8 opacity-20" />
            </div>
          )}
          <div className="p-6 flex flex-col flex-grow">
            <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              {new Date(item.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <h3 className="text-xl font-bold font-display mb-3 group-hover:text-primary transition-colors line-clamp-2">
              {item.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">
              {item.content}
            </p>
            <div className="text-primary text-sm font-medium flex items-center group-hover:underline mt-auto">
              Read Story
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
