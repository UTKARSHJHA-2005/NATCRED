import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { RxArrowTopRight } from "react-icons/rx";
import { HR } from "flowbite-react";
import { Link } from "react-router-dom";

export const products = [
    {
        title: 'Solar Cookers',
        image: 'https://m.media-amazon.com/images/I/41vdoNAC62L.jpg',
        reviews: '4',
        price: '₹7,698',
        discount: '50% off',
        delivery: 'FREE delivery',
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwLk4-3xOKJNnZmp1foAKi7sZg7mjLe0Xo4g&s",
    },
    {
        title: 'Solar-Powered Chargers',
        image: 'https://www.travelandleisure.com/thmb/XHgyV_TF04Si7z3eABftAQYbTtA=/fit-in/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/blavor-10000mah-solar-charger-power-bank-91a85c40622e42058d20104229b02454.jpg',
        reviews: '4.2',
        price: '₹6,799',
        discount: '60% off',
        delivery: 'FREE delivery',
        icon: "https://images.squarespace-cdn.com/content/v1/658304bceabeda35f23becd0/1720661585967-MLTT7A3QAFDDTW413KIH/Etsy",
    },
    {
        title: 'Plant-Based Biodegradable Cutlery',
        image: 'https://image.made-in-china.com/226f3j00zSkIAbdqQOGM/Watsonpak-Natural-Plant-Based-Biodegradable-Food-Packaging-Wholesale-Sugarcane-Fiber-Bagasse-Pulp-Disposable-Tableware-Manufacturer-with-Napkin.webp',
        reviews: '3.8',
        price: '₹8,299',
        discount: '55% off',
        delivery: 'FREE delivery',
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROZbTOjxyGFPG-ih9jbHOw7Ps78-m70fLhVg&s",
    },
    {
        title: 'Smart Thermostats',
        image: 'https://m.media-amazon.com/images/I/51qozB9MtpL._AC_UF1000,1000_QL80_.jpg',
        reviews: '4.2',
        price: '₹6,999',
        discount: '40% off',
        delivery: 'FREE delivery',
        icon: "https://play-lh.googleusercontent.com/H_VVVQduGJEUfofF5YPszdTJVqqT46SoY-B9fIGxWHPCBH5gPGDtvbGgs3qebzNFdrS_=w240-h480-rw",
    },
    {
        title: 'Solar Panels(100x50)',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM-uy4ynStbHk3EsdYgNGC3dhrlvesf_ZuAg&s',
        reviews: '4.3',
        price: '₹6,299',
        discount: '64% off',
        delivery: 'FREE delivery',
        icon: "https://play-lh.googleusercontent.com/RxKsfT6TbB7c51BCyRwqx6mZCejuV0cs9VckJpoNlFmqyYybNlRGTdaE2QWZPrQkVQ",
    },
];

const Product1 = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchTerm]);

    return (
        <div className="flex flex-col">
            <div className="flex justify-center my-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-[95%] px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                    <React.Fragment key={index}>
                        <HR.Trimmed style={{ border: '0.5px solid green', margin: '5px', width: '100%' }} />
                        <Link
                            to={`/product/${product.title}`}
                            state={{ product }}>
                            <div
                                className="cursor-pointer flex flex-col md:flex-row rounded-lg shadow-md p-6"
                                style={{ background: '#D1FFBD' }}>
                                <img data-aos="flip-up"
                                    src={product.image}
                                    alt={product.title}
                                    className="w-[400px] h-[250px] object-cover rounded-lg mb-4 md:mb-0 md:mr-4" />
                                <div className="flex flex-col gap-3">
                                    <h3 data-aos="zoom-in" className="text-lg font-bold">
                                        {product.title}
                                    </h3>
                                    <div className="flex items-center">
                                        🚚 <span data-aos="zoom-in-up" className="text-sm ml-1">
                                            {product.delivery}
                                        </span>
                                    </div>
                                    <p>{product.price}</p>
                                    <button className="flex flex-row bg-yellow-500 ml-[230px] text-white hover:bg-stone-700 font-bold py-3 px-60 rounded-full text-sm mt-[90px] self-start">
                                        Buy Now
                                        <RxArrowTopRight className="ml-2 mt-1 h-4 w-4 font-semibold text-blue-800 transition-all duration-200 group hover:text-blue-700 hover:underline" />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </React.Fragment>
                ))
            ) : (
                <p className="text-center text-gray-500 mt-4">No products found</p>
            )}
        </div>
    );
};

export default Product1;
