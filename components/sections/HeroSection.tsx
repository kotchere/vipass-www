import GrainOverlay from "@/components/ui/GrainOverlay";

export default function HeroSection() {
  return (
    <section className="f-ykgwn3" data-f-name="Hero" id="home">
      <div className="f-19j2lei" data-f-name="First screen">
        <div className="ssr-variant hidden-f3lv8x">
          <div
            className="f-n6szvs"
            data-f-appear-id="n6szvs"
            data-f-name="Container"
            style={{ opacity: 1, transform: "none", willChange: "transform" }}
          >
            <div className="f-1kxwov3" data-f-name="Content">
              <div className="f-13u7xh5" data-f-name="Top" style={{ flex: 1, alignItems: "center" }}>
                <div className="f-1spzsp8" data-f-name="Company">
                  <div className="f-al5dzj" data-f-name="Title">
                    <div className="f-13yua5i" data-f-name="Container">
                      <div
                        data-f-component-type="RichTextContainer"
                        style={{ transform: "none" }}
                      >
                        <p
                          style={{
                            "--font-selector": "SW50ZXItU2VtaUJvbGQ=",
                            "--f-font-family": '"Inter", "Inter Placeholder", sans-serif',
                            "--f-font-size": "200px",
                            "--f-font-weight": "800",
                            "--f-letter-spacing": "-0.06em",
                            "--f-line-height": "83%",
                            "--f-text-color": "rgb(255, 255, 255)",
                          } as React.CSSProperties}
                          className="f-text"
                        >
                          Vipass<span style={{ fontSize: "0.3em", verticalAlign: "super", marginLeft: "2px" }}>®</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="f-gxz29i" data-f-name="Studio">
                    <div
                      className="f-112dz82 hidden-f3lv8x"
                      data-f-name="filler"
                    ></div>
                  </div>
                </div>
              </div>

              <div className="f-hsxobt" data-f-name="Bottom">
                <div className="f-qj2zoe" data-f-name="Text">
                  <div
                    className="f-1h9hge5"
                    data-f-component-type="RichTextContainer"
                    style={{ transform: "none" }}
                  >
                    <h1
                      className="f-text f-styles-preset-1oueo73"
                      data-styles-preset="HLpRTFhim"
                      dir="auto"
                    >
                      The best nights out start here.{" "}
                      <br className="f-text" />
                      <span
                        style={
                          {
                            "--f-text-color": "rgba(255, 255, 255, 0.7)",
                          } as React.CSSProperties
                        }
                        className="f-text"
                      >
                        Find events, get tickets, and stay in the loop without the hassle.
                      </span>
                    </h1>
                  </div>
                </div>

                {/* Download button */}
                <div className="f-r9wof4-container">
                  <a
                    className="f-vJRT3 f-rbw179 f-v-rbw179 f-1qniyoc hero-download-btn"
                    data-f-name="Default"
                    data-reset="button"
                    href="#getapp"
                    style={{
                      backgroundColor: "rgb(255, 255, 255)",
                      borderRadius: 50,
                      opacity: 1,
                      textDecoration: "none",
                    }}
                  >
                    <div
                      className="f-meoha7"
                      data-f-name="Submit 2"
                      data-f-component-type="RichTextContainer"
                      style={{
                        "--extracted-r6o4lv": "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                        "--f-paragraph-spacing": "0px",
                        transform: "none",
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
                          "--f-text-color": "var(--extracted-r6o4lv, var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10)))",
                        } as React.CSSProperties}
                      >
                        Download
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Background */}
            <div className="f-1b8ph4g" data-f-name="BG">
              <div className="ssr-variant">
                <div className="f-oldnw2-container">
                  <div
                    className="f-Tl0Oq f-lahi66 f-v-lahi66"
                    data-f-name="Desktop"
                    style={{
                      backgroundColor:
                        "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                      height: "100%",
                      width: "100%",
                      borderRadius: 25,
                      opacity: 1,
                    }}
                  >
                    <div
                      className="f-143hdec-container"
                      style={{
                        opacity: 1,
                      }}
                    >
                      <video
                        src="/assets/video/vid-color.mp4"
                        loop
                        preload="auto"
                        poster="/assets/images/ZJ6HLYoAxMXsbBJCnggXHSRug_27b54607.jpg"
                        muted
                        playsInline
                        autoPlay
                        style={{
                          cursor: "auto",
                          width: "100%",
                          height: "100%",
                          borderRadius: 0,
                          display: "block",
                          objectFit: "cover",
                          backgroundColor:
                            "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                          objectPosition: "50% 50%",
                        }}
                      />
                    </div>
                    <div className="f-1on14o5-container" style={{ opacity: 1 }}>
                      <GrainOverlay />
                    </div>
                  </div>
                </div>
              </div>
              <div className="f-1nah8ke-container">
                <GrainOverlay />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
