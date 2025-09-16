import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../lib/cloudinary.js";

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const userDb = await User.findOne({ email });

    if (!userDb) {
      return res.status(404).json({ message: "Invalid Credentials!" });
    }

    const comparePassword = await bcrypt.compare(password, userDb.password);

    if (!comparePassword) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const token = jwt.sign(
      { userId: userDb._id, userRole: userDb.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("jwtToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Logged in successfully!", user: userDb });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const registerController = async (req, res) => {
  const { name, email, password, profilePic } = req.body;

  try {
    if (!name || !email || !password || !profilePic) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profilePic: uploadResponse.secure_url,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, userRole: newUser.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("jwtToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res
      .status(201)
      .json({ message: "User successfully created!", user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logoutController = (req, res) => {
  try {
    res.clearCookie("jwtToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    return res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export function checkAuth(req, res) {
  try {
    return res.status(200).json(req.user);
  } catch (err) {
    console.log("ERROR in checkAuth");
    return res.status(500).json({ message: "erorr in checkAuth" });
  }
}
