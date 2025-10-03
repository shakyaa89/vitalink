import Appointment from "../models/appointment.model.js";
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

    await Appointment.deleteMany({ doctor: req.params.id });

    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Doctor deleted!" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({})
      .populate("doctor")
      .populate("user");

    res.status(200).json({
      appointments,
    });
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({
      message: "Failed to fetch appointments",
    });
  }
};

export async function confirmAppointment(req, res) {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "confirmed";
    await appointment.save();

    return res.status(200).json({ message: "Appointment Confirmed!" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

export async function completeAppointment(req, res) {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "completed";
    await appointment.save();

    return res.status(200).json({ message: "Appointment completed!" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

export async function cancelAppointment(req, res) {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    return res.status(200).json({ message: "Appointment cancelled!" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

export async function deleteAppointment(req, res) {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await Appointment.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Appointment deleted!" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
