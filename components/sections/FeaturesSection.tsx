"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const IMAGE_BOX_SHADOW =
  "rgba(0, 0, 0, 0.4) -0.800251px 0px 1.76055px -0.7px, rgba(0, 0, 0, 0.39) -2.1793px 0px 4.79445px -1.4px, rgba(0, 0, 0, 0.36) -4.78495px 0px 10.5269px -2.1px, rgba(0, 0, 0, 0.31) -10.6215px 0px 23.3673px -2.8px, rgba(0, 0, 0, 0.17) -27px 0px 59.4px -3.5px";

const features = [
  {
    number: "(001)",
    title: "Live Event Pulse",
    description:
      "Follow along with real-time updates as the event unfolds. Know when doors open, when your favorite act hits the stage, and never miss a beat even if you\u2019re running late.",
    images: [
      "/assets/images/vGSJoy0fkCYvuK5CETUzS64NNo_ef54ed9e.jpg",
      "/assets/images/6xxZ3D6rnu26P86nUVvj2eanCY_ef1bbb6e.jpg",
      "/assets/images/6girwIRKdg1doDEWAHr4oDIbroU_47c04159.jpg",
    ],
    containerClass: "framer-1rzj7xg-container",
  },
  {
    number: "(002)",
    title: "Your Entire Night in One Place",
    description:
      "Tickets, lineups, venue details, and live updates all under one roof. No switching between apps or hunting for info the night of.",
    images: [
      "/assets/images/9hTP0obDSaEcVCyC5kaHbx7FfI_80d92213.jpg",
      "/assets/images/PTZo29JDyFUqhP5lmoOwf726M_a226a504.jpg",
      "/assets/images/OvxlgM3dgsl1n9Hl1FAnutk3YQ_25760d5b.jpg",
    ],
    containerClass: "framer-1bfpaot-container",
  },
  {
    number: "(003)",
    title: "Built for Creators, Not Just Attendees",
    description:
      "Launch an event, manage tickets, and track sales right from your phone. No desktop needed, no third-party tools, no friction.",
    images: [
      "/assets/images/DsMKi7qE5JNWO5UQxmeqZGDSOI_03f735a1.jpg",
      "/assets/images/2BxeG0o2qWf8AOHmXP5mvB7fXo_398b9d36.jpg",
      "/assets/images/PzUf5VcgXOfitprgtvScN6spik_bf934ca8.jpg",
    ],
    containerClass: "framer-1sy2cyp-container",
  },
  {
    number: "(004)",
    title: "Smart Event Discovery",
    description:
      "Surface events you\u2019ll actually care about based on what\u2019s happening around you, not just what\u2019s being promoted the hardest.",
    images: [
      "/assets/images/zhgLgjCtsbVWTYRQuFeBf3XoW6c_ea29d825.jpg",
      "/assets/images/qQlR5lTiRYzT2lPzSWLLVkcgH6Y_9ec6cd36.jpg",
      "/assets/images/7HAgaIAjq6jlYJoi8ME87oXs6w_78d15953.jpg",
    ],
    containerClass: "framer-1sy2cyp-container",
  },
];

const textColorStyle = {
  "--framer-text-color":
    "var(--extracted-r6o4lv, var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255)))",
} as React.CSSProperties;

const extractedWhite = {
  "--extracted-r6o4lv":
    "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
  "--framer-paragraph-spacing": "0px",
} as React.CSSProperties;

const transition = { delay: 0, duration: 0.3, ease: [0.82, 0.11, 0.37, 0.82] as [number, number, number, number], type: "tween" as const };

function FeatureItem({
  number,
  title,
  description,
  images,
  containerClass,
  isOpen,
  onClick,
}: (typeof features)[number] & { isOpen: boolean; onClick: () => void }) {
  return (
    <div className={containerClass} style={{ opacity: 1 }}>
      <div
        className={`framer-ssEy5 framer-PU6Rs framer-loOMQ framer-RKppn framer-1nd063s ${isOpen ? "framer-v-1nd063s" : "framer-v-1cek2le"}`}
        data-border="true"
        data-framer-name={isOpen ? "Desktop open" : "Desktop closed"}
        data-highlight="true"
        tabIndex={0}
        onClick={onClick}
        style={{
          "--border-bottom-width": isOpen ? "1px" : "0px",
          "--border-color": "rgba(255, 255, 255, 0.1)",
          "--border-left-width": "0px",
          "--border-right-width": "0px",
          "--border-style": "solid",
          "--border-top-width": "0px",
          width: "100%",
          opacity: 1,
          transform: "none",
          cursor: "pointer",
        } as React.CSSProperties}
      >
        {/* Number column */}
        <div className="framer-wos98z" data-framer-name="1" style={{ opacity: 1 }}>
          <motion.div
            className="framer-vxijqi"
            data-framer-component-type="RichTextContainer"
            animate={{ opacity: isOpen ? 1 : 0.6 }}
            transition={transition}
            style={{ ...extractedWhite, transform: "none" } as React.CSSProperties}
          >
            <p
              className="framer-text framer-styles-preset-1n1wh7h"
              data-styles-preset="gd6AWaps9"
              style={textColorStyle}
            >
              {number}
            </p>
          </motion.div>
        </div>

        {/* Content area */}
        <div
          className="framer-1ox4qjh"
          data-framer-name="2"
          data-border={!isOpen ? "true" : undefined}
          style={{
            "--border-bottom-width": isOpen ? "0px" : "1px",
            "--border-color": isOpen ? "rgba(0, 0, 0, 0)" : "rgba(255, 255, 255, 0.1)",
            "--border-left-width": "0px",
            "--border-right-width": "0px",
            "--border-style": "solid",
            "--border-top-width": "0px",
            opacity: 1,
          } as React.CSSProperties}
        >
          {/* Expanded content (images + description) */}
          <motion.div
            className="framer-174h6l6"
            data-framer-name="Text"
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={transition}
            style={{ opacity: isOpen ? 1 : 0 }}
          >
            <div className="framer-1qdqpra" data-framer-name="1" style={{ opacity: 1 }}>
              {/* Stacked images */}
              <div className="framer-1t0yt9s" data-framer-name="Images" style={{ opacity: 1 }}>
                <div className="framer-knkn1" data-framer-name="Image" style={{ borderRadius: 12, opacity: 1 }}>
                  <div style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }} data-framer-background-image-wrapper="true">
                    <img loading="lazy" width={140} height={140} src={images[0]} alt="" style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", objectPosition: "center", objectFit: "cover" }} />
                  </div>
                </div>
                <div className="framer-rbfec2" data-framer-name="Image-1" style={{ borderRadius: 14, boxShadow: IMAGE_BOX_SHADOW, opacity: 1 }}>
                  <div style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }} data-framer-background-image-wrapper="true">
                    <img loading="lazy" width={140} height={140} src={images[1]} alt="" style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", objectPosition: "center", objectFit: "cover" }} />
                  </div>
                </div>
                <div className="framer-38v78q" data-framer-name="Image-2" style={{ borderRadius: 14, boxShadow: IMAGE_BOX_SHADOW, opacity: 1 }}>
                  <div style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }} data-framer-background-image-wrapper="true">
                    <img loading="lazy" width={140} height={140} src={images[2]} alt="" style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", objectPosition: "center", objectFit: "cover" }} />
                  </div>
                </div>
              </div>

              {/* Service info */}
              <div className="framer-14ruax2" data-framer-name="Service Info" style={{ opacity: 1 }}>
                <div className="framer-1xsxun7" data-framer-component-type="RichTextContainer" style={{ ...extractedWhite, transform: "none", opacity: 1 } as React.CSSProperties}>
                  <p className="framer-text framer-styles-preset-1rii1wr" data-styles-preset="pAxoS1kOX" style={textColorStyle}>{title}</p>
                </div>
                <div className="framer-vli817" data-framer-component-type="RichTextContainer" style={{ ...extractedWhite, opacity: 0.6, transform: "none" } as React.CSSProperties}>
                  <p className="framer-text framer-styles-preset-1n1wh7h" data-styles-preset="gd6AWaps9" style={textColorStyle}>{description}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Arrow button */}
          <motion.div
            className="framer-koycop"
            data-border="true"
            data-framer-name="Button"
            animate={{ rotate: isOpen ? 0 : 270 }}
            transition={transition}
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
              className="framer-1xewh8u-container"
              animate={{ rotate: isOpen ? 0 : 90 }}
              transition={transition}
              style={{ opacity: 1 }}
            >
              <div className="framer-ZPULr framer-1xcu7rj framer-v-1xcu7rj" data-framer-name="Variant 1" style={{ height: "100%", width: "100%", opacity: 1 }}>
                {!isOpen && (
                  <div className="framer-2rakpf" data-framer-name="V" style={{ backgroundColor: "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))", opacity: 1 }} />
                )}
                <div className="framer-48ytin" data-framer-name="H" style={{ backgroundColor: "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))", transform: "rotate(90deg)", opacity: 1 }} />
              </div>
            </motion.div>
          </motion.div>

          {/* Service title (visible when closed) */}
          <motion.div
            className="framer-1pna3mw"
            data-framer-name="Service Title"
            data-framer-component-type="RichTextContainer"
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={transition}
            style={{ ...extractedWhite, transform: "none" } as React.CSSProperties}
          >
            <p className="framer-text framer-styles-preset-1oueo73" data-styles-preset="HLpRTFhim" style={textColorStyle}>{title}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]));

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section className="framer-8d5aox" data-framer-name="Features" id="features">
      <div className="framer-o7lid4" data-framer-name="Container">
        <div className="framer-104r01y" data-framer-name="Top">
          <div className="framer-1xt25lo" data-framer-name="Heading">
            <div className="ssr-variant hidden-f3lv8x">
              <div
                className="framer-1ampza"
                data-framer-component-type="RichTextContainer"
                style={{ willChange: "transform", opacity: 1, transform: "none" }}
              >
                <h2
                  className="framer-text framer-styles-preset-1yvd34u"
                  data-styles-preset="GKtOymhXV"
                  dir="auto"
                  style={{
                    "--framer-text-color":
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
          <div className="framer-1hh6mhy-container">
            <div
              className="framer-hxVQG framer-x5wmst framer-v-x5wmst"
              data-framer-name="Desktop "
              style={{ width: "100%", opacity: 1 }}
            >
              <div
                className="framer-o8ohx9-container"
                style={{ transform: "translateX(-50%)", opacity: 1 }}
              >
                <div />
              </div>

              {features.map((feature, index) => (
                <FeatureItem
                  key={feature.number}
                  {...feature}
                  isOpen={openItems.has(index)}
                  onClick={() => toggleItem(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section with download button */}
        <div className="framer-1lbrd8x" data-framer-name="Bottom">
          <div className="framer-1ykazkz hidden-f3lv8x" data-framer-name="Filler" />
          <div className="framer-o105nz" data-framer-name="Container">
            <div className="ssr-variant hidden-f3lv8x">
              <div className="framer-r9wof4-container">
                <a
                  className="framer-vJRT3 framer-rbw179 framer-v-rbw179 framer-1qniyoc"
                  data-framer-name="Default"
                  data-reset="button"
                  href="/#getapp"
                  style={{
                    backgroundColor:
                      "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
                    borderRadius: 50,
                    opacity: 1,
                  }}
                >
                  <div
                    className="framer-1mhfyus"
                    data-framer-name="Submit 1"
                    data-framer-component-type="RichTextContainer"
                    style={{
                      "--extracted-r6o4lv": "var(--variable-reference-iyuXB1N8q-eDUVCTTXq)",
                      "--framer-link-text-color": "rgb(0, 153, 255)",
                      "--framer-link-text-decoration": "underline",
                      "--variable-reference-iyuXB1N8q-eDUVCTTXq":
                        "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                      "--variable-reference-R8iwJ2h7U-eDUVCTTXq":
                        "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                      opacity: 1,
                      transform: "translateX(-50%)",
                    } as React.CSSProperties}
                  >
                    <p
                      className="framer-text"
                      style={{
                        "--font-selector": "SW50ZXItU2VtaUJvbGQ=",
                        "--framer-font-family": '"Inter", "Inter Placeholder", sans-serif',
                        "--framer-font-size": "18px",
                        "--framer-font-weight": "600",
                        "--framer-letter-spacing": "-0.04em",
                        "--framer-text-color":
                          "var(--extracted-r6o4lv, var(--variable-reference-iyuXB1N8q-eDUVCTTXq))",
                      } as React.CSSProperties}
                    >
                      Download
                    </p>
                  </div>
                  <div
                    className="framer-meoha7"
                    data-framer-name="Submit 2"
                    data-framer-component-type="RichTextContainer"
                    style={{
                      "--extracted-r6o4lv": "var(--variable-reference-iyuXB1N8q-eDUVCTTXq)",
                      "--framer-link-text-color": "rgb(0, 153, 255)",
                      "--framer-link-text-decoration": "underline",
                      "--variable-reference-iyuXB1N8q-eDUVCTTXq":
                        "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                      "--variable-reference-R8iwJ2h7U-eDUVCTTXq":
                        "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                      opacity: 1,
                      transform: "none",
                    } as React.CSSProperties}
                  >
                    <p
                      className="framer-text"
                      style={{
                        "--font-selector": "SW50ZXItU2VtaUJvbGQ=",
                        "--framer-font-family": '"Inter", "Inter Placeholder", sans-serif',
                        "--framer-font-size": "18px",
                        "--framer-font-weight": "600",
                        "--framer-letter-spacing": "-0.04em",
                        "--framer-text-color":
                          "var(--extracted-r6o4lv, var(--variable-reference-iyuXB1N8q-eDUVCTTXq))",
                      } as React.CSSProperties}
                    >
                      Download
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="framer-1varat1" data-framer-name="background" />
    </section>
  );
}
