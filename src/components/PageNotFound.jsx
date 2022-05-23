import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <>
      <div class="px-4 py-5 my-5 text-center">
        <h1 class="display-5 fw-bold">404</h1>
        <div class="col-lg-6 mx-auto">
          <p class="lead mb-4">
            This page is not available.
          </p>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link  to="/" type="button" class="btn btn-primary btn-lg px-4 gap-3">
              Visit site home
            </Link>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
