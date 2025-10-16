import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import Head from "next/head";
const Footer = dynamic(() => import("../components/Footer"));
const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pacifico",
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.placearena.com'),
  title: {
    default: "PlaceArena - Find Your Perfect Rental Home in Khulna",
    template: "%s | PlaceArena"
  },
  description: "Discover premium rental properties in Khulna, Bangladesh. Find apartments, family homes, bachelor pads, and commercial spaces. Verified owners, affordable rent, trusted platform.",
  keywords: ["rental properties Khulna", "house rent Khulna", "apartment Khulna", "bachelor room Khulna", "family flat Khulna", "property rent Bangladesh", "PlaceArena"],
  authors: [{ name: "PlaceArena" }],
  creator: "PlaceArena",
  publisher: "PlaceArena",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.placearena.com",
    title: "PlaceArena - Find Your Perfect Rental Home in Khulna",
    description: "Discover premium rental properties in Khulna, Bangladesh. Find apartments, family homes, bachelor pads, and commercial spaces.",
    siteName: "PlaceArena",
    images: [
      {
        url: "/banner.jpg",
        width: 1200,
        height: 630,
        alt: "PlaceArena - Rental Properties in Khulna"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "PlaceArena - Find Your Perfect Rental Home in Khulna",
    description: "Discover premium rental properties in Khulna, Bangladesh.",
    images: ["/banner.jpg"],
    creator: "@placearena"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} ${roboto.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
