import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    user = new User(req.body);
    await user.save();
    res.status(200).json({ message: user });
  } catch (error) {
    console.log("Error in the register route ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
