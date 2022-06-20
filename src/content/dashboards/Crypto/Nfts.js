import { useEffect } from 'react';
import GetNfts from 'src/content/api/GetNfts';

import {
  Card,
  Typography,
  CardContent,
  CardMedia
}from '@mui/material'

function Nfts() {
  const { getNfts, nfts } = GetNfts();
  const address = localStorage.getItem('address');

  useEffect(() => {
    getNfts(address);
  }, []);

  return <div>
    <Card>
    <div className="row">
      {nfts? <h4 className='mx-5 my-1'>NFT's</h4> : null}
    {nfts?.map((item) => (
      <div className="col-4 py-4 d-flex justify-content-center">
      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="200"
        image={item?.metadata?.image}
        alt="image--loading"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {item?.metadata?.name ? <p>{item?.metadata?.name}</p> : <p>{item.contractName}</p>}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {item?.floorprice}
        </Typography>
      </CardContent>
    </Card>
        </div> 
    ))}
    </div>
  </Card>
    
  </div>
}

export default Nfts;