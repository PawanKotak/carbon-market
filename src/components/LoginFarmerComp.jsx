import axios from "axios";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

const LoginFarmerComp = () => {
  const [nftImage, setNFTImage] = useState();
  const [loaded, setLoaded] = useState(true);
  const { authenticate, isAuthenticated, user } = useMoralis();

  const handleImageGenerate = () => {
    console.log("TEST");
    setLoaded(false);
    axios.get("http://localhost:4000").then((resp) => {
      const imageURL = resp.data.imageURL;
      setNFTImage(imageURL + "?" + Math.random());
      //setNFTImage(imageURL)
      setLoaded(true);
      //fetch(imageURL);

      
    });
  };

  useEffect(() => {}, []);

  if (!isAuthenticated) {
    return (
      <div>
        <button onClick={() => authenticate()}>Authenticate</button>
      </div>
    );
  }

  const submitHandler = (event) =>{
    console.log(`Submit Handler`);
    event.preventDefault();

    axios.post('http://localhost:4000')
    .then((data)=>{
      console.log("TEST")
    })
  }

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
      {/* <div className="form-group">
                <label forHTML="formFile" className="form-label">NFT Art file</label>
                <input className="form-control" type="file" id="formFile"></input>
            </div> */}

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

      <div className="form-group mt-2">
        <input className="form-control btn btn-primary" type="submit"></input>
      </div>
    </form>
  );
};

export default LoginFarmerComp;
