import express from "express";
import User from "../models/User.js";

const router = express.Router();

// TEST API → create user
router.get("/create-user", async (req, res) => {
  try {
    const user = await User.create({
      name: "Vishal",
      email: "vishal@test.com",
      password: "123456"
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;