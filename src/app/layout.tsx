import type { Metadata } from "next";
import { Jost, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const corGaramond = Cormorant_Garamond({
  variable: "--font-display",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "optional",
});

const jost = Jost({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "optional",
});

export const metadata: Metadata = {
  title: "Lucero Ortega Atelier",
  description: "Una página web tipo E-Commerce Boutique con catálogo por categorías.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      translate="no"
      className={`${corGaramond.variable} ${jost.variable} h-full antialiased notranslate`}
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <meta name="google" content="notranslate" />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
