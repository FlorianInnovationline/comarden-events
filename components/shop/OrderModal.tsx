"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  X,
  Check,
  Loader2,
  AlertCircle,
  ShoppingCart,
  Minus,
  Plus,
} from "lucide-react";
import { formatPrice } from "@/lib/shop/utils";
import { useVariantPrice } from "@/components/shop/VariantPriceContext";
import { site } from "@/lib/site";

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  productId: string;
  productSlug: string;
  productTitle: string;
  currency: string;
  /** Fallback price when the page has no variant context. */
  fallbackPriceCents: number;
}

/**
 * Order request form. Collects the buyer's details and posts them to
 * /api/commander, which stores the request and notifies the sales team.
 */
export function OrderModal({
  open,
  onClose,
  productId,
  productSlug,
  productTitle,
  currency,
  fallbackPriceCents,
}: OrderModalProps) {
  const reduce = useReducedMotion();
  const ctx = useVariantPrice();
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const [mounted, setMounted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedVariant =
    ctx && ctx.options.length > 0
      ? ctx.options[ctx.selectedIndex]?.label
      : undefined;
  const unitPriceCents = ctx ? ctx.price.finalCents : fallbackPriceCents;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstFieldRef.current?.focus(), 80);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [open, onClose]);

  // Reset the form the next time the modal is opened.
  useEffect(() => {
    if (open) {
      setDone(false);
      setError(null);
    }
  }, [open]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/commander", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          productSlug,
          productTitle,
          variant: selectedVariant,
          quantity,
          unitPriceCents,
          currency,
          name: fd.get("name"),
          company: fd.get("company"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          address: fd.get("address"),
          notes: fd.get("notes"),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Envoi impossible");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setSending(false);
    }
  }

  const field =
    "w-full rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm text-primary placeholder:text-ink-light/45 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40";
  const label =
    "mb-1.5 block text-xs font-bold uppercase tracking-kicker text-ink-light";

  if (!mounted) return null;

  // The page template wraps every route in a transformed element, which would
  // otherwise anchor `position: fixed` to it instead of the viewport. Rendering
  // through a portal on <body> keeps the overlay truly full-screen.
  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.001 : 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm"
          />

          {/* Centring wrapper: framer-motion drives `transform` on the panel, so
              the panel itself must not rely on translate utilities. */}
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="order-title"
              initial={{
                opacity: 0,
                y: reduce ? 0 : 24,
                scale: reduce ? 1 : 0.97,
              }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                y: reduce ? 0 : 12,
                scale: reduce ? 1 : 0.98,
              }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="pointer-events-auto max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-glow"
            >
              <div className="h-1.5 w-full bg-accent" aria-hidden />

              {done ? (
                <div className="p-8 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-7 w-7 text-green-700" />
                  </div>
                  <h2
                    id="order-title"
                    className="mt-5 text-2xl font-extrabold text-primary"
                  >
                    Demande envoyée
                  </h2>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-light">
                    Merci ! Nous avons bien reçu votre commande pour{" "}
                    <strong className="text-primary">{productTitle}</strong>.
                    Notre équipe vous recontacte rapidement pour la confirmer.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-7 inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-bold text-white transition hover:bg-primary-light"
                  >
                    Fermer
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="p-6 sm:p-8">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <span className="kicker text-accent-dark">Commander</span>
                      <h2
                        id="order-title"
                        className="mt-1 text-xl font-extrabold leading-snug text-primary sm:text-2xl"
                      >
                        {productTitle}
                      </h2>
                      {selectedVariant && (
                        <p className="mt-1.5 text-sm text-ink-light">
                          {selectedVariant}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={onClose}
                      aria-label="Fermer"
                      className="-mr-2 -mt-1 shrink-0 rounded-full p-2 text-ink-light/50 transition hover:bg-primary/5 hover:text-primary"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Quantity + running total */}
                  <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl bg-neutral p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-primary">
                        Quantité
                      </span>
                      <div className="flex items-center gap-1 rounded-full bg-white p-1 ring-1 ring-primary/10">
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          aria-label="Diminuer la quantité"
                          className="flex h-8 w-8 items-center justify-center rounded-full text-primary transition hover:bg-primary/5"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-extrabold tabular-nums text-primary">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity((q) => Math.min(9999, q + 1))
                          }
                          aria-label="Augmenter la quantité"
                          className="flex h-8 w-8 items-center justify-center rounded-full text-primary transition hover:bg-primary/5"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      {unitPriceCents > 0 ? (
                        <>
                          <span className="block text-[0.6rem] font-bold uppercase tracking-kicker text-ink-light/60">
                            Total indicatif
                          </span>
                          <span className="text-lg font-extrabold text-primary">
                            {formatPrice(unitPriceCents * quantity, currency)}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm font-bold text-primary">
                          Sur devis
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="o-name" className={label}>
                        Nom et prénom *
                      </label>
                      <input
                        ref={firstFieldRef}
                        id="o-name"
                        name="name"
                        required
                        autoComplete="name"
                        className={field}
                        placeholder="Jean Dupont"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="o-company" className={label}>
                        Société
                      </label>
                      <input
                        id="o-company"
                        name="company"
                        autoComplete="organization"
                        className={field}
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                    <div>
                      <label htmlFor="o-email" className={label}>
                        E-mail *
                      </label>
                      <input
                        id="o-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className={field}
                        placeholder="jean@exemple.be"
                      />
                    </div>
                    <div>
                      <label htmlFor="o-phone" className={label}>
                        Téléphone
                      </label>
                      <input
                        id="o-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        className={field}
                        placeholder="0470 12 34 56"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="o-address" className={label}>
                        Adresse de livraison
                      </label>
                      <input
                        id="o-address"
                        name="address"
                        autoComplete="street-address"
                        className={field}
                        placeholder="Rue, numéro, code postal, localité"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="o-notes" className={label}>
                        Remarques
                      </label>
                      <textarea
                        id="o-notes"
                        name="notes"
                        rows={3}
                        className={`${field} resize-none`}
                        placeholder="Délai souhaité, précisions sur le chantier..."
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-red-50 p-4 ring-1 ring-red-200">
                      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                      <p className="text-sm text-red-800">
                        {error} Vous pouvez aussi nous joindre au{" "}
                        <a
                          href={site.contact.phoneHref}
                          className="font-bold underline"
                        >
                          {site.contact.phone}
                        </a>
                        .
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-bold text-primary shadow-sm transition hover:bg-accent-light hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {sending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ShoppingCart className="h-4 w-4" />
                    )}
                    Envoyer ma commande
                  </button>

                  <p className="mt-3 text-center text-xs leading-relaxed text-ink-light/70">
                    Sans engagement. Notre équipe vous recontacte pour confirmer
                    la disponibilité et le délai.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
