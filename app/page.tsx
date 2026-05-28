import { getEvents, getAllMedia } from "@/lib/events";
import { Hero } from "@/components/sections/Hero";
import { ValueStrip } from "@/components/sections/ValueStrip";
import { StatsBand } from "@/components/sections/StatsBand";
import { EventsShowcase } from "@/components/sections/EventsShowcase";
import { SouvenirsTeaser } from "@/components/sections/SouvenirsTeaser";
import { NewsletterCTA } from "@/components/sections/NewsletterCTA";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export default async function HomePage() {
  const [allEvents, allMedia] = await Promise.all([getEvents(), getAllMedia()]);
  return (
    <>
      <Hero />
      <EventsShowcase events={allEvents} />
      <ValueStrip />
      <StatsBand />
      <SouvenirsTeaser media={allMedia} />
      <NewsletterCTA />
      <ClosingCTA />
    </>
  );
}
