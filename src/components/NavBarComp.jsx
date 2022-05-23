import { Link } from "react-router-dom";
const NavBarComp = () => {
  return(  
    <header class="sticky-top d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
    
      <Link to="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        <b>CO2</b>
      </Link>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        {["Home", "Features", "Tutorial","FAQs", "About"].map((item,index)=>{

          return (            
            <li key={index}><a href="#" class="nav-link px-2 link-dark">{item}</a></li>
          )
        })}
      </ul>

      <div class="col-md-3 text-end">
        <Link to="/login" type="button" className="btn btn-outline-primary me-2">Login</Link>
        <Link to="/signup" type="button" className="btn btn-primary">Sign-up</Link>
      </div>      
    </header>);
};

export default NavBarComp;
