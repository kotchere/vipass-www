"use client";

import Footer from "@/components/layout/Footer";

export default function GetAppSection() {
  return (
    <div className="f-1o7ubga" data-f-name="Get App" id="getapp">
      <div className="f-4nlwkr" style={{ paddingTop: 70 }}>
        <div className="f-nonbaj">
          <div className="f-1ozc41g" data-f-name="Container" style={{ alignItems: "center", gap: 0 }}>
            {/* LEFT: iPhone mockup */}
            <div
              className="f-eu98t"
              data-f-name="Form"
              style={{
                opacity: 1,
                transform: "none",
                display: "flex",
                placeContent: "center",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                overflow: "visible",
              }}
            >
              <div style={{ position: "relative", maxWidth: "60%", maxHeight: "100%" }}>
                {/* Video behind the phone frame */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    position: "absolute",
                    top: "3.2%",
                    left: "5.8%",
                    width: "88.4%",
                    height: "93.6%",
                    objectFit: "cover",
                    borderRadius: "32px",
                    zIndex: 0,
                  }}
                >
                  <source src="/assets/video/app-video.mp4" type="video/mp4" />
                </video>
                {/* Phone frame on top */}
                <img
                  src="/assets/images/iphone-mockup.png"
                  alt="Vipass app on iPhone"
                  style={{
                    position: "relative",
                    width: "100%",
                    display: "block",
                    zIndex: 1,
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>

            {/* RIGHT: Get the app content */}
            <div className="f-nkouq" data-f-name="Content" style={{ gap: 0 }}>
              <div
                className="f-1n4c633"
                data-f-component-type="RichTextContainer"
                style={{ opacity: 1, transform: "none" }}
              >
                <h2
                  className="f-text f-styles-preset-1yvd34u"
                  data-styles-preset="GKtOymhXV"
                  dir="auto"
                  className="f-text f-styles-preset-1yvd34u getapp-heading"
                  style={
                    {
                      "--f-text-color":
                        "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
                    } as React.CSSProperties
                  }
                >
                  Get the{" "}
                  <br className="getapp-br" />
                  app.
                </h2>
              </div>

              <div className="f-1ds7la7" data-f-name="Text">
                <div className="f-bcl97z" data-f-name="Description">

                  {/* Separator line */}
                  <div className="ssr-variant">
                    <div className="f-1jq32c0-container">
                      <div
                        className="f-Sd69O f-1usovu f-v-1usovu"
                        data-f-name="Start"
                        style={{ width: "100%", opacity: 1 }}
                      >
                        <div
                          className="f-14cnlj3"
                          style={{
                            backgroundColor:
                              "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
                            opacity: 1,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* App store buttons */}
                  <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                    <a
                      href="https://apps.apple.com/us/app/vipass-app/id6451340949"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="/assets/images/appstore.svg"
                        alt="Download on the App Store"
                        style={{ height: 64 }}
                      />
                    </a>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.merchant.vipass"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="/assets/images/playstore.svg"
                        alt="Get it on Google Play"
                        style={{ height: 64 }}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
