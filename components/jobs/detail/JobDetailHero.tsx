"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin, Clock, Car, Briefcase } from "lucide-react";
import type { JobPosting } from "@/types/jobs";
import { Button } from "@/components/ui/Button";

interface JobDetailHeroProps {
  job: JobPosting;
}

export function JobDetailHero({ job }: JobDetailHeroProps) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-primary pb-14 pt-24 text-white sm:pb-20 sm:pt-32 lg:pt-40">
      {/* Background blobs */}
      <motion.div
        aria-hidden
        className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-3xl"
        animate={reduce ? undefined : { x: [0, 24, 0], y: [0, 16, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-32 right-0 h-[26rem] w-[26rem] rounded-full bg-primary-light/40 blur-3xl"
        animate={reduce ? undefined : { x: [0, -28, 0], y: [0, -14, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <Link
            href="/jobs"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Toutes les offres
          </Link>
        </motion.div>

        {/* Kicker + workType chip */}
        <motion.div
          className="mt-7 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <span className="kicker">COMARDEN RECRUTE</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-kicker text-white/80 ring-1 ring-white/20">
            <Briefcase className="h-3 w-3 text-accent" />
            {job.workType}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="heading-xl mt-4 text-balance sm:mt-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
        >
          {job.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-3 text-sm text-white/65 sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.32 }}
        >
          {job.subtitle}
        </motion.p>

        {/* Meta chips */}
        <motion.div
          className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/80 sm:mt-6 sm:text-sm"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.42 }}
        >
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
            {job.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5 shrink-0 text-accent" />
            {job.contractType}
          </span>
          {job.horaires && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 shrink-0 text-accent" />
              {job.horaires}
            </span>
          )}
          {job.permisBRequired && (
            <span className="inline-flex items-center gap-1.5">
              <Car className="h-3.5 w-3.5 shrink-0 text-accent" />
              Permis B requis
            </span>
          )}
          {job.vehicleProvided && (
            <span className="inline-flex items-center gap-1.5">
              <Car className="h-3.5 w-3.5 shrink-0 text-accent" />
              Véhicule fourni
            </span>
          )}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.55 }}
        >
          <Button
            href="#postuler"
            variant="secondary"
            size="lg"
            className="w-full justify-center sm:w-auto"
          >
            Postuler maintenant
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            href="/jobs"
            variant="outline"
            size="lg"
            className="w-full justify-center border-white/50 text-white hover:bg-white hover:text-primary sm:w-auto"
          >
            Voir toutes les offres
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
