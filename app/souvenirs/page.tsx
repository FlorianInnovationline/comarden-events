import type { Metadata } from "next";
import { getEvents, getAllMedia } from "@/lib/events";
import { SouvenirsClient } from "@/components/sections/SouvenirsClient";

export const metadata: Metadata = {
  title: "Souvenirs",
  description:
    "Revivez nos événements en images et en vidéos : photos, démos et moments conviviaux."
};

export default async function SouvenirsPage() {
  const [events, media] = await Promise.all([getEvents(), getAllMedia()]);
  const filters = [
    { id: "all", label: "Tous" },
    ...events.map((e) => ({
      id: e.slug,
      label: `${e.title}${e.audience ? " — " + e.audience : ""}`
    }))
  ];
  return <SouvenirsClient media={media} filters={filters} />;
}
