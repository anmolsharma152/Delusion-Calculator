import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Bebas_Neue, Anton } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
});

const SITE_URL = "https://female-delusion-calculator.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Female Delusion Calculator | Fresh & Fit Miami After Hours",
  description:
    "The Official Fresh & Fit Podcast Reality Calculator. Cross-referencing US Census Bureau and CDC microdata (~100M+ adult men) to reveal the exact mathematical probability of finding a partner matching your standards. The Numbers Don't Lie.",
  keywords: [
    "female delusion calculator",
    "delusion calculator",
    "fresh and fit",
    "fresh and fit podcast",
    "myron gaines",
    "walter weekes",
    "dating standards",
    "cat lady meter",
    "dating statistics",
    "US Census",
    "CDC NHANES",
  ],
  authors: [{ name: "Fresh & Fit Team" }],
  creator: "Fresh & Fit After Hours",
  publisher: "Fresh & Fit",
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Female Delusion Calculator | Fresh & Fit Miami After Hours",
    description: "How delusional are your standards in a man? Cross-referencing 100M+ US Census microdata. The Numbers Don't Lie.",
    url: SITE_URL,
    siteName: "Female Delusion Calculator",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/Assets/FreshnFit%20After%20Hours%20-%20Cover%20Art.jpg`,
        width: 800,
        height: 800,
        alt: "Fresh & Fit Female Delusion Calculator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Female Delusion Calculator | Fresh & Fit",
    description: "Calculate what percentage of US men match your partner standards. The Numbers Don't Lie.",
    images: [`${SITE_URL}/Assets/FreshnFit%20After%20Hours%20-%20Cover%20Art.jpg`],
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
};

// Schema.org JSON-LD for Search Engine Rich Snippets
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Female Delusion Calculator",
  url: SITE_URL,
  applicationCategory: "EntertainmentApplication",
  operatingSystem: "All",
  browserRequirements: "Requires JavaScript",
  description:
    "The Official Fresh & Fit Podcast Reality Calculator. Cross-references real US Census Bureau and CDC microdata to calculate dating standards probability.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "Fresh & Fit Podcast",
    url: "https://www.youtube.com/@FreshandFit",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${bebasNeue.variable} ${anton.variable} h-full antialiased dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0D0D0D] text-[#E0E0E0] font-[var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
