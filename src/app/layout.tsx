import type { Metadata } from "next";
import { Jost, Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
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

const materialSymbols = localFont({
  // Fix: La carga de iconos ahora es local, ya que cargarlas remotamente hace que la página solo muestre los nombres de los iconos
  src: "./fonts/MaterialSymbolsOutlined.woff2",
  variable: "--font-icons",
  display: "block",
});

export const metadata: Metadata = {
  title: "Lucero Ortega Atelier",
  description: "Una página web tipo E-Commerce Boutique con catálogo por categorías.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      translate="no"
      className={`${corGaramond.variable} ${jost.variable} ${materialSymbols.variable} h-full antialiased notranslate`}
    >
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
