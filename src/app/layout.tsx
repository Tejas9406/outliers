import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Outliers — Hackathon Team Portfolio & Engineering Showcase",
  description:
    "Official portfolio of Team Outliers — Smart India Hackathon (SIH) Champions. Building high-impact distributed systems, on-device AI, and creative 3D experiences.",
  keywords: [
    "Outliers Team Portfolio",
    "Smart India Hackathon Winners",
    "Distributed Systems",
    "Edge AI",
    "Three.js 3D Web",
    "Kala Setu",
    "CampusCart",
  ],
  authors: [{ name: "Outliers Collective" }],
  openGraph: {
    title: "Outliers — Hackathon Team Portfolio",
    description:
      "We Don’t Fit the Box. We Build Outside It. Explore our verified achievements, live projects, and interactive 3D universe.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#07090E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#030712] text-[#F8FAFC] font-sans">
        {children}
      </body>
    </html>
  );
}
