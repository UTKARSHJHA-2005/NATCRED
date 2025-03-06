import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Project.css"
import AOS from 'aos'
import { toast, ToastContainer } from "react-toastify"
import 'aos/dist/aos.css';
import "./Project.css"

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
    title: "Preserve Me",
    owner: "John Hazzlewood",
    amountGot: "$3,000",
    description:
      "A major Initiative is taken to protect endangered species and preserve their natural habitats by    cleaning our forests from the junks or trashes that people throws in it.",
    amountRaised: "$18,000",
    contributors: 60,
    image: "https://media.istockphoto.com/id/1470571303/photo/eco-activist-mother-and-daughter-cleaning-urban-trash-by-river.jpg?s=612x612&w=0&k=20&c=PqWGAYjq62lYjTZWQ6YCs_ahod8t0kV8bydCPouI91E=",
  },
];

const ProjectCard = ({ project }) => {
  return (
    <>
      <div className="project-card" data-aos='flip-right'>
        <div className="card-glow"></div>
        <img src={project.image} alt={project.title} className="project-image" data-aos='fade-down' />
        <Link to={`/projects/${projects.title}`} state={{ project }} className="card-content">
          <h3 className="project-title px-24" data-aos='fade-up'>{project.title}</h3>
          <p className="project-owner" data-aos='fade-up'>by {project.owner}</p>
          <p className="project-description" data-aos='fade-up'>{project.description}</p>
          <div className="project-stats">
            <div className="stat-item">
              <span className="stat-value">{project.amountRaised}</span>
              <span className="stat-label">RAISED</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{project.contributors}</span>
              <span className="stat-label">CREDITS</span>
            </div>
          </div>
        </Link>
          <button
            disabled={true}
            className="invest-button">
            <span className="button-text">Invest</span>
            <div className="button-glow"></div>
          </button>
      </div>
    </>
  );
};

const Project = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className="projects-container">
      <Link to="/your-project" className="my-projects-button">
        <span className="button-icon">📓</span>
        <div className="button-glow"></div>
      </Link>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
      <Link to="/newproject" className="new-project-button">
        <div className="button-glow"></div>
        <span className="button-plus">+</span>
      </Link>
      <ToastContainer />
    </div>
  );
};

export default Project;          