import type { Metadata } from "next";
import { getJobs } from "@/lib/jobs";
import { JobsPageContent } from "@/components/jobs/JobsPageContent";

export const metadata: Metadata = {
  title: "Jobs",
  description:
    "Comarden recrute : deux postes ouverts en Belgique francophone. Commercial·e interne à Bertrix et magasinier·ère à Naninne. CDI, temps plein, package attractif.",
};

export default async function JobsPage() {
  const jobs = await getJobs();
  return <JobsPageContent jobs={jobs} />;
}
