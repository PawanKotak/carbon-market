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
const BACKEND_URL = "http://localhost:4000";
const config = {
  headers: { "content-type": "application/json" },
};

const KYCAppComp = () => {
  const [kycItem, setKYCItem] = useState([]);
  const [show, setShow] = useState(false);
  const [selectItem, setSelectItem] = useState();
  const [cc, setCC] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [nftImage, setNFTImage] = useState(
    process.env.REACT_APP_DEFAULT_IMG_URL
  );

  const showApprovalDet = (itemDetails) => {
    setNFTImage(process.env.REACT_APP_DEFAULT_IMG_URL); //Reset Image
    handleShow();
    setSelectItem(itemDetails);
    console.log(itemDetails);
  };

  const handleImageGenerate = async () => {
    const result = await axios.get(
      `http://localhost:5000/users?landrecordid_like=${selectItem.landrecordID}`
    );
    console.log(result);
    setCC(result?.data[0]?.cc);
    const inputData = {
      text: `CC : ${result?.data[0]?.cc} T:${new Date().getTime()}`,
      place: selectItem.city,
      country:selectItem.country
    };
    axios.post(BACKEND_URL + "/getImage", inputData, config).then((resp) => {
      const imageURL = resp.data.imageURL;
      setNFTImage(imageURL + "?" + Math.random());
    });
  };

  const handleApprove = () => {
    console.log('HandleApprove',selectItem);    
    const inputData = selectItem;
    inputData.cc = cc;
    axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/approvedetails`,
      inputData,
      config
    );
    handleClose();

    //Remove item from Approval page
    const filterItem = kycItem.filter(item=>item.mma !== selectItem.mma);
    setKYCItem(filterItem);

  }

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
      <div className="fs-5 fw-bold mt-4 text-center">KYC Approval</div>
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
                <ListGroupItem>
                  <div className="fs-6 fw-bold">Document's</div>
                  <figure class="figure">
                    <img
                      src={selectItem?.govimgurl}
                      className="img-thumbnail"
                    ></img>
                    <figcaption class="figure-caption text-center">
                      Goverment ID Image
                    </figcaption>
                  </figure>
                </ListGroupItem>
                <ListGroupItem>
                <figure class="figure">
                <img
                  src={selectItem?.landimgurl}
                  className="img-thumbnail"
                ></img>
                <figcaption class="figure-caption text-center">
                  Land Record Image
                </figcaption>
              </figure>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col className="text-center">
              <Button
                variant="success"
                className="d-block mx-auto mt-3"
                onClick={handleImageGenerate}
              >
                Generate Certificate
              </Button>
              <img
                src={nftImage}
                alt=""
                className="col img-thumbnail h-25 mt-3 shadow-lg"
              />
            </Col>
          </Row>
          
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleApprove}>Confirm Approve</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default KYCAppComp;
