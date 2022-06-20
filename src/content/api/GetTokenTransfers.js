import { useState } from "react";
import axios from "axios";

const GetTokenTransfers = () => {
  const apiKey = "eOAKZcE-zP4hKgK-QL2kovNPQe6ac1TY";
  const [tokenTxns, setTokenTxns] = useState();
  const getTokenTxns = () => {
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`;
    const data = JSON.stringify({
      jsonrpc: "2.0",
      id: 0,
      method: "alchemy_getAssetTransfers",
      params: [
        {
          fromBlock: "0x0",
          fromAddress: "0xC2F5D6E5e615E64B3EA6f1B1CEcC1F393Dc30A1b",
        },
      ],
    });
    const requestOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: data,
    };
    axios(baseURL, requestOptions)
      .then((res) => {
        console.log(res.data);
        setTokenTxns(res?.data?.result?.transfers);
      })
      .catch((error) => console.log(error));
  };
  return { getTokenTxns, tokenTxns };
};

export default GetTokenTransfers;