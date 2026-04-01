import express from "express";
import { getWeather, getForecast } from "../controllers/weatherController.js";
import optionalAuth from "../middleware/optionalAuth.js";

const router = express.Router();

// Current weather — guests allowed, history tracked only when logged in
router.get("/:city", optionalAuth, getWeather);

// 5-day forecast — guests allowed
router.get("/forecast/:city", optionalAuth, getForecast);

export default router;