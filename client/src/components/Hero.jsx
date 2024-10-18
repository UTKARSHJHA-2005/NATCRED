import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
import carbon from '../assets/carbon.jpg';
import carbon3 from '../assets/carbon3.jpg';
import carbon4 from '../assets/carbon4.webp';
import carbon5 from '../assets/carbon5.jpg';
import carbon6 from '../assets/carbon6.jpg';
import carbon8 from '../assets/carbon8.jpg';
import carbon7 from '../assets/carbon7.webp';

export default function Hero() {
  const swiperRef = useRef(null);
  const images = [carbon, carbon3, carbon4,carbon5,carbon6,carbon7,carbon8];
  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current) {
        swiperRef.current.swiper.slideNext();
      }
    }, 2000); 
    return () => clearInterval(interval); 
  }, []);
  return (
    <>
      <section className="relative py-12 sm:py-16 lg:pt-20 xl:pb-0 bg-gray-300">
        <div className="relative px-4 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-800 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">
              Welcome To EcoCred
            </h1>
            <p className="max-w-xl mx-auto mt-6 text-base leading-7 text-gray-700 font-inter">
              The premier online platform for carbon credit trading. Buy, sell and trade carbon credits with confidence, and join the global movement towards a low-carbon economy.
            </p>
            <div className="relative inline-flex mt-10 group">
              <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#0575E6] to-[#29ffc6] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
              <a
                href="#"
                title="Start Trading"
                className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
              >
                Start Trading
              </a>
              <a
                href="#"
                title="Contact Us"
                className="relative inline-flex ml-[30px] items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
        <div className="mt-16 md:mt-20 flex justify-center">
          <Swiper
            ref={swiperRef}
            spaceBetween={10}
            slidesPerView={3} 
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}>
            {images.map((image, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <img
                  className="object-cover object-top w-full h-[300px] rounded-lg" 
                  src={image}
                  alt={`Slide ${index + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
