import React,{useEffect} from 'react'
import GetWhaleTxns from "../../api/GetWhaleTxns"
import { Card } from 'react-bootstrap';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function WhaleWatch() {

  const { fetchWhaleTxns, whaleTxns } = GetWhaleTxns();

  useEffect(() => {
    fetchWhaleTxns();
  }, [])
  

  return (
    <>
    <h1 style={{textAlign:'center',margin:'2rem 0'}}>Whale Watch</h1>
    <h4 style={{textAlign:'center',margin:'2rem 0'}}>Monitor large and interesting transactions as they happen</h4>
    {whaleTxns?.map((element) => {
      return (
        <Card className="mx-5 my-3" style={{borderRadius:'20px'}}>
              <Card.Header>
              <h1>{element.blockchain}</h1>
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
                              {element.from.address}
                            </Tooltip>
                          }
                        >
                          {({ ref, ...triggerHandler }) => (
                            <div {...triggerHandler}>
                              {element.from.owner? <span>{element.from.owner}(</span> : <span>unknown(</span>}<p className="my-2" ref={ref}>
                                {element.from.address.slice(0, 5) +
                                  '....' +
                                  element.from.address.slice(-5, -1) +
                                  element.from.address.slice(-1)}
                              )</p>
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
                              {element.to.address}
                            </Tooltip>
                          }
                        >
                          {({ ref, ...triggerHandler }) => (
                            <span {...triggerHandler}>
                            {element.to.owner? <span>{element.to.owner}(</span> : <span>unknown(</span>}<p className="my-2" ref={ref}>
                              {element.to.address.slice(0, 5) +
                                '....' +
                                element.to.address.slice(-5, -1) +
                                element.to.address.slice(-1)}
                            )</p>
                          </span>
                          )}
                        </OverlayTrigger></span>
                </div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                
                <div style={{fontWeight:'bolder'}}><h6 >Amount :</h6> 
                <div>{element.amount_usd} </div>
                </div>
                <div><h6>Hash :</h6> 
                <OverlayTrigger
                          placement="left"
                          overlay={
                            <Tooltip id="button-tooltip-2">
                              <p style={{ fontWeight: 'bolder' }}>
                                Hash :
                              </p>{' '}
                              {element.hash}
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
      )
    })}
    </>
    
  )
}

export default WhaleWatch