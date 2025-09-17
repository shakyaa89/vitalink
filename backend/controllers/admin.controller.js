import User from "../models/user.model.js";

export async function fetchAllUsers(req, res) {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

export async function fetchUnapprovedDoctors(req, res) {
  try {
    const doctors = await User.find({
      role: "doctor",
      "doctorProfile.isApproved": false,
    }).select("-password");
    return res.status(200).json({ doctors });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

export async function fetchAllDoctors(req, res) {
  try {
    const doctors = await User.find({
      role: "doctor",
      "doctorProfile.isApproved": true,
    }).select("-password");
    return res.status(200).json({ doctors });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

export async function approveDoctor(req, res) {
  try {
    const doctor = await User.findById(req.params.id);

    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    doctor.doctorProfile.isApproved = true;
    await doctor.save();

    return res.status(200).json({ message: "Doctor approved!" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

export async function deleteDoctor(req, res) {
  try {
    const doctor = await User.findById(req.params.id);

    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Doctor deleted!" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
