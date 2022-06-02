import Spinner from "react-bootstrap/Spinner";
import { useMoralis } from "react-moralis";
import "./../App.css";

const LoaderCustComp = () => {
  return  <div class="overlay"><div style={{opacity: "0.4"}}><Spinner animation="border" /></div></div>;
};

export default LoaderCustComp;
