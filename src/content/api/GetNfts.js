import axios from "axios";

import { useState } from "react";

const GetNfts = () => {
  const [nfts, setNfts] = useState();

  const apiKey = "eOAKZcE-zP4hKgK-QL2kovNPQe6ac1TY";
  const getNfts = (ownerAddr) => {
    const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTs`;
    const config = {
      method: "get",
      url: `${baseURL}?owner=${ownerAddr}`,
    };

    axios(config)
      .then(async (response) => {
        const data = response.data.ownedNfts.map(async (x) => {
          const td = await getContractMetadata(x.contract.address);
          const price = await getFloorPrice(x.contract.address);
          x.contractName = td.contractMetadata.name;
          x.contractSymbol = td.contractMetadata.symbol;
          x.floorprice = price.floorPrices[1].floorPrice;
          console.log(x);
          return x;
        });
        const nft = await Promise.all(
          data.map(async (i) => {
            return i;
          })
        );
        console.log(data);
        setNfts(nft);
      })
      .catch((error) => console.log(error));
  };

  const getFloorPrice = async (contractAddress) => {
    const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getFloorPrice`;
    let config = {
      method: "get",
      url: `${baseURL}?contractAddress=${contractAddress}`,
    };
    const td = await axios(config)
      .then((response) => {
        console.log(response.data, null, 2);
        return response.data;
      })
      .catch((error) => console.log(error));

    return td;
  };

  const getContractMetadata = async (contractAddress) => {
    const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getContractMetadata`;
    let config = {
      method: "get",
      url: `${baseURL}?contractAddress=${contractAddress}`,
    };
    const td = await axios(config)
      .then((response) => {
        console.log(response.data, null, 2);
        const nftdata = JSON.stringify(response.data);
        localStorage.setItem("nftdata",nftdata)
        return response.data;
        
      })
      .catch((error) => console.log(error));
    return td;
  };

  return { getNfts, nfts };
};

export default GetNfts;