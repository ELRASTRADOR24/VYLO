import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGameConfig, getGameList } from "@/games";
import SetupClient from "./SetupClient";

export function generateStaticParams() {
  return getGameList().map((game) => ({
    gameId: game.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ gameId: string }>;
}): Promise<Metadata> {
  const { gameId } = await params;
  const game = getGameConfig(gameId);
  if (!game) {
    return { title: "Jeu introuvable" };
  }
  return {
    title: `${game.name} — Choisir un mode`,
    description: game.description,
  };
}

export default async function GameSetupPage({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = await params;
  const game = getGameConfig(gameId);
  if (!game) {
    notFound();
  }
  return <SetupClient gameId={gameId} />;
}
