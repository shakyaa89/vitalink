import axios from "axios";
import { Stethoscope } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

function DoctorsList() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [doctorId, setDoctorId] = useState<string>("");

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctor");
      setDoctors(response.data.doctors);
    } catch (error) {
      console.error("Error fetching unapproved doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDeletion = async (doctorId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/admin/delete/doctor/${doctorId}`,
        { withCredentials: true }
      );
      fetchDoctors();
      toast.success(response.data.message);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error rejecting doctor:", error);
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-10 md:20 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            All Doctors
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="flex flex-wrap -m-2">
          {doctors.map((doctor, index) => (
            <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="border-gray-200 border p-4 rounded-lg">
                <div className="h-full flex items-center ">
                  <img
                    alt={doctor.name}
                    className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                    src={doctor.profilePic || "https://dummyimage.com/80x80"}
                  />
                  <div className="flex flex-col">
                    <h2 className="text-gray-900 title-font font-medium">
                      {doctor.name}
                    </h2>
                    <p className="text-gray-500">{doctor.email}</p>
                    <div className="flex items-center gap-1">
                      <Stethoscope size={20} />
                      <p className="text-gray-500 capitalize">
                        {doctor.doctorProfile.specialization} &bull;{" "}
                        {doctor.doctorProfile.experience} years
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="text-gray-500 capitalize">
                        Fee: Rs.{doctor.doctorProfile.fee}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="text-gray-500 capitalize">
                        {doctor.doctorProfile.startTime} -{" "}
                        {doctor.doctorProfile.endTime}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setDoctorId(doctor._id);
                    setShowDeleteModal(true);
                  }}
                  className="w-full mt-3 bg-red-500 text-white font-semibold py-1 px-3 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                >
                  Delete Doctor
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-900">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this doctor?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeletion(doctorId)}
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

export default DoctorsList;
