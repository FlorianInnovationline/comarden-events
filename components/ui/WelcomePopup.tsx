"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, Briefcase } from "lucide-react";

const SESSION_KEY = "comarden-recrute-popup-seen";

/** Paths on which the popup is suppressed (pointless to show on the jobs pages). */
function isSuppressedPath(pathname: string): boolean {
  return pathname === "/jobs" || pathname.startsWith("/jobs/");
}

export function WelcomePopup() {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isSuppressedPath(pathname)) return;
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(SESSION_KEY)) return;

    const timer = setTimeout(() => setOpen(true), 2000);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function dismiss() {
    setOpen(false);
    sessionStorage.setItem(SESSION_KEY, "1");
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="popup-backdrop"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.001 : 0.22 }}
            className="fixed inset-0 z-50 bg-primary/55 backdrop-blur-sm"
            onClick={dismiss}
          />

          {/* Card */}
          <motion.div
            key="popup-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
            aria-describedby="popup-desc"
            initial={{
              opacity: 0,
              scale: reduce ? 1 : 0.93,
              y: reduce ? 0 : 20,
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: reduce ? 1 : 0.96, y: reduce ? 0 : 10 }}
            transition={{
              type: "spring",
              stiffness: 340,
              damping: 28,
              duration: reduce ? 0.001 : undefined,
            }}
            className="fixed inset-x-4 top-[50%] z-50 mx-auto max-w-sm -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-glow ring-1 ring-primary/10 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2"
          >
            {/* Yellow top bar */}
            <div className="h-1.5 w-full bg-accent" aria-hidden />

            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={dismiss}
                aria-label="Fermer"
                className="mt-0.5 shrink-0 rounded-full p-2 text-ink-light/50 transition hover:bg-primary/8 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 pb-2 pt-3">
              <p
                id="popup-title"
                className="text-xl font-extrabold text-primary sm:text-2xl"
              >
                Comarden RECRUTE&nbsp;!
              </p>
              <p
                id="popup-desc"
                className="mt-2 text-sm leading-relaxed text-ink-light"
              >
                Envie de nous rejoindre ? Vous connaissez quelqu&apos;un de
                motivé et professionnel ?
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 px-6 py-5">
              <Link
                href="/jobs"
                onClick={dismiss}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-primary-light hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Contactez-nous
              </Link>
              <button
                type="button"
                onClick={dismiss}
                className="min-h-[44px] px-3 text-sm font-semibold text-ink-light/60 underline underline-offset-2 transition hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
