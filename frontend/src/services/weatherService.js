import api from "./api";

// ─── Weather API calls (all through our backend) ────────────────────────────

export const getCurrentWeather = async (city) => {
  const res = await api.get(`/api/weather/${encodeURIComponent(city)}`);
  const raw = res.data.data;

  return {
    ...raw,
    sunrise: new Date(raw.sunrise),
    sunset: new Date(raw.sunset),
    dt: new Date(raw.dt),
  };
};

export const getForecast = async (city) => {
  const res = await api.get(`/api/weather/forecast/${encodeURIComponent(city)}`);

  return res.data.data.map((day) => ({
    ...day,
    date: new Date(day.date),
  }));
};

// ─── Theme Mapping ──────────────────────────────

export const getWeatherTheme = (weatherMain) => {
  const themeMap = {
    Clear: "solar",
    Clouds: "neutral",
    Rain: "rain",
    Drizzle: "rain",
    Thunderstorm: "storm",
    Snow: "snow",
    Mist: "neutral",
    Smoke: "neutral",
    Haze: "neutral",
    Dust: "neutral",
    Fog: "neutral",
    Sand: "neutral",
    Ash: "neutral",
    Squall: "storm",
    Tornado: "storm",
  };
  return themeMap[weatherMain] || "neutral";
};

// ─── Weather Icons ──────────────────────────────

export const getWeatherIconUrl = (iconCode) =>
  `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

export const getWeatherIcon = (weatherMain) => {
  const iconMap = {
    Clear: "https://openweathermap.org/img/wn/01d@2x.png",
    Clouds: "https://openweathermap.org/img/wn/03d@2x.png",
    Rain: "https://openweathermap.org/img/wn/10d@2x.png",
    Drizzle: "https://openweathermap.org/img/wn/09d@2x.png",
    Thunderstorm: "https://openweathermap.org/img/wn/11d@2x.png",
    Snow: "https://openweathermap.org/img/wn/13d@2x.png",
    Mist: "https://openweathermap.org/img/wn/50d@2x.png",
    Smoke: "https://openweathermap.org/img/wn/50d@2x.png",
    Haze: "https://openweathermap.org/img/wn/50d@2x.png",
    Fog: "https://openweathermap.org/img/wn/50d@2x.png",
    Dust: "https://openweathermap.org/img/wn/50d@2x.png",
    Tornado: "https://openweathermap.org/img/wn/11d@2x.png",
  };
  return iconMap[weatherMain] || "https://openweathermap.org/img/wn/01d@2x.png";
};

export const fetchWeather = getCurrentWeather;