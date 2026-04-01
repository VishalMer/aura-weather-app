import api from "./api";

export const loginUser = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data; // { _id, name, email, token }
};

export const registerUser = async (name, email, password) => {
  const res = await api.post("/auth/register", { name, email, password });
  return res.data; // { _id, name, email, token }
};

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
