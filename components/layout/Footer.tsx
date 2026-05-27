import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { Logo } from "@/components/layout/Logo";

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-primary text-white">
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="container relative grid gap-10 py-12 sm:gap-12 md:grid-cols-3 md:py-20">
        <div>
          <Logo className="h-8 text-white" />
          <p className="mt-5 max-w-sm text-balance text-base text-white/80">
            {site.tagline}
          </p>
          <a
            href={site.mainSiteUrl}
            className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
          >
            Découvrir le site principal
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div>
          <p className="kicker mb-4 text-accent">Contact</p>
          <ul className="space-y-3 text-sm text-white/85">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>
                {site.contact.locations.join(" & ")} — {site.contact.country}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={site.contact.phoneHref} className="hover:text-accent">
                {site.contact.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={`mailto:${site.contact.email}`} className="hover:text-accent">
                {site.contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="kicker mb-4 text-accent">Navigation</p>
          <ul className="space-y-2 text-sm text-white/85">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-start justify-between gap-3 py-6 text-xs text-white/60 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Comarden. Tous droits réservés.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <a href={site.legal.mentionsLegales} className="hover:text-accent">
                Mentions légales
              </a>
            </li>
            <li>
              <a href={site.legal.confidentialite} className="hover:text-accent">
                Confidentialité
              </a>
            </li>
            <li>
              <a href={site.legal.cookies} className="hover:text-accent">
                Cookies
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
