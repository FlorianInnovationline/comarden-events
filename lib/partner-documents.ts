/**
 * lib/partner-documents.ts — SERVER ONLY. Uses node:fs at build time.
 *
 * Scans public/documents/<partner-slug>/ and reports which PDF files are
 * actually present, so the UI can enable a "Télécharger" button only for
 * documents that exist (and show "Bientôt disponible" otherwise).
 *
 * Called by the event detail page (a server component) and the result — a plain
 * string[] — is passed into the client partner sections. Never import this from
 * a client component.
 *
 * ── HOW IT WORKS ─────────────────────────────────────────────────────────────
 * 1. lib/partner-profiles.ts declares the expected document filenames.
 * 2. The sync script ensures public/documents/<slug>/ exists with a README.
 * 3. The user drops the matching PDFs into that folder and commits them.
 * 4. On the next build this scan picks them up and activates the buttons.
 *    Files MUST be committed to git — Vercel's filesystem is read-only at
 *    runtime, so static files in public/ are served by the CDN.
 *
 * ── MIGRATION PATH (future) ──────────────────────────────────────────────────
 * Replace this scan with a Supabase Storage listing (documents bucket) when the
 * admin UI lands — a single-file swap, same string[] contract.
 */

import "server-only";
import fs from "node:fs";
import path from "node:path";

const DOCS_DIR = path.join(process.cwd(), "public", "documents");

/**
 * Returns the set of PDF filenames present in public/documents/<partnerSlug>/.
 *
 * - Returns an empty array if the folder is missing or holds no PDFs.
 * - Never throws — always safe to call at build time.
 */
export function getAvailableDocumentFilenames(partnerSlug: string): string[] {
  try {
    const dir = path.join(DOCS_DIR, partnerSlug);
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((name) => name.toLowerCase().endsWith(".pdf"));
  } catch {
    return [];
  }
}
