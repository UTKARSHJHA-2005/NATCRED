import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const ProjectDetail = () => {
    const location = useLocation();
    const { project } = location.state || {};
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    const handleInvest = async () => {
        try {
            if (typeof window.ethereum !== "undefined") {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                const userAccount = accounts[0];
                const transactionParameters = {
                    to: "0x4b567f404c7fd52f948e2bc8758945b3339d5092",
                    from: userAccount,
                    value: "0x2386F26FC10000",
                };
                const trans = await window.ethereum.request({
                    method: "eth_sendTransaction",
                    params: [transactionParameters],
                });
                console.log(trans)
                toast.success("Transaction sent successfully!");
                const newCoins = coins + 4;
                setCoins(newCoins);
                localStorage.setItem("coins", newCoins);
            } else {
                toast.error("MetaMask is not installed. Please install MetaMask to proceed.");
            }
        } catch (error) {
            console.error("Error during transaction:", error);
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8 text-white" style={{ background: '#233b5d' }}>
            {/* Header */}
            <div className="bg-indigo-500  bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-lg mb-8 transform hover:scale-101 transition-transform duration-300 border border-green-400 border-opacity-50" style={{ boxShadow: "0px 0px 50px rgba(0, 255, 136, 0.4)" }}>
                <h1 className="text-3xl md:text-4xl font-bold text-center text-white">
                    {project.title}
                </h1>
            </div>
            {/* Main content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left column - Project details */}
                <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-blue-700 border border-green-500 rounded-xl overflow-hidden" style={{ boxShadow: "0px 0px 50px rgba(0, 255, 136, 0.4)" }}>
                    <div className="relative">
                        <img
                            src={project.image}
                            alt="Renewable Energy"
                            className="w-full h-64 md:h-80 object-cover"/>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-600 to-transparent p-4">
                            <span className="px-3 py-1 bg-indigo-500 text-white rounded-full text-sm font-bold">
                                Sustainable Energy
                            </span>
                        </div>
                    </div>
                    <div className="p-6">
                        <h2 className="text-2xl font-bold uppercase tracking-wide text-white mb-2">{project.title}</h2>
                        <p className="text-blue-200 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            By {project.owner}
                        </p>
                        <p className="mt-4 text-white leading-relaxed">{project.description}</p>
                        <div className="mt-6 bg-blue-800 bg-opacity-50 p-4 rounded-lg">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '58%' }}></div>
                            </div>
                            <div className="flex justify-between mt-2 text-sm text-blue-200">
                                <span>58% Funded</span>
                                <span>{project.amountGot} of {project.amountRaised}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right column - Stats */}
                <div className="space-y-4 lg:col-span-1">
                    {/* Amounts card */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-xl border border-green-500 border-opacity-30 transform hover:translate-y-1 transition-transform duration-300" style={{ boxShadow: "0px 0px 50px rgba(0, 255, 136, 0.4)" }}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">Funding Goal</h2>
                            <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-blue-200 text-sm mb-1">Required</p>
                                <h3 className="text-2xl font-bold text-white">{project.amountRaised}</h3>
                            </div>
                            <div>
                                <p className="text-blue-200 text-sm mb-1">Raised</p>
                                <h3 className="text-2xl font-bold text-white">{project.amountGot}</h3>
                            </div>
                        </div>
                    </div>
                    {/* Contributors card */}
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-700 p-6 rounded-xl border border-green-500 border-opacity-30 transform hover:translate-y-1 transition-transform duration-300" style={{ boxShadow: "0px 0px 50px rgba(0, 255, 136, 0.4)" }}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">Community</h2>
                            <svg className="w-8 h-8 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div className="text-center bg-indigo-800 bg-opacity-50 py-3 px-4 rounded-lg">
                            <h3 className="text-3xl font-bold text-white">9</h3>
                            <p className="text-indigo-200">Contributors</p>
                        </div>
                    </div>
                    {/* Carbon credits card */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-xl border border-green-500 border-opacity-30 transform hover:translate-y-1 transition-transform duration-300" style={{ boxShadow: "0px 0px 50px rgba(0, 255, 136, 0.4)" }}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">Carbon Credits</h2>
                            <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center bg-blue-800 bg-opacity-50 py-3 px-4 rounded-lg">
                                <h3 className="text-2xl font-bold text-white">{project.contributors}</h3>
                                <p className="text-blue-200 text-sm">Credits Left</p>
                            </div>
                            <div className="text-center bg-blue-800 bg-opacity-50 py-3 px-4 rounded-lg">
                                <h3 className="text-2xl font-bold text-white">30</h3>
                                <p className="text-blue-200 text-sm">Credits Bought</p>
                            </div>
                        </div>
                    </div>
                    {/* Invest button */}
                    <button
                        onClick={handleInvest}
                        className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center space-x-2 transform hover:scale-105 transition-all duration-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Invest Now</span>
                    </button>
                </div>
            </div>
            {/* Contributions table */}
            <div className="mt-8 bg-gradient-to-br from-indigo-700 to-blue-800 rounded-xl p-6 border border-green-600 border-opacity-30" style={{ boxShadow: "0px 0px 50px rgba(0, 255, 136, 0.4)" }}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Recent Contributions</h2>
                    <span className="bg-green-600 text-white text-sm py-1 px-3 rounded-full">Live Updates</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-indigo-800 bg-opacity-50 text-indigo-100">
                                <th className="text-left p-3 rounded-tl-lg">Contributor</th>
                                <th className="text-left p-3">Contributed at</th>
                                <th className="text-left p-3">Network</th>
                                <th className="text-left p-3">Carbon Credits</th>
                                <th className="text-left p-3 rounded-tr-lg">Value</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-indigo-700">
                            <tr className="text-gray-200 hover:bg-indigo-700 hover:bg-opacity-40 transition-colors duration-200">
                                <td className="p-3">Ram</td>
                                <td className="p-3">7/12/2024</td>
                                <td className="p-3">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-200 text-blue-800">
                                        Ethereum
                                    </span>
                                </td>
                                <td className="p-3">5</td>
                                <td className="p-3 font-medium">$100</td>
                            </tr>
                            <tr className="text-gray-200 hover:bg-indigo-700 hover:bg-opacity-40 transition-colors duration-200">
                                <td className="p-3">Shyam</td>
                                <td className="p-3">7/01/2025</td>
                                <td className="p-3">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-200 text-yellow-800">
                                        Bitcoin
                                    </span>
                                </td>
                                <td className="p-3">2</td>
                                <td className="p-3 font-medium">$40</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
