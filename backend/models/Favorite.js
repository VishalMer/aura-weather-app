import mongoose from "mongoose";

const favoriteSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate city per user
favoriteSchema.index({ userId: 1, city: 1 }, { unique: true });

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;