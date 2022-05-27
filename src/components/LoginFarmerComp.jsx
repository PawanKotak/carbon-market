import axios from "axios";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
const BACKEND_URL = "http://localhost:4000";

const config = {
  headers: { "content-type": "application/json" },
};

const LoginFarmerComp = () => {
  const [nftImage, setNFTImage] = useState(
    "http://localhost:4000/defaultImage.png"
  );
  const [loaded, setLoaded] = useState(true);
  const { authenticate, isAuthenticated, user } = useMoralis();
  const [ipfsData, setIPFSData] = useState();
  const [cc, setCC] = useState(0);
  const [mma,setMMA] = useState();

  // if (!isAuthenticated) {
  //   return (
  //     <div>
  //       <button onClick={() => authenticate()}>Authenticate</button>
  //     </div>
  //   );
  // }

  const handleImageGenerate = () => {
    console.log("TEST");
    setLoaded(false);
    const inputData = {
      text: `CC:${cc} T:${new Date().getTime()}`,
    };
    axios.post(BACKEND_URL + "/getImage", inputData, config).then((resp) => {
      const imageURL = resp.data.imageURL;
      setNFTImage(imageURL + "?" + Math.random());
      setLoaded(true);
    });
  };

  const submitHandler = (event) => {
    console.log(`Submit Handler`, event.target.elements);
    const {
      carbonpoints,
      mobile,
      name,
      aadharnum,
      state,
      gender,
      imageFile,
      city,
      price,
      country,
      mmaddress,
    } = event.target.elements;
    console.log(`Carbonpoint`, carbonpoints.value);
    event.preventDefault();
    let formdata = {
      carbonpoints: carbonpoints.value,
      mobile: mobile.value,
      name: name.value,
      aadharnum: aadharnum.value,
      city: city.value,
      state: state.value,
      country: country.value,
      price: price.value,
      gender: gender.value,
      mmaddress: mmaddress.value,
    };

    console.table(formdata);
    axios.post(BACKEND_URL, formdata, config).then((data) => {
      setIPFSData(data);
    });
  };

  const connectMMA = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts);
    setMMA(accounts[0]);
  }

  return (
    <>
      {typeof window.ethereum !== "undefined" ? (
        <div class="alert alert-primary" role="alert">
          Meta Mask extension is already installed!
        </div>
      ) : (
        <div class="alert alert-danger" role="alert">
          Meta Mask extension need to be installed or view in chrome browser!{" "}
          <a
            target="_blank"
            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
          >
            Meta Mask Link
          </a>
        </div>
      )}
      <form onSubmit={submitHandler}>
        <div className="row">
          <div className="form-group col-4">
            <label forHTML="carbonpoints"> CARBON CREDIT</label>
            <input
              className="form-control"
              id="carbonpoints"
              type="number"
              placeholder="Enter carbon credit"
              onChange={(e) => setCC(e.target.value)}
            ></input>
          </div>
          <div className="form-group col-4">
            <label>PRICE</label>
            <input className="form-control" id="price" type="number"></input>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-4">
            <label>NAME</label>
            <input
              className="form-control"
              id="name"
              placeholder="Enter name"
            ></input>
          </div>
          <div className="form-group col-4">
            <label> MOBILE</label>
            <input
              className="form-control"
              id="mobile"
              placeholder="Enter phone number"
              type="tel"
            ></input>
          </div>
          <div className="form-group col-4">
            <label>AADHAR CARD NUMBER</label>
            <input className="form-control" id="aadharnum"></input>
          </div>

          <div className="form-group col-4">
            <label>CITY</label>
            <input className="form-control" id="city"></input>
          </div>
          <div className="form-group col-4">
            <label>STATE</label>
            <select className="form-control" id="state">
              <option disabled="true">---Select State----</option>
              <option>ANDHRA PRADESH</option>
              <option>ASSAM</option>
              <option>BIHAR</option>
              <option>CHANDIGARH</option>
              <option>DELHI</option>
              <option>GOA</option>
              <option>GUJARAT</option>
              <option>HARYANA</option>
              <option>KARNATAKA</option>
            </select>
          </div>
          <div className="form-group col-4">
            <label>COUNTRY</label>
            <input className="form-control" id="country"></input>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-4">
            <label>GENDER</label>
            <select className="form-control" id="gender">
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div className="form-group col-4">
            <label>META MASK ADDRESS</label>
            <div class="form-horizontal">
              <div class="input-group">
                  <input type="text" class="form-control" value={mma} ></input>
                  <span class="input-group-btn bg-secondary" >
                      <button class="btn btn-default text-white" type="button" onClick={connectMMA}>GET MMA</button>
                  </span>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group w-25 mt-2">
          <input
            className="form-control btn btn-primary col"
            type="button"
            onClick={handleImageGenerate}
            value="Generate"
          ></input>
        </div>

        <div className="form-group" style={{ height: "50vh" }}>
          <img
            src={nftImage}
            alt=""
            className="col img-thumbnail w-25"
            style={{ height: "100%" }}
          />
        </div>
        {/* <div className="form-group">
          <label for="formFile" class="form-label">
            Upload farmer image
          </label>
          <input class="form-control" type="file" id="imageFile"></input>
        </div> */}
        <div className="form-group mt-2">
          <input className="form-control btn btn-primary" type="submit"></input>
        </div>
        <div className="form-group mt-2">{JSON.stringify(ipfsData)}</div>
      </form>
    </>
  );
};

export default LoginFarmerComp;
