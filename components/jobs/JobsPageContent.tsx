"use client";

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
  return (
    <>
      <JobsHero />
      <AboutBand />
      <JobOffersSection jobs={jobs} />
      <WhyJoinSection />

      {/* Form section — anchor + scroll margin for the fixed header */}
      <div id="postuler" className="scroll-mt-24">
        <JobApplicationForm jobs={jobs} />
      </div>

      <JobsContactBand />
    </>
  );
}
