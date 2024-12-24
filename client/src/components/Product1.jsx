import React,{useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Product1 = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
    const products = [
        {
            title: 'Solar Cookers',
            image: 'https://m.media-amazon.com/images/I/41vdoNAC62L.jpg',
            reviews: '5,312',
            price: '₹7,698',
            discount: '50% off',
            delivery: 'FREE delivery',
        },
        {
            title: 'Solar-Powered Chargers',
            image: 'https://www.travelandleisure.com/thmb/XHgyV_TF04Si7z3eABftAQYbTtA=/fit-in/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/blavor-10000mah-solar-charger-power-bank-91a85c40622e42058d20104229b02454.jpg',
            reviews: '2,078',
            price: '₹6,799',
            discount: '60% off',
            delivery: 'FREE delivery',
        },
        {
            title: 'Plant-Based Biodegradable Cutlery',
            image: 'https://image.made-in-china.com/226f3j00zSkIAbdqQOGM/Watsonpak-Natural-Plant-Based-Biodegradable-Food-Packaging-Wholesale-Sugarcane-Fiber-Bagasse-Pulp-Disposable-Tableware-Manufacturer-with-Napkin.webp',
            reviews: '2,078',
            price: '₹8,599',
            discount: '55% off',
            delivery: 'FREE delivery',
        },
        {
            title: 'Smart Thermostats',
            image: 'https://m.media-amazon.com/images/I/51qozB9MtpL._AC_UF1000,1000_QL80_.jpg',
            reviews: '2,078',
            price: '₹899',
            discount: '40% off',
            delivery: 'FREE delivery',
        },
        {
            title: 'Solar Panels(100x50)',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM-uy4ynStbHk3EsdYgNGC3dhrlvesf_ZuAg&s',
            reviews: '2,078',
            price: '₹999',
            discount: '64% off',
            delivery: 'FREE delivery',
        },
    ];

    return (
        <div className="flex flex-col">
            {products.map((product, index) => (
                <div key={index} className="flex flex-col mt-4 md:flex-row rounded-lg shadow-md p-4" style={{ background: '#D1FFBD' }}>
                    <img data-aos='flip-up'
                        src={product.image}
                        alt={product.title}
                        className="w-[400px] h-[250px] object-cover rounded-lg mb-4 md:mb-0 md:mr-4"/>
                    <div className="flex flex-col justify-between flex-grow">
                        <div>
                            <h3 data-aos='zoom-in' className="text-lg font-bold mb-2">{product.title}</h3>
                            <div className="flex items-center mb-2">
                                <div className="flex items-center">
                                    <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 20 20">
                                        <path d="M9.07 8.25a3 3 0 015.16 0l.75.75a3 3 0 01-5.16 5.16l-.75-.75a3 3 0 010-5.16zm-5.16 0a3 3 0 015.16 0l.75.75a3 3 0 01-5.16 5.16l-.75-.75a3 3 0 010-5.16zm6.32 6.32a3 3 0 01-4.24 4.24l-.75-.75a3 3 0 014.24-5.16l.75.75a3 3 0 01-5.16 5.16zm-4.24 4.24a3 3 0 014.24 4.24l-.75-.75a3 3 0 01-5.16 5.16l.75.75a3 3 0 014.24-5.16z"></path>
                                    </svg>
                                    <span data-aos='zoom-in-up' className="text-sm ml-1">{product.reviews}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span data-aos='flip-right' className="text-lg font-bold text-red-500">{product.price}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-gray-500">{product.delivery}</p>
                            </div>
                        </div>
                        <button className="bg-yellow-500 ml-[230px] text-white hover:bg-stone-700 font-bold py-3 px-60 rounded-full text-sm mt-2 self-start">
                            Add to cart
                        </button>
                        {product.extraInfo && <p className="text-gray-500 mt-2">{product.extraInfo}</p>}
                    </div>
                    <button
                        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gray-400 text-white text-3xl font-bold flex items-center justify-center shadow-lg hover:bg-black"
                        aria-label="Want to sell your nature friendly product"
                        title="Want to sell your nature friendly product">
                        +
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Product1;
