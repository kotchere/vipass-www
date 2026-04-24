# Next.js Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the static Framer-exported site into a Next.js App Router application with reusable components, keeping the existing Framer CSS intact.

**Architecture:** Next.js App Router with server components by default. Client components only where interactivity is needed (mobile nav toggle, FAQ accordion, preloader animation). The existing 225KB Framer CSS is imported globally — components preserve exact Framer class names and DOM structure.

**Tech Stack:** Next.js 15, React 19, TypeScript

**Reference:** The complete static HTML is at `static/index.html`. Legal pages at `static/legal/*/index.html`. All HTML structure, class names, and data values referenced in this plan come directly from those files.

---

### Task 1: Scaffold Next.js and Move Assets

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `app/layout.tsx`, `app/page.tsx`
- Move: `static/assets/` -> `public/assets/`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /Users/kwaku/Documents/GitHub/vipass-www
npx create-next-app@latest . --typescript --app --no-tailwind --no-eslint --no-src-dir --import-alias "@/*" --use-npm
```

Accept overwriting if prompted. This creates the app directory structure.

- [ ] **Step 2: Move static assets to public/**

```bash
cp -r static/assets public/assets
```

- [ ] **Step 3: Fix CSS font paths**

In `public/assets/css/styles.css`, the font URLs use relative paths like `url("assets/fonts/...")`. These need to become absolute paths `url("/assets/fonts/...")` since they'll be served from `public/`.

```bash
cd /Users/kwaku/Documents/GitHub/vipass-www
sed -i '' 's|url("assets/|url("/assets/|g' public/assets/css/styles.css
sed -i '' "s|url('assets/|url('/assets/|g" public/assets/css/styles.css
```

- [ ] **Step 4: Create root layout**

Create `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vipass - The best nights out start here",
  description:
    "Find events, get tickets, and stay in the loop without the hassle.",
  openGraph: {
    title: "Vipass - The best nights out start here",
    description:
      "Find events, get tickets, and stay in the loop without the hassle.",
    images: ["/assets/images/meG1yXz9jqwhzC1XCm7WP0Ae9Zc.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vipass - The best nights out start here",
    description:
      "Find events, get tickets, and stay in the loop without the hassle.",
    images: ["/assets/images/meG1yXz9jqwhzC1XCm7WP0Ae9Zc.jpg"],
  },
  icons: {
    icon: "/assets/images/ugucZZ77cBC9cEIJsUKZuSdo0.png",
    apple: "/assets/images/lK5HLMhktIkswR9YTsNjUQ8oEpk.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="lenis lenis-autoToggle">
      <body className="notranslate">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Create globals.css that imports the Framer CSS**

Create `app/globals.css`:

```css
@import "/assets/css/styles.css";
```

- [ ] **Step 6: Create placeholder homepage**

Create `app/page.tsx`:

```tsx
export default function Home() {
  return (
    <div id="main">
      <h1>Vipass - Coming Soon</h1>
    </div>
  );
}
```

- [ ] **Step 7: Verify dev server starts**

```bash
npm run dev
```

Open http://localhost:3000 — should show the placeholder page without errors.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js app and move assets to public/"
```

---

### Task 2: Header Component

**Files:**
- Create: `components/layout/Header.tsx`

The header has two parts: a desktop top bar with nav links, and a mobile drawer overlay. The mobile drawer needs client-side state for open/close toggling.

- [ ] **Step 1: Create Header component**

Create `components/layout/Header.tsx`. This is a `"use client"` component because it manages the mobile drawer open/close state.

The component must preserve the exact Framer class names and DOM structure from `static/index.html`. The header HTML starts at `<header class="framer-e3FRw ...">` and contains:
- Desktop top nav with logo + 5 links + hamburger button
- Mobile drawer body with 6 nav items + legal links

Extract the full `<header>` HTML from `static/index.html` (the `ssr-variant hidden-1l0aw67 hidden-xwr0r7` wrapper that contains the header). Convert to JSX:
- `class` -> `className`
- `tabindex` -> `tabIndex`
- `style="..."` string attributes -> `style={{...}}` objects
- `data-framer-*` attributes stay as-is
- `<!--$-->` / `<!--/$-->` comments removed
- Self-closing tags: `<img ... />`, `<br />`
- Boolean attributes: `autoPlay` not `autoplay=""`
- Replace `legal/privacy-policy/index.html` with `/legal/privacy-policy`
- Replace `legal/terms-of-service/index.html` with `/legal/terms-of-service`

Add state for mobile drawer toggle:
- `const [isOpen, setIsOpen] = useState(false)`
- On hamburger button click: `setIsOpen(!isOpen)`
- Mobile body div: `style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}`

Nav links data array to DRY up the repeated link pattern:

```tsx
const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Experiences", href: "#experiences" },
  { label: "Stats", href: "#stats" },
  { label: "FAQ", href: "#faq" },
  { label: "Download", href: "#getapp" },
];
```

- [ ] **Step 2: Wire Header into layout**

Update `app/layout.tsx` to import and render `<Header />` inside `<body>` before `{children}`.

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Check http://localhost:3000 — header should appear with correct styling. Click hamburger to toggle mobile drawer.

- [ ] **Step 4: Commit**

```bash
git add components/layout/Header.tsx app/layout.tsx
git commit -m "feat: add Header component with mobile nav drawer"
```

---

### Task 3: Footer Component

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Create Footer component**

Create `components/layout/Footer.tsx` — a server component. Extract the footer HTML from `static/index.html` (the `<div class="framer-ky49qn" data-framer-name="Footer">` block). Convert to JSX.

Replace link hrefs:
- `legal/privacy-policy/index.html` -> `/legal/privacy-policy`
- `legal/terms-of-service/index.html` -> `/legal/terms-of-service`

```tsx
import Link from "next/link";

export default function Footer() {
  return (
    <div className="framer-ky49qn" data-framer-name="Footer">
      <div className="framer-tcjvj3" data-framer-name="1">
        <div
          className="framer-fh8u2r"
          data-framer-component-type="RichTextContainer"
          style={{ transform: "none" }}
        >
          <p
            className="framer-text framer-styles-preset-txwsq6"
            data-styles-preset="fDRzSjw63"
            dir="auto"
          >
            &copy; 2026 Vipass. All rights reserved.
          </p>
        </div>
      </div>
      <div className="framer-d1p2d9" data-framer-name="Links">
        <div
          className="framer-139ywha"
          data-framer-component-type="RichTextContainer"
          style={{ transform: "none" }}
        >
          <p
            className="framer-text framer-styles-preset-1mf8d9g"
            data-styles-preset="ypR5VEWEl"
            dir="auto"
            style={{
              "--framer-text-color":
                "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
            } as React.CSSProperties}
          >
            <Link
              className="framer-text framer-styles-preset-t6j6v0"
              data-styles-preset="XvoIJb93z"
              href="/legal/privacy-policy"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
        <div
          className="framer-w2nkxd"
          data-framer-component-type="RichTextContainer"
          style={{ transform: "none" }}
        >
          <p
            className="framer-text framer-styles-preset-1mf8d9g"
            data-styles-preset="ypR5VEWEl"
            dir="auto"
            style={{
              "--framer-text-color":
                "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
            } as React.CSSProperties}
          >
            <Link
              className="framer-text framer-styles-preset-t6j6v0"
              data-styles-preset="XvoIJb93z"
              href="/legal/terms-of-service"
            >
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: add Footer component"
```

---

### Task 4: GrainOverlay and PreLoader Components

**Files:**
- Create: `components/ui/GrainOverlay.tsx`, `components/sections/PreLoader.tsx`

- [ ] **Step 1: Create GrainOverlay**

Create `components/ui/GrainOverlay.tsx` — a server component. This is the texture overlay used on backgrounds:

```tsx
export default function GrainOverlay() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: 'url("/assets/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png")',
          opacity: 0.05,
          inset: "-200%",
          width: "400%",
          height: "400%",
          position: "absolute",
          willChange: "transform",
          transform: "translateX(-2.5%) translateY(-5%)",
        }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Create PreLoader**

Create `components/sections/PreLoader.tsx` — a `"use client"` component that shows a logo splash screen then fades out after a delay.

Extract the preloader HTML from `static/index.html` (the `framer-143iyx0-container` block). Convert to JSX. Add a `useState`/`useEffect` to hide it after 2 seconds:

```tsx
"use client";

import { useState, useEffect } from "react";

export default function PreLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="framer-143iyx0-container">
      {/* Full preloader HTML from static site, converted to JSX */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
          background: "transparent",
          pointerEvents: "all",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="framer-1lgjvo2-container"
            data-framer-name="PreLoader"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <div
              className="framer-iakDo framer-1xyp36d framer-v-1xyp36d"
              data-framer-name="1"
              style={{ height: "100%", width: "100%", opacity: 1 }}
            >
              <div
                className="framer-18jnpzj"
                data-framer-name="Logo"
                style={{
                  willChange: "transform",
                  opacity: 1,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    borderRadius: "inherit",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                  }}
                  data-framer-background-image-wrapper="true"
                >
                  <img
                    width={564}
                    height={564}
                    src="/assets/images/sGlXXevC6VpCdliPiKXmmrZQEi0_0c62333e.png"
                    alt=""
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      borderRadius: "inherit",
                      objectPosition: "center",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
              <div
                className="framer-1g084ze"
                data-framer-name="BG"
                style={{
                  backgroundColor:
                    "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                  opacity: 1,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/GrainOverlay.tsx components/sections/PreLoader.tsx
git commit -m "feat: add GrainOverlay and PreLoader components"
```

---

### Task 5: ExperienceCard and ExperiencesSection

**Files:**
- Create: `components/ui/ExperienceCard.tsx`, `components/sections/ExperiencesSection.tsx`

- [ ] **Step 1: Create ExperienceCard**

Create `components/ui/ExperienceCard.tsx`. Extract the repeated card pattern from the Experiences section. All 6 cards have identical structure, differing only in `href`, `logo` (src + dimensions), and `image` src.

```tsx
interface ExperienceCardProps {
  href: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  imageSrc: string;
}

export default function ExperienceCard({
  href,
  logoSrc,
  logoWidth,
  logoHeight,
  imageSrc,
}: ExperienceCardProps) {
  return (
    <a
      className="framer-tEL27 framer-1of3use framer-v-1of3use framer-1pxbyww"
      data-framer-name="Desktop"
      href={href}
      style={{
        width: "100%",
        willChange: "transform",
        borderRadius: 18,
        opacity: 1,
        transform: "none",
      }}
    >
      <div
        className="framer-1nwqy7f"
        data-framer-name="Background"
        style={{
          backgroundColor:
            "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
          borderRadius: 18,
          opacity: 1,
        }}
      >
        <div
          className="framer-jem6dr"
          data-framer-name="Logo"
          style={{ transform: "none", opacity: 1 }}
        >
          <div
            style={{
              position: "absolute",
              borderRadius: "inherit",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
            data-framer-background-image-wrapper="true"
          >
            <img
              loading="lazy"
              width={logoWidth}
              height={logoHeight}
              src={logoSrc}
              alt=""
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                borderRadius: "inherit",
                objectPosition: "center",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
        <div
          className="framer-ybsvxe"
          data-framer-name="Image container"
          style={{ borderRadius: 16, opacity: 1 }}
        >
          <div
            className="framer-16bbbzt"
            data-framer-name="blackout"
            style={{
              backgroundColor:
                "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
              opacity: 0.15,
            }}
          />
          <div
            className="framer-jh1lcx"
            data-framer-name="Image"
            style={{ filter: "none", transform: "none", opacity: 1 }}
          >
            <div
              style={{
                position: "absolute",
                borderRadius: "inherit",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
              data-framer-background-image-wrapper="true"
            >
              <img
                width={750}
                height={540}
                src={imageSrc}
                alt=""
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  borderRadius: "inherit",
                  objectPosition: "center",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
```

- [ ] **Step 2: Create ExperiencesSection**

Create `components/sections/ExperiencesSection.tsx`. Wraps the section heading + 6 `ExperienceCard` instances with data:

```tsx
import ExperienceCard from "@/components/ui/ExperienceCard";

const experiences = [
  {
    href: "#getapp",
    logoSrc: "/assets/images/uesNBJIRG5fZ2tDJzkhxXbuauQw_da6599a2.svg",
    logoWidth: 135,
    logoHeight: 42,
    imageSrc: "/assets/images/TQUaM9GTresksymLH16ncQaPo_3aa7a644.jpg",
  },
  {
    href: "#getapp",
    logoSrc: "/assets/images/PyQzA1IF3BF1gkVO1xuZHClY0c_4fd0c46e.svg",
    logoWidth: 164,
    logoHeight: 42,
    imageSrc: "/assets/images/r3DvXiPExOamPrqqTNfWM1K9o4_4a2a03f6.jpg",
  },
  {
    href: "#getapp",
    logoSrc: "/assets/images/j2k0BUaOnC0jNyx5dP4hieQnFL4_9e93260f.svg",
    logoWidth: 181,
    logoHeight: 44,
    imageSrc: "/assets/images/UPqJOHQLdYtNuK2jee5437Lno_6c2252b7.jpg",
  },
  {
    href: "#getapp",
    logoSrc: "/assets/images/kH7hh1Be4txgKwuTgZl3jpdZp8_ccd01b9a.svg",
    logoWidth: 174,
    logoHeight: 46,
    imageSrc: "/assets/images/HlvuJF9yIQ3Q8fP86EjFIq5ExE_126955d4.jpg",
  },
  {
    href: "#getapp",
    logoSrc: "/assets/images/JLzkuHlsyLa7VHaiV3ZJ16kiHhg_d3b67ddb.svg",
    logoWidth: 181,
    logoHeight: 44,
    imageSrc: "/assets/images/0KGHRsvK3go8kOWricmADe0VWs_7d54889a.jpg",
  },
  {
    href: "#getapp",
    logoSrc: "/assets/images/zCY9SAfJ5gqVMOvrM5dzywwbU_dbabd644.svg",
    logoWidth: 189,
    logoHeight: 42,
    imageSrc: "/assets/images/qiCYd5j7XEmvyt9BpMldI3mNm8_d9fab17e.jpg",
  },
];

export default function ExperiencesSection() {
  return (
    <section
      className="framer-hv8rku"
      data-framer-name="Experiences"
      id="experiences"
    >
      <div className="framer-4olikp" data-framer-name="Container">
        <div className="framer-1hxsd0l" data-framer-name="Top">
          <div className="framer-7l5kym" data-framer-name="Heading">
            <div className="ssr-variant hidden-f3lv8x">
              <div
                className="framer-1vc39i"
                data-framer-component-type="RichTextContainer"
                style={{
                  willChange: "transform",
                  opacity: 1,
                  transform: "none",
                }}
              >
                <h2
                  className="framer-text framer-styles-preset-1yvd34u"
                  data-styles-preset="GKtOymhXV"
                  dir="auto"
                >
                  Experiences.
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="framer-aeexdy">
          <div className="ssr-variant hidden-f3lv8x">
            <div className="framer-g46orm-container">
              {experiences.map((exp, i) => (
                <ExperienceCard key={i} {...exp} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/ExperienceCard.tsx components/sections/ExperiencesSection.tsx
git commit -m "feat: add ExperienceCard and ExperiencesSection components"
```

---

### Task 6: FaqItem and FaqSection

**Files:**
- Create: `components/ui/FaqItem.tsx`, `components/sections/FaqSection.tsx`

- [ ] **Step 1: Create FaqItem**

Create `components/ui/FaqItem.tsx` — a `"use client"` component for the accordion behavior.

The FAQ items use inline styles (not Framer classes) for the accordion body. The expand/collapse toggles the answer container's `height` between `0px` and `auto`, and rotates the chevron icon.

```tsx
"use client";

import { useState } from "react";

interface FaqItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export default function FaqItem({
  question,
  answer,
  defaultOpen = false,
}: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      style={{
        marginBottom: 4,
        border: "0px solid rgb(255, 255, 255)",
        borderRadius: 14,
        backgroundColor: "rgb(255, 255, 255)",
        overflow: "hidden",
      }}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          padding: 26,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              color: "rgb(10, 10, 10)",
              fontFamily: '"Inter", "Inter Placeholder", sans-serif',
              fontSize: 18,
              fontWeight: 500,
              lineHeight: "1.3em",
              letterSpacing: "-0.04em",
              textAlign: "left",
              margin: 0,
              padding: 0,
            }}
          >
            {question}
          </span>
        </div>
        <img
          src="/assets/images/j6H7CUu4CDaOQoux5xCbVztY18.svg"
          alt="icon"
          style={{
            width: 18,
            height: 18,
            marginLeft: 16,
            willChange: "transform",
            transform: isOpen ? "rotate(360deg)" : "none",
            transition: "transform 0.3s ease",
          }}
          width={18}
          height={18}
        />
      </div>
      <div
        style={{
          overflow: "hidden",
          transition: "height 0.3s ease",
          height: isOpen ? "auto" : 0,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "start",
              paddingTop: 0,
              paddingRight: 26,
              paddingBottom: 26,
              paddingLeft: 26,
              boxSizing: "border-box",
            }}
          >
            <p
              style={{
                color: "rgba(10, 10, 10, 0.6)",
                fontFamily: '"Inter", "Inter Placeholder", sans-serif',
                fontSize: 15,
                fontWeight: 500,
                lineHeight: "1.4em",
                letterSpacing: "-0.04em",
                textAlign: "left",
                margin: 0,
                padding: 0,
                boxSizing: "border-box",
              }}
            >
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create FaqSection**

Create `components/sections/FaqSection.tsx`. Extract the section wrapper HTML and render 6 `FaqItem` instances:

```tsx
import FaqItem from "@/components/ui/FaqItem";

const faqs = [
  {
    question: "Is Vipass free to use?",
    answer:
      "Yes, downloading and browsing events is completely free. You only pay when you purchase a ticket.",
  },
  {
    question: "Can I create and sell tickets for my own event?",
    answer:
      "Absolutely. You can set up your event, configure ticket tiers, and start selling directly from your phone in minutes.",
  },
  {
    question: "How do I track how my event is performing?",
    answer:
      "You get a real-time dashboard with ticket sales, revenue, and audience engagement so you always know where things stand.",
  },
  {
    question: "How do I get updates about an event I'm attending?",
    answer:
      "You'll receive real-time notifications with any changes to the lineup, schedule, or venue details so you're always in the know.",
  },
  {
    question: "When do I get paid for ticket sales?",
    answer:
      "Payouts are processed directly to your account. You can track your earnings and payout status right from the app.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Yes. All transactions are processed through industry-standard encrypted payment systems. We never store your card details directly.",
  },
];

export default function FaqSection() {
  return (
    <section className="framer-rv9o5q" data-framer-name="FAQ" id="faq">
      <div className="framer-pcuxg5" data-framer-name="Container">
        <div className="framer-1xjiuvd" data-framer-name="Heading">
          <div className="ssr-variant hidden-f3lv8x">
            <div
              className="framer-1euscwr"
              data-framer-component-type="RichTextContainer"
              style={{ willChange: "transform", opacity: 1, transform: "none" }}
            >
              <h2
                className="framer-text framer-styles-preset-1yvd34u"
                data-styles-preset="GKtOymhXV"
              >
                FAQ.
              </h2>
            </div>
          </div>
          <div
            className="framer-mxm94s"
            data-framer-component-type="RichTextContainer"
            style={{ transform: "none" }}
          >
            <p
              className="framer-text framer-styles-preset-1n1wh7h"
              data-styles-preset="gd6AWaps9"
              dir="auto"
            >
              Got questions? We&apos;ve got answers.
            </p>
          </div>
        </div>
        <div className="ssr-variant hidden-f3lv8x hidden-tsn51j">
          <div
            className="framer-12yhnwq-container"
            style={{ willChange: "transform", opacity: 1, transform: "none" }}
          >
            <div
              className="framer-sABwM framer-10950d3 framer-v-10950d3"
              data-framer-name="Desktop"
              style={{ width: "100%", opacity: 1 }}
            >
              <div className="framer-mbtw9f-container" style={{ opacity: 1 }}>
                <div style={{ width: "100%" }}>
                  {faqs.map((faq, i) => (
                    <FaqItem
                      key={i}
                      question={faq.question}
                      answer={faq.answer}
                      defaultOpen={i === 0}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/FaqItem.tsx components/sections/FaqSection.tsx
git commit -m "feat: add FaqItem and FaqSection components"
```

---

### Task 7: HeroSection Component

**Files:**
- Create: `components/sections/HeroSection.tsx`

- [ ] **Step 1: Create HeroSection**

Create `components/sections/HeroSection.tsx` — a server component. Extract the full `<section id="hero">` HTML from `static/index.html` and convert to JSX.

This section contains:
- The large "fabrica" title SVG text
- The h1 headline: "The best nights out start here..."
- The CTA card linking to `#getapp` (Lauren Thompson / Team Lead / "Let's talk" button)
- Background video with grain overlay

Key conversions:
- All `class` -> `className`
- Inline `style` strings -> style objects
- Import and use `<GrainOverlay />` for the two grain overlay instances
- Video element: `autoPlay muted playsInline loop` (React boolean attributes)
- All image `src` paths prefixed with `/` (e.g., `/assets/images/...`)
- The hero initial opacity is `0.001` in the static HTML (for Framer animation). Set to `1` since we're not using Framer animations.

- [ ] **Step 2: Commit**

```bash
git add components/sections/HeroSection.tsx
git commit -m "feat: add HeroSection component"
```

---

### Task 8: FeaturesSection Component

**Files:**
- Create: `components/sections/FeaturesSection.tsx`

- [ ] **Step 1: Create FeaturesSection**

Create `components/sections/FeaturesSection.tsx` — a server component. Extract the `<section id="features">` HTML.

This section has 4 feature items, each with the same structure but different data. Define the data array:

```tsx
const features = [
  {
    number: "(001)",
    title: "Live Event Pulse",
    description: "Follow along with real-time updates as the event unfolds. Know when doors open, when your favorite act hits the stage, and never miss a beat even if you're running late.",
    images: [
      "/assets/images/vGSJoy0fkCYvuK5CETUzS64NNo_ef54ed9e.jpg",
      "/assets/images/6xxZ3D6rnu26P86nUVvj2eanCY_ef1bbb6e.jpg",
      "/assets/images/6girwIRKdg1doDEWAHr4oDIbroU_47c04159.jpg",
    ],
  },
  {
    number: "(002)",
    title: "Your Entire Night in One Place",
    description: "Tickets, lineups, venue details, and live updates all under one roof. No switching between apps or hunting for info the night of.",
    images: [
      "/assets/images/9hTP0obDSaEcVCyC5kaHbx7FfI_80d92213.jpg",
      "/assets/images/PTZo29JDyFUqhP5lmoOwf726M_a226a504.jpg",
      "/assets/images/OvxlgM3dgsl1n9Hl1FAnutk3YQ_25760d5b.jpg",
    ],
  },
  {
    number: "(003)",
    title: "Built for Creators, Not Just Attendees",
    description: "Launch an event, manage tickets, and track sales right from your phone. No desktop needed, no third-party tools, no friction.",
    images: [
      "/assets/images/DsMKi7qE5JNWO5UQxmeqZGDSOI_03f735a1.jpg",
      "/assets/images/2BxeG0o2qWf8AOHmXP5mvB7fXo_398b9d36.jpg",
      "/assets/images/PzUf5VcgXOfitprgtvScN6spik_bf934ca8.jpg",
    ],
  },
  {
    number: "(004)",
    title: "Smart Event Discovery",
    description: "Surface events you'll actually care about based on what's happening around you, not just what's being promoted the hardest.",
    images: [
      "/assets/images/zhgLgjCtsbVWTYRQuFeBf3XoW6c_ea29d825.jpg",
      "/assets/images/qQlR5lTiRYzT2lPzSWLLVkcgH6Y_9ec6cd36.jpg",
      "/assets/images/7HAgaIAjq6jlYJoi8ME87oXs6w_78d15953.jpg",
    ],
  },
];
```

Extract the feature item HTML pattern and map over the data array. Each feature item has the same Framer class structure (`framer-ssEy5`, etc.) with the number, title, description, and 3 stacked images.

Set initial `opacity: 1` and `transform: "none"` instead of the Framer animation initial states.

- [ ] **Step 2: Commit**

```bash
git add components/sections/FeaturesSection.tsx
git commit -m "feat: add FeaturesSection component"
```

---

### Task 9: StatsSection Component

**Files:**
- Create: `components/sections/StatsSection.tsx`

- [ ] **Step 1: Create StatsSection**

Create `components/sections/StatsSection.tsx` — a server component. Extract the full `<section id="stats">` HTML and convert to JSX.

This is the most complex section with sub-sections:
1. Stats heading + intro text
2. Case study card (dark bg) — "UX/UI Redesign, Frontend Optimization"
3. Performance metrics card (light bg) — page speed, bounce rate, conversion, testimonial
4. Score + quarterly visits bar chart

Since this section's content is unique (not repeated), keep it as a single component with the HTML directly converted to JSX. No data extraction needed.

Set all animation initial states to visible: `opacity: 1`, `transform: "none"`.

- [ ] **Step 2: Commit**

```bash
git add components/sections/StatsSection.tsx
git commit -m "feat: add StatsSection component"
```

---

### Task 10: GetAppSection Component

**Files:**
- Create: `components/sections/GetAppSection.tsx`

- [ ] **Step 1: Create GetAppSection**

Create `components/sections/GetAppSection.tsx` — a `"use client"` component (has a form with state).

Extract the `<div id="getapp">` HTML and convert to JSX. This includes:
- Contact form (name, email, message inputs + submit button)
- "Get the app" heading + description text
- "Quick response" info block
- Footer component at the bottom

Key conversions:
- Form inputs: `value` -> controlled with `useState`, or leave as uncontrolled with just `name` attributes
- `required=""` -> `required`
- Import and render `<Footer />` at the bottom
- Replace `legal/privacy-policy/index.html` -> `/legal/privacy-policy` in the terms text
- Replace `legal/terms-of-service/index.html` -> `/legal/terms-of-service`
- Keep honeypot hidden inputs for spam protection

For MVP, the form can just prevent default and show an alert. No backend needed.

- [ ] **Step 2: Commit**

```bash
git add components/sections/GetAppSection.tsx
git commit -m "feat: add GetAppSection component"
```

---

### Task 11: Assemble Homepage

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update app/page.tsx to compose all sections**

```tsx
import PreLoader from "@/components/sections/PreLoader";
import HeroSection from "@/components/sections/HeroSection";
import ExperiencesSection from "@/components/sections/ExperiencesSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import StatsSection from "@/components/sections/StatsSection";
import FaqSection from "@/components/sections/FaqSection";
import GetAppSection from "@/components/sections/GetAppSection";

export default function Home() {
  return (
    <div id="main">
      <div
        className="framer-D2wOp framer-128kipa"
        data-layout-template="true"
        style={{ minHeight: "100vh", width: "auto" }}
      >
        <div
          data-framer-root=""
          className="framer-CG7Jx framer-RKppn framer-tOAQB framer-loOMQ framer-PU6Rs framer-ofTFr framer-ZkB8p framer-Xxt6K framer-Pv7XK framer-m9VkI framer-0CPYn framer-EP1im framer-72rtr7"
          style={{ minHeight: "100vh", width: "auto", display: "contents" }}
        >
          <PreLoader />
          <main className="framer-jpdxmw" data-framer-name="Main">
            <HeroSection />
            <ExperiencesSection />
            <FeaturesSection />
            <StatsSection />
            <FaqSection />
            <GetAppSection />
          </main>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update layout.tsx to include Header**

```tsx
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vipass - The best nights out start here",
  description:
    "Find events, get tickets, and stay in the loop without the hassle.",
  openGraph: {
    title: "Vipass - The best nights out start here",
    description:
      "Find events, get tickets, and stay in the loop without the hassle.",
    images: ["/assets/images/meG1yXz9jqwhzC1XCm7WP0Ae9Zc.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vipass - The best nights out start here",
    description:
      "Find events, get tickets, and stay in the loop without the hassle.",
    images: ["/assets/images/meG1yXz9jqwhzC1XCm7WP0Ae9Zc.jpg"],
  },
  icons: {
    icon: "/assets/images/ugucZZ77cBC9cEIJsUKZuSdo0.png",
    apple: "/assets/images/lK5HLMhktIkswR9YTsNjUQ8oEpk.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="lenis lenis-autoToggle">
      <body className="notranslate">
        <Header />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Open http://localhost:3000. All sections should render with correct styling. Check:
- Header nav links scroll to sections
- Mobile nav opens/closes
- FAQ accordion expands/collapses
- Video plays in hero background
- All images load

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/layout.tsx
git commit -m "feat: assemble homepage with all sections"
```

---

### Task 12: Legal Pages

**Files:**
- Create: `app/legal/privacy-policy/page.tsx`, `app/legal/terms-of-service/page.tsx`

- [ ] **Step 1: Extract legal page content**

Read the legal pages from `static/legal/privacy-policy/index.html` and `static/legal/terms-of-service/index.html`. Each has:
- The same header/footer (already in layout)
- A unique content block with title, "Last updated" date, and prose text

Extract just the content portion (inside the `<main>` or main content div). The content uses the same Framer class structure.

- [ ] **Step 2: Create privacy policy page**

Create `app/legal/privacy-policy/page.tsx`. Extract the legal content HTML from the static privacy policy page, convert to JSX. Include the page-specific wrapper divs with Framer classes to maintain styling.

Add metadata:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Vipass",
};
```

- [ ] **Step 3: Create terms of service page**

Create `app/legal/terms-of-service/page.tsx`. Same approach as privacy policy but with the terms content.

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Vipass",
};
```

- [ ] **Step 4: Verify in browser**

Navigate to http://localhost:3000/legal/privacy-policy and http://localhost:3000/legal/terms-of-service. Both should render with correct styling, header, and footer.

- [ ] **Step 5: Commit**

```bash
git add app/legal/
git commit -m "feat: add legal pages (privacy policy, terms of service)"
```

---

### Task 13: Final Cleanup and Verification

**Files:**
- Remove: default Next.js boilerplate files
- Clean up: any unused files

- [ ] **Step 1: Remove Next.js boilerplate**

Delete default files that were created by `create-next-app` but aren't needed:
- `app/page.module.css` (if exists)
- `app/favicon.ico` (using custom icon from public/)
- `public/next.svg`, `public/vercel.svg` (if exist)

- [ ] **Step 2: Build check**

```bash
npm run build
```

Fix any TypeScript or build errors.

- [ ] **Step 3: Full visual verification**

```bash
npm run dev
```

Walk through every section and page:
1. Homepage loads with preloader
2. Header nav works (desktop + mobile)
3. Hero section: video plays, CTA card links to #getapp
4. Experiences: 6 cards visible, all link to #getapp
5. Features: 4 items with images and text
6. Stats: case study card, metrics, bar chart
7. FAQ: accordion expand/collapse works
8. GetApp: form renders, footer at bottom
9. Legal pages: both render with header/footer
10. Footer links navigate to legal pages

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove boilerplate, final cleanup"
```
