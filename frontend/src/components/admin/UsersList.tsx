import axios from "axios";
import { User2 } from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  role: string;
  profilePic: string;
}

function UsersList() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/users",
        { withCredentials: true }
      );
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-10 md:20 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            All Users
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="flex flex-wrap -m-2">
          {users.map((user, index) => (
            <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="border-gray-200 border p-4 rounded-lg">
                <div className="h-full flex items-cente">
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
                <button
                  // onClick={() => handleDeletion(doctor._id)}
                  className="w-full mt-3 bg-red-500 text-white font-semibold py-1 px-3 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                >
                  Delete User
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UsersList;
