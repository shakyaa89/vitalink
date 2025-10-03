import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuthHook";

interface Doctor {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePic: string;
  doctorProfile: {
    specialization: string;
    experience: number;
    fee: number;
    startTime: string;
    endTime: string;
    isApproved: boolean;
  };
}

interface Appointment {
  id: number;
  doctor: Doctor;
  date: Date;
  time: string;
  status: string;
}

function AppointmentsPage() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuth();

  const userId = authUser?._id;

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/appointment/user/${userId}`,
        { withCredentials: true }
      );
      setAppointments(response?.data?.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const pendingAppointments = appointments.filter(
    (apt) => apt.status === "pending"
  );
  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "confirmed"
  );
  const pastAppointments = appointments.filter(
    (apt) => apt.status === "completed"
  );
  const cancelledAppointments = appointments.filter(
    (apt) => apt.status === "cancelled"
  );

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="mt-60 flex items-center justify-center">
        <p>Loading Appointments...</p>
      </div>
    );
  }

  return (
    <div className="text-gray-600 body-font p-5 md:p-10">
      <div className="container mx-auto px-5 py-8 md:py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            My Appointments
          </h1>
          <p className="text-lg leading-relaxed text-gray-600">
            View and manage your medical appointments with VitaLink healthcare
            professionals.
          </p>
        </div>

        {/* Pending Appointments */}
        {pendingAppointments.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Pending Appointments
            </h2>

            {pendingAppointments.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {pendingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Dr. {appointment.doctor.name}
                        </h3>
                        <p className="text-gray-600 font-medium">
                          {appointment.doctor.doctorProfile.specialization}
                        </p>
                      </div>
                      <span className="bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                        Pending
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <span className="font-semibold">Date:</span>{" "}
                        {formatDate(appointment.date)}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Time:</span>{" "}
                        {appointment.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <p className="text-gray-600">
                  No pending appointments to display.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Upcoming Appointments */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Upcoming Appointments
          </h2>

          {upcomingAppointments.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white border-2 border-indigo-500 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Dr. {appointment.doctor.name}
                      </h3>
                      <p className="text-indigo-500 font-medium">
                        {appointment.doctor.doctorProfile.specialization}
                      </p>
                    </div>
                    <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Upcoming
                    </span>
                  </div>

                  <div className="space-y-2 ">
                    <p className="text-gray-700">
                      <span className="font-semibold">Date:</span>{" "}
                      {formatDate(appointment.date)}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Time:</span>{" "}
                      {appointment.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-4">
                You have no upcoming appointments.
              </p>
              <button
                className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg cursor-pointer"
                onClick={() => navigate("/doctors")}
              >
                Book an Appointment
              </button>
            </div>
          )}
        </div>

        {/* Past Appointments */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Past Appointments
          </h2>

          {pastAppointments.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {pastAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Dr. {appointment.doctor.name}
                      </h3>
                      <p className="text-gray-600 font-medium">
                        {appointment.doctor.doctorProfile.specialization}
                      </p>
                    </div>
                    <span className="bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {appointment.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-semibold">Date:</span>{" "}
                      {formatDate(appointment.date)}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Time:</span>{" "}
                      {appointment.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <p className="text-gray-600">No past appointments to display.</p>
            </div>
          )}
        </div>

        {/* Cancelled Appointments */}
        {cancelledAppointments.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Cancelled Appointments
            </h2>

            {cancelledAppointments.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {cancelledAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Dr. {appointment.doctor.name}
                        </h3>
                        <p className="text-gray-600 font-medium">
                          {appointment.doctor.doctorProfile.specialization}
                        </p>
                      </div>
                      <span className="bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {appointment.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <span className="font-semibold">Date:</span>{" "}
                        {formatDate(appointment.date)}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Time:</span>{" "}
                        {appointment.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <p className="text-gray-600">
                  No past appointments to display.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        <div className="mt-12 text-center">
          <button
            className="inline-flex text-white bg-indigo-500 border-0 py-3 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg cursor-pointer"
            onClick={() => {
              navigate("/doctors");
            }}
          >
            Book New Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentsPage;
