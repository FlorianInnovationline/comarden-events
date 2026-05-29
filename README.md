# Comarden Events — mini-site

Standalone Next.js 14 mini-site dedicated to **Comarden Events** — separate
from the main `comarden.vercel.app` site, but visually part of the same brand
family. Deploys to **`comarden-events.be`**.

## Tech

- Next.js 14 (App Router) · React 18 · TypeScript (strict)
- Tailwind CSS 3 · `tailwindcss-animate`
- Framer Motion 11 (primary animation engine)
- `lucide-react` for icons
- `clsx` + `tailwind-merge` for the `cn()` utility

No backend / no CMS — all content is local TypeScript in `lib/events.ts`.

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build   # production build
npm run start   # serve the build
npm run lint    # eslint
```

## Editing content (for the client)

All event content is in **`lib/events.ts`** — a typed list of `ComardenEvent`
objects. To add an event, copy one of the existing entries, change the
`slug` / `title` / `date` / `dateLabel` / `audience` / `partners` / `media`
fields. The slug becomes the URL (`/evenements/<slug>`), so keep it
lowercase, dash-separated, and stable.

Field reference is in `types/events.ts`. An `upcoming` event template is
commented at the bottom of `lib/events.ts`.

## Event photos

Each event has a dedicated folder under `public/images/events/<slug>/`.
**Drop photos into the folder → they appear on the site on the next build.**
No code changes needed.

### Workflow

1. **Add a new event** to `lib/events.ts` with a `slug`.
2. **Run** `npm run sync-events` (or just `npm run build` / `npm run dev` —
   the script runs automatically as a pre-hook).
3. A folder `public/images/events/<slug>/` is created with a `README.txt`
   explaining the convention.
4. **Drop your photos** into that folder, e.g.
   ```
   01-accueil.jpg
   02-elevate-demo.jpg
   03-equipe.jpg
   ```
5. **Commit the photos** to git — this is how they reach Vercel
   (Vercel's filesystem is read-only at runtime; photos must be in the repo).
6. On the next dev reload / production build, photos appear on the event
   detail page and in the home-page "Photos" modal automatically.

### Ordering

Files are sorted alphabetically with numeric awareness. Prefix filenames with
`01-`, `02-`, … to control the display order.

### Fallback

While a folder is empty, the event's existing `media` array (picsum
placeholder images) is used instead. The placeholders keep the demo looking
nice until real photos are available.

### Photo guidelines

- **Format:** `.jpg` / `.jpeg` (recommended), `.png`, `.webp`, `.gif`
- **Resolution:** ~1600 px wide is plenty for the gallery
- **File size:** aim for **< 500 KB per image** — optimise with
  [Squoosh](https://squoosh.app/) or `npx sharp-cli` before committing

### Sync script

```bash
npm run sync-events   # create missing folders + refresh README.txt
```

The script also runs automatically before `npm run build` and `npm run dev`
via npm lifecycle hooks (`prebuild` / `predev`).

### Future migration — Supabase Storage

**Current:** photos live in `public/images/events/<slug>/` — committed to
git, scanned at build time by `lib/event-media.ts`, baked into static pages.

**Future:** once the events admin UI is built on the main site, photos will
move to the Supabase `event-media` storage bucket. The migration is a
single-file change: replace `lib/event-media.ts` with a Supabase Storage
fetcher — no other code needs to change. The `public/images/events/` folder
structure can be deleted at that time.

---

## Where to drop other assets

The codebase ships with clearly-marked **`TODO`** placeholders. To replace:

| What | Where to drop it | Then update |
|---|---|---|
| Comarden logo | `public/images/logo.svg` (overwrite) | `components/layout/Logo.tsx` if you switch to an `<img>` |
| Partner logo (ELEVATE) | `public/images/partners/elevate.svg` (overwrite) | already wired in `lib/events.ts` |
| Partner logo (FLORATOIT) | `public/images/partners/floratoit.svg` (overwrite) | already wired in `lib/events.ts` |
| Event photos | `public/images/events/<event-slug>/` (see above) | automatic — no code change needed |
| Event recap video | YouTube ID or `/public/videos/...` | swap `youtubeId` or `src` in the `video` entry |
| OG image | `public/og.png` (1200×630) | already referenced in `app/layout.tsx` |
| Newsletter provider | `components/sections/NewsletterCTA.tsx` | search for the `TODO` and wire your provider |
| Partner website URLs | confirm with the client | update `website` fields in `lib/events.ts` |

All `TODO` comments grep cleanly:

```bash
grep -rn "TODO" app components lib public
```

## Deploy to `comarden-events.be`

1. Push to a GitHub repo.
2. Import the repo in Vercel — defaults work out of the box (Next.js).
3. In **Project Settings → Domains**, add `comarden-events.be` (and `www.`).
4. Point the DNS A / CNAME records to Vercel as instructed.
5. Set `NEXT_PUBLIC_SITE_URL` if you later need it; not required today
   (the metadata reads from `lib/site.ts` → `site.url`).

The build is fully static — no env vars, no secrets needed.

## File tour

```
app/                # routes (App Router)
  page.tsx          # home — composes hero + sections
  evenements/[slug] # event detail (statically generated)
  souvenirs/        # filterable gallery + lightbox
  layout.tsx        # shared shell (header / footer / scroll-progress)
  template.tsx      # page-transition wrapper

components/
  layout/           # Header, Footer, Logo, ScrollProgress
  ui/               # Button, Reveal, RevealGroup, Badge, CountUp, Lightbox, SectionTitle
  sections/         # Hero, ValueStrip, StatsBand, EventsShowcase, SouvenirsTeaser, NewsletterCTA, ClosingCTA, SouvenirsClient
  events/           # EventCard, EventTimeline, PartnerBlock, ContactCard, EventGallery
  media/            # Gallery, GalleryItem, VideoEmbed

lib/
  events.ts         # ⭐ the editable content
  site.ts           # site-wide constants (name, contacts, nav, URLs)
  format.ts         # date helpers
  utils.ts          # cn()

types/
  events.ts         # ComardenEvent / EventPartner / EventMedia
```

## Synchroniser les événements avec le site principal

Toutes les données passent par les fonctions asynchrones de `lib/events.ts`
(`getEvents`, `getEventBySlug`, etc.). Pour basculer vers une source live,
remplacez uniquement le corps de `getEvents()` — le reste du site s'adapte
automatiquement.

### Option A — API REST partagée

Le site principal (`comarden.vercel.app`) expose une route `/api/events` qui
retourne un tableau de `ComardenEvent`. Ici on la consomme :

```ts
// lib/events.ts — corps de getEvents()
const res = await fetch(process.env.NEXT_PUBLIC_EVENTS_API_URL!, {
  next: { revalidate: 300 }, // revalide toutes les 5 minutes (ISR)
});
return res.json() as Promise<ComardenEvent[]>;
```

Variables d'environnement à définir dans Vercel :
```
NEXT_PUBLIC_EVENTS_API_URL=https://comarden.vercel.app/api/events
```

### Option B — Supabase partagée (recommandée)

Les deux sites lisent la même table `events` dans une instance Supabase. Un seul
point de vérité, pas de duplication, les mises à jour sont instantanées.

```ts
// lib/events.ts — corps de getEvents()
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
const { data } = await supabase
  .from("events")
  .select("*")
  .order("date", { ascending: false });
return (data ?? []) as ComardenEvent[];
```

Variables d'environnement à définir dans Vercel :
```
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

Installez le client : `npm install @supabase/supabase-js`

### Option C — Mise à jour manuelle (situation actuelle)

Éditez directement `lib/events.ts`, commitez et Vercel redéploie. Convient tant
que les événements changent peu souvent. Aucune infrastructure supplémentaire.

---

## Accessibility & motion

- All non-essential motion is gated behind `prefers-reduced-motion: reduce`.
- Lightbox is keyboard-navigable (ESC / arrow keys), focus-trapped, click-outside-to-close.
- Mobile menu locks body scroll while open.
- Animations stick to `transform` / `opacity` for 60fps.
