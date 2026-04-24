"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PreLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="framer-143iyx0-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            pointerEvents: "all",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="framer-iakDo framer-1xyp36d framer-v-1xyp36d"
              data-framer-name="1"
              style={{ height: "100%", width: "100%", opacity: 1 }}
            >
              <motion.div
                className="framer-18jnpzj"
                data-framer-name="Logo"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                style={{
                  willChange: "transform",
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
              </motion.div>
              <div
                className="framer-1g084ze"
                data-framer-name="BG"
                style={{
                  backgroundColor:
                    "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                  opacity: 1,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
