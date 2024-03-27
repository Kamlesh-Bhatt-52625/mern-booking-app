import express from "express";
import User from "../models/user.model.js";
import { check, validationResult } from "express-validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Enter a required!").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentails!" });
      }

      const isMatch = bcryptjs.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentails!" });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "2d",
      });
      const { password: pass, ...rest } = user._doc;

      res
        .cookie("auth_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 172800000,
        })
        .status(200)
        .json({ userId: user._id });
    } catch (error) {
      console.log("Error in login ", error);
      res.status(500).json({ message: "Error Logging in" });
    }
  }
);

export default router;
