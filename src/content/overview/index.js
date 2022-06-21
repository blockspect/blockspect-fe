import { useEffect } from 'react';

import { Container } from '@mui/material';

import Hero from './Hero';

import logo from '../../assets/img/logo.png';
import Background from '../../assets/img/ethereum.jfif';

function Overview() {
  useEffect(() => {
    localStorage.removeItem('maindata');
    localStorage.removeItem('newData');
    localStorage.removeItem('address');
  }, []);

  return (
    <div
      style={{
        backgroundImage: 'url(' + Background + ')',
        backgroundRepeat: 'no-repeat',
        minHeight: '45rem',
        backgroundSize: '100% 100%'
      }}
    >
      <div className="d-flex pt-5" style={{ justifyContent: 'center' }}>
        <img src={logo} alt="logo" height={200} width={200} />
      </div>
      <Container maxWidth="sm" className="mt-5">
        <Hero className="p-3" />
      </Container>
    </div>
  );
}

export default Overview;
