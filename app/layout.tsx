import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { site } from "@/lib/content/site";
import { getFeaturedEdition, getUpcomingEditions, getPastEditions } from "@/lib/queries";
import { stageMeta } from "@/lib/stage";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader, SiteHeaderFallback, type HeaderEdition } from "@/components/layout/site-header";

// The current site's global fonts (Elementor kit): Outfit for headings, Inter for text.
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: AI, Digital Economy & Sustainability`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.fullName,
    locale: "en_NG",
    images: [{ url: "/images/gallery/022-38.jpg", width: 2000, height: 1334, alt: "Delegates at InnTech Summit 2025 in Abuja" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/images/brand/favicon.png", apple: "/images/brand/favicon.png" },
};

export const viewport: Viewport = {
  themeColor: "#070e33",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const featured = getFeaturedEdition();
  const headerEditions: HeaderEdition[] = [...getUpcomingEditions(), ...getPastEditions()].map((e) => ({
    slug: e.slug,
    name: e.name,
    meta: e.dateLabel,
    status: stageMeta[e.stage].label,
  }));
  const registerLabel = featured.stage === "announced" ? "Join the waitlist" : "Register";

  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} antialiased`}>
      <body className="min-h-dvh">
        <Suspense fallback={<SiteHeaderFallback editions={headerEditions} registerLabel={registerLabel} />}>
          <SiteHeader editions={headerEditions} registerLabel={registerLabel} />
        </Suspense>
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
