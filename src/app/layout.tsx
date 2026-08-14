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
  title: "The Delusion Calculator | The Numbers Don't Lie",
  description:
    "Calculate what percentage of the US population matches your partner preferences. Powered by real US Census Bureau and CDC demographic data. How delusional are your standards?",
  keywords: [
    "delusion calculator",
    "dating standards",
    "female delusion calculator",
    "cat lady meter",
    "fresh and fit",
    "dating statistics",
    "US Census",
  ],
  openGraph: {
    title: "The Delusion Calculator",
    description: "The Numbers Don't Lie. How delusional are your standards?",
    type: "website",
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
