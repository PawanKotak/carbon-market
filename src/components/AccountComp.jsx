import { Row, Col, Tabs, Tab } from "react-bootstrap";
import {
  PersonFill,
  PersonCircle,
  SuitDiamondFill,
} from "react-bootstrap-icons";
import { useState, useEffect } from "react";

const AccountComp = () => {
  const [userAccount, setUserAccount] = useState("XXXXXXXXXXX");
  const [useName, setUserName] = useState("Pawan Kotak");
  const [key, setKey] = useState("collected");

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
          <span className="me-2 fs-5 fw-bold">
            {/* <SuitDiamondFill></SuitDiamondFill> */}
            USER ADDRESS:
          </span>
          {userAccount}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3  fs-5"
          >
            <Tab eventKey="collected" title="Collected">
              <div >Collected</div>
            </Tab>
            <Tab eventKey="created" title="Created">
            <div>Created</div>
            </Tab>
            <Tab eventKey="favourited" title="Favourited" disabled>
            <div>Favourited</div>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default AccountComp;
