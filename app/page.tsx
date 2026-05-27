import { Hero } from "@/components/sections/Hero";
import { ValueStrip } from "@/components/sections/ValueStrip";
import { StatsBand } from "@/components/sections/StatsBand";
import { EventsShowcase } from "@/components/sections/EventsShowcase";
import { SouvenirsTeaser } from "@/components/sections/SouvenirsTeaser";
import { NewsletterCTA } from "@/components/sections/NewsletterCTA";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { events, getAllMedia } from "@/lib/events";

export default function HomePage() {
  const allMedia = getAllMedia();
  return (
    <>
      <Hero />
      <EventsShowcase events={events} />
      <ValueStrip />
      <StatsBand />
      <SouvenirsTeaser media={allMedia} />
      <NewsletterCTA />
      <ClosingCTA />
    </>
  );
}
