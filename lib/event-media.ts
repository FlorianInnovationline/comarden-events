/**
 * lib/event-media.ts — SERVER ONLY. Uses node:fs at build time.
 *
 * Scans public/images/events/<slug>/ and returns an EventMedia[] array that
 * Next.js bakes into the static pages at build time.
 *
 * Called exclusively by lib/events.ts accessors — never imported directly by
 * pages or components.
 *
 * ── HOW IT WORKS ─────────────────────────────────────────────────────────────
 * 1. The sync script (scripts/sync-event-folders.mjs) creates one folder per
 *    event under public/images/events/<slug>/.
 * 2. The user drops photos into that folder and commits them.
 * 3. On the next `npm run build` / `npm run dev`, this helper scans the folder
 *    and the resulting EventMedia[] is merged into the event data — no code
 *    changes needed.
 *
 * ── MIGRATION PATH (future) ──────────────────────────────────────────────────
 * Current:  photos live in public/images/events/<slug>/ — committed to git,
 *           read at build time, baked into static pages. Photos MUST be
 *           committed to git for Vercel to serve them (Vercel's filesystem is
 *           read-only at runtime).
 *
 * Future:   once the events admin UI is ready, photos will move to the Supabase
 *           `event-media` storage bucket. Replace this file with a fetcher that
 *           reads from Supabase Storage (or the event row's `media jsonb` field)
 *           — a single-file swap. The public/images/events/ folder structure can
 *           be deleted at that time.
 */

import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { EventMedia } from "@/types/events";

const EVENTS_DIR = path.join(process.cwd(), "public", "images", "events");

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const VIDEO_EXTS = new Set([".mp4", ".webm"]);

/** Files that should be ignored when scanning event folders. */
const IGNORED_NAMES = new Set(["readme.txt", ".gitkeep", ".ds_store", "thumbs.db"]);

/**
 * Derives a human-readable alt text from a filename.
 *
 * Examples:
 *   "02-elevate-demo.jpg"  → "Elevate demo"
 *   "001_accueil.png"      → "Accueil"
 *   "team photo.webp"      → "Team photo"
 */
function filenameToAlt(filename: string): string {
  // Strip extension
  const base = filename.replace(/\.[^.]+$/, "");
  // Strip leading digits + separators (e.g. "01-", "002_", "3.")
  const stripped = base.replace(/^\d+[-_.\s]*/, "");
  // Replace remaining separators with spaces
  const spaced = stripped.replace(/[-_]+/g, " ").trim();
  if (!spaced) return base; // fallback: use full base name
  // Sentence-case: uppercase the first character
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/**
 * Returns all EventMedia for a given event slug by scanning its public folder.
 *
 * - Files are sorted alphabetically (locale-aware, numeric), so naming them
 *   "01-...", "02-...", etc. controls display order.
 * - Returns [] if the folder is missing or contains no supported media files.
 * - Never throws — always safe to call at build time.
 */
export function getMediaFromFolder(slug: string): EventMedia[] {
  try {
    const dir = path.join(EVENTS_DIR, slug);
    if (!fs.existsSync(dir)) return [];

    const entries = fs.readdirSync(dir);

    const mediaFiles = entries.filter((name) => {
      if (name.startsWith(".")) return false;
      if (IGNORED_NAMES.has(name.toLowerCase())) return false;
      const ext = path.extname(name).toLowerCase();
      return IMAGE_EXTS.has(ext) || VIDEO_EXTS.has(ext);
    });

    // Sort alphabetically with numeric awareness ("02-" < "10-")
    mediaFiles.sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
    );

    return mediaFiles.map((name): EventMedia => {
      const ext = path.extname(name).toLowerCase();
      const type: "image" | "video" = VIDEO_EXTS.has(ext) ? "video" : "image";
      return {
        type,
        src: `/images/events/${slug}/${name}`,
        alt: filenameToAlt(name),
      };
    });
  } catch {
    // Fail silently — fall back to the event's placeholder media
    return [];
  }
}
