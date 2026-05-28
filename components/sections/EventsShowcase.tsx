"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CalendarClock,
  CalendarDays,
  ChevronDown,
  LayoutList,
  Sparkles,
} from "lucide-react";
import type { ComardenEvent } from "@/types/events";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { EventTimeline } from "@/components/events/EventTimeline";
import { CalendarView } from "@/components/sections/CalendarView";
import { EventPhotosModal } from "@/components/events/EventPhotosModal";
import { EventDayModal } from "@/components/events/EventDayModal";
import { cn } from "@/lib/utils";

interface EventsShowcaseProps {
  events: ComardenEvent[];
}

type Filter = "past" | "upcoming";
type View = "liste" | "calendrier";

export function EventsShowcase({ events }: EventsShowcaseProps) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("upcoming");
  const [view, setView] = useState<View>("liste");
  const [photosEvent, setPhotosEvent] = useState<ComardenEvent | null>(null);
  const [dayModal, setDayModal] = useState<{
    events: ComardenEvent[];
    date: Date;
  } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const filtered = useMemo(() => {
    const list = events.filter((e) => e.status === filter);
    return list.sort((a, b) => {
      const aT = new Date(a.date).getTime();
      const bT = new Date(b.date).getTime();
      return filter === "upcoming" ? aT - bT : bT - aT;
    });
  }, [events, filter]);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      setScrolled(scrollRef.current.scrollTop > 40);
    }
  }, []);

  const handleDayClick = useCallback(
    (evts: ComardenEvent[], date: Date) => {
      setDayModal({ events: evts, date });
    },
    []
  );

  const handlePhotosClick = useCallback((event: ComardenEvent) => {
    setPhotosEvent(event);
  }, []);

  const handleSetFilter = (f: Filter) => {
    setFilter(f);
    setScrolled(false);
  };

  const handleSetView = (v: View) => {
    setView(v);
    if (v === "liste") setScrolled(false);
  };

  const filterKey = `${filter}-${view}`;
  const showScrollHint = !scrolled && view === "liste" && filtered.length > 2;

  const contentKey =
    filtered.length === 0
      ? "empty"
      : view === "calendrier"
      ? `cal-${filter}`
      : `liste-${filter}`;

  return (
    <section id="evenements" className="relative bg-white py-14 sm:py-20 lg:py-28">
      <div className="container">
        {/* Header row */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            kicker="Nos rendez-vous"
            title="Les événements Comarden"
            description="Découvrez nos formats — passés et à venir — et plongez dans les comptes-rendus, partenaires et souvenirs."
            className="sm:max-w-xl lg:max-w-2xl"
          />

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3 sm:shrink-0">
            {/* Passés / À venir */}
            <div className="flex items-center rounded-full bg-neutral p-1 ring-1 ring-primary/10">
              <PillTab
                layoutId="filter-pill"
                active={filter === "upcoming"}
                onClick={() => handleSetFilter("upcoming")}
                icon={<Sparkles className="h-3.5 w-3.5" />}
                label="À venir"
              />
              <PillTab
                layoutId="filter-pill"
                active={filter === "past"}
                onClick={() => handleSetFilter("past")}
                icon={<CalendarClock className="h-3.5 w-3.5" />}
                label="Passés"
              />
            </div>

            {/* Liste / Calendrier */}
            <div className="flex items-center rounded-full bg-neutral p-1 ring-1 ring-primary/10">
              <PillTab
                layoutId="view-pill"
                active={view === "liste"}
                onClick={() => handleSetView("liste")}
                icon={<LayoutList className="h-3.5 w-3.5" />}
                label="Liste"
              />
              <PillTab
                layoutId="view-pill"
                active={view === "calendrier"}
                onClick={() => handleSetView("calendrier")}
                icon={<CalendarDays className="h-3.5 w-3.5" />}
                label="Calendrier"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative mt-10 sm:mt-14">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0.001 : 0.3 }}
                className="rounded-2xl border-2 border-dashed border-primary/15 bg-neutral p-10 text-center"
              >
                <Sparkles className="mx-auto h-8 w-8 text-accent" />
                <p className="mt-4 heading-md text-primary">
                  De nouveaux événements arrivent bientôt.
                </p>
                <p className="mt-2 text-sm text-ink-light">
                  Restez connectés — on prépare les prochains rendez-vous Comarden.
                </p>
              </motion.div>
            ) : view === "calendrier" ? (
              <motion.div
                key={contentKey}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: reduce ? 0.001 : 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <CalendarView
                  events={filtered}
                  onDayClick={handleDayClick}
                  filterKey={filterKey}
                />
              </motion.div>
            ) : (
              <motion.div
                key={contentKey}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: reduce ? 0.001 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Top fade — appears once user scrolls */}
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-white to-transparent transition-opacity duration-300",
                    scrolled ? "opacity-100" : "opacity-0"
                  )}
                />

                {/* Scrollable timeline */}
                <div
                  ref={scrollRef}
                  onScroll={handleScroll}
                  className="timeline-scroll relative max-h-[680px] overflow-y-auto overscroll-contain px-1 py-2 md:max-h-[860px]"
                >
                  <EventTimeline events={filtered} onPhotosClick={handlePhotosClick} />
                </div>

                {/* Bottom fade */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-white to-transparent"
                />

                {/* Scroll hint chevron */}
                <AnimatePresence>
                  {showScrollHint && (
                    <motion.div
                      key="scroll-hint"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.3 }}
                      className="pointer-events-none absolute bottom-5 left-1/2 z-20 -translate-x-1/2"
                    >
                      <motion.div
                        animate={reduce ? {} : { y: [0, 5, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.6,
                          ease: "easeInOut",
                        }}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-primary shadow-soft"
                      >
                        <ChevronDown className="h-5 w-5" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modals — rendered outside the scrollable container */}
      <EventDayModal
        events={dayModal?.events ?? []}
        date={dayModal?.date ?? null}
        onClose={() => setDayModal(null)}
        onPhotos={(event) => {
          setDayModal(null);
          setPhotosEvent(event);
        }}
      />
      <EventPhotosModal
        event={photosEvent}
        onClose={() => setPhotosEvent(null)}
      />
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PillTab — animated sliding pill indicator
// ─────────────────────────────────────────────────────────────────────────────

interface PillTabProps {
  layoutId: string;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function PillTab({ layoutId, active, onClick, icon, label }: PillTabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex min-h-[44px] items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold transition-colors sm:px-4 sm:text-sm",
        active ? "text-primary" : "text-ink-light hover:text-primary"
      )}
    >
      {active && (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 -z-0 rounded-full bg-white shadow-soft ring-1 ring-primary/5"
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-1.5">
        {icon}
        {label}
      </span>
    </button>
  );
}
