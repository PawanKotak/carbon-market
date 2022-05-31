import {
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  Modal,
  Search,
} from "react-bootstrap";
import { React, useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:4000";
const config = {
  headers: { "content-type": "application/json" },
};

const MaketPlaceComp = () => {
  const [prodDetails, setProdDetails] = useState([]);
  const [allProdDetails, setAllProdDetails] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectTokenID, setSelectedTokenID] = useState(-1);
  const [amountEth, selectAmountEth] = useState(0);
  const [show, setShow] = useState(false);
  const [addressTo, setAddressTo] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);
  const [searchKey, setSearchKey] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    (async () => {
      const result = await axios.get("http://localhost:4000/marketnft");
      console.log(result);
      setProdDetails(result?.data?.data);
      setAllProdDetails(result?.data?.data);
    })();
  }, []);

  const showProductDet = (productDetails, tokenID) => {
    handleShow();
    setSelectedProduct(productDetails);
    setSelectedTokenID(tokenID);
    selectAmountEth(0);
    console.log(productDetails, tokenID);
  };

  const purchaseProduct = async () => {
    console.log("Number to HEx");

    let formdata = {
      tokenID: selectTokenID,
      amount: amountEth,
      addressto: addressTo,
      privatekey: privateKey,
    };
    const result = await axios.post(
      BACKEND_URL + "/buyproduct",
      formdata,
      config
    );
    handleClose();
  };

  const searchHandle = () => {
    if (searchKey) {
      const filterItem = prodDetails.filter(
        (item) =>
          item.attributes[2]?.value?.toLowerCase() ==
            searchKey?.toLowerCase() ||
          item.attributes[5]?.value?.toLowerCase() == searchKey?.toLowerCase()
      );

      console.log("filter Item", filterItem);
      setProdDetails(filterItem);
    }
    else
      setProdDetails(allProdDetails);
  };
  return (
    <div className="row p-3">
      <div className="col-md-12 form-horizontal">
        <div class="input-group" style={{ width: "50%" }}>
          <input
            type={"search"}
            className="form-control"
            onChange={(e) => setSearchKey(`${e.target.value}`)}
          ></input>
          <span class="input-group-btn bg-secondary">
            <button
              class="btn btn-default text-white"
              type="button"
              onClick={searchHandle}
            >
              SEARCH (Place/Carbon Credit)
            </button>
          </span>
        </div>
      </div>
      {prodDetails &&
        prodDetails.map((item, index) => (
          <Card
            key={index + 1}
            className="col-md-4 m-3"
            style={{ width: "18rem" }}
          >
            <Card.Img variant="top" src={item?.image} />
            <Card.Body>
              <Card.Title>{item?.title}</Card.Title>
              <Card.Text>{item?.title}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <b>Carbon Credit</b>: {item?.attributes[5]?.value}
              </ListGroupItem>
              <ListGroupItem>
                <b>Place</b>: {item?.attributes[2]?.value}
              </ListGroupItem>
              <ListGroupItem>
                <b>Country</b>: {item?.attributes[3]?.value}
              </ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button
                variant="primary"
                onClick={() => showProductDet(item, index + 1)}
                role="button"
              >
                BUY
              </Button>
            </Card.Body>
          </Card>
        ))}

      {prodDetails && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Product Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <b>Token ID</b>: {selectTokenID}
              </ListGroupItem>
              <ListGroupItem>
                <b>Carbon Credit</b>: {selectedProduct?.attributes[5].value}
              </ListGroupItem>
              <ListGroupItem>
                <b>Place</b>: {selectedProduct?.attributes[2].value}
              </ListGroupItem>
              <ListGroupItem>
                <b>Country</b>: {selectedProduct?.attributes[3].value}
              </ListGroupItem>
              <ListGroupItem>
                <span>
                  <b> Ethereum</b>
                </span>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={amountEth}
                  onChange={(e) => selectAmountEth(e.target.value)}
                ></input>
              </ListGroupItem>
              <ListGroupItem>
                <span>
                  <b> Address To</b>
                </span>
                <input
                  type="text"
                  onChange={(e) => setAddressTo(e.target.value)}
                ></input>
              </ListGroupItem>

              <ListGroupItem>
                <span>
                  <b> PRIVATE KEY TRNSATION </b>
                </span>
                <input
                  type="text"
                  onChange={(e) => setPrivateKey(e.target.value)}
                ></input>
              </ListGroupItem>
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={purchaseProduct}>
              Confirm Purchase
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default MaketPlaceComp;
