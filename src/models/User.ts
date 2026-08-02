import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    pseudo: { type: String, required: true },
    avatar: { type: String },
    isGuest: { type: Boolean, default: true },
    language: { type: String, default: "fr" },
    preferences: {
      favoriteCategories: [{ type: String }],
    },
    stats: {
      gamesPlayed: { type: Number, default: 0 },
      wins: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
