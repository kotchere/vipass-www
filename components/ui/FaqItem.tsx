"use client";

import { useState } from "react";

interface FaqItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export default function FaqItem({ question, answer, defaultOpen = false }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      style={{
        marginBottom: 4,
        border: "0px solid rgb(255, 255, 255)",
        borderRadius: 14,
        backgroundColor: "rgb(255, 255, 255)",
        overflow: "hidden",
        willChange: "auto",
      }}
    >
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          padding: 26,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              color: "rgb(10, 10, 10)",
              fontFamily: '"Inter", "Inter Placeholder", sans-serif',
              fontSize: 18,
              fontWeight: 500,
              lineHeight: "1.3em",
              letterSpacing: "-0.04em",
              fontStyle: "normal",
              textAlign: "left",
              margin: 0,
              padding: 0,
            }}
          >
            {question}
          </span>
        </div>
        <img
          src="/assets/images/j6H7CUu4CDaOQoux5xCbVztY18.svg"
          alt="icon"
          style={{
            width: 18,
            height: 18,
            marginLeft: 16,
            willChange: "transform",
            transform: isOpen ? "rotate(360deg)" : "none",
            transition: "transform 0.3s ease",
          }}
          width={18}
          height={18}
        />
      </div>
      <div
        style={{
          overflow: "hidden",
          height: isOpen ? "auto" : 0,
          transition: "height 0.3s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "start",
            paddingTop: 0,
            paddingRight: 26,
            paddingBottom: 26,
            paddingLeft: 26,
            boxSizing: "border-box",
          }}
        >
          <p
            style={{
              color: "rgba(10, 10, 10, 0.6)",
              fontFamily: '"Inter", "Inter Placeholder", sans-serif',
              fontSize: 15,
              fontWeight: 500,
              lineHeight: "1.4em",
              letterSpacing: "-0.04em",
              fontStyle: "normal",
              textAlign: "left",
              margin: 0,
              padding: 0,
              boxSizing: "border-box",
            }}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
