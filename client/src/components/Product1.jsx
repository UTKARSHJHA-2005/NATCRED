// This is the component used in the Product Page for showing the products.
import { useEffect, useState } from 'react';// React
import AOS from 'aos';// Animation
import 'aos/dist/aos.css';
import { RxArrowTopRight } from "react-icons/rx";// Icons
import axios from 'axios';// Axios
import { Link } from "react-router-dom";// Routing

const Product1 = () => {
    const [product, setproduct] = useState([]);// Product State
    const [searchTerm, setSearchTerm] = useState("");// Searching
    const [filteredProducts, setFilteredProducts] = useState([]);// Filter State
    // Animation with fetching function
    useEffect(() => {
        AOS.init({ duration: 1000 });
        getProduct();
    }, []);
    // Filtering
    useEffect(() => {
        const filtered = product.filter((p) =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchTerm, product]);
    // Fetching Products
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
        <div className="flex flex-col bg-[#233b5d]">
            {/* Search Bar with Add Product Button */}
            <div className="flex justify-center my-4 w-full">
                <div className="flex w-[90%]">
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search products..."
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg shadow-sm focus:outline-none focus:ring-2" />
                    <Link to="/new-product" title='Add New Product or Shop'
                        className="w-[60px] h-[50px] bg-[#00ff88] hover:animate-pulse flex items-center justify-center cursor-pointer shadow-[0_0_25px_rgba(0,255,136,0.5)] transition duration-300 ease-in-out hover:scale-110 rounded-r-lg">
                        <span className="text-black text-3xl font-bold">+</span>
                    </Link>
                </div>
            </div>
            {/* Products with best(Cheap) Price */}
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => {
                    let bestShop = null;
                    if (product.Shops && product.Shops.length > 0) {
                        bestShop = product.Shops.reduce((min, shop) =>
                            shop.Value < min.Value ? shop : min
                        );
                    }
                    return (
                        <Link key={index} to={`/product/${product._id}`} state={{ product }}>
                            <div className="cursor-pointer border-green-600 shadow-green-300 border-2 flex flex-col md:flex-row rounded-lg shadow-lg p-6 my-3 items-center relative max-w-full overflow-hidden"
                                style={{ background: '#233b5d' }}>
                                <img
                                    src={product.productimage}
                                    alt={product.title}
                                    className="w-[400px] h-[250px] object-cover rounded-lg mb-4 md:mb-0 md:mr-4"
                                />
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-2xl font-bold text-white">
                                        {product.title}
                                    </h3>
                                    {bestShop && (
                                        <p className="text-white font-serif text-[20px] font-semibold">
                                            Best Price: ₹{bestShop.Value}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Link>
                    );
                })
            ) : (
                <p className="text-center text-gray-500 mt-4">No products found</p>
            )}
        </div>
    );
};

export default Product1;
