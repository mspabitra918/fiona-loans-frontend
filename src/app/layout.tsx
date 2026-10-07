import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import {
  GoogleTagManager,
  GTMNoScript,
} from "@/components/analytics/GoogleAnalytics";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { FinancialServiceSchema } from "@/components/ui/JsonLd";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/constants";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Personal Loans | Direct Lender`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "personal loans",
    "direct lender",
    "debt consolidation loans",
    "online loans",
    "fast personal loans",
    "low interest loans",
    "Oakhill Loans",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  icons: {
    icon: "/logoos.svg",
    apple: "/logoos.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Personal Loans from a Direct Lender`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/logoos.svg",
        width: 512,
        height: 512,
        alt: `${SITE_NAME} Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Personal Loans`,
    description: SITE_DESCRIPTION,
    images: ["/logoos.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-29CN39N8X5"
          strategy="beforeInteractive"
        />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-29CN39N8X5');`}
        </Script>
        <link
          rel="preconnect"
          href="https://api.oakhillloans.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
      </head>
      <body className="min-h-screen flex flex-col">
        <FinancialServiceSchema />
        <GTMNoScript />
        <GoogleTagManager />
        <MetaPixel />
        <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
