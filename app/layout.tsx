import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Equation of a Circle Calculator - Standard Form, General Form & Graphing Tool",
  description: "Free equation of a circle calculator. Convert between standard form (x-h)²+(y-k)²=r², general form, and parametric equations. Find center, radius, and graph circles instantly with step-by-step solutions.",
  keywords: "equation of a circle, circle equation calculator, standard form circle, general form circle, center and radius, parametric equations circle, polar form circle, circle formula",
  authors: [{ name: "Circle Calculator Network" }],
  openGraph: {
    title: "Equation of a Circle Calculator - Free Online Tool",
    description: "Calculate circle equations in standard form, general form, and parametric form. Find center and radius from any equation format.",
    url: "https://equationofacircle.com",
    siteName: "Equation of a Circle Calculator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Equation of a Circle Calculator",
    description: "Convert between standard form, general form, and parametric circle equations instantly.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-14MTG1R4M2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-14MTG1R4M2');
          `}
        </Script>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
