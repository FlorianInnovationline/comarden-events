"use client";

import * as React from "react";
import Link from "next/link";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const baseStyles =
  "group inline-flex items-center justify-center gap-2 rounded-full font-bold tracking-tight transition-all duration-200 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary text-white shadow-sm hover:bg-primary-light hover:shadow-soft",
  secondary:
    "bg-accent text-primary shadow-sm hover:bg-accent-light hover:shadow-glow",
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  ghost: "text-primary hover:bg-primary/5"
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm sm:text-base",
  lg: "px-8 py-4 text-base sm:text-lg"
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<HTMLMotionProps<"button">, "children"> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const motionProps = {
  whileHover: { scale: 1.04 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring" as const, stiffness: 400, damping: 22 }
};

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const cls = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if ("href" in props && props.href) {
    const isExternal = props.external || /^https?:\/\//.test(props.href);
    if (isExternal) {
      return (
        <motion.a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={props.onClick}
          className={cls}
          {...motionProps}
        >
          {children}
        </motion.a>
      );
    }
    return (
      <Link href={props.href} onClick={props.onClick} className={cls}>
        <motion.span className="contents" {...motionProps}>
          {children}
        </motion.span>
      </Link>
    );
  }

  const { href: _href, ...buttonProps } = props as ButtonAsButton;
  return (
    <motion.button className={cls} {...motionProps} {...buttonProps}>
      {children}
    </motion.button>
  );
}
