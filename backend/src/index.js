import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import userRouter from "./routes/users.route.js";
import authRouter from "./routes/auth.route.js";

import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.listen(3000, () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Database");
  } catch (error) {
    console.log("Error while connecting to DB ", error);
  }
  console.log("Server is running on localhost 3000");
});
