import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuthHook";
import { CircleUser, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { authUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout(navigate);
    setIsOpen(false);
  };

  return (
    <div>
      <header className="text-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-row items-center justify-between">
          <a className="flex title-font font-medium items-center text-gray-900">
            <span className="ml-3 text-xl font-bold">VitaLink</span>
          </a>

          <button
            className="md:hidden text-gray-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop nav + auth */}
          <nav className="hidden md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 md:flex items-center text-base justify-center">
            {authUser === null || authUser.role !== "admin" ? (
              <>
                <NavLink to={"/"} className="mr-5 hover:text-gray-600">
                  Home
                </NavLink>
                <NavLink to={"/about"} className="mr-5 hover:text-gray-600">
                  About
                </NavLink>
                <NavLink to={"/doctors"} className="mr-5 hover:text-gray-600">
                  Find Doctors
                </NavLink>
              </>
            ) : (
              <NavLink to={"/admin"} className="mr-5 hover:text-gray-600">
                Admin Dashboard
              </NavLink>
            )}
            {/* {authUser && authUser.role === "admin" && (
              
            )} */}
          </nav>

          <div className="hidden md:flex items-center">
            {authUser ? (
              <>
                <span className="mr-3 py-1">{authUser.name}</span>
                <span className="mr-3 md:border-r md:border-gray-400 md:pr-3 md:py-1">
                  {authUser.profilePic ? (
                    <img
                      src={authUser?.profilePic}
                      alt=""
                      className="w-[30px] h-[30px] rounded-full"
                    />
                  ) : (
                    <CircleUser className="w-[30px] h-[30px]" />
                  )}
                </span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center bg-gray-100 border-0 py-1 px-5 focus:outline-none hover:bg-gray-200 rounded text-base cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <span className="mr-3 py-1">Guest</span>
                <span className="mr-3 border-r border-gray-400 pr-3 py-1">
                  <CircleUser className="w-[30px] h-[30px]" />
                </span>
                <Link
                  to={"/login"}
                  className="inline-flex items-center bg-gray-100 border-0 py-1 px-5 focus:outline-none hover:bg-gray-200 rounded text-base"
                >
                  Login →
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="md:hidden px-5 pb-5 space-y-4">
            <nav className="flex flex-col space-y-2">
              <Link to={"/"} onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link to={"/about"} onClick={() => setIsOpen(false)}>
                About
              </Link>
              <Link to={"/doctors"} onClick={() => setIsOpen(false)}>
                Find Doctors
              </Link>
            </nav>

            {authUser ? (
              <div className="mt-4 flex flex-col space-y-3">
                <div className="flex items-center space-x-3">
                  {authUser.profilePic ? (
                    <img
                      src={authUser?.profilePic}
                      alt=""
                      className="w-[30px] h-[30px] rounded-full"
                    />
                  ) : (
                    <CircleUser className="w-[30px] h-[30px]" />
                  )}
                  <span>{authUser.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-gray-100 py-2 rounded hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-4 flex flex-col space-y-3">
                <div className="flex items-center space-x-3">
                  <CircleUser className="w-[30px] h-[30px]" />
                  <span>Guest</span>
                </div>
                <Link
                  to={"/login"}
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-100 py-2 rounded text-center hover:bg-gray-200"
                >
                  Login →
                </Link>
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
}
