// This is the project component where projects are shown.
import { useEffect, useState } from 'react';// React
import { Link } from 'react-router-dom';// Routing
import axios from "axios"// Axios
import AOS from 'aos'// Animation
import { toast, ToastContainer } from "react-toastify"// Notification
import 'aos/dist/aos.css';
import "./Project.css"// Styling

const ProjectCard = ({ project }) => {
  return (
    <>
      <div className="project-card" data-aos='flip-right'>
        <div className="card-glow"></div>
        <img src={project.image} alt={project.title} className="project-image" data-aos='fade-down' />
        <Link to={`/projects/${project._id}`} state={{ project }} className="card-content">
          <h3 className="project-title px-24" data-aos='fade-up'>{project.title}</h3>
          <p className="project-owner" data-aos='fade-up'>by {project.author}</p>
          <p className="project-description" data-aos='fade-up'>{project.content}</p>
          <div className="project-stats">
            <div className="stat-item">
              <span className="stat-value">{project.Fund}</span>
              <span className="stat-label">RAISED</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{project.CarbonCredits}</span>
              <span className="stat-label">CREDITS</span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

const Project = () => {
  const [project, setproject] = useState([]) // Project State
  const [searchTerm, setSearchTerm] = useState("");// Searching
  // Animation with Projects
  useEffect(() => {
    AOS.init({ duration: 1000 });
    getProject()
  }, []);
  // Fetching Project Details
  const getProject = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/project")
      const data = res.data;
      setproject(data)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }
  // Filtering Projects
  const filteredProjects = project.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="projects-container">
      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search projects by title or author..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"/>
      </div>
      {/* Project Cards */}
      <div className="projects-grid">
        {filteredProjects.map((projects, index) => (
          <ProjectCard key={index} project={projects} />
        ))}
      </div>
      {/* Add New Project Button */}
      <Link title='Add New Project' to="/newproject" className="new-project-button">
        <div className="button-glow"></div>
        <span className="button-plus">+</span>
      </Link>
      <ToastContainer />
    </div>
  );
};

export default Project;          