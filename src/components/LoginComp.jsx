
import { Link, Route, Outlet } from "react-router-dom";
const LoginComp = () => {
  return (
    <>
      <div className="col-md-12 text-center">
        <Link to="/login/farmer" type="button" class="btn btn-primary m-3">Farmer</Link>
        <Link to="/login/marketplace" type="button" class="btn btn-primary m-3">Buyer</Link>
      </div> 
      <div className="col-md-12">
      {typeof window.ethereum !== "undefined" ? (
        <div class="alert alert-primary" role="alert">
          Meta Mask extension is detected!
        </div>
      ) : (
        <div class="alert alert-danger" role="alert">
          Meta Mask extension needs to be installed or view in chrome browser!{" "}
          <a
            target="_blank"
            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
          >
            Meta Mask Link
          </a>
        </div>
      )}
      </div>
      <Outlet></Outlet>
      
      
    </>
  );
};

export default LoginComp;
