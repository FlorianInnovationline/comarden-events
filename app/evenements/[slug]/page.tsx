import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, MapPin, Users } from "lucide-react";
import {
  getEvents,
  getEventBySlug,
  getAdjacentEvents,
} from "@/lib/events";
import { Reveal } from "@/components/ui/Reveal";
import { PartnerBlock } from "@/components/events/PartnerBlock";
import { EventGallery } from "@/components/events/EventGallery";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge, DateBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { splitDate } from "@/lib/format";

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);
  if (!event) return { title: "Événement introuvable" };
  return {
    title: `${event.title}${event.audience ? " — " + event.audience : ""} — ${event.dateLabel}`,
    description: event.teaser,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = await getEventBySlug(params.slug);
  if (!event) notFound();

  const { day, month, year } = splitDate(event.date);
  const { prev, next } = await getAdjacentEvents(event.slug);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary pb-14 pt-24 text-white sm:pb-20 sm:pt-32 lg:pt-40">
        <div
          aria-hidden
          className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-32 right-0 h-[26rem] w-[26rem] rounded-full bg-primary-light/40 blur-3xl"
        />

        <div className="container relative">
          <Link
            href="/#evenements"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Tous les événements
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Badge variant="accent">
              {event.status === "past" ? "Événement passé" : "À venir"}
            </Badge>
            {event.audience && (
              <Badge variant="ghost" className="text-white">
                <Users className="h-3.5 w-3.5" />
                {event.audience}
              </Badge>
            )}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[auto,1fr] lg:items-end lg:gap-8">
            <DateBadge
              day={day}
              month={month}
              year={year}
              className="h-20 w-20 sm:h-24 sm:w-24"
            />
            <div>
              <h1 className="heading-xl text-balance">{event.title}</h1>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/85 sm:mt-5 sm:gap-x-6 sm:gap-y-3 sm:text-sm">
                {event.location && (
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-accent" />
                    <span className="break-words">{event.location}</span>
                  </span>
                )}
                {event.horaires && (
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4 shrink-0 text-accent" />
                    {event.horaires}
                  </span>
                )}
                <span className="inline-flex items-center gap-2">
                  <span className="text-accent">•</span>
                  {event.dateLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-neutral py-14 sm:py-20">
        <div className="container-narrow space-y-10 sm:space-y-14">
          <Reveal>
            <p className="text-base leading-relaxed text-ink sm:text-lg lg:text-xl">
              {event.intro}
            </p>
          </Reveal>

          {event.partners.length > 0 && (
            <div className="space-y-8">
              <SectionTitle
                kicker="Partenaires & récap"
                title="Merci à nos partenaires"
                description="Un compte-rendu rapide des interventions, et comment les recontacter."
              />
              <div className="grid gap-5 md:grid-cols-2">
                {event.partners.map((p) => (
                  <PartnerBlock key={p.name} partner={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────────────────────── */}
      {event.media.length > 0 && (
        <section className="bg-white py-14 sm:py-20">
          <div className="container">
            <SectionTitle
              kicker="Souvenirs"
              title="Revivez la journée"
              description="Photos et vidéos de l'événement. Cliquez pour agrandir."
            />
            <div className="mt-8 sm:mt-10">
              <EventGallery media={event.media} />
            </div>
          </div>
        </section>
      )}

      {/* ── Prev / Next navigation ────────────────────────────────────────── */}
      <section className="bg-neutral py-12 sm:py-16">
        <div className="container grid gap-4 sm:grid-cols-2 sm:gap-6">
          {prev ? (
            <Link
              href={`/evenements/${prev.slug}`}
              className="group flex flex-col rounded-2xl bg-white p-5 shadow-soft ring-1 ring-primary/5 transition hover:shadow-glow sm:p-6"
            >
              <span className="kicker text-primary/60">← Précédent</span>
              <span className="mt-2 text-base font-bold text-primary sm:text-lg">
                {prev.title}
              </span>
              <span className="mt-1 text-sm text-ink-light">{prev.dateLabel}</span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {next ? (
            <Link
              href={`/evenements/${next.slug}`}
              className="group flex flex-col rounded-2xl bg-white p-5 shadow-soft ring-1 ring-primary/5 transition hover:shadow-glow sm:items-end sm:p-6 sm:text-right"
            >
              <span className="kicker text-primary/60">Suivant →</span>
              <span className="mt-2 text-base font-bold text-primary sm:text-lg">
                {next.title}
              </span>
              <span className="mt-1 text-sm text-ink-light">{next.dateLabel}</span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
        </div>

        <div className="container mt-10 flex flex-col flex-wrap justify-center gap-3 sm:mt-12 sm:flex-row">
          <Button
            href="/#evenements"
            variant="primary"
            size="lg"
            className="w-full justify-center sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux événements
          </Button>
          <Button
            href="/souvenirs"
            variant="outline"
            size="lg"
            className="w-full justify-center sm:w-auto"
          >
            Voir tous les souvenirs
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </>
  );
}
