import api from "./api";

export const loginUser = async (email, password) => {
  const res = await api.post("/api/auth/login", { email, password });
  return res.data;
};

export const registerUser = async (name, email, password) => {
  const res = await api.post("/api/auth/register", { name, email, password });
  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/api/auth/me");
  return res.data;
};