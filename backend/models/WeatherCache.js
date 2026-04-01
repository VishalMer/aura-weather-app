import mongoose from "mongoose";

const weatherCacheSchema = mongoose.Schema({
  city: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  data: {
    type: Object,
    required: true,
  },
  normalizedData: {
    type: Object,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const WeatherCache = mongoose.model("WeatherCache", weatherCacheSchema);

export default WeatherCache;