"use client";

import { useState, useEffect } from "react";

export default function PreLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="framer-iakDo framer-1xyp36d framer-v-1xyp36d"
      data-framer-name="1"
      data-highlight="true"
      style={{ height: "100%", width: "100%", opacity: 1 }}
    >
      <div
        className="framer-18jnpzj"
        data-framer-appear-id="18jnpzj"
        data-framer-name="Logo"
        style={{
          willChange: "transform",
          opacity: 1,
          transform: "translate(-50%, -50%)",
        }}
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
          data-framer-background-image-wrapper="true"
        >
          <img
            decoding="auto"
            width={564}
            height={564}
            src="/assets/images/sGlXXevC6VpCdliPiKXmmrZQEi0_0c62333e.png"
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
      <div
        className="framer-1g084ze"
        data-framer-name="BG"
        style={{
          backgroundColor: "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
          opacity: 1,
        }}
      />
    </div>
  );
}
