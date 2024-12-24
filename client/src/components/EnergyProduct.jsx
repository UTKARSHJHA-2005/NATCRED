import React,{useEffect} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Navigation, Pagination } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSolarPanel } from '@fortawesome/free-solid-svg-icons';

export default function EnergyProduct() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const projects = [
    { title: 'Smart Thermostats', description: 'Smart thermostats, allow users to optimize heating and cooling in their homes. These devices learn user behavior and adjust temperatures accordingly, ensuring energy is used efficiently. They can be controlled remotely via smartphones, enabling users to manage their energy consumption. ', image: 'src/assets/prod1.jpg' },
    { title: 'Energy-Efficient Appliances', description: 'Energy Star-certified appliances, such as refrigerators, washing machines, and dishwashers, are designed to use less energy and water compared to standard models. These appliances are rigorously tested to ensure they meet energy efficiency guidelines set by the Environmental Protection Agency (EPA).', image: 'src/assets/prod2.jpg' },
    { title: 'Smart Power Strips', description: 'Smart power strips help reduce "phantom" energy consumption, which occurs when electronics are plugged in but not in use. These strips can automatically cut power to devices when they enter standby mode, preventing energy waste. The households can save energy and reduce their electricity bills.', image: 'src/assets/prod4.jpg' },
    { title: 'Home Energy Storage Systems', description: 'Home energy storage systems, such as the Tesla Powerwall, store excess energy generated from solar panels or the grid for later use. This technology allows homeowners to utilize renewable energy even when the sun is not shining, reducing reliance on fossil fuels and lowering energy costs. ', image: 'src/assets/prod3.jpg' },
    { title: 'Solar Panels', description: 'Solar panels convert sunlight into electricity, providing a renewable energy source for homes and businesses. By installing solar photovoltaic (PV) systems, users can generate their own electricity, reducing reliance on fossil fuels and lowering energy costs. It is a viable option for reducing carbon footprints ', image: 'src/assets/prod5.png' },
  ];

  return (
    <section className="py-16" style={{ background: 'radial-gradient(circle,#A2CA71,beige)'}}>
      <div className="container mx-auto px-6">
        <div data-aos='slip-down' className="flex justify-center mb-6">
          <FontAwesomeIcon icon={faSolarPanel} className="text-4xl text-black" />
        </div>
        <h2 data-aos='fade-down' className="text-4xl font-bold text-center mb-6">Energy Innovators</h2>
        <p data-aos='fade-down' className="text-xl text-center mb-12">
          Energy Innovators are pioneers driving the transition to sustainable energy solutions.
          They develop cutting-edge technologies, such as renewable energy systems and smart grids,
          to enhance efficiency and reduce carbon footprints.
        </p>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <div data-aos='slip-down' className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img data-aos='fade-down' src={project.image} alt={`Image of ${project.title}`} className="w-full h-48 object-cover" />
                <div data-aos='flip-right' className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  <a href="#" className="text-blue-600 hover:underline">View Product →</a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div data-aos='slip-left' className="text-center mt-8">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-black">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
