"use client";

import type { JobPosting } from "@/types/jobs";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { JobCard } from "@/components/jobs/JobCard";

interface JobOffersSectionProps {
  jobs: JobPosting[];
}

export function JobOffersSection({ jobs }: JobOffersSectionProps) {
  return (
    <section id="offres" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="container">
        <SectionTitle
          kicker="Nos offres"
          title="Les postes ouverts"
          description="Trois postes à pourvoir dès maintenant sur nos sites de Naninne et Bertrix, ainsi qu'en Wallonie."
          align="center"
          className="mb-12 sm:mb-14"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, i) => (
            <JobCard key={job.slug} job={job} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
