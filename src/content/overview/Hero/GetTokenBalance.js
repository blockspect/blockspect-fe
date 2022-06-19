import axios from "axios";
// import { ethers } from "ethers";
import { useState } from "react";

const apiKey = "eOAKZcE-zP4hKgK-QL2kovNPQe6ac1TY";

const GetTokenBalance = () => {
  const [balances, setBalances] = useState();
  const getBalance = (_address) => {
    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;
    let data = JSON.stringify({
      jsonrpc: "2.0",
      method: "alchemy_getTokenBalances",
      params: [`${_address}`, "DEFAULT_TOKENS"],
      id: 42,
    });
    let config = {
      method: "post",
      url: baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const filterByID = (token) => {
      if (parseFloat(token.tokenBalance)) {
        return true;
      }
      return false;
    };

    axios(config)
      .then(function (res) {
        const data = res.data.result.tokenBalances;
        const filterTokens = data
          .map((x) => {
            // x.tokenBalance = ethers.utils.formatEther(x.tokenBalance); 
            return x;
          })
          .filter(filterByID);
        setBalances(filterTokens);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateBalance = () => {
    balances.map(async (x) => {
      const td = await getTokenDetails(x.contractAddress);
      x.logo = td.logo;
      x.name = td.name;
      x.symbol = td.symbol;
      console.log(x);
      return x;
    });
  };

  const getTokenDetails = async (_tokenAddress) => {
    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;
    let data = JSON.stringify({
      jsonrpc: "2.0",
      method: "alchemy_getTokenMetadata",
      params: [`${_tokenAddress}`],
      id: 42,
    });
    let config = {
      method: "post",
      url: baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const td = await axios(config)
      .then(function (res) {
        return res.data.result;
      })
      .catch(function (error) {
        console.log(error);
      });
    return td;
  };

  return {
    balances,
    updateBalance,
    getBalance,
  };
};

export default GetTokenBalance;

// GetTokenBalance("0x5d38b4e4783e34e2301a2a36c39a03c45798c4dd")