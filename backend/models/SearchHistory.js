import mongoose from "mongoose";

const searchHistorySchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  city: { type: String, required: true },
  temperature: Number,
  condition: String,
  searchedAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index for fast per-user lookups sorted by date
searchHistorySchema.index({ userId: 1, searchedAt: -1 });

const SearchHistory = mongoose.model("SearchHistory", searchHistorySchema);

export default SearchHistory;