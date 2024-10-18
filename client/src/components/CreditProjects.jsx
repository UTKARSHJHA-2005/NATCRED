import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';


export default function CreditProjects() {
  const projects = [
    { title: 'Plastic Waste-to-Energy', description: 'By converting waste into energy, it provides a sustainable waste management solution but also contribute to energy security and reduce reliance on fossil fuels.It provides fuels that can be used to power vehicles, generate electricity, or as feedstock for petrochemical production. ', image: 'src/assets/pro1.jpg' },
    { title: 'BioChar', description: ' the production of biochar can reduce greenhouse gas emissions by diverting organic waste from landfills, where it would decompose and release methane. It mainly focusses on sustainable land management, carbon offsetting, and soil enhancement.', image: 'src/assets/pro2.jpg' },
    { title: 'Fleet Electrification', description: 'Fleet electrification includes lower operational costs due to reduced fuel expenses, decreased maintenance requirements, and potential incentives or subsidies from government programs to support clean transportation.It improves sustainable urban development.', image: 'src/assets/pro3.jpg' },
    { title: 'Solar Farm', description: 'Solar projects often involve the development of solar energy infrastructure, such as panels, inverters, and storage solutions, to optimize energy production and consumption.It is critical to achieving global climate goals and advancing energy independence.', image: 'src/assets/pro4.jpg' },
    { title: 'One Tree Planted', description: 'One Tree Planted encourages individuals and businesses to contribute to tree-planting initiatives through donations. Each dollar donated typically results in the planting of one tree, making it a straightforward and impactful way to support reforestation. ', image: 'src/assets/pro5.jpg' },
  ];

  return (
    <section className="py-16 bg-gray-100" style={{ background: 'radial-gradient(circle, #95d5b2, #52b788)' }}>        <div className="container mx-auto px-6">
      <div className="flex justify-center mb-6">
        <FontAwesomeIcon icon={faCreditCard} className="text-4xl text-black" />
      </div>
      <h2 className="text-4xl font-bold text-center mb-6">Credit Reduction Projects</h2>
      <p className="text-xl text-center mb-12">
        Unlocking a Low-Carbon Economy: Project Opportunities
      </p>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={3}
        navigation pagination={{ clickable: true }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <a href="#" className="text-blue-600 hover:underline">View Project →</a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="text-center mt-8">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-black">
          View All Projects
        </button>
      </div>
    </div>
    </section>
  );
}
