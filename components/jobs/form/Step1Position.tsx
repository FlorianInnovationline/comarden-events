"use client";

import { ChevronDown } from "lucide-react";
import type { ApplicationFormValues, FormErrors } from "@/types/jobs";
import type { JobPosting } from "@/types/jobs";

interface Step1Props {
  values: ApplicationFormValues;
  errors: FormErrors;
  jobs: JobPosting[];
  onChange: (field: keyof ApplicationFormValues, value: string) => void;
}

export function Step1Position({ values, errors, jobs, onChange }: Step1Props) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-extrabold text-primary sm:text-2xl">
          Quel poste vous intéresse ?
        </h3>
        <p className="mt-1 text-sm text-ink-light">
          Sélectionnez le poste pour lequel vous souhaitez postuler.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="position" className="block text-sm font-semibold text-ink">
          Poste souhaité{" "}
          <span className="text-red-500" aria-hidden>
            *
          </span>
        </label>
        <div className="relative">
          <select
            id="position"
            name="position"
            className={
              "w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 text-base transition-all focus:outline-none focus:ring-2 " +
              (errors.position
                ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                : "border-primary/15 text-ink focus:border-primary focus:ring-primary/10")
            }
            value={values.position}
            onChange={(e) => onChange("position", e.target.value)}
            aria-invalid={!!errors.position}
            aria-describedby={errors.position ? "position-error" : undefined}
          >
            <option value="">Sélectionnez un poste...</option>
            {jobs.map((j) => (
              <option key={j.slug} value={j.slug}>
                {j.shortTitle} — {j.location}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-light/50" />
        </div>
        {errors.position && (
          <p id="position-error" role="alert" className="text-xs font-medium text-red-600">
            {errors.position}
          </p>
        )}
      </div>

      {/* Visual preview of selected job */}
      {values.position && (() => {
        const job = jobs.find((j) => j.slug === values.position);
        if (!job) return null;
        return (
          <div className="rounded-xl border border-primary/10 bg-primary/5 px-4 py-4">
            <p className="text-sm font-bold text-primary">{job.shortTitle}</p>
            <p className="mt-0.5 text-xs text-ink-light">{job.location} · {job.contractType}</p>
            <p className="mt-2 text-sm text-ink-light">{job.teaser}</p>
          </div>
        );
      })()}
    </div>
  );
}
