import mongoose from "mongoose";

const PackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    gameId: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isOfficial: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    version: { type: Number, default: 1 }, // Pour la synchronisation locale
  },
  { timestamps: true }
);

export default mongoose.models.Pack || mongoose.model("Pack", PackSchema);
