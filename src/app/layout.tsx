import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { HeaderNavbar } from "@/components/layout/HeaderNavbar";
import { BottomBar } from "@/components/layout/BottomBar";
import { Footer } from "@/components/layout/Footer";
import { ThemeBridge } from "@/components/layout/ThemeBridge";
import { GoogleStructuredData } from "@/components/seo/GoogleStructuredData";

const jakarta = localFont({
  src: "./fonts/plus-jakarta-sans-latin.woff2",
  variable: "--font-jakarta",
  display: "swap",
  weight: "400 800",
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

const jetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono-latin.woff2",
  variable: "--font-mono",
  display: "swap",
  weight: "400 700",
  fallback: ["ui-monospace", "SFMono-Regular", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vylo-nine.vercel.app"),
  title: {
    default: "VYLO — Jeux de Soirée & en Famille (Local & En Ligne)",
    template: "%s | VYLO",
  },
  description:
    "Jouez ensemble à Undercover, Loup-Garou, Blind Test, Faux Artiste, Action ou Vérité et Tu Préfères sur un seul téléphone ou chacun son écran.",
  keywords: [
    "Jeux de soirée",
    "Jeux en famille",
    "Undercover en ligne",
    "Loup Garou en ligne",
    "Blind test gratuit",
    "Faux artiste",
    "Action ou Vérité",
    "Tu préfères",
    "Jeux de société smartphone",
  ],
  authors: [{ name: "Johanson", url: "https://johansonweb.vercel.app/" }],
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
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
  openGraph: {
    title: "VYLO — Jeux de Soirée & en Famille",
    description:
      "Lancez une partie conviviale en 10 secondes sur un téléphone ou chacun sur son écran.",
    url: "https://vylo-nine.vercel.app",
    siteName: "VYLO",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VYLO — Jeux de Soirée & en Famille",
    description:
      "Undercover, Loup-Garou, Blind Test et jeux rapides sur smartphone.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "VYLO",
  },
};

export const viewport: Viewport = {
  themeColor: "#F5F6FA",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} ${jetbrainsMono.variable} min-h-dvh antialiased`}
    >
      <head>
        <GoogleStructuredData />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-dvh flex flex-col relative overflow-x-hidden overflow-y-auto"
      >
        <ThemeBridge />
        <HeaderNavbar />
        <div className="flex-1 flex flex-col min-w-0">{children}</div>
        <Footer />
        <BottomBar />
      </body>
    </html>
  );
}
