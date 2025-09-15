import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div>
      <section className="text-gray-600 body-font p-5 md:p-25">
        <div className="container mx-auto flex px-5 py-4 md:p-24 lg:p-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              <span className="text-5xl md:text-6xl lg:text-7xl block font-bold">
                VitaLink
              </span>
              <br />
              Helping Others.
            </h1>
            <p className="mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
              repudiandae officiis ipsum fugit, sapiente consequuntur sint
              voluptate eaque magnam eum excepturi. Rem neque ipsum unde quasi
              cupiditate enim soluta cumque, fugiat quibusdam illo dolore nemo
              perferendis facilis possimus quaerat debitis nam hic nihil, omnis
              voluptatum sequi nesciunt sunt! Accusantium, harum.
            </p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg cursor-pointer">
                Find a doctor
              </button>
              <Link
                to="/login"
                className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg cursor-pointer"
              >
                Login &rarr;
              </Link>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="src\assets\HeroPicture.svg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
