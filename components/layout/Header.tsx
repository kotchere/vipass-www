"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Data arrays for DRY nav links                                      */
/* ------------------------------------------------------------------ */

/** Desktop top-bar links (small text, inside <nav class="framer-120hnkq">) */
const desktopNavLinks = [
  { label: "Features", href: "#features", containerClass: "framer-1ubnatg-container", hasSubtext: true },
  { label: "Experiences", href: "#experiences", containerClass: "framer-1phpovz-container", hasSubtext: false },
  { label: "Stats", href: "#stats", containerClass: "framer-1q78hcd-container", hasSubtext: false },
  { label: "FAQ", href: "#faq", containerClass: "framer-nsvb3w-container", hasSubtext: false },
  { label: "Download", href: "#getapp", containerClass: "framer-1l9rbhf-container", hasSubtext: false },
];

/** Mobile drawer links (large text, inside <nav class="framer-ugu5i9">) */
const mobileNavLinks = [
  { label: "Home", href: "./", containerClass: "framer-1l0v3f0-container", wrapperClass: "framer-6z5t2m", isCurrent: true },
  { label: "Experiences", href: "#experiences", containerClass: "framer-qy8ut1-container", wrapperClass: "framer-f7i6o0", isCurrent: false },
  { label: "Features", href: "#features", containerClass: "framer-1cb9u8q-container", wrapperClass: "framer-9p1fl7", isCurrent: false },
  { label: "Stats", href: "#stats", containerClass: "framer-dn12q8-container", wrapperClass: "framer-15pwy5", isCurrent: false },
  { label: "FAQ", href: "#faq", containerClass: "framer-i0l900-container", wrapperClass: "framer-pem6zj", isCurrent: false },
  { label: "Download", href: "#getapp", containerClass: "framer-11r3jwx-container", wrapperClass: "framer-16sohac", isCurrent: false },
];

/* ------------------------------------------------------------------ */
/*  Shared inline-style constants                                      */
/* ------------------------------------------------------------------ */

const desktopLinkTextStyle: React.CSSProperties = {
  "--font-selector": "SW50ZXItU2VtaUJvbGQ=",
  "--framer-font-family": '"Inter", "Inter Placeholder", sans-serif',
  "--framer-font-weight": "600",
  "--framer-letter-spacing": "-0.04em",
  "--framer-line-height": "110%",
  "--framer-text-color": "var(--extracted-r6o4lv, rgb(9, 9, 9))",
} as React.CSSProperties;

const mobileLinkTextStyle: React.CSSProperties = {
  "--font-selector": "SW50ZXItU2VtaUJvbGQ=",
  "--framer-font-family": '"Inter", "Inter Placeholder", sans-serif',
  "--framer-font-size": "60px",
  "--framer-font-weight": "600",
  "--framer-letter-spacing": "-0.06em",
  "--framer-line-height": "120%",
  "--framer-text-alignment": "center",
  "--framer-text-color":
    "var(--extracted-r6o4lv, var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10)))",
} as React.CSSProperties;

const mobileRichTextContainerStyle: React.CSSProperties = {
  "--extracted-r6o4lv": "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
  "--framer-paragraph-spacing": "0px",
  transform: "none",
  opacity: 1,
} as React.CSSProperties;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="framer-e3FRw framer-0CPYn framer-m9VkI framer-bzu5mb framer-v-v89dtt"
      data-framer-name="Desktop"
      style={{
        backdropFilter: "blur(7px)",
        backgroundColor: "var(--token-eea70a16-506d-4b3b-87b7-e85e653a6e7c, rgb(245, 245, 245))",
        width: "100%",
        opacity: 1,
      }}
    >
      {/* ============================================================ */}
      {/*  Desktop top-bar nav                                         */}
      {/* ============================================================ */}
      <nav className="framer-120hnkq" data-framer-name="Top" style={{ opacity: 1 }}>
        {/* Logo */}
        <a
          className="framer-iogiyt framer-1a90gm8"
          data-framer-name="Link"
          href="#main-1"
          style={{ opacity: 1 }}
        >
          <div className="framer-kxb2zt-container" style={{ opacity: 1 }}>
            <div
              className="framer-eKVcD framer-1ppeyn8 framer-v-1ppeyn8"
              data-framer-name="Desktop"
              style={{ opacity: 1 }}
            >
              <div className="framer-1lkcsgp" data-framer-name="Logo" style={{ opacity: 1 }}>
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
                    decoding="auto"
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
            </div>
          </div>
        </a>

        {/* Desktop nav links */}
        {desktopNavLinks.map((link) => (
          <div key={link.href} className={link.containerClass} style={{ opacity: 1 }}>
            <a
              className="framer-pPkX6 framer-7g0p1o framer-v-7g0p1o framer-1ljdjoh"
              data-framer-name="Default"
              href={link.href}
              style={{ opacity: 1 }}
            >
              <div
                className="framer-xu6ifz"
                data-framer-component-type="RichTextContainer"
                style={{
                  "--extracted-r6o4lv": "rgb(9, 9, 9)",
                  "--framer-paragraph-spacing": "0px",
                  transform: "none",
                  opacity: 1,
                } as React.CSSProperties}
              >
                <p className="framer-text" style={desktopLinkTextStyle}>
                  {link.label}
                </p>
              </div>
              {link.hasSubtext && (
                <div
                  className="framer-1r3wqjw"
                  data-framer-component-type="RichTextContainer"
                  style={{
                    "--extracted-r6o4lv": "rgb(9, 9, 9)",
                    "--framer-paragraph-spacing": "0px",
                    opacity: 0.6,
                    transform: "none",
                  } as React.CSSProperties}
                >
                  <p
                    className="framer-text"
                    style={{
                      ...desktopLinkTextStyle,
                      "--framer-font-size": "9px",
                      "--framer-line-height": "100%",
                    } as React.CSSProperties}
                  />
                </div>
              )}
            </a>
          </div>
        ))}

        {/* Hamburger / mobile toggle button */}
        <div
          className="framer-ednsow"
          data-framer-name="Button container"
          data-highlight="true"
          tabIndex={0}
          style={{ opacity: 1 }}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div className="framer-eda3z9-container" style={{ opacity: 1 }}>
            <div
              className="framer-UNjyH framer-1qd80pl framer-v-1qd80pl"
              data-framer-name="Closed"
              data-highlight="true"
              tabIndex={0}
              style={{ opacity: 1 }}
            >
              <div
                className="framer-1jxc6iw"
                style={{
                  backgroundColor:
                    "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                  transform: "none",
                  opacity: 1,
                }}
              />
              <div
                className="framer-qxejnu"
                style={{
                  backgroundColor:
                    "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                  transform: "none",
                  opacity: 1,
                }}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* ============================================================ */}
      {/*  Mobile drawer body                                          */}
      {/* ============================================================ */}
      <div
        className="framer-1rfamfy"
        data-framer-name="Body"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none" }}
      >
        <nav className="framer-ugu5i9" data-framer-name="Navigation" style={{ opacity: 1 }}>
          {mobileNavLinks.map((link) => (
            <div
              key={link.href}
              className={link.wrapperClass}
              data-framer-name="Item container"
              style={{
                willChange: "transform",
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0px)" : "translateY(-40px)",
              }}
            >
              <div className={link.containerClass} style={{ opacity: 1 }}>
                <a
                  className="framer-IFf4n framer-14ac7s4 framer-v-14ac7s4 framer-1435c2t"
                  data-framer-name="Desktop"
                  data-highlight="true"
                  href={link.href}
                  {...(link.isCurrent ? { "data-framer-page-link-current": "true" } : {})}
                  tabIndex={0}
                  style={{ opacity: 1 }}
                >
                  <div
                    className="framer-ggkluq"
                    data-framer-component-type="RichTextContainer"
                    style={mobileRichTextContainerStyle}
                  >
                    <p className="framer-text" style={mobileLinkTextStyle}>
                      {link.label}
                    </p>
                  </div>
                  <div
                    className="framer-8k52a7"
                    data-framer-component-type="RichTextContainer"
                    style={mobileRichTextContainerStyle}
                  >
                    <p className="framer-text" style={mobileLinkTextStyle}>
                      {link.label}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom section with legal links */}
        <div className="framer-17uvimj" data-framer-name="Bottom" style={{ opacity: 1 }}>
          <div className="framer-1cfglw0" data-framer-name="Contact" style={{ opacity: 1 }} />
          <div
            className="framer-zauiq7"
            data-framer-name="Legal"
            style={{ transform: "translateX(-50%)", opacity: 1 }}
          >
            <div
              className="framer-cn0hy8"
              data-highlight="true"
              data-framer-component-type="RichTextContainer"
              tabIndex={0}
              style={{
                "--framer-paragraph-spacing": "0px",
                transform: "none",
                opacity: 1,
              } as React.CSSProperties}
            >
              <p className="framer-text framer-styles-preset-1mf8d9g" data-styles-preset="ypR5VEWEl">
                <a
                  className="framer-text framer-styles-preset-1wi7vce"
                  data-styles-preset="nCQNaN8LD"
                  href="/legal/privacy-policy"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
            <div
              className="framer-1dkccqr"
              data-highlight="true"
              data-framer-component-type="RichTextContainer"
              tabIndex={0}
              style={{
                "--framer-paragraph-spacing": "0px",
                transform: "none",
                opacity: 1,
              } as React.CSSProperties}
            >
              <p className="framer-text framer-styles-preset-1mf8d9g" data-styles-preset="ypR5VEWEl">
                <a
                  className="framer-text framer-styles-preset-1wi7vce"
                  data-styles-preset="nCQNaN8LD"
                  href="/legal/terms-of-service"
                >
                  Terms of Service
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
