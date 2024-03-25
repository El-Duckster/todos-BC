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

// import { useEffect, useState,useCallback} from "react";
// import { ethers } from 'ethers';

// console.log(ethers); // Should output the ethers object
// console.log(ethers.providers); // Should output the providers namespace

// const useWallet = () => {
//   const [wallet, setWallet] = useState({
//     accounts: [],
//     balance: "",
//   });
//   const [error, setError] = useState(null);

//   // const formatBalance = useCallback((rawBalance) => {
//   //   return (parseInt(rawBalance, 10) / 1e18).toFixed(5); // Assuming Ether for simplicity
//   // }, []);

//   const updateWallet = useCallback(async () => {
//     if (window.ethereum) {
//     try {
//         const ganacheUrl = 'http://127.0.0.1:7545';
//         const provider = new ethers.providers.JsonRpcProvider(ganacheUrl);
//         const signer = provider.getSigner();
//         const accounts = await provider.listAccounts();
//         console.log(accounts[0])
//         const address=await signer.getAddress();

//       // const accounts = await window.ethereum.request({
//       //   method: "eth_requestAccounts",
//       // });

//       const rawBalance = await provider.getBalance(address);
//       const balance = ethers.utils.formatEther(rawBalance);
//     //   const rawBalance = await window.ethereum.request({
//     //     method: "eth_getBalance",
//     //     params: [accounts[0], "latest"],
//     //   });
//       console.log('Raw Balance:', rawBalance);

//     //   const balance = formatBalance(rawBalance);
//       console.log('Formatted Balance:', balance);
//       setWallet({ accounts:[address], balance });
//       setError(null);
//     } catch (e) {
//       if (e.code === -32002) {
//         // Specific handling for the pending request error
//         setError("Permission request is pending. Please check MetaMask.");
//       } else {
//         setError(e.message);
//     }
// }
// } else {
// setError("Please install MetaMask.");
// }
// }, []);

//   useEffect(() => {
//     updateWallet();
//     // Optional: Listen for account changes and auto-update the wallet
//     const handleAccountsChanged = (accounts) => {
//       if (accounts.length > 0) {
//         updateWallet();
//       } else {
//         setWallet({ accounts: [], balance: "0" }); // Reset if the account is disconnected
//       }
//     };

//     window.ethereum.on("accountsChanged", handleAccountsChanged);

//     return () =>
//       window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
//   }, [updateWallet]);

//   return { wallet, error, updateWallet };
// };

// export default useWallet;
