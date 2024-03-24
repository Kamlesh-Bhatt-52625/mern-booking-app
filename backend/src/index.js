import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/test", async (req, res) => {
  res.json({ message: "hello from express endpoint" });
});

app.listen(3000, () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Database");
  } catch (error) {
    console.log("Error while connecting to DB ", error);
  }
  console.log("Server is running on localhost 3000");
});
