import { useEffect, useState } from "react";
import { ethers } from "ethers";
import CarbonCreditMarketABI from "../credit.json";

const CONTRACT_ADDRESS = "0x9d8b6788D47f3478594f6F819410c7cdfFdB63F6";

export default function Test() {
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (!window.ethereum) return;

        const load = async () => {
            const p = new ethers.BrowserProvider(window.ethereum);
            setProvider(p);
            const signer = await p.getSigner();
            const c = new ethers.Contract(CONTRACT_ADDRESS, CarbonCreditMarketABI, signer);
            setContract(c);
        };
        load();
    }, []);

    const fetchTransactions = async () => {
        if (!contract) return;
        const buyEvents = await contract.queryFilter("Buy", 0, "latest");
        const buyRecords = buyEvents.map(e => ({
            type: "BUY",
            user: e.args.buyer,
            credits: ethers.formatUnits(e.args.credits, 18),
            eth: ethers.formatEther(e.args.paidWei),
            block: e.blockNumber
        }));
        const sellEvents = await contract.queryFilter("Sell", 0, "latest");
        const sellRecords = sellEvents.map(e => ({
            type: "SELL",
            user: e.args.seller,
            credits: ethers.formatUnits(e.args.credits, 18),
            eth: ethers.formatEther(e.args.receivedWei),
            block: e.blockNumber
        }));
        const all = [...buyRecords, ...sellRecords].sort((a, b) => a.block - b.block);
        setTransactions(all);
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Transaction History</h1>
            <button
                onClick={fetchTransactions}
                disabled={!contract}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Load Transactions
            </button>

            <table className="w-full mt-4 border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">Type</th>
                        <th className="p-2">User</th>
                        <th className="p-2">Credits</th>
                        <th className="p-2">ETH</th>
                        <th className="p-2">Block</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((tx, i) => (
                        <tr key={i} className="border-t">
                            <td className="p-2">{tx.type}</td>
                            <td className="p-2">{tx.user}</td>
                            <td className="p-2">{tx.credits}</td>
                            <td className="p-2">{tx.eth}</td>
                            <td className="p-2">{tx.block}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
