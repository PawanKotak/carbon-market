import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  Modal,
  Search,
  Col,
  Row,
} from "react-bootstrap";

const KYCAppComp = () => {
  const [kycItem, setKYCItem] = useState([]);
  const [show, setShow] = useState(false);
  const [selectItem, setSelectItem] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nftImage, setNFTImage] = useState(
    "http://localhost:4000/defaultImage.png"
  );

  const showApprovalDet = (itemDetails) => {
    handleShow();
    setSelectItem(itemDetails);

    console.log(itemDetails);
  };

  useEffect(() => {
    (async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllKYC`
      );
      setKYCItem(result.data);
    })();
  }, []);

  return (
    <>
      <div>KYC Approval Page</div>
      <div className="row p-3">
        {kycItem &&
          kycItem.map((item, index) => (
            <Card
              key={item?.mma}
              className="col-md-3 m-3"
              style={{ width: "28rem" }}
            >
              <Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    <b>Name</b>: {item?.firstName + " " + item?.lastName}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Wallet Address</b>: {item?.mma}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Email ID</b>: {item?.emailID}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Place</b>: {item?.city}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>State</b>: {item?.state}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Country</b>: {item?.country}
                  </ListGroupItem>
                </ListGroup>
              </Card.Body>
              <Card.Body>
                <Button
                  variant="success"
                  role="button"
                  onClick={() => showApprovalDet(item)}
                >
                  APPROVE
                </Button>
              </Card.Body>
            </Card>
          ))}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Farmer's Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  <b>Name</b> :{" "}
                  {selectItem?.firstName + " " + selectItem?.lastName}
                </ListGroupItem>
                <ListGroupItem>
                  <b>Wallet Address</b> : {selectItem?.mma}
                </ListGroupItem>
                <ListGroupItem>
                  <b>Email ID</b> : {selectItem?.emailID}
                </ListGroupItem>
                <ListGroupItem>
                  <b>Goverment ID</b> : {selectItem?.nationalID}
                </ListGroupItem>
                <ListGroupItem>
                  <b>Land Record ID </b> : {selectItem?.landrecordID}
                </ListGroupItem>
                <ListGroupItem>
                  <b>Place</b>: {selectItem?.city}
                </ListGroupItem>
                <ListGroupItem>
                  <b>State</b>: {selectItem?.state}
                </ListGroupItem>
                <ListGroupItem>
                  <b>Country</b>: {selectItem?.country}
                </ListGroupItem>
                <ListGroupItem></ListGroupItem>
              </ListGroup>
            </Col>
            <Col className="text-center">
              <Button variant="success" className="d-block mx-auto mt-3">Generate Certificate</Button>
              <img
                src={nftImage}
                alt=""
                className="col img-thumbnail h-50 mt-3"
                style={{ height: "100%" }}
              />
            </Col>
          </Row>
          <Row>
            <div className="fs-6 fw-bold">Document Attached :</div>
          </Row>
          <Row>
            <Col>
              <figure class="figure">
                <img
                  src={selectItem?.govimgurl}
                  className="img-thumbnail"
                ></img>
                <figcaption class="figure-caption text-center">
                  Goverment ID Image
                </figcaption>
              </figure>
            </Col>
            <Col>
              <figure class="figure">
                <img
                  src={selectItem?.landimgurl}
                  className="img-thumbnail"
                ></img>
                <figcaption class="figure-caption text-center">
                  Land Record Image
                </figcaption>
              </figure>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Confirm Approve</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default KYCAppComp;
