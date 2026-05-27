"use client";

import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

const STATS = [
  { value: 1977, label: "Depuis", suffix: "" },
  { value: 2, label: "Sites (Bertrix & Naninne)", suffix: "" },
  { value: 12, label: "Événements organisés", suffix: "+" },
  { value: 100, label: "Pensés pour vous", suffix: "%" }
];

export function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-primary py-14 text-white sm:py-20">
      <div
        aria-hidden
        className="absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-primary-light/40 blur-3xl"
      />

      <div className="container relative">
        <Reveal>
          <p className="kicker mb-4 text-center">Notre histoire en chiffres</p>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur transition-colors hover:border-accent/40 sm:p-6">
                <div className="text-3xl font-extrabold tracking-tight text-accent sm:text-4xl lg:text-5xl">
                  <CountUp to={s.value} suffix={s.suffix} duration={1.6} />
                </div>
                <p className="mt-2 break-words text-[0.7rem] font-semibold uppercase tracking-kicker text-white/75 sm:text-xs lg:text-sm">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-10 text-center text-xs text-white/70 sm:mt-12 sm:text-sm">
            Comarden vous couvre depuis 1977.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
