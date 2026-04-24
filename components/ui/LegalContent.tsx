import React from "react";

interface LegalContentProps {
  title: string;
  lastUpdated: string;
  lastUpdatedDatetime: string;
  intro: React.ReactNode;
  body: React.ReactNode;
}

export default function LegalContent({
  title,
  lastUpdated,
  lastUpdatedDatetime,
  intro,
  body,
}: LegalContentProps) {
  return (
    <main className="framer-1tf2day" data-framer-name="Main">
      <section className="framer-o964q9" data-framer-name="Text">
        <div className="framer-1qio54b" data-framer-name="Container">
          <div className="ssr-variant hidden-ztf6bl">
            <div
              className="framer-w1e0nk"
              data-framer-component-type="RichTextContainer"
              style={{ opacity: 1, transform: "none" }}
            >
              <h1
                className="framer-text framer-styles-preset-1qappj3"
                data-styles-preset="mxo_rwZbG"
              >
                {title}
              </h1>
            </div>
          </div>
          <div
            className="framer-ga0hfl"
            style={{ opacity: 1, transform: "none" }}
          >
            <div className="framer-cdifl8" data-framer-name="Intro">
              <div
                className="framer-hztbda"
                data-framer-component-type="RichTextContainer"
                style={{ transform: "none" }}
              >
                <p
                  className="framer-text framer-styles-preset-1mf8d9g"
                  data-styles-preset="ypR5VEWEl"
                >
                  Last updated:
                </p>
              </div>
              <div
                className="framer-vvh4xj"
                data-framer-component-type="RichTextContainer"
                style={{ transform: "none" }}
              >
                <p
                  className="framer-text framer-styles-preset-9v8dhs"
                  data-styles-preset="oFAZmwcVJ"
                  style={
                    {
                      "--framer-text-color":
                        "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                    } as React.CSSProperties
                  }
                >
                  <time dateTime={lastUpdatedDatetime}>{lastUpdated}</time>
                </p>
              </div>
            </div>
            <div className="framer-1i2d13z" data-framer-name="Content">
              <div
                className="framer-1kh016c"
                data-framer-component-type="RichTextContainer"
                style={{ transform: "none" }}
              >
                {intro}
              </div>
              <div
                className="framer-1v3grcj"
                data-framer-component-type="RichTextContainer"
                style={{ transform: "none" }}
              >
                {body}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
