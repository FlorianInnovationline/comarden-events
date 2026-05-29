"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, MapPin, Briefcase, ArrowRight } from "lucide-react";
import type { JobPosting } from "@/types/jobs";

interface JobDetailModalProps {
  job: JobPosting | null;
  onClose: () => void;
  onApply: (slug: string) => void;
}

export function JobDetailModal({ job, onClose, onApply }: JobDetailModalProps) {
  const reduce = useReducedMotion();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const open = job !== null;

  // ESC to close + lock scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && job && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.001 : 0.2 }}
            className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm"
            aria-hidden
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label={job.title}
            initial={{ opacity: 0, y: reduce ? 0 : 32, scale: reduce ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : 16, scale: reduce ? 1 : 0.98 }}
            transition={{
              type: "spring",
              stiffness: 340,
              damping: 28,
              duration: reduce ? 0.001 : undefined,
            }}
            className="fixed inset-x-4 top-[50%] z-50 mx-auto max-w-xl -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-glow ring-1 ring-primary/10 sm:inset-x-auto sm:left-1/2 sm:w-full sm:-translate-x-1/2"
          >
            {/* Yellow top bar */}
            <div className="h-1.5 w-full bg-accent" aria-hidden />

            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-6 pb-4 pt-5 sm:px-7">
              <div>
                <span className="kicker">{job.contractType}</span>
                <h2 className="mt-1.5 text-xl font-extrabold text-primary sm:text-2xl">
                  {job.title}
                </h2>
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-ink-light">
                  <MapPin className="h-3.5 w-3.5 text-accent" />
                  {job.locationDetail}
                </p>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Fermer"
                className="mt-0.5 shrink-0 rounded-full p-2 text-ink-light transition hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[50vh] overflow-y-auto overscroll-contain px-6 pb-2 sm:px-7">
              <div className="space-y-3">
                {job.fullDescription.map((paragraph, i) => (
                  <p key={i} className="text-sm leading-relaxed text-ink-light sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 border-t border-primary/5 px-6 py-4 sm:px-7">
              <div className="inline-flex items-center gap-1.5 text-xs text-ink-light">
                <Briefcase className="h-3.5 w-3.5 text-accent" />
                {job.contractType}
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onApply(job.slug);
                }}
                className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-primary shadow-sm transition-all hover:scale-[1.03] hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Postuler à ce poste
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
