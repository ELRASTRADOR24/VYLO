import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    gameId: { type: String, required: true }, // "undercover", "truth-or-dare"
    type: { 
      type: String, 
      enum: ["WORD", "QUESTION", "CHALLENGE", "CARD"],
      required: true 
    },
    // Données polymorphes, ex pour WORD: { text: "Chat", category: "Animaux" }
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    translations: {
      type: Map,
      of: mongoose.Schema.Types.Mixed, // { en: { text: "Cat" }, es: { text: "Gato" } }
    },
    difficulty: { type: Number, min: 1, max: 5, default: 2 },
    categories: [{ type: String }], // ex: ["Animaux", "Maison"]
    packId: { type: mongoose.Schema.Types.ObjectId, ref: "Pack" }, // Appartenance à un pack
    status: { 
      type: String, 
      enum: ["official", "community", "verified"], 
      default: "official" 
    },
  },
  { timestamps: true }
);

// Index pour recherche rapide
ContentSchema.index({ gameId: 1, type: 1, categories: 1 });

export default mongoose.models.Content || mongoose.model("Content", ContentSchema);
