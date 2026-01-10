// This component used in Home for showing the start of project.
import React, { useEffect, useRef } from 'react';// React
import { Swiper, SwiperSlide } from 'swiper/react';// Swiper
import { Autoplay } from 'swiper/modules';
import ReactTypingEffect from 'react-typing-effect';// Typing Animation
import carbon from '../assets/carbon.jpg';// Images
import carbon3 from '../assets/carbon3.jpg';
import { Link } from 'react-router-dom'; // react-router-dom
import carbon4 from '../assets/carbon4.webp';
import carbon5 from '../assets/carbon5.jpg';
import carbon6 from '../assets/carbon6.jpg';
import carbon8 from '../assets/carbon8.jpg';
import carbon7 from '../assets/carbon7.webp';

export default function Hero() {
  const swiperRef = useRef(null);// Swiper State
  const images = [carbon, carbon3, carbon4, carbon5, carbon6, carbon7, carbon8];// Images
  // Swiper Effect
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (swiperRef.current) {
  //       swiperRef.current.swiper.slideNext();
  //     }
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, []);
  // bg-[#172a45]
  return (
    <>
      <section className="relative overflow-hidden py-12 sm:py-16 lg:pt-20 bg-[#233b5d]">
        <div className="relative px-4 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Header*/}
            <h1 data-aos='zoom-in' className="mt-5 text-4xl font-bold leading-tight text-green-500 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj"
              style={{ textShadow: "0 0 60px rgba(0, 255, 136, 0.4)" }}>
              Welcome To NATCRED
            </h1>
            <div className="text-center my-8">
              <div data-aos='zoom-in-down' className="text-3xl font-bold text-white">
                <ReactTypingEffect
                  text={[
                    'Buy Credits',
                    'Buy Products',
                    'Sell Credits',
                    'Sell Products',
                    'Earn Money',
                    'Invest Money',
                    'Posts Progress'
                  ]}
                  speed={30} eraseSpeed={40} eraseDelay={1000} typingDelay={500} />
              </div>
            </div>
            {/* Buttons */}
            <div className="relative inline-flex mt-10 group">
              <Link to='/projects'>
                <a data-aos="fade-left" href="#" title="Start Trading" className="relative inline-flex items-center border-green-400 border-[1px] justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-green-500 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
                  role="button"
                  style={{
                    boxShadow: "0 0 50px rgba(0, 255, 136, 0.4)"
                  }}>
                  Start Trading</a></Link>
              <Link to='/contact'>
                <a data-aos='fade-right' href="#" title="Contact Us" className="relative inline-flex ml-[30px] border-green-400 border-[1px] items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
                  role="button" style={{
                    boxShadow: "0px 0px 20px rgba(0, 255, 136, 0.4)"
                  }}>
                  Contact Us</a></Link>
            </div>
          </div>
        </div>
        {/* Images Swiper*/}
        <div data-aos="flip-up" className="relative z-20 mt-16 md:mt-20 flex justify-center">
          <Swiper modules={[Autoplay]} spaceBetween={20} slidesPerView={1} loop={true} autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }} breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}>
            {images.map((image, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <img
                  className="object-cover w-full h-[300px] rounded-xl"
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