import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarRange,
  Clock,
  GraduationCap,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import {
  getEvents,
  getEventBySlug,
  getAdjacentEvents,
} from "@/lib/events";
import { Reveal } from "@/components/ui/Reveal";
import { PartnerBlock } from "@/components/events/PartnerBlock";
import { PartnerLogo } from "@/components/events/partners/PartnerLogo";
import { ElevateSection } from "@/components/events/partners/ElevateSection";
import { FloratoitSection } from "@/components/events/partners/FloratoitSection";
import { FormationDetail } from "@/components/events/FormationDetail";
import { TeaserDetail } from "@/components/events/TeaserDetail";
import { EventGallery } from "@/components/events/EventGallery";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge, DateBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getPartnerProfile } from "@/lib/partner-profiles";
import { getAvailableDocumentFilenames } from "@/lib/partner-documents";
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

  const isFormation = event.kind === "formation";
  const isTeaser = event.kind === "teaser";
  const partner = event.partners[0];

  const statusLabel =
    event.status === "past" ? "Événement passé" : "À venir";
  const subEyebrow = isFormation
    ? "Formation à la demande"
    : isTeaser
    ? "Événement exclusif"
    : null;

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
            <Badge variant="accent">{statusLabel}</Badge>
            {event.audience && !isTeaser && (
              <Badge variant="ghost" className="text-white">
                <Users className="h-3.5 w-3.5" />
                {event.audience}
              </Badge>
            )}
          </div>

          {isTeaser ? (
            /* Teaser hero — clean stacked layout */
            <div className="mt-6 max-w-3xl">
              {partner && (
                <div className="mb-5 flex w-fit items-center gap-3 rounded-2xl bg-white/95 px-4 py-2.5 shadow-soft">
                  <PartnerLogo
                    name={partner.name}
                    imgClassName="h-9 max-w-[140px] object-contain"
                    fallbackClassName="text-lg"
                  />
                  <span className="text-sm font-bold text-primary">
                    × Comarden Events
                  </span>
                </div>
              )}

              {subEyebrow && (
                <span className="kicker block text-accent">{subEyebrow}</span>
              )}
              <h1 className="heading-xl mt-2 text-balance sm:mt-3">
                {event.title}
              </h1>

              <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-3">
                <span className="inline-flex w-fit items-center gap-2.5 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/15">
                  <Sparkles className="h-4 w-4 shrink-0 text-accent" />
                  <span className="text-sm font-extrabold text-white">
                    {event.dateLabel}
                  </span>
                  {event.dateRevealed === false && (
                    <span className="rounded-full bg-accent/25 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-kicker text-white">
                      Date à confirmer
                    </span>
                  )}
                </span>
                {event.location && (
                  <span className="inline-flex items-center gap-2 text-sm text-white/85">
                    <MapPin className="h-4 w-4 shrink-0 text-accent" />
                    <span className="break-words">{event.location}</span>
                  </span>
                )}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {event.contactCta && (
                  <Button
                    href={event.contactCta.mailto}
                    variant="secondary"
                    size="md"
                    external
                    className="w-full justify-center sm:w-auto"
                  >
                    {event.contactCta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  href="/#newsletter"
                  variant="ghost"
                  size="md"
                  className="w-full justify-center text-white ring-1 ring-white/25 hover:bg-white/10 sm:w-auto"
                >
                  Restez connectés
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 lg:grid-cols-[auto,1fr] lg:items-end lg:gap-8">
              {/* Date / kind slot */}
              {isFormation ? (
                <div className="flex h-20 w-20 flex-col items-center justify-center gap-1.5 rounded-2xl bg-accent px-2 text-primary shadow-soft sm:h-24 sm:w-24">
                  <GraduationCap className="h-7 w-7 sm:h-8 sm:w-8" />
                  <span className="text-center text-[0.55rem] font-extrabold uppercase leading-tight tracking-kicker sm:text-[0.6rem]">
                    Formation
                    <br />
                    sur mesure
                  </span>
                </div>
              ) : (
                <DateBadge
                  day={day}
                  month={month}
                  year={year}
                  className="h-20 w-20 sm:h-24 sm:w-24"
                />
              )}

              <div>
                {subEyebrow && (
                  <span className="kicker block text-accent">{subEyebrow}</span>
                )}
                <h1 className="heading-xl text-balance sm:mt-1.5">
                  {event.title}
                </h1>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/85 sm:mt-5 sm:gap-x-6 sm:gap-y-3 sm:text-sm">
                  {isFormation ? (
                    <>
                      {event.audience && (
                        <span className="inline-flex items-center gap-2">
                          <Users className="h-4 w-4 shrink-0 text-accent" />
                          {event.audience}
                        </span>
                      )}
                      {(event.coverage || event.location) && (
                        <span className="inline-flex items-center gap-2">
                          <MapPin className="h-4 w-4 shrink-0 text-accent" />
                          <span className="break-words">
                            {event.coverage ?? event.location}
                          </span>
                        </span>
                      )}
                      <span className="inline-flex items-center gap-2">
                        <CalendarRange className="h-4 w-4 shrink-0 text-accent" />
                        {event.dateLabel}
                      </span>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>

                {/* Formation: "how it works" mini sequence */}
                {isFormation && event.process && event.process.length > 0 && (
                  <ol className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-3 text-xs font-semibold text-white/85 sm:text-sm">
                    {event.process.map((s, i) => (
                      <li key={s.title} className="inline-flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[0.7rem] font-extrabold text-accent ring-1 ring-white/15">
                          {i + 1}
                        </span>
                        <span>{s.title}</span>
                        {i < event.process!.length - 1 && (
                          <ArrowRight className="h-3.5 w-3.5 text-accent" />
                        )}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      {isFormation ? (
        <section className="relative bg-neutral py-14 sm:py-20">
          <div className="container-narrow">
            <FormationDetail event={event} />
          </div>
        </section>
      ) : isTeaser ? (
        <section className="relative bg-neutral py-14 sm:py-20">
          <div className="container-narrow">
            <TeaserDetail event={event} />
          </div>
        </section>
      ) : (
        <>
          <section className="relative bg-neutral py-14 sm:py-20">
            <div className="container-narrow space-y-10 sm:space-y-14">
              <Reveal>
                {/* "Merci aux participants" is a fixed label for past events —
                    it is NOT stored per-event; event.intro is the dynamic content. */}
                {event.status === "past" && (
                  <div className="mb-6 flex flex-col gap-3 sm:mb-8">
                    <span className="kicker">Compte-rendu</span>
                    <h2 className="heading-lg text-balance text-primary">
                      Merci aux participants
                    </h2>
                    <span
                      aria-hidden
                      className="block h-1 w-16 rounded-full bg-accent"
                    />
                  </div>
                )}
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
                  {(() => {
                    const specialized: React.ReactNode[] = [];
                    const generic: React.ReactNode[] = [];

                    event.partners.forEach((p) => {
                      const profile = getPartnerProfile(p.name);

                      if (profile?.slug === "elevate") {
                        specialized.push(
                          <ElevateSection
                            key={p.name}
                            partner={p}
                            profile={profile}
                            availableDocuments={getAvailableDocumentFilenames(
                              profile.slug
                            )}
                          />
                        );
                      } else if (profile?.slug === "floratoit") {
                        specialized.push(
                          <FloratoitSection
                            key={p.name}
                            partner={p}
                            profile={profile}
                          />
                        );
                      } else {
                        generic.push(
                          <PartnerBlock key={p.name} partner={p} />
                        );
                      }
                    });

                    return (
                      <>
                        {specialized.length > 0 && (
                          <div className="space-y-8 sm:space-y-10">
                            {specialized}
                          </div>
                        )}
                        {generic.length > 0 && (
                          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
                            {generic}
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          </section>

          {/* Gallery */}
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
        </>
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
          {isFormation || isTeaser ? (
            event.contactCta && (
              <Button
                href={event.contactCta.mailto}
                variant="outline"
                size="lg"
                external
                className="w-full justify-center sm:w-auto"
              >
                {event.contactCta.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
            )
          ) : (
            <Button
              href="/souvenirs"
              variant="outline"
              size="lg"
              className="w-full justify-center sm:w-auto"
            >
              Voir tous les souvenirs
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </section>
    </>
  );
}
