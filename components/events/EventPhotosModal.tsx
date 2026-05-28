"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Camera, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ComardenEvent } from "@/types/events";
import { Lightbox } from "@/components/ui/Lightbox";
import { VideoThumb } from "@/components/media/VideoEmbed";
import { splitDate } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";

interface EventPhotosModalProps {
  event: ComardenEvent | null;
  onClose: () => void;
}

export function EventPhotosModal({ event, onClose }: EventPhotosModalProps) {
  const [lbIndex, setLbIndex] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const open = event !== null;

  // Reset lightbox when event changes
  useEffect(() => {
    setLbIndex(null);
  }, [event]);

  // Body scroll lock + ESC
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lbIndex === null) onClose();
    };
    window.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, lbIndex, onClose]);

  // Focus trap
  useEffect(() => {
    if (!open || lbIndex !== null) return;
    const el = panelRef.current;
    if (!el) return;
    const focusable = Array.from(
      el.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input, [tabindex]:not([tabindex="-1"])'
      )
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    el.addEventListener("keydown", trap);
    return () => el.removeEventListener("keydown", trap);
  }, [open, lbIndex]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && lbIndex === null) onClose();
    },
    [onClose, lbIndex]
  );

  if (!event) return null;

  const { day, month, year } = splitDate(event.date);
  const hasMedia = event.media.length > 0;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="photos-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[80] flex items-end justify-center bg-primary-dark/80 backdrop-blur-sm sm:items-center sm:p-4"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-label={`Photos — ${event.title}`}
          >
            <motion.div
              ref={panelRef}
              key="photos-panel"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-3xl"
              style={{ maxHeight: "92dvh" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex shrink-0 items-start justify-between border-b border-primary/8 bg-white px-5 py-4 sm:px-7 sm:py-5">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-accent">
                    <Camera className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="truncate text-base font-extrabold text-primary sm:text-lg">
                      {event.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
                      <span className="text-xs text-ink-light">
                        {day} {month} {year}
                      </span>
                      {event.audience && (
                        <Badge variant="accent" className="py-0 text-[0.6rem]">
                          {event.audience}
                        </Badge>
                      )}
                      <span className="text-xs text-ink-light">
                        {event.media.length} média{event.media.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  ref={closeBtnRef}
                  type="button"
                  aria-label="Fermer"
                  onClick={onClose}
                  className="ml-3 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral text-primary transition hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Gallery grid */}
              <div className="overflow-y-auto overscroll-contain p-4 sm:p-6">
                {hasMedia ? (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-4">
                    {event.media.map((m, i) => (
                      <div
                        key={m.src + (m.youtubeId ?? "") + i}
                        className="group relative overflow-hidden rounded-xl bg-primary/8"
                      >
                        {m.type === "video" ? (
                          <div className="aspect-video">
                            <VideoThumb
                              youtubeId={m.youtubeId}
                              src={m.src}
                              alt={m.alt}
                              poster={m.poster}
                              onOpen={() => setLbIndex(i)}
                            />
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setLbIndex(i)}
                            aria-label={`Agrandir : ${m.alt}`}
                            className="aspect-[4/3] w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                          >
                            {/* skeleton */}
                            <div className="absolute inset-0 animate-pulse bg-primary/5" />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={m.src}
                              alt={m.alt}
                              loading="lazy"
                              className="relative h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                            />
                            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/25 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 py-16 text-center">
                    <Camera className="h-10 w-10 text-primary/30" />
                    <p className="text-sm font-semibold text-ink-light">
                      Photos bientôt disponibles.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox stacks above the modal */}
      <Lightbox
        items={event?.media ?? []}
        index={lbIndex}
        onClose={() => setLbIndex(null)}
        onChange={setLbIndex}
      />
    </>
  );
}
