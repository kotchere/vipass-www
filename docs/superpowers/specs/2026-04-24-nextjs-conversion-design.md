# Next.js Conversion Design

## Overview

Convert the static Framer-exported site (`static/`) into a Next.js App Router application at the project root. Keep the existing Framer CSS as-is to avoid visual regressions. Extract repeated HTML patterns into reusable React components.

## Pages

| Route | Source |
|---|---|
| `/` | `static/index.html` |
| `/legal/privacy-policy` | `static/legal/privacy-policy/index.html` |
| `/legal/terms-of-service` | `static/legal/terms-of-service/index.html` |

No other pages. The 404 page can use Next.js's default `not-found.tsx`.

## Directory Structure

```
vipass-www/
  app/
    layout.tsx              # Root layout: global CSS, fonts meta, Header + Footer
    page.tsx                # Homepage: composes all homepage sections
    legal/
      privacy-policy/
        page.tsx            # Privacy policy content
      terms-of-service/
        page.tsx            # Terms of service content
  components/
    layout/
      Header.tsx            # Desktop nav + mobile drawer
      Footer.tsx            # Copyright + legal links
    sections/
      PreLoader.tsx         # Splash screen
      HeroSection.tsx       # Hero: headline, subtext, CTA card
      ExperiencesSection.tsx # 6 ExperienceCard instances
      FeaturesSection.tsx   # 4 feature accordion items
      StatsSection.tsx      # Case study + testimonial
      FaqSection.tsx        # 6 FaqItem instances
      GetAppSection.tsx     # Contact form
    ui/
      Button.tsx            # Pill-style CTA button
      ExperienceCard.tsx    # Image + logo + link card
      FaqItem.tsx           # Expandable question/answer
      GrainOverlay.tsx      # Texture overlay
      LegalContent.tsx      # Prose block for legal pages
  public/
    assets/                 # Moved from static/assets/
      css/
        styles.css          # Existing Framer CSS (global)
        lenis.css           # Lenis scroll CSS
      fonts/                # All woff2 files
      images/               # All images
      video/                # Video files
  static/                   # Kept as reference, not served
```

## Styling Strategy

- Import `public/assets/css/styles.css` globally in `app/layout.tsx`
- All existing Framer class names (`framer-*`, `ssr-variant`, etc.) are preserved exactly as-is in JSX
- No CSS rewrite. Components output the same class names and DOM structure as the static HTML.
- CSS file paths will need updating: `url("assets/fonts/...")` becomes `url("/assets/fonts/...")` since they'll be served from `public/`.

## Component Details

### Header
- Desktop nav: logo + 5 anchor links (Features, Experiences, Stats, FAQ, Download) + hamburger button
- Mobile drawer: full-screen overlay with same links + Home
- Links use `#section-id` anchors on homepage, `../../#section-id` on legal pages (will become `/#section-id`)
- Shared across all pages via root layout

### Footer
- Copyright text: "2026 Vipass. All rights reserved."
- Privacy Policy link -> `/legal/privacy-policy`
- Terms of Service link -> `/legal/terms-of-service`
- Shared across all pages via root layout

### ExperienceCard
Props: `image`, `logo`, `title`, `href`
- 6 instances in ExperiencesSection
- All currently link to `#getapp`

### FaqItem
Props: `question`, `answer`
- 6 instances in FaqSection
- Accordion expand/collapse behavior

### Button
Props: `children`, `href?`, `onClick?`, `variant?`
- Used in: nav CTA, hero card, form submit
- Two text layers for hover animation effect

### LegalContent
Props: `title`, `lastUpdated`, `content` (HTML string)
- Shared by both legal pages, only content differs

## Data

FAQ questions, experience cards, stats numbers, and legal content will be defined as plain data objects/arrays in each section component or co-located data files. No external data fetching needed — everything is static.

## Client vs Server Components

- **Server components** (default): All section components, layout, pages, Footer
- **Client components** (`"use client"`): Header (mobile drawer toggle state), FaqItem (accordion expand/collapse), PreLoader (animation timing)
- Contact form in GetAppSection: client component for form state

## Migration Notes

- The Framer JS runtime (`framer.Dlovmyt9.mjs`, `script_main.Dzk4ddIc.mjs`, etc.) will NOT be carried over. The React hydration and Framer runtime are replaced by Next.js.
- Animations that were handled by Framer Motion in the JS bundles will need to be re-implemented if desired (scroll-triggered reveals, preloader). For MVP, static rendering without animations is acceptable.
- The `lenis` smooth scroll CSS is kept; the JS behavior can be added later via the `lenis` npm package if desired.
