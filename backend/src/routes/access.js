import express from "express";
import Schedule from "../models/Schedule.js";

const router = express.Router();

router.get("/check-access", async (req, res) => {
  const now = new Date();
  const day = now.toLocaleString("en-US", { weekday: "long" });
  const time = now.toTimeString().slice(0, 5);

  const schedules = await Schedule.find();
  for (const sched of schedules) {
    const [start, end] = sched.schedule[day];
    if (time >= start && time <= end) {
      return res.json({ access: "allowed" });
    }
  }
  res.status(403).json({ access: "denied" });
});

export default router;
