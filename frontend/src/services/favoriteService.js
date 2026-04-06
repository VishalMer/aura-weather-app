import api from "./api";

export const getFavorites = async () => {
  const res = await api.get("/api/favorites");
  return res.data;
};

export const addFavorite = async (city) => {
  const res = await api.post("/api/favorites", { city });
  return res.data;
};

export const removeFavorite = async (city) => {
  const res = await api.delete(`/api/favorites/${encodeURIComponent(city)}`);
  return res.data;
};