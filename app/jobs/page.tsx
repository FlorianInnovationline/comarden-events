import type { Metadata } from "next";
import { getJobs } from "@/lib/jobs";
import { JobsPageContent } from "@/components/jobs/JobsPageContent";

export const metadata: Metadata = {
  title: "Jobs",
  description:
    "Comarden recrute : trois postes ouverts en Belgique francophone. Commercial·e interne à Naninne, commercial·e interne à Bertrix, commercial·e externe en Wallonie. CDI, temps plein, package attractif.",
};

export default async function JobsPage() {
  const jobs = await getJobs();
  return <JobsPageContent jobs={jobs} />;
}
