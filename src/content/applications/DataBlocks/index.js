import React from 'react';
import Carousel from 'react-multi-carousel';
import { Card, Container } from 'react-bootstrap';
import 'react-multi-carousel/lib/styles.css';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { ethers } from 'ethers';

function DataBlocks() {
  const str = localStorage.getItem('newData');
  //   const address = localStorage.getItem('address');
  const userData = JSON.parse(str);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 2
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };
  return (
    <div className="p-5">
      <Container>
        <h1 className="pb-5">Data in Blocks</h1>
        <Carousel partialVisible responsive={responsive}>
          {userData.length ? (
            userData.map((item, key) => {
              return (
                <div key={key} className="mx-3">
                  <Card
                    style={{
                      width: '30rem',
                      borderRadius: '20px',
                      height: '14rem',
                      overflow: 'hidden'
                    }}
                  >
                    <Card.Body>
                      <div>
                        <Row>
                          <Form.Label
                            column
                            lg={2}
                            style={{ fontWeight: 'bolder' }}
                          >
                            From :
                          </Form.Label>
                          <Col>
                            <p className="my-2">{item.from}</p>
                          </Col>
                        </Row>

                        <Row>
                          <Form.Label
                            column
                            lg={2}
                            style={{ fontWeight: 'bolder' }}
                          >
                            To :
                          </Form.Label>
                          <Col>
                            <p className="my-2">{item.to}</p>
                          </Col>
                        </Row>

                        <Row>
                          <Form.Label
                            column
                            lg={2}
                            style={{ fontWeight: 'bolder' }}
                          >
                            Hash :
                          </Form.Label>
                          <Col>
                            <OverlayTrigger
                              placement="bottom"
                              overlay={
                                <Tooltip id="button-tooltip-2">
                                  <p style={{ fontWeight: 'bolder' }}>
                                    Full Hash :
                                  </p>{' '}
                                  {item.hash}
                                </Tooltip>
                              }
                            >
                              {({ ref, ...triggerHandler }) => (
                                <div {...triggerHandler}>
                                  <p className="my-2" ref={ref}>
                                    <a
                                      href={`https://etherscan.io/tx/${item.hash}`}
                                    >
                                      {item.hash.slice(0, 5) +
                                        '....' +
                                        item.hash.slice(-5, -1) +
                                        item.hash.slice(-1)}
                                    </a>
                                  </p>
                                </div>
                              )}
                            </OverlayTrigger>
                          </Col>
                        </Row>

                        <Row>
                          <Form.Label
                            column
                            lg={2}
                            style={{ fontWeight: 'bolder' }}
                          >
                            Block :
                          </Form.Label>
                          <Col>
                            <p className="my-2">{item.blockNumber}</p>
                          </Col>
                        </Row>

                        <Row>
                          <Form.Label
                            column
                            lg={2}
                            style={{ fontWeight: 'bolder' }}
                          >
                            Value :
                          </Form.Label>
                          <Col>
                            <p className="my-2">
                              {ethers.utils.formatEther(item.value)} Eth
                            </p>
                          </Col>
                        </Row>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              );
            })
          ) : (
            <h1>hjhfj</h1>
          )}
        </Carousel>
      </Container>
    </div>
  );
}

export default DataBlocks;
