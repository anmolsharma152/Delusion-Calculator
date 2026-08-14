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

export const metadata: Metadata = {
  metadataBase: new URL("https://female-delusion-calculator.vercel.app"),
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
  ],
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Female Delusion Calculator | Fresh & Fit Miami After Hours",
    description: "How delusional are your standards in a man? The Numbers Don't Lie.",
    url: "https://female-delusion-calculator.vercel.app/",
    siteName: "Female Delusion Calculator",
    images: [
      {
        url: "/Assets/FreshnFit After Hours - Cover Art.jpg",
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
    images: ["/Assets/FreshnFit After Hours - Cover Art.jpg"],
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
      <body className="min-h-full flex flex-col bg-[#0D0D0D] text-[#E0E0E0] font-[var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
