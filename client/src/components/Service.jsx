import React, { useEffect } from "react";
import { FaFingerprint, FaBolt, FaMoon, FaShieldAlt, FaHeadset } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';

const features = [
  {
    icon: <FaFingerprint className="text-blue-600 w-7 h-7" aria-label="Fingerprint icon" />,
    title: "Reliable Transfers",
    description:
      "Enjoy seamless and secure money transfers with our brilliant technology ensuring your transactions are always safe and efficient.",
  },
  {
    icon: <FaBolt className="text-orange-600 w-8 h-8" aria-label="Lightning bolt icon" />,
    title: "Instant Notifications",
    description:
      "Stay informed with instant notifications on carbon prices activity, ensuring you are always aware of carbon credits.",
  },
  {
    icon: <FaMoon className="text-green-600 w-8 h-8" aria-label="Moon icon" />,
    title: "User-Friendly Interface",
    description:
      "Experience our intuitive and easy-to-use interface designed to provide a smooth and enjoyable user experience for all your payment needs.",
  },
  {
    icon: <FaHeadset className="text-purple-600 w-8 h-8" aria-label="Headset icon" />,
    title: "Tradeassure",
    description:
      "Get assistance anytime with our dedicated Tradeassure team, always ready to help you with any issues or inquiries you may have.",
  },
  {
    icon: (
      <svg
        className="text-gray-600 w-9 h-9"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-label="Customizable plans icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14m0-4v8m0-8L9.447 7.724A2 2 0 008 9.618v4.764a2 2 0 001.553 1.894L15 14m0-4H9m6 0v8m0-8L9 14"
        />
      </svg>
    ),
    title: "Customizable Plans",
    description:
      "Choose from a variety of plans and customize them to suit your needs, ensuring you only pay for what you use.",
  },
  {
    icon: <FaShieldAlt className="text-yellow-600 w-8 h-8" aria-label="Shield icon" />,
    title: "Advanced Security",
    description:
      "Protect your data with our advanced security protocols and encryption, ensuring your data is always secure.",
  },
];

const commonStyle = "relative flex items-center justify-center mx-auto";

const Service = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="py-10 sm:py-16 lg:py-18" style={{ background: 'radial-gradient(circle,#8FD14F,beige)'}}>
      <p data-aos="fade-down" className="text-3xl text-center mb-[30px] font-semibold leading-tight text-gray-900 sm:text-4xl xl:text-5xl font-pj">Take the step without<br/> any hassle & get results faster</p>
      <br />
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div data-aos="fade-up" className="grid grid-cols-1 gap-12 text-center sm:grid-cols-2 md:grid-cols-3 lg:gap-y-16">
          {features.map((feature, index) => (
            <div key={index}>
              <div className={commonStyle}>
                <div className="bg-gray-100 w-16 h-16 flex items-center justify-center rounded-full">
                  {feature.icon}
                </div>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">
                {feature.title}
              </h3>
              <p className="mt-4 text-base text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
