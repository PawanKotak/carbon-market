import { Link } from "react-router-dom";

const NavBarComp = () => {
  return (
    <header class="bg-white sticky-top d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">

        <Link
          to="/"
          className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
        >
          <img src="/logo.png" alt="image" style={{ height: "2.5rem" }}></img>
        </Link>
        

        <ul class="nav text-end">
          {[
            { title: "Explore", url: "/explore-collections" },            
            { title: "Create", url: "/create" },            
            { title: "NFT Details", url: "/tokenowner" },
          ].map((item, index) => {
            return (
              <li key={index}>
                <Link to={item.url} class="nav-link px-4 link-dark h4">
                  {item.title}
                </Link>
              </li>
            );
          })}
          <Link
            to="/login"
            type="button"
            className="nav-link px-4 link-dark h4"
          >
            Register
          </Link>
        </ul>
       
       
      
    </header>
  );
};

export default NavBarComp;
