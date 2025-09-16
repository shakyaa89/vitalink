import axios from "axios";
import { User2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Doctor {
  name: string;
  email: string;
  role: string;
  profilePic: string;
}

function DoctorsList() {
  const users: Doctor[] = [
    {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      role: "admin",
      profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Bob Smith",
      email: "bob.smith@example.com",
      role: "user",
      profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      name: "Clara Lee",
      email: "clara.lee@example.com",
      role: "moderator",
      profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      name: "Daniel Green",
      email: "daniel.green@example.com",
      role: "user",
      profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      name: "Eva Brown",
      email: "eva.brown@example.com",
      role: "user",
      profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      name: "Frank White",
      email: "frank.white@example.com",
      role: "admin",
      profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
      name: "Grace Kim",
      email: "grace.kim@example.com",
      role: "user",
      profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      name: "Henry Adams",
      email: "henry.adams@example.com",
      role: "moderator",
      profilePic: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
      name: "Isabella Martinez",
      email: "isabella.martinez@example.com",
      role: "user",
      profilePic: "https://randomuser.me/api/portraits/women/9.jpg",
    },
    {
      name: "Jack Wilson",
      email: "jack.wilson@example.com",
      role: "user",
      profilePic: "https://randomuser.me/api/portraits/men/10.jpg",
    },
  ];

  //   const [users, setUsers] = useState<User[]>([]);

  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:5000/api/admin/users",
  //         { withCredentials: true }
  //       );
  //       setUsers(response.data.users);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchUsers();
  //   }, []);

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
          {users.map((user, index) => (
            <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt={user.name}
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src={user.profilePic || "https://dummyimage.com/80x80"}
                />
                <div className="flex flex-col">
                  <h2 className="text-gray-900 title-font font-medium">
                    {user.name}
                  </h2>
                  <p className="text-gray-500">{user.email}</p>

                  <div className="flex items-center gap-1">
                    <User2 size={20} />
                    <p className="text-gray-500 capitalize">{user.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DoctorsList;
