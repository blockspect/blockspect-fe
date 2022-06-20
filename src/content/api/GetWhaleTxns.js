import axios from "axios";
import { useState } from "react";

const GetWhaleTxns = () => {
  const [whaleTxns, setWhaleTxns] = useState();
  const fetchWhaleTxns = () => {
    axios
      .get("/v1/transactions?api_key=g2Cmd8eUhAPVlQkBQmUdCrjtbDqCsKLu")
      .then((res) => {
        console.log(res.data.transactions);
        setWhaleTxns(res.data.transactions);
      })
      .catch((err) => console.log(err));
  };
  return { fetchWhaleTxns, whaleTxns };
};

export default GetWhaleTxns;