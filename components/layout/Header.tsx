"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const desktopNavLinks = [
  { label: "Features", href: "#features", containerClass: "framer-1ubnatg-container", hasSubtext: true },
  { label: "Experiences", href: "#experiences", containerClass: "framer-1phpovz-container", hasSubtext: false },
  { label: "Stats", href: "#stats", containerClass: "framer-1q78hcd-container", hasSubtext: false },
  { label: "FAQ", href: "#faq", containerClass: "framer-nsvb3w-container", hasSubtext: false },
  { label: "Download", href: "#getapp", containerClass: "framer-1l9rbhf-container", hasSubtext: false },
];

const mobileNavLinks = [
  { label: "Home", href: "./", containerClass: "framer-1l0v3f0-container", wrapperClass: "framer-6z5t2m", isCurrent: true },
  { label: "Experiences", href: "#experiences", containerClass: "framer-qy8ut1-container", wrapperClass: "framer-f7i6o0", isCurrent: false },
  { label: "Features", href: "#features", containerClass: "framer-1cb9u8q-container", wrapperClass: "framer-9p1fl7", isCurrent: false },
  { label: "Stats", href: "#stats", containerClass: "framer-dn12q8-container", wrapperClass: "framer-15pwy5", isCurrent: false },
  { label: "FAQ", href: "#faq", containerClass: "framer-i0l900-container", wrapperClass: "framer-pem6zj", isCurrent: false },
  { label: "Download", href: "#getapp", containerClass: "framer-11r3jwx-container", wrapperClass: "framer-16sohac", isCurrent: false },
];

const staggerDelays = [0, 0.06, 0.12, 0.18, 0.24, 0.24];

const desktopLinkTextStyle = {
  "--font-selector": "SW50ZXItU2VtaUJvbGQ=",
  "--framer-font-family": '"Inter", "Inter Placeholder", sans-serif',
  "--framer-font-weight": "600",
  "--framer-letter-spacing": "-0.04em",
  "--framer-line-height": "110%",
  "--framer-text-color": "var(--extracted-r6o4lv, rgb(9, 9, 9))",
} as React.CSSProperties;

const mobileLinkTextStyle = {
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

const mobileRichTextContainerStyle = {
  "--extracted-r6o4lv": "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
  "--framer-paragraph-spacing": "0px",
  transform: "none",
  opacity: 1,
} as React.CSSProperties;

const headerEase = [0.96, -0.02, 0.38, 1.01] as [number, number, number, number];
const headerTransition = { duration: 0.5, ease: headerEase };
const springTransition = { type: "spring" as const, damping: 30, stiffness: 210, mass: 1 };
const hamburgerSpring = { type: "spring" as const, bounce: 0.2, duration: 0.4 };

function DrawerContent({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <nav className="framer-ugu5i9" data-framer-name="Navigation" style={{ opacity: 1 }}>
        {mobileNavLinks.map((link, index) => (
          <motion.div
            key={link.href}
            className={link.wrapperClass}
            data-framer-name="Item container"
            initial={{ opacity: 0, y: -40 }}
            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
            transition={{ ...springTransition, delay: staggerDelays[index] }}
          >
            <div className={link.containerClass} style={{ opacity: 1 }}>
              <a
                className="framer-IFf4n framer-14ac7s4 framer-v-14ac7s4 framer-1435c2t"
                data-framer-name="Desktop"
                data-highlight="true"
                href={link.href}
                onClick={onClose}
                {...(link.isCurrent ? { "data-framer-page-link-current": "true" } : {})}
                tabIndex={0}
                style={{ opacity: 1 }}
              >
                <div className="framer-ggkluq" data-framer-component-type="RichTextContainer" style={mobileRichTextContainerStyle}>
                  <p className="framer-text" style={mobileLinkTextStyle}>{link.label}</p>
                </div>
                <div className="framer-8k52a7" data-framer-component-type="RichTextContainer" style={mobileRichTextContainerStyle}>
                  <p className="framer-text" style={mobileLinkTextStyle}>{link.label}</p>
                </div>
              </a>
            </div>
          </motion.div>
        ))}
      </nav>
      <div className="framer-17uvimj" data-framer-name="Bottom" style={{ opacity: 1 }}>
        <div className="framer-1cfglw0" data-framer-name="Contact" style={{ opacity: 1 }} />
        <div className="framer-zauiq7" data-framer-name="Legal" style={{ transform: "translateX(-50%)", opacity: 1 }}>
          <div
            className="framer-cn0hy8"
            data-highlight="true"
            data-framer-component-type="RichTextContainer"
            tabIndex={0}
            style={{ "--framer-paragraph-spacing": "0px", transform: "none", opacity: 1 } as React.CSSProperties}
          >
            <p className="framer-text framer-styles-preset-1mf8d9g" data-styles-preset="ypR5VEWEl">
              <a className="framer-text framer-styles-preset-1wi7vce" data-styles-preset="nCQNaN8LD" href="/legal/privacy-policy">
                Privacy Policy
              </a>
            </p>
          </div>
          <div
            className="framer-1dkccqr"
            data-highlight="true"
            data-framer-component-type="RichTextContainer"
            tabIndex={0}
            style={{ "--framer-paragraph-spacing": "0px", transform: "none", opacity: 1 } as React.CSSProperties}
          >
            <p className="framer-text framer-styles-preset-1mf8d9g" data-styles-preset="ypR5VEWEl">
              <a className="framer-text framer-styles-preset-1wi7vce" data-styles-preset="nCQNaN8LD" href="/legal/terms-of-service">
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [drawerHeight, setDrawerHeight] = useState(0);

  useEffect(() => {
    if (drawerRef.current) {
      setDrawerHeight(drawerRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <motion.header
      className={`framer-e3FRw framer-0CPYn framer-m9VkI framer-bzu5mb ${isOpen ? "" : "framer-v-v89dtt"}`}
      data-framer-name="Desktop"
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
      <nav className="framer-120hnkq" data-framer-name="Top" style={{ opacity: 1 }}>
        {/* Logo */}
        <a className="framer-iogiyt framer-1a90gm8" data-framer-name="Link" href="#main-1" style={{ opacity: 1 }}>
          <div className="framer-kxb2zt-container" style={{ opacity: 1 }}>
            <div className="framer-eKVcD framer-1ppeyn8 framer-v-1ppeyn8" data-framer-name="Desktop" style={{ opacity: 1 }}>
              <div className="framer-1lkcsgp" data-framer-name="Logo" style={{ opacity: 1 }}>
                <div
                  style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }}
                  data-framer-background-image-wrapper="true"
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
              className="framer-pPkX6 framer-7g0p1o framer-v-7g0p1o framer-1ljdjoh"
              data-framer-name="Default"
              href={link.href}
              style={{ opacity: 1 }}
            >
              <div
                className="framer-xu6ifz"
                data-framer-component-type="RichTextContainer"
                style={{ "--extracted-r6o4lv": "rgb(9, 9, 9)", "--framer-paragraph-spacing": "0px", transform: "none", opacity: 1 } as React.CSSProperties}
              >
                <p className="framer-text" style={desktopLinkTextStyle}>{link.label}</p>
              </div>
              {link.hasSubtext && (
                <div
                  className="framer-1r3wqjw"
                  data-framer-component-type="RichTextContainer"
                  style={{ "--extracted-r6o4lv": "rgb(9, 9, 9)", "--framer-paragraph-spacing": "0px", opacity: 0.6, transform: "none" } as React.CSSProperties}
                >
                  <p className="framer-text" style={{ ...desktopLinkTextStyle, "--framer-font-size": "9px", "--framer-line-height": "100%" } as React.CSSProperties} />
                </div>
              )}
            </a>
          </div>
        ))}

        {/* Hamburger button */}
        <div
          className="framer-ednsow"
          data-framer-name="Button container"
          data-highlight="true"
          tabIndex={0}
          style={{ opacity: 1, cursor: "pointer" }}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div className="framer-eda3z9-container" style={{ opacity: 1 }}>
            <div
              className={`framer-UNjyH ${isOpen ? "framer-v-4fzt3a" : "framer-1qd80pl"}`}
              data-framer-name={isOpen ? "Open" : "Closed"}
              data-highlight="true"
              tabIndex={0}
              style={{ opacity: 1, position: "relative", minWidth: 59, minHeight: 12 }}
            >
              <motion.div
                className="framer-1jxc6iw"
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
                className="framer-qxejnu"
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

      {/* Mobile drawer — visible when variant class is removed */}
      <motion.div
        className="framer-1rfamfy"
        data-framer-name="Body"
        ref={drawerRef}
        animate={{
          opacity: isOpen ? 1 : 0,
        }}
        initial={{ opacity: 0 }}
        transition={headerTransition}
        style={{
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        <DrawerContent isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </motion.div>
    </motion.header>
  );
}
