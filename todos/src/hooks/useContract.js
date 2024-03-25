import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { abi, contractAddress } from '../config';

// Example JSON-RPC URL; replace with your actual URL
const ganacheUrl = 'http://127.0.0.1:7545';

export const useContract = () => {
    const [readContract, setReadContract] = useState(null);
    const [writeContract, setWriteContract] = useState(null);

    useEffect(() => {
        const setupContracts = async () => {
            const provider = new ethers.providers.JsonRpcProvider(ganacheUrl);
            const signer = provider.getSigner();

            const read = new ethers.Contract(contractAddress, abi, provider);
            const write = new ethers.Contract(contractAddress, abi, signer);

            setReadContract(read);
            setWriteContract(write);
        };

        setupContracts();
    }, []);

    return { readContract, writeContract };
};


// import {ethers} from "ethers"
// import { useEffect, useState } from "react";
// import { abi, contractAddress } from "./config";


// const useContract=()=>{

//   const [readContract, setReadContract] = useState();
//   const [writeContract, setWriteContract] = useState();


//   useEffect(() => {
//     const makeContract = async () => {

// const provider = new ethers.providers.JsonRpcProvider(
//   'http://127.0.0.1:7545'
// );

  
//       const myReadContract = new ethers.Contract(
//         contractAddress, 
//         abi,
//         window.provider
//       );
//       setReadContract(myReadContract);


//       const signer = await provider.getSigner();
//       const myWriteContract = new ethers.Contract(
//         contractAddress,
//         abi,
//         signer
//       );
//       setWriteContract(myWriteContract);

      
//     };

//     makeContract();
//   }, []);


//   return{readContract,writeContract}
// }
// export default useContract;