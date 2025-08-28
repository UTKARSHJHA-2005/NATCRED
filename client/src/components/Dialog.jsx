import { useState, useEffect } from "react";
import { ethers } from "ethers";
import CarbonCreditMarketABI from "../credit.json"; // ABI JSON after compiling

const CONTRACT_ADDRESS = "0x9d8b6788D47f3478594f6F819410c7cdfFdB63F6";

export default function Dialog() {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [buyPrice, setBuyPrice] = useState(""); // input for owner
    const [sellPrice, setSellPrice] = useState(""); // input for owner
    const [creditsToBuy, setCreditsToBuy] = useState("");
    const [userBalance, setUserBalance] = useState("0");

    useEffect(() => {
        if (!window.ethereum) return;
        const p = new ethers.BrowserProvider(window.ethereum);
        setProvider(p);
    }, []);

    const connect = async () => {
        if (!window.ethereum) {
            alert("No wallet found. Install MetaMask.");
            return;
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []); 
        const signer = await provider.getSigner();
        setProvider(provider);
        setSigner(signer);
        const c = new ethers.Contract(CONTRACT_ADDRESS, CarbonCreditMarketABI, signer);
        setContract(c);
        const address = await signer.getAddress();
        console.log("Connected:", address);
        alert(`Wallet connected: ${address}`);
    };

    const updatePrices = async () => {
        const buyWei = ethers.parseEther(buyPrice); 
        const sellWei = ethers.parseEther(sellPrice || "0");
        const tx = await contract.setPrices(buyWei, sellWei);
        await tx.wait();
        alert("Prices updated!");
    };

    const buyCredits = async () => {
        if (!contract) {
            alert("Please connect wallet first!");
            return;
        }
        const credits = ethers.parseUnits(creditsToBuy, 18); 
        const cost = await contract.quoteBuy(credits);
        const tx = await contract.buy(credits, { value: cost });
        await tx.wait();
        alert("Bought credits!");
    };

    const getBalance = async () => {
        if (!contract || !signer) {
            alert("Please connect wallet first!");
            return;
        }
        const tokenAddr = await contract.token();
        const token = new ethers.Contract(tokenAddr, [
            "function balanceOf(address) view returns (uint256)"
        ], signer);
        const bal = await token.balanceOf(await signer.getAddress());
        setUserBalance(ethers.formatUnits(bal, 18));
    };

    return (
        <div className="p-6 space-y-4">
            <button onClick={connect}>Connect Wallet</button>
            <h2>Owner Panel</h2>
            <input placeholder="Buy Price in ETH" onChange={e => setBuyPrice(e.target.value)} />
            <input placeholder="Sell Price in ETH" onChange={e => setSellPrice(e.target.value)} />
            <button onClick={updatePrices}>Set Prices</button>
            <h2>Buy Credits</h2>
            <input placeholder="Number of credits" onChange={e => setCreditsToBuy(e.target.value)} />
            <button onClick={buyCredits}>Buy</button>
            <h2>My Balance</h2>
            <button onClick={getBalance}>Check Balance</button>
            <p>{userBalance} Credits</p>
        </div>
    );
}
