import logo from "./logo.svg";
import {
  LoaderComp,
  FooterComp,
  WelcomeComp,
  NavBarComp,
  PageNotFound,
  LoginComp,
} from "./components";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginFarmerComp from "./components/LoginFarmerComp";
function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <NavBarComp />
        <Routes>
          <Route path="/" element={<WelcomeComp></WelcomeComp>}></Route>
          <Route path="/marketplace" element={<div>Marketplace</div>}></Route>
          <Route path="/login" element={<LoginComp></LoginComp>}>
            <Route path="/login/farmer" element={<LoginFarmerComp></LoginFarmerComp>}></Route>
            <Route path="/login/buyer" element={<div>Coming Soon</div>}></Route>
          </Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
        <FooterComp />
      </div>
    </BrowserRouter>
  );
}

export default App;
