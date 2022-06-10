import { Row, Col, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginNewComp = () => {
  const navigate = useNavigate();
  const handleWallet = async () => {
    console.log(`Handle Wallet`);

    if (!("ethereum" in window)) {
      window.open("https://metamask.io/download");
    } else {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      navigate("/account");
      console.log("Account", accounts[0]);
    }
  };
  return (
    <>
      <Row className="mt-5">
        <Col className="col-6 mx-auto">
          <div className="display-6 fw-bold"> Connect your wallet.</div>
          <div className="mt-3 fs-5 text-secondary">
            Connect with one of our available wallet providers or create a new
            one.
          </div>
          <section className="mt-4">
            <ListGroup className="fs-5 fw-bold">
              <ListGroup.Item className="p-4" onClick={handleWallet}>
                MetaMask
              </ListGroup.Item>
              <ListGroup.Item className="p-4" disabled>
                Coinbase Wallet
              </ListGroup.Item>
              <ListGroup.Item className="p-4" disabled>
                WalletConnect
              </ListGroup.Item>
              <ListGroup.Item className="p-4" disabled>
                Porta ac consectetur ac
              </ListGroup.Item>
            </ListGroup>
          </section>
        </Col>
      </Row>
    </>
  );
};

export default LoginNewComp;
