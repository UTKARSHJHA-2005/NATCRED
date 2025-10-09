// This si the component used in Home for products.
import React, { useEffect,useState } from 'react';// React
import { Swiper, SwiperSlide } from 'swiper/react';// Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';// Axios
import AOS from 'aos';// Animation
import 'aos/dist/aos.css';
import { Navigation, Pagination } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';// Icon
import { faSolarPanel } from '@fortawesome/free-solid-svg-icons';// Icon

export default function EnergyProduct() {
  const [product,setproduct]=useState([]);// Product State
  // Animation and product details
  useEffect(() => {
    AOS.init({ duration: 1000 });
    getProduct();
  }, []);
  // Fetching product details form DB.
  const getProduct = async () => {
    try {
      const res = await axios.get("https://natcred-1.onrender.com/api/product");
      const data = res.data;
      setproduct(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="py-16" style={{ background: '#233b5d' }}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div data-aos='slip-down' className="flex justify-center mb-6">
          <FontAwesomeIcon icon={faSolarPanel} className="text-4xl text-white" />
        </div>
        <h2 data-aos='fade-down' className="text-4xl font-bold text-white text-center mb-6">Energy Innovators</h2>
        <p data-aos='fade-down' className="text-xl text-green-300 text-center mb-12">
          Energy Innovators are driving the transition to sustainable energy solutions.
          They develop cutting-edge technologies, such as renewable energy systems,
          to enhance efficiency and reduce carbon footprints.
        </p>
        {/* Products */}
        <Swiper modules={[Navigation, Pagination]} spaceBetween={30} slidesPerView={3} navigation pagination={{ clickable: true }} loop={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}>
          {product.map((project, index) => (
            <SwiperSlide key={index}>
              <div data-aos='slip-down' className="bg-white border-[#00ff88] border-[2px] shadow-2xl cursor-pointer rounded-lg overflow-hidden hover:shadow-[0_0_40px_rgba(0,255,136,0.3)] 
                hover:-translate-y-1 hover:scale-105 transition-transform duration-300">
                <img data-aos='fade-down' src={project.productimage} alt={`Image of ${project.title}`} className="w-full h-48 object-cover" />
                <div data-aos='flip-right' className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  <a href="#" className="text-blue-600 hover:underline">View Product →</a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* View All Button */}
        <div data-aos='slip-left' className="text-center mt-8">
          <button className="px-4 py-2 bg-blue-600 border-green-400 border-[2px] text-white rounded-lg hover:bg-black" style={{
            boxShadow: "0px 0px 20px rgba(0, 255, 136, 0.4)"
          }}>
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
