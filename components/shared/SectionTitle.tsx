import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
  return (
    <div className={cn("text-center", className)}>
      <h2 className="font-poppins text-2xl font-bold text-sfs-text-primary sm:text-3xl">
        {title}
      </h2>
      <span className="mx-auto mt-2 block h-1 w-16 rounded-full bg-primary-green" />
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-sfs-text-secondary">{subtitle}</p>
      )}
    </div>
  );
}
