"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const faqTransition = {
  bounce: 0.2,
  delay: 0,
  duration: 0.4,
  type: "spring" as const,
};

export default function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: FaqItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setMeasuredHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, answer]);

  return (
    <div
      style={{
        marginBottom: 4,
        border: "0px solid rgb(255, 255, 255)",
        borderRadius: 14,
        backgroundColor: "rgb(255, 255, 255)",
        overflow: "hidden",
      }}
    >
      <div
        onClick={onToggle}
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
              textAlign: "left" as const,
              margin: 0,
              padding: 0,
            }}
          >
            {question}
          </span>
        </div>
        <motion.img
          src="/assets/images/j6H7CUu4CDaOQoux5xCbVztY18.svg"
          alt="icon"
          animate={{ rotate: isOpen ? 360 : 0 }}
          initial={false}
          transition={faqTransition}
          style={{
            width: 18,
            height: 18,
            marginLeft: 16,
          }}
          width={18}
          height={18}
        />
      </div>
      <motion.div
        animate={{ height: isOpen ? measuredHeight : 0 }}
        initial={false}
        transition={faqTransition}
        style={{
          overflow: "hidden",
          willChange: "height",
        }}
      >
        <div ref={contentRef}>
          <div
            style={{
              display: "flex",
              alignItems: "start" as const,
              paddingTop: 0,
              paddingRight: 26,
              paddingBottom: 26,
              paddingLeft: 26,
              boxSizing: "border-box" as const,
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
                textAlign: "left" as const,
                margin: 0,
                padding: 0,
                boxSizing: "border-box" as const,
              }}
            >
              {answer}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
