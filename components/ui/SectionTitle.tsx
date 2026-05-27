"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  kicker?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  tone?: "light" | "dark";
}

export function SectionTitle({
  kicker,
  title,
  description,
  align = "left",
  className,
  tone = "light"
}: SectionTitleProps) {
  const reduce = useReducedMotion();
  return (
    <div
      className={cn(
        "mx-auto flex max-w-3xl flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {kicker && (
        <motion.span
          className="kicker"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4 }}
        >
          {kicker}
        </motion.span>
      )}
      <motion.h2
        className={cn(
          "heading-lg text-balance",
          tone === "dark" ? "text-white" : "text-primary"
        )}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h2>
      <motion.span
        aria-hidden
        className={cn(
          "block h-1 w-16 origin-left rounded-full bg-accent",
          align === "center" && "origin-center"
        )}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: reduce ? 0.001 : 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      />
      {description && (
        <motion.p
          className={cn(
            "max-w-2xl text-base sm:text-lg",
            tone === "dark" ? "text-white/80" : "text-ink-light"
          )}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
