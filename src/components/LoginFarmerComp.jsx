import axios from "axios";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useMoralis } from "react-moralis";
import "./../App.css";
import LoaderCustComp from "./LoaderCustComp";
import { useNavigate } from "react-router-dom";
import Loading from "react-fullscreen-loading";
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
  const [price, setPrice] = useState(0);
  const [mma, setMMA] = useState();
  const [loader, setLoader] = useState(false);
  const [aadhar, setAadhar] = useState();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [alertVariant, setAlertVariant] = useState();

  useEffect(() => {
    console.log("useEffect");
    if (!("ethereum" in window)) {
      navigate("/login-new");
    } else {
      (async () => {
        await connectMMA();
        if (process.env.REACT_APP_KYC == "true") {
          //Input Data
          const inputData = {
            mma,
          };
          console.log(inputData);

          //API Call only if mma is not undefined
          if (mma !== undefined) {
            axios
              .post(BACKEND_URL + "/checkKYC", inputData, config)
              .then((resp) => {
                console.log(`res`, resp);
                if (!resp.data.kycrequested) navigate("/kyc");
                else if (resp.data.kycrequested && !resp.data.kycapprove) {
                  navigate("/kycnotapproved");
                } else {
                  axios
                    .post(BACKEND_URL + "/getKYCDetails", inputData, config)
                    .then((res) => {
                      console.log(`KYC details`, res);
                      setFormData(res.data);
                      setCC(res.data.cc);
                      setPrice(parseInt(res.data.cc));
                      setNFTImage(res.data.certiimgurl);
                    });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        } else {
        }
      })();
    }
  }, [mma]);

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
    setLoader(true);
    setLoading(true);
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
    axios
      .post(BACKEND_URL, formdata, config)
      .then((data) => {
        setIPFSData(data);
        setLoader(false);
        setAlertVariant("success");
        setLoading(false);
        setShow(true);
        window.scrollTo(0, 0); //Move to Top
        setTimeout(() => {
          navigate("/explore-collections");
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
        setAlertVariant("danger");
        setLoading(false);
        setShow(true);
        window.scrollTo(0, 0); //Move to Top
      });
  };

  const connectMMA = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);
    setMMA(accounts[0]);
  };

  const getCCHandler = async () => {
    const result = await axios.get(
      `http://localhost:5000/users?landrecordid_like=${aadhar}`
    );
    console.log(`result ${JSON.stringify(result.data)}`);
    if (Array.isArray(result.data) && result.data.length > 0) {
      console.log("asdf", result.data[0].cc);
      setCC(result.data[0].cc);
      setPrice(parseInt(result.data[0].cc ));
    }
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
          <p>{alertVariant === "success" ? "" : ""}</p>
        </Alert>
      )}
      {loading && (
        <Loading loading background="#ced4daaa" loaderColor="#198754" />
      )}
      <form onSubmit={submitHandler}>
        <div className="card mt-3">
          <h5 class="card-header">Personal Detail's</h5>
          <div class="card-body">
            <div className="row">
              <div className="form-group col-4">
                <label>NAME</label>
                <input
                  className="form-control"
                  id="name"
                  placeholder="Enter name"
                  value={formData.firstName + " " + formData.lastName}
                  readOnly={true}
                ></input>
              </div>
              <div className="form-group col-4">
                <label> EMAIL</label>
                <input
                  className="form-control"
                  id="mobile"
                  placeholder="Enter phone number"
                  type="tel"
                  value={formData.emailID}
                  readOnly={true}
                ></input>
              </div>

              <div className="form-group col-4">
                <label>CITY</label>
                <input
                  className="form-control"
                  id="city"
                  value={formData.city}
                  readOnly={true}
                ></input>
              </div>
              <div className="form-group col-4">
                <label>STATE</label>
                <select
                  className="form-control"
                  id="state"
                  value={formData.state}
                  readOnly={true}
                >
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
                <input
                  className="form-control"
                  id="country"
                  value={formData.country}
                  readOnly={true}
                ></input>
              </div>
              <div className="form-group col-4 d-none">
                <label>GENDER</label>
                <select className="form-control" id="gender" readOnly={true}>
                  <option value="">--Select--</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* Carbon Section */}
        <div className="card mt-3">
          <h5 class="card-header">Carbon Credit Detail's</h5>
          <div class="card-body">
            <div className="row">
              <div className="col">
                <div className="row">
                  <div className="form-group col-6">
                    <label forHTML="carbonpoints"> CARBON CREDIT (in tons)</label>
                    <input
                      className="form-control "
                      id="carbonpoints"
                      type="number"
                      placeholder="Enter carbon credit"
                      onChange={(e) => setCC(e.target.value)}
                      value={cc}
                      readOnly={true}
                    ></input>
                  </div>
                  <div className="form-group col-6">
                    <label>PRICE (in Ether)</label>
                    <input
                      className="form-control"
                      id="price"
                      type="number"
                      value={price}
                      readOnly
                    ></input>
                  </div>
                  <div className="form-group col-6">
                    <label>Reading Time </label>
                    <input
                      className="form-control"
                      id="time"
                      type="text"
                      value={new Date(formData?.created)}
                      readOnly
                    ></input>
                  </div>
                  <div className="form-group col-6">
                    <label>LAND RECORD ID (Like "LR1234" "LR1111")</label>
                    <div class="form-horizontal">
                      <div class="input-group">
                        <input
                          className="form-control"
                          id="aadharnum"
                          value={formData.landrecordID}
                          onChange={(e) => setAadhar(e.target.value)}
                        ></input>
                        <span class="input-group-btn bg-secondary">
                          <button
                            class="btn btn-default text-white d-none"
                            type="button"
                            onClick={getCCHandler}
                          >
                            GET CARBON CREDIT
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-6">
                    <label>META MASK ADDRESS</label>
                    <div class="form-horizontal">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control"
                          value={mma}
                          id="mmaddress"
                          onChange={(e) => setMMA(e.target.value)}
                        ></input>
                        <span class="input-group-btn bg-secondary">
                          <button
                            class="btn btn-default text-white d-none"
                            type="button"
                            onClick={connectMMA}
                          >
                            GET MMA
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col col-4">
                <div className="form-group  mt-2 ">
                  <input
                    className="form-control btn btn-success col d-none"
                    type="button"
                    onClick={handleImageGenerate}
                    value="Generate"
                  ></input>
                </div>

                <div className="form-group">
                  <img
                    src={nftImage}
                    alt=""
                    className="col img-thumbnail shadow "
                    style={{ height: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-group mt-2">
          <input className="form-control btn btn-success" type="submit"></input>
        </div>
        <div className="form-group mt-2"></div>
      </form>
    </>
  );
};

export default LoginFarmerComp;
