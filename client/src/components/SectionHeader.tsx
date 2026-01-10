import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({ title, subtitle, className, align = "left" }: SectionHeaderProps) {
  return (
    <div className={cn(
      "mb-12 space-y-4", 
      align === "center" && "text-center mx-auto max-w-3xl",
      className
    )}>
      <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <div className={cn("w-20 h-1 bg-primary rounded-full", align === "center" && "mx-auto")} />
      )}
      {subtitle && (
        <p className="text-muted-foreground text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
