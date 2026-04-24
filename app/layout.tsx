import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vipass - The best nights out start here",
  description:
    "Find events, get tickets, and stay in the loop without the hassle.",
  openGraph: {
    title: "Vipass - The best nights out start here",
    description:
      "Find events, get tickets, and stay in the loop without the hassle.",
    images: ["/assets/images/meG1yXz9jqwhzC1XCm7WP0Ae9Zc.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vipass - The best nights out start here",
    description:
      "Find events, get tickets, and stay in the loop without the hassle.",
    images: ["/assets/images/meG1yXz9jqwhzC1XCm7WP0Ae9Zc.jpg"],
  },
  icons: {
    icon: "/assets/images/ugucZZ77cBC9cEIJsUKZuSdo0.png",
    apple: "/assets/images/lK5HLMhktIkswR9YTsNjUQ8oEpk.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="lenis lenis-autoToggle">
      <body>
        {children}
      </body>
    </html>
  );
}
