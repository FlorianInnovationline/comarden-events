import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Nos événements`,
    template: `%s — ${site.name}`
  },
  description: site.description,
  applicationName: site.name,
  keywords: ["Comarden", "événements", "toiture", "EPDM", "FLORATOIT", "ELEVATE", "architectes", "couvreurs", "Belgique"],
  authors: [{ name: "Comarden" }],
  openGraph: {
    type: "website",
    locale: "fr_BE",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Nos événements`,
    description: site.description,
    // TODO: replace with the real OG image at /public/og.png
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }]
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Nos événements`,
    description: site.description,
    images: ["/og.png"]
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#002D59",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen bg-neutral text-ink antialiased">
        <ScrollProgress />
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
