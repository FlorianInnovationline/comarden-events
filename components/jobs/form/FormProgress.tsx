"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";

const STEP_LABELS = ["Poste", "Coordonnées", "Expérience", "Documents"];
const TOTAL_STEPS = 4;

interface FormProgressProps {
  step: number; // 0-indexed current step
}

export function FormProgress({ step }: FormProgressProps) {
  const current = step + 1; // 1-indexed

  return (
    <div className="flex w-full items-center" role="list" aria-label="Étapes du formulaire">
      {Array.from({ length: TOTAL_STEPS }, (_, i) => {
        const s = i + 1; // 1-indexed
        const isDone = current > s;
        const isActive = current === s;

        return (
          <div key={s} className="flex flex-1 items-center">
            {/* Step indicator */}
            <div className="flex flex-col items-center" role="listitem">
              <motion.div
                animate={{
                  backgroundColor: isDone
                    ? "#002D59"
                    : isActive
                    ? "#FFD500"
                    : "#ffffff",
                  borderColor: isDone
                    ? "#002D59"
                    : isActive
                    ? "#FFD500"
                    : "rgba(0,45,89,0.2)",
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 sm:h-10 sm:w-10"
                aria-current={isActive ? "step" : undefined}
                aria-label={`Étape ${s} : ${STEP_LABELS[i]}${isDone ? " (terminée)" : isActive ? " (en cours)" : ""}`}
              >
                {isDone ? (
                  <Check className="h-4 w-4 text-white" />
                ) : (
                  <span
                    className={
                      "text-sm font-bold " +
                      (isActive ? "text-primary" : "text-primary/30")
                    }
                  >
                    {s}
                  </span>
                )}
              </motion.div>
              <span
                className={
                  "mt-1.5 hidden text-[0.6rem] font-bold uppercase tracking-wider sm:block " +
                  (current >= s ? "text-primary" : "text-ink-light/40")
                }
              >
                {STEP_LABELS[i]}
              </span>
            </div>

            {/* Connector line (not after last step) */}
            {i < TOTAL_STEPS - 1 && (
              <div className="relative mx-2 mb-[1.35rem] h-[2px] flex-1 overflow-hidden rounded-full bg-primary/10 sm:mb-[1.55rem]">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-accent"
                  animate={{ width: current > s ? "100%" : "0%" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
