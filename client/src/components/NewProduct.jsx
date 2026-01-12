// This is the page where creates the product or shop.
import axios from "axios";// Axios
import React, { useEffect, useState } from "react";// React
import { Upload, Package, Globe, DollarSign, Link, Percent, Clock, Check, Star, Sparkles } from "lucide-react";// Icons
import { useNavigate } from "react-router-dom";// Routing
import { ToastContainer, toast } from 'react-toastify';

export default function NewProduct() {
    const [customProduct, setCustomProduct] = useState(false);// New product state
    const [imageFile, setImageFile] = useState(null);// Image State 
    const [logoFile, setLogoFile] = useState(null);// Logo State
    const [isSubmitting, setIsSubmitting] = useState(false);// Submit State
    // Form State
    const [formData, setFormData] = useState({
        title: "",
        website: "",
        Value: "",
        link: "",
        logo: "",
        productimage: "",
        discount: "",
        deliverytime: "",
    });
    const [product, setproduct] = useState([])// Already ahve product state
    const navigate = useNavigate()// Navigation
    // Handle Change in form data
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    // Handle Image Upload
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const data = new FormData();
        data.append("productimage", file);
        try {
            const res = await axios.post("https://natcred-1.onrender.com/uploadprodimage", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setFormData({ ...formData, productimage: res.data.url });
            setImageFile(file);
        } catch (err) {
            console.error("❌ Image upload failed:", err);
        }
    };
    // Fetching product details from DB.
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("https://natcred-1.onrender.com/api/product");
                setproduct(res.data);
                console.log(res.data);
            } catch (err) {
                console.error("❌ Error fetching products:", err);
            }
        };
        fetchProducts();
    }, []);
    // Handle Logo Upload
    const handleLogoChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const data = new FormData();
        data.append("logo", file);
        try {
            const res = await axios.post("https://natcred-1.onrender.com/uploadLogo", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setFormData({ ...formData, logo: res.data.url });
            setLogoFile(file);
        } catch (err) {
            console.error("❌ Logo upload failed:", err);
        }
    };

    // Submit form(for Product and Shop both)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const existingProduct = product.find(p => p.title === formData.title);
            if (existingProduct) {
                const updatedShops = [
                    ...existingProduct.Shops,
                    {
                        name: formData.website,
                        discount: formData.discount,
                        delivery: formData.deliverytime,
                        Value: formData.Value,
                        link: formData.link,
                        logo: formData.logo,
                    }
                ];
                const res = await axios.put(`https://natcred-1.onrender.com/api/product/${existingProduct._id}`,
                    {
                        title: existingProduct.title,
                        productimage: existingProduct.productimage,
                        Shops: updatedShops,
                    },
                    { headers: { "Content-Type": "application/json" } }
                );
                console.log("✅ Shop added to existing product:", res.data);
                toast.success("Shop added to existing product!");
            } else {
                // create new product
                const payload = {
                    title: formData.title,
                    productimage: formData.productimage,
                    Shops: [
                        {
                            name: formData.website,
                            discount: formData.discount,
                            delivery: formData.deliverytime,
                            Value: formData.Value,
                            link: formData.link,
                            logo: formData.logo,
                        }
                    ]
                };
                const res = await axios.post("https://natcred-1.onrender.com/api/product", payload, {
                    headers: { "Content-Type": "application/json" }
                });
                console.log("✅ New Product Added:", res.data);
                toast.success("New Product Added Successfully!");
            }
            navigate('/Product');
        } catch (err) {
            console.error("❌ Error uploading product:", err);
            toast.error("Error uploading product!");
        }
    };

    return (
        <div className="min-h-screen bg-[#233b5d] p-6 flex items-center justify-center">
            <div className="w-full max-w-2xl">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Add New Product
                    </h1>
                </div>
                {/* Main Form */}
                <form onSubmit={handleSubmit} className="bg-slate-900/50 shadow-[#00ff88] backdrop-blur-xl rounded-3xl border border-[#00ff88] shadow-md p-8 space-y-6">
                    {/* Product Title Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 mb-3">
                            <Package className="w-5 h-5 text-purple-400" />
                            <label className="text-white font-semibold">Product Selection</label>
                        </div>
                        {customProduct ? (
                            <div className="relative">
                                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter your amazing product title"
                                    className="w-full p-4 pl-12 rounded-2xl bg-slate-800/70 text-white border-2 border-[#00ff88] transition-all duration-300 placeholder-slate-400" />
                                <Star className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                            </div>
                        ) : (
                            <div className="relative">
                                <select name="title" value={formData.title} onChange={handleChange} className="w-full p-4 pl-12 rounded-2xl bg-slate-800/70 text-white border-2 border-[#00ff88] transition-all duration-300 appearance-none cursor-pointer">
                                    <option value="">🎯 Select your product from our collection</option>
                                    {product.map((p, idx) => (
                                        <option key={idx} value={p.title}>
                                            {p.title}
                                        </option>
                                    ))}
                                </select>
                                <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400 pointer-events-none" />
                            </div>
                        )}
                        {/* Toggle Switch */}
                        <label className="flex items-center space-x-3 cursor-pointer p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                            <div className="relative">
                                <input type="checkbox" checked={customProduct} onChange={() => setCustomProduct(!customProduct)} className="sr-only" />
                                <div className={`w-12 h-6 rounded-full transition-colors ${customProduct ? 'bg-purple-500' : 'bg-slate-600'}`}>
                                    <div className={`w-5 h-5 bg-white rounded-full transition-transform transform ${customProduct ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`}></div>
                                </div>
                            </div>
                            <span className="text-slate-300 font-medium">
                                Can't find your product? Create a custom one!
                            </span>
                        </label>
                    </div>
                    {/* Product Image Upload - Only show when custom product */}
                    {customProduct && (
                        <div className="space-y-3 p-6 rounded-2xl bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-[#00ff88]">
                            <div className="flex items-center space-x-2">
                                <Upload className="w-5 h-5 text-purple-400" />
                                <label className="text-white font-semibold">Product Image</label>
                            </div>
                            <div className="relative">
                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="product-image" />
                                <label htmlFor="product-image" className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-purple-400 rounded-xl cursor-pointer hover:border-purple-300 transition-colors bg-[slate-800/30] hover:bg-slate-800/50">
                                    {imageFile ? (
                                        <div className="flex items-center space-x-2 text-purple-400">
                                            <Check className="w-6 h-6" />
                                            <span className="font-medium">{imageFile.name}</span>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="w-12 h-12 text-purple-400 mb-2" />
                                            <p className="text-white font-medium">Click to upload product image</p>
                                            <p className="text-slate-400 text-sm">PNG, JPG, GIF up to 10MB</p>
                                        </>
                                    )}
                                </label>
                            </div>
                        </div>
                    )}
                    {/* Shop Information Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Website Name */}
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Globe className="w-5 h-5 text-blue-400" />
                                <label className="text-white font-semibold">Shop Name</label>
                            </div>
                            <input type="text" name="website" value={formData.website} onChange={handleChange} placeholder="e.g. Amazon, Flipkart"
                                className="w-full p-4 rounded-xl bg-slate-800/70 text-white border-2 border-[#00ff88] focus:border-blue-500 transition-all duration-300 placeholder-slate-400" />
                        </div>
                        {/* Product Value */}
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <DollarSign className="w-5 h-5 text-green-400" />
                                <label className="text-white font-semibold">Price</label>
                            </div>
                            <input type="number" name="Value" value={formData.Value} onChange={handleChange} placeholder="999"
                                className="w-full p-4 rounded-xl bg-slate-800/70 text-white border-2 border-[#00ff88] focus:border-green-500 transition-all duration-300 placeholder-slate-400" />
                        </div>
                    </div>
                    {/* Website Logo Upload */}
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Upload className="w-5 h-5 text-orange-400" />
                            <label className="text-white font-semibold">Shop Logo</label>
                        </div>
                        <div className="relative">
                            <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" id="logo-upload" />
                            <label htmlFor="logo-upload" className="flex items-center justify-center w-full p-6 border-2 border-dashed border-[#00ff88] rounded-xl cursor-pointer transition-colors bg-slate-800/30 hover:bg-green-800/50">
                                {logoFile ? (
                                    <div className="flex items-center space-x-2 text-orange-400">
                                        <Check className="w-5 h-5" />
                                        <span className="font-medium">{logoFile.name}</span>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <Upload className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                                        <p className="text-white font-medium">Upload shop logo</p>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>
                    {/* Product Details Grid */}
                    <div className="grid md:grid-cols-3 gap-4">
                        {/* Product Link */}
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Link className="w-4 h-4 text-purple-400" />
                                <label className="text-white text-sm font-medium">Product Link</label>
                            </div>
                            <input type="url" name="link" value={formData.link} onChange={handleChange} placeholder="https://..."
                                className="w-full p-3 rounded-xl bg-slate-800/70 text-white border-2 border-[#00ff88] focus:border-purple-500 transition-all duration-300 placeholder-slate-400 text-sm" />
                        </div>
                        {/* Discount */}
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Percent className="w-4 h-4 text-red-400" />
                                <label className="text-white text-sm font-medium">Discount(%OFF)</label>
                            </div>
                            <input type="text" name="discount" value={formData.discount} onChange={handleChange} placeholder="20"
                                className="w-full p-3 rounded-xl bg-slate-800/70 text-white border-2 border-[#00ff88] focus:border-red-500 transition-all duration-300 placeholder-slate-400 text-sm" />
                        </div>
                        {/* Delivery Time */}
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-yellow-400" />
                                <label className="text-white text-sm font-medium">Delivery</label>
                            </div>
                            <input type="text" name="deliverytime" value={formData.deliverytime} onChange={handleChange} placeholder="2-3 days"
                                className="w-full p-3 rounded-xl bg-slate-800/70 text-white border-2 border-[#00ff88] focus:border-yellow-500 transition-all duration-300 placeholder-slate-400 text-sm" />
                        </div>
                    </div>
                    {/* Submit Button */}
                    <button type="submit" disabled={isSubmitting}
                        className={`w-full py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 transform ${isSubmitting
                            ? 'bg-slate-600 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:scale-105 hover:shadow-2xl active:scale-95'
                            } text-white`}>
                        {isSubmitting ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Adding Product...</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center space-x-2">
                                <Sparkles className="w-5 h-5" />
                                <span>Add Product to Collection</span>
                            </div>
                        )}
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}
