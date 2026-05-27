"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function ClosingCTA() {
  return (
    <section className="relative overflow-hidden bg-primary-dark py-16 text-white sm:py-20 lg:py-24">
      <motion.div
        aria-hidden
        className="absolute -left-40 top-0 h-[18rem] w-[18rem] rounded-full bg-accent/20 blur-3xl sm:h-[22rem] sm:w-[22rem] lg:h-[26rem] lg:w-[26rem]"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container relative text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="kicker"
        >
          Comarden
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="heading-lg mx-auto mt-4 max-w-3xl text-balance"
        >
          Venez une fois… vous comprendrez pourquoi on revient.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-8 flex w-full max-w-md flex-col flex-wrap justify-center gap-3 sm:mt-9 sm:max-w-none sm:flex-row"
        >
          <Button
            href={site.mainSiteUrl}
            variant="secondary"
            size="lg"
            external
            className="w-full justify-center sm:w-auto"
          >
            Découvrir Comarden
            <ArrowUpRight className="h-4 w-4" />
          </Button>
          <Button
            href="/#evenements"
            variant="outline"
            size="lg"
            className="w-full justify-center border-white/60 text-white hover:bg-white hover:text-primary sm:w-auto"
          >
            Voir les événements
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
