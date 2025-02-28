import axios from "axios";

const API_URL = "http://localhost:5000";

export const login = async (email, password) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  return res.data.token;
};

export const fetchSchedule = async (token) => {
  const res = await axios.get(`${API_URL}/schedule`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.schedule;
};

export const updateSchedule = async (token, schedule) => {
  const res = await axios.put(
    `${API_URL}/schedule`,
    { schedule },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const checkAccess = async () => {
  const res = await axios.get(`${API_URL}/access/check-access`);
  return res.data.access;
};
