import express from "express";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const { email, firstName, lastName, password } = req.body;

  try {
    let user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    user = new User({ email, firstName, lastName, password: hashedPassword });
    await user.save();

    const { password: pass, ...rest } = user._doc;
    res.status(201).json({ message: rest });
  } catch (error) {
    console.log("Error in the register route ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
