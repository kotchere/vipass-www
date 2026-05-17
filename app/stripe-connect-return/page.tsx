import type { Metadata } from "next";

import { ClientRedirect } from "./client-redirect";

export const metadata: Metadata = {
  title: "Returning to Vipass",
  description:
    "Completing Stripe onboarding for your Vipass organizer account.",
  robots: { index: false, follow: false },
};

export default function StripeConnectReturnPage() {
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
        Stripe is verifying your organizer account. This window should close
        automatically.
      </p>
      <ClientRedirect />
      <a
        href="vipass://stripe-connect-return"
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
