import type { Metadata } from "next";
import ProfileClient from "./ProfileClient";

export const metadata: Metadata = {
  title: "Mon Profil & Statistiques",
  description: "Consultez votre profil d'ambiance, vos badges débloqués, votre temps de jeu et vos victoires sur VYLO.",
  alternates: {
    canonical: "/profile",
  },
};

export default function ProfilePage() {
  return <ProfileClient />;
}
