#!/usr/bin/env node
/**
 * scripts/sync-event-folders.mjs
 *
 * Creates public/images/events/<slug>/ for every event defined in
 * lib/events.ts, drops a README.txt + .gitkeep in each, and removes
 * .gitkeep once real media files are present.
 *
 * Usage:
 *   node scripts/sync-event-folders.mjs   (or npm run sync-events)
 *
 * Also runs automatically before every build / dev start via the
 * prebuild / predev npm lifecycle hooks.
 *
 * Idempotent — safe to run repeatedly, never destroys existing files.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const EVENTS_TS = path.join(ROOT, "lib", "events.ts");
const EVENTS_DIR = path.join(ROOT, "public", "images", "events");

// ── 1. Extract (slug, title) pairs from lib/events.ts ────────────────────────
// Matches the pattern:  slug: "..."  …  title: "..."  (in the same event block)
// Works because `slug` is always the first field and `title` the second in every
// ComardenEvent object, so they always appear in the same order in the file.
function extractEvents(src) {
  const pairRegex = /slug:\s*"([^"]+)".*?title:\s*"([^"]+)"/gs;
  return [...src.matchAll(pairRegex)].map((m) => ({
    slug: m[1],
    title: m[2],
  }));
}

const eventsTs = fs.readFileSync(EVENTS_TS, "utf8");
const events = extractEvents(eventsTs);

if (events.length === 0) {
  console.error(
    "sync-event-folders: could not extract any slugs from lib/events.ts.\n" +
      "Make sure each event object has slug: and title: fields."
  );
  process.exit(1);
}

// ── 2. Ensure the base events directory exists ────────────────────────────────
fs.mkdirSync(EVENTS_DIR, { recursive: true });

// ── 3. Create / update each event folder ─────────────────────────────────────
let created = 0;
let existed = 0;
let errors = 0;

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const VIDEO_EXTS = new Set([".mp4", ".webm"]);

for (const { slug, title } of events) {
  const dir = path.join(EVENTS_DIR, slug);
  const readmePath = path.join(dir, "README.txt");
  const gitkeepPath = path.join(dir, ".gitkeep");

  try {
    const isNew = !fs.existsSync(dir);
    fs.mkdirSync(dir, { recursive: true });

    // Always write/refresh README.txt
    fs.writeFileSync(readmePath, buildReadme(slug, title), "utf8");

    // Check if there are real media files already
    const files = fs.readdirSync(dir).filter((f) => {
      if (f.startsWith(".") || f.toLowerCase() === "readme.txt") return false;
      const ext = path.extname(f).toLowerCase();
      return IMAGE_EXTS.has(ext) || VIDEO_EXTS.has(ext);
    });

    if (files.length === 0) {
      // No real media yet → keep a .gitkeep so the folder is tracked by git
      if (!fs.existsSync(gitkeepPath)) {
        fs.writeFileSync(gitkeepPath, "", "utf8");
      }
    } else {
      // Real media present → .gitkeep is no longer needed
      if (fs.existsSync(gitkeepPath)) {
        fs.unlinkSync(gitkeepPath);
      }
    }

    if (isNew) {
      created++;
      console.log(`  ✓ Created   public/images/events/${slug}/`);
    } else {
      existed++;
    }
  } catch (err) {
    errors++;
    console.error(`  ✗ Error for ${slug}:`, err.message);
  }
}

const line =
  `\nsync-event-folders: ${created} folder(s) created, ` +
  `${existed} already existed, ${errors} error(s).`;
console.log(line);

if (errors > 0) process.exit(1);

// ── Helper ────────────────────────────────────────────────────────────────────
function buildReadme(slug, title) {
  return (
    `Photos & vidéos de l'événement: ${title}\n` +
    `\n` +
    `Dépose ici les fichiers à afficher sur la page de l'événement.\n` +
    `Formats: .jpg, .jpeg, .png, .webp, .gif, .mp4, .webm\n` +
    `Ordre: alphabétique. Préfixe les noms (01-..., 02-...) pour contrôler l'ordre.\n` +
    `Exemple:\n` +
    `  01-accueil.jpg\n` +
    `  02-elevate-demo.jpg\n` +
    `  03-equipe.jpg\n` +
    `\n` +
    `Le site lit automatiquement ce dossier au build.\n` +
    `Pas besoin de toucher au code.\n`
  );
}
