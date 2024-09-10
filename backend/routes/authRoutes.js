import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import { protect } from "../middlewares/auth.js";

const userRouter = express.Router();

//  REGISTER NEW ADMIN

userRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }
    const user = await User.create({
      username,
      password,
    });

    res
      .status(201)
      .json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

//  LOGIN

userRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Username or Password",
      });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Username or Password",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      message: "You logged In Successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Login",
    });
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res.status(404).json({ success: true, message: "User not Found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: "could not find user" });
  }
});

userRouter.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to get user details" });
  }
});
export default userRouter;
