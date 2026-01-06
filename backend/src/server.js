import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import chatRouter from "./routes/chat.route.js";
import { connectDb } from "./config/db.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRouter);
app.use("/api/chat", chatRouter);

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
  await connectDb();   // ✅ ONLY HERE
});
