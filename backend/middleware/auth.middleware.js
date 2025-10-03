import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export async function protectRoute(req, res, next) {
  try {
    const token = req.cookies.jwtToken;

    if (!token) {
      return res.status(401).json({ message: "User not authorized!" });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!verifyToken) {
      return res.status(401).json({ message: "Token Invalid!" });
    }

    const user = await User.findById(verifyToken.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
  }
}

export async function protectAdminRoute(req, res, next) {
  try {
    const token = req.cookies.jwtToken;

    if (!token) {
      return res.status(401).json({ message: "User not authorized!" });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!verifyToken) {
      return res.status(401).json({ message: "Token Invalid!" });
    }

    const user = await User.findById(verifyToken.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.role !== "admin") {
      console.log("User not authorized! | Not Admin");

      return res
        .status(401)
        .json({ message: "User not authorized! | Not Admin" });
    }

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
  }
}
