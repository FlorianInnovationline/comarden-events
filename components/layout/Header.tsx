"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { Logo } from "@/components/layout/Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur shadow-[0_1px_0_rgba(0,45,89,0.08)]"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between sm:h-20">
        <Link
          href="/"
          aria-label="Comarden Events — Accueil"
          className="group flex items-center gap-2"
        >
          <Logo className={cn("h-10 w-auto transition-all duration-300 sm:h-12", scrolled && "brightness-0")} />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative text-sm font-semibold transition-colors",
                scrolled ? "text-primary hover:text-primary-light" : "text-white/90 hover:text-white"
              )}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href={site.mainSiteUrl}
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-primary shadow-sm transition-all hover:scale-[1.04] hover:shadow-glow"
          >
            Retour au site principal
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors md:hidden",
            scrolled ? "bg-primary text-white" : "bg-white/10 text-white"
          )}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-primary text-white sm:top-20 md:hidden"
          >
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } }
              }}
              className="container flex flex-col gap-2 py-8"
            >
              {site.nav.map((item) => (
                <motion.div
                  key={item.href}
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-2xl font-extrabold tracking-tight hover:text-accent sm:text-3xl"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href={site.mainSiteUrl}
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                className="mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-bold text-primary"
              >
                Retour au site principal
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
