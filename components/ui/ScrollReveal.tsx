"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
}

export default function ScrollReveal({
  children,
  delay = 0,
  y = 40,
  duration = 0.7,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Animate the first child element directly, not a wrapper
    const target = el.firstElementChild as HTMLElement;
    if (!target) return;

    target.style.opacity = "0";
    target.style.transform = `translateY(${y}px)`;
    target.style.transition = `opacity ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s, transform ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          target.style.opacity = "1";
          target.style.transform = "translateY(0)";
          observer.unobserve(target);
        }
      },
      { rootMargin: "-50px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [delay, y, duration]);

  return <div ref={ref} style={{ display: "contents" }}>{children}</div>;
}
