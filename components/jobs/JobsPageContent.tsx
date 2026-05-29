"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { JobPosting } from "@/types/jobs";
import { JobsHero } from "@/components/jobs/JobsHero";
import { AboutBand } from "@/components/jobs/AboutBand";
import { JobOffersSection } from "@/components/jobs/JobOffersSection";
import { WhyJoinSection } from "@/components/jobs/WhyJoinSection";
import { JobApplicationForm } from "@/components/jobs/JobApplicationForm";
import { JobsContactBand } from "@/components/jobs/JobsContactBand";

interface JobsPageContentProps {
  jobs: JobPosting[];
}

export function JobsPageContent({ jobs }: JobsPageContentProps) {
  const reduce = useReducedMotion();

  /**
   * Tracks the position slug pre-selected via a job card's "Postuler à ce poste" CTA.
   * Used as the `key` prop on JobApplicationForm to force a clean reset when it changes.
   */
  const [selectedPosition, setSelectedPosition] = useState("");
  const formSectionRef = useRef<HTMLDivElement>(null);

  function handleApply(slug: string) {
    setSelectedPosition(slug);
    // Give React a tick to update the form key before scrolling
    requestAnimationFrame(() => {
      formSectionRef.current?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    });
  }

  return (
    <>
      <JobsHero />
      <AboutBand />
      <JobOffersSection jobs={jobs} onApply={handleApply} />
      <WhyJoinSection />

      {/* Form section — anchor + scroll margin for the fixed header */}
      <div id="postuler" ref={formSectionRef} className="scroll-mt-24">
        <JobApplicationForm
          key={selectedPosition || "default"}
          jobs={jobs}
          defaultPosition={selectedPosition}
        />
      </div>

      <JobsContactBand />
    </>
  );
}
