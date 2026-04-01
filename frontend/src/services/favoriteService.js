import api from "./api";

export const getFavorites = async () => {
  const res = await api.get("/favorites");
  return res.data; // [{ _id, userId, city, createdAt }]
};

export const addFavorite = async (city) => {
  const res = await api.post("/favorites", { city });
  return res.data;
};

export const removeFavorite = async (city) => {
  const res = await api.delete(`/favorites/${encodeURIComponent(city)}`);
  return res.data;
};
