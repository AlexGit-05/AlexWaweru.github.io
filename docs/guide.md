# Guide

How to run, change and ship the portfolio. Read [project-layout.md](project-layout.md) for where files live
and [design-system.md](design-system.md) for how things should look and move.

## Run it

Requires Node 20 or newer (CI uses 20).

```bash
npm ci          # install exactly what package-lock.json lists
npm run dev     # http://localhost:3000/AlexWaweru.github.io
npm run lint    # ESLint (next/core-web-vitals + TypeScript)
npm run build   # static export into out/
```

The dev URL includes the base path (`/AlexWaweru.github.io`) because `next.config.ts` sets `basePath`.
`npm run build` exports the static site because of `output: 'export'`.

To check the exported site, serve `out/` under the base path, for example:

```bash
mkdir -p /tmp/site && rm -rf /tmp/site/AlexWaweru.github.io && cp -r out /tmp/site/AlexWaweru.github.io
npx serve /tmp/site   # then open http://localhost:3000/AlexWaweru.github.io
```

## Deploy

Pushing to `main` runs `.github/workflows/nextjs.yml`: it installs with `npm ci`, runs `next build`, uploads
`out/` and deploys to GitHub Pages. It can also be started by hand from the Actions tab.

There is no preview environment, so run `npm run build` locally before pushing; a failed build means the
live site stays on the last good version.

## Common changes

### Update contact details or the CV

Edit `lib/site.ts`; the email is `alexwawerugit@gmail.com` and every link uses `mailto:${site.email}`. To update the CV, replace `public/file/alex-waweru-cv.pdf` and keep the file name so
existing links keep working.

### Add or edit a project

1. Put the cover in `public/images/` (16:9; 960×540 for photos, 720×450 for GIFs; keep GIFs under ~3 MB).
2. Add an entry to `projects` in `lib/projects.ts`. Image paths start with `/AlexWaweru.github.io/images/`.
3. To show it in the home orbit, add its id to `ORBIT_IDS` (six fit the ring best).
4. If the image isn't yours, record the author, license and source page, and show the credit
   (see [Imagery](design-system.md#imagery)). Only use images that allow reuse (CC0, public domain, CC BY,
   CC BY-SA).

### Add a page

1. Create `app/<name>/page.tsx` exporting a default component and, ideally, `metadata`.
2. Add it to `navItems` in `components/Header.tsx`.
3. Use `Link` from `next/link` for internal links so the base path is added for you.

### Add an image anywhere else

Static export disables image optimization, and the base path is not added to `next/image` sources. Build
paths with `BASE` from `lib/site.ts`: `` src={`${BASE}/images/photo.jpg`} ``.

## Working with the design system

- **Use tokens, not raw colours.** Reach for the CSS variables (or their Tailwind mapping) instead of
  hex values. If you need a new colour, add a token first and document it.
- **Pick the right blue.** Cyan `--signal` is for data and system elements; blue `--accent` is for anything
  the visitor can click.
- **One primary button per view.**
- **Fonts:** Space Grotesk for text, JetBrains Mono for labels, dates and numbers. Both are loaded with
  `next/font` in `app/layout.tsx`.
- **Motion:**
  - Use the shared easing `cubic-bezier(.2,.7,.2,1)` and keep entrances under 0.7s.
  - Animate `transform`, `opacity` and `filter` only.
  - Everything must work with `prefers-reduced-motion: reduce`; the global rule in `globals.css` stops CSS
    animation, and JS effects must check `matchMedia('(prefers-reduced-motion: reduce)')` themselves.
- **Heavy effects** (canvas, three.js) go in `'use client'` components, run on the home page only, pause
  when the tab is hidden or the visitor leaves home, and lower quality on touch or low-memory devices.
- **Content stays in the DOM.** Canvases are decoration; any text they show must also exist as HTML.

## Moving a mockup change into the code

The redesign is designed in claude.ai artifacts first (links in
[project-layout.md](project-layout.md#design-mockups)). Once a design is approved:

1. Copy its tokens into `app/globals.css` and the Tailwind mapping.
2. Rebuild each part as a component under `components/`, keeping the class names from the mockup where
   they help (e.g. `fl-panel`, `pcard`).
3. Move its data into `lib/` (projects, jobs, education, skills).
4. Copy its images into `public/images/`.
5. Check the result against the mockup at 1440×900 and 390×844.

## Before you push

- [ ] `npm run lint` and `npm run build` pass.
- [ ] The page works at 390px wide with no horizontal scroll.
- [ ] It works with reduced motion turned on.
- [ ] Every link and button can be reached and used with the keyboard, with a visible focus ring.
- [ ] New images load under the base path and third-party images are credited.
- [ ] Numbers and claims are accurate.
