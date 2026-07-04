## Direction

Reposition the site as a serious editorial-institution: **Paper & Ink** — off-white paper (#f5f3ee), soft ink rules (#e8e4dd), rich ink (#2d2d2d), single claret accent (#8A1E2C). Headlines set in **Libre Baskerville**, UI/body in **IBM Plex Sans**. High density: eyebrows, hairline rules, small-caps, tight leading, layered sections — think *The Economist* meets a university course catalog.

## 1. Design tokens (`src/index.css`, `tailwind.config.ts`)

- Rewrite `:root` palette:
  - `--background 40 30% 96%` (paper)
  - `--foreground 0 0% 12%` (ink)
  - `--card 0 0% 100%`, subtle `--muted 40 20% 92%`
  - `--primary 353 64% 33%` (claret, kept)
  - `--accent 0 0% 12%` (ink accent — replaces brass to fit editorial)
  - `--border 30 12% 82%` (hairline)
  - Editorial-only tokens: `--rule` (1px ink hairline), `--paper-grain` (very subtle noise bg), `--shadow-editorial` (crisp low shadow, no glow)
- Dark mode: inverted (ink paper #131211, cream foreground, same claret).
- Remove purple/teal petal colors; keep 2 muted tones only.

## 2. Typography

- Install via bun: `@fontsource/libre-baskerville`, `@fontsource/ibm-plex-sans`, `@fontsource/ibm-plex-mono` (for eyebrows/numbers).
- Import in `src/main.tsx`.
- Tailwind `fontFamily`: `serif: Libre Baskerville`, `sans: IBM Plex Sans`, `mono: IBM Plex Mono`, `display: Libre Baskerville`.
- Remove Google Fonts `@import` lines from `index.css` (Playfair, Poppins, Inter, Lora, Crimson).
- Add utilities: `.eyebrow` (mono, uppercase, tracking-widest, tiny), `.rule` (1px ink line), `.dropcap`.

## 3. Homepage (`src/pages/Home.tsx` + `src/components/home/*`)

- **Hero**: replace generic centered hero with an editorial split — left: oversized serif headline with an italic pull, small-caps kicker "Est. Alexandria", claret rule, twin CTAs (filled claret / ghost ink); right: single portrait/classroom photo in a bordered plate with caption + volume/issue numbering ("Vol. VI · Cambridge & British Council standards").
- **Why Choose Us**: convert to a 3-column "masthead" grid with numbered items (01–06), hairline dividers, mono numerals, italic serif titles.
- **Learning Guide**: keep 4 steps but restyle as a horizontal timeline with vertical hairline rule + mono step numbers; drop colored gradient tiles.
- **Testimonials**: quote-first layout, huge italic pull-quote per slide, cited author in small caps.
- **Courses preview / FAQ / Location**: unify with card style below.

## 4. Global cards & buttons

- Card: white paper, 1px hairline border, no radius soup (radius 6px), crisp shadow only on hover, top-left eyebrow.
- Buttons (`button.tsx` variants): add `editorial` (claret solid, square-ish), `ghost-ink` (ink border), keep default; remove glossy gradients.
- Badge: outlined pill in mono.

## 5. Navigation & mobile UX

- **Navbar**: two-tier — top thin bar with date + level pill + login; main bar with wordmark in serif, section links in mono small-caps. Sticky with hairline underline.
- **Breadcrumbs**: single mono line, `/` separators, muted.
- **MobileBottomNav**: swap heavy pills for minimal ink icons + label, active = claret underline (not filled tile). Bigger 48px targets.
- **GlobalSearch**: command-palette look, mono input, keyboard hint chip.
- **PageTransition**: reduce to opacity fade 200ms (drop blur/translate for a snappier editorial feel).

## 6. Courses & lessons UI

- **Courses grid** (`Courses.tsx`, `CoursesSection.tsx`): masonry-lite bento with one featured "cover story" course + smaller cards; each card shows level tag (A1–C2) in mono, lesson count, hairline divider, italic subtitle.
- **CategoryDetail / CourseProgress**: add a chapter-index sidebar on desktop, roman-numeral chapters, progress as a thin claret bar.
- **LessonPage / SlideViewer**: tighten reader — keep Lora prose but align to new tokens; add running header (course · lesson · slide n/N) and thin footer progress. Move controls into a compact bottom bar with mono labels.
- **BookTeacherFAB**: shrink to a rectangular ink chip with claret dot; no pulse-glow.

## 7. Cleanup

- Remove/retire: petal decorations on marketing pages, purple/teal accents, pulse-glow utility, drop shadows with color glow.
- Keep animations minimal: fade + 8px rise, 200–300ms, standard ease.

## Technical notes

- Files touched (approx):
  - `src/index.css`, `tailwind.config.ts`, `src/main.tsx`
  - `src/pages/Home.tsx`
  - `src/components/home/{LearningGuide,TestimonialsSection,CoursesSection,FAQSection,LocationSection}.tsx`
  - `src/components/{Navbar,Breadcrumbs,MobileBottomNav,GlobalSearch,BookTeacherFAB,PageTransition,Footer}.tsx`
  - `src/components/ui/{button,card,badge}.tsx` (variant additions only)
  - `src/pages/{Courses,CategoryDetail,CourseProgress,LessonPage}.tsx`, `src/components/SlideViewer.tsx`
- No schema/RLS changes. No new deps beyond `@fontsource/*`.
- Verify with Playwright screenshots of `/`, `/courses`, one lesson, mobile 390px after implementation.

## Out of scope

- Rewriting lesson data, backend, auth, or admin surfaces.
- New illustrations/photos beyond restyling existing assets.

Approve and I'll ship it in this pass.