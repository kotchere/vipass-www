"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";

export default function GetAppSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="framer-1o7ubga" data-framer-name="Get App" id="getapp">
      <div className="framer-4nlwkr">
        <div className="framer-nonbaj">
          <div className="framer-1ozc41g" data-framer-name="Container">
            {/* LEFT: Contact Form */}
            <div
              className="framer-eu98t"
              data-framer-name="Form"
              style={{ opacity: 1, transform: "none" }}
            >
              <div className="framer-85f0w8" data-framer-name="Container">
                {submitted ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      padding: "40px",
                      textAlign: "center",
                    }}
                  >
                    <div>
                      <h3
                        className="framer-text framer-styles-preset-hik9eh"
                        data-styles-preset="zgy6bak25"
                      >
                        Thank you!
                      </h3>
                      <p
                        className="framer-text framer-styles-preset-2s58fc"
                        data-styles-preset="svYtzYwMA"
                        style={{ marginTop: "16px" }}
                      >
                        Your message has been sent. We&apos;ll get back to you
                        soon.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form className="framer-1jgjsc0" onSubmit={handleSubmit}>
                    <div className="framer-10kx5zv" data-framer-name="Heading">
                      <div
                        className="framer-6pcljh"
                        data-framer-name="Form Title"
                        data-framer-component-type="RichTextContainer"
                        style={{ transform: "none" }}
                      >
                        <p
                          className="framer-text framer-styles-preset-hik9eh"
                          data-styles-preset="zgy6bak25"
                          dir="auto"
                        >
                          Have a project{" "}
                          <span
                            style={
                              {
                                "--framer-text-color": "rgba(10, 10, 10, 0.6)",
                              } as React.CSSProperties
                            }
                            className="framer-text"
                          >
                            in mind?
                          </span>
                        </p>
                      </div>
                    </div>

                    <div
                      className="framer-196j8ry"
                      data-framer-name="Inputs"
                    >
                      <label className="framer-erbiyd">
                        <div
                          className="framer-vjzsr1"
                          data-framer-name="Name Label"
                          data-framer-component-type="RichTextContainer"
                          style={{ transform: "none" }}
                        >
                          <p
                            className="framer-text framer-styles-preset-2s58fc"
                            data-styles-preset="svYtzYwMA"
                            dir="auto"
                          >
                            Your name*
                          </p>
                        </div>
                        <div className="framer-form-text-input framer-form-input-wrapper framer-5iy7ol framer-form-text-input-type">
                          <input
                            type="text"
                            required
                            name="Name"
                            placeholder="John Doe"
                            className="framer-form-input framer-form-input-empty"
                          />
                        </div>
                      </label>

                      <label className="framer-1an6z9p">
                        <div
                          className="framer-n8v7pc"
                          data-framer-name="Name Label"
                          data-framer-component-type="RichTextContainer"
                          style={{ transform: "none" }}
                        >
                          <p
                            className="framer-text framer-styles-preset-2s58fc"
                            data-styles-preset="svYtzYwMA"
                            dir="auto"
                          >
                            E-mail*
                          </p>
                        </div>
                        <div className="framer-form-text-input framer-form-input-wrapper framer-5rqycq">
                          <input
                            type="email"
                            required
                            name="E-mail"
                            placeholder="hello@site.com"
                            className="framer-form-input framer-form-input-empty"
                          />
                        </div>
                      </label>

                      <label className="framer-1i4wi2g">
                        <div
                          className="framer-2sqwk2"
                          data-framer-name="Name Label"
                          data-framer-component-type="RichTextContainer"
                          style={{ transform: "none" }}
                        >
                          <p
                            className="framer-text framer-styles-preset-2s58fc"
                            data-styles-preset="svYtzYwMA"
                            dir="auto"
                          >
                            Message
                          </p>
                        </div>
                        <div className="framer-form-text-input framer-form-input-wrapper framer-102j1h0 framer-form-text-input-type">
                          <input
                            type="text"
                            required
                            name="Message"
                            placeholder="Your message"
                            className="framer-form-input framer-form-input-empty"
                          />
                        </div>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="ssr-variant">
                      <div className="framer-wcxm05-container">
                        <button
                          type="submit"
                          className="framer-GdT3P framer-4lucl9 framer-v-4lucl9"
                          data-framer-name="Default"
                          data-reset="button"
                          style={
                            {
                              backgroundColor:
                                "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                              width: "100%",
                              borderBottomLeftRadius: "50px",
                              borderBottomRightRadius: "50px",
                              borderTopLeftRadius: "50px",
                              borderTopRightRadius: "50px",
                              opacity: 1,
                            } as React.CSSProperties
                          }
                        >
                          <div
                            className="framer-o38np2"
                            data-framer-name="Submit 1"
                            data-framer-component-type="RichTextContainer"
                            style={
                              {
                                "--extracted-r6o4lv":
                                  "var(--variable-reference-GNYtni0Of-ZsPpcvZL7)",
                                "--framer-link-text-color": "rgb(0, 153, 255)",
                                "--framer-link-text-decoration": "underline",
                                "--variable-reference-GNYtni0Of-ZsPpcvZL7":
                                  "rgb(255, 255, 255)",
                                "--variable-reference-xKHL3eyCS-ZsPpcvZL7":
                                  "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
                                opacity: 0,
                                transform: "translateX(-50%)",
                              } as React.CSSProperties
                            }
                          >
                            <p
                              className="framer-text"
                              style={
                                {
                                  "--font-selector": "SW50ZXItU2VtaUJvbGQ=",
                                  "--framer-font-family":
                                    '"Inter", "Inter Placeholder", sans-serif',
                                  "--framer-font-size": "18px",
                                  "--framer-font-weight": "600",
                                  "--framer-letter-spacing": "-0.04em",
                                  "--framer-text-color":
                                    "var(--extracted-r6o4lv, var(--variable-reference-GNYtni0Of-ZsPpcvZL7))",
                                } as React.CSSProperties
                              }
                            >
                              Send Message
                            </p>
                          </div>
                          <div
                            className="framer-1zgpu1"
                            data-framer-name="Submit 2"
                            data-framer-component-type="RichTextContainer"
                            style={
                              {
                                "--extracted-r6o4lv":
                                  "var(--variable-reference-GNYtni0Of-ZsPpcvZL7)",
                                "--framer-link-text-color": "rgb(0, 153, 255)",
                                "--framer-link-text-decoration": "underline",
                                "--variable-reference-GNYtni0Of-ZsPpcvZL7":
                                  "rgb(255, 255, 255)",
                                "--variable-reference-xKHL3eyCS-ZsPpcvZL7":
                                  "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
                                opacity: 1,
                                transform: "none",
                              } as React.CSSProperties
                            }
                          >
                            <p
                              className="framer-text"
                              style={
                                {
                                  "--font-selector": "SW50ZXItU2VtaUJvbGQ=",
                                  "--framer-font-family":
                                    '"Inter", "Inter Placeholder", sans-serif',
                                  "--framer-font-size": "18px",
                                  "--framer-font-weight": "600",
                                  "--framer-letter-spacing": "-0.04em",
                                  "--framer-text-color":
                                    "var(--extracted-r6o4lv, var(--variable-reference-GNYtni0Of-ZsPpcvZL7))",
                                } as React.CSSProperties
                              }
                            >
                              Send Message
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Terms and Privacy */}
                    <div
                      className="framer-1lqx3gx"
                      data-framer-name="Terms and Privacy Policy"
                      data-framer-component-type="RichTextContainer"
                      style={{ transform: "none" }}
                    >
                      <p
                        className="framer-text framer-styles-preset-2s58fc"
                        data-styles-preset="svYtzYwMA"
                        dir="auto"
                      >
                        <span
                          style={
                            {
                              "--framer-text-color": "rgba(10, 10, 10, 0.6)",
                            } as React.CSSProperties
                          }
                          className="framer-text"
                        >
                          By submitting, you agree to our
                        </span>
                        <span
                          style={
                            {
                              "--framer-text-color": "rgba(0, 0, 0, 0.6)",
                            } as React.CSSProperties
                          }
                          className="framer-text"
                        >
                          {" "}
                        </span>
                        <Link
                          className="framer-text framer-styles-preset-1wi7vce"
                          data-styles-preset="nCQNaN8LD"
                          href="/legal/terms-of-service"
                        >
                          Terms
                        </Link>{" "}
                        <span
                          style={
                            {
                              "--framer-text-color": "rgba(10, 10, 10, 0.6)",
                            } as React.CSSProperties
                          }
                          className="framer-text"
                        >
                          and
                        </span>{" "}
                        <Link
                          className="framer-text framer-styles-preset-1wi7vce"
                          data-styles-preset="nCQNaN8LD"
                          href="/legal/privacy-policy"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </div>

                    {/* Honeypot hidden inputs for spam protection */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="one-time-code"
                      aria-hidden="true"
                      style={{ position: "absolute", transform: "scale(0)" }}
                      data-1p-ignore="true"
                      data-lpignore="true"
                      data-form-type="other"
                      data-bwignore="true"
                    />
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="one-time-code"
                      aria-hidden="true"
                      style={{ position: "absolute", transform: "scale(0)" }}
                      data-1p-ignore="true"
                      data-lpignore="true"
                      data-form-type="other"
                      data-bwignore="true"
                    />
                    <input
                      type="text"
                      name="message"
                      tabIndex={-1}
                      autoComplete="one-time-code"
                      aria-hidden="true"
                      style={{ position: "absolute", transform: "scale(0)" }}
                      data-1p-ignore="true"
                      data-lpignore="true"
                      data-form-type="other"
                      data-bwignore="true"
                    />
                    <input
                      type="text"
                      name="subject"
                      tabIndex={-1}
                      autoComplete="one-time-code"
                      aria-hidden="true"
                      style={{ position: "absolute", transform: "scale(0)" }}
                      data-1p-ignore="true"
                      data-lpignore="true"
                      data-form-type="other"
                      data-bwignore="true"
                    />
                    <input
                      type="text"
                      name="title"
                      tabIndex={-1}
                      autoComplete="one-time-code"
                      aria-hidden="true"
                      style={{ position: "absolute", transform: "scale(0)" }}
                      data-1p-ignore="true"
                      data-lpignore="true"
                      data-form-type="other"
                      data-bwignore="true"
                    />
                    <input
                      type="text"
                      name="description"
                      tabIndex={-1}
                      autoComplete="one-time-code"
                      aria-hidden="true"
                      style={{ position: "absolute", transform: "scale(0)" }}
                      data-1p-ignore="true"
                      data-lpignore="true"
                      data-form-type="other"
                      data-bwignore="true"
                    />
                    <input
                      type="text"
                      name="feedback"
                      tabIndex={-1}
                      autoComplete="one-time-code"
                      aria-hidden="true"
                      style={{ position: "absolute", transform: "scale(0)" }}
                      data-1p-ignore="true"
                      data-lpignore="true"
                      data-form-type="other"
                      data-bwignore="true"
                    />
                    <input
                      type="text"
                      name="notes"
                      tabIndex={-1}
                      autoComplete="one-time-code"
                      aria-hidden="true"
                      style={{ position: "absolute", transform: "scale(0)" }}
                      data-1p-ignore="true"
                      data-lpignore="true"
                      data-form-type="other"
                      data-bwignore="true"
                    />
                    <input
                      type="text"
                      name="details"
                      tabIndex={-1}
                      autoComplete="one-time-code"
                      aria-hidden="true"
                      style={{ position: "absolute", transform: "scale(0)" }}
                      data-1p-ignore="true"
                      data-lpignore="true"
                      data-form-type="other"
                      data-bwignore="true"
                    />
                    <input
                      type="text"
                      name="remarks"
                      tabIndex={-1}
                      autoComplete="one-time-code"
                      aria-hidden="true"
                      style={{ position: "absolute", transform: "scale(0)" }}
                      data-1p-ignore="true"
                      data-lpignore="true"
                      data-form-type="other"
                      data-bwignore="true"
                    />
                    <input
                      type="text"
                      name="comments"
                      tabIndex={-1}
                      autoComplete="one-time-code"
                      aria-hidden="true"
                      style={{ position: "absolute", transform: "scale(0)" }}
                      data-1p-ignore="true"
                      data-lpignore="true"
                      data-form-type="other"
                      data-bwignore="true"
                    />
                  </form>
                )}
              </div>
            </div>

            {/* RIGHT: Get the app content */}
            <div className="framer-nkouq" data-framer-name="Content">
              <div
                className="framer-1n4c633"
                data-framer-component-type="RichTextContainer"
                style={{ opacity: 1, transform: "none" }}
              >
                <h2
                  className="framer-text framer-styles-preset-1yvd34u"
                  data-styles-preset="GKtOymhXV"
                  dir="auto"
                  style={
                    {
                      "--framer-text-color":
                        "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
                    } as React.CSSProperties
                  }
                >
                  Get the
                  <br />
                  app.
                </h2>
              </div>

              <div className="framer-1ds7la7" data-framer-name="Text">
                <div className="framer-bcl97z" data-framer-name="Description">
                  <div
                    className="framer-eat9pp"
                    data-framer-component-type="RichTextContainer"
                    style={{ opacity: 1, transform: "none" }}
                  >
                    <p
                      className="framer-text framer-styles-preset-1rii1wr"
                      data-styles-preset="pAxoS1kOX"
                      dir="auto"
                      style={
                        {
                          "--framer-text-color": "rgba(255, 255, 255, 0.7)",
                        } as React.CSSProperties
                      }
                    >
                      <span
                        style={
                          {
                            "--framer-text-color":
                              "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
                          } as React.CSSProperties
                        }
                        className="framer-text"
                      >
                        Tell us about your project
                      </span>
                      —whether it&apos;s a website, SEO, or marketing.
                    </p>
                  </div>

                  {/* Separator line */}
                  <div className="ssr-variant">
                    <div className="framer-1jq32c0-container">
                      <div
                        className="framer-Sd69O framer-1usovu framer-v-1usovu"
                        data-framer-name="Start"
                        style={{ width: "100%", opacity: 1 }}
                      >
                        <div
                          className="framer-14cnlj3"
                          style={{
                            backgroundColor:
                              "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
                            opacity: 1,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Quick response info block */}
                  <div className="framer-v29o3c" data-framer-name="Items">
                    <div className="ssr-variant">
                      <div
                        className="framer-omss02-container"
                        style={{ opacity: 1, transform: "none" }}
                      >
                        <div
                          className="framer-W6vuO framer-WyC4r framer-0CPYn framer-75j668 framer-v-75j668"
                          data-framer-name="Desktop"
                          style={{ width: "100%", opacity: 1 }}
                        >
                          <div
                            className="framer-tx0xy4"
                            data-framer-name="Quick Response Info"
                            style={{ opacity: 1 }}
                          >
                            <div
                              className="framer-1g7f53"
                              data-framer-name="Quick Response Title"
                              data-framer-component-type="RichTextContainer"
                              style={
                                {
                                  "--extracted-r6o4lv":
                                    "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
                                  "--framer-paragraph-spacing": "0px",
                                  transform: "none",
                                  opacity: 1,
                                } as React.CSSProperties
                              }
                            >
                              <p
                                className="framer-text framer-styles-preset-9v8dhs"
                                data-styles-preset="oFAZmwcVJ"
                                style={
                                  {
                                    "--framer-text-color":
                                      "var(--extracted-r6o4lv, var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255)))",
                                  } as React.CSSProperties
                                }
                              >
                                Quick response.
                              </p>
                            </div>
                          </div>
                          <div
                            className="framer-r0ha9m"
                            data-framer-name="Join Us Description"
                            data-framer-component-type="RichTextContainer"
                            style={
                              {
                                "--extracted-r6o4lv":
                                  "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
                                "--framer-paragraph-spacing": "0px",
                                opacity: 0.6,
                                transform: "none",
                              } as React.CSSProperties
                            }
                          >
                            <p
                              className="framer-text framer-styles-preset-1mf8d9g"
                              data-styles-preset="ypR5VEWEl"
                              style={
                                {
                                  "--framer-text-color":
                                    "var(--extracted-r6o4lv, var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255)))",
                                } as React.CSSProperties
                              }
                            >
                              If you&apos;re ready to create and collaborate,
                              we&apos;d love to hear from you.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
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
