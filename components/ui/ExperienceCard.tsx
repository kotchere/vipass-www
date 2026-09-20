"use client";

import { useEffect, useState } from "react";
import { motion } from "f-motion";
import Image from "next/image";
import Link from "next/link";
import EventDate from "@/components/ui/EventDate";

const HOVER_TRANSITION = {
  delay: 0,
  duration: 0.45,
  ease: [0.82, 0.11, 0.37, 0.82] as [number, number, number, number],
  type: "tween" as const,
};

interface ExperienceCardProps {
  id: string;
  title: string;
  description: string | null;
  coverImageUrl: string;
  startsAt: string | null;
  endsAt: string | null;
}

type CardChip = "Get tickets" | "Ended";

function chipFor(startsAt: string | null, endsAt: string | null): CardChip {
  const endedAt = endsAt ?? startsAt;
  const ms = endedAt ? Date.parse(endedAt) : Number.NaN;
  return Number.isFinite(ms) && ms < Date.now() ? "Ended" : "Get tickets";
}

export default function ExperienceCard({
  id,
  title,
  description,
  coverImageUrl,
  startsAt,
  endsAt,
}: ExperienceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  // Computed after mount (like EventDate) so server and client HTML match.
  const [chip, setChip] = useState<CardChip | null>(null);

  useEffect(() => {
    setChip(chipFor(startsAt, endsAt));
  }, [startsAt, endsAt]);

  return (
    <div className="ssr-variant hidden-f3lv8x">
      <Link
        href={`/events/${id}`}
        className="f-g46orm-container vp-experience-link"
        aria-label={title}
      >
        <motion.div
          className={`f-tEL27 f-1of3use f-v-1of3use f-1pxbyww${isHovered ? " hover" : ""}`}
          data-f-name="Desktop"
          onHoverEnd={() => setIsHovered(false)}
          onHoverStart={() => setIsHovered(true)}
          style={{
            width: "100%",
            willChange: "transform",
            borderRadius: 18,
            opacity: 1,
            transform: "none",
            cursor: "pointer",
          }}
        >
          <div
            className="f-1nwqy7f"
            data-f-name="Background"
            style={{
              backgroundColor:
                "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
              borderRadius: 18,
              opacity: 1,
            }}
          >
            {chip && (
              <span
                className={`vp-chip vp-experience-chip${chip === "Ended" ? "" : " vp-chip--success"}`}
              >
                {chip}
              </span>
            )}

            {/* Text overlay — centered like the original logo */}
            <motion.div
              style={{
                zIndex: 2,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                padding: "24px",
                textAlign: "center",
                pointerEvents: "none",
                maxWidth: "85%",
              }}
            >
              {/* Title — always visible, animates up on hover */}
              <motion.h3
                animate={{ y: isHovered ? -8 : 0 }}
                initial={false}
                transition={HOVER_TRANSITION}
                style={{
                  color: "#fff",
                  fontSize: "30px",
                  fontWeight: 600,
                  lineHeight: 1.3,
                  margin: 0,
                  textShadow: "0 1px 4px rgba(0,0,0,0.6)",
                }}
              >
                {title}
              </motion.h3>

              {/* Date + Description — revealed on hover */}
              <motion.div
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 8,
                }}
                initial={false}
                transition={HOVER_TRANSITION}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  overflow: "hidden",
                }}
              >
                {startsAt && (
                  <p
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: 600,
                      margin: 0,
                      textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                    }}
                  >
                    <EventDate iso={startsAt} />
                  </p>
                )}
                {description && (
                  <p
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: 1.4,
                      margin: "0 50px",
                      textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical" as const,
                      overflow: "hidden",
                    }}
                  >
                    {description}
                  </p>
                )}
              </motion.div>
            </motion.div>

            {/* Image container — same hover animation as before */}
            <motion.div
              className="f-ybsvxe"
              data-f-name="Image container"
              animate={{ inset: isHovered ? 0 : 4 }}
              initial={false}
              transition={HOVER_TRANSITION}
              style={{ borderRadius: 16, opacity: 1 }}
            >
              <motion.div
                className="f-16bbbzt"
                data-f-name="blackout"
                animate={{ opacity: isHovered ? 0.35 : 0.2 }}
                initial={false}
                transition={HOVER_TRANSITION}
                style={{
                  backgroundColor: "rgb(10, 10, 10)",
                  opacity: 0.2,
                }}
              />
              <motion.div
                className="f-jh1lcx"
                data-f-name="Image"
                animate={
                  {
                    filter: isHovered ? "blur(7px)" : "none",
                    scale: isHovered ? 1.13 : 1,
                    WebkitFilter: isHovered ? "blur(7px)" : "none",
                  } as Record<string, string | number>
                }
                initial={false}
                transition={HOVER_TRANSITION}
                style={{ filter: "none", opacity: 1, WebkitFilter: "none" }}
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
                  <Image
                    decoding="auto"
                    fill
                    unoptimized
                    src={coverImageUrl}
                    alt={title}
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
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
}
