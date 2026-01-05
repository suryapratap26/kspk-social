import dotenv from "dotenv"
dotenv.config();

import express from "express"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js"
import { connectDb } from "./config/db.js";
import userRouter from "./routes/user.route.js"
import chatRouter from "./routes/chat.route.js"

import cors from "cors"
const app= express();
const port=process.env.PORT;


app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow frontend to send cookies
  })
);

app.use("/api/auth",authRoutes);
app.use("/api/users", userRouter)
app.use("/api/chat", chatRouter)

app.listen(port,async()=>{
    console.log(`server started on port ${port}`);
    await connectDb();
});

