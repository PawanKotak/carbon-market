import { Link } from "react-router-dom";
const WelcomeComp = () => {
  return (
    <main>
      <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
        <div class="col-md-5 p-lg-5 mx-auto my-5">
          <h1 class="display-5 fw-normal">Buy and Sell Carbon credit </h1>
          <p class="lead fw-normal">
            Maketplace to buy carbon credit from farmer and help them to continue sustainable farming practice.
            
          </p>
          <Link class="btn btn-outline-secondary" to="/login/marketplace">
            Let's get started
          </Link>
        </div>
        {/* <div class="product-device shadow-sm d-none d-md-block"></div>
        <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div> */}
      </div>
      {/* carousel */}
     
      
    </main>
  );
};

export default WelcomeComp;
