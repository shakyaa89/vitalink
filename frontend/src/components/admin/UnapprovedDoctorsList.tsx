import axios from "axios";
import { Loader2, Stethoscope } from "lucide-react";
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

function UnapprovedDoctorsList() {
  const [unapprovedDoctors, setUnapprovedDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUnapprovedDoctors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/unapproved-doctors",
        { withCredentials: true }
      );
      setUnapprovedDoctors(response.data.doctors);
    } catch (error) {
      console.error("Error fetching unapproved doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnapprovedDoctors();
  }, []);

  const handleApproval = async (doctorId: string) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/admin/approve/doctor/${doctorId}`,
        {},
        { withCredentials: true }
      );
      fetchUnapprovedDoctors();
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error approving doctor:", error);
    }
  };

  const handleDeletion = async (doctorId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/admin/delete/doctor/${doctorId}`,
        { withCredentials: true }
      );
      fetchUnapprovedDoctors();
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error rejecting doctor:", error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center  text-center w-full my-10">
        <Loader2 className="animate-spin" size={30} />
      </div>
    );

  if (unapprovedDoctors.length === 0)
    return (
      <div className="flex flex-col text-center w-full my-10">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-10 text-gray-900">
          Doctor Approval Requests
        </h1>

        <p>No unapproved doctors found</p>
      </div>
    );

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-10 md:20 mx-auto">
        <div className="flex flex-col text-center w-full mb-10">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
            Doctor Approval Requests
          </h1>
        </div>
        <div className="flex flex-wrap -m-2">
          {unapprovedDoctors.map((doctor) => (
            <div key={doctor._id} className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex flex-col justify-between border-gray-200 border p-4 rounded-lg">
                <div className="flex items-center mb-4">
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

                <div className="w-full flex gap-2">
                  <button
                    onClick={() => handleApproval(doctor._id)}
                    className="mt-auto w-full bg-indigo-500 text-white font-semibold py-1 px-3 rounded-lg hover:bg-indigo-600 transition-colors cursor-pointer"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDeletion(doctor._id)}
                    className="mt-auto bg-red-500 text-white font-semibold py-1 px-3 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UnapprovedDoctorsList;
