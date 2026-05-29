"use client";

import type { ApplicationFormValues, FormErrors } from "@/types/jobs";
import { FileInput } from "@/components/jobs/form/FileInput";

interface Step4Props {
  values: ApplicationFormValues;
  errors: FormErrors;
  onChange: (field: keyof ApplicationFormValues, value: string) => void;
  onFileChange: (field: "cv" | "coverLetter", file: File | null) => void;
  onGdprChange: (value: boolean) => void;
}

export function Step4Documents({
  values,
  errors,
  onChange,
  onFileChange,
  onGdprChange,
}: Step4Props) {
  const msgLen = values.message.length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-extrabold text-primary sm:text-2xl">
          Vos documents et message
        </h3>
        <p className="mt-1 text-sm text-ink-light">
          Joignez votre CV (obligatoire) et, si vous le souhaitez, une lettre de motivation.
        </p>
      </div>

      <FileInput
        id="cv"
        label="CV (PDF ou Word)"
        required
        value={values.cv}
        onChange={(f) => onFileChange("cv", f)}
        error={errors.cv}
        hint="PDF, DOC ou DOCX, 10 Mo max."
      />

      <FileInput
        id="coverLetter"
        label="Lettre de motivation (PDF ou Word)"
        value={values.coverLetter}
        onChange={(f) => onFileChange("coverLetter", f)}
        error={errors.coverLetter}
        hint="Optionnelle. PDF, DOC ou DOCX, 10 Mo max."
      />

      {/* Free-text message */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-baseline justify-between">
          <label htmlFor="message" className="block text-sm font-semibold text-ink">
            Un mot sur vous
          </label>
          <span
            className={
              "text-xs tabular-nums " +
              (msgLen > 1000 ? "text-red-500 font-semibold" : "text-ink-light")
            }
            aria-live="polite"
          >
            {msgLen}/1000
          </span>
        </div>
        <textarea
          id="message"
          rows={5}
          maxLength={1000}
          placeholder="Qu'est-ce qui vous motive à rejoindre Comarden ? Parlez-nous de vous en quelques lignes."
          className={
            "w-full resize-y rounded-xl border px-4 py-3 text-base transition-all focus:outline-none focus:ring-2 " +
            (errors.message
              ? "border-red-400 focus:border-red-400 focus:ring-red-100"
              : "border-primary/15 text-ink focus:border-primary focus:ring-primary/10")
          }
          value={values.message}
          onChange={(e) => onChange("message", e.target.value)}
        />
      </div>

      {/* RGPD consent */}
      <div className="flex flex-col gap-1.5">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            id="gdprConsent"
            type="checkbox"
            checked={values.gdprConsent}
            onChange={(e) => onGdprChange(e.target.checked)}
            aria-invalid={!!errors.gdprConsent}
            aria-describedby={errors.gdprConsent ? "gdpr-error" : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
          />
          <span className="text-sm leading-relaxed text-ink">
            J&apos;accepte que mes données personnelles soient traitées par Comarden dans le
            cadre de ma candidature.{" "}
            <span className="text-xs text-ink-light">
              {/* TODO: Link to main site privacy policy */}
              (Politique de confidentialité)
            </span>
            <span className="ml-1 text-red-500" aria-hidden>
              *
            </span>
          </span>
        </label>
        {errors.gdprConsent && (
          <p id="gdpr-error" role="alert" className="text-xs font-medium text-red-600">
            {errors.gdprConsent}
          </p>
        )}
      </div>
    </div>
  );
}
