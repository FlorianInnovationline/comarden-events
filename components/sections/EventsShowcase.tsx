"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CalendarClock,
  CalendarDays,
  LayoutList,
  Sparkles,
} from "lucide-react";
import type { ComardenEvent } from "@/types/events";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { EventTimeline } from "@/components/events/EventTimeline";
import { CalendarView } from "@/components/sections/CalendarView";
import { EventPhotosModal } from "@/components/events/EventPhotosModal";
import { EventDayModal } from "@/components/events/EventDayModal";
import { ExpandEventsButton } from "@/components/events/ExpandEventsButton";
import { cn } from "@/lib/utils";

interface EventsShowcaseProps {
  events: ComardenEvent[];
}

type Filter = "past" | "upcoming";
type View = "liste" | "calendrier";

const COLLAPSED_COUNT = 2;

export function EventsShowcase({ events }: EventsShowcaseProps) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<Filter>("past");
  const [view, setView] = useState<View>("liste");
  const [expanded, setExpanded] = useState(false);
  const [photosEvent, setPhotosEvent] = useState<ComardenEvent | null>(null);
  const [dayModal, setDayModal] = useState<{
    events: ComardenEvent[];
    date: Date;
  } | null>(null);

  const filtered = useMemo(() => {
    const list = events.filter((e) => e.status === filter);
    return list.sort((a, b) => {
      const aT = new Date(a.date).getTime();
      const bT = new Date(b.date).getTime();
      return filter === "upcoming" ? aT - bT : bT - aT;
    });
  }, [events, filter]);

  const visibleEvents = expanded
    ? filtered
    : filtered.slice(0, COLLAPSED_COUNT);
  const remaining = filtered.length - COLLAPSED_COUNT;
  const hasMore = remaining > 0;

  const handleDayClick = useCallback((evts: ComardenEvent[], date: Date) => {
    setDayModal({ events: evts, date });
  }, []);

  const handlePhotosClick = useCallback((event: ComardenEvent) => {
    setPhotosEvent(event);
  }, []);

  const handleSetFilter = (f: Filter) => {
    setFilter(f);
    setExpanded(false);
  };

  const handleSetView = (v: View) => {
    setView(v);
    setExpanded(false);
  };

  const handleToggleExpand = () => {
    if (expanded) {
      setExpanded(false);
      // Bring the section heading back into view after collapsing.
      sectionRef.current?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    } else {
      setExpanded(true);
    }
  };

  const filterKey = `${filter}-${view}`;

  const contentKey =
    filtered.length === 0
      ? "empty"
      : view === "calendrier"
      ? `cal-${filter}`
      : `liste-${filter}`;

  return (
    <section
      ref={sectionRef}
      id="evenements"
      className="relative scroll-mt-24 bg-white py-14 sm:py-20 lg:py-28"
    >
      <div className="container">
        {/* Header row */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            kicker="Nos rendez-vous"
            title="Les événements Comarden"
            description="Découvrez nos formats passés et à venir, et plongez dans les comptes-rendus, les partenaires et les souvenirs."
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
                  Restez connectés, on prépare les prochains rendez-vous Comarden.
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
              >
                <EventTimeline
                  events={visibleEvents}
                  onPhotosClick={handlePhotosClick}
                />

                {hasMore && (
                  <div className="mt-10 sm:mt-12">
                    <ExpandEventsButton
                      expanded={expanded}
                      remaining={remaining}
                      onClick={handleToggleExpand}
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modals */}
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
