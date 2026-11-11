import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VYLO — Jeux de Soirée & en Famille",
    short_name: "VYLO",
    description:
      "Jouez ensemble à Undercover, Loup-Garou, Blind Test et plus encore sur un téléphone ou chacun son écran.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F6FA",
    theme_color: "#F5F6FA",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
