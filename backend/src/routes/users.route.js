import express from "express";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

//   /api/users/register
router.post(
  "/register",
  [
    check("firstName", "First name is required").isString(),
    check("lastName", "Last name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

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

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "2d",
      });

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 172800000,
      });

      const { password: pass, ...rest } = user._doc;
      res.status(201).json({ message: rest });
    } catch (error) {
      console.log("Error in the register route ", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
