import React from "react";
import { FiTwitter, FiFacebook, FiInstagram } from "react-icons/fi";
import logo from '../assets/LOGO.png'

const TwitterIcon = () => <FiTwitter className="w-6 h-6" />;
const FacebookIcon = () => <FiFacebook className="w-6 h-6" />;
const InstagramIcon = () => <FiInstagram className="w-6 h-6" />;

const Footer = () => {
  const anchorStyles =
    "text-sm text-black transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80 cursor-pointer";

  return (
    <section className="py-12 bg-gray-300">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center xl:flex xl:items-center xl:justify-between xl:text-left">
          <div className="xl:flex xl:items-center xl:justify-start">
            <img
              className="w-auto mx-auto h-7"
              src={logo}
              alt="EcoCred"
            />
            <p className="mt-5 text-sm text-black xl:ml-6 xl:mt-0">
              © Copyright 2024 EcoCred
            </p>
          </div>
          <div className="items-center mt-8 xl:mt-0 xl:flex xl:justify-end xl:space-x-8">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 xl:justify-end">
              <li>
                <a href="/MarketPlace" className={anchorStyles}>
                  MarketPlace
                </a>
              </li>
              <li>
                <a href="/Products" className={anchorStyles}>
                  Products
                </a>
              </li>
              <li>
                <a href="/Projects" className={anchorStyles}>
                  Projects
                </a>
              </li>
              <li>
                <a href="/privacy" className={anchorStyles}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className={anchorStyles}>
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/support" className={anchorStyles}>
                  Support
                </a>
              </li>
            </ul>
            <div className="w-full h-px mt-8 mb-5 xl:w-px xl:m-0 xl:h-6 bg-gray-50/20"></div>
            <ul className="flex items-center justify-center space-x-8 xl:justify-end">
              <li>
                <a
                  href="https://twitter.com"
                  title="Twitter"
                  className="block text-black transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  title="Facebook"
                  className="block text-black transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  title="Instagram"
                  className="block text-black transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
