import { Link } from "react-router-dom";
import { Col, Form } from "react-bootstrap";
import {PersonCircle, WalletFill} from "react-bootstrap-icons";

const NavBarComp = () => {
  return (
    <header class="margin-bottom-zero  bg-white sticky-top d-flex flex-wrap align-items-center justify-content-center justify-content-md-between p-3  border-bottom">
      <Link to="/" className="">
        <img src="/logo.png" alt="image" style={{ height: "2.5rem" }}></img>
      </Link>
      <Col className="ms-5 ">
        <Form.Control placeholder="Search items" className="searchcss" disabled />
      </Col>
      <div className="me-5 ">
        <button type="button" className="btn btn-outline-secondary searchcss" disabled>
          <svg width="15px" height="15px">
            <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
          </svg>
        </button>
      </div>

      <ul class="nav text-end">
        {[
          { title: "Marketplace", url: "/explore-collections", description:"Search and Buy carbon credit" },
          { title: "Create", url: "/create", description:"Create NFT for farmer carbon credit"  },         
          { title: "Check Owner", url: "/tokenowner" , description:"Check NFT owner" },
          { title: "Registration", url: "/kyc" , description:"Farmer KYC" },
        ].map((item, index) => {
          return (
            <li key={index}>
              <Link to={item.url} class="nav-link px-4 link-dark h4" title={item?.description}>
                {item.title}
              </Link>
            </li>
          );
        })}
        <Link to="/login-new" type="button" className="nav-link px-4 link-dark h4" title="Login">          
          <PersonCircle size={30}></PersonCircle>
        </Link>
        <Link to="#" type="button" className="nav-link px-4 link-dark h4" title="Wallet">          
          <WalletFill size={30}></WalletFill>
        </Link>
      </ul>
    </header>
  );
};

export default NavBarComp;
