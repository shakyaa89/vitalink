import { useEffect, useState } from "react";
import axios from "axios";
import {
  Stethoscope,
  Clock,
  BadgeCheck,
  Wallet,
  UserCircle,
} from "lucide-react";
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

function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [allSpecializations, setAllSpecializations] = useState<string[]>([]);

  const { authUser } = useAuth();

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctor");
      const fetchedDoctors: Doctor[] = response.data.doctors;
      setDoctors(fetchedDoctors);

      const specs = Array.from(
        new Set(fetchedDoctors.map((doc) => doc.doctorProfile.specialization))
      );
      setAllSpecializations(specs);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    return (
      !specializationFilter ||
      doctor.doctorProfile.specialization === specializationFilter
    );
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 flex flex-col md:flex-row">
      {/* Sidebar filters */}
      <aside className="w-full md:w-64 mb-6 md:mb-0 md:mr-6 flex-shrink-0">
        <div className="bg-white shadow-md rounded-2xl p-5 border border-blue-100">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          {/* Specialization Dropdown */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Specialization
            </label>
            <select
              value={specializationFilter}
              onChange={(e) => setSpecializationFilter(e.target.value)}
              className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            >
              <option value="">All</option>
              {allSpecializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
        </div>
      </aside>

      {/* Doctors list */}
      <main className="flex-1">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
          Available Doctors
        </h2>
        {filteredDoctors.length === 0 ? (
          <p className="text-gray-500 text-center md:text-left">
            No doctors found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white border border-blue-100 rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col items-center text-center"
              >
                {doctor.profilePic ? (
                  <img
                    src={doctor.profilePic}
                    alt={doctor.name}
                    className="w-40 h-40 rounded-full mb-3 object-cover border-4 border-blue-200"
                  />
                ) : (
                  <UserCircle className="w-24 h-24 text-blue-300 mb-3" />
                )}
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-1">
                  {doctor.name}
                  {doctor.doctorProfile.isApproved && (
                    <BadgeCheck className="w-5 h-5 text-green-500" />
                  )}
                </h3>
                <p className="text-blue-600 font-medium flex items-center gap-1">
                  <Stethoscope className="w-4 h-4" />
                  {doctor.doctorProfile.specialization}
                </p>
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {doctor.doctorProfile.startTime} -{" "}
                  {doctor.doctorProfile.endTime}
                </p>
                <p className="text-gray-700 text-sm mt-2">
                  {doctor.doctorProfile.experience} years experience
                </p>
                <p className="text-blue-700 font-semibold flex items-center gap-1 mt-1">
                  <Wallet className="w-4 h-4" />
                  Rs.{doctor.doctorProfile.fee}
                </p>

                {authUser && (
                  <button
                    className="mt-4 w-full bg-indigo-500 text-white py-2 rounded-xl hover:bg-indigo-600 transition-colors"
                    onClick={() =>
                      alert(`Booking appointment with Dr. ${doctor.name}`)
                    }
                  >
                    Book Appointment
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default DoctorsPage;
