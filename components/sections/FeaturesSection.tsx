"use client";

import { useState } from "react";
import { LayoutGroup, motion } from "f-motion";

const IMAGE_BOX_SHADOW =
  "rgba(0, 0, 0, 0.4) -0.800251px 0px 1.76055px -0.7px, rgba(0, 0, 0, 0.39) -2.1793px 0px 4.79445px -1.4px, rgba(0, 0, 0, 0.36) -4.78495px 0px 10.5269px -2.1px, rgba(0, 0, 0, 0.31) -10.6215px 0px 23.3673px -2.8px, rgba(0, 0, 0, 0.17) -27px 0px 59.4px -3.5px";

const features = [
  {
    number: "(001)",
    title: "Live Event Pulse",
    description:
      "Follow along with real-time updates as the event unfolds. Know when doors open, when your favorite act hits the stage, and never miss a beat even if you\u2019re running late.",
    image: "/assets/images/feature-livepulse-2.png",
    containerClass: "f-1rzj7xg-container",
  },
  {
    number: "(002)",
    title: "Your Entire Night in One Place",
    description:
      "Tickets, lineups, venue details, and live updates all under one roof. No switching between apps or hunting for info the night of.",
    image: "/assets/images/feature-tickets-2.png",
    containerClass: "f-1bfpaot-container",
  },
  {
    number: "(003)",
    title: "Built for Creators, Not Just Attendees",
    description:
      "Launch an event, manage tickets, and track sales right from your phone. No desktop needed, no third-party tools, no friction.",
    image: "/assets/images/feature-launch-1.png",
    containerClass: "f-1sy2cyp-container",
  },
  {
    number: "(004)",
    title: "Smart Event Discovery",
    description:
      "Surface events you\u2019ll actually care about based on what\u2019s happening around you, not just what\u2019s being promoted the hardest.",
    image: "/assets/images/feature-surface-2.png",
    containerClass: "f-1sy2cyp-container",
  },
];

const textColorStyle = {
  "--f-text-color":
    "var(--extracted-r6o4lv, var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255)))",
} as React.CSSProperties;

const extractedWhite = {
  "--extracted-r6o4lv":
    "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
  "--f-paragraph-spacing": "0px",
} as React.CSSProperties;

const ACCORDION_TRANSITION = {
  delay: 0,
  duration: 0.3,
  ease: [0.82, 0.11, 0.37, 0.82] as [number, number, number, number],
  type: "tween" as const,
};

const DOWNLOAD_BUTTON_TRANSITION = {
  bounce: 0.35,
  delay: 0,
  duration: 0.39,
  type: "spring" as const,
};

const DESKTOP_OPEN_HEIGHT = 217;
const DESKTOP_CLOSED_HEIGHT = 66;
const DESKTOP_CLOSED_DETAILS_Y = -171;
const DESKTOP_OPEN_PADDING_TOP = 30;

function FeatureItem({
  number,
  title,
  description,
  image,
  containerClass,
  defaultOpen,
}: (typeof features)[number] & { defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen ?? false);

  return (
    <div className={containerClass} style={{ opacity: 1 }}>
      <motion.div
        className={`f-ssEy5 f-PU6Rs f-loOMQ f-RKppn f-1nd063s ${isOpen ? "f-v-1nd063s" : "f-v-1cek2le"}`}
        data-border="true"
        data-f-name={isOpen ? "Desktop open" : "Desktop closed"}
        data-highlight="true"
        tabIndex={0}
        onTap={() => setIsOpen((prev) => !prev)}
        animate={
          {
            "--border-bottom-width": isOpen ? "1px" : "0px",
            height: isOpen ? DESKTOP_OPEN_HEIGHT : DESKTOP_CLOSED_HEIGHT,
            paddingTop: isOpen ? DESKTOP_OPEN_PADDING_TOP : 0,
          } as Record<string, string | number>
        }
        initial={false}
        transition={ACCORDION_TRANSITION}
        style={{
          "--border-bottom-width": "1px",
          "--border-color": "rgba(255, 255, 255, 0.1)",
          "--border-left-width": "0px",
          "--border-right-width": "0px",
          "--border-style": "solid",
          "--border-top-width": "0px",
          width: "100%",
          height: DESKTOP_OPEN_HEIGHT,
          paddingTop: DESKTOP_OPEN_PADDING_TOP,
          opacity: 1,
          transform: "none",
          cursor: "pointer",
        } as React.CSSProperties}
      >
        {/* Number column */}
        <div className="f-wos98z" data-f-name="1" style={{ opacity: 1 }}>
          <motion.div
            className="f-vxijqi"
            data-f-component-type="RichTextContainer"
            animate={{ opacity: isOpen ? 1 : 0.6 }}
            initial={false}
            transition={ACCORDION_TRANSITION}
            style={{ ...extractedWhite, transform: "none" } as React.CSSProperties}
          >
            <p
              className="f-text f-styles-preset-1n1wh7h"
              data-styles-preset="gd6AWaps9"
              style={textColorStyle}
            >
              {number}
            </p>
          </motion.div>
        </div>

        {/* Content area */}
        <motion.div
          className="f-1ox4qjh"
          data-f-name="2"
          data-border="true"
          animate={{
            "--border-bottom-width": isOpen ? "0px" : "1px",
            "--border-color": isOpen ? "rgba(0, 0, 0, 0)" : "rgba(255, 255, 255, 0.1)",
          } as Record<string, string>}
          initial={false}
          transition={ACCORDION_TRANSITION}
          style={{
            "--border-bottom-width": "0px",
            "--border-color": "rgba(0, 0, 0, 0)",
            "--border-left-width": "0px",
            "--border-right-width": "0px",
            "--border-style": "solid",
            "--border-top-width": "0px",
            opacity: 1,
          } as React.CSSProperties}
        >
          {/* Expanded content (images + description) */}
          <motion.div
            className="f-174h6l6"
            data-f-name="Text"
            animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : DESKTOP_CLOSED_DETAILS_Y }}
            initial={false}
            transition={ACCORDION_TRANSITION}
            style={{ opacity: 1 }}
          >
            <div className="f-1qdqpra" data-f-name="1" style={{ opacity: 1 }}>
              <div className="f-knkn1" data-f-name="Image" style={{ borderRadius: 12, opacity: 1 }}>
                <div style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }} data-f-background-image-wrapper="true">
                  <img loading="lazy" width={140} height={140} src={image} alt="" style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", objectPosition: "center", objectFit: "cover" }} />
                </div>
              </div>
              <div className="f-14ruax2" data-f-name="Service Info" style={{ opacity: 1 }}>
                <div className="f-1xsxun7" data-f-component-type="RichTextContainer" style={{ ...extractedWhite, transform: "none", opacity: 1 } as React.CSSProperties}>
                  <p className="f-text f-styles-preset-1rii1wr" data-styles-preset="pAxoS1kOX" style={textColorStyle}>{title}</p>
                </div>
                <div className="f-vli817" data-f-component-type="RichTextContainer" style={{ ...extractedWhite, opacity: 0.6, transform: "none" } as React.CSSProperties}>
                  <p className="f-text f-styles-preset-1n1wh7h" data-styles-preset="gd6AWaps9" style={textColorStyle}>{description}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Arrow button */}
          <motion.div
            className="f-koycop"
            data-border="true"
            data-f-name="Button"
            animate={{ rotate: isOpen ? 0 : 270 }}
            initial={false}
            transition={ACCORDION_TRANSITION}
            style={{
              "--border-bottom-width": "1px",
              "--border-color": "rgb(49, 49, 49)",
              "--border-left-width": "1px",
              "--border-right-width": "1px",
              "--border-style": "solid",
              "--border-top-width": "1px",
              borderRadius: "100%",
              opacity: 1,
            } as React.CSSProperties}
          >
            <motion.div
              className="f-1xewh8u-container"
              animate={{ rotate: isOpen ? 0 : 90 }}
              initial={false}
              transition={ACCORDION_TRANSITION}
              style={{ opacity: 1 }}
            >
              <div className="f-ZPULr f-1xcu7rj f-v-1xcu7rj" data-f-name="Variant 1" style={{ height: "100%", width: "100%", opacity: 1 }}>
                <motion.div
                  className="f-2rakpf"
                  data-f-name="V"
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  initial={false}
                  transition={ACCORDION_TRANSITION}
                  style={{ backgroundColor: "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))", opacity: 1 }}
                />
                <div className="f-48ytin" data-f-name="H" style={{ backgroundColor: "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))", transform: "rotate(90deg)", opacity: 1 }} />
              </div>
            </motion.div>
          </motion.div>

          {/* Service title (visible when closed, CSS positions it) */}
          <motion.div
            className="f-1pna3mw"
            data-f-name="Service Title"
            data-f-component-type="RichTextContainer"
            animate={{ opacity: isOpen ? 0 : 1 }}
            initial={false}
            transition={ACCORDION_TRANSITION}
            style={{ ...extractedWhite, opacity: 0 } as React.CSSProperties}
          >
            <p className="f-text f-styles-preset-1oueo73" data-styles-preset="HLpRTFhim" style={textColorStyle}>{title}</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function FeaturesSection() {
  const [isDownloadHovered, setIsDownloadHovered] = useState(false);

  return (
    <section className="f-8d5aox" data-f-name="Features" id="features">
      <div className="f-o7lid4" data-f-name="Container">
        <div className="f-104r01y" data-f-name="Top">
          <div className="f-1xt25lo" data-f-name="Heading">
            <div className="ssr-variant hidden-f3lv8x">
              <div
                className="f-1ampza"
                data-f-component-type="RichTextContainer"
                style={{ willChange: "transform", opacity: 1, transform: "none" }}
              >
                <h2
                  className="f-text f-styles-preset-1yvd34u"
                  data-styles-preset="GKtOymhXV"
                  dir="auto"
                  style={{
                    "--f-text-color":
                      "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
                  } as React.CSSProperties}
                >
                  Features.
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop feature items */}
        <div className="ssr-variant hidden-f3lv8x hidden-tsn51j">
          <div className="f-1hh6mhy-container">
            <div
              className="f-hxVQG f-x5wmst f-v-x5wmst"
              data-f-name="Desktop "
              style={{ width: "100%", opacity: 1 }}
            >
              <div
                className="f-o8ohx9-container"
                style={{ transform: "translateX(-50%)", opacity: 1 }}
              >
                <div />
              </div>

              <LayoutGroup id="features-accordion">
                {features.map((feature, index) => (
                  <FeatureItem
                    key={feature.number}
                    {...feature}
                    defaultOpen={index === 0}
                  />
                ))}
              </LayoutGroup>
            </div>
          </div>
        </div>

        {/* Bottom section with download button */}
        <div className="f-1lbrd8x" data-f-name="Bottom">
          <div className="f-1ykazkz hidden-f3lv8x" data-f-name="Filler" />
          <div className="f-o105nz" data-f-name="Container">
            <div className="ssr-variant hidden-f3lv8x">
              <div className="f-r9wof4-container">
                <motion.a
                  className={`f-vJRT3 f-rbw179 f-v-rbw179 f-1qniyoc${isDownloadHovered ? " hover" : ""}`}
                  data-f-name="Default"
                  data-reset="button"
                  href="/#getapp"
                  onHoverStart={() => setIsDownloadHovered(true)}
                  onHoverEnd={() => setIsDownloadHovered(false)}
                  layout
                  animate={{
                    backgroundColor: isDownloadHovered
                      ? "rgb(235, 235, 235)"
                      : "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
                  }}
                  initial={false}
                  transition={DOWNLOAD_BUTTON_TRANSITION}
                  style={{
                    backgroundColor:
                      "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
                    borderRadius: 50,
                    opacity: 1,
                  }}
                >
                  <motion.div
                    className="f-1mhfyus"
                    data-f-name="Submit 1"
                    data-f-component-type="RichTextContainer"
                    layout
                    animate={{
                      opacity: isDownloadHovered ? 1 : 0,
                      x: isDownloadHovered ? 0 : "-50%",
                    }}
                    initial={false}
                    transition={DOWNLOAD_BUTTON_TRANSITION}
                    style={{
                      "--extracted-r6o4lv": "var(--variable-reference-iyuXB1N8q-eDUVCTTXq)",
                      "--f-link-text-color": "rgb(0, 153, 255)",
                      "--f-link-text-decoration": "underline",
                      "--variable-reference-iyuXB1N8q-eDUVCTTXq":
                        "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                      "--variable-reference-R8iwJ2h7U-eDUVCTTXq":
                        "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                      opacity: 0,
                    } as React.CSSProperties}
                  >
                    <p
                      className="f-text"
                      style={{
                        "--font-selector": "SW50ZXItU2VtaUJvbGQ=",
                        "--f-font-family": '"Inter", "Inter Placeholder", sans-serif',
                        "--f-font-size": "18px",
                        "--f-font-weight": "600",
                        "--f-letter-spacing": "-0.04em",
                        "--f-text-color":
                          isDownloadHovered
                            ? "var(--extracted-r6o4lv, var(--variable-reference-R8iwJ2h7U-eDUVCTTXq))"
                            : "var(--extracted-r6o4lv, var(--variable-reference-iyuXB1N8q-eDUVCTTXq))",
                      } as React.CSSProperties}
                    >
                      Download
                    </p>
                  </motion.div>
                  <motion.div
                    className="f-meoha7"
                    data-f-name="Submit 2"
                    data-f-component-type="RichTextContainer"
                    layout
                    animate={{
                      opacity: isDownloadHovered ? 0 : 1,
                      x: isDownloadHovered ? "-50%" : 0,
                    }}
                    initial={false}
                    transition={DOWNLOAD_BUTTON_TRANSITION}
                    style={{
                      "--extracted-r6o4lv": "var(--variable-reference-iyuXB1N8q-eDUVCTTXq)",
                      "--f-link-text-color": "rgb(0, 153, 255)",
                      "--f-link-text-decoration": "underline",
                      "--variable-reference-iyuXB1N8q-eDUVCTTXq":
                        "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                      "--variable-reference-R8iwJ2h7U-eDUVCTTXq":
                        "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                      opacity: 1,
                    } as React.CSSProperties}
                  >
                    <p
                      className="f-text"
                      style={{
                        "--font-selector": "SW50ZXItU2VtaUJvbGQ=",
                        "--f-font-family": '"Inter", "Inter Placeholder", sans-serif',
                        "--f-font-size": "18px",
                        "--f-font-weight": "600",
                        "--f-letter-spacing": "-0.04em",
                        "--f-text-color":
                          isDownloadHovered
                            ? "var(--extracted-r6o4lv, var(--variable-reference-R8iwJ2h7U-eDUVCTTXq))"
                            : "var(--extracted-r6o4lv, var(--variable-reference-iyuXB1N8q-eDUVCTTXq))",
                      } as React.CSSProperties}
                    >
                      Download
                    </p>
                  </motion.div>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="f-1varat1" data-f-name="background" />
    </section>
  );
}
