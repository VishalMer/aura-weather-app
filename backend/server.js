import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://aura-weather-app-gamma.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());

// Rate Limiting — 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again in 15 minutes." },
});
app.use("/api/", limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/favorites", favoriteRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Aura Weather API is running 🚀" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
