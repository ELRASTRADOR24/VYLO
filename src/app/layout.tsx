import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { HeaderNavbar } from "@/components/layout/HeaderNavbar";
import { BetaBanner } from "@/components/ui/BetaBanner";
import { Footer } from "@/components/layout/Footer";
import { GoogleStructuredData } from "@/components/seo/GoogleStructuredData";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vylo-nine.vercel.app"),
  title: {
    default: "VYLO — N°1 des Jeux de Soirée, Société & Famille (Undercover, Loup-Garou, Blind Test)",
    template: "%s | VYLO — Jeux de Soirée & Société",
  },
  description: "VYLO est la plateforme n°1 de jeux de soirée, jeux de société et jeux de famille gratuits. Jouez à Undercover, Loup-Garou, Blind Test, Action ou Vérité, Tu Préfères et Saboteur en ligne et en local sur smartphone !",
  keywords: [
    "Jeux de soirée", 
    "Undercover en ligne", 
    "Loup Garou en ligne", 
    "Blind test gratuit", 
    "Action ou Vérité en ligne", 
    "Tu préfères en ligne", 
    "Jeux de société smartphone", 
    "Jeux de famille gratuits", 
    "Jeux entre amis", 
    "Multijoueur local", 
    "Jeux d'ambiance mobile", 
    "Kahoot alternatif", 
    "Gartic phone alternative", 
    "Jeux de cartes gratuits", 
    "Soirée jeux smartphone",
    "Devine le drapeau"
  ],
  authors: [{ name: "Johanson", url: "https://johansonweb.vercel.app/" }],
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
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
    title: "VYLO — N°1 des Jeux de Soirée, Société & Famille",
    description: "Jouez gratuitement à Undercover, Loup-Garou, Blind Test, Action ou Vérité et Tu Préfères en ligne et entre amis sur smartphone !",
    url: "https://vylo-nine.vercel.app",
    siteName: "VYLO",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VYLO — N°1 des Jeux de Soirée & Société",
    description: "L'application ultime pour jouer à Undercover, Loup-Garou et Blind Test sur mobile !",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "VYLO",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0D19",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${outfit.variable} min-h-screen antialiased`}>
      <head>
        <GoogleStructuredData />
      </head>
      <body className="min-h-screen flex flex-col relative overflow-x-hidden overflow-y-auto">
        <BetaBanner />
        <HeaderNavbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
