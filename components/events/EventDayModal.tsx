"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Calendar, Camera, X } from "lucide-react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import type { ComardenEvent } from "@/types/events";
import { formatDateFrLong } from "@/lib/calendar";
import { splitDate } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";

interface EventDayModalProps {
  events: ComardenEvent[];
  date: Date | null;
  onClose: () => void;
  onPhotos: (event: ComardenEvent) => void;
}

export function EventDayModal({ events, date, onClose, onPhotos }: EventDayModalProps) {
  const open = date !== null && events.length > 0;
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && date && (
        <motion.div
          key="day-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[75] flex items-end justify-center bg-primary-dark/70 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          role="dialog"
          aria-modal="true"
          aria-label="Événements du jour"
        >
          <motion.div
            key="day-modal-panel"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-primary/8 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-primary">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[0.7rem] font-bold uppercase tracking-kicker text-accent">
                    Événement{events.length > 1 ? "s" : ""}
                  </p>
                  <p className="text-sm font-bold text-primary capitalize">
                    {formatDateFrLong(date)}
                  </p>
                </div>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                aria-label="Fermer"
                onClick={onClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral text-primary transition hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Event list */}
            <div className="divide-y divide-primary/5 overflow-y-auto" style={{ maxHeight: "60dvh" }}>
              {events.map((event) => {
                const { day, month } = splitDate(event.date);
                return (
                  <div key={event.slug} className="px-5 py-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-accent/15 text-primary">
                        <span className="text-lg font-extrabold leading-none">{day}</span>
                        <span className="text-[0.6rem] font-bold uppercase tracking-kicker">{month}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-bold text-primary">{event.title}</h3>
                          {event.audience && (
                            <Badge variant="accent" className="py-0 text-[0.6rem]">
                              {event.audience}
                            </Badge>
                          )}
                        </div>
                        {event.location && (
                          <p className="mt-0.5 text-xs text-ink-light">{event.location}</p>
                        )}
                        <p className="mt-1.5 text-xs leading-relaxed text-ink-light line-clamp-2">
                          {event.teaser}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {event.media.length > 0 && (
                            <button
                              type="button"
                              onClick={() => { onClose(); onPhotos(event); }}
                              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-xs font-bold text-primary transition hover:bg-accent-light"
                            >
                              <Camera className="h-3.5 w-3.5" />
                              Photos
                            </button>
                          )}
                          <Link
                            href={`/evenements/${event.slug}`}
                            onClick={onClose}
                            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-primary-light"
                          >
                            Découvrir
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
