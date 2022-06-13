import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Wallet2, FileImage, CartCheck } from "react-bootstrap-icons";
const WelcomeComp = () => {
  return (
    <main>
      <Row className="mt-5">
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
                Marketplace
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
          <Card className="col-md-11 m-3 mt-5" id="landing-image">
            <Card.Img variant="top" src="/farmer1.png" alt="Outdoor image of Indian farmer" />
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Text className="fs-5 font-italic">
                <i>
                  <b>Outdoor image of Indian farmer</b>
                </i>{" "}
                Image courtesy@unsplash.com
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="fs-2 fw-bolder row text-center my-5">
        <Col>Create and sell your carbon credit NFTs</Col>
      </Row>
      <Row className="text-center">
        <Col>
          <div className="mb-3">
            <Wallet2 size={40} />
          </div>
          <h4 className="mb-3"> Set up your wallet</h4>
          <div className="mx-auto col-6 text-secondary fs-5">
            Once you’ve set up your wallet of choice, connect it to site by
            clicking the wallet icon in the top right corner
          </div>
        </Col>
        <Col>
          <div className="mb-3">
            <FileImage size={40}></FileImage>
          </div>
          <h4 className="mb-3"> Add your NFTs</h4>
          <div className="mx-auto col-6 text-secondary fs-5">
            Upload image, add a carbon credit of your farm and mint NFT.
          </div>
        </Col>
        <Col>
          <div className="mb-3">
            <CartCheck size={40}></CartCheck>
          </div>
          <h4 className="mb-3"> Buy Carbon Credit NFTs</h4>
          <div className="mx-auto col-6 text-secondary fs-5">
            Choose between NFTs listings. You can buy carbon credit and help
            farmer monetary !
          </div>
        </Col>
      </Row>
    </main>
  );
};

export default WelcomeComp;
