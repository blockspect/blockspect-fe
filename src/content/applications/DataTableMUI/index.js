import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { Modal, InputGroup, Form, Button } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Row, Col } from 'react-bootstrap';

const columns = [
  { id: 'name', label: 'Txn Hash', minWidth: 170, align: 'center' },
  {
    id: 'method',
    label: 'Method',
    minWidth: 100,
    align: 'center',
    modal: 'handleModalMethodShow'
  },
  { id: 'block_name', label: 'Block', maxWidth: 85, align: 'center' },
  {
    id: 'from_whom',
    label: 'From',
    maxWidth: 85,
    align: 'center',
    modal: 'handleModalFromShow'
  },
  { id: 'to_whom', label: 'To', maxWidth: 85, align: 'center' },
  { id: 'nothing', label: '', maxWidth: 85, align: 'center' },
  { id: 'value', label: 'Value', maxWidth: 85, align: 'center' }
];

function DataTableMUI() {
  const str = localStorage.getItem('newData');
  const address = localStorage.getItem('address');
  const userData = JSON.parse(str);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let filterData;

  // modal handling

  const handleModal = (column) => {
    console.log('columncolumn', column);
    if (column.id === 'method') {
      handleModalMethodShow();
    } else if (column.id === 'from_whom') {
      handleModalFromShow();
    } else if (column.id === 'to_whom') {
      handleModalToShow();
    }
  };

  // const [methodInput,setMethodInput] = useState("")
  const [showModalMethod, setShowModalMethod] = useState(false);
  const handleModalMethodClose = () => setShowModalMethod(false);
  const handleModalMethodShow = () => {
    setShowModalMethod(true);
  };
  // const [filterRadioButton, setFilterRadioButton] = useState('');
  const methodFilterHandler = () => {
    // {
    //   e.target.value
    //     ? setFilterRadioButton(e.target.value)
    //     : setFilterRadioButton('');
    // }
    // console.log(filterRadioButton);
    setShowModalMethod(false);
  };

  const [fromInput, setFromInput] = useState('');
  const [showmodalFrom, setShowModalFrom] = useState(false);
  const handleModalFormClose = () => setShowModalFrom(false);
  const handleModalFromShow = () => {
    setShowModalFrom(true);
  };

  const [toInput, setToInput] = useState('');
  const [showModalTo, setShowModalTo] = useState(false);
  const handleModalToClose = () => setShowModalTo(false);
  const handleModalToShow = () => {
    setShowModalTo(true);
  };

  const [dataFrom, setDataFrom] = useState();
  const fromFilterHandler = () => {
    const extractedData = userData.filter((item) =>
      item.from.includes(fromInput)
    );
    setDataFrom(extractedData);
    setShowModalFrom(false);
  };

  const [dataTo, setDataTo] = useState();

  const toFilterHandler = () => {
    const extractedData = userData.filter((item) => item.to.includes(toInput));
    setDataTo(extractedData);
    setShowModalTo(false);
  };

  // const [originalDataBack,setOriginalDataBack] = useState('')
  // const removeFilters = () => {
  //   setOriginalDataBack(userData);
  // }

  if (dataFrom) {
    filterData = dataFrom;
  } else if (dataTo) {
    filterData = dataTo;
  } else {
    filterData = userData;
  }

  // if(originalDataBack){
  //   filterData = originalDataBack;
  // }
  console.log('userData', userData);
  return (
    <>
      <div className="d-flex justify-content-center">
        <Paper sx={{ width: '95%', overflow: 'hidden' }}>
          <div
            className="px-5 d-flex"
            style={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <p style={{ fontWeight: 'bolder' }}>
              Latest {userData.length} of {userData.length} transactions
            </p>
            {/* <button className="bg-info " style={{color:'white'}} onClick={() => removeFilters()}>Remove Filters</button> */}
          </div>

          <TableContainer sx={{ maxHeight: 770 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow style={{}}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        color: '#6c757e',
                        fontWeight: '600'
                      }}
                    >
                      {column.label === 'From' || column.label === 'To' ? (
                        // handleShow
                        <div>
                          {column.label}{' '}
                          <FilterAltIcon onClick={() => handleModal(column)} />
                        </div>
                      ) : (
                        <div>{column.label}</div>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filterData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="button-tooltip-2">
                              <p style={{ fontWeight: 'bolder' }}>
                                Full Hash :
                              </p>{' '}
                              {row.hash}
                            </Tooltip>
                          }
                        >
                          {({ ref, ...triggerHandler }) => (
                            <div {...triggerHandler}>
                              <p className="my-2" ref={ref}>
                                {row.hash.slice(0, 5) +
                                  '....' +
                                  row.hash.slice(-5, -1) +
                                  row.hash.slice(-1)}
                              </p>
                            </div>
                          )}
                        </OverlayTrigger>
                      </TableCell>
                      <TableCell align="center">
                        {row.from === address ? (
                          <p>Approve</p>
                        ) : (
                          <p>Transfer</p>
                        )}
                      </TableCell>
                      <TableCell align="center">{row.blockNumber}</TableCell>
                      <TableCell align="center">{row.from}</TableCell>
                      <TableCell align="center">{row.to}</TableCell>

                      <TableCell align="center">
                        {/* {row.from === address ? (
                        <button
                          style={{
                            background: "rgba(0,201,167,.1)",
                            color: "#00c9a7",
                            fontWeight: "bolder",
                            borderRadius: "6.1875rem",
                            type : "button"
                          }}
                        >
                          Out
                        </button>
                      ) : (
                        <button
                          className="btn"
                          style={{
                            background: "rgba(219,154,4,.1)",
                            color: "#db9a04",
                            fontWeight: "bolder",
                            borderRadius: "6.1875rem",
                          }}
                        >
                          In
                        </button>
                      )} */}
                      </TableCell>
                      <TableCell align="center">
                        {row.value} Eth
                        {/* {Web3.utils.fromWei(row.value, 'ether')} */}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 25, 50]}
            component="div"
            count={filterData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>

      {/* modal */}
      {/* 1. MOdal for filtering the method */}
      <Modal show={showModalMethod} onHide={handleModalMethodClose}>
        <h3 className="p-4">Method</h3>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={2}>
            Radios
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="Transfer"
              value="Transfer"
              onClick={(e) => methodFilterHandler(e)}
              name="formHorizontalRadios"
              id="Transfer"
            />
            <Form.Check
              type="radio"
              label="Recieve"
              value="Recieve"
              onClick={(e) => methodFilterHandler(e)}
              name="formHorizontalRadios"
              id="Recieve"
            />
          </Col>
        </Form.Group>
      </Modal>

      {/* Modal for filteing the from transaction */}

      <Modal class="pt-2" show={showmodalFrom} onHide={handleModalFormClose}>
        <h3 className="p-4">From</h3>
        <InputGroup className="mb-3 px-4 py-2">
          <Form.Control
            placeholder="Filter by entering the from here"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setFromInput(e.target.value)}
          />
          <Button onClick={fromFilterHandler}>Filter</Button>
        </InputGroup>
      </Modal>

      {/* Modal for filteing the to transaction */}

      <Modal class="pt-2" show={showModalTo} onHide={handleModalToClose}>
        <h3 className="p-4">To</h3>
        <InputGroup className="mb-3 px-4 py-2">
          <Form.Control
            placeholder="Filter by entering the from here"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setToInput(e.target.value)}
          />
          <Button onClick={toFilterHandler}>Filter</Button>
        </InputGroup>
      </Modal>
    </>
  );
}

export default DataTableMUI;
