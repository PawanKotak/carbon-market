import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { React, useState } from "react";
const MaketPlaceComp = () => {
  const [prodDetails, setProdDetails] = useState([
    {
      title: "ABE",
      image:
        "https://ipfs.io/ipfs/QmWJ7BuPaWWtxmJSxdzbfPYCcrfqnyUtwP56amgCEmgjD5",
      cc: 88,
      country: "IND",
    },
    {
      title: "DFE",
      image:
        "https://ipfs.io/ipfs/QmPAAkK2BJFyPDzSyNNPNdQnR8VR2AEp6R9Nnxt5UKqifv",
      cc: 54,
      country: "IND",
    },
    {
      title: "QWE",
      image:
        "https://bafybeibphrqfwnetgzyk3eouk3uj7uknv4zc2wizu23a74je6rpjnqyyjm.ipfs.infura-ipfs.io",
      cc: 45,
      country: "IND",
    },
    {
      title: "YTRE",
      image:
        "https://ipfs.io/ipfs/QmPAAkK2BJFyPDzSyNNPNdQnR8VR2AEp6R9Nnxt5UKqifv",
      cc: 65,
      country: "IND",
    },
    {
      title: "CDSE",
      image:
        "https://ipfs.io/ipfs/QmWJ7BuPaWWtxmJSxdzbfPYCcrfqnyUtwP56amgCEmgjD5",
      cc: 43,
      country: "IND",
    },
    {
      title: "ABE",
      image:
        "https://bafybeibphrqfwnetgzyk3eouk3uj7uknv4zc2wizu23a74je6rpjnqyyjm.ipfs.infura-ipfs.io",
      cc: 76,
      country: "IND",
    },
    {
      title: "DFE",
      image:
        "https://ipfs.io/ipfs/QmPAAkK2BJFyPDzSyNNPNdQnR8VR2AEp6R9Nnxt5UKqifv",
      cc: 56,
      country: "IND",
    },
    {
      title: "QWE",
      image:
        "https://bafybeibphrqfwnetgzyk3eouk3uj7uknv4zc2wizu23a74je6rpjnqyyjm.ipfs.infura-ipfs.io",
      cc: 89,
      country: "IND",
    },
    {
      title: "YTRE",
      image:
        "https://ipfs.io/ipfs/QmPAAkK2BJFyPDzSyNNPNdQnR8VR2AEp6R9Nnxt5UKqifv",
      cc: 67,
      country: "IND",
    },
    {
      title: "CDSE",
      image:
        "https://ipfs.io/ipfs/QmWJ7BuPaWWtxmJSxdzbfPYCcrfqnyUtwP56amgCEmgjD5",
      cc: 90,
      country: "IND",
    },
  ]);
  return (
    <div className="row p-3">
      {prodDetails &&
        prodDetails.map((item) => (
          <Card className="col-md-4 m-3" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>{item.title}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <b>Carbon Credit</b>: {item.cc}
              </ListGroupItem>
              <ListGroupItem>
                <b>Country</b>: {item.country}
              </ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button variant="primary">BUY</Button>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

export default MaketPlaceComp;
