import { useState, useEffect } from "react";
import React from "react";
import info1 from "../assets/info (1).png";
import info4 from "../assets/info (4).jpeg";
import info6 from "../assets/info (6).jpeg";
import info5 from "../assets/info (5).jpeg";
import info2 from "../assets/info (2).png";
import info3 from "../assets/info (3).png";
import AOS from "aos";
import "aos/dist/aos.css";

const transactionsData = [
  { projectName: "Green Energy Initiative", investorName: "Liam Johnson", date: "2023-09-15", amount: 1000.0 },
  { projectName: "Tech for Schools", investorName: "Olivia Smith", date: "2023-09-14", amount: 500.0 },
  { projectName: "Water Conservation Fund", investorName: "Noah Williams", date: "2023-09-13", amount: 750.0 },
  { projectName: "Healthcare for All", investorName: "Emma Brown", date: "2023-09-12", amount: -2000.0 },
];

const recentProjectsData = [
  { initials: "PC", projectName: "Project Carbon", investorName: "Olive Carton", amount: 40000.0 },
  { initials: "GS", projectName: "Green Start", investorName: "Jack Jobs", amount: 5000.0 },
  { initials: "SF", projectName: "Solar Formation", investorName: "Isha Shaan", amount: 2500.0 },
  { initials: "CW", projectName: "Clear Waste", investorName: "Kim-On-Yung", amount: 1000.0 },
  { initials: "WF", projectName: "Water for All", investorName: "Sofia Davis", amount: 8000.0 },
];

const Record2 = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [activeTab, setActiveTab] = useState("cooperative");
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const connectWallet = async (e) => {
    e.preventDefault();
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log("Wallet Connected:", accounts[0]);
        setWalletConnected(true);  
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to connect your wallet.");
    }
  };

  return (
    <div className="p-4 min-h-screen bg-[#233b5d]">
      {!walletConnected ? (
        <div className="flex justify-center items-center h-screen">
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-600"
            onClick={connectWallet}>
            Connect Wallet
          </button>
        </div>
      ) : (
        <>
          <div data-aos="fade-down" className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <StatCard title="Carbon Credits" value="120" percentage="$190" />
            <StatCard title="Projects Invested" value="45" percentage="$2900" />
            <StatCard title="Products Bought" value="17" percentage="$450" />
            <StatCard title="Projects Succeed" value="19" percentage="$1200" />
          </div>
          <div className="p-4 text-white" style={{ background: "#233b5d" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div data-aos="flip-left" className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg text-black font-bold">Transactions to My Projects</h2>
                  <a href="#" className="text-sm text-green-600 hover:text-green-800">
                    View All &rarr;
                  </a>
                </div>
                <p className="text-sm text-black mb-4">Best transactions to your projects.</p>
                <div className="space-y-4">
                  {transactionsData.map((transaction, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b border-gray-300 py-2 cursor-pointer hover:bg-gray-100 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-800">{transaction.projectName}</p>
                        <p className="text-sm text-gray-600">{transaction.investorName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                        <p className={`${transaction.amount > 0 ? "text-green-500" : "text-red-500"
                            } font-semibold`}>
                          {transaction.amount > 0 ? `+ $${transaction.amount}` : `- $${Math.abs(transaction.amount)}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div data-aos="flip-right" className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg text-black font-bold">Invested In Projects</h2>
                  <a href="#" className="text-sm text-green-600 hover:text-green-800">
                    View All &rarr;
                  </a>
                </div>
                <div className="space-y-4 cursor-pointer">
                  {recentProjectsData.map((project, index) => (
                    <div key={index} className="flex items-center justify-between hover:bg-gray-100 rounded-md">
                      <div className="flex items-center">
                        <div className="bg-green-500 text-black font-bold rounded-full h-10 w-10 flex items-center justify-center mr-4">
                          {project.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-blue-800">{project.projectName}</p>
                          <p className="text-sm text-gray-400">{project.investorName}</p>
                        </div>
                      </div>
                      <p className="text-green-500 font-semibold">+ ${project.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mt-6">
            <div className="flex flex-col md:flex-row justify-center border-b border-green-500">
              <TabButton
                label="Instrument Detail"
                isActive={activeTab === "instrumental"}
                onClick={() => setActiveTab("instrumental")}/>
              <TabButton label="Issuance" isActive={activeTab === "issuance"} onClick={() => setActiveTab("issuance")} />
              <TabButton
                label="Cooperative Approaches"
                isActive={activeTab === "cooperative"}
                onClick={() => setActiveTab("cooperative")}/>
            </div>
            <div className="p-4 md:p-6">
              {activeTab === "instrumental" && <TabContent images={[info2, info5]} />}
              {activeTab === "issuance" && <TabContent images={[info3, info4]} />}
              {activeTab === "cooperative" && <TabContent images={[info1, info6]} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const StatCard = ({ title, value, percentage }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
    <div className="flex-grow">
      <h4 className="text-md font-semibold">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
    <div className="text-green-500 font-semibold">{percentage}</div>
  </div>
);

const TabButton = ({ label, isActive, onClick }) => (
  <button
    className={`flex-1 text-center py-2 ${isActive ? "bg-green-500 text-white font-bold" : "bg-green-100 text-green-500 font-semibold"
      }`}
    onClick={onClick}
  >
    {label}
  </button>
);

const TabContent = ({ images }) => (
  <div className="flex flex-col gap-4">
    {images.map((src, idx) => (
      <img key={idx} src={src} alt={`Tab content ${idx}`} className="w-full h-auto rounded-lg shadow-2xl" />
    ))}
  </div>
);

export default Record2;     