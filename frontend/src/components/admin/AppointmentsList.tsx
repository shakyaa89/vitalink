import axios from "axios";
import { CalendarDays, Clock, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showCancellationModal, setShowCancellationModal] =
    useState<boolean>(false);
  const [appointmentId, setAppointmentId] = useState<string>("");

  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/appointment/all",
        {
          withCredentials: true,
        }
      );
      setAppointments(response.data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const confirmAppointment = async (appointmentId: string) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/admin/approve/appointment/${appointmentId}`,
        {},
        { withCredentials: true }
      );
      fetchAppointments();
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error confirming appointment:", error);
    }
  };

  const completeAppointment = async (appointmentId: string) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/complete/appointment/${appointmentId}`,
        {},
        { withCredentials: true }
      );
      fetchAppointments();
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error confirming appointment:", error);
    }
  };

  const cancelAppointment = async (appointmentId: string) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/cancel/appointment/${appointmentId}`,
        {},
        { withCredentials: true }
      );
      fetchAppointments();
      toast.success(response.data.message);
      setShowCancellationModal(false);
    } catch (error) {
      console.error("Error confirming appointment:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDeletion = async (appointmentId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/admin/delete/appointment/${appointmentId}`,
        { withCredentials: true }
      );
      fetchAppointments();
      toast.success(response.data.message);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  if (loading) {
    return (
      <div className="mt-60 flex items-center justify-center">
        <p>
          <span className="flex gap-3">
            <Loader2 className="animate-spin" />
            Loading Appointments...
          </span>
        </p>
      </div>
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
                  <div className="flex items-center">
                    <img
                      alt={appt.doctor.name}
                      className="w-12 h-12 bg-gray-100 object-cover rounded-full mr-3"
                      src={
                        appt.doctor.profilePic || "https://dummyimage.com/60x60"
                      }
                    />
                    <div>
                      <h2 className="text-gray-900 font-medium">
                        Doctor: {appt.doctor.name}
                      </h2>
                      <p className="text-gray-500 text-sm">
                        {appt.doctor.email}
                      </p>
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
                  <p className="text-sm font-semibold capitalize">
                    Creation Date: {new Date(appt.createdAt).toLocaleString()}
                  </p>
                  <div className="flex gap-5">
                    {appt.status === "pending" && (
                      <button
                        onClick={() => confirmAppointment(appt._id)}
                        className="w-full mt-3 bg-green-500 text-white font-semibold py-1 px-3 rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
                      >
                        Approve Appointment
                      </button>
                    )}

                    {appt.status === "confirmed" && (
                      <>
                        <button
                          onClick={() => completeAppointment(appt._id)}
                          className="w-full mt-3 bg-indigo-500 text-white font-semibold py-1 px-3 rounded-lg hover:bg-indigo-600 transition-colors cursor-pointer"
                        >
                          Complete Appointment
                        </button>

                        <button
                          onClick={() => {
                            setShowCancellationModal(true);
                            setAppointmentId(appt._id);
                          }}
                          className="w-full mt-3 bg-red-500 text-white font-semibold py-1 px-3 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                        >
                          Cancel Appointment
                        </button>
                      </>
                    )}
                  </div>
                  <div className="flex gap-5">
                    <button
                      onClick={() => {
                        setShowDeleteModal(true);
                        setAppointmentId(appt._id);
                      }}
                      className="w-full mt-3 bg-red-500 text-white font-semibold py-1 px-3 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                    >
                      Delete Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCancellationModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-900">
              Confirm Cancellation
            </h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to cancel this appointment?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCancellationModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => cancelAppointment(appointmentId)}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-900">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this appointment?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeletion(appointmentId)}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AppointmentsList;
