"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarClock, Sparkles } from "lucide-react";
import type { ComardenEvent } from "@/types/events";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { EventTimeline } from "@/components/events/EventTimeline";
import { cn } from "@/lib/utils";

interface EventsShowcaseProps {
  events: ComardenEvent[];
}

type Filter = "past" | "upcoming";

export function EventsShowcase({ events }: EventsShowcaseProps) {
  const [filter, setFilter] = useState<Filter>("past");

  const filtered = useMemo(
    () => events.filter((e) => e.status === filter),
    [events, filter]
  );

  return (
    <section id="evenements" className="relative bg-white py-14 sm:py-20 lg:py-28">
      <div className="container">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionTitle
            kicker="Nos rendez-vous"
            title="Les événements Comarden"
            description="Découvrez nos formats — passés et à venir — et plongez dans les comptes-rendus, partenaires et souvenirs."
            className="md:max-w-2xl"
          />

          <div className="flex w-full max-w-xs items-center rounded-full bg-neutral p-1 ring-1 ring-primary/10 md:w-auto">
            <FilterTab
              active={filter === "past"}
              onClick={() => setFilter("past")}
              icon={<CalendarClock className="h-4 w-4" />}
              label="Passés"
            />
            <FilterTab
              active={filter === "upcoming"}
              onClick={() => setFilter("upcoming")}
              icon={<Sparkles className="h-4 w-4" />}
              label="À venir"
            />
          </div>
        </div>

        <div className="relative mt-10 sm:mt-14">
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={filter}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                <EventTimeline events={filtered} />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border-2 border-dashed border-primary/15 bg-neutral p-10 text-center"
              >
                <Sparkles className="mx-auto h-8 w-8 text-accent" />
                <p className="mt-4 heading-md text-primary">De nouveaux événements arrivent bientôt.</p>
                <p className="mt-2 text-sm text-ink-light">
                  Restez connectés — on prépare les prochains rendez-vous Comarden.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function FilterTab({
  active,
  onClick,
  icon,
  label
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-colors md:flex-none md:px-5",
        active ? "text-primary" : "text-ink-light hover:text-primary"
      )}
    >
      {active && (
        <motion.span
          layoutId="filter-pill"
          className="absolute inset-0 -z-0 rounded-full bg-white shadow-soft ring-1 ring-primary/5"
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {icon}
        {label}
      </span>
    </button>
  );
}
