import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReactTypingEffect from 'react-typing-effect';
import carbon from '../assets/carbon.jpg';
import carbon3 from '../assets/carbon3.jpg';
import carbon4 from '../assets/carbon4.webp';
import carbon5 from '../assets/carbon5.jpg';
import carbon6 from '../assets/carbon6.jpg';
import carbon8 from '../assets/carbon8.jpg';
import carbon7 from '../assets/carbon7.webp';

export default function Hero() {
  const swiperRef = useRef(null);
  const images = [carbon, carbon3, carbon4, carbon5, carbon6, carbon7, carbon8];
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
      <section className="relative py-12 sm:py-16 lg:pt-20 xl:pb-0" style={{ background: 'radial-gradient(circle, #6EC207, beige)' }}
      >
        <div className="relative px-4 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 data-aos='zoom-in' className="mt-5 text-4xl font-bold leading-tight text-gray-800 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">
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
                  speed={30}       
                  eraseSpeed={40}  
                  eraseDelay={1000}
                  typingDelay={500}
                />
              </div>
            </div>
            <div className="relative inline-flex mt-10 group">
              <a data-aos='fade-left'
                href="#"
                title="Start Trading"
                className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
                role="button"
              >
                Start Trading
              </a>
              <a data-aos='fade-right'
                href="#"
                title="Contact Us"
                className="relative inline-flex ml-[30px] items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
                role="button"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
        <div data-aos='flip-up' className="mt-16 md:mt-20 flex justify-center">
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
