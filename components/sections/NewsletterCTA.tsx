"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Mail, Send } from "lucide-react";
import { useState } from "react";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // TODO: wire to a real newsletter provider (Mailchimp / Brevo / etc.).
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) {
      setError("Merci de saisir une adresse e-mail valide.");
      return;
    }
    setError(null);
    setSuccess(true);
  };

  return (
    <section className="relative overflow-hidden bg-accent py-14 text-primary sm:py-20 lg:py-24">
      <motion.span
        aria-hidden
        className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-2xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.span
        aria-hidden
        className="absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />

      <div className="container relative grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold uppercase tracking-kicker"
          >
            Newsletter
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="heading-lg mt-3 text-balance"
          >
            Ne manquez aucun événement.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-3 max-w-xl text-base text-primary/80"
          >
            Inscrivez-vous pour être prévenu·e dès qu&apos;un nouveau rendez-vous Comarden
            est ouvert aux inscriptions.
          </motion.p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          onSubmit={onSubmit}
          className="relative"
          aria-label="Inscription à la newsletter"
        >
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 rounded-full bg-primary px-6 py-4 text-white shadow-soft"
            >
              <CheckCircle2 className="h-5 w-5 text-accent" />
              <span className="text-sm font-semibold sm:text-base">
                Merci ! Nous vous tiendrons informé·e.
              </span>
            </motion.div>
          ) : (
            <>
              <div className="flex flex-col gap-2 rounded-3xl bg-white p-2 shadow-soft sm:flex-row sm:items-center sm:gap-3 sm:rounded-full">
                <label htmlFor="newsletter-email" className="sr-only">
                  Adresse e-mail
                </label>
                <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-4 sm:rounded-none">
                  <Mail className="h-5 w-5 shrink-0 text-primary" />
                  <input
                    id="newsletter-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.be"
                    className="w-full min-w-0 bg-transparent py-3 text-sm text-primary placeholder:text-primary/40 focus:outline-none"
                    aria-invalid={!!error}
                  />
                </div>
                <button
                  type="submit"
                  className="group inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-light sm:w-auto"
                >
                  S&apos;inscrire
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
              {error && (
                <p className="mt-3 px-4 text-sm font-semibold text-primary-dark" role="alert">
                  {error}
                </p>
              )}
            </>
          )}
        </motion.form>
      </div>
    </section>
  );
}
