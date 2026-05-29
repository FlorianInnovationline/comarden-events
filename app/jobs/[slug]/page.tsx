import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Gift } from "lucide-react";
import { getJobs, getJobBySlug, getAdjacentJobs } from "@/lib/jobs";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { JobDetailHero } from "@/components/jobs/detail/JobDetailHero";
import { JobApplicationForm } from "@/components/jobs/JobApplicationForm";

// ── Static generation ─────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const job = await getJobBySlug(params.slug);
  if (!job) return { title: "Offre introuvable" };
  return {
    title: `${job.shortTitle} — Comarden Recrute`,
    description: job.teaser,
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function JobDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [job, allJobs] = await Promise.all([
    getJobBySlug(params.slug),
    getJobs(),
  ]);
  if (!job) notFound();

  const { prev, next } = await getAdjacentJobs(job.slug);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <JobDetailHero job={job} />

      {/* ── À propos de Comarden ─────────────────────────────────────────── */}
      <section className="bg-neutral py-14 sm:py-20">
        <div className="container-narrow">
          <Reveal>
            <span className="kicker block mb-3">À propos de Comarden</span>
            <p className="text-base leading-relaxed text-ink sm:text-lg">
              {job.companyIntro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Le poste ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-20">
        <div className="container-narrow space-y-10 sm:space-y-14">
          <Reveal>
            <SectionTitle kicker="Le poste" title="Votre rôle" />
            <p className="mt-6 text-base leading-relaxed text-ink-light sm:text-lg">
              {job.roleOverview}
            </p>
          </Reveal>

          {/* Responsibilities */}
          <div>
            <Reveal>
              <h2 className="heading-md text-primary">Vos responsabilités</h2>
              <span aria-hidden className="mt-3 block h-1 w-12 rounded-full bg-accent" />
            </Reveal>
            <ul className="mt-6 space-y-3" aria-label="Liste des responsabilités">
              {job.responsibilities.map((item, i) => (
                <Reveal key={i} delay={i * 0.06} as="li">
                  <div className="group flex items-start gap-4 rounded-xl border border-primary/6 bg-neutral px-4 py-4 transition-all hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-soft sm:px-5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="text-sm leading-relaxed text-ink sm:text-base">
                      {item}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Profile */}
          <div>
            <Reveal>
              <h2 className="heading-md text-primary">Profil recherché</h2>
              <span aria-hidden className="mt-3 block h-1 w-12 rounded-full bg-accent" />
            </Reveal>
            <ul className="mt-6 space-y-3" aria-label="Profil recherché">
              {job.profile.map((item, i) => (
                <Reveal key={i} delay={i * 0.06} as="li">
                  <div className="group flex items-start gap-4 rounded-xl border border-primary/6 bg-neutral px-4 py-4 transition-all hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-soft sm:px-5">
                    <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-primary/40 transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                    <span className="text-sm leading-relaxed text-ink sm:text-base">
                      {item}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Horaires — conditional */}
          {job.horaires && (
            <Reveal>
              <div className="flex items-center gap-4 rounded-2xl border border-primary/10 bg-primary/5 px-5 py-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-kicker text-primary/60">
                    Horaires
                  </p>
                  <p className="mt-0.5 font-bold text-primary">{job.horaires}</p>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── Ce que nous offrons ───────────────────────────────────────────── */}
      <section className="overflow-hidden bg-primary py-14 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-accent/15 blur-3xl"
        />
        <div className="container-narrow relative">
          <Reveal>
            <SectionTitle
              kicker="Ce que nous offrons"
              title="Vos avantages"
              tone="dark"
            />
          </Reveal>
          <ul className="mt-8 space-y-3 sm:mt-10" aria-label="Avantages du poste">
            {job.benefits.map((item, i) => (
              <Reveal key={i} delay={i * 0.05} as="li">
                <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/8 px-4 py-4 backdrop-blur transition-colors hover:border-accent/30 hover:bg-white/12 sm:px-5">
                  <Gift className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm leading-relaxed text-white/90 sm:text-base">
                    {item}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Application form ─────────────────────────────────────────────── */}
      <div id="postuler" className="scroll-mt-24">
        <JobApplicationForm jobs={allJobs} initialJobSlug={job.slug} />
      </div>

      {/* ── Prev / Next navigation ───────────────────────────────────────── */}
      <section className="bg-neutral py-12 sm:py-16">
        <div className="container grid gap-4 sm:grid-cols-2 sm:gap-6">
          {prev ? (
            <Link
              href={`/jobs/${prev.slug}`}
              className="group flex flex-col rounded-2xl bg-white p-5 shadow-soft ring-1 ring-primary/5 transition hover:shadow-glow sm:p-6"
            >
              <span className="kicker text-primary/60">← Offre précédente</span>
              <span className="mt-2 text-base font-bold text-primary sm:text-lg">
                {prev.shortTitle}
              </span>
              <span className="mt-1 text-sm text-ink-light">{prev.location}</span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {next ? (
            <Link
              href={`/jobs/${next.slug}`}
              className="group flex flex-col rounded-2xl bg-white p-5 shadow-soft ring-1 ring-primary/5 transition hover:shadow-glow sm:items-end sm:p-6 sm:text-right"
            >
              <span className="kicker text-primary/60">Offre suivante →</span>
              <span className="mt-2 text-base font-bold text-primary sm:text-lg">
                {next.shortTitle}
              </span>
              <span className="mt-1 text-sm text-ink-light">{next.location}</span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
        </div>

        <div className="container mt-8 flex justify-center">
          <Link
            href="/jobs"
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 border-primary/20 px-6 py-2.5 text-sm font-bold text-primary transition hover:border-primary hover:bg-primary hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Toutes les offres
          </Link>
        </div>
      </section>
    </>
  );
}
