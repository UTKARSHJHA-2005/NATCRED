// This is the page which gives the project details.
import { useEffect, useState } from "react";// React
import { useNavigate, useParams } from "react-router-dom";// Routing
import axios from "axios";// Axios
import AOS from "aos";
import { Eye } from "lucide-react";// Icon
import "aos/dist/aos.css";
import { ethers } from "ethers";// Ethers
import { useAuth } from "../AuthContext";// Authentication
import CarbonCreditMarketABI from "../credit.json";// ABI
import { ToastContainer, toast } from 'react-toastify';// Pop-ups

const CONTRACT_ADDRESS = "0x80476Af493BF04Af9231945f93650ceC8984B735";// Contract

const ProjectDetail = () => {
    const [contractCost, setContractCost] = useState(null);// Contract Cost State
    const { id } = useParams(); // Getting ID from URL
    const [open, setOpen] = useState(false);// Modal state
    const [contract, setContract] = useState(null);// Contract state
    const [credits, setCredits] = useState(1);// Credit State
    const navigate = useNavigate();// Navigation
    const [showFullDescription, setShowFullDescription] = useState(false);// Description in white
    const { user } = useAuth();// User state
    const [project, setProject] = useState({});// Project State
    const [ethRate, setEthRate] = useState(null); // USD per ETH
    // Animation with Project Details and Getting eth rates.
    useEffect(() => {
        AOS.init({ duration: 1000 });
        getProject();
        fetchEthRate();
    }, [id]);
    // Fetch project details
    const getProject = async () => {
        try {
            const res = await axios.get(`https://natcred-1.onrender.com/api/project/${id}`);
            setProject(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // Fetch ETH/USD price from CoinGecko
    const fetchEthRate = async () => {
        try {
            const res = await axios.get(
                "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
            );
            setEthRate(res.data.ethereum.usd); // USD per ETH
        } catch (err) {
            console.error("Failed to fetch ETH rate:", err);
        }
    };
    // Delete project
    const handleDelete = async () => {
        try {
            await axios.delete(`https://natcred-1.onrender.com/api/project/${id}`);
            toast.success("Deleted successfully");
            navigate("/Projects");
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    // 💰 Price conversions
    const usdPerCredit = project.Fund && project.CarbonCredits ? project.Fund / project.CarbonCredits : 0;
    // ETH per 1 credit
    const ethPerCredit = ethRate ? usdPerCredit / ethRate : 0;
    // ETH total for chosen credits
    const totalEth = ethPerCredit * credits;
    // Contract Initialization
    useEffect(() => {
        const initContract = async () => {
            if (typeof window.ethereum === "undefined") {
                console.error("MetaMask not found");
                return;
            }
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const contractInstance = new ethers.Contract(
                    CONTRACT_ADDRESS,
                    CarbonCreditMarketABI,
                    signer
                );
                setContract(contractInstance);
            } catch (err) {
                console.error("Contract init failed:", err);
            }
        };
        initContract();
    }, []);

    const totalRaised = project.contributors
        ? project.contributors.reduce((sum, contrib) => sum + Number(contrib.Value || 0), 0)
        : 0;

    const fundedPercent = project.Fund
        ? Math.min((totalRaised / project.Fund) * 100, 100)
        : 0;

    // Fetch cost safely using callStatic
    useEffect(() => {
        const fetchCost = async () => {
            if (!contract || !credits || credits <= 0) {
                setContractCost(null);
                return;
            }
            try {
                const creditAmount = ethers.parseUnits(String(credits), 0); // BigInt

                // Try to get the quote - if the function doesn't exist or reverts, 
                // fall back to manual calculation
                let cost;
                try {
                    cost = await contract.quoteBuy.staticCall(creditAmount);
                } catch (quoteError) {
                    console.warn("quoteBuy not available, using manual calculation:", quoteError);
                    // Fallback: calculate based on ETH rate
                    // totalEth is already calculated from ethPerCredit * credits
                    cost = ethers.parseEther(totalEth.toFixed(18));
                }

                setContractCost(cost);
            } catch (err) {
                console.error("Quote failed:", err);
                // Final fallback: use manual calculation
                if (ethRate && usdPerCredit) {
                    const fallbackCost = ethers.parseEther(totalEth.toFixed(18));
                    setContractCost(fallbackCost);
                } else {
                    setContractCost(null);
                }
            }
        };
        fetchCost();
    }, [contract, credits, totalEth, ethRate, usdPerCredit]);

    // Handle investment
    const handleInvest = async () => {
        if (!contract || !credits || credits <= 0 || !contractCost) {
            toast.error("Invalid investment attempt");
            return;
        }
        try {
            const creditAmount = ethers.parseUnits(String(credits), 0);
            const tx = await contract.buy(creditAmount, { value: contractCost });
            await tx.wait();
            toast.success("Investment successful ✅");
            setOpen(false);
            const payload = {
                name: user?.name || "Anonymous",
                carboncredit: credits,
                Value: (usdPerCredit * credits).toFixed(2),
            };
            await axios.post(
                `https://natcred-1.onrender.com/api/project/${project._id}/contribute`,
                payload
            );
            getProject(); // refresh project details
        } catch (err) {
            console.error("Investment failed:", err);
            toast.error(err?.reason || err?.message || "Investment failed");
        }
    };


    return (
        <div className="min-h-screen p-4 md:p-8 text-white" style={{ background: '#233b5d' }}>
            {/* Header */}
            <div className="bg-indigo-500  bg-transparent p-6 rounded-xl shadow-lg mb-8 transform hover:scale-101 transition-transform duration-300 border border-green-400 border-opacity-50" style={{ boxShadow: "0px 0px 50px rgba(0, 255, 136, 0.4)" }}>
                <h1 className="text-3xl md:text-4xl font-bold text-center text-white">
                    {project.title}
                </h1>
            </div>
            {/* Main content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left column - Project details */}
                <div className="lg:col-span-2 bg-transparent border border-green-500 rounded-xl overflow-hidden" style={{ boxShadow: "0px 0px 50px rgba(0, 255, 136, 0.4)" }}>
                    <div className="relative">
                        <img
                            src={project.image}
                            alt="Renewable Energy"
                            className="w-full h-64 md:h-80 object-cover" />
                    </div>
                    <div className="p-6">
                        <h2 className="text-2xl font-bold uppercase tracking-wide text-white mb-2">{project.title}</h2>
                        <p className="text-blue-200 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            By {project.author}
                        </p>
                        <p className="mt-4 text-white leading-relaxed">{project?.content && (
                            <span>{project.content.slice(0, 778)}</span>
                        )}
                        </p>
                        <button
                            onClick={() => setShowFullDescription(true)}
                            className="ml-1"
                            title="View full description">
                            <Eye className="w-4 h-4 text-green-400 inline-block" />
                        </button>
                        {showFullDescription && (
                            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-3">
                                <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 w-full max-w-md sm:max-w-2xl max-h-[85vh] overflow-auto relative">
                                    <button
                                        onClick={() => setShowFullDescription(false)}
                                        className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-lg font-bold"
                                    >
                                        ×
                                    </button>
                                    <h3 className="text-base sm:text-lg font-semibold mb-2">{project.title}</h3>
                                    <p className="text-gray-700 text-sm sm:text-base">{project.content}</p>
                                </div>
                            </div>
                        )}
                        <div className="mt-6 bg-blue-800 bg-opacity-50 p-4 rounded-lg">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-green-500 h-2.5 rounded-full"
                                    style={{ width: `${fundedPercent}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between mt-2 text-sm text-blue-200">
                                <span>{Math.round(fundedPercent)}% Funded</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right column - Stats */}
                <div className="space-y-4 lg:col-span-1">
                    {/* Amounts card */}
                    <div className="bg-transparent p-6 rounded-xl border border-green-500 border-opacity-30 transform hover:translate-y-1 transition-transform duration-300" style={{ boxShadow: "0px 0px 50px rgba(0, 255, 136, 0.4)" }}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">Funding Goal</h2>
                            <svg className="w-8 h-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-blue-200 text-sm mb-1">Required</p>
                                <h3 className="text-2xl font-bold text-white">{project.Fund}</h3>
                            </div>
                            <div>
                                <p className="text-blue-200 text-sm mb-1">Raised</p>
                                <h3 className="text-2xl font-bold text-white">{project.contributors
                                    ? project.contributors.reduce((sum, contrib) => sum + contrib.Value, 0)
                                    : 0}</h3>
                            </div>
                        </div>
                    </div>
                    {/* Contributors card */}
                    <div className="bg-transparent p-6 rounded-xl border border-green-500 border-opacity-30 transform hover:translate-y-1 transition-transform duration-300" style={{ boxShadow: "0px 0px 50px rgba(0, 255, 136, 0.4)" }}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">Community</h2>
                            <svg className="w-8 h-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div className="text-center bg-blue-900 bg-opacity-50 py-3 px-4 rounded-lg">
                            <h3 className="text-3xl font-bold text-white">{project.contributors ? project.contributors.length : 0}</h3>
                            <p className="text-indigo-200">Contributors</p>
                        </div>
                    </div>
                    {/* Carbon credits card */}
                    <div className="bg-transparent p-6 rounded-xl border border-green-500 border-opacity-30 transform hover:translate-y-1 transition-transform duration-300" style={{ boxShadow: "0px 0px 50px rgba(0, 255, 136, 0.4)" }}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">Carbon Credits</h2>
                            <svg className="w-8 h-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center bg-blue-900 bg-opacity-50 py-3 px-4 rounded-lg">
                                <h3 className="text-2xl font-bold text-white">{project.CarbonCredits}</h3>
                                <p className="text-blue-200 text-sm">Total Credits</p>
                            </div>
                            <div className="text-center bg-blue-900 bg-opacity-50 py-3 px-4 rounded-lg">
                                <h3 className="text-xl font-bold text-white"> {usdPerCredit.toFixed(2)}$ <br />
                                    {ethRate ? `${ethPerCredit.toFixed(6)} ETH` : "Loading..."}
                                </h3>
                                <p className="text-blue-200 text-sm">=1 Credit</p>
                            </div>
                            <div className="text-center bg-blue-800 bg-opacity-50 py-3 px-4 rounded-lg">
                                <h3 className="text-2xl font-bold text-white">{project.contributors
                                    ? project.contributors.reduce((sum, contrib) => sum + contrib.carboncredit, 0)
                                    : 0}</h3>
                                <p className="text-blue-200 text-sm">Credits Bought</p>
                            </div>
                        </div>
                    </div>
                    {/* Invest button */}
                    <button
                        onClick={() => setOpen(true)}
                        disabled={
                            project.Fund ===
                            (project.contributors
                                ? project.contributors.reduce((sum, contrib) => sum + contrib.Value, 0)
                                : 0)
                        }
                        className={`w-full font-bold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center space-x-2 transform transition-all duration-300
                            ${project.Fund ===
                                (project.contributors
                                    ? project.contributors.reduce((sum, contrib) => sum + contrib.Value, 0)
                                    : 0)
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-indigo-500 hover:bg-indigo-400 text-white hover:scale-105"
                            }`}>
                        <span>Invest Now</span>
                    </button>
                    {open && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
                            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8">

                                {/* Header */}
                                <div className="mb-6 text-center">
                                    <h2 className="text-2xl font-semibold text-gray-900">
                                        Invest in Carbon Credits
                                    </h2>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Enter the number of credits you want to purchase.
                                    </p>
                                </div>

                                {/* Form */}
                                <div className="space-y-5">
                                    {/* Carbon Credits Input */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Carbon Credits
                                        </label>
                                        <input
                                            type="number"
                                            min={1}
                                            value={credits}
                                            onChange={(e) => {
                                                const value = Number(e.target.value);
                                                setCredits(value > 0 ? value : 1);
                                            }}
                                            className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
                                            placeholder="e.g. 10"
                                        />
                                    </div>

                                    {/* Rate Display */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Rate per Credit
                                        </label>
                                        <input
                                            type="text"
                                            value={
                                                contractCost
                                                    ? `${ethers.formatEther(contractCost)} ETH`
                                                    : "Calculating..."
                                            }
                                            disabled
                                            className="mt-1 w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-4 py-2 text-gray-700"
                                        />
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="rounded-xl bg-gray-100 px-5 py-2 text-gray-700 hover:bg-gray-200 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleInvest}
                                        className="rounded-xl bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-500 transition focus:ring-2 focus:ring-indigo-400"
                                    >
                                        Confirm Investment
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {user?.name === project.author && (
                        <button onClick={handleDelete} className="bg-red-600 text-white hover:bg-green-600 hover:scale-110 transition-all duration-300 w-full font-bold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center space-x-2 transform transition-all duration-300">
                            Delete Project
                        </button>
                    )}
                </div>
            </div>
            {project.contributors && project.contributors.length > 0 ? (
                <div className="mt-8 bg-transparent rounded-xl p-6 border border-green-600 border-opacity-30"
                    style={{ boxShadow: "0px 0px 50px rgba(0, 255, 136, 0.4)" }}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Recent Contributions</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-indigo-800 bg-opacity-20 text-blue-100">
                                    <th className="text-left p-3 rounded-tl-lg">Contributor</th>
                                    <th className="text-left p-3">Contributed at</th>
                                    <th className="text-left p-3">Carbon Credits</th>
                                    <th className="text-left p-3 rounded-tr-lg">Value</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-indigo-700">
                                {project.contributors.map((contrib, index) => (
                                    <tr
                                        key={index}
                                        className="text-gray-200 hover:bg-green-300 hover:bg-opacity-40 transition-colors duration-200"
                                    >
                                        <td className="p-3">{contrib.name}</td>
                                        <td className="p-3">
                                            {new Date(contrib.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-3">{contrib.carboncredit}</td>
                                        <td className="p-3 font-medium">{contrib.Value}$</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p>No contributions yet</p>
            )}
            <ToastContainer />
        </div>
    );
};

export default ProjectDetail;
