import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import manifestoData from "@/content/manifesto.json";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const { candidate } = manifestoData;

export const metadata: Metadata = {
  metadataBase: new URL("https://soet-federation.vercel.app"),
  title: `${candidate.name} | SOET Federation`,
  description: `Student campaign website for ${candidate.name}, candidate for ${candidate.position}, ${candidate.school}, ${candidate.university}.`,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${candidate.name} | SOET Federation`,
    description: `Student campaign website for ${candidate.name}, candidate for ${candidate.position}, ${candidate.school}, ${candidate.university}.`,
    url: "/",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-cream text-near-black antialiased">
        {children}
        <AnalyticsTracker />
      </body>
    </html>
  );
}
