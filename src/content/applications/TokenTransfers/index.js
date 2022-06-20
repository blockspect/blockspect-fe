import { useEffect } from 'react';
import GetTokenTransfers from 'src/content/api/GetTokenTransfers';
import { Button } from '@mui/material';
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
    getTokenTxns(address);
  }, []);

  const allTokens = () => {
    console.log('tokenTxnstokenTxns', tokenTxns);
  };

  return (
    <>
      <Button onClick={() => allTokens()}>Token Txns</Button>

      {tokenTxns?.map(function (d) {
        return (
          <div className="px-5 py-3">
            <Card style={{ border: '1px soild black', borderRadius: '20px' }}>
              <Card.Body>
                {/* icon */}
                {address === d?.from ? (
                  <div
                    className="d-flex"
                    style={{ justifyContent: 'space-around',alignItems:'center' }}
                  >
                    <div
                      className="p-1"
                    >
                      <ArrowUpwardIcon style={{color:'green'}}/>
                    </div>
                    <div>
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="button-tooltip-2">
                            <p style={{ fontWeight: 'bolder' }}>From :</p>{' '}
                            {d?.from}
                          </Tooltip>
                        }
                      >
                        <span style={{fontWeight:'bolder'}}>From :</span> {({ ref, ...triggerHandler }) => (
                          <div {...triggerHandler}>
                            <p className="my-2" ref={ref}>
                              {`${d?.from.slice(0, 5)}` +
                                '....' +
                                `${d?.from.slice(-5, -1)}` +
                                `${d?.from.slice(-1)}`}
                            </p>
                          </div>
                        )}
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="button-tooltip-2">
                            <p style={{ fontWeight: 'bolder' }}>Hash :</p>{' '}
                            {d?.hash}
                          </Tooltip>
                        }
                      >
                        {({ ref, ...triggerHandler }) => (
                          <div {...triggerHandler}>
                            <p className="my-2" ref={ref}>
                              {`${d?.hash.slice(0, 5)}` +
                                '....' +
                                `${d?.hash.slice(-5, -1)}` +
                                `${d?.hash.slice(-1)}`}
                            </p>
                          </div>
                        )}
                      </OverlayTrigger>
                    </div>
                    <div>
                      <ArrowForwardIcon />
                    </div>
                    <div>
                      <div>
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="button-tooltip-2">
                            <p style={{ fontWeight: 'bolder' }}>To :</p>{' '}
                            {d?.to}
                          </Tooltip>
                        }
                      >
                       <span style={{fontWeight:'bolder'}}>To :</span>  {({ ref, ...triggerHandler }) => (
                          <div {...triggerHandler}>
                            <p className="my-2" ref={ref}>
                              {`${d?.to.slice(0, 5)}` +
                                '....' +
                                `${d?.to.slice(-5, -1)}` +
                                `${d?.to.slice(-1)}`}
                            </p>
                          </div>
                        )}
                      </OverlayTrigger>
                        <p><span style={{fontWeight:'bolder'}}>Amount :</span> {d?.value}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                  className="d-flex"
                  style={{ justifyContent: 'space-around',alignItems:'center' }}
                >
                  <div
                    className="p-1"
                  >
                    <ArrowDownwardIcon style={{color:'red'}}/>
                  </div>
                  <div>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="button-tooltip-2">
                          <p style={{ fontWeight: 'bolder' }}>From :</p>{' '}
                          {d?.from}
                        </Tooltip>
                      }
                    >
                      {({ ref, ...triggerHandler }) => (
                        <div {...triggerHandler}>
                          <p className="my-2" ref={ref}>
                          <span style={{fontWeight:'bolder'}}>From :</span> {`${d?.from.slice(0, 5)}` +
                              '....' +
                              `${d?.from.slice(-5, -1)}` +
                              `${d?.from.slice(-1)}`}
                          </p>
                        </div>
                      )}
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="button-tooltip-2">
                          <p style={{ fontWeight: 'bolder' }}>Hash :</p>{' '}
                          {d?.hash}
                        </Tooltip>
                      }
                    >
                      {({ ref, ...triggerHandler }) => (
                        <div {...triggerHandler}>
                          <p className="my-2" ref={ref}>
                            {`${d?.hash.slice(0, 5)}` +
                              '....' +
                              `${d?.hash.slice(-5, -1)}` +
                              `${d?.hash.slice(-1)}`}
                          </p>
                        </div>
                      )}
                    </OverlayTrigger>
                  </div>
                  <div>
                    <ArrowForwardIcon />
                  </div>
                  <div>
                    <div>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="button-tooltip-2">
                          <p style={{ fontWeight: 'bolder' }}>To :</p>{' '}
                          {d?.to}
                        </Tooltip>
                      }
                    >
                      {({ ref, ...triggerHandler }) => (
                        <div {...triggerHandler}>
                          <p className="my-2" ref={ref}>
                            {`${d?.to.slice(0, 5)}` +
                              '....' +
                              `${d?.to.slice(-5, -1)}` +
                              `${d?.to.slice(-1)}`}
                          </p>
                        </div>
                      )}
                    </OverlayTrigger>
                      <p>{d?.value}</p>
                    </div>
                  </div>
                </div>
                )}
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </>
  );
}

export default TokenTransfers;
