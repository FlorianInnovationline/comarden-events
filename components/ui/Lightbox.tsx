"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import type { EventMedia } from "@/types/events";

interface LightboxProps {
  items: EventMedia[];
  index: number | null;
  onClose: () => void;
  onChange: (next: number) => void;
}

export function Lightbox({ items, index, onClose, onChange }: LightboxProps) {
  const open = index !== null && index >= 0 && index < items.length;
  const touchStartX = useRef<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const goPrev = useCallback(() => {
    if (index === null) return;
    onChange((index - 1 + items.length) % items.length);
  }, [index, items.length, onChange]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onChange((index + 1) % items.length);
  }, [index, items.length, onChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, goPrev, goNext, onClose]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(dx) > 50) {
      dx > 0 ? goPrev() : goNext();
    }
    touchStartX.current = null;
  };

  const current = open ? items[index!] : null;

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Galerie — visionneuse plein écran"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-primary-dark/95 backdrop-blur"
          onClick={onClose}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            ref={closeBtnRef}
            type="button"
            aria-label="Fermer"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white shadow-lg backdrop-blur transition hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:right-6 sm:top-6"
          >
            <X className="h-5 w-5" />
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Précédent"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-2 top-auto bottom-6 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white shadow-lg backdrop-blur transition hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:left-6 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                aria-label="Suivant"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-2 top-auto bottom-6 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white shadow-lg backdrop-blur transition hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:right-6 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[88vh] w-[92vw] max-w-5xl flex-col items-center px-2 sm:px-0"
            onClick={(e) => e.stopPropagation()}
          >
            {current.type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={current.src}
                alt={current.alt}
                className="mx-auto max-h-[72vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl sm:max-h-[80vh]"
              />
            ) : (
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
                {current.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${current.youtubeId}?autoplay=1&rel=0`}
                    title={current.alt}
                    className="absolute inset-0 h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={current.src}
                    controls
                    autoPlay
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                )}
              </div>
            )}
            <p className="mt-3 max-w-full px-4 text-center text-xs text-white/70 sm:mt-4 sm:text-sm">
              <span className="break-words">{current.alt}</span>
              <span className="ml-3 opacity-60">
                {index! + 1} / {items.length}
              </span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
