import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { HeaderNavbar } from "@/components/layout/HeaderNavbar";
import { BetaBanner } from "@/components/ui/BetaBanner";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VYLO - Jeux de Soirée (Version Bêta)",
  description: "La plateforme premium de jeux de soirée en version Bêta.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "VYLO",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
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
      </body>
    </html>
  );
}
