import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../lib/cloudinary.js";

export async function doctorLogin(req, res) {}

export async function doctorRegister(req, res) {
  const {
    name,
    email,
    password,
    profilePic,
    specialization,
    experience,
    fee,
    startTime,
    endTime,
  } = req.body;

  try {
    if (
      !name ||
      !email ||
      !password ||
      !profilePic ||
      !specialization ||
      !experience ||
      !fee ||
      !startTime ||
      !endTime
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const doctor = await User.findOne({ email });

    if (doctor) {
      return res.status(400).json({ message: "Doctor already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const newDoctor = new User({
      name,
      email,
      password: hashedPassword,
      profilePic: uploadResponse.secure_url,
      role: "doctor",
      doctorProfile: {
        specialization,
        experience,
        fee,
        startTime,
        endTime,
      },
    });

    await newDoctor.save();

    const token = jwt.sign(
      { userId: newDoctor._id, userRole: newDoctor.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("jwtToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return res
      .status(200)
      .json({ message: "Successfully registered, wait for admin approval" });
  } catch (error) {}
}
