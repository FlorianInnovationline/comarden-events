"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Store, TrendingUp, ArrowRight } from "lucide-react";
import type { JobPosting } from "@/types/jobs";

interface JobCardProps {
  job: JobPosting;
  index: number;
  onViewDetails: (job: JobPosting) => void;
}

const ICONS = [Store, Store, TrendingUp];

export function JobCard({ job, index, onViewDetails }: JobCardProps) {
  const reduce = useReducedMotion();
  const Icon = ICONS[index % ICONS.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: reduce ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      }}
      whileHover={reduce ? undefined : { y: -6 }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-primary/5 [transition:box-shadow_0.22s_ease] hover:shadow-glow"
    >
      {/* Yellow icon strip */}
      <div className="relative flex items-center justify-center bg-accent/10 px-6 py-8">
        <motion.div
          whileHover={reduce ? undefined : { scale: 1.1, rotate: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent shadow-soft"
        >
          <Icon className="h-8 w-8 text-primary" />
        </motion.div>
        {/* Accent bottom bar */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="text-xl font-extrabold text-primary sm:text-2xl">
            {job.title}
          </h3>
          <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-ink-light">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
            {job.locationDetail}
          </p>
          <span className="mt-2 block text-xs font-bold uppercase tracking-kicker text-ink-light/60">
            {job.contractType}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-ink-light">{job.description}</p>

        <div className="mt-auto pt-2">
          <button
            type="button"
            onClick={() => onViewDetails(job)}
            className="group/btn inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 border-primary/15 px-5 py-2.5 text-sm font-bold text-primary transition-all hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Voir les détails
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
