import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "./../utils/constants";

export const PharmaSupplyChainContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const pharmaSuppplyChainContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    // console.log(transactionContract);
    return pharmaSuppplyChainContract;
  };

  export const PharmaSupplyChainProvider = ({ children }) => {
    useEffect(() => {
        const contract = getEthereumContract();
        console.log(contract);
    },[])
    return (
      <PharmaSupplyChainContext.Provider
        value={{test:'test'
        }}
      >
        {children}
      </PharmaSupplyChainContext.Provider>
    );
  };