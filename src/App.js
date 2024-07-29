import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductOverview from "./pages/ProductOverview";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Login from "./pages/Login";
import FlipBook from "./pages/FlipBook";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundAndCancellation from "./pages/RefundAndCancellation";
import ReturnPolicy from "./pages/ReturnPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import SignUp from "./pages/SignUp";
import {useEffectOnce} from "./redux/hooks/useEffectOnce";
import {actionToGetSEOMetaDataApiCall} from "./redux/action";
import {useDispatch} from "react-redux";
import {HelmetComponent} from "./components/layout/HelmetComponent";
import {parseJwt} from "./redux/utility/jwtUtils";
import useAuth from "./redux/hooks/useAuth";

function App() {
    const { setAuth } = useAuth();
    const dispatch = useDispatch();
    const authorized = async()=>{
        if(localStorage.getItem('user')){
            const data = JSON.parse(localStorage.getItem('user'));
            if (data.accessToken ) {
                let user =  await parseJwt(data.accessToken);
                let value  = user.user
                setAuth({...value});
            }
        }
    }
    useEffectOnce(()=>{
        dispatch(actionToGetSEOMetaDataApiCall());
    })
  return (
      <BrowserRouter>
          <HelmetComponent />
          <Routes>
              <Route exact path="/" element={<HomePage />}/>
              <Route exact path="/product/:id" element={<ProductOverview />}/>
              <Route exact path="/products" element={<Product />}/>
              <Route exact path="/cart" element={<Cart />}/>
              <Route exact path="/account" element={<Account />}/>
              <Route exact path="/login" element={<Login />}/>
              <Route exact path="/signup" element={<SignUp />}/>
              <Route exact path="/flipbook" element={<FlipBook />}/>
              <Route exact path="/terms-and-conditions" element={<TermsAndConditions />}/>
              <Route exact path="/privacy-policy" element={<PrivacyPolicy />}/>
              <Route exact path="/refund-and-cancellation" element={<RefundAndCancellation />}/>
              <Route exact path="/return-policy" element={<ReturnPolicy />}/>
              <Route exact path="/shipping-policy" element={<ShippingPolicy />}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
