import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuthHook";

interface DoctorProfile {
  specialization: string;
  experience: number;
  fee: number;
  startTime: string;
  endTime: string;
  isApproved: boolean;
}

interface Doctor {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePic: string;
  doctorProfile: DoctorProfile;
}

interface Appointment {
  date: Date;
  time: string;
}

export default function BookAppointmentPage() {
  const { doctorId } = useParams<{ doctorId: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const { authUser } = useAuth();
  const userId = authUser?._id;

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const formatDate = (d: Date) => d.toISOString().split("T")[0];
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const minDate = formatDate(today);
  const maxDate = formatDate(tomorrow);

  const fetchAppointmentsByDoctor = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/appointment/doctor/${doctorId}`,
        { withCredentials: true }
      );
      setAppointments(res?.data?.appointments);
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
    }
  };

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/doctor/${doctorId}`,
          { withCredentials: true }
        );
        setDoctor(res?.data?.doctor);
      } catch (err) {
        console.error("Failed to fetch doctor:", err);
      }
    };

    fetchDoctor();
    fetchAppointmentsByDoctor();
  }, [doctorId]);

  useEffect(() => {
    if (!doctor) return;
    const slots: string[] = [];
    const [startHour, startMin] = doctor?.doctorProfile?.startTime
      .split(":")
      .map(Number);
    const [endHour, endMin] = doctor?.doctorProfile?.endTime
      .split(":")
      .map(Number);

    let start = new Date();
    start.setHours(startHour, startMin, 0, 0);
    let end = new Date();
    end.setHours(endHour, endMin, 0, 0);

    while (start <= end) {
      const hh = String(start.getHours()).padStart(2, "0");
      const mm = String(start.getMinutes()).padStart(2, "0");
      slots.push(`${hh}:${mm}`);
      start.setMinutes(start.getMinutes() + 15);
    }

    const filteredSlots = slots.slice(1, -1);

    setTimeSlots(filteredSlots);
  }, [doctor]);

  useEffect(() => {
    setTime("");
  }, [date]);

  const fullyBookedDates = Array.from(
    new Set(
      appointments
        .map((a) => {
          const dateStr = new Date(a.date).toISOString().split("T")[0];
          const countForDate = appointments.filter(
            (app) => new Date(app.date).toISOString().split("T")[0] === dateStr
          ).length;
          return countForDate >= timeSlots.length ? dateStr : null;
        })
        .filter(Boolean) as string[]
    )
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!time) {
      toast.error("Select a time slot for booking!");
      return;
    }

    const data = { doctorId, userId, date, time };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/appointment/create",
        data,
        { withCredentials: true }
      );
      toast.success(response?.data?.message, {
        duration: 4000,
      });

      fetchAppointmentsByDoctor();

      setTime("");
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mt-8 flex justify-center">
      <div className="w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl bg-white rounded-xl shadow p-6 space-y-6">
        <h2 className="text-2xl font-semibold">
          Book Appointment {doctor?.name && `with Dr. ${doctor.name}`}
        </h2>

        {doctor && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner space-y-2">
            <div className="flex items-center space-x-4">
              <img
                src={doctor.profilePic}
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-lg">Dr. {doctor.name}</p>
                <p className="text-sm text-gray-600">
                  {doctor.doctorProfile.specialization}
                </p>
              </div>
            </div>
            <p>Experience: {doctor.doctorProfile.experience} years</p>
            <p>Consultation Fee: Rs. {doctor.doctorProfile.fee}</p>
            <p>
              Available: {doctor.doctorProfile.startTime} –{" "}
              {doctor.doctorProfile.endTime}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Date</label>
            <input
              type="date"
              value={date}
              min={minDate}
              max={maxDate}
              onChange={(e) => {
                if (fullyBookedDates.includes(e.target.value)) {
                  toast.error(
                    "This date is fully booked. Please select another."
                  );
                  setDate("");
                  return;
                }
                setDate(e.target.value);
              }}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Select Time</label>
            <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
              {timeSlots.map((slot) => {
                const isBooked = appointments.some((a) => {
                  const appointmentDate = new Date(a.date);
                  const selectedDate = new Date(date);
                  return (
                    appointmentDate.getFullYear() ===
                      selectedDate.getFullYear() &&
                    appointmentDate.getMonth() === selectedDate.getMonth() &&
                    appointmentDate.getDate() === selectedDate.getDate() &&
                    a.time === slot
                  );
                });

                return (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setTime(slot)}
                    disabled={isBooked || !date}
                    className={`p-2 rounded-lg shadow ${
                      time === slot
                        ? "bg-indigo-500 text-white border-indigo-500"
                        : isBooked
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-indigo-100"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
            {time && (
              <p className="text-sm text-gray-600 mt-2">
                Selected time: <span className="font-medium">{time}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-xl hover:bg-indigo-600 transition-colors"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
