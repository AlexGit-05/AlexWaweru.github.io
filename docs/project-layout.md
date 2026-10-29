# Project layout

How the repository is organised. The site is a Next.js 15 (App Router) app, exported as static HTML and
hosted on GitHub Pages at `https://alexgit-05.github.io/AlexWaweru.github.io`.

See [guide.md](guide.md) for how to work in it and [design-system.md](design-system.md) for the visual rules.

## Tree

```
.
├── app/                      Routes (App Router). One folder per page.
│   ├── layout.tsx            Fonts, <Header>, page transition, <Footer>, project drawer, toast, metadata
│   ├── globals.css           Tailwind layers and the shadcn colour variables (match the tokens below)
│   ├── site.css              The design system: tokens (--ink-*, --signal, …) and every component style
│   ├── page.tsx              Home: <Background>, <Hero>, <HomeFlow>
│   └── about | projects | experience | education | skills | contact /page.tsx
├── components/
│   ├── Header.tsx            Sticky nav: scrolls on home, routes on inner pages
│   ├── Logo.tsx              The animated AW mark used in the header
│   ├── Footer.tsx
│   ├── PageTransition.tsx    Sets <html data-view>, plays the wipe line and enter3d stagger
│   ├── ProjectCard.tsx       Card used on /projects (`card`) and in the orbit (`pcard`)
│   ├── ProjectDrawer.tsx     The one project detail drawer; opened with openProject(id)
│   ├── ProjectsView.tsx      Filter bar and card grid for /projects
│   ├── ContactForm.tsx       Validates, then opens the visitor's email app (mailto)
│   ├── CopyButton.tsx, OpenProjectButton.tsx, PageHead.tsx, SkillOrbs.tsx, Toast.tsx
│   ├── home/
│   │   ├── Hero.tsx          Photo push-in, detection boxes, name decode, role/lead streaming
│   │   ├── HomeFlow.tsx      About, Work, Experience, Education, Skills, Contact sections
│   │   ├── ProjectOrbit.tsx  The 3D ring of six projects (drag, arrows, hover pause)
│   │   ├── ContactPanel.tsx, FlowEffects.tsx (count-up, typed headings)
│   │   ├── Background.tsx    Mounts the 3D layers on home only and tears them down on leave
│   │   └── Interactions.tsx  Card tilt and magnetic buttons, on every page
│   └── ui/                   shadcn/ui primitives (button, input, textarea; currently unused)
├── lib/
│   ├── site.ts               BASE path, email, phone, GitHub, LinkedIn, CV path, location
│   ├── projects.ts           Project type, `areas`, the 13 projects, ORBIT_IDS
│   ├── experience.ts, education.ts, skills.ts, home.ts   Page and home-section content
│   ├── ui-events.ts          openProject(), say(), prefersReducedMotion()
│   ├── utils.ts              cn() for shadcn
│   └── fx/                   Plain-JS three.js and canvas code ported from the mockup
│       ├── background.js     Living AI Core + Data River on #gl
│       ├── scene.js          Hero photo shatter on #scene
│       ├── orbs.js           Throwable skill orbs (Skills page)
│       └── interactions.js   Tilt and magnetic buttons
├── public/
│   ├── images/               Portrait, hero shots, GIF and photo covers, logo*.svg, favicon.svg
│   └── file/alex-waweru-cv.pdf
├── docs/                     This documentation
├── .github/workflows/nextjs.yml  Build and deploy to GitHub Pages on push to main
├── next.config.ts            basePath, assetPrefix, output: 'export', unoptimized images
└── tailwind.config.js, postcss.config.js, components.json, eslint.config.mjs, tsconfig.json
```

Build output (`.next/`, `out/`) and `node_modules/` are not committed.

## Where to change what

| To change | Edit |
|---|---|
| Email, socials, CV link | `lib/site.ts` |
| A project's text, image or link | `lib/projects.ts` (image file in `public/images/`) |
| Jobs, education, skills | `lib/experience.ts`, `lib/education.ts`, `lib/skills.ts`; the short home versions are in `lib/home.ts` |
| The 3D background or photo effect | `lib/fx/background.js`, `lib/fx/scene.js` |
| Nav links | `navItems` in `components/Header.tsx` |
| Colours, radius, component styles | `app/site.css` (tokens at the top); keep the shadcn variables in `app/globals.css` in step |
| Page title and description for search | `metadata` in `app/layout.tsx` |
| Deploy settings | `next.config.ts` and `.github/workflows/nextjs.yml` |
| The CV | Replace `public/file/alex-waweru-cv.pdf` (keep the name) |

## Data flow

- Pages are server components unless they need the browser; interactive pieces live in `components/home/`
  and are marked `'use client'`.
- Content is plain TypeScript in `lib/`. There is no CMS or API; everything is baked in at build time.
- Asset paths include the base path (`BASE` from `lib/site.ts`), because images are unoptimized in a
  static export and `next/image` doesn't add it.

## Design mockups

The redesign is built as claude.ai artifacts first and moved into this repo after approval.

| Artifact | Role |
|---|---|
| [Combined design](https://claude.ai/artifact/Tvrxns6zeEoefosRN7EBfW) | **The target.** Design 1 landing + design 2 scroll flow + orbit |
| [Design 1](https://claude.ai/artifact/TA6FcNrpVZVeKR2WftP7yo) | Multi-page site, landing intro, inner pages |
| [Design 2](https://claude.ai/artifact/9ssCJSwx2o9b8vr4eSUfQf) | Living AI Core + Data River scroll flow |
| [Physics sample](https://claude.ai/artifact/CSXVwDgC3zrgaNdvD5g2Jb) | Source of the project orbit (physics dropped) |
| [Three concepts](https://claude.ai/artifact/KWpPZ8TeuWS9SuajDfz27P) | Early exploration |
