import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"
import AOS from 'aos'
import { toast, ToastContainer } from "react-toastify"
import 'aos/dist/aos.css';
import "./Project.css"

const ProjectCard = ({ project }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [coins, setCoins] = useState(0);
  useEffect(() => {
    const savedCoins = localStorage.getItem("coins");
    if (savedCoins) {
      setCoins(parseInt(savedCoins, 10));
    }
  }, []);

  const handleInvest = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const userAccount = accounts[0];
        const transactionParameters = {
          to: "0x4b567f404c7fd52f948e2bc8758945b3339d5092",
          from: userAccount,
          value: "0x2386F26FC10000",
        };
        const trans = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        });
        console.log(trans)
        toast.success("Transaction sent successfully!");
        const newCoins = coins + 4;
        setCoins(newCoins);
        localStorage.setItem("coins", newCoins);
      } else {
        toast.error("MetaMask is not installed. Please install MetaMask to proceed.");
      }
    } catch (error) {
      console.error("Error during transaction:", error);
    }
  };
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
        <button onClick={handleInvest} className="invest-button">
          <span className="button-text">Invest</span>
          <div className="button-glow"></div>
        </button>
      </div>
    </>
  );
};

const Project = () => {
  const [project, setproject] = useState([])
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });
    getProject()
  }, []);

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

  const filteredProjects = project.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="projects-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search projects by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="projects-grid">
        {filteredProjects.map((projects, index) => (
          <ProjectCard key={index} project={projects} />
        ))}
      </div>
      <Link title='Add New Project' to="/newproject" className="new-project-button">
        <div className="button-glow"></div>
        <span className="button-plus">+</span>
      </Link>
      <ToastContainer />
    </div>
  );
};

export default Project;          