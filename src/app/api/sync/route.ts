import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Pack from "@/models/Pack";
import Content from "@/models/Content";

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get("gameId");
    const lastSyncStr = searchParams.get("lastSync");
    const lastSync = lastSyncStr ? new Date(lastSyncStr) : new Date(0);

    // Si on veut synchroniser un jeu spécifique ou tous les jeux
    const query = gameId ? { gameId, updatedAt: { $gt: lastSync } } : { updatedAt: { $gt: lastSync } };

    // 1. Récupérer les nouveaux packs modifiés depuis le dernier sync
    const packs = await Pack.find(query).lean();
    const packIds = packs.map(p => p._id);

    // 2. Récupérer le contenu associé (mots, questions, défis...)
    let contents = [];
    if (packIds.length > 0) {
       contents = await Content.find({ packId: { $in: packIds }, updatedAt: { $gt: lastSync } }).lean();
    } else {
       // S'il n'y a pas de pack précis mais juste des majs de contenu "libre"
       contents = await Content.find(query).lean();
    }

    return NextResponse.json({
      success: true,
      data: {
        packs,
        contents,
        syncDate: new Date().toISOString(),
      }
    });

  } catch (error) {
    console.error("Sync Error:", error);
    return NextResponse.json({ success: false, error: "Erreur lors de la synchronisation" }, { status: 500 });
  }
}

// L'endpoint POST servira à envoyer l'historique de jeu local (anti-répétition) vers le cloud
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Logique pour insérer l'historique dans PlayHistory...
    // const { history } = body;
    // await PlayHistory.insertMany(history);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
