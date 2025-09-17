import axios from "axios";
import { FacebookIcon, Mail, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

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

const HomeDoctorsSection = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctor");
      setDoctors(response.data.doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <section className="text-gray-700 body-font mt-16 bg-gray-50">
      <div className="container px-5 py-24 mx-auto">
        {/* Section Header */}
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Our Doctors
          </h1>
          <p className="lg:w-2/3 mx-auto text-gray-600">
            Meet our certified professionals who are here to take care of your
            health.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-center text-center"
            >
              <img
                alt={doctor.name}
                src={doctor.profilePic}
                className="w-32 h-32 object-cover object-center rounded-full mb-4 border-2 border-indigo-200"
              />
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                Dr. {doctor.name}
              </h2>
              <p className="text-indigo-600 font-medium mb-2">
                {doctor.doctorProfile.specialization}
              </p>
              <p className="text-gray-500 text-sm mb-1">
                Experience: {doctor.doctorProfile.experience} yrs
              </p>
              <p className="text-gray-500 text-sm mb-2">
                Fee: Rs.{doctor.doctorProfile.fee}
              </p>
              <p className="text-gray-400 text-sm mb-4">
                Available: {doctor.doctorProfile.startTime} -{" "}
                {doctor.doctorProfile.endTime}
              </p>

              {/* Contact Icons */}
              <div className="flex space-x-3">
                <a
                  href={`mailto:${doctor.email}`}
                  className="p-2 bg-indigo-100 rounded-full text-indigo-600 hover:bg-indigo-200"
                  title="Email"
                >
                  <Mail size={20} />
                </a>
                <a
                  href="#"
                  className="p-2 bg-indigo-100 rounded-full text-indigo-600 hover:bg-indigo-200"
                  title="Message"
                >
                  <MessageCircle size={20} />
                </a>
                <a
                  href="#"
                  className="p-2 bg-indigo-100 rounded-full text-indigo-600 hover:bg-indigo-200"
                  title="Facebook"
                >
                  <FacebookIcon size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeDoctorsSection;
