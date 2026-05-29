"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

export function SuccessState() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: reduce ? 1 : 0.9, y: reduce ? 0 : 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.05 }}
      className="flex flex-col items-center py-12 text-center sm:py-16"
    >
      {/* Animated checkmark */}
      <motion.svg
        viewBox="0 0 80 80"
        className="mb-8 h-20 w-20"
        aria-hidden
        initial={{ opacity: 0, scale: reduce ? 1 : 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 18,
          delay: 0.1,
        }}
      >
        <circle
          cx="40"
          cy="40"
          r="38"
          fill="none"
          stroke="#002D59"
          strokeWidth="3.5"
        />
        <motion.path
          d="M22 42 L34 54 L58 28"
          fill="none"
          stroke="#FFD500"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: reduce ? 0.001 : 0.55,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.35,
          }}
        />
      </motion.svg>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
      >
        <span className="kicker block mb-3">Candidature envoyée</span>
        <h3 className="heading-md text-primary">
          Merci ! Nous avons bien reçu votre candidature.
        </h3>
        <p className="mt-4 max-w-md text-base text-ink-light">
          Nous reviendrons vers vous très prochainement. En attendant, n&apos;hésitez
          pas à nous contacter si vous avez des questions.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8"
      >
        <Link
          href="/"
          className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition-all hover:bg-primary-light hover:shadow-soft"
        >
          Retour à l&apos;accueil
        </Link>
      </motion.div>
    </motion.div>
  );
}
