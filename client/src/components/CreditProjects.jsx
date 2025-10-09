// This is the component used in home page for showing projects.
import React, { useEffect,useState } from 'react';// React
import { Swiper, SwiperSlide } from 'swiper/react'; // Swiper
import 'swiper/css';
import axios from 'axios'; // Axios
import { Link } from 'react-router-dom'; // React Router
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';// Icon
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';// Icon
import AOS from 'aos'// Animation
import 'aos/dist/aos.css';

export default function CreditProjects() {
  const [project,setproject]=useState([]) // State for storing projects
  // Animation and project details
    useEffect(() => {
      AOS.init({ duration: 1000 });
      getProject()
    }, []);
  
    // Getting project details from DB through axios.
    const getProject=async()=>{
      try {
        const res=await axios.get("https://natcred-1.onrender.com/api/project")
        const data=res.data;
        setproject(data)
        console.log(data)
      }catch(err){
        console.log(err)
      }
    }
  
  return (
    <section className="py-16 bg-gray-100" style={{ background: '#233b5d' }}>
      <div className="container mx-auto px-6">
        {/* Header*/}
        <div className="flex justify-center mb-6">
          <FontAwesomeIcon icon={faCreditCard} className="text-4xl text-white" />
        </div>
        <h2 data-aos='flip-left' className="text-4xl font-bold text-slate-100 text-center mb-6">Credit Reduction Projects</h2>
        <p data-aos='flip-right' className="text-xl text-center mb-12 text-green-300">
          Unlocking a Low-Carbon Economy: Project Opportunities
        </p>
        {/* Projects */}
        <Swiper modules={[Navigation, Pagination]} spaceBetween={30} slidesPerView={3} navigation pagination={{ clickable: true }} loop={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}>
          {project.map((project, index) => (
            <SwiperSlide key={index}>
              <div
                className="bg-white border-[#00ff88] border-[2px] shadow-2xl cursor-pointer rounded-lg overflow-hidden hover:shadow-[0_0_40px_rgba(0,255,136,0.3)] 
                hover:-translate-y-1 hover:scale-105 transition-transform duration-300">
                <img data-aos='fade-down' src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                <div data-aos='flip-left' className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-700 mb-4">{project.content}</p>
                  <a href="#" className="text-blue-600 hover:underline">View Project →</a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* View All Projects Button */}
        <div className="text-center mt-8">
          <Link to="/projects">
            <button data-aos='flip-right' className="px-4 py-2 bg-blue-600 border-green-400 border-[2px] text-white rounded-lg hover:bg-black" style={{
              boxShadow: "0px 0px 20px rgba(0, 255, 136, 0.4)"
            }}>
              View All Projects
            </button>
          </Link>
        </div>
      </div>
    </section >
  );
}
