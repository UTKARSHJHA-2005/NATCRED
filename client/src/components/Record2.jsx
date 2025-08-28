import { useState, useEffect } from "react";
import info1 from "../assets/info (1).png";
import info4 from "../assets/info (4).jpeg";
import info6 from "../assets/info (6).jpeg";
import info5 from "../assets/info (5).jpeg";
import info2 from "../assets/info (2).png";
import info3 from "../assets/info (3).png";
import AOS from "aos";
import { ethers } from "ethers";
import "aos/dist/aos.css";
import CarbonCreditMarketABI from "../credit.json"; // ABI JSON after compiling
import axios from "axios";
import { useAuth } from "../AuthContext";

const CONTRACT_ADDRESS = "0x9d8b6788D47f3478594f6F819410c7cdfFdB63F6";

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
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const { user } = useAuth()
  const [userBalance, setUserBalance] = useState(0);
  const [activeTab, setActiveTab] = useState("cooperative");
  const [project, setproject] = useState(null)
  const [walletConnected, setWalletConnected] = useState(false);
  const [totalBlocks, setTotalBlocks] = useState(0);
  const username = user.name

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (username) {
      getproject()
    }
  }, [username])

  const getproject = async () => {
    const res = await axios.get("http://localhost:5000/api/project/dashboard", {
      headers: { "Content-Type": "application/json" },
      params: { userName: username }
    });
    setproject(res.data)
    console.log(res.data)
  }

  const success = project?.filter((p) => {
    if (p.author !== user.name) return false;
    // Calculate total contributions
    const totalContributed = p.contributors?.reduce(
      (sum, c) => sum + (c.Value || 0),
      0
    );
    // Return true if total contributions match Fund
    return totalContributed === p.Fund;
  });
  const success2 = project
    ?.filter((p) => p.author === user.name) // only authored by user
    .map((p) => {
      const totalContributed = p.contributors?.reduce(
        (sum, c) => sum + (c.Value || 0),
        0
      );

      return {
        ...p,
        totalContributed, // ✅ add new field
      };
    });

  const investedProjects = project
    ?.filter(
      (p) =>
        p.contributors &&
        p.contributors.some((c) => c.name === user.name)
    ) || [];

  const totalProjects = investedProjects.length;

  const totalAmount = investedProjects.reduce((sum, p) => {
    const contribution = p.contributors.find((c) => c.name === user.name);
    return sum + (contribution?.Value || 0);
  }, 0);

  const connectWallet = async (e) => {
    e.preventDefault();
    if (window.ethereum) {
      try {
        // 1. Connect wallet
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const wallet = accounts[0];
        setWalletAddress(wallet);
        console.log("Wallet Connected:", wallet);
        setWalletConnected(true);
        // 2. Setup provider & signer
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signerInstance = await provider.getSigner();
        setSigner(signerInstance);
        // 3. Setup contract
        const contractInstance = new ethers.Contract(
          CONTRACT_ADDRESS,
          CarbonCreditMarketABI,
          signerInstance
        );
        setContract(contractInstance);
        // 4. Read token balance
        const tokenAddr = await contractInstance.token();
        const token = new ethers.Contract(tokenAddr, [
          "function balanceOf(address) view returns (uint256)"
        ], signerInstance);

        const bal = await token.balanceOf(wallet);
        // No floats, only integer
        setUserBalance(parseInt(ethers.formatUnits(bal, 18), 10));

        // Count unique blocks
        const buyEvents = await contractInstance.queryFilter("Buy", 0, "latest");
        const sellEvents = await contractInstance.queryFilter("Sell", 0, "latest");
        const allBlocks = [
          ...buyEvents.map(e => e.blockNumber),
          ...sellEvents.map(e => e.blockNumber),
        ];
        const uniqueBlocks = [...new Set(allBlocks)];
        setTotalBlocks(uniqueBlocks.length);
        getproject()
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
            <StatCard title="Carbon Credits" value={`${userBalance}`} />
            <StatCard title="Projects Invested" value={totalProjects} percentage={totalAmount} />
            <StatCard title="Transaction Blocks" value={`${totalBlocks}`} />
            <StatCard title="Projects Succeed" value={success.length} percentage={success2?.[0]?.totalContributed} />
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
                {project && project.length > 0 ? (
                  <div className="space-y-4">
                    {project
                      .filter((p) => p.contributors && p.contributors.length > 0)
                      .slice(0, 3)
                      .map((p, i) => (
                        <div
                          key={p._id || i}
                          className="flex justify-between items-center border-b border-gray-300 py-2 hover:bg-gray-100 rounded-lg"
                        >
                          <div>
                            <p className="font-semibold text-gray-800">{p.title}</p>

                            {/* loop through contributors */}
                            {p.contributors.map((c, idx) => (
                              <div key={idx} className="flex justify-between items-center text-sm text-gray-600">
                                <p>{c.name}</p>
                                {/* Date + Amount */}
                                <div className="flex items-center gap-4 text-right">
                                  <p className="text-gray-500 ml-44">
                                    {new Date(c.createdAt).toLocaleDateString()}
                                  </p>
                                  <p className={`${c.Value > 0 ? "text-green-500 ml-44" : "text-red-500"} font-semibold`}>
                                    {c.Value > 0
                                      ? `+ $${c.Value}`
                                      : `- $${Math.abs(c.Value)}`}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No projects found.</p>
                )}
              </div>
              <div data-aos="flip-right" className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg text-black font-bold">Invested In Projects</h2>
                  <a href="#" className="text-sm text-green-600 hover:text-green-800">
                    View All &rarr;
                  </a>
                </div>
                {project && project.length > 0 ? (
                  <div className="space-y-4">
                    {project
                      .filter((p) => p.contributors && p.contributors.some((c) => c.name === user.name))
                      .slice(0, 3)
                      .map((p, index) => (
                        <div key={index} className="flex items-center justify-between hover:bg-gray-100 rounded-md">
                          <div className="flex items-center">
                            <div className="bg-green-500 text-black font-bold rounded-full h-10 w-10 flex items-center justify-center mr-4">
                              <img src={p.image} alt="" className="rounded-full h-9 w-9" />
                            </div>
                            <div>
                              <p className="font-semibold text-blue-800">{p.title}</p>
                              <p className="text-sm text-gray-400">{p.author}</p>
                            </div>
                          </div>
                          <p className={`${p.contributors.find((c) => c.name === user.name)?.Value > 0 ? "text-green-500" : "text-red-500"} font-semibold`}>
                            {p.contributors.find((c) => c.name === user.name)?.Value > 0 ? `+ $${p.contributors.find((c) => c.name === user.name)?.Value}`
                              : `- $${Math.abs(
                                p.contributors.find((c) => c.name === user.name)?.Value || 0
                              )}`}
                          </p>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No projects found.</p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full mt-6">
            <div className="flex flex-col md:flex-row justify-center border-b border-green-500">
              <TabButton label="Instrument Detail"
                isActive={activeTab === "instrumental"}
                onClick={() => setActiveTab("instrumental")} />
              <TabButton label="Issuance" isActive={activeTab === "issuance"} onClick={() => setActiveTab("issuance")} />
              <TabButton
                label="Cooperative Approaches"
                isActive={activeTab === "cooperative"}
                onClick={() => setActiveTab("cooperative")} />
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
  <button className={`flex-1 text-center py-2 ${isActive ? "bg-green-500 text-white font-bold" : "bg-green-100 text-green-500 font-semibold"}`}
    onClick={onClick}>{label}</button>
);

const TabContent = ({ images }) => (
  <div className="flex flex-col gap-4">
    {images.map((src, idx) => (
      <img key={idx} src={src} alt={`Tab content ${idx}`} className="w-full h-auto rounded-lg shadow-2xl" />
    ))}
  </div>
);

export default Record2;     