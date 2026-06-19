import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ID Solutions — TTPS Case Analysis",
  description:
    "Analyze evidence against T&T offence elements, assess case strength, and generate King's Counsel cross-examination reports.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
