import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { HeaderNavbar } from "@/components/layout/HeaderNavbar";
import { BetaBanner } from "@/components/ui/BetaBanner";
import { Footer } from "@/components/layout/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vylo-nine.vercel.app"),
  title: {
    default: "VYLO — L'Application Ultime de Jeux de Soirée",
    template: "%s | VYLO — Jeux de Soirée",
  },
  description: "VYLO est l'application ultime de jeux de soirée entre amis. Jouez à Undercover, Le Saboteur, Loup-Garou et Action ou Vérité en local sur un téléphone ou en ligne.",
  keywords: ["Jeux de soirée", "Undercover", "Le Saboteur", "Loup-Garou", "Action ou Vérité", "Jeux entre amis", "Multijoueur local"],
  authors: [{ name: "Johanson", url: "https://johansonweb.vercel.app/" }],
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "VYLO — L'Application Ultime de Jeux de Soirée",
    description: "Jouez à Undercover, Le Saboteur, Loup-Garou et Action ou Vérité en local ou à distance.",
    url: "https://vylo-nine.vercel.app",
    siteName: "VYLO",
    locale: "fr_FR",
    type: "website",
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
    <html lang="fr" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col relative">
        <BetaBanner />
        <HeaderNavbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
