import Appointment from "../models/appointment.model.js";

export async function createAppointment(req, res) {
  const { userId, doctorId, date, time } = req.body;

  try {
    if (!date || !time) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newAppointment = new Appointment({
      doctor: doctorId,
      user: userId,
      date,
      time,
    });

    await newAppointment.save();

    res.status(201).json({ message: "Appointment Created!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const getAppointmentsByDoctor = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const appointments = await Appointment.find({ doctor: doctorId });

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
