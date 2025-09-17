import DoctorsList from "../components/admin/DoctorsList.tsx";
import UsersList from "../components/admin/UsersList";
import { useState } from "react";
import AdminDashboard from "../components/admin/AdminDashboard";

function AdminDashboardPage() {
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
              setActiveSection("users");
            }}
            className={
              activeSection === "users"
                ? "cursor-pointer border-b-2"
                : "cursor-pointer"
            }
          >
            All Users
          </button>
          <button
            onClick={() => {
              setActiveSection("doctors");
            }}
            className={
              activeSection === "doctors"
                ? "cursor-pointer border-b-2"
                : "cursor-pointer"
            }
          >
            All Doctors
          </button>
        </div>
      </div>

      {activeSection === "dashboard" && <AdminDashboard />}
      {activeSection === "users" && <UsersList />}
      {activeSection === "doctors" && <DoctorsList />}
    </>
  );
}

export default AdminDashboardPage;
