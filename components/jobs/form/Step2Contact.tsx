"use client";

import type { ApplicationFormValues, FormErrors } from "@/types/jobs";

interface Step2Props {
  values: ApplicationFormValues;
  errors: FormErrors;
  onChange: (field: keyof ApplicationFormValues, value: string) => void;
}

const inputClass = (error?: string) =>
  "w-full rounded-xl border bg-white px-4 py-3 text-base transition-all focus:outline-none focus:ring-2 " +
  (error
    ? "border-red-400 focus:border-red-400 focus:ring-red-100"
    : "border-primary/15 text-ink focus:border-primary focus:ring-primary/10");

interface FieldProps {
  id: keyof ApplicationFormValues;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactElement;
}

function Field({ id, label, required, error, children }: FieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id as string} className="block text-sm font-semibold text-ink">
        {label}
        {required && (
          <span className="ml-1 text-red-500" aria-hidden>
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={errorId} role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function Step2Contact({ values, errors, onChange }: Step2Props) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-extrabold text-primary sm:text-2xl">
          Vos coordonnées
        </h3>
        <p className="mt-1 text-sm text-ink-light">
          Ces informations nous permettront de vous recontacter.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="lastName" label="Nom" required error={errors.lastName}>
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            className={inputClass(errors.lastName)}
            value={values.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
          />
        </Field>

        <Field id="firstName" label="Prénom" required error={errors.firstName}>
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            className={inputClass(errors.firstName)}
            value={values.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
          />
        </Field>
      </div>

      <Field id="email" label="Adresse e-mail" required error={errors.email}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          className={inputClass(errors.email)}
          value={values.email}
          onChange={(e) => onChange("email", e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
      </Field>

      <Field id="phone" label="Numéro de téléphone" required error={errors.phone}>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          className={inputClass(errors.phone)}
          value={values.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-[1fr,auto]">
        <Field id="city" label="Localité" required error={errors.city}>
          <input
            id="city"
            type="text"
            autoComplete="address-level2"
            className={inputClass(errors.city)}
            value={values.city}
            onChange={(e) => onChange("city", e.target.value)}
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? "city-error" : undefined}
          />
        </Field>

        <Field id="postalCode" label="Code postal" required error={errors.postalCode}>
          <input
            id="postalCode"
            type="text"
            autoComplete="postal-code"
            inputMode="numeric"
            className={inputClass(errors.postalCode) + " sm:w-28"}
            value={values.postalCode}
            onChange={(e) => onChange("postalCode", e.target.value)}
            aria-invalid={!!errors.postalCode}
            aria-describedby={errors.postalCode ? "postalCode-error" : undefined}
          />
        </Field>
      </div>

      <Field
        id="birthDate"
        label="Date de naissance"
        error={errors.birthDate}
      >
        <input
          id="birthDate"
          type="date"
          autoComplete="bday"
          className={inputClass(errors.birthDate)}
          value={values.birthDate}
          onChange={(e) => onChange("birthDate", e.target.value)}
        />
      </Field>
    </div>
  );
}
