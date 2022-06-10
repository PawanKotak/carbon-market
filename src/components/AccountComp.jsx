import { Row, Col } from "react-bootstrap";
import {
  PersonFill,
  PersonCircle,
  SuitDiamondFill,
} from "react-bootstrap-icons";
import { useState, useEffect } from "react";

const AccountComp = () => {
  const [userAccount, setUserAccount] = useState("XXXXXXXXXXX");
  const [useName, setUserName] = useState("Unnamed");

  useEffect(() => {
    (async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setUserAccount(accounts[0]);
      console.log("Account", accounts[0]);
    })();
  }, []);

  return (
    <>
      <Row className="vh-25 position-relative">
        <Col>
          <PersonCircle
            size={150}
            className="position-absolute bottom-0 start-10 ms-3"
          ></PersonCircle>
        </Col>
      </Row>
      <Row>
        <Col className="mx-3 fs-3 fw-bold">{useName}</Col>
      </Row>
      <Row>
        <Col className="mx-3 fs-4 fw-lighter">
          <span className="me-2">
            <SuitDiamondFill></SuitDiamondFill>
          </span>
          {userAccount}
        </Col>
      </Row>
    </>
  );
};

export default AccountComp;
