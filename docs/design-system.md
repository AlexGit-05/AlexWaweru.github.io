# Design system

The visual language for the portfolio. It is taken from the approved mockup, the combined design
([artifact](https://claude.ai/artifact/Tvrxns6zeEoefosRN7EBfW)), and is the target for the Next.js build.
Where the current code differs, this document wins; see [guide.md](guide.md) for how to apply it and
[project-layout.md](project-layout.md) for where things live.

## Principles

1. **One dark surface, two moods.** The home page is *live*: a 3D background, motion and depth. Inner pages
   (About, Projects, Experience, Education, Skills, Contact) are *calm*: the same tokens on a still background,
   so long content is easy to read.
2. **Data is the decoration.** Ornament comes from the subject matter: networks, signals, scan lines,
   detection boxes and monospace readouts. No generic gradients or stock illustration.
3. **Motion explains, then gets out of the way.** Things build themselves once, then settle. Nothing loops
   for attention except small status cues (the availability ping, the scroll cue).
4. **Every effect has a still fallback.** Reduced motion, touch devices and weak GPUs get a complete,
   static page, never a broken one.

## Tokens

All tokens are CSS custom properties on `:root`. The site is dark only (`color-scheme: dark`).

### Color

| Token | Value | Use |
|---|---|---|
| `--ink-0` | `#0a1020` | Page background, header base |
| `--ink-1` | `#0f172a` | Raised bands, image placeholders |
| `--ink-2` | `#141e35` | Cards and tiles |
| `--line` | `rgba(148,163,184,.14)` | All hairline borders and dividers |
| `--fg` | `#e6edf7` | Headings, primary text |
| `--body` | `#c3cdda` | Paragraph text |
| `--muted` | `#94a3b8` | Secondary text, labels, inactive nav |
| `--accent` | `#60a5fa` | Links, focus ring, hover borders |
| `--accent-strong` | `#3b82f6` | Primary button fill, glows |
| `--signal` | `#22d3ee` | Eyebrows, scan lines, detection boxes, data highlights |
| `--ok` | `#34d399` | Status: "Live", "Available", current role |

Rules:

- `--signal` (cyan) marks *data and system* elements. `--accent` (blue) marks *interaction*. Don't swap them.
- `--ok` is only for status. Never use it for decoration.
- Translucent fills are derived from the tokens, e.g. `rgba(15,23,42,.5)` (ink-1) for buttons and
  `rgba(8,14,28,.62)` for glass panels.
- The one gradient is `.grad` for highlighted words in headings: `#93c5fd → --accent → --signal` at 100°.
  The brand mark uses `--accent-strong → --signal` at 135°.

### Typography

| Token | Family | Use |
|---|---|---|
| `--font-display` | Space Grotesk 400/500/600/700 | Everything by default |
| `--font-mono` | JetBrains Mono 400/500 | Eyebrows, chips, badges, roles, dates, metrics labels, readouts |

| Style | Spec |
|---|---|
| Hero name (`.hero h1`) | `clamp(2.7rem, 6vw, 4.4rem)`, line-height 1.02, tracking −0.035em |
| Page title (`.page-head h1`) | `clamp(2.2rem, 5vw, 3.3rem)`, line-height 1.06, max 20ch |
| Section title (`h2`) | `clamp(1.7rem, 3.2vw, 2.3rem)`, line-height 1.12 |
| Card title | 1.02–1.1rem, line-height 1.3 |
| Body | 1rem / 1.65 |
| Lead (`.lead`) | 1.06rem, `--body`, max 60ch |
| Eyebrow (`.eyebrow`) | mono 500 0.74rem, uppercase, tracking .12em, `--signal` |
| Chip | mono 0.76rem |
| Badge | mono 500 0.68rem, uppercase, tracking .06em |

All headings use `text-wrap: balance` and tracking −0.025em. Numbers in stats use `tabular-nums`.

### Space, size and shape

| Item | Value |
|---|---|
| Content width (`.wrap`) | max 1140px |
| Side gutter | 16px on phones, 32px from 720px, plus safe-area insets |
| Section padding | 80px block (`.section`), 72px for home flow sections (`.fl-sec`) |
| Header height | 64px, sticky, blurred `--ink-0` at 75% |
| Radius | `--radius: 14px` for cards; 18px for glass panels and the orbit stage; 10px for buttons and icon buttons; 6px for chips and badges; 999px for pills |
| Button height | 46px (icon buttons 40px) |

### Elevation

There are no drop shadows at rest. Depth comes from borders, blur and glow:

- **Rest:** `1px solid var(--line)`.
- **Hover:** border to `rgba(96,165,250,.45–.6)` plus a soft blue glow, e.g.
  `0 24px 48px -24px rgba(59,130,246,.45)`, and a 1–3px lift.
- **Glass:** `backdrop-filter: blur(8–14px)` over a translucent ink fill. Used for the header, floating
  hero cards, home panels and project cards over the 3D background.
- **Signal glow:** `0 0 18px 4px rgba(34,211,238,.55)` on scan lines and the page wipe only.

### Breakpoints

| Width | Change |
|---|---|
| ≤ 960px | 3-column grids → 2; flagship and architecture stack |
| ≤ 880px | Nav links collapse into the menu button |
| ≤ 760px | Hero stacks; stats go 2×2; job rows stack |
| ≤ 620px | Grids → 1 column |
| `pointer: coarse` | Orbit and drag effects swap for static, wrapping layouts |

## Layers (home page)

From back to front:

1. `#gl`: fixed three.js canvas holding the **Living AI Core** and the **Data River**.
2. `#scene` and `.veil`: the hero photo shatter canvas and a darkening veil for legibility.
3. `main` and `footer` (`z-index: 1`).
4. Header (`z-index: 50`), page wipe (`55`), safe-area strip (`60`).

`#gl`, `#scene` and `.veil` are hidden and paused on inner pages (`html:not([data-view="home"])`).

### Living AI Core

A noise-deformed sphere that follows the scroll:

| Where | Form | Position |
|---|---|---|
| Hero | Blob | Behind the photo |
| About | Blob | Moves to the side |
| Work (orbit) | Point-and-line network | Ring centre |
| Experience → Contact | Gradually morphs to a torus | Side |

The cursor raises a bulge on the surface. The morph is continuous; don't snap between forms.

### Data River

A tunnel of points, edges and travelling signals. The camera flies forward with scroll, and home panels
(`.depth`) drift in from depth as they enter. The river replaces the old 2D network background.

## Components

### Buttons

| Variant | Look | Use |
|---|---|---|
| `.btn` | Translucent ink, blue hairline | Secondary actions |
| `.btn.primary` | `--accent-strong` fill, white text, blue glow | One per view: the main action |
| `.btn.ghost` | Text only, `--muted` → `--fg` | Tertiary, inline |

Every button outside the drawer is magnetic on desktop: it drifts toward the cursor (`.mag` is added while
hovered) and springs back on leave. Touch and reduced motion skip it. Icons are 18px, from Lucide.

### Labels

- **Eyebrow:** a short mono, cyan, uppercase label above a heading, e.g. "Selected work".
- **Chip:** a mono tag for a tool or skill. `.chip.core` marks a core skill.
- **Badge:** a status label in `--ok`, e.g. `Live`, `Current`.
- **Pill:** a rounded status row with a pinging green dot (availability).

### Cards

- **Project card (`.pcard`):** a 16:9 cover, then title, a 3-line clamped description, then a mono footer
  with area and year. A glass fill when over the 3D background. Clicking it opens the project drawer.
- **Metric cover (`.metric`):** used when a project has no image. A large number with a mono label over a
  faint grid and a cyan corner glow.
- **Tilt (`.tilt`):** cards lean toward the cursor and show a soft sheen. Desktop only.
- **Glass panel (`.fl-panel`):** the home flow sections. Cyan hairline, blur, and a large soft cyan glow.
  Panels with `data-href` are clickable as a whole and open the matching inner page.

### Project orbit

A CSS 3D ring (`rotateY` + `translateZ`) of six project cards, with the core in its centre.

- Drag to throw it (with inertia); ←/→ buttons; it pauses on hover; keyboard focus rotates the focused card
  to the front.
- A click that ends a drag doesn't open a card.
- "More projects" opens the Projects page.
- Order: AICE Nexus, Conversation Engine, DataInViz, GPT from scratch, Audio transcription, Air pollution.

### Drawer

A `<dialog>` that opens a project's detail: cover, KPIs (`.d-kpis`), description, "What I did",
"How the model works" (when present), stack chips, links, and the image credit line.

### Inner page parts

| Part | Page |
|---|---|
| `.facts`, `.portrait`, `.trio` | About |
| `.flag` (flagship), `.arch` (architecture diagram), `.kpis`, `.filters`, `.cards` | Projects |
| `.timeline`, `.job` with `.rail`, `.promo` | Experience |
| `.edu`, `.tile` | Education |
| `.skills`, `.tile` with chips | Skills |
| `.channels`, `.chan`, `.field`, `.toast` | Contact |

### Hero

- The photo uses masked fading edges (no hard frame) and a push-in from the full shot to a close-up.
- Detection boxes (`.det`, cyan corner brackets with a mono label) find the person, then the face.
- Two floating glass cards (`.f1`, `.f2`) appear once the intro finishes.
- The hero fills the first screen and ends with the scroll cue (`.hero-cue`).
- On scroll the photo shatters into pixels; it rebuilds when the visitor returns to the top.

## Motion

### Easing and timing

| Name | Curve | Typical duration |
|---|---|---|
| Enter | `cubic-bezier(.2,.7,.2,1)` | 0.5–0.7s |
| Wipe | `cubic-bezier(.6,0,.2,1)` | 0.55s |
| Hover | `ease` | 0.15–0.25s |
| Magnetic return | `cubic-bezier(.2,1.6,.4,1)` | 0.55s |

Stagger lists at 55ms per item (`--i`).

### Landing build-up (every load)

| Time | What happens |
|---|---|
| 0.2–1.2s | Scan line sweeps down the photo |
| 0.8–1.6s | Person detection box |
| 1.4–3.4s | Push-in to the close-up |
| 3.3s | Face detection box; floating cards appear |
| From 0s | Name decodes from random glyphs; role streams in with a caret |
| 1.0s | Lead text streams in word by word (22ms apart) |
| 1.7s / 1.85s | CTAs, then socials, rise in |
| 2.4s | Primary CTA pulses once |

Below the hero, section headings type themselves in and stat numbers count up the first time they enter view.

### Page changes

A cyan wipe line runs down the screen, the old page fades and blurs out (0.22s), and the new page's
blocks enter with a slight 3D tilt (`enter3d`, 0.7s, staggered).

### Reduced motion

`prefers-reduced-motion: reduce` turns off every animation and transition. The hero shows the final close-up
photo, the name and role are shown in full, the 3D layers render one still frame, and the orbit becomes a
wrapping row of cards.

## Accessibility

- Visible focus everywhere: `2px solid var(--accent)`, offset 3px.
- Text contrast: `--fg`, `--body` and `--muted` on `--ink-0` all pass WCAG AA. Over the 3D background,
  text sits on a glass panel or the veil, never directly on the canvas.
- Canvases are decorative (`pointer-events: none`) and never carry content that isn't also in the DOM.
- Whole-card links keep a real button or link inside for keyboard and screen-reader users.
- No horizontal scroll at 320px width.

## Logo

The mark is the hero's detection brackets (`--signal`) around one continuous A-into-W line (`--accent`), with a
short `--signal` crossbar. It says "found and identified" in the same language as the landing page.

| File | Use |
|---|---|
| `components/Logo.tsx` | The header mark. Takes its colours from the tokens and draws itself once per page load (`.logo` in `app/site.css`). |
| `public/images/logo.svg` | Dark backgrounds: blue `#60a5fa`, cyan `#22d3ee`. |
| `public/images/logo-light.svg` | Light backgrounds (CV, light banners): blue `#2563eb`, cyan `#0e7490`. |
| `public/images/favicon.svg` | Tab icon: heavier strokes on a rounded `--ink-0` square. |

Rules: keep the clear space around the brackets at least the width of one bracket stroke; never recolour the
brackets and the line the same; on photos or mixed backgrounds use the dark file on an `--ink-0` square. The
header lockup is the mark at 30px followed by "Alex Waweru" in Space Grotesk 700.

## Imagery

- **Live products** (AICE Nexus, Conversation Engine, DataInViz) use animated GIF covers captured from the
  real product, 720×450.
- **Projects with their own visuals** use those (dashboards, model output).
- **Projects without visuals** use openly licensed photos or historic charts from Wikimedia Commons,
  cropped to 16:9 at 960×540. Each one shows a credit line in the drawer: author, license, source link.
- **The portrait** uses masked edges, never a box or border.

## Voice

- Write in first person and plain words; lead with what was built and the measurable result.
- Use real numbers only (−79%, ~2 s per period, 1,200 backend tests). Don't round up.
- Credit team work as team work and say which part was Alex's.
