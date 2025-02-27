import { api } from "./api";

export const getSchedule = async () => {
  const res = await api.get("/schedule");
  return res.data;
};

export const updateSchedule = async (day, startTime, endTime) => {
  const res = await api.put("/schedule", { day, startTime, endTime });
  return res.data;
};
