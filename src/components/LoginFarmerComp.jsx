import axios from "axios";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
const BACKEND_URL = "http://localhost:4000";

const LoginFarmerComp = () => {
  const [nftImage, setNFTImage] = useState();
  const [loaded, setLoaded] = useState(true);
  const { authenticate, isAuthenticated, user } = useMoralis();
  const [ipfsData, setIPFSData] = useState();

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
    axios.get(BACKEND_URL).then((resp) => {
      const imageURL = resp.data.imageURL;
      setNFTImage(imageURL + "?" + Math.random());
      setLoaded(true);
    });
  };

  const submitHandler = (event) => {
    console.log(`Submit Handler`, event.target.elements);
    const {carbonpoints,mobile,name, aadharnum, state,gender,imageFile,city,price,country} = event.target.elements;
    console.log(`Carbonpoint`,carbonpoints.value);
    event.preventDefault();
    let formdata = {
              carbonpoints:carbonpoints.value,
              mobile:mobile.value,
              name:name.value,
              aadharnum:aadharnum.value,
              city:city.value,
              state:state.value,
              country:country.value,
              price:price.value,
              gender:gender.value
             }
    const config = {
      headers: { "content-type": "application/json" },
    };
    console.table(formdata);
    axios.post(BACKEND_URL,formdata,config).then((data) => {
      setIPFSData(data);
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <label forHTML="carbonpoints"> Carbon Credit</label>
        <input
          className="form-control"
          id="carbonpoints"
          type="number"
          placeholder="Enter carbon credit"
        ></input>
      </div>
     
      <div className="form-group">
        <label>Name</label>
        <input
          className="form-control"
          id="name"
          placeholder="Enter name"
        ></input>
      </div>
      <div className="form-group">
        <label> Mobile</label>
        <input
          className="form-control"
          id="mobile"
          placeholder="Enter phone number"
          type="tel"
        ></input>
      </div>
      <div className="form-group">
        <label>Aadhar Card Number</label>
        <input className="form-control" id="aadharnum"></input>
      </div>
      <div className="form-group">
        <label>Price</label>
        <input className="form-control" id="price" type="number"></input>
      </div>
      <div className="form-group">
        <label>City</label>
        <input className="form-control" id="city"></input>
      </div>      
      <div className="form-group">
        <label>State</label>
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
      <div className="form-group">
        <label>Country</label>
        <input className="form-control" id="country"></input>
      </div> 
      <div className="form-group">
        <label>Gender</label>
        <select className="form-control" id="gender">
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>
      <div className="form-group w-25 mt-2">
        <input
          className="form-control btn btn-primary col"
          type="button"
          onClick={handleImageGenerate}
          value="Generate"
        ></input>
      </div>

      <div className="form-group">
        <img src={nftImage} alt="" className="col img-thumbnail w-25 h-25" />
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
  );
};

export default LoginFarmerComp;
