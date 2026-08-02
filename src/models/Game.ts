import mongoose from "mongoose";

const GameSchema = new mongoose.Schema(
  {
    gameId: { type: String, required: true, unique: true }, // ex: "undercover"
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    players: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    modes: [{ type: String }], // "local", "online"
    themeColor: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Game || mongoose.model("Game", GameSchema);
