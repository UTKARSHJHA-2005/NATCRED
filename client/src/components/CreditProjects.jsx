import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';// Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import axios from 'axios';// Axios
import { Link } from 'react-router-dom';// Routing
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';// Icons
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';// Icons 
import AOS from 'aos';// Animation
import 'aos/dist/aos.css';

export default function CreditProjects() {
  const [project, setProject] = useState([]); // Project State

  // Animations and Project Fetching at backside
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    getProject();
  }, []);

  // Project Fetching Function
  const getProject = async () => {
    try {
      const res = await axios.get("https://natcred-1.onrender.com/api/project");
      setProject(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="py-16 bg-[#233b5d]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-center mb-6">
          <FontAwesomeIcon icon={faCreditCard} className="text-4xl text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 text-center mb-4">
          Credit Reduction Projects
        </h2>
        <p className="text-lg md:text-xl text-center mb-12 text-green-300">
          Unlocking a Low-Carbon Economy: Project Opportunities
        </p>
        {/* Swiper */}
        <Swiper key={project.length} modules={[Navigation, Pagination]} slidesPerView={1} spaceBetween={20}
          navigation={true} pagination={{ clickable: true }} loop={true} breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }} className='pb-10'>
          {project.map((project, index) => (
            <SwiperSlide key={index}>
              <div
                className="bg-white border-[#00ff88] border-2 shadow-2xl cursor-pointer 
                rounded-xl overflow-hidden hover:shadow-[0_0_40px_rgba(0,255,136,0.3)]
                hover:-translate-y-1 hover:scale-105 transition-all duration-300"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>

                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {project.content}
                  </p>

                  <Link
                    to={`/projects/${project._id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    View Project →
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* View All */}
        <div className="text-center mt-8">
          <Link to="/projects">
            <button className="px-6 py-3 bg-blue-600 border-green-400 border-2 text-white rounded-lg hover:bg-black transition">
              View All Projects
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
