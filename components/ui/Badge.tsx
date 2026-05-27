import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "accent" | "navy" | "outline" | "ghost";
}

export function Badge({ children, className, variant = "accent" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-kicker",
        variant === "accent" && "bg-accent text-primary",
        variant === "navy" && "bg-primary text-white",
        variant === "outline" && "border border-primary/20 bg-white text-primary",
        variant === "ghost" && "bg-white/10 text-white",
        className
      )}
    >
      {children}
    </span>
  );
}

interface DateBadgeProps {
  day: string;
  month: string;
  year?: string;
  className?: string;
}

export function DateBadge({ day, month, year, className }: DateBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex w-16 flex-col items-center justify-center rounded-2xl bg-accent px-3 py-2 text-primary shadow-soft",
        className
      )}
    >
      <span className="text-2xl font-extrabold leading-none">{day}</span>
      <span className="mt-1 text-[0.65rem] font-bold uppercase tracking-kicker">{month}</span>
      {year && <span className="text-[0.6rem] font-semibold opacity-70">{year}</span>}
    </div>
  );
}
