import axios from "axios";
import WeatherCache from "../models/WeatherCache.js";
import SearchHistory from "../models/SearchHistory.js";

// 🔄 Normalize raw OpenWeather current weather → frontend-expected shape
const normalizeWeatherData = (data) => ({
  city: data.name,
  country: data.sys.country,
  temperature: Math.round(data.main.temp),
  feelsLike: Math.round(data.main.feels_like),
  tempMin: Math.round(data.main.temp_min),
  tempMax: Math.round(data.main.temp_max),
  humidity: data.main.humidity,
  pressure: data.main.pressure,
  windSpeed: data.wind.speed,
  windDeg: data.wind.deg,
  visibility: data.visibility ? Math.round(data.visibility / 1000) : null,
  clouds: data.clouds.all,
  sunrise: new Date(data.sys.sunrise * 1000).toISOString(),
  sunset: new Date(data.sys.sunset * 1000).toISOString(),
  dt: new Date(data.dt * 1000).toISOString(),
  weather: {
    main: data.weather[0].main,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
  },
});

// 🔄 Normalize forecast list → grouped daily summaries (one per day, midday reading)
const normalizeForecastData = (list) => {
  const days = {};

  list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toISOString().split("T")[0]; // YYYY-MM-DD

    // Pick the entry closest to midday (12:00)
    const hour = date.getUTCHours();
    if (!days[dayKey] || Math.abs(hour - 12) < Math.abs(new Date(days[dayKey].dt * 1000).getUTCHours() - 12)) {
      days[dayKey] = item;
    }
  });

  return Object.values(days)
    .slice(0, 5)
    .map((item) => ({
      date: new Date(item.dt * 1000).toISOString(),
      temp: Math.round(item.main.temp),
      tempMin: Math.round(item.main.temp_min),
      tempMax: Math.round(item.main.temp_max),
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
      weather: {
        main: item.weather[0].main,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      },
    }));
};

// @desc  Get current weather for a city
// @route GET /api/weather/:city
// @access Public (optional auth — saves history only if logged in)
export const getWeather = async (req, res) => {
  try {
    const { city } = req.params;

    // 🔍 Check cache first
    const cached = await WeatherCache.findOne({ city: city.toLowerCase() });
    if (cached) {
      const isFresh = Date.now() - new Date(cached.lastUpdated).getTime() < 10 * 60 * 1000;
      if (isFresh) {
        return res.json({ source: "cache", data: cached.normalizedData || cached.data });
      }
    }

    // 🌐 Fetch from OpenWeather
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${process.env.OPENWEATHER_KEY}&units=metric`
    );

    const normalized = normalizeWeatherData(response.data);

    // 💾 Save search history ONLY when user is logged in (optional auth)
    if (req.user) {
      await SearchHistory.create({
        userId: req.user._id,
        city: normalized.city,
        temperature: normalized.temperature,
        condition: normalized.weather.main,
      });

      // Enforce max 50 history entries per user
      const historyCount = await SearchHistory.countDocuments({ userId: req.user._id });
      if (historyCount > 50) {
        const oldest = await SearchHistory.find({ userId: req.user._id })
          .sort({ searchedAt: 1 })
          .limit(historyCount - 50);
        const oldestIds = oldest.map((h) => h._id);
        await SearchHistory.deleteMany({ _id: { $in: oldestIds } });
      }
    }

    // 💾 Save/update cache
    await WeatherCache.findOneAndUpdate(
      { city: city.toLowerCase() },
      { normalizedData: normalized, data: response.data, lastUpdated: Date.now() },
      { upsert: true }
    );

    res.json({ source: "api", data: normalized });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ message: "City not found. Please check the city name." });
    }
    res.status(500).json({ message: "Failed to fetch weather data.", error: error.message });
  }
};

// @desc  Get 5-day / 3-hour forecast for a city
// @route GET /api/weather/forecast/:city
// @access Public (optional auth)
export const getForecast = async (req, res) => {
  try {
    const { city } = req.params;

    // 🌐 Fetch from OpenWeather forecast endpoint
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${process.env.OPENWEATHER_KEY}&units=metric`
    );

    const normalizedForecast = normalizeForecastData(response.data.list);

    res.json({ source: "api", data: normalizedForecast });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ message: "City not found. Please check the city name." });
    }
    res.status(500).json({ message: "Failed to fetch forecast data.", error: error.message });
  }
};