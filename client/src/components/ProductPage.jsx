// This is the product page .
import React, { useEffect, useState } from "react";// React
import axios from "axios";// Axios
import { useParams } from "react-router-dom";// react-router-dom

const ProductPage = () => {
  const [product, setProduct] = useState({});// Product state
  const { id } = useParams();// Product ID from URL
  // Fetch product data 
  const getProduct = async () => {
    try {
      const res = await axios.get(`https://natcred-1.onrender.com/api/product/${id}`);
      setProduct(res.data);
      console.log(res.data)
    } catch (err) {
      console.error(err);
    }
  };
  // Fetch product data on component mount
  useEffect(() => {
    getProduct();
  }, [id]);
  // Sort shops by value
  const sortedShops = [...(product.Shops || [])].sort(
    (a, b) => a.Value - b.Value
  );

  return (
    <div className="min-h-screen bg-[#233b5d]">
      <div className="max-w-6xl mx-auto py-12 px-6">
        {/* Main Product Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12 border border-gray-100" style={{ boxShadow: "0 0 60px rgba(0, 255, 136, 0.4)" }}>
          <div className="lg:flex">
            {/* Product Image Section */}
            <div className="lg:w-2/5 p-8 bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="relative">
                <img src={product.productimage} alt={product.title} className="w-full h-80 object-cover rounded-2xl shadow-lg border-4 border-white" />
                {sortedShops[0]?.discount && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                    -{sortedShops[0].discount}% OFF
                  </div>
                )}
              </div>
            </div>
            {/* Product Details Section */}
            <div className="lg:w-3/5 p-8 flex flex-col justify-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
                {product.title}
              </h1>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">🏷️</span>
                  </div>
                  <span className="text-lg text-gray-700">
                    {sortedShops[0]?.discount}% Discount
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">📦</span>
                  </div>
                  <span className="text-lg text-gray-700">
                    {sortedShops[0]?.delivery}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                {/* Price */}
                {sortedShops.length > 0 && (
                  <div className="flex flex-col">
                    <span className="text-5xl font-bold text-green-600 mb-2">
                      ₹{sortedShops[0].Value}
                    </span>
                    <span className="text-sm text-gray-500">
                      Best price guaranteed
                    </span>
                  </div>
                )}
                {/* Store Logo & Button */}
                <div className="flex flex-col items-center space-y-4">
                  {sortedShops.length > 0 && (
                    <img src={sortedShops[0].logo} alt={sortedShops[0].name} className="w-20 h-20 object-cover rounded-full border-4 border-orange-200 shadow-md" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* All Stores Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Compare All Stores
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedShops.map((shop, index) => (
              <div key={index} className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${index === 0
                ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 shadow-lg"
                : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-xl"
                }`}>
                {index === 0 && (
                  <div className="absolute -top-3 left-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    🏆 Best Deal
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={shop.logo}
                        alt={shop.name}
                        className="w-16 h-16 rounded-2xl object-cover shadow-md border-2 border-gray-100"
                      />
                      {index === 0 && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-800">{shop.name}</h3>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-gray-900">
                            ₹{shop.Value}
                          </span>
                          <span className="text-sm text-gray-500">+ GST</span>
                        </div>
                        <p className="text-gray-600 text-sm">🚚 {shop.delivery}</p>
                        <div className="flex items-center space-x-2">
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold">
                            {shop?.discount}% OFF
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
