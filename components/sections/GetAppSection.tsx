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
    <div className="f-1o7ubga" data-f-name="Get App" id="getapp">
      <div className="f-4nlwkr">
        <div className="f-nonbaj">
          <div className="f-1ozc41g" data-f-name="Container">
            {/* LEFT: Contact Form */}
            <div
              className="f-eu98t"
              data-f-name="Form"
              style={{ opacity: 1, transform: "none" }}
            >
              <div className="f-85f0w8" data-f-name="Container">
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
                        className="f-text f-styles-preset-hik9eh"
                        data-styles-preset="zgy6bak25"
                      >
                        Thank you!
                      </h3>
                      <p
                        className="f-text f-styles-preset-2s58fc"
                        data-styles-preset="svYtzYwMA"
                        style={{ marginTop: "16px" }}
                      >
                        Your message has been sent. We&apos;ll get back to you
                        soon.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form className="f-1jgjsc0" onSubmit={handleSubmit}>
                    <div className="f-10kx5zv" data-f-name="Heading">
                      <div
                        className="f-6pcljh"
                        data-f-name="Form Title"
                        data-f-component-type="RichTextContainer"
                        style={{ transform: "none" }}
                      >
                        <p
                          className="f-text f-styles-preset-hik9eh"
                          data-styles-preset="zgy6bak25"
                          dir="auto"
                        >
                          Have a project{" "}
                          <span
                            style={
                              {
                                "--f-text-color": "rgba(10, 10, 10, 0.6)",
                              } as React.CSSProperties
                            }
                            className="f-text"
                          >
                            in mind?
                          </span>
                        </p>
                      </div>
                    </div>

                    <div
                      className="f-196j8ry"
                      data-f-name="Inputs"
                    >
                      <label className="f-erbiyd">
                        <div
                          className="f-vjzsr1"
                          data-f-name="Name Label"
                          data-f-component-type="RichTextContainer"
                          style={{ transform: "none" }}
                        >
                          <p
                            className="f-text f-styles-preset-2s58fc"
                            data-styles-preset="svYtzYwMA"
                            dir="auto"
                          >
                            Your name*
                          </p>
                        </div>
                        <div className="f-form-text-input f-form-input-wrapper f-5iy7ol f-form-text-input-type">
                          <input
                            type="text"
                            required
                            name="Name"
                            placeholder="John Doe"
                            className="f-form-input f-form-input-empty"
                          />
                        </div>
                      </label>

                      <label className="f-1an6z9p">
                        <div
                          className="f-n8v7pc"
                          data-f-name="Name Label"
                          data-f-component-type="RichTextContainer"
                          style={{ transform: "none" }}
                        >
                          <p
                            className="f-text f-styles-preset-2s58fc"
                            data-styles-preset="svYtzYwMA"
                            dir="auto"
                          >
                            E-mail*
                          </p>
                        </div>
                        <div className="f-form-text-input f-form-input-wrapper f-5rqycq">
                          <input
                            type="email"
                            required
                            name="E-mail"
                            placeholder="hello@site.com"
                            className="f-form-input f-form-input-empty"
                          />
                        </div>
                      </label>

                      <label className="f-1i4wi2g">
                        <div
                          className="f-2sqwk2"
                          data-f-name="Name Label"
                          data-f-component-type="RichTextContainer"
                          style={{ transform: "none" }}
                        >
                          <p
                            className="f-text f-styles-preset-2s58fc"
                            data-styles-preset="svYtzYwMA"
                            dir="auto"
                          >
                            Message
                          </p>
                        </div>
                        <div className="f-form-text-input f-form-input-wrapper f-102j1h0 f-form-text-input-type">
                          <input
                            type="text"
                            required
                            name="Message"
                            placeholder="Your message"
                            className="f-form-input f-form-input-empty"
                          />
                        </div>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="ssr-variant">
                      <div className="f-wcxm05-container">
                        <button
                          type="submit"
                          className="f-GdT3P f-4lucl9 f-v-4lucl9"
                          data-f-name="Default"
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
                            className="f-o38np2"
                            data-f-name="Submit 1"
                            data-f-component-type="RichTextContainer"
                            style={
                              {
                                "--extracted-r6o4lv":
                                  "var(--variable-reference-GNYtni0Of-ZsPpcvZL7)",
                                "--f-link-text-color": "rgb(0, 153, 255)",
                                "--f-link-text-decoration": "underline",
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
                              className="f-text"
                              style={
                                {
                                  "--font-selector": "SW50ZXItU2VtaUJvbGQ=",
                                  "--f-font-family":
                                    '"Inter", "Inter Placeholder", sans-serif',
                                  "--f-font-size": "18px",
                                  "--f-font-weight": "600",
                                  "--f-letter-spacing": "-0.04em",
                                  "--f-text-color":
                                    "var(--extracted-r6o4lv, var(--variable-reference-GNYtni0Of-ZsPpcvZL7))",
                                } as React.CSSProperties
                              }
                            >
                              Send Message
                            </p>
                          </div>
                          <div
                            className="f-1zgpu1"
                            data-f-name="Submit 2"
                            data-f-component-type="RichTextContainer"
                            style={
                              {
                                "--extracted-r6o4lv":
                                  "var(--variable-reference-GNYtni0Of-ZsPpcvZL7)",
                                "--f-link-text-color": "rgb(0, 153, 255)",
                                "--f-link-text-decoration": "underline",
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
                              className="f-text"
                              style={
                                {
                                  "--font-selector": "SW50ZXItU2VtaUJvbGQ=",
                                  "--f-font-family":
                                    '"Inter", "Inter Placeholder", sans-serif',
                                  "--f-font-size": "18px",
                                  "--f-font-weight": "600",
                                  "--f-letter-spacing": "-0.04em",
                                  "--f-text-color":
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
                      className="f-1lqx3gx"
                      data-f-name="Terms and Privacy Policy"
                      data-f-component-type="RichTextContainer"
                      style={{ transform: "none" }}
                    >
                      <p
                        className="f-text f-styles-preset-2s58fc"
                        data-styles-preset="svYtzYwMA"
                        dir="auto"
                      >
                        <span
                          style={
                            {
                              "--f-text-color": "rgba(10, 10, 10, 0.6)",
                            } as React.CSSProperties
                          }
                          className="f-text"
                        >
                          By submitting, you agree to our
                        </span>
                        <span
                          style={
                            {
                              "--f-text-color": "rgba(0, 0, 0, 0.6)",
                            } as React.CSSProperties
                          }
                          className="f-text"
                        >
                          {" "}
                        </span>
                        <Link
                          className="f-text f-styles-preset-1wi7vce"
                          data-styles-preset="nCQNaN8LD"
                          href="/legal/terms-of-service"
                        >
                          Terms
                        </Link>{" "}
                        <span
                          style={
                            {
                              "--f-text-color": "rgba(10, 10, 10, 0.6)",
                            } as React.CSSProperties
                          }
                          className="f-text"
                        >
                          and
                        </span>{" "}
                        <Link
                          className="f-text f-styles-preset-1wi7vce"
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
            <div className="f-nkouq" data-f-name="Content">
              <div
                className="f-1n4c633"
                data-f-component-type="RichTextContainer"
                style={{ opacity: 1, transform: "none" }}
              >
                <h2
                  className="f-text f-styles-preset-1yvd34u"
                  data-styles-preset="GKtOymhXV"
                  dir="auto"
                  style={
                    {
                      "--f-text-color":
                        "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
                    } as React.CSSProperties
                  }
                >
                  Get the
                  <br />
                  app.
                </h2>
              </div>

              <div className="f-1ds7la7" data-f-name="Text">
                <div className="f-bcl97z" data-f-name="Description">
                  <div
                    className="f-eat9pp"
                    data-f-component-type="RichTextContainer"
                    style={{ opacity: 1, transform: "none" }}
                  >
                    <p
                      className="f-text f-styles-preset-1rii1wr"
                      data-styles-preset="pAxoS1kOX"
                      dir="auto"
                      style={
                        {
                          "--f-text-color": "rgba(255, 255, 255, 0.7)",
                        } as React.CSSProperties
                      }
                    >
                      <span
                        style={
                          {
                            "--f-text-color":
                              "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
                          } as React.CSSProperties
                        }
                        className="f-text"
                      >
                        Tell us about your project
                      </span>
                      —whether it&apos;s a website, SEO, or marketing.
                    </p>
                  </div>

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

                  {/* Quick response info block */}
                  <div className="f-v29o3c" data-f-name="Items">
                    <div className="ssr-variant">
                      <div
                        className="f-omss02-container"
                        style={{ opacity: 1, transform: "none" }}
                      >
                        <div
                          className="f-W6vuO f-WyC4r f-0CPYn f-75j668 f-v-75j668"
                          data-f-name="Desktop"
                          style={{ width: "100%", opacity: 1 }}
                        >
                          <div
                            className="f-tx0xy4"
                            data-f-name="Quick Response Info"
                            style={{ opacity: 1 }}
                          >
                            <div
                              className="f-1g7f53"
                              data-f-name="Quick Response Title"
                              data-f-component-type="RichTextContainer"
                              style={
                                {
                                  "--extracted-r6o4lv":
                                    "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
                                  "--f-paragraph-spacing": "0px",
                                  transform: "none",
                                  opacity: 1,
                                } as React.CSSProperties
                              }
                            >
                              <p
                                className="f-text f-styles-preset-9v8dhs"
                                data-styles-preset="oFAZmwcVJ"
                                style={
                                  {
                                    "--f-text-color":
                                      "var(--extracted-r6o4lv, var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255)))",
                                  } as React.CSSProperties
                                }
                              >
                                Quick response.
                              </p>
                            </div>
                          </div>
                          <div
                            className="f-r0ha9m"
                            data-f-name="Join Us Description"
                            data-f-component-type="RichTextContainer"
                            style={
                              {
                                "--extracted-r6o4lv":
                                  "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
                                "--f-paragraph-spacing": "0px",
                                opacity: 0.6,
                                transform: "none",
                              } as React.CSSProperties
                            }
                          >
                            <p
                              className="f-text f-styles-preset-1mf8d9g"
                              data-styles-preset="ypR5VEWEl"
                              style={
                                {
                                  "--f-text-color":
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
