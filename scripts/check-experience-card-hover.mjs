import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const source = readFileSync(resolve("components/ui/ExperienceCard.tsx"), "utf8");

const expectations = [
  {
    label: "ExperienceCard is a client component",
    pattern: /^"use client";/,
  },
  {
    label: "ExperienceCard imports motion from f-motion",
    pattern: /import\s+\{\s*motion\s*\}\s+from\s+"f-motion";/,
  },
  {
    label: "ExperienceCard tracks hover state",
    pattern: /const\s+\[isHovered,\s*setIsHovered\]\s*=\s*useState\(false\);/,
  },
  {
    label: "ExperienceCard toggles Framer's hover variant class",
    pattern: /\$\{isHovered\s+\?\s+" hover"\s+:\s+""\}/,
  },
  {
    label: "ExperienceCard responds to hover start",
    pattern: /onHoverStart=\{\(\)\s*=>\s*setIsHovered\(true\)\}/,
  },
  {
    label: "ExperienceCard responds to hover end",
    pattern: /onHoverEnd=\{\(\)\s*=>\s*setIsHovered\(false\)\}/,
  },
  {
    label: "ExperienceCard animates the image inset like the static Framer hover variant",
    pattern: /animate=\{\{\s*inset:\s*isHovered\s+\?\s*0\s*:\s*4\s*\}\}/,
  },
  {
    label: "ExperienceCard uses the static Framer hover transition timing",
    pattern: /duration:\s*0\.45,/,
  },
  {
    label: "ExperienceCard scales the logo on hover like the static Framer variant",
    pattern: /animate=\{\{\s*scale:\s*isHovered\s+\?\s*0\.8\s*:\s*1\s*\}\}/,
  },
  {
    label: "ExperienceCard increases the blackout overlay opacity on hover",
    pattern: /animate=\{\{\s*opacity:\s*isHovered\s+\?\s*0\.2\s*:\s*0\.15\s*\}\}/,
  },
  {
    label: "ExperienceCard blurs the preview image on hover",
    pattern: /filter:\s*isHovered\s+\?\s*"blur\(7px\)"\s*:\s*"none"/,
  },
  {
    label: "ExperienceCard keeps WebKit blur in sync on hover",
    pattern: /WebkitFilter:\s*isHovered\s+\?\s*"blur\(7px\)"\s*:\s*"none"/,
  },
  {
    label: "ExperienceCard scales the preview image on hover",
    pattern: /scale:\s*isHovered\s+\?\s*1\.13\s*:\s*1/,
  },
];

const failures = expectations.filter(({ pattern }) => !pattern.test(source));

if (failures.length > 0) {
  console.error("ExperienceCard hover regression check failed:");
  for (const failure of failures) {
    console.error(`- ${failure.label}`);
  }
  process.exit(1);
}

console.log("ExperienceCard hover regression check passed.");
