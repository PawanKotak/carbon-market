import axios from "axios";
import { useState } from "react";
const BACKEND_URL = "http://localhost:4000";
const config = {
  headers: { "content-type": "application/json" },
};
const TokenOwnerComp = () => {

  const [ownerAddress, setOwnerAddress] = useState("XXXXXXXXXXXXXXXXXXXXXXX");

  const submitHandler = async (event) => {
    event.preventDefault();

    const { tokenid } = event.target.elements;
    const data = { tokenID: tokenid.value };

    console.log("formdata", data);
    const res = await fetch(BACKEND_URL + "/getOwner", {
      body: JSON.stringify(data),
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resultOwnAddress = await res.text();
    setOwnerAddress(resultOwnAddress)
  };

  return (
    <>
      <h3>Get Token Owner</h3>
      <form onSubmit={submitHandler}>
        <div className="form-group col-6">
          <label forHTML="tokenid">Token ID</label>
          <div class="form-horizontal">
            <div class="input-group">
              <input type="text" class="form-control" id="tokenid"></input>
              <span class="input-group-btn bg-secondary">
                <button class="btn btn-default text-white" type="submit">
                  GET Address
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="form-group col-6">
          <label>Owner Address</label>
          <labe class="form-control"> {ownerAddress} </labe>
        </div>
      </form>
    </>
  );
};

export default TokenOwnerComp;
