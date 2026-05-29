"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import type {
  ApplicationFormValues,
  ApplicationPayload,
  FormErrors,
} from "@/types/jobs";
import type { JobPosting } from "@/types/jobs";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FormProgress } from "@/components/jobs/form/FormProgress";
import { Step1Position } from "@/components/jobs/form/Step1Position";
import { Step2Contact } from "@/components/jobs/form/Step2Contact";
import { Step3Experience } from "@/components/jobs/form/Step3Experience";
import { Step4Documents } from "@/components/jobs/form/Step4Documents";
import { SuccessState } from "@/components/jobs/form/SuccessState";

// ── Helpers ────────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ALLOWED_EXT = /\.(pdf|doc|docx)$/i;
const MAX_FILE_BYTES = 10 * 1024 * 1024;

function validateFile(file: File): string | null {
  if (!ALLOWED_MIME.includes(file.type) && !ALLOWED_EXT.test(file.name)) {
    return "Format invalide. PDF, DOC ou DOCX uniquement.";
  }
  if (file.size > MAX_FILE_BYTES) {
    return "Le fichier est trop volumineux (max 10 Mo).";
  }
  return null;
}

function validateStep(
  step: number,
  values: ApplicationFormValues
): FormErrors {
  const errors: FormErrors = {};

  switch (step) {
    case 0:
      if (!values.position) errors.position = "Veuillez sélectionner un poste.";
      break;

    case 1:
      if (!values.lastName.trim()) errors.lastName = "Le nom est requis.";
      if (!values.firstName.trim()) errors.firstName = "Le prénom est requis.";
      if (!EMAIL_RE.test(values.email))
        errors.email = "Adresse e-mail invalide.";
      if (!values.phone.trim())
        errors.phone = "Le numéro de téléphone est requis.";
      if (!values.city.trim()) errors.city = "La localité est requise.";
      if (!values.postalCode.trim())
        errors.postalCode = "Le code postal est requis.";
      break;

    case 2:
      if (!values.availableFrom)
        errors.availableFrom = "La date de disponibilité est requise.";
      if (!values.hasDriverLicense)
        errors.hasDriverLicense =
          "Veuillez indiquer si vous êtes titulaire du permis B.";
      if (!values.technicalKnowledge)
        errors.technicalKnowledge =
          "Veuillez sélectionner votre niveau de connaissances techniques.";
      break;

    case 3: {
      if (!values.cv) {
        errors.cv = "Votre CV est requis.";
      } else {
        const cvErr = validateFile(values.cv);
        if (cvErr) errors.cv = cvErr;
      }
      if (values.coverLetter) {
        const clErr = validateFile(values.coverLetter);
        if (clErr) errors.coverLetter = clErr;
      }
      if (!values.gdprConsent)
        errors.gdprConsent =
          "Vous devez accepter le traitement de vos données pour postuler.";
      break;
    }
  }

  return errors;
}

function isStepValid(step: number, values: ApplicationFormValues): boolean {
  switch (step) {
    case 0:
      return values.position !== "";
    case 1:
      return (
        values.lastName.trim() !== "" &&
        values.firstName.trim() !== "" &&
        EMAIL_RE.test(values.email) &&
        values.phone.trim() !== "" &&
        values.city.trim() !== "" &&
        values.postalCode.trim() !== ""
      );
    case 2:
      return (
        values.availableFrom !== "" &&
        (values.hasDriverLicense === "oui" ||
          values.hasDriverLicense === "non") &&
        values.technicalKnowledge !== ""
      );
    case 3:
      return values.cv !== null && values.gdprConsent;
    default:
      return false;
  }
}

// ── Stub submit handler ─────────────────────────────────────────────────────────

// TODO (Phase 2/3 — backend wiring):
// 1) Send a multipart/form-data POST to /api/jobs/apply (a Next.js API route)
//    which will:
//      - insert the application row into Supabase `job_applications`
//      - upload the CV + lettre to Supabase Storage
//      - send a notification email to info@comarden.be via Resend (with CV attached)
// 2) Also send a mailto-style notification email duplicate to info@comarden.be.
// For now: validate, simulate a network delay, console.log the payload, show success.
async function submitApplication(data: ApplicationPayload): Promise<void> {
  await new Promise((r) => setTimeout(r, 900));
  console.log("[stub submit] application payload", data);
  // throw new Error("simulate error"); // uncomment to test error UI
}

// ── Component ──────────────────────────────────────────────────────────────────

interface JobApplicationFormProps {
  jobs: JobPosting[];
  /** Slug of the job to pre-select in the form on mount. */
  initialJobSlug?: string;
}

const TOTAL_STEPS = 4;

type SubmitStatus = "idle" | "submitting" | "success" | "error";

function makeInitialValues(initialJobSlug = ""): ApplicationFormValues {
  return {
    position: initialJobSlug,
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    city: "",
    postalCode: "",
    birthDate: "",
    currentPosition: "",
    availableFrom: "",
    hasDriverLicense: "",
    salesSkills: "",
    technicalKnowledge: "",
    yearsCounterSales: "",
    yearsFieldSales: "",
    cv: null,
    coverLetter: null,
    message: "",
    gdprConsent: false,
  };
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 56 : -56,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -56 : 56,
    opacity: 0,
  }),
};

export function JobApplicationForm({
  jobs,
  initialJobSlug = "",
}: JobApplicationFormProps) {
  const reduce = useReducedMotion();

  const [step, setStep] = useState(0);
  const [stepDir, setStepDir] = useState<1 | -1>(1);
  const [values, setValues] = useState<ApplicationFormValues>(
    makeInitialValues(initialJobSlug)
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const cardRef = useRef<HTMLDivElement>(null);

  // ── Field change handlers ────────────────────────────────────────────────

  function handleChange(
    field: keyof ApplicationFormValues,
    value: string
  ): void {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function handleFileChange(
    field: "cv" | "coverLetter",
    file: File | null
  ): void {
    setValues((v) => ({ ...v, [field]: file }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function handleGdprChange(value: boolean): void {
    setValues((v) => ({ ...v, gdprConsent: value }));
    if (errors.gdprConsent) setErrors((e) => ({ ...e, gdprConsent: undefined }));
  }

  // ── Navigation ───────────────────────────────────────────────────────────

  function handleNext() {
    const errs = validateStep(step, values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Focus the first error field in the card
      const firstErr = cardRef.current?.querySelector("[aria-invalid='true']");
      if (firstErr instanceof HTMLElement) firstErr.focus();
      return;
    }
    setErrors({});
    setStepDir(1);
    setStep((s) => s + 1);
    cardRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  function handlePrev() {
    setErrors({});
    setStepDir(-1);
    setStep((s) => s - 1);
    cardRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  async function handleSubmit() {
    const errs = validateStep(3, values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitStatus("submitting");

    const payload: ApplicationPayload = {
      position: values.position,
      lastName: values.lastName,
      firstName: values.firstName,
      email: values.email,
      phone: values.phone,
      city: values.city,
      postalCode: values.postalCode,
      birthDate: values.birthDate,
      currentPosition: values.currentPosition,
      availableFrom: values.availableFrom,
      hasDriverLicense: values.hasDriverLicense,
      salesSkills: values.salesSkills,
      technicalKnowledge: values.technicalKnowledge,
      yearsCounterSales: values.yearsCounterSales,
      yearsFieldSales: values.yearsFieldSales,
      cvFileName: values.cv?.name ?? "",
      cvFileSize: values.cv?.size ?? 0,
      coverLetterFileName: values.coverLetter?.name ?? "",
      coverLetterFileSize: values.coverLetter?.size ?? 0,
      message: values.message,
      gdprConsent: values.gdprConsent,
    };

    try {
      await submitApplication(payload);
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    }
  }

  const valid = isStepValid(step, values);
  const isLast = step === TOTAL_STEPS - 1;

  // ── Success state ────────────────────────────────────────────────────────

  if (submitStatus === "success") {
    return (
      <section className="relative overflow-hidden bg-neutral py-20 sm:py-28">
        <div className="container">
          <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-soft ring-1 ring-primary/5 sm:p-10">
            <SuccessState />
          </div>
        </div>
      </section>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────

  return (
    <section className="relative overflow-hidden bg-neutral py-20 sm:py-28">
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
      />

      <div className="container relative">
        <SectionTitle
          kicker="Rejoindre l'équipe"
          title="Formulaire de candidature"
          description="Remplissez les 4 étapes ci-dessous. Le processus prend environ 5 minutes."
          align="center"
          className="mb-12 sm:mb-14"
        />

        <div
          ref={cardRef}
          tabIndex={-1}
          className="mx-auto max-w-2xl rounded-2xl border-t-4 border-primary bg-white shadow-soft outline-none ring-1 ring-primary/5"
        >
          {/* Progress */}
          <div className="border-b border-primary/5 px-6 py-5 sm:px-8 sm:py-6">
            <FormProgress step={step} />
          </div>

          {/* Step content */}
          <div className="overflow-hidden px-6 py-7 sm:px-8 sm:py-8">
            <AnimatePresence mode="wait" custom={stepDir}>
              <motion.div
                key={step}
                custom={stepDir}
                variants={reduce ? {} : slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {step === 0 && (
                  <Step1Position
                    values={values}
                    errors={errors}
                    jobs={jobs}
                    onChange={handleChange}
                  />
                )}
                {step === 1 && (
                  <Step2Contact
                    values={values}
                    errors={errors}
                    onChange={handleChange}
                  />
                )}
                {step === 2 && (
                  <Step3Experience
                    values={values}
                    errors={errors}
                    onChange={handleChange}
                  />
                )}
                {step === 3 && (
                  <Step4Documents
                    values={values}
                    errors={errors}
                    onChange={handleChange}
                    onFileChange={handleFileChange}
                    onGdprChange={handleGdprChange}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Error banner */}
          {submitStatus === "error" && (
            <div className="mx-6 mb-4 flex items-start gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200 sm:mx-8">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                Une erreur est survenue. Réessayez ou contactez-nous à{" "}
                <a
                  href="mailto:info@comarden.be"
                  className="font-semibold underline hover:no-underline"
                >
                  info@comarden.be
                </a>
                .
              </span>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between border-t border-primary/5 px-6 py-5 sm:px-8 sm:py-6">
            {step > 0 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 border-primary/15 px-5 py-2.5 text-sm font-bold text-primary transition hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ArrowLeft className="h-4 w-4" />
                Précédent
              </button>
            ) : (
              <span />
            )}

            <button
              type="button"
              disabled={!valid || submitStatus === "submitting"}
              onClick={isLast ? handleSubmit : handleNext}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-primary-light hover:shadow-soft disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {submitStatus === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : isLast ? (
                <>
                  Envoyer ma candidature
                  <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  Suivant
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
