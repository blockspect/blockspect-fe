import { useEffect } from 'react';
import GetNfts from 'src/content/api/GetNfts';

import { Card, Typography, CardContent, CardMedia } from '@mui/material';

function Nfts() {
  const { getNfts, nfts } = GetNfts();
  const address = localStorage.getItem('address');

  useEffect(() => {
    getNfts(address);
  }, []);

  console.log('nftsnfts', nfts);

  return (
    <div>
      <Card>
        <div className="row">
          {nfts?.map((item) => (
            <div className="col-4 py-4 d-flex justify-content-center">
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={item?.metadata?.image}
                  // alt={`${item?.metadata?.image}`.indexOf('ipfs')}
                  alt="the_nft"
                />
                {/* <p>
                  {item?.metadata?.image?.slice(
                    item?.metadata?.image?.indexOf('ipfs')
                  )}
                </p> */}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item?.metadata?.name ? (
                      <p>{item?.metadata?.name}</p>
                    ) : (
                      <p>{item.contractName}</p>
                    )}
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
  );
}

export default Nfts;
