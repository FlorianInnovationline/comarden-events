"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart, Clock, Gift, TrendingUp } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";

const BENEFITS = [
  {
    icon: Heart,
    title: "PME familiale en pleine croissance",
    text: "Une équipe passionnée par la toiture et l'isolation.",
  },
  {
    icon: Clock,
    title: "Contrat CDI à temps plein",
    text: "Du lundi au vendredi, stabilité et engagement.",
  },
  {
    icon: Gift,
    title: "Package salarial attractif",
    text: "Chèques-repas, éco-chèques, assurance hospitalisation et soins de santé.",
  },
  {
    icon: TrendingUp,
    title: "Apprentissage et évolution",
    text: "Des opportunités d'évolution régulières au sein de l'équipe.",
  },
];

export function WhyJoinSection() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-neutral py-20 sm:py-28">
      <div className="container">
        <SectionTitle
          kicker="Pourquoi nous rejoindre"
          title="Ce que nous offrons"
          description="Rejoindre Comarden, c'est intégrer une PME dynamique où chaque collaborateur compte."
          className="mb-12 sm:mb-14"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: reduce ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.08,
              }}
              className="group relative flex flex-col gap-4 rounded-2xl border border-primary/8 bg-white px-5 py-6 [transition:box-shadow_0.22s_ease,transform_0.22s_ease] hover:-translate-y-1 hover:shadow-soft"
            >
              {/* Accent corner decoration */}
              <span
                aria-hidden
                className="absolute right-4 top-4 h-8 w-8 rounded-full bg-accent/15 transition-colors group-hover:bg-accent/25"
              />

              <motion.div
                whileHover={reduce ? undefined : { rotate: -8, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 320, damping: 16 }}
                className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/8 text-primary group-hover:bg-primary group-hover:text-white"
                style={{ transition: "background-color 0.2s, color 0.2s" }}
              >
                <Icon className="h-5 w-5" />
              </motion.div>

              <div>
                <p className="font-extrabold leading-tight text-primary">{title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-light">{text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
