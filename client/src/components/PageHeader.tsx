import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description?: string;
  pattern?: "dots" | "grid";
}

export function PageHeader({ title, description, pattern = "dots" }: PageHeaderProps) {
  return (
    <div className="relative bg-primary/5 py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-primary tracking-tight mb-6">
            {title}
          </h1>
          {description && (
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </motion.div>
      </div>

      {/* Decorative background elements */}
      {pattern === "dots" && (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
      )}
      {pattern === "grid" && (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(to right, var(--primary) 1px, transparent 1px), linear-gradient(to bottom, var(--primary) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      )}
      
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
    </div>
  );
}
