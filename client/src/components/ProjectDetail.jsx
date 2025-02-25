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
        <div className="min-h-screen p-6 text-white overflow-y-hidden" style={{ background: 'radial-gradient(circle, #6EC207, beige)' }}>
            <div className="bg-green-600 p-6 rounded-lg shadow-lg mb-6" data-aos="fade-up">
                <h1 className="text-3xl font-bold text-center">{project.title}</h1>
            </div>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-green-700 p-6 rounded-lg shadow-lg" data-aos="fade-right">
                    <img
                        src={project.image}
                        alt="Renewable Energy"
                        className="w-[98%] rounded-lg" />
                    <h2 className="text-2xl font-bold mt-4 uppercase">{project.title}</h2>
                    <p className="text-gray-300">By {project.owner}</p>
                    <p className="mt-2 text-gray-300">{project.description}</p>
                </div>
                <div className="grid grid-cols-1 gap-4 lg:col-span-1" data-aos="fade-left">
                    <div className="bg-green-600 p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold">{project.amountRaised}</h2>
                        <p className="text-gray-300">Total Amount Required</p>
                    </div>
                    <div className="bg-green-600 p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold">{project.amountGot}</h2>
                        <p className="text-gray-300">Total Amount Raised</p>
                    </div>
                    <div className="bg-green-600 p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold">9</h2>
                        <p className="text-gray-300">Contributors</p>
                    </div>
                    <div className="bg-green-600 p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold">{project.contributors}</h2>
                        <p className="text-gray-300">Total Carbon Credits Left</p>
                    </div>
                    <div className="bg-green-600 p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold">30</h2>
                        <p className="text-gray-300">Total Carbon Credits Bought</p>
                    </div>
                    <button onClick={handleInvest} className="bg-green-600 px-4 py-2 rounded hover:bg-green-300 hover:text-black">Invest</button>
                </div>
            </div>
            <div className="mt-6 bg-green-700 p-6 rounded-lg shadow-lg" data-aos="fade-up">
                <h2 className="text-xl font-bold">Contributions</h2>
                <table className="w-full mt-4 text-gray-300">
                    <thead>
                        <tr>
                            <th className="text-left">Contributor</th>
                            <th className="text-left">Contributed at</th>
                            <th className="text-left">Network</th>
                            <th className="text-left">Carbon Credit Bought</th>
                            <th className="text-left">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Ram</td>
                            <td>7/12/2024</td>
                            <td>Ethereum</td>
                            <td>5</td>
                            <td>$100</td>
                        </tr>
                        <tr>
                            <td>Shyam</td>
                            <td>7/01/2025</td>
                            <td>Bitcoin</td>
                            <td>2</td>
                            <td>$40</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProjectDetail;
