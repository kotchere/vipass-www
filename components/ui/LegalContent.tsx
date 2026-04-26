"use client";

import React from "react";
import { motion } from "f-motion";

interface LegalContentProps {
  title: string;
  lastUpdated: string;
  lastUpdatedDatetime: string;
  intro: React.ReactNode;
  body: React.ReactNode;
}

const legalSpring = {
  type: "spring" as const,
  damping: 27,
  mass: 0.3,
  stiffness: 121,
};

export default function LegalContent({
  title,
  lastUpdated,
  lastUpdatedDatetime,
  intro,
  body,
}: LegalContentProps) {
  return (
    <main className="f-1tf2day" data-f-name="Main">
      <section className="f-o964q9" data-f-name="Text">
        <div className="f-1qio54b" data-f-name="Container">
          <div className="ssr-variant hidden-ztf6bl">
            <motion.div
              className="f-w1e0nk"
              data-f-component-type="RichTextContainer"
              initial={{ opacity: 0, y: 170 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...legalSpring, delay: 0.87 }}
            >
              <h1
                className="f-text f-styles-preset-1qappj3"
                data-styles-preset="mxo_rwZbG"
              >
                {title}
              </h1>
            </motion.div>
          </div>
          <motion.div
            className="f-ga0hfl"
            initial={{ opacity: 0, y: 170 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...legalSpring, delay: 0.8 }}
          >
            <div className="f-cdifl8" data-f-name="Intro">
              <div
                className="f-hztbda"
                data-f-component-type="RichTextContainer"
                style={{ transform: "none" }}
              >
                <p
                  className="f-text f-styles-preset-1mf8d9g"
                  data-styles-preset="ypR5VEWEl"
                >
                  Last updated:
                </p>
              </div>
              <div
                className="f-vvh4xj"
                data-f-component-type="RichTextContainer"
                style={{ transform: "none" }}
              >
                <p
                  className="f-text f-styles-preset-9v8dhs"
                  data-styles-preset="oFAZmwcVJ"
                  style={
                    {
                      "--f-text-color":
                        "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                    } as React.CSSProperties
                  }
                >
                  <time dateTime={lastUpdatedDatetime}>{lastUpdated}</time>
                </p>
              </div>
            </div>
            <div className="f-1i2d13z" data-f-name="Content">
              <div
                className="f-1kh016c"
                data-f-component-type="RichTextContainer"
                style={{ transform: "none" }}
              >
                {intro}
              </div>
              <div
                className="f-1v3grcj"
                data-f-component-type="RichTextContainer"
                style={{ transform: "none" }}
              >
                {body}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
