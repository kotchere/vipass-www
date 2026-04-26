"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "f-motion";

const desktopNavLinks = [
  { label: "Features", href: "/#features", containerClass: "f-1ubnatg-container", hasSubtext: true },
  { label: "Experiences", href: "/#experiences", containerClass: "f-1phpovz-container", hasSubtext: false },
  { label: "Stats", href: "/#stats", containerClass: "f-1q78hcd-container", hasSubtext: false },
  { label: "FAQ", href: "/#faq", containerClass: "f-nsvb3w-container", hasSubtext: false },
  { label: "Download", href: "/#getapp", containerClass: "f-1l9rbhf-container", hasSubtext: false },
];

const mobileNavLinks = [
  { label: "Home", href: "/#home", containerClass: "f-1l0v3f0-container", wrapperClass: "f-6z5t2m", isCurrent: true },
  { label: "Experiences", href: "/#experiences", containerClass: "f-qy8ut1-container", wrapperClass: "f-f7i6o0", isCurrent: false },
  { label: "Features", href: "/#features", containerClass: "f-1cb9u8q-container", wrapperClass: "f-9p1fl7", isCurrent: false },
  { label: "Stats", href: "/#stats", containerClass: "f-dn12q8-container", wrapperClass: "f-15pwy5", isCurrent: false },
  { label: "FAQ", href: "/#faq", containerClass: "f-i0l900-container", wrapperClass: "f-pem6zj", isCurrent: false },
  { label: "Download", href: "/#getapp", containerClass: "f-11r3jwx-container", wrapperClass: "f-16sohac", isCurrent: false },
];

const staggerDelays = [0, 0.06, 0.12, 0.18, 0.24, 0.24];

const desktopLinkTextStyle = {
  "--font-selector": "SW50ZXItU2VtaUJvbGQ=",
  "--f-font-family": '"Inter", "Inter Placeholder", sans-serif',
  "--f-font-weight": "600",
  "--f-letter-spacing": "-0.04em",
  "--f-line-height": "110%",
  "--f-text-color": "var(--extracted-r6o4lv, rgb(9, 9, 9))",
} as React.CSSProperties;

const mobileLinkTextStyle = {
  "--font-selector": "SW50ZXItU2VtaUJvbGQ=",
  "--f-font-family": '"Inter", "Inter Placeholder", sans-serif',
  "--f-font-size": "60px",
  "--f-font-weight": "600",
  "--f-letter-spacing": "-0.06em",
  "--f-line-height": "120%",
  "--f-text-alignment": "center",
  "--f-text-color":
    "var(--extracted-r6o4lv, var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10)))",
} as React.CSSProperties;

const mobileRichTextContainerStyle = {
  "--extracted-r6o4lv": "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
  "--f-paragraph-spacing": "0px",
  transform: "none",
  opacity: 1,
} as React.CSSProperties;

const headerEase = [0.96, -0.02, 0.38, 1.01] as [number, number, number, number];
const headerTransition = { duration: 0.5, ease: headerEase };
const springTransition = { type: "spring" as const, damping: 30, stiffness: 210, mass: 1 };
const hamburgerSpring = { type: "spring" as const, bounce: 0.2, duration: 0.4 };

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const measureHeight = useCallback(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);

  useEffect(() => {
    measureHeight();
    window.addEventListener("resize", measureHeight);
    return () => window.removeEventListener("resize", measureHeight);
  }, [measureHeight]);

  // Re-measure after open state changes (content may reflow)
  useEffect(() => {
    if (isOpen) {
      // Small delay to let content render before measuring
      const t = setTimeout(measureHeight, 10);
      return () => clearTimeout(t);
    }
  }, [isOpen, measureHeight]);

  return (
    <motion.header
      className="f-e3FRw f-0CPYn f-m9VkI f-bzu5mb f-v-v89dtt"
      data-f-name="Desktop"
      animate={{
        backgroundColor: isOpen ? "rgb(255, 255, 255)" : "rgb(245, 245, 245)",
      }}
      transition={headerTransition}
      style={{
        backdropFilter: isOpen ? "none" : "blur(7px)",
        width: "100%",
        opacity: 1,
        overflow: "hidden",
      }}
    >
      <nav className="f-120hnkq" data-f-name="Top" style={{ opacity: 1 }}>
        {/* Logo */}
        <a className="f-iogiyt f-1a90gm8" data-f-name="Link" href="/#home" style={{ opacity: 1 }}>
          <div className="f-kxb2zt-container" style={{ opacity: 1 }}>
            <div className="f-eKVcD f-1ppeyn8 f-v-1ppeyn8" data-f-name="Desktop" style={{ opacity: 1 }}>
              <div className="f-1lkcsgp" data-f-name="Logo" style={{ opacity: 1 }}>
                <div
                  style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }}
                  data-f-background-image-wrapper="true"
                >
                  <img
                    width={564}
                    height={564}
                    src="/assets/images/sGlXXevC6VpCdliPiKXmmrZQEi0_0c62333e.png"
                    alt=""
                    style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", objectPosition: "center", objectFit: "cover" }}
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
              className="f-pPkX6 f-7g0p1o f-v-7g0p1o f-1ljdjoh top-nav-link"
              data-f-name="Default"
              href={link.href}
              style={{ opacity: 1 }}
            >
              <div
                className="f-xu6ifz"
                data-f-component-type="RichTextContainer"
                style={{ "--extracted-r6o4lv": "rgb(9, 9, 9)", "--f-paragraph-spacing": "0px", transform: "none", opacity: 1 } as React.CSSProperties}
              >
                <p className="f-text" style={desktopLinkTextStyle}>{link.label}</p>
              </div>
              {link.hasSubtext && (
                <div
                  className="f-1r3wqjw"
                  data-f-component-type="RichTextContainer"
                  style={{ "--extracted-r6o4lv": "rgb(9, 9, 9)", "--f-paragraph-spacing": "0px", opacity: 0.6, transform: "none" } as React.CSSProperties}
                >
                  <p className="f-text" style={{ ...desktopLinkTextStyle, "--f-font-size": "9px", "--f-line-height": "100%" } as React.CSSProperties} />
                </div>
              )}
            </a>
          </div>
        ))}

        {/* Hamburger button */}
        <div
          className="f-ednsow"
          data-f-name="Button container"
          data-highlight="true"
          tabIndex={0}
          style={{ opacity: 1, cursor: "pointer" }}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div className="f-eda3z9-container" style={{ opacity: 1 }}>
            <div
              className={`f-UNjyH ${isOpen ? "f-v-4fzt3a" : "f-1qd80pl"}`}
              data-f-name={isOpen ? "Open" : "Closed"}
              data-highlight="true"
              tabIndex={0}
              style={{ opacity: 1, position: "relative", minWidth: 59, minHeight: 12 }}
            >
              <motion.div
                className="f-1jxc6iw"
                animate={{
                  rotate: isOpen ? 10 : 0,
                  position: isOpen ? "absolute" as const : "relative" as const,
                  top: isOpen ? "calc(50% - 1px)" : undefined,
                  left: isOpen ? 0 : undefined,
                  right: isOpen ? 0 : undefined,
                  width: isOpen ? "auto" : 59,
                }}
                transition={hamburgerSpring}
                style={{
                  backgroundColor: "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                  height: 2,
                  opacity: 1,
                }}
              />
              <motion.div
                className="f-qxejnu"
                animate={{
                  rotate: isOpen ? -10 : 0,
                  position: isOpen ? "absolute" as const : "relative" as const,
                  top: isOpen ? "calc(50% - 1px)" : undefined,
                  left: isOpen ? 0 : undefined,
                  right: isOpen ? 0 : undefined,
                  width: isOpen ? "auto" : 59,
                }}
                transition={hamburgerSpring}
                style={{
                  backgroundColor: "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                  height: 2,
                  opacity: 1,
                }}
              />
            </div>
          </div>
        </div>
      </nav>

      {/*
        Mobile drawer. The CSS variant (f-v-v89dtt) positions .f-1rfamfy
        at absolute/top:-750px. We leave that class on and instead render the drawer
        content inside a height-animated wrapper that sits in the normal document flow,
        completely independent of the CSS variant's absolute positioning.
      */}
      <motion.div
        animate={{ height: isOpen ? contentHeight : 0 }}
        initial={{ height: 0 }}
        transition={headerTransition}
        style={{ overflow: "hidden", position: "relative", zIndex: 1 }}
      >
        <div
          ref={contentRef}
          style={{
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 120,
            width: "100%",
            padding: "120px 0 0 0",
          }}
        >
          <nav className="f-ugu5i9" data-f-name="Navigation" style={{ opacity: 1 }}>
            {mobileNavLinks.map((link, index) => (
              <motion.div
                key={link.href}
                className={link.wrapperClass}
                data-f-name="Item container"
                animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
                initial={{ opacity: 0, y: -40 }}
                transition={{ ...springTransition, delay: isOpen ? staggerDelays[index] : staggerDelays[index] }}
              >
                <div className={link.containerClass} style={{ opacity: 1 }}>
                  <a
                    className="f-IFf4n f-14ac7s4 f-v-14ac7s4 f-1435c2t hamburger-menu-link"
                    data-f-name="Desktop"
                    data-highlight="true"
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    {...(link.isCurrent ? { "data-f-page-link-current": "true" } : {})}
                    tabIndex={0}
                    style={{ opacity: 1 }}
                  >
                    <div className="f-ggkluq" data-f-component-type="RichTextContainer" style={mobileRichTextContainerStyle}>
                      <p className="f-text" style={mobileLinkTextStyle}>{link.label}</p>
                    </div>
                    <div className="f-8k52a7" data-f-component-type="RichTextContainer" style={mobileRichTextContainerStyle}>
                      <p className="f-text" style={mobileLinkTextStyle}>{link.label}</p>
                    </div>
                  </a>
                </div>
              </motion.div>
            ))}
          </nav>

          {/* Bottom section with legal links */}
          <div className="f-17uvimj" data-f-name="Bottom" style={{ opacity: 1, width: "100%" }}>
            <div className="f-1cfglw0" data-f-name="Contact" style={{ opacity: 1 }} />
            <div className="f-zauiq7" data-f-name="Legal" style={{ transform: "translateX(-50%)", opacity: 1 }}>
              <div
                className="f-cn0hy8"
                data-highlight="true"
                data-f-component-type="RichTextContainer"
                tabIndex={0}
                style={{ "--f-paragraph-spacing": "0px", transform: "none", opacity: 1 } as React.CSSProperties}
              >
                <p className="f-text f-styles-preset-1mf8d9g" data-styles-preset="ypR5VEWEl">
                  <a className="f-text f-styles-preset-1wi7vce hamburger-menu-link" data-styles-preset="nCQNaN8LD" href="/legal/privacy-policy">
                    Privacy Policy
                  </a>
                </p>
              </div>
              <div
                className="f-1dkccqr"
                data-highlight="true"
                data-f-component-type="RichTextContainer"
                tabIndex={0}
                style={{ "--f-paragraph-spacing": "0px", transform: "none", opacity: 1 } as React.CSSProperties}
              >
                <p className="f-text f-styles-preset-1mf8d9g" data-styles-preset="ypR5VEWEl">
                  <a className="f-text f-styles-preset-1wi7vce hamburger-menu-link" data-styles-preset="nCQNaN8LD" href="/legal/terms-of-service">
                    Terms of Service
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
