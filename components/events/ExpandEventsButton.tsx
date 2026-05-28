"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpandEventsButtonProps {
  expanded: boolean;
  remaining: number;
  onClick: () => void;
  className?: string;
}

/**
 * Expand / collapse control for the events timeline.
 *
 * Affordance cues (all respect prefers-reduced-motion):
 *  1. Chevron icon bounces softly on a loop while collapsed → signals "click me"
 *  2. Hover: button lifts (y -2px) + shadow-glow yellow ring kicks in → feels interactive
 *  3. Yellow "+N" count chip + animated continuation dots above → communicates hidden content
 */
export function ExpandEventsButton({
  expanded,
  remaining,
  onClick,
  className,
}: ExpandEventsButtonProps) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {/* Continuation indicator — only when collapsed */}
      {!expanded && <ContinuationDots />}

      <motion.button
        type="button"
        onClick={onClick}
        aria-expanded={expanded}
        /* Lift on hover; tactile press on tap */
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
        /* shadow-glow on :hover is handled via CSS transition (no FM conflict) */
        className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-full bg-primary px-5 py-2.5 text-white shadow-soft [transition:box-shadow_0.22s_ease] hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:px-6 sm:py-3"
      >
        {/* Count chip — yellow pill showing how many are hidden; hidden when expanded */}
        {!expanded && (
          <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-accent px-1.5 text-[0.6rem] font-extrabold leading-none text-primary">
            +{remaining}
          </span>
        )}

        {/* Label — shorter on very narrow viewports */}
        <span className="text-sm font-bold">
          {expanded ? (
            "Voir moins"
          ) : (
            <>
              <span className="sm:hidden">Voir {remaining} de plus</span>
              <span className="hidden sm:inline">
                {remaining === 1
                  ? "Voir le dernier événement"
                  : `Voir les ${remaining} autres événements`}
              </span>
            </>
          )}
        </span>

        {/* Chevron badge — bounces when collapsed, static when expanded */}
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-white/30">
          <motion.span
            className="flex items-center justify-center"
            animate={!reduce && !expanded ? { y: [0, 3, 0] } : { y: 0 }}
            transition={
              !reduce && !expanded
                ? { repeat: Infinity, duration: 1.8, ease: "easeInOut" }
                : { duration: 0.2 }
            }
          >
            {expanded ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </motion.span>
        </span>
      </motion.button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ContinuationDots — subtle vertical line + pulsing dots above the button
// that lead the eye downward and signal "the timeline continues"
// ─────────────────────────────────────────────────────────────────────────────

function ContinuationDots() {
  const reduce = useReducedMotion();

  return (
    <div className="mb-5 flex flex-col items-center gap-2.5">
      {/* Short vertical accent line */}
      <div className="h-7 w-px bg-gradient-to-b from-accent/60 to-accent/10" />

      {/* Three dots that pulse left-to-right in turn */}
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-primary/25"
            animate={reduce ? {} : { opacity: [0.2, 1, 0.2] }}
            transition={
              reduce
                ? {}
                : {
                    repeat: Infinity,
                    duration: 1.6,
                    delay: i * 0.22,
                    ease: "easeInOut",
                  }
            }
          />
        ))}
      </div>
    </div>
  );
}
