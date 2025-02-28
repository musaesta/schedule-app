import express from "express";
import Schedule from "../models/Schedule.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  let schedule = await Schedule.findOne({ userEmail: req.user.email });

  if (!schedule) {
    schedule = new Schedule({
      userEmail: req.user.email,
      schedule: {
        Monday: ["00:00", "24:00"],
        Tuesday: ["00:00", "24:00"],
        Wednesday: ["00:00", "24:00"],
        Thursday: ["00:00", "24:00"],
        Friday: ["00:00", "24:00"],
        Saturday: ["00:00", "24:00"],
        Sunday: ["00:00", "24:00"],
      },
    });
    await schedule.save();
  }
  res.json(schedule);
});

router.put("/", authMiddleware, async (req, res) => {
  const { schedule } = req.body;
  await Schedule.findOneAndUpdate(
    { userEmail: req.user.email },
    { schedule },
    { new: true, upsert: true }
  );
  res.json({ message: "Schedule updated" });
});

export default router;
