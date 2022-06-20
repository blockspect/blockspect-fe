import { useEffect } from 'react';
import GetTokenTransfers from 'src/content/api/GetTokenTransfers';
import { Card } from 'react-bootstrap';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function TokenTransfers() {
  const address = localStorage.getItem('address');

  const { getTokenTxns, tokenTxns } = GetTokenTransfers();

  useEffect(() => {
    getCoin();
  }, []);

  const getCoin = async () => {
    await getTokenTxns(address);
  };

  return (
    <>
      <h5 className="py-5">Transaction History of {address}</h5>

      {tokenTxns?.map((element) => {
                      return (
                        <Card className="mx-5 my-3">
              <Card.Header>
              {parseFloat(element.from) === parseFloat(address) ? (
                          <h4>Transfer <ArrowUpwardIcon style={{color:'green'}}/> </h4>
                        ) : (
                          <h4>Approve <ArrowDownwardIcon style={{color:'red'}}/></h4>
                        )}
              </Card.Header>
              <Card.Body>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div><h6>From :</h6> 
                <OverlayTrigger
                          placement="left"
                          overlay={
                            <Tooltip id="button-tooltip-2">
                              <p style={{ fontWeight: 'bolder' }}>
                                Senders Account :
                              </p>{' '}
                              {element.from}
                            </Tooltip>
                          }
                        >
                          {({ ref, ...triggerHandler }) => (
                            <div {...triggerHandler}>
                              <p className="my-2" ref={ref}>
                                {element.from.slice(0, 5) +
                                  '....' +
                                  element.from.slice(-5, -1) +
                                  element.from.slice(-1)}
                              </p>
                            </div>
                          )}
                        </OverlayTrigger>
                </div>
                <div>
                <ArrowForwardIcon />
                </div>
                <div ><h6>To :</h6> 
                <span><OverlayTrigger
                          placement="left"
                          overlay={
                            <Tooltip id="button-tooltip-2">
                              <p style={{ fontWeight: 'bolder' }}>
                                Recievers Account :
                              </p>{' '}
                              {element.to}
                            </Tooltip>
                          }
                        >
                          {({ ref, ...triggerHandler }) => (
                            <div {...triggerHandler}>
                              <p className="my-2" ref={ref}>
                                {element.to.slice(0, 5) +
                                  '....' +
                                  element.to.slice(-5, -1) +
                                  element.to.slice(-1)}
                              </p>
                            </div>
                          )}
                        </OverlayTrigger></span>
                </div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                
                <div style={{fontWeight:'bolder'}}><h6 >Amount :</h6> 
                <div>{element.value} </div>
                </div>
                <div><h6>Hash :</h6> 
                <OverlayTrigger
                          placement="left"
                          overlay={
                            <Tooltip id="button-tooltip-2">
                              <p style={{ fontWeight: 'bolder' }}>
                                Hash :
                              </p>{' '}
                              {element.from}
                            </Tooltip>
                          }
                        >
                          {({ ref, ...triggerHandler }) => (
                            <div {...triggerHandler}>
                              <p className="my-2" ref={ref}>
                                {element.hash.slice(0, 5) +
                                  '....' +
                                  element.hash.slice(-5, -1) +
                                  element.hash.slice(-1)}
                              </p>
                            </div>
                          )}
                        </OverlayTrigger>
                </div>
                </div>
              </Card.Body>
            </Card>
                      );
                    })}
    </>
  );
}

export default TokenTransfers;
