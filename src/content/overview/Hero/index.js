import React, { useState } from 'react';
import axios from 'axios';

import { Button } from '@mui/material';

import {
  // Link as RouterLink,
  useNavigate
} from 'react-router-dom';

// material ui search box
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

function Hero() {
  const [address, setAddress] = useState('');
  const [userData, setUserData] = useState();

  const navigate = useNavigate();

  // const [tokenData, setTokenData] = useState('');
  // const [finalData, setFinalData] = useState('');

  const searchHandler = () => {
    if (address) {
      axios
        .get(
          `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=1D3S8VM2IXMV49KZG2G8RH6YAFBTTESIH8`
        )
        .then((response) => {
          console.log('responseresponse', response.data.result);
          setUserData(response.data.result);
        })
        .catch((error) => {
          console.log('erooo  group', error);
        });
    }
  };

  if (userData) {
    const newData = JSON.stringify(userData);
    navigate(`/eth/${address}`, { state: { id: address } });
    localStorage.setItem('address', address);
    localStorage.setItem('newData', newData);
  }

  // getWalletBalance();
  // if (balances) {
  //   setTokenData(balances);
  //   console.log(balances);
  // }
  // if (tokenData) {

  //   setFinalData(balances);
  //   console.log('finalDatafinalData', finalData);
  // }

  return (
    <>
      <Paper
        component="form"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter the Address"
          inputProps={{ 'aria-label': 'Enter The address' }}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Paper>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <Button
            size="medium"
            variant="contained"
            sx={{ mt: 1 }}
            onClick={() => searchHandler()}
          >
            Search
          </Button>
        </div>
      </div>
    </>
  );
}

export default Hero;
