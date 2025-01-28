import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Project data
const projects = [
  {
    title: "Clean Water Initiative",
    owner: "Joe Smith",
    amountGot: "$3,000",
    description:
      "Providing clean water to underdeveloped regions by setting up filtration systems and educating local communities about water conservation and water cleaning...",
    amountRaised: "$20,000",
    contributors: 40,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPUnnNJwKw1pJSitiUXERVY0RcSlpusY-BbA&s",
  },
  {
    title: "Clean Water Initiative",
    owner: "Joe Smith",
    amountGot: "$3,000",
    description:
      "Providing clean water to underdeveloped regions by setting up filtration systems and educating local communities about water conservation and water cleaning...",
    amountRaised: "$20,000",
    contributors: 40,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPUnnNJwKw1pJSitiUXERVY0RcSlpusY-BbA&s",
  },
];

// ProjectCard Component
const ProjectCard = ({ project }) => {
  const handleInvest = () => {
    // Handle invest button click logic
    console.log(`Investing in ${project.title}`);
  };

  return (
    <Link to={`/your-project/${project.title}`}>
      <div data-aos='flip-right' className="bg-green-800 cursor-pointer text-white rounded-lg shadow-lg p-4 ml-[30px] mt-[30px] md:w-[400px]">
        <img data-aos='fade-down' src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-t-lg" />
        <div className="p-4">
          <h3 data-aos='fade-up' className="text-xl font-semibold mb-2">{project.title}</h3>
          <p data-aos='fade-up' className="text-sm mb-2">by {project.owner}</p>
          <p data-aos='fade-up' className="text-sm mb-4">{project.description}</p>
          <div className="text-lg font-bold mb-2">{project.amountRaised}</div>
          <div className="text-sm text-gray-300 mb-4">{project.contributors} Carbon Credits</div>
          <div className="flex justify-between items-center">
            <button onClick={handleInvest} className="bg-green-700 text-white px-4 py-2 hover:bg-green-900 rounded-lg">
              Invest
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

const MyProject = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen p-8" style={{ background: 'radial-gradient(circle,#8FD14F,beige)' }}>
      <div className="flex flex-wrap justify-center">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
      <Link to="/newproject">
        <button
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gray-500 text-white text-3xl font-bold flex items-center justify-center shadow-lg hover:bg-black transition-colors duration-200"
          aria-label="Add New Project"
        >
          +
        </button>
      </Link>
    </div>
  );
};

export default MyProject;
