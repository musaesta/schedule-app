import { api, setAuthToken } from "./api";

export const login = async (email, password) => {
  const res = await api.post("/login", { email, password });
  localStorage.setItem("token", res.data.token);
  setAuthToken(res.data.token);
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  setAuthToken(null);
};
