import React,{useState} from 'react';
import { Form } from 'react-bootstrap';
import { Button ,
  Container} from '@mui/material';
import axios from 'axios';

function SmartContacts() {

  const [address2, setAddress2] = useState('');
  const [isContract,setIsContract] = useState();

  const searchHandler = () => {
      axios
        .get(
          `https://eth-mainnet.g.alchemy.com/nft/v2/demo/isSpamContract?contractAddress=${address2}`
        )
        .then((response) => {
          console.log("responseresponse",response.data)
          setIsContract(response.data);
        })
        .catch((error) => {
          console.log('erooo  group', error);
        });
  };
  if(isContract){
    console.log('isContractisContract', isContract);
  }
  return <div >
    <Container maxWidth="sm">
    <Form className="p-5" style={{marginTop:'7rem',border:'1px solid black',borderRadius:'20px'}} >
    <h1 style={{textAlign:'center'}}>Test Your Token </h1>

     <Form.Group className="my-5" controlId="formBasicPassword">
          <Form.Control
            type="text"
            placeholder="Please Enter the address"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            style={{ borderRadius: '20px' }}
          />
        </Form.Group>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={() => searchHandler()} className="bg-secondary mt-4" variant="primary" type="button">
            Click Here
          </Button>
        </div>
        
        <div style={{marginTop:'5rem'}}>
      {isContract === true ? 
     <div className="alert alert-danger" role="alert">
     !!This account seems suspicious!!
   </div>
     : isContract === false ? 
     <div className="alert alert-success" role="alert">
     This contract seems safe
   </div>
     : <div className="alert alert-primary" role="alert">
     You can see the result here
   </div>}
      </div> 
     </Form>

          
    </Container>
     

      
  </div>;
}

export default SmartContacts;
