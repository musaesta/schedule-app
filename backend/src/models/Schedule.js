import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, unique: true },
  schedule: {
    Monday: [String],
    Tuesday: [String],
    Wednesday: [String],
    Thursday: [String],
    Friday: [String],
    Saturday: [String],
    Sunday: [String],
  },
});

export default mongoose.model("Schedule", ScheduleSchema);
