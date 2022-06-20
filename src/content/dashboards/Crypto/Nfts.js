import { useEffect } from 'react';
// import { Button } from '@mui/material';
import GetNfts from 'src/content/api/GetNfts';
import Card from 'react-bootstrap/Card';

function Nfts() {
  const { getNfts, nfts } = GetNfts();
  const address = localStorage.getItem('address');

  useEffect(() => {
    getNfts(address);
  }, []);

//   const log = () => {
//     console.log("nftsnfts",nfts);
//   };

  return <div>
    {/* <Button onClick={() => log()}>Log button</Button> */}
    <div className="row">
    {nfts?.map((item) => (
        <div className="col-4 py-4 d-flex justify-content-center">
        <Card   style={{ width: '18rem' }}>
        <Card.Img variant="top" src={item?.metadata?.image} alt="Image Coming"/>
        <Card.Body>
          <Card.Title>
            {item?.metadata?.name ? <p>{item?.metadata?.name}</p> : <p>{item.contractName}</p>} 
            </Card.Title>
          <Card.Text>
            {item?.floorprice}
          </Card.Text>
        </Card.Body>
      </Card>
        </div> 
    ))}
    </div>
    
  </div>;
}

export default Nfts;
