import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <header className="text-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="ml-3 text-xl font-bold">VitaLink</span>
          </a>

          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <NavLink to={"/"} className="mr-5 hover:text-gray-600">
              Home
            </NavLink>
            <NavLink to={"/about"} className="mr-5 hover:text-gray-600">
              About
            </NavLink>
            <NavLink to={"/doctors"} className="mr-5 hover:text-gray-600">
              Find Doctors
            </NavLink>
            {/* <NavLink to={"/admin"} className="mr-5 hover:text-gray-600">
              Admin
            </NavLink> */}
          </nav>
          <Link
            to={"/login"}
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-5 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          >
            Login &rarr;
          </Link>
        </div>
      </header>
    </div>
  );
}
