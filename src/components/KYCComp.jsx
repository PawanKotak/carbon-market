import { Form, Button, Label, Alert } from "react-bootstrap";
import { useState } from "react";
import Loading from "react-fullscreen-loading";
import axios from "axios";
import { useNavigate } from "react-router";

const config = {
  headers: { "content-type": "application/json" },
};

const KYCComp = () => {
  const [mma, setMMA] = useState();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [alertVariant, setAlertVariant] = useState();
  const [response, setResponse] = useState();

  const navgiate = useNavigate();

  const connectMMA = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);
    setMMA(accounts[0]);
  };

  const submitHandler = (event) => {
    setLoading(true);
    console.log(`Submit Handler`, event.target.elements);
    event.preventDefault();
    const {
      formFirstName,
      formLastName,
      formEmailID,
      formNationalID,
      formCity,
      formState,
      formCountry,
      formFile,
      wallet,
    } = event.target.elements;
    console.log(
      `${formFirstName.value} ${formLastName.value} ${formEmailID.value} ${formNationalID.value} ${wallet.value}`
    );
    const formdata = {
      firstName: formFirstName.value,
      lastName: formLastName.value,
      emailID: formEmailID.value,
      nationalID: formNationalID.value,
      mma: wallet.value,
      city: formCity.value,
      state: formState.value,
      country:formCountry.value,
    };

    console.log(`form data`, formdata);

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/addkycdetails`,
        formdata,
        config
      )
      .then((res) => {
        console.log(`response ${res.toString()}`);
        console.log(res);
        setResponse(res.data);
        setAlertVariant("success");
        setLoading(false);
        setShow(true);
        setTimeout(() => {
          navgiate("/create");
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
        setAlertVariant("danger");
        setLoading(false);
        setShow(true);
        setResponse(err);
      });
  };

  return (
    <>
      {show && (
        <Alert
          variant={alertVariant}
          onClose={() => setShow(false)}
          dismissible
        >
          <Alert.Heading>{alertVariant?.toUpperCase()}!</Alert.Heading>
          <p>
            {alertVariant === "success" ? response.path : response?.toString()}
          </p>
        </Alert>
      )}
      {loading && (
        <Loading loading background="#ced4daaa" loaderColor="#198754" />
      )}
      <Form className="w-50 mx-auto" onSubmit={submitHandler}>
        <header className="fs-2 fw-bold">KYC Registration Form</header>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First name *</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last name *</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmailID">
          <Form.Label>Email *</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formNationalID">
          <Form.Label>National ID *</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCity">
          <Form.Label>City *</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formState">
          <Form.Label>State *</Form.Label>
          <Form.Select aria-label="Default select example">
            <option value="---">--Select state--</option>
            <option value="ANDHRA PRADESH">ANDHRA PRADESH</option>
            <option value="ASSAM">ASSAM</option>
            <option value="BIHAR">BIHAR</option>
            <option value="CHANDIGARH">CHANDIGARH</option>
            <option value="DELHI">DELHI</option>
            <option value="GOA">GOA</option>
            <option value="GUJARAT">GUJARAT</option>
            <option value="HARYANA">HARYANA</option>
            <option value="KARNATAKA">KARNATAKA</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCountry">
          <Form.Label>Country *</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>National ID image*</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Form.Group controlId="wallet" className="mb-3 ">
          <Form.Label>Wallet Address*</Form.Label>
          <div class="input-group ">
            <Form.Control
              type="text"
              value={mma}
              onChange={(e) => setMMA(e.target.value)}
            />
            <Button variant="secondary" type="button" onClick={connectMMA}>
              Get Address
            </Button>
          </div>
        </Form.Group>
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default KYCComp;
