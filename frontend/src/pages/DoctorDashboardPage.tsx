import { useState } from "react";
import AdminDashboard from "../components/admin/AdminDashboard";
import AppointmentsList from "../components/doctor/AppointmentsList.tsx";
import DoctorDashboard from "../components/doctor/DoctorDashboard.tsx";

function DoctorDashboardPage() {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <>
      <div className="mt-5 flex items-center justify-around px-5 md:px-30 lg:px-50 box-border">
        <div className="w-full border-b flex items-center justify-around py-3 md:py-5 md:pb-10 box-border">
          <button
            onClick={() => {
              setActiveSection("dashboard");
            }}
            className={
              activeSection === "dashboard"
                ? "cursor-pointer border-b-2"
                : "cursor-pointer"
            }
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              setActiveSection("appointments");
            }}
            className={
              activeSection === "appointments"
                ? "cursor-pointer border-b-2"
                : "cursor-pointer"
            }
          >
            All Appointments
          </button>
        </div>
      </div>

      {activeSection === "dashboard" && <DoctorDashboard />}
      {activeSection === "appointments" && <AppointmentsList />}
    </>
  );
}

export default DoctorDashboardPage;
