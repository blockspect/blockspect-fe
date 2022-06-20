import { useEffect } from 'react';

import {Container, Card} from '@mui/material';

import Hero from './Hero';

import logo from "../../assets/img/logo.png"

// const OverviewWrapper = styled(Box)(
//   () => `
//     overflow: auto;
//     flex: 1;
//     overflow-x: hidden;
//     align-items: center;
// `
// );

function Overview() {
  useEffect(() => {
    localStorage.removeItem("maindata")
    localStorage.removeItem("newData")
    localStorage.removeItem("address")
  }, [])
  // const Background = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB7BFhDHQVt10DIAd89iQgOBE05NiiZ6273Q&usqp=CAU"
  return (
    <div style={{backgroundColor:'grey',minHeight:'47rem'}}>
      <div className="d-flex" style={{justifyContent:'center'}}>
      <img src={logo} alt="logo" height={200} width={200}/>
      </div>
      <Container maxWidth="md" className="mt-5" >
        <Card sx={{ p: 10, mb: 10, borderRadius: 12 }}>
          <Hero />
        </Card>
      </Container>
    </div>
  );
}

export default Overview;
