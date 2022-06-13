import { Row, Col, ListGroup ,Alert  } from "react-bootstrap";
import { useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";

const LoginNewComp = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
 
  const checkWalletConnect = async () => {

    if (!("ethereum" in window)) {
      console.log('test');
      window.open("https://metamask.io/download");
      setShow(true);
    } else {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      navigate("/account");
      console.log("Account", accounts[0]);
    }
  }
  useEffect(()=>{
    checkWalletConnect()
  },[]);

  const handleWallet = () => {
    console.log(`Handle Wallet`);
    checkWalletConnect();
  };

  return (
    <>
      { show &&  <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>You got an error!</Alert.Heading>
        <p>
        Wallet extension needs to be installed {" "}
        <a
            target="_blank"
            href="https://metamask.io/download/"
          >
            Meta Mask Link
          </a>
        </p>
      </Alert>}
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
