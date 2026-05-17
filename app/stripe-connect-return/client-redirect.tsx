"use client";

import { useEffect } from "react";

export function ClientRedirect() {
  useEffect(() => {
    const search = typeof window !== "undefined" ? window.location.search : "";
    const t = setTimeout(() => {
      window.location.href = `vipass://stripe-connect-return${search}`;
    }, 250);
    return () => clearTimeout(t);
  }, []);
  return null;
}
