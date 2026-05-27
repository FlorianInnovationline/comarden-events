import type { Metadata } from "next";
import { SouvenirsClient } from "@/components/sections/SouvenirsClient";
import { events, getAllMedia } from "@/lib/events";

export const metadata: Metadata = {
  title: "Souvenirs",
  description:
    "Revivez nos événements en images et en vidéos — photos, démos et moments conviviaux."
};

export default function SouvenirsPage() {
  const media = getAllMedia();
  const filters = [
    { id: "all", label: "Tous" },
    ...events.map((e) => ({
      id: e.slug,
      label: `${e.title}${e.audience ? " — " + e.audience : ""}`
    }))
  ];

  return <SouvenirsClient media={media} filters={filters} />;
}
