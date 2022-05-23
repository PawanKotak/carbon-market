
import { Link, Route, Outlet } from "react-router-dom";
const LoginComp = () => {
  return (
    <>
      <div className="col-md-12 text-center">
        <Link to="/login/farmer" type="button" class="btn btn-primary m-3">Farmer</Link>
        <Link to="/login/buyer" type="button" class="btn btn-primary m-3">Buyer</Link>
      </div> 
      <Outlet></Outlet>
      
      
    </>
  );
};

export default LoginComp;
