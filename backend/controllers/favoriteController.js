import Favorite from "../models/Favorite.js";

// ➕ Add favorite
export const addFavorite = async (req, res) => {
  try {
    const { city } = req.body;

    const exists = await Favorite.findOne({
      userId: req.user._id,
      city
    });

    if (exists) {
      return res.status(400).json({ message: "City already in favorites" });
    }

    const favorite = await Favorite.create({
      userId: req.user._id,
      city
    });

    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📄 Get favorites
export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({
      userId: req.user._id
    });

    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ❌ Remove favorite
export const removeFavorite = async (req, res) => {
  try {
    const { city } = req.params;

    await Favorite.findOneAndDelete({
      userId: req.user._id,
      city
    });

    res.json({ message: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};