import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import scheduleRoutes from "./routes/schedule.js";
import accessRoutes from "./routes/access.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/auth", authRoutes);
app.use("/schedule", scheduleRoutes);
app.use("/access", accessRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
