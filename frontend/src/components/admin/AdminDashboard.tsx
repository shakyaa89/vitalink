// DashboardSection.tsx

import UnapprovedDoctorsList from "./UnapprovedDoctorsList";

const AdminDashboard = () => {
  const stats = [
    { label: "Total Users", value: 120 },
    { label: "Total Doctors", value: 25 },
    { label: "Active Sessions", value: 18 },
  ];

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 pt-10 mx-auto">
          <div className="flex flex-col text-center w-full mb-10">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Admin Dashboard
            </h1>
            <p className="lg:w-2/3 mx-auto text-base">
              Overview of your platform statistics and activity.
            </p>
          </div>

          <div className="flex flex-wrap">
            {stats.map((stat, index) => (
              <div key={index} className="p-4 md:w-1/3 w-full">
                <div className="h-full flex flex-col items-center border border-gray-200 p-6 rounded-lg">
                  <h2 className="text-3xl font-medium text-gray-900">
                    {stat.value}
                  </h2>
                  <p className="text-gray-500 mt-2">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <UnapprovedDoctorsList />
    </>
  );
};

export default AdminDashboard;
