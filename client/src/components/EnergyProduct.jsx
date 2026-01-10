import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSolarPanel } from '@fortawesome/free-solid-svg-icons';

export default function EnergyProduct() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const res = await axios.get("https://natcred-1.onrender.com/api/product");
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="py-16 bg-[#233b5d]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-center mb-6">
          <FontAwesomeIcon icon={faSolarPanel} className="text-4xl text-white" />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          Energy Innovators
        </h2>

        <p className="text-lg md:text-xl text-green-300 text-center mb-12 max-w-4xl mx-auto">
          Energy Innovators are driving the transition to sustainable energy solutions.
          They develop cutting-edge technologies, such as renewable energy systems,
          to enhance efficiency and reduce carbon footprints.
        </p>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}           // ✅ Mobile default
          spaceBetween={20}
          navigation={true}           // ✅ Arrows
          pagination={{ clickable: true }}
          loop={true}
          centeredSlides={true}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {product.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="bg-white border-[#00ff88] border-2 shadow-2xl cursor-pointer 
                rounded-xl overflow-hidden hover:shadow-[0_0_40px_rgba(0,255,136,0.3)]
                hover:-translate-y-1 hover:scale-105 transition-all duration-300"
              >
                <img
                  src={item.productimage}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  <Link
                    to={`/product/${item._id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    View Product →
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* View All */}
        <div className="text-center mt-8">
          <Link to="/product">
            <button
              className="px-6 py-3 bg-blue-600 border-green-400 border-2 text-white 
              rounded-lg hover:bg-black transition"
              style={{ boxShadow: "0px 0px 20px rgba(0, 255, 136, 0.4)" }}
            >
              View All Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
