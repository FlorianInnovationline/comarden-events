"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ComardenEvent } from "@/types/events";
import {
  DAYS_FR_LETTER,
  DAYS_FR_SHORT,
  MONTHS_FR,
  buildCalendarGrid,
  isSameDay,
  offsetMonth
} from "@/lib/calendar";
import { cn } from "@/lib/utils";

interface CalendarViewProps {
  events: ComardenEvent[];
  onDayClick: (events: ComardenEvent[], date: Date) => void;
  /** When this changes (filter switch), calendar resets to the relevant month. */
  filterKey: string;
}

export function CalendarView({ events, onDayClick, filterKey }: CalendarViewProps) {
  const reduce = useReducedMotion();

  // Default to the month of the nearest event in the filtered list
  const defaultYM = useMemo(() => {
    const sorted = [...events].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    // For past events (sorted descending when caller sorts), we want most recent.
    // `events` are already filtered by the parent — just take the first one.
    const target = sorted[0];
    if (target) {
      const d = new Date(target.date);
      return { year: d.getFullYear(), month: d.getMonth() };
    }
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  }, [events]);

  const [year, setYear] = useState(defaultYM.year);
  const [month, setMonth] = useState(defaultYM.month);
  const [dir, setDir] = useState(0); // +1 = forward, -1 = back
  const prevFilterKey = useRef(filterKey);

  // Reset when filter changes
  useEffect(() => {
    if (prevFilterKey.current !== filterKey) {
      prevFilterKey.current = filterKey;
      setYear(defaultYM.year);
      setMonth(defaultYM.month);
    }
  }, [filterKey, defaultYM]);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const weeks = useMemo(() => buildCalendarGrid(year, month), [year, month]);

  // Build a lookup: "YYYY-MM-DD" → events[]
  const eventsByDay = useMemo(() => {
    const map = new Map<string, ComardenEvent[]>();
    for (const e of events) {
      const key = e.date.slice(0, 10);
      const existing = map.get(key) ?? [];
      map.set(key, [...existing, e]);
    }
    return map;
  }, [events]);

  const goToMonth = (delta: number) => {
    setDir(delta);
    const next = offsetMonth(year, month, delta);
    setYear(next.year);
    setMonth(next.month);
  };

  const goToToday = () => {
    const now = new Date();
    setDir(0);
    setYear(now.getFullYear());
    setMonth(now.getMonth());
  };

  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month;

  const variants = {
    initial: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * 28 }),
    animate: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * -28 })
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-primary/8 bg-white shadow-soft">
      {/* Month navigation header */}
      <div className="flex items-center justify-between border-b border-primary/8 px-4 py-3 sm:px-6">
        <button
          type="button"
          aria-label="Mois précédent"
          onClick={() => goToMonth(-1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral text-primary transition hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3">
          <h3 className="text-base font-extrabold capitalize text-primary sm:text-lg">
            {MONTHS_FR[month]} {year}
          </h3>
          {!isCurrentMonth && (
            <button
              type="button"
              onClick={goToToday}
              className="rounded-full border border-primary/15 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-kicker text-primary transition hover:border-accent hover:text-accent-dark"
            >
              Aujourd&apos;hui
            </button>
          )}
        </div>

        <button
          type="button"
          aria-label="Mois suivant"
          onClick={() => goToMonth(1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral text-primary transition hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-primary/8 bg-neutral/60">
        {DAYS_FR_SHORT.map((label, i) => (
          <div
            key={label}
            className="py-2 text-center text-[0.6rem] font-bold uppercase tracking-kicker text-ink-light sm:text-xs"
          >
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{DAYS_FR_LETTER[i]}</span>
          </div>
        ))}
      </div>

      {/* Calendar grid with month-slide animation */}
      <div className="relative overflow-hidden">
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={`${year}-${month}`}
            custom={dir}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {weeks.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7 border-b border-primary/5 last:border-b-0">
                {week.map((cell, di) => {
                  if (!cell.date) {
                    return <div key={di} className="h-10 bg-neutral/30 sm:h-14" />;
                  }

                  const dateKey = [
                    cell.date.getFullYear(),
                    String(cell.date.getMonth() + 1).padStart(2, "0"),
                    String(cell.date.getDate()).padStart(2, "0")
                  ].join("-");
                  const dayEvents = eventsByDay.get(dateKey) ?? [];
                  const hasEvents = dayEvents.length > 0;
                  const isToday = isSameDay(cell.date, today);

                  return (
                    <div
                      key={di}
                      className={cn(
                        "relative h-10 border-r border-primary/5 last:border-r-0 sm:h-14",
                        hasEvents && "cursor-pointer"
                      )}
                    >
                      {hasEvents ? (
                        <button
                          type="button"
                          onClick={() => onDayClick(dayEvents, cell.date!)}
                          className={cn(
                            "group absolute inset-0 flex flex-col items-center justify-start pt-1.5 sm:pt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent",
                            "transition-colors hover:bg-accent/10"
                          )}
                          aria-label={`${cell.date.getDate()} — ${dayEvents.length} événement${dayEvents.length > 1 ? "s" : ""}`}
                        >
                          {/* Day number */}
                          <span
                            className={cn(
                              "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-colors sm:h-7 sm:w-7 sm:text-sm",
                              isToday
                                ? "bg-primary text-white"
                                : "bg-accent text-primary group-hover:bg-accent-dark"
                            )}
                          >
                            {cell.date.getDate()}
                          </span>
                          {/* Event dots */}
                          <div className="mt-1 flex items-center justify-center gap-0.5">
                            {dayEvents.length === 1 ? (
                              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            ) : (
                              <span className="rounded-full bg-primary px-1 text-[0.55rem] font-bold text-white">
                                {dayEvents.length}
                              </span>
                            )}
                          </div>
                        </button>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-start pt-1.5 sm:pt-2">
                          <span
                            className={cn(
                              "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold sm:h-7 sm:w-7 sm:text-sm",
                              isToday
                                ? "bg-primary/10 font-bold text-primary ring-1 ring-primary/30"
                                : "text-ink-light"
                            )}
                          >
                            {cell.date.getDate()}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 border-t border-primary/8 px-4 py-3 text-xs text-ink-light sm:px-6">
        <span className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded-full bg-accent" />
          Événement
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded-full bg-primary" />
          Aujourd&apos;hui
        </span>
      </div>
    </div>
  );
}
