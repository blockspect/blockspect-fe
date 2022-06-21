import React, { useState, useContext } from 'react';
import axios from 'axios';

import { Button } from '@mui/material';

import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { SidebarContext } from 'src/contexts/SidebarContext';

import { Form } from 'react-bootstrap';

function Hero() {
  const { closeSidebar } = useContext(SidebarContext);

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
          const newData = JSON.stringify(response.data.result);
          localStorage.setItem('newData', newData);
          setUserData(response.data.result);
        })
        .catch((error) => {
          console.log('erooo  group', error);
        });
      localStorage.setItem('address', address);

      navigate('/eth/address', { state: { id: address } });
    }
  };

  console.log('userData', userData);

  return (
    <>
      <Form onSubmit={() => searchHandler()}>
        <Form.Group className="mb-4" controlId="formBasicPassword">
          <Form.Control
            className="py-2"
            type="text"
            placeholder="Please Enter the address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ borderRadius: '30px' }}
          />
        </Form.Group>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button className="bg-secondary" variant="primary" type="submit">
            Submit
          </Button>
        </div>

        <div
          className="mt-5"
          style={{ display: 'flex', justifyContent: 'space-around' }}
        >
          <Button
            component={RouterLink}
            onClick={closeSidebar}
            to={{ pathname: `/tools/contracts` }}
            target="_blank"
            style={{ color: 'white' }}
          >
            Test Your Contract
          </Button>
          <Button
            component={RouterLink}
            onClick={closeSidebar}
            to={{ pathname: `/tools/whalewatch` }}
            target="_blank"
            style={{ color: 'white' }}
          >
            Whale Watch
          </Button>
        </div>
      </Form>
    </>
  );
}

export default Hero;
