import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  Modal,
  Search,
} from "react-bootstrap";

const KYCAppComp = () => {
  const [kycItem, setKYCItem] = useState([]);

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
              <Card.Img variant="top" src={item?.image} />
              <Card.Body>
                <Card.Title>
                  {item?.firstName + " " + item?.lastName}
                </Card.Title>
                <Card.Text>{item?.mma}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
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
              <Card.Body>
                <Button variant="success" role="button">
                  APPROVE
                </Button>
              </Card.Body>
            </Card>
          ))}
      </div>
    </>
  );
};

export default KYCAppComp;
