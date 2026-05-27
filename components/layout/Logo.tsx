import { cn } from "@/lib/utils";

// TODO: replace this wordmark with the real Comarden logo SVG once provided.
// For now we render a clean text wordmark — the "O" is highlighted in accent
// yellow as a stand-in for the roof-chevron accent in the official mark.
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline font-extrabold tracking-tight", className)}>
      <span className="text-xl sm:text-2xl">C</span>
      <span className="text-xl sm:text-2xl text-accent">O</span>
      <span className="text-xl sm:text-2xl">MARDEN</span>
      <span className="ml-2 hidden text-[0.65rem] font-bold uppercase tracking-kicker opacity-70 sm:inline">
        Events
      </span>
    </span>
  );
}
