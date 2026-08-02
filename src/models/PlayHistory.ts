import mongoose from "mongoose";

const PlayHistorySchema = new mongoose.Schema(
  {
    contentId: { type: mongoose.Schema.Types.ObjectId, ref: "Content", required: true },
    gameId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optionnel (mode invité = null)
    groupId: { type: String }, // Pour traquer l'anti-répétition d'un groupe d'amis jouant sur un même tel
    playedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Index pour l'anti-répétition : récupérer vite l'historique récent d'un groupe pour un jeu
PlayHistorySchema.index({ groupId: 1, gameId: 1, playedAt: -1 });

export default mongoose.models.PlayHistory || mongoose.model("PlayHistory", PlayHistorySchema);
