import { FacebookIcon, Mail, MessageCircle } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Alper Kamu",
    role: "Gynaecologist",
    description: "Lorem ipsum dolor sit amet...",
    imageUrl:
      "https://st3.depositphotos.com/9998432/19176/v/450/depositphotos_191768074-stock-illustration-default-placeholder-doctor-half-length.jpg",
  },
  {
    name: "Holden Caulfield",
    role: "Gynaecologist",
    description: "Lorem ipsum dolor sit amet...",
    imageUrl:
      "https://st3.depositphotos.com/9998432/19176/v/450/depositphotos_191768074-stock-illustration-default-placeholder-doctor-half-length.jpg",
  },
  {
    name: "Atticus Finch",
    role: "Gynaecologist",
    description: "Lorem ipsum dolor sit amet...",
    imageUrl:
      "https://st3.depositphotos.com/9998432/19176/v/450/depositphotos_191768074-stock-illustration-default-placeholder-doctor-half-length.jpg",
  },
  {
    name: "Henry Letham",
    role: "Gynaecologist",
    description: "Lorem ipsum dolor sit amet...",
    imageUrl:
      "https://st3.depositphotos.com/9998432/19176/v/450/depositphotos_191768074-stock-illustration-default-placeholder-doctor-half-length.jpg",
  },
  {
    name: "Jane Eyre",
    role: "Pediatrician",
    description: "Experienced pediatrician with a passion for child care.",
    imageUrl:
      "https://st3.depositphotos.com/9998432/19176/v/450/depositphotos_191768074-stock-illustration-default-placeholder-doctor-half-length.jpg",
  },
  {
    name: "John Watson",
    role: "Cardiologist",
    description: "Specialist in heart diseases and patient care.",
    imageUrl:
      "https://st3.depositphotos.com/9998432/19176/v/450/depositphotos_191768074-stock-illustration-default-placeholder-doctor-half-length.jpg",
  },
  {
    name: "Mary Shelley",
    role: "Neurologist",
    description: "Focused on neurological disorders and research.",
    imageUrl:
      "https://st3.depositphotos.com/9998432/19176/v/450/depositphotos_191768074-stock-illustration-default-placeholder-doctor-half-length.jpg",
  },
  {
    name: "Sherlock Holmes",
    role: "Pathologist",
    description: "Expert in pathology and laboratory diagnostics.",
    imageUrl:
      "https://st3.depositphotos.com/9998432/19176/v/450/depositphotos_191768074-stock-illustration-default-placeholder-doctor-half-length.jpg",
  },
];

const HomeDoctorsSection = () => {
  return (
    <section className="text-gray-600 body-font mt-10">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="text-3xl font-medium title-font mb-4 text-gray-900">
            <span className="flex items-center">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-300"></span>

              <span className="shrink-0 px-4 text-gray-900">Our Doctors</span>

              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-300"></span>
            </span>
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
            delectus nulla provident eligendi, corrupti molestiae sed
            consequuntur laboriosam error id!
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="p-4 lg:w-1/4 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center">
                <img
                  alt={member.name}
                  className="flex-shrink-0 rounded-lg w-full aspect-square object-cover object-center mb-4"
                  src={member.imageUrl}
                />
                <div className="w-full">
                  <h2 className="title-font font-medium text-lg text-gray-900">
                    {member.name}
                  </h2>
                  <h3 className="text-gray-500 mb-3">{member.role}</h3>
                  <p className="mb-4">{member.description}</p>
                  <span className="inline-flex">
                    <a className="text-gray-500">
                      <FacebookIcon />
                    </a>
                    <a className="ml-2 text-gray-500">
                      <Mail />
                    </a>
                    <a className="ml-2 text-gray-500">
                      <MessageCircle />
                    </a>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeDoctorsSection;
