import User from "../models/user.model.js";

export async function fetchAllUsers(req, res) {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
