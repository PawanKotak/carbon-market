import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
const WelcomeComp = () => {
  return (
    <main>
      <Row>
        <Col>
          <div class="position-relative overflow-hidden  ">
            <div class=" p-lg-5  my-5">
              <h1 class="display-3 fw-bolder mb-4">
                Search, collect, and sell carbon credit NFTs{" "}
              </h1>
              <p class="lead fw-normal fs-3 mb-5">
                Marketplace to buy carbon credit from farmer and help them to
                continue sustainable farming practice.
              </p>
              <Link
                class="btn btn-success me-4 w-25 fs-4 fw-bolder"
                to="/explore-collections"
              >
                Explore
              </Link>
              <Link
                class="btn btn-outline-secondary w-25 fs-4 fw-bolder"
                to="/create"
              >
                Create
              </Link>
            </div>
          </div>
        </Col>
        <Col>
          <Card className="col-md-11 m-3 mt-5">
            <Card.Img variant="top" src="/farmer1.png" />
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Text></Card.Text>
            </Card.Body>

            <Card.Body>
            Outdoor image of  Indian farmer
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </main>
  );
};

export default WelcomeComp;
