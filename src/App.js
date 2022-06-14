import logo from "./logo.svg";
import {
  LoaderComp,
  FooterComp,
  WelcomeComp,
  NavBarComp,
  PageNotFound,
  LoginComp,
  MarketPlaceComp,
  TokenOwnerComp,
  LoginNewComp,  
  AccountComp,
  KYCComp,
  KYCAppComp,
} from "./components";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginFarmerComp from "./components/LoginFarmerComp";
function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid bg-light">
        <NavBarComp />
        <Routes>
          <Route path="/" element={<WelcomeComp></WelcomeComp>}></Route> 
          <Route path="/tokenowner" element={<TokenOwnerComp></TokenOwnerComp>}></Route>  
          <Route path="/explore-collections" element={<MarketPlaceComp></MarketPlaceComp>}></Route> 
          <Route path="/create" element={<LoginFarmerComp></LoginFarmerComp>}></Route>     
          <Route path="/login-new" element={<LoginNewComp></LoginNewComp>}></Route> 
          <Route path="/kyc" element={<KYCComp></KYCComp>}></Route> 
          <Route path="/kycapp" element={<KYCAppComp></KYCAppComp>}></Route>
          <Route path="/account" element={<AccountComp></AccountComp>}></Route>
          <Route path="/login" element={<LoginComp></LoginComp>}>
            <Route path="/login/farmer" element={<LoginFarmerComp></LoginFarmerComp>}></Route>
            <Route path="/login/marketplace" element={<MarketPlaceComp></MarketPlaceComp>}></Route>
          </Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        </Routes>        
      </div>
      <FooterComp />
    </BrowserRouter>
  );
}

export default App;
