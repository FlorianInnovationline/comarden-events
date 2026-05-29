"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Users, MapPin, Award } from "lucide-react";

const CARDS = [
  {
    icon: Users,
    title: "PME familiale",
    text: "Une équipe passionnée par la toiture et l'isolation.",
  },
  {
    icon: MapPin,
    title: "2 sites",
    text: "Naninne (Namur) et Bertrix (Luxembourg belge).",
  },
  {
    icon: Award,
    title: "Belgique francophone",
    text: "Un négoce francophone de référence depuis 1977.",
  },
];

export function AboutBand() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-neutral py-16 sm:py-20">
      <div className="container">
        <div className="grid gap-5 sm:grid-cols-3">
          {CARDS.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: reduce ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.1,
              }}
              whileHover={reduce ? undefined : { y: -4 }}
              className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-soft ring-1 ring-primary/5 [transition:box-shadow_0.22s_ease] hover:shadow-glow"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-extrabold text-primary">{title}</p>
                <p className="mt-1 text-sm text-ink-light">{text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
