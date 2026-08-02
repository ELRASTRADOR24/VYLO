import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Pack from "@/models/Pack";
import Content from "@/models/Content";
import mongoose from "mongoose";

export async function GET() {
  try {
    await dbConnect();

    // 1. Check if seed already exists
    const existingPack = await Pack.findOne({ gameId: "undercover", isOfficial: true });
    if (existingPack) {
      return NextResponse.json({ success: true, message: "Base de données déjà initialisée." });
    }

    // 2. Create the Official Pack
    const pack = await Pack.create({
      name: "Undercover Officiel - Pack de Base",
      description: "Le pack officiel pour commencer à jouer à Undercover.",
      gameId: "undercover",
      isOfficial: true,
      version: 1,
    });

    // 3. Add Words (Mots)
    const words = [
      { civilian: "Pomme", undercover: "Poire", category: "Nourriture" },
      { civilian: "Cinéma", undercover: "Théâtre", category: "Loisirs" },
      { civilian: "Océan", undercover: "Mer", category: "Nature" },
      { civilian: "Chien", undercover: "Loup", category: "Animaux" },
      { civilian: "Guitare", undercover: "Piano", category: "Musique" },
      { civilian: "Hiver", undercover: "Automne", category: "Saisons" },
      { civilian: "Facebook", undercover: "Instagram", category: "Réseaux Sociaux" },
      { civilian: "Avion", undercover: "Hélicoptère", category: "Transports" },
      { civilian: "Lait", undercover: "Eau", category: "Boissons" },
      { civilian: "Chocolat", undercover: "Caramel", category: "Nourriture" },
    ];

    const contentToInsert = words.map((pair) => ({
      gameId: "undercover",
      type: "WORD",
      data: pair,
      translations: {
        fr: pair,
      },
      difficulty: 1,
      categories: [pair.category],
      packId: pack._id,
      status: "official",
    }));

    await Content.insertMany(contentToInsert);

    return NextResponse.json({
      success: true,
      message: "Seed complet ! Pack et 10 mots injectés dans MongoDB.",
      packId: pack._id,
    });
  } catch (error) {
    console.error("Seed Error:", error);
    return NextResponse.json({ success: false, error: "Erreur lors du seed" }, { status: 500 });
  }
}
