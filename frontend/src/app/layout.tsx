import type { Metadata } from "next";
import {
  Fraunces,
  Domine,
  IBM_Plex_Mono,
  Inter,
} from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const domine = Domine({
  variable: "--font-domine",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Costa Rica Transfers | Professional Airport & Destination Transfers",
  description:
    "Book reliable transfers across Costa Rica. Airport pickups, inter-destination shuttles, and custom routes. Professional service with expert local drivers.",
  keywords: [
    "Costa Rica transfers",
    "SJO airport transfer",
    "La Fortuna shuttle",
    "Costa Rica transportation",
    "Liberia airport transfer",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${domine.variable} ${ibmPlexMono.variable} ${inter.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface antialiased min-h-screen pb-20 md:pb-0 flex flex-col font-data-value text-[16px] leading-[1.5]">
        {children}
      </body>
    </html>
  );
}