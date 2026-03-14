import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Analysis Deck Builder",
  description:
    "Generate professional analysis and investment memo PDF decks. Free, open-source, no signup required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
