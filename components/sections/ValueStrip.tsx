"use client";

import { motion } from "framer-motion";
import { Coffee, HeartHandshake, Lightbulb, Target } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";

const VALUES = [
  {
    icon: HeartHandshake,
    title: "Échange & rencontre",
    desc: "Des formats pensés pour créer le dialogue entre clients, équipes et partenaires."
  },
  {
    icon: Lightbulb,
    title: "Conseils & tips d'experts",
    desc: "On invite les meilleurs pour partager leur savoir, leurs astuces et leurs retours terrain."
  },
  {
    icon: Coffee,
    title: "Moments conviviaux",
    desc: "Parce qu'un bon café (et un peu de soleil) rendent tous les échanges plus agréables."
  },
  {
    icon: Target,
    title: "Rien d'inutile",
    desc: "Chaque moment est réfléchi pour que vous ne vous déplaciez pas pour rien."
  }
];

export function ValueStrip() {
  return (
    <section id="esprit" className="relative bg-neutral py-14 sm:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          kicker="L'esprit Comarden Events"
          title="Un événement, ce n'est pas une obligation : c'est une rencontre et une opportunité."
          description="Chaque édition est conçue pour vous apporter de la valeur, du contenu actionnable, et un vrai bon moment."
        />

        <RevealGroup className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <RevealItem key={v.title}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative h-full overflow-hidden rounded-2xl bg-white p-5 shadow-soft ring-1 ring-primary/5 transition-shadow hover:shadow-glow sm:p-7"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary transition-colors group-hover:bg-accent group-hover:text-primary">
                  <v.icon className="h-6 w-6 transition-transform duration-500 group-hover:rotate-6" />
                </div>
                <h3 className="text-lg font-bold text-primary">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-light">{v.desc}</p>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
                />
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
