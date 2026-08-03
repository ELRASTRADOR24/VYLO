import type { Metadata } from "next";
import JoinClient from "./JoinClient";

export const metadata: Metadata = {
  title: "Rejoindre un Salon",
  description: "Entrez un code de salon à 6 chiffres pour rejoindre la partie en ligne de vos amis sur VYLO.",
  alternates: {
    canonical: "/join",
  },
};

export default function JoinPage() {
  return <JoinClient />;
}
