import { Link } from "react-router-dom";

function AboutUsPage() {
  return (
    <section className="text-gray-600 body-font p-5 md:p-24">
      <div className="container mx-auto flex flex-col">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-indigo-500">VitaLink</span>
          </h1>
          <p className="text-lg leading-relaxed text-gray-700 max-w-2xl mx-auto">
            VitaLink is a modern healthcare platform designed to connect
            patients with trusted medical professionals. Our mission is to make
            healthcare more accessible, transparent, and efficient through
            technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="mb-6 leading-relaxed">
              We believe that quality healthcare should be available to
              everyone, everywhere. VitaLink simplifies the process of finding
              doctors, booking appointments, and accessing medical records
              securely.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Vision
            </h2>
            <p className="mb-6 leading-relaxed">
              To build a connected healthcare ecosystem where patients, doctors,
              and healthcare providers collaborate seamlessly for better
              outcomes.
            </p>

            <Link
              to="/contact"
              className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg cursor-pointer"
            >
              Contact Us
            </Link>
          </div>

          {/* Right image */}
          <div className="flex justify-center">
            <img
              src="\src\assets\aboutuspic.svg"
              alt="About us illustration"
              className="object-cover object-center rounded-lg w-4/5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsPage;
