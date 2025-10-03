import axios from "axios";
import { CalendarDays, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuthHook";

interface User {
  _id: string;
  name: string;
  email: string;
  profilePic?: string;
}

interface Appointment {
  _id: string;
  doctor: User;
  user: User;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: Date;
}

function AppointmentsList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { authUser } = useAuth();

  const doctorId = authUser?._id;

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/appointment/doctor/${doctorId}`,
        {
          withCredentials: true,
        }
      );
      setAppointments(response.data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (appointments.length === 0) {
    return (
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              No Appointments
            </h1>
            <p>There are no current appointments.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            All Appointments
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Manage doctor-patient appointments easily.
          </p>
        </div>
        <div className="flex flex-wrap -m-2">
          {appointments.map((appt, index) => (
            <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="border-gray-200 border p-4 rounded-lg">
                <div className="h-full flex flex-col gap-2">
                  <div className="flex items-center">
                    <img
                      alt={appt.user.name}
                      className="w-12 h-12 bg-gray-100 object-cover rounded-full mr-3"
                      src={
                        appt.user.profilePic || "https://dummyimage.com/60x60"
                      }
                    />
                    <div>
                      <h2 className="text-gray-900 font-medium">
                        Patient: {appt.user.name}
                      </h2>
                      <p className="text-gray-500 text-sm">{appt.user.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center gap-2">
                    <p className="text-gray-500">Appointment ID: {appt._id}</p>
                    <p className="text-sm font-semibold capitalize text-gray-500">
                      Creation Date: {new Date(appt.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays size={18} />
                    <p className="text-gray-500">
                      {new Date(appt.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <p className="text-gray-500">{appt.time}</p>
                  </div>
                  <p className="text-sm font-semibold capitalize">
                    Status:{" "}
                    <span
                      className={
                        appt.status === "confirmed"
                          ? "text-green-600"
                          : appt.status === "cancelled"
                          ? "text-red-600"
                          : appt.status === "completed"
                          ? "text-blue-600"
                          : "text-yellow-600"
                      }
                    >
                      {appt.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AppointmentsList;
