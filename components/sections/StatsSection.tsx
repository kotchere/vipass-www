"use client";

import { useEffect, useRef, useState } from "react";

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [countValue, setCountValue] = useState(0);
  const TARGET = 12;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // 1. Intro heading — fade + slide up
    const heading = section.querySelector(
      '[data-f-name="Intro"]',
    ) as HTMLElement | null;
    if (heading) {
      heading.style.opacity = "0";
      heading.style.transform = "translateY(30px)";
    }

    // 2. Word spans in the description paragraph
    const wordContainer = section.querySelector(
      '[data-stats-animate="word-reveal"]',
    );
    const wordSpans = wordContainer
      ? (
          Array.from(
            wordContainer.querySelectorAll('span[style*="inline-block"]'),
          ) as HTMLSpanElement[]
        ).filter((s) => s.textContent?.trim())
      : [];
    wordSpans.forEach((span) => {
      span.style.opacity = "0";
      span.style.transform = "translateY(10px)";
    });

    // 3. Cards
    const cards = Array.from(
      section.querySelectorAll('[data-stats-animate="card"]'),
    ) as HTMLElement[];
    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(40px)";
    });

    // 4. Bar columns
    const bars = Array.from(
      section.querySelectorAll('[data-stats-animate="bar"]'),
    ) as HTMLElement[];
    bars.forEach((bar) => {
      bar.style.transform = "scaleY(0)";
      bar.style.transformOrigin = "bottom";
    });

    const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        // Heading
        if (heading) {
          heading.style.transition = `opacity 0.7s ${ease}, transform 0.7s ${ease}`;
          heading.style.opacity = "1";
          heading.style.transform = "translateY(0)";
        }

        // Word-by-word stagger (start after heading begins)
        wordSpans.forEach((span, i) => {
          const delay = 0.15 + i * 0.03;
          span.style.transition = `opacity 0.35s ease ${delay}s, transform 0.35s ease ${delay}s`;
          span.style.opacity = "1";
          span.style.transform = "translateY(0)";
        });

        // Cards with stagger
        cards.forEach((card, i) => {
          const delay = 0.1 + i * 0.12;
          card.style.transition = `opacity 0.7s ${ease} ${delay}s, transform 0.7s ${ease} ${delay}s`;
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        });

        // Bar columns with stagger (after cards start)
        bars.forEach((bar, i) => {
          const delay = 0.5 + i * 0.07;
          bar.style.transition = `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`;
          bar.style.transform = "scaleY(1)";
        });

        // Animated counter
        const duration = 1200;
        const start = performance.now();
        const step = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCountValue(Math.round(eased * TARGET));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);

        observer.unobserve(section);
      },
      { rootMargin: "-80px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="f-15o920v"
      data-f-name="Stats"
      id="stats"
    >
      <section className="f-15uz38f" data-f-name="More info">
        <div className="f-sl8twl" data-f-name="Container">
          <div className="f-1lmgcpb" data-f-name="2" style={{ alignItems: "flex-end" }}>
            <div className="f-15zrzua" data-f-name="Intro">
              <div
                className="f-18jo1an"
                data-f-component-type="RichTextContainer"
                style={{ transform: "none" }}
              >
                <h2
                  className="f-text f-styles-preset-1yvd34u"
                  data-styles-preset="GKtOymhXV"
                  dir="auto"
                >
                  Stats.
                </h2>
              </div>
            </div>
            <div className="f-1f1bftd stats-text-container" data-f-name="Container">
              <div
                className="f-3wctl5"
                data-f-name="Text"
                data-stats-animate="word-reveal"
              >
                <div className="ssr-variant hidden-f3lv8x">
                  <div
                    className="f-1vd8r3h"
                    data-f-component-type="RichTextContainer"
                    style={{ transform: "none" }}
                  >
                    <p
                      className="f-text f-styles-preset-1rii1wr"
                      data-styles-preset="pAxoS1kOX"
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
                        <span
                          style={{
                            display: "inline-block",
                            opacity: 1,
                            transform: "none",
                          }}
                        >
                          See
                        </span>{" "}
                        <span
                          style={{
                            display: "inline-block",
                            opacity: 1,
                            transform: "none",
                          }}
                        >
                          how
                        </span>{" "}
                        <span
                          style={{
                            display: "inline-block",
                            opacity: 1,
                            transform: "none",
                          }}
                        >
                          your
                        </span>{" "}
                        <span
                          style={{
                            display: "inline-block",
                            opacity: 1,
                            transform: "none",
                          }}
                        >
                          event
                        </span>{" "}
                        <span
                          style={{
                            display: "inline-block",
                            opacity: 1,
                            transform: "none",
                          }}
                        >
                          performs.
                        </span>
                      </span>
                      <span
                        style={{
                          display: "inline-block",
                          opacity: 1,
                          transform: "none",
                        }}
                      />{" "}
                      <span
                        style={{
                          display: "inline-block",
                          opacity: 1,
                          transform: "none",
                        }}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case study + Performance metrics row */}
      <div className="f-9mot1k" data-f-name="2">
        {/* Case study card (dark bg) */}
        <div
          className="f-9vdeef"
          data-f-name="1"
          data-stats-animate="card"
          style={{ opacity: 1, transform: "none", overflowY: "hidden", overflowX: "visible" }}
        >
          <div className="f-1vubmvd" data-f-name="Top">
            <div className="f-qxd9hc" data-f-name="Top">
              <div
                className="f-11c473u"
                data-f-component-type="RichTextContainer"
                style={{ transform: "none" }}
              >
                <p
                  className="f-text f-styles-preset-1n1wh7h"
                  data-styles-preset="gd6AWaps9"
                  style={
                    {
                      "--f-text-color":
                        "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
                      fontSize: "28px",
                    } as React.CSSProperties
                  }
                >
                  Case study
                </p>
              </div>
              <div
                className="f-3bo2hv"
                data-f-component-type="RichTextContainer"
                style={{ transform: "none" }}
              >
                <p
                  className="f-text f-styles-preset-2s58fc"
                  data-styles-preset="svYtzYwMA"
                  style={
                    {
                      "--f-text-color":
                        "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
                    } as React.CSSProperties
                  }
                >
                </p>
              </div>
            </div>
            <div className="ssr-variant">
              <div className="f-1c0x965-container">
                <div
                  className="f-ZPULr f-1xcu7rj f-v-1xcu7rj"
                  data-f-name="Variant 1"
                  style={{ height: "100%", width: "100%", opacity: 1 }}
                >
                  <div
                    className="f-2rakpf"
                    data-f-name="V"
                    style={{
                      backgroundColor: "rgb(255, 255, 255)",
                      opacity: 1,
                    }}
                  />
                  <div
                    className="f-48ytin"
                    data-f-name="H"
                    style={{
                      backgroundColor: "rgb(255, 255, 255)",
                      transform: "rotate(90deg)",
                      opacity: 1,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="f-93takc" data-f-name="Bottom" />

          {/* Event success chart — left of portrait */}
          <div
            style={{
              position: "absolute",
              top: 190,
              left: 40,
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              padding: 0,
              width: 320,
            }}
          >
            {/* Header row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: "rgba(255, 255, 255, 0.5)",
                  textTransform: "uppercase",
                }}
              >
                Revenue
              </span>
              <span
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 11,
                  fontWeight: 500,
                  color: "rgba(255, 255, 255, 0.3)",
                }}
              >
                Last 30 days
              </span>
            </div>

            {/* Total + growth */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  color: "rgb(255, 255, 255)",
                }}
              >
                $48.2k
              </span>
              <span
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 12,
                  fontWeight: 600,
                  color: "rgb(52, 211, 153)",
                }}
              >
                +127%
              </span>
            </div>

            {/* Area chart SVG */}
            <svg viewBox="0 0 456 106" style={{ width: "100%", height: 100, overflow: "visible" }}>
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              {[25, 50, 75].map((y) => (
                <line
                  key={y}
                  x1={0}
                  y1={y}
                  x2={450}
                  y2={y}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth={1}
                />
              ))}
              {/* Area fill */}
              <path
                d="M0,85 L37,80 L75,75 L112,68 L150,58 L187,52 L225,42 L262,35 L300,28 L337,30 L375,20 L412,12 L450,6 L450,100 L0,100 Z"
                fill="url(#chartGrad)"
              />
              {/* Line */}
              <path
                d="M0,85 L37,80 L75,75 L112,68 L150,58 L187,52 L225,42 L262,35 L300,28 L337,30 L375,20 L412,12 L450,6"
                fill="none"
                stroke="rgb(255, 255, 255)"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* End dot */}
              <circle cx={450} cy={6} r={3} fill="rgb(255, 255, 255)" />
            </svg>

            {/* Event breakdown */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {[
                { name: "Event 1", tickets: "1,200", pct: "100%" },
                { name: "Event 2", tickets: "1,850", pct: "100%" },
                { name: "Event 3", tickets: "2,400", pct: "100%" },
              ].map((e) => (
                <div
                  key={e.name}
                  style={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <span
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: 9,
                      fontWeight: 500,
                      color: "rgba(255, 255, 255, 0.35)",
                      textTransform: "uppercase",
                    }}
                  >
                    {e.name}
                  </span>
                  <span
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: 14,
                      fontWeight: 600,
                      letterSpacing: "-0.03em",
                      color: "rgb(255, 255, 255)",
                    }}
                  >
                    {e.tickets}
                  </span>
                  <span
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: 10,
                      fontWeight: 500,
                      color: "rgb(52, 211, 153)",
                    }}
                  >
                    {e.pct} sold
                  </span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.08)", marginTop: 6 }} />

            {/* Sell-through rate */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: 11,
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.4)",
                  }}
                >
                  Sell-through rate
                </span>
                <span
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: 13,
                    fontWeight: 600,
                    color: "rgb(255, 255, 255)",
                  }}
                >
                  100%
                </span>
              </div>
              <div style={{ height: 4, borderRadius: 2, backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
                <div style={{ height: "100%", width: "100%", borderRadius: 2, backgroundColor: "rgb(52, 211, 153)" }} />
              </div>
            </div>

            {/* Key metrics row */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              {[
                { label: "Avg. ticket price", value: "$8.80" },
                { label: "Check-ins", value: "5,210" },
                { label: "Repeat buyers", value: "38%" },
              ].map((m) => (
                <div
                  key={m.label}
                  style={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <span
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: 9,
                      fontWeight: 500,
                      color: "rgba(255, 255, 255, 0.3)",
                      textTransform: "uppercase",
                    }}
                  >
                    {m.label}
                  </span>
                  <span
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: 16,
                      fontWeight: 600,
                      letterSpacing: "-0.03em",
                      color: "rgb(255, 255, 255)",
                    }}
                  >
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Portrait image */}
          <div className="ssr-variant hidden-f3lv8x">
            <div
              className="f-6ptzzp"
              data-f-name="Portrait"
              style={{ opacity: 1, transform: "none", width: 380, aspectRatio: "0.707 / 1", right: 0 }}
            >
              <div
                style={{
                  position: "absolute",
                  borderRadius: "inherit",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                }}
                data-f-background-image-wrapper="true"
              >
                <img
                  decoding="auto"
                  width={419}
                  height={938}
                  src="/assets/images/case-study-portrait.png"
                  alt=""
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    borderRadius: "inherit",
                    objectPosition: "center",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Background — solid black */}
          <div className="f-tkpp4e" data-f-name="BG">
            <div
              style={{
                position: "absolute",
                borderRadius: "inherit",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: "rgb(0, 0, 0)",
              }}
            />
          </div>
        </div>

        {/* Performance metrics + Score/Chart column */}
        <div className="f-q0il7y" data-f-name="2">
          {/* Performance metrics card (light bg) */}
          <div
            className="f-1ob8ifv"
            data-f-name="1"
            data-stats-animate="card"
            style={{ opacity: 1, transform: "none" }}
          >
            <div className="f-lcst9n" data-f-name="Top">
              <div className="f-1be9egi" data-f-name="1">
                <div
                  className="f-19zavte"
                  data-f-component-type="RichTextContainer"
                  style={{ transform: "none" }}
                >
                  <p
                    className="f-text f-styles-preset-txwsq6"
                    data-styles-preset="fDRzSjw63"
                    style={
                      {
                        "--f-text-color":
                          "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                      } as React.CSSProperties
                    }
                  >
                    Live Analytics:{" "}
                  </p>
                </div>
                <div
                  className="f-1c818rs"
                  data-f-component-type="RichTextContainer"
                  style={{ transform: "none" }}
                >
                  <p
                    className="f-text f-styles-preset-xgn84q"
                    data-styles-preset="LyKOtaXoC"
                  >
                    Track ticket sales, revenue, and engagement in real time.
                  </p>
                </div>
              </div>
              <div className="f-1iqpkiq" data-f-name="2">
                <div
                  className="f-1gflp2z"
                  data-f-component-type="RichTextContainer"
                  style={{ transform: "none" }}
                >
                  <p
                    className="f-text f-styles-preset-txwsq6"
                    data-styles-preset="fDRzSjw63"
                    style={
                      {
                        "--f-text-color":
                          "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                      } as React.CSSProperties
                    }
                  >
                    Audience Growth:
                  </p>
                </div>
                <div
                  className="f-j7qkzc"
                  data-f-component-type="RichTextContainer"
                  style={{ transform: "none" }}
                >
                  <p
                    className="f-text f-styles-preset-xgn84q"
                    data-styles-preset="LyKOtaXoC"
                  >
                    +37% repeat attendees
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial with star rating */}
            <div className="f-33ldiv" data-f-name="Bottom">
              <div className="f-uwkvjg" data-f-name="Star Rating">
                <div className="ssr-variant">
                  <div className="f-yb2z9t-container">
                    <div
                      className="f-oFNEt f-1ku8kgp f-v-1ku8kgp"
                      data-f-name="Variant 1"
                      style={{ height: "100%", width: "100%", opacity: 1 }}
                    >
                      <div
                        data-f-component-type="SVG"
                        data-f-name="Star Rating"
                        className="f-1pptfs4"
                        aria-hidden="true"
                        style={{
                          imageRendering: "pixelated",
                          flexShrink: 0,
                          backgroundSize: "100% 100%",
                          backgroundImage:
                            'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 xmlns:xlink=%22http://www.w3.org/1999/xlink%22 viewBox=%220 0 56 12%22%3E%3Cpath d=%22M 5.087 2.049 C 5.439 1.259 6.561 1.259 6.913 2.049 L 7.423 3.192 C 7.568 3.518 7.876 3.742 8.231 3.779 L 9.475 3.91 C 10.336 4.001 10.683 5.068 10.04 5.648 L 9.11 6.485 C 8.845 6.724 8.728 7.086 8.802 7.436 L 9.061 8.66 C 9.241 9.506 8.333 10.166 7.583 9.733 L 6.5 9.108 C 6.19 8.93 5.81 8.93 5.5 9.108 L 4.417 9.733 C 3.667 10.166 2.759 9.506 2.939 8.66 L 3.198 7.436 C 3.272 7.086 3.155 6.724 2.89 6.485 L 1.96 5.648 C 1.317 5.068 1.664 4.001 2.525 3.91 L 3.769 3.779 C 4.124 3.742 4.432 3.518 4.577 3.192 Z%22 fill=%22rgb(251,152,38)%22%3E%3C/path%3E%3Cpath d=%22M 16.087 2.049 C 16.439 1.259 17.561 1.259 17.913 2.049 L 18.423 3.192 C 18.568 3.518 18.876 3.742 19.231 3.779 L 20.475 3.91 C 21.336 4.001 21.683 5.068 21.04 5.648 L 20.11 6.485 C 19.845 6.724 19.728 7.086 19.802 7.436 L 20.061 8.66 C 20.241 9.506 19.333 10.166 18.583 9.733 L 17.5 9.108 C 17.19 8.93 16.81 8.93 16.5 9.108 L 15.417 9.733 C 14.667 10.166 13.759 9.506 13.939 8.66 L 14.198 7.436 C 14.272 7.086 14.155 6.724 13.89 6.485 L 12.96 5.648 C 12.317 5.068 12.664 4.001 13.525 3.91 L 14.769 3.779 C 15.124 3.742 15.432 3.518 15.577 3.192 Z%22 fill=%22rgb(251,152,38)%22%3E%3C/path%3E%3Cpath d=%22M 27.087 2.049 C 27.439 1.259 28.561 1.259 28.913 2.049 L 29.423 3.192 C 29.568 3.518 29.876 3.742 30.231 3.779 L 31.475 3.91 C 32.336 4.001 32.683 5.068 32.04 5.648 L 31.11 6.485 C 30.845 6.724 30.728 7.086 30.802 7.436 L 31.061 8.66 C 31.241 9.506 30.333 10.166 29.583 9.733 L 28.5 9.108 C 28.19 8.93 27.81 8.93 27.5 9.108 L 26.417 9.733 C 25.667 10.166 24.759 9.506 24.939 8.66 L 25.198 7.436 C 25.272 7.086 25.155 6.724 24.89 6.485 L 23.96 5.648 C 23.317 5.068 23.664 4.001 24.525 3.91 L 25.769 3.779 C 26.124 3.742 26.432 3.518 26.577 3.192 Z%22 fill=%22rgb(251,152,38)%22%3E%3C/path%3E%3Cpath d=%22M 38.087 2.049 C 38.439 1.259 39.561 1.259 39.913 2.049 L 40.423 3.192 C 40.568 3.518 40.876 3.742 41.231 3.779 L 42.475 3.91 C 43.336 4.001 43.683 5.068 43.04 5.648 L 42.11 6.485 C 41.845 6.724 41.728 7.086 41.802 7.436 L 42.061 8.66 C 42.241 9.506 41.333 10.166 40.583 9.733 L 39.5 9.108 C 39.19 8.93 38.81 8.93 38.5 9.108 L 37.417 9.733 C 36.667 10.166 35.759 9.506 35.939 8.66 L 36.198 7.436 C 36.272 7.086 36.155 6.724 35.89 6.485 L 34.96 5.648 C 34.317 5.068 34.664 4.001 35.525 3.91 L 36.769 3.779 C 37.124 3.742 37.432 3.518 37.577 3.192 Z%22 fill=%22rgb(251,152,38)%22%3E%3C/path%3E%3Cpath d=%22M 49.087 2.049 C 49.439 1.259 50.561 1.259 50.913 2.049 L 51.423 3.192 C 51.568 3.518 51.876 3.742 52.231 3.779 L 53.475 3.91 C 54.336 4.001 54.683 5.068 54.04 5.648 L 53.11 6.485 C 52.845 6.724 52.728 7.086 52.802 7.436 L 53.061 8.66 C 53.241 9.506 52.333 10.166 51.583 9.733 L 50.5 9.108 C 50.19 8.93 49.81 8.93 49.5 9.108 L 48.417 9.733 C 47.667 10.166 46.759 9.506 46.939 8.66 L 47.198 7.436 C 47.272 7.086 47.155 6.724 46.89 6.485 L 45.96 5.648 C 45.317 5.068 45.664 4.001 46.525 3.91 L 47.769 3.779 C 48.124 3.742 48.432 3.518 48.577 3.192 Z%22 fill=%22rgb(251,152,38)%22%3E%3C/path%3E%3C/svg%3E")',
                          opacity: 1,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="f-x5lie"
                  data-f-component-type="RichTextContainer"
                  style={{ transform: "none" }}
                >
                  <p
                    className="f-text f-styles-preset-txwsq6"
                    data-styles-preset="fDRzSjw63"
                    style={
                      {
                        "--f-text-color":
                          "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                      } as React.CSSProperties
                    }
                  >
                    {
                      "\u201CVipass gave us the real-time data we needed to sell out three events in a row.\u201D"
                    }
                  </p>
                </div>
              </div>

              {/* Reviewer */}
              <div className="f-o74yuc" data-f-name="Container">
                <div className="ssr-variant hidden-f3lv8x">
                  <div className="f-p033hv" data-f-name="Ellipse 24">
                    <div
                      style={{
                        position: "absolute",
                        borderRadius: "inherit",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                      }}
                      data-f-background-image-wrapper="true"
                    >
                      <img
                        decoding="async"
                        loading="lazy"
                        width={48}
                        height={48}
                        src="/assets/images/priya-menon.png"
                        alt=""
                        style={{
                          display: "block",
                          width: "100%",
                          height: "100%",
                          borderRadius: "inherit",
                          objectPosition: "center",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="f-r20a3m"
                  data-f-component-type="RichTextContainer"
                  style={{ transform: "none" }}
                >
                  <p
                    style={{
                      fontFamily: '"Inter", "Inter Placeholder", sans-serif',
                      fontSize: "12px",
                      fontWeight: 500,
                      letterSpacing: "-0.04em",
                      lineHeight: "130%",
                      textAlign: "left" as const,
                      color: "rgb(9, 9, 9)",
                    }}
                    className="f-text"
                  >
                    Erik Holstad
                  </p>
                </div>
              </div>
            </div>

            {/* Circles SVG */}
            <div
              data-f-component-type="SVG"
              data-f-name="Circles"
              className="f-11mwazn"
              aria-hidden="true"
              style={{
                imageRendering: "pixelated",
                flexShrink: 0,
                fill: "black",
                color: "black",
              }}
            >
              <div
                className="svgContainer"
                style={{
                  width: "100%",
                  height: "100%",
                  aspectRatio: "inherit",
                }}
              >
                <svg
                  style={{ width: "100%", height: "100%" }}
                  viewBox="0 0 352 337"
                  preserveAspectRatio="none"
                  width="100%"
                  height="100%"
                >
                  <use href="#svg1985748787_1513" />
                </svg>
              </div>
            </div>
          </div>

          {/* Score + Chart column */}
          <div className="f-1fczhuh" data-f-name="2">
            <div
              className="f-1quoedf"
              data-f-name="1"
              data-stats-animate="card"
              style={{ opacity: 1, transform: "none" }}
            >
              {/* Pagespeed score */}
              <div className="f-lwzawp" data-border="true" data-f-name="Score">
                {/* Donut chart SVG — 98% fill */}
                <svg
                  viewBox="0 0 123 123"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    transform: "rotate(-90deg)",
                    pointerEvents: "none",
                    zIndex: 1,
                  }}
                >
                  <circle
                    cx="61.5"
                    cy="61.5"
                    r="53.5"
                    fill="none"
                    stroke="rgb(10, 10, 10)"
                    strokeWidth="14"
                    strokeDasharray={`${0.95 * 2 * Math.PI * 53.5} ${2 * Math.PI * 53.5}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div
                  className="f-tnf03y"
                  data-f-component-type="RichTextContainer"
                  style={{ transform: "none" }}
                >
                  <p
                    style={{
                      fontFamily: '"Inter", "Inter Placeholder", sans-serif',
                      fontSize: "22px",
                      fontWeight: 600,
                      letterSpacing: "-0.04em",
                      textAlign: "center" as const,
                      color: "rgb(9, 9, 9)",
                    }}
                    className="f-text"
                  >
                    98%
                  </p>
                </div>
              </div>

              <div className="f-1txh2k1" data-f-name="Container">
                <div
                  className="f-ri6i99"
                  data-f-name="Score title"
                  data-f-component-type="RichTextContainer"
                  style={{ transform: "none" }}
                >
                  <p
                    style={{
                      fontFamily: '"Inter", "Inter Placeholder", sans-serif',
                      fontWeight: 500,
                      letterSpacing: "-0.04em",
                      lineHeight: "140%",
                      textAlign: "center" as const,
                      color: "rgb(9, 9, 9)",
                    }}
                    className="f-text"
                  >
                    Satisfaction score
                  </p>
                </div>
                <div
                  className="f-1x14x67"
                  data-f-name="Score description"
                  data-f-component-type="RichTextContainer"
                  style={{ transform: "none" }}
                >
                  <p
                    className="f-text f-styles-preset-txwsq6"
                    data-styles-preset="fDRzSjw63"
                    style={
                      {
                        "--f-text-alignment": "center",
                        "--f-text-color":
                          "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                      } as React.CSSProperties
                    }
                  >
                    Attendees rate their experience across check-in, venue, and
                    overall event quality.
                  </p>
                </div>
              </div>
            </div>

            {/* Bar chart */}
            <div
              className="f-ugwdk1"
              data-f-name="2"
              data-stats-animate="card"
              style={{ opacity: 1, transform: "none" }}
            >
              {/* Quarterly visits header */}
              <div className="f-ez5qvn" data-f-name="Numbers">
                <div className="f-ktwiph">
                  <div className="f-15shvg9-container">
                    <div className="ssr-variant hidden-f3lv8x hidden-tsn51j">
                      <div
                        style={{
                          display: "flex",
                          gap: "0px",
                          alignItems: "center",
                          fontSize: "38px",
                          fontFamily:
                            '"Inter", "Inter Placeholder", sans-serif',
                          fontWeight: 600,
                          color:
                            "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                          letterSpacing: "-0.07em",
                        }}
                      >
                        <span>{countValue}</span>
                        <span
                          style={{
                            color:
                              "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                          }}
                        >
                          K
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="f-wzxm55" data-f-name="Growth">
                    <div className="ssr-variant hidden-f3lv8x">
                      <div
                        className="f-1cxrwub"
                        data-f-name="Testimonial"
                        data-f-component-type="RichTextContainer"
                        style={{ transform: "none" }}
                      >
                        <p
                          style={{
                            fontFamily:
                              '"Inter", "Inter Placeholder", sans-serif',
                            fontSize: "10px",
                            fontWeight: 600,
                            letterSpacing: "-0.04em",
                            lineHeight: "140%",
                            color: "rgb(9, 9, 9)",
                          }}
                          className="f-text"
                        >
                          +30%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="f-1l1s9q3"
                  data-f-component-type="RichTextContainer"
                  style={{ transform: "none" }}
                >
                  <p
                    className="f-text f-styles-preset-2s58fc"
                    data-styles-preset="svYtzYwMA"
                  >
                    Tickets sold
                  </p>
                </div>
              </div>

              {/* Graph bars */}
              <div className="f-oooxhu" data-f-name="Graph">
                {/* Bar: Oct +0.8k */}
                <div className="ssr-variant">
                  <div className="f-96diir-container" data-stats-animate="bar">
                    <BarColumn
                      value="+0.8k"
                      month="Oct"
                      padding="12px"
                      bgColor="rgb(245, 245, 245)"
                      textColor="var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))"
                    />
                  </div>
                </div>

                {/* Bar: Nov +1.2k */}
                <div className="ssr-variant">
                  <div className="f-kymsxw-container" data-stats-animate="bar">
                    <BarColumn
                      value="+1.2k"
                      month="Nov"
                      padding="12px 12px 18px 12px"
                      bgColor="rgb(245, 245, 245)"
                      textColor="var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))"
                    />
                  </div>
                </div>

                {/* Bar: Dec +1.4k */}
                <div className="ssr-variant">
                  <div className="f-yio7w0-container" data-stats-animate="bar">
                    <BarColumn
                      value="+1.4k"
                      month="Dec"
                      padding="12px 12px 15px 12px"
                      bgColor="rgb(245, 245, 245)"
                      textColor="var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))"
                    />
                  </div>
                </div>

                {/* Bar: Jan +2.1k */}
                <div className="ssr-variant">
                  <div className="f-1r9aqvp-container" data-stats-animate="bar">
                    <BarColumn
                      value="+2.1k"
                      month="Jan"
                      padding="12px 12px 17px 12px"
                      bgColor="rgb(245, 245, 245)"
                      textColor="var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))"
                    />
                  </div>
                </div>

                {/* Bar: Feb +2.8k */}
                <div className="ssr-variant">
                  <div className="f-gdetl6-container" data-stats-animate="bar">
                    <BarColumn
                      value="+2.8k"
                      month="Feb"
                      padding="12px 12px 19px 12px"
                      bgColor="rgb(245, 245, 245)"
                      textColor="var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))"
                    />
                  </div>
                </div>

                {/* Bar: Mar +3.7k (dark/highlighted) */}
                <div className="ssr-variant">
                  <div className="f-1urc8g4-container" data-stats-animate="bar">
                    <BarColumn
                      value="+3.7k"
                      month="Mar"
                      padding="12px 12px 19px 12px"
                      bgColor="var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))"
                      textColor="var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))"
                      monthTextColor="var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Reusable bar column for the chart — internal to this file */
function BarColumn({
  value,
  month,
  padding,
  bgColor,
  textColor,
  monthTextColor,
}: {
  value: string;
  month: string;
  padding: string;
  bgColor: string;
  textColor: string;
  monthTextColor?: string;
}) {
  return (
    <div
      className="f-Ov1cH f-ofTFr f-ffqcbv f-v-ffqcbv"
      data-f-name="Desktop"
      style={{ height: "100%", width: "100%", opacity: 1 }}
    >
      <div
        className="f-1b4g2os"
        data-f-name="Container"
        style={
          {
            "--q1of9l": padding,
            backgroundColor: bgColor,
            borderRadius: "8px",
            opacity: 1,
          } as React.CSSProperties
        }
      >
        <div
          className="f-qublri"
          data-f-name="Budget"
          data-f-component-type="RichTextContainer"
          style={
            {
              "--extracted-r6o4lv": `var(--variable-reference-K5SPn14EC-KEzuQXrOe)`,
              "--f-paragraph-spacing": "0px",
              "--variable-reference-K5SPn14EC-KEzuQXrOe": textColor,
              transform: "rotate(-90deg)",
              opacity: 1,
            } as React.CSSProperties
          }
        >
          <p
            className="f-text"
            style={
              {
                "--font-selector": "SW50ZXItU2VtaUJvbGQ=",
                "--f-font-family": '"Inter", "Inter Placeholder", sans-serif',
                "--f-font-size": "13px",
                "--f-font-weight": "600",
                "--f-letter-spacing": "-0.04em",
                "--f-line-height": "130%",
                "--f-text-alignment": "left",
                "--f-text-color":
                  "var(--extracted-r6o4lv, var(--variable-reference-K5SPn14EC-KEzuQXrOe))",
              } as React.CSSProperties
            }
          >
            {value}
          </p>
        </div>
      </div>
      <div
        className="f-1sl7csi"
        data-f-name="Budget"
        data-f-component-type="RichTextContainer"
        style={
          {
            "--extracted-r6o4lv":
              monthTextColor ??
              "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
            "--f-paragraph-spacing": "0px",
            opacity: 0.6,
            transform: "none",
          } as React.CSSProperties
        }
      >
        <p
          className="f-text f-styles-preset-2s58fc"
          data-styles-preset="svYtzYwMA"
          style={
            {
              "--f-text-alignment": "center",
              "--f-text-color":
                "var(--extracted-r6o4lv, var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10)))",
            } as React.CSSProperties
          }
        >
          {month}
        </p>
      </div>
    </div>
  );
}
