"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { site } from "@/lib/site";

export function JobsContactBand() {
  return (
    <section className="relative overflow-hidden bg-primary py-16 text-white sm:py-20">
      <motion.div
        aria-hidden
        className="absolute -left-40 top-0 h-[18rem] w-[18rem] rounded-full bg-accent/20 blur-3xl"
        animate={{ x: [0, 28, 0], y: [0, 16, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative text-center">
        <motion.span
          className="kicker"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Des questions ?
        </motion.span>
        <motion.h2
          className="heading-lg mx-auto mt-4 max-w-xl text-balance"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          Une question avant de postuler ?
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-lg text-sm text-white/75 sm:text-base"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Notre équipe est disponible pour répondre à vos questions sur les postes,
          les conditions et la vie chez Comarden.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="mailto:adebondt@comarden.be"
            className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-full bg-accent px-6 py-3 text-sm font-bold text-primary shadow-sm transition-all hover:scale-[1.04] hover:shadow-glow"
          >
            <Mail className="h-4 w-4" />
            adebondt@comarden.be
          </a>
          <a
            href={site.contact.phoneHref}
            className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-full border-2 border-white/30 px-6 py-3 text-sm font-bold text-white transition-all hover:border-accent hover:text-accent"
          >
            <Phone className="h-4 w-4" />
            {site.contact.phone}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
