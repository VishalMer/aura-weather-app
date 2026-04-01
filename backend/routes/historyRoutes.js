import express from "express";
import protect from "../middleware/authMiddleware.js";
import SearchHistory from "../models/SearchHistory.js";

const router = express.Router();

// Get user history (most recent 50)
router.get("/", protect, async (req, res) => {
  try {
    const history = await SearchHistory.find({ userId: req.user._id })
      .sort({ searchedAt: -1 })
      .limit(50);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clear all user history
router.delete("/", protect, async (req, res) => {
  try {
    await SearchHistory.deleteMany({ userId: req.user._id });
    res.json({ message: "History cleared successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;