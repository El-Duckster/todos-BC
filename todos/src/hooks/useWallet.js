import { useState, useEffect, useMemo } from "react";
import { ethers } from "ethers";

// Example JSON-RPC URL; replace with your actual URL
const ganacheUrl = "http://127.0.0.1:7545";

const useWallet = () => {
  const [wallet, setWallet] = useState({
    accounts: [],
    balance: "",
  });
  const provider = useMemo(() =>new ethers.providers.JsonRpcProvider(ganacheUrl),[]);

  useEffect(() => {
    const connectWallet = async () => {
      try {
        // Since we're using JsonRpcProvider, account fetching and balance might need adjustments
        // For Ganache, accounts are unlocked by default, so this method can directly fetch them
        const accounts = await provider.listAccounts();
        const balance = await provider.getBalance(accounts[0]);
        setWallet({
          accounts,
          balance: ethers.utils.formatEther(balance),
        });
      } catch (error) {
        console.error("Failed to get accounts or balance", error);
      }
    };

    connectWallet();
  }, [provider]);


  const refreshWalletBalance = async () => {
    const accounts = await provider.listAccounts();
    const balance = await provider.getBalance(accounts[0]);
    console.log("Refreshing balance:", ethers.utils.formatEther(balance));

    setWallet({
      accounts,
      balance: ethers.utils.formatEther(balance),
    });
  };

  return { wallet, refreshWalletBalance };
};
export default useWallet;
