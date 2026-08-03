import type { Metadata } from "next";
import LibraryClient from "./LibraryClient";

export const metadata: Metadata = {
  title: "Bibliothèque de Jeux",
  description: "Découvrez et lancez tous les jeux de soirée disponibles sur VYLO : Undercover, Le Saboteur, Loup-Garou et Action ou Vérité.",
  alternates: {
    canonical: "/library",
  },
};

export default function LibraryPage() {
  return <LibraryClient />;
}
