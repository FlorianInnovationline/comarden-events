"use client";

import { ChevronDown } from "lucide-react";
import type { ApplicationFormValues, FormErrors } from "@/types/jobs";

interface Step3Props {
  values: ApplicationFormValues;
  errors: FormErrors;
  onChange: (field: keyof ApplicationFormValues, value: string) => void;
}

const inputClass = (error?: string) =>
  "w-full rounded-xl border bg-white px-4 py-3 text-base transition-all focus:outline-none focus:ring-2 " +
  (error
    ? "border-red-400 focus:border-red-400 focus:ring-red-100"
    : "border-primary/15 text-ink focus:border-primary focus:ring-primary/10");

const SKILL_OPTIONS = [
  { value: "", label: "Sélectionner..." },
  { value: "Très bonnes", label: "Très bonnes" },
  { value: "Bonnes", label: "Bonnes" },
  { value: "Moyennes", label: "Moyennes" },
  { value: "Faibles", label: "Faibles" },
];

function SelectField({
  id,
  label,
  required,
  value,
  error,
  options,
  onChange,
}: {
  id: string;
  label: string;
  required?: boolean;
  value: string;
  error?: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
        {required && (
          <span className="ml-1 text-red-500" aria-hidden>
            *
          </span>
        )}
      </label>
      <div className="relative">
        <select
          id={id}
          className={
            "appearance-none pr-10 " +
            inputClass(error)
          }
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-light/50" />
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function Step3Experience({ values, errors, onChange }: Step3Props) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-extrabold text-primary sm:text-2xl">
          Votre situation et expérience
        </h3>
        <p className="mt-1 text-sm text-ink-light">
          Aidez-nous à mieux cerner votre profil.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="currentPosition" className="block text-sm font-semibold text-ink">
          Poste actuel
        </label>
        <input
          id="currentPosition"
          type="text"
          placeholder="Ex. : commercial interne, conseiller technique..."
          className={inputClass()}
          value={values.currentPosition}
          onChange={(e) => onChange("currentPosition", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="availableFrom" className="block text-sm font-semibold text-ink">
          Disponible à partir du{" "}
          <span className="text-red-500" aria-hidden>
            *
          </span>
        </label>
        <input
          id="availableFrom"
          type="date"
          className={inputClass(errors.availableFrom)}
          value={values.availableFrom}
          onChange={(e) => onChange("availableFrom", e.target.value)}
          aria-invalid={!!errors.availableFrom}
          aria-describedby={errors.availableFrom ? "availableFrom-error" : undefined}
        />
        {errors.availableFrom && (
          <p id="availableFrom-error" role="alert" className="text-xs font-medium text-red-600">
            {errors.availableFrom}
          </p>
        )}
      </div>

      {/* Permis B */}
      <fieldset>
        <legend className="block text-sm font-semibold text-ink">
          Titulaire du permis B{" "}
          <span className="text-red-500" aria-hidden>
            *
          </span>
        </legend>
        <div className="mt-2.5 flex gap-6">
          {(["oui", "non"] as const).map((val) => (
            <label
              key={val}
              className="flex cursor-pointer items-center gap-2.5"
            >
              <input
                type="radio"
                name="hasDriverLicense"
                value={val}
                checked={values.hasDriverLicense === val}
                onChange={() => onChange("hasDriverLicense", val)}
                className="h-4 w-4 accent-primary"
              />
              <span className="text-base font-medium text-ink capitalize">
                {val.charAt(0).toUpperCase() + val.slice(1)}
              </span>
            </label>
          ))}
        </div>
        {errors.hasDriverLicense && (
          <p role="alert" className="mt-1 text-xs font-medium text-red-600">
            {errors.hasDriverLicense}
          </p>
        )}
      </fieldset>

      <SelectField
        id="technicalKnowledge"
        label="Connaissances techniques (toitures et façades)"
        required
        value={values.technicalKnowledge}
        error={errors.technicalKnowledge}
        options={SKILL_OPTIONS}
        onChange={(v) => onChange("technicalKnowledge", v)}
      />

      <SelectField
        id="salesSkills"
        label="Compétences commerciales"
        value={values.salesSkills}
        error={errors.salesSkills}
        options={SKILL_OPTIONS}
        onChange={(v) => onChange("salesSkills", v)}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="yearsCounterSales" className="block text-sm font-semibold text-ink">
            Années d&apos;expérience en vente comptoir
          </label>
          <input
            id="yearsCounterSales"
            type="number"
            min="0"
            max="50"
            inputMode="numeric"
            placeholder="0"
            className={inputClass()}
            value={values.yearsCounterSales}
            onChange={(e) => onChange("yearsCounterSales", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="yearsFieldSales" className="block text-sm font-semibold text-ink">
            Années d&apos;expérience en vente terrain
          </label>
          <input
            id="yearsFieldSales"
            type="number"
            min="0"
            max="50"
            inputMode="numeric"
            placeholder="0"
            className={inputClass()}
            value={values.yearsFieldSales}
            onChange={(e) => onChange("yearsFieldSales", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
