"use client";

import { useEffect } from "react";

export function ClientRedirect() {
  useEffect(() => {
    const search = typeof window !== "undefined" ? window.location.search : "";
    const t = setTimeout(() => {
      window.location.href = `vipass://payment-complete${search}`;
    }, 250);
    return () => clearTimeout(t);
  }, []);
  return null;
}
