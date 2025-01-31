// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import AOS from 'aos'
// import 'aos/dist/aos.css';

// const projects = [
//   {
//     title: "Clean Water Initiative",
//     owner: "Joe Smith",
//     amountGot: "$3,000",
//     description:
//       "Providing clean water to underdeveloped regions by setting up filtration systems and educating local communities about water conservation and water cleaning...",
//     amountRaised: "$20,000",
//     contributors: 40,
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPUnnNJwKw1pJSitiUXERVY0RcSlpusY-BbA&s",
//   },
//   {
//     title: "Eco-Friendly Packaging",
//     owner: "Bob Brown",
//     amountGot: "$1,000",
//     description:
//       "Developing sustainable packaging solutions that reduce environmental impact, including biodegradable materials and reusable packaging which will be done by using biodegradable products.",
//     amountRaised: "$5,000",
//     contributors: 20,
//     image: "https://arka360.com/ros/content/images/2023/09/ECO-FRIENDLY-PACKAGING-TIPS-2--1-.jpg",
//   },
//   {
//     title: "Preserve Me",
//     owner: "John Hazzlewood",
//     amountGot: "$3,000",
//     description:
//       "A major Initiative is taken to protect endangered species and preserve their natural habitats by    cleaning our forests from the junks or trashes that people throws in it.",
//     amountRaised: "$18,000",
//     contributors: 60,
//     image: "https://media.istockphoto.com/id/1470571303/photo/eco-activist-mother-and-daughter-cleaning-urban-trash-by-river.jpg?s=612x612&w=0&k=20&c=PqWGAYjq62lYjTZWQ6YCs_ahod8t0kV8bydCPouI91E=",
//   },
//   {
//     title: "Solar Distribution",
//     owner: "Massy",
//     amountGot: "$1,300",
//     description:
//       "Initiative to promote solar energy infrastructure, such as panels, inverters, and storage solutions, to optimize energy production and consumption. This will educate people to reduce products that emits carbon.",
//     amountRaised: "$18,000",
//     value: "$100",
//     contributors: 28,
//     image: "https://blog.feniceenergy.com/wp-content/uploads/2024/05/distribution-of-solar-energy-in-india.jpg",
//   },
//   {
//     title: "Manage Land",
//     owner: "Steve Smith",
//     amountGot: "$1,500",
//     description:
//       "Initaitaive to promote the biochar that can reduce greenhouse gas emissions by diverting organic waste from landfills, where it would decompose and release methane.",
//     amountRaised: "$12,000",
//     contributors: 45,
//     image: "https://constructive-voices.com/wp-content/uploads/2024/01/FAO-Projects-on-Sustainable-Land-Management-1170x669.jpg",
//   },
//   {
//     title: "One Tree Planted",
//     owner: "John Doe",
//     amountGot: "$2,000",
//     description:
//       "One Tree Planted encourages individuals and businesses to contribute to tree-planting initiatives through donations. Each dollar donated typically results in the planting of one tree.",
//     amountRaised: "$36,000",
//     contributors: 15,
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSodIlEGJy4R-WEK48O8k1oCjwgOAPRohENww&s",
//   },
// ];

// const ProjectCard = ({ project }) => {
//   const handleInvest = async () => {
//     try {
//       if (typeof window.ethereum !== "undefined") {
//         const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
//         const userAccount = accounts[0];
//         const transactionParameters = {
//           to: "0x4b567f404c7fd52f948e2bc8758945b3339d5092",
//           from: userAccount,
//           value: "0x2386F26FC10000",
//         };
//         const trans = await window.ethereum.request({
//           method: "eth_sendTransaction",
//           params: [transactionParameters],
//         });
//         console.log(trans)
//         alert("Transaction sent successfully!");
//       } else {
//         alert("MetaMask is not installed. Please install MetaMask to proceed.");
//       }
//     } catch (error) {
//       console.error("Error during transaction:", error);
//     }
//   };
//   return (
//     <>
//       <Link to="/your-project">
//         <button className="absolute top-[100px] right-6 bg-green-200 px-4 py-2 rounded-full text-white hover:bg-green-400" title='My Projects'>📓</button>
//       </Link>
//       <div data-aos='flip-right' className="bg-green-800 cursor-pointer text-white rounded-lg shadow-lg p-4 ml-[30px] mt-[30px] md:w-[400px]">
//         <img data-aos='fade-down' src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-t-lg" />
//         <Link to={`/projects/${projects.title}`} state={{ project }}>
//           <div className="p-4">
//             <h3 data-aos='fade-up' className="text-xl font-semibold mb-2">{project.title}</h3>
//             <p data-aos='fade-up' className="text-sm mb-2">by {project.owner}</p>
//             <p data-aos='fade-up' className="text-sm mb-4">{project.description}</p>
//             <div className="text-lg font-bold mb-2">{project.amountRaised}</div>
//             <div className="text-sm text-gray-300 mb-4">
//               {project.contributors} Carbon Credits
//             </div>
//             <div className="flex justify-between items-center">
//               <button onClick={handleInvest} className="bg-green-700 text-white px-4 py-2 hover:bg-green-900 rounded-lg">
//                 Invest
//               </button>
//             </div>
//           </div>
//           </Link>
//       </div>
//     </>
//   );
// };

// const Project = () => {
//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//   }, []);
//   return (
//     <div className="min-h-screen p-8" style={{ background: 'radial-gradient(circle,#8FD14F,beige)' }}>
//       <div className="flex flex-wrap justify-center">
//         {projects.map((project, index) => (
//           <ProjectCard key={index} project={project} />
//         ))}
//       </div>
//       <Link to="/newproject">
//         <button
//           className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gray-500 text-white text-3xl font-bold flex items-center justify-center shadow-lg hover:bg-black transition-colors duration-200"
//           aria-label="Add New Project" title='Add New Project'>
//           +
//         </button></Link>
//     </div>
//   );
// };

// export default Project;          





import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos'
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
    title: "Eco-Friendly Packaging",
    owner: "Bob Brown",
    amountGot: "$1,000",
    description:
      "Developing sustainable packaging solutions that reduce environmental impact, including biodegradable materials and reusable packaging which will be done by using biodegradable products.",
    amountRaised: "$5,000",
    contributors: 20,
    image: "https://arka360.com/ros/content/images/2023/09/ECO-FRIENDLY-PACKAGING-TIPS-2--1-.jpg",
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
  {
    title: "Solar Distribution",
    owner: "Massy",
    amountGot: "$1,300",
    description:
      "Initiative to promote solar energy infrastructure, such as panels, inverters, and storage solutions, to optimize energy production and consumption. This will educate people to reduce products that emits carbon.",
    amountRaised: "$18,000",
    value: "$100",
    contributors: 28,
    image: "https://blog.feniceenergy.com/wp-content/uploads/2024/05/distribution-of-solar-energy-in-india.jpg",
  },
  {
    title: "Manage Land",
    owner: "Steve Smith",
    amountGot: "$1,500",
    description:
      "Initaitaive to promote the biochar that can reduce greenhouse gas emissions by diverting organic waste from landfills, where it would decompose and release methane.",
    amountRaised: "$12,000",
    contributors: 45,
    image: "https://constructive-voices.com/wp-content/uploads/2024/01/FAO-Projects-on-Sustainable-Land-Management-1170x669.jpg",
  },
  {
    title: "One Tree Planted",
    owner: "John Doe",
    amountGot: "$2,000",
    description:
      "One Tree Planted encourages individuals and businesses to contribute to tree-planting initiatives through donations. Each dollar donated typically results in the planting of one tree.",
    amountRaised: "$36,000",
    contributors: 15,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSodIlEGJy4R-WEK48O8k1oCjwgOAPRohENww&s",
  },
];

const ProjectCard = ({ project }) => {
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
        alert("Transaction sent successfully!");
      } else {
        alert("MetaMask is not installed. Please install MetaMask to proceed.");
      }
    } catch (error) {
      console.error("Error during transaction:", error);
    }
  };
  return (
    <>
      <div 
      className="project-card"
      data-aos='flip-right'
    >
      <div className="card-glow"></div>
      <img 
        src={project.image} 
        alt={project.title} 
        className="project-image"
        data-aos='fade-down'
      />
      
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

        <button 
          onClick={handleInvest} 
          className="invest-button"
        >
          <span className="button-text">Invest</span>
          <div className="button-glow"></div>
        </button>
      </Link>
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
    </div>
  );
};


export default Project;          