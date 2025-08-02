import type { Metadata } from "next";
import { Luckiest_Guy, Bangers } from "next/font/google";
import "./globals.css";

const luckiestGuy = Luckiest_Guy({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-luckiest-guy"
});

const bangers = Bangers({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers"
});

export const metadata: Metadata = {
  title: "TRONK - The Most Useless Memecoin Ever",
  description: "WE PROMISED NOTHING. AND DELIVERED EVEN LESS.",
  keywords: "TRONK, memecoin, useless, troll, crypto, nothing",
  authors: [{ name: "TRONK Team (probably)" }],
  openGraph: {
    title: "TRONK - The Most Useless Memecoin Ever",
    description: "WE PROMISED NOTHING. AND DELIVERED EVEN LESS.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TRONK - The Most Useless Memecoin Ever",
    description: "WE PROMISED NOTHING. AND DELIVERED EVEN LESS.",
  },
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${luckiestGuy.variable} ${bangers.variable} font-luckiest`}>
        {children}
      </body>
    </html>
  );
}
