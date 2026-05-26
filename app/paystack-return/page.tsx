import type { Metadata } from "next";

import { ClientRedirect } from "./client-redirect";

export const metadata: Metadata = {
  title: "Returning to Vipass",
  description: "Completing your Paystack payment for your Vipass tickets.",
  robots: { index: false, follow: false },
};

export default function PaystackReturnPage() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 24,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0, color: "#fff" }}>
        Returning to Vipass…
      </h1>
      <p style={{ color: "#666", maxWidth: 360 }}>
        Paystack is confirming your payment. This window should close
        automatically.
      </p>
      <ClientRedirect />
      <a
        href="vipass://payment-complete"
        style={{
          marginTop: 12,
          padding: "12px 20px",
          background: "#111",
          color: "#fff",
          borderRadius: 999,
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        Open Vipass
      </a>
    </main>
  );
}
