import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Login from "./pages/Login";
import FlipBook from "./pages/FlipBook";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import RefundAndCancellation from "./pages/RefundAndCancellation";
import ReturnPolicy from "./pages/ReturnPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import {useEffectOnce} from "./redux/hooks/useEffectOnce";
import {actionToGetSEOMetaDataApiCall, actionToLoadCart} from "./redux/action";
import {useDispatch} from "react-redux";
import {HelmetComponent} from "./components/layout/HelmetComponent";
import {parseJwt} from "./redux/utility/jwtUtils";
import useAuth from "./redux/hooks/useAuth";
import RequireAuth from "./components/auth/RequireAuth";
import ErrorPage from "./pages/ErrorPage";
import ForgotPassword from "./pages/ForgotPassword";
import Checkout from "./pages/Checkout";
import ProductMainPage from "./pages/ProducMainPage";
import Layout from "./components/layout/Layout";

function App() {
    const { setAuth } = useAuth();
    const dispatch = useDispatch();
    const ROLES = {
        'Student': 4,
        'Teacher': 3,
        'School': 2,
        'Admin': 1,
        'Customer':5
    }
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
        // Load cart from localStorage
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            dispatch(actionToLoadCart(storedCart));
        }
        authorized();
        dispatch(actionToGetSEOMetaDataApiCall());
    })
  return (
      <BrowserRouter>
          <HelmetComponent />
          <Routes>
              <Route path={''} element={<Layout />}>
              <Route exact path="/" element={<HomePage />}/>
              <Route exact path="/products/*" element={<ProductMainPage />}/>
              <Route exact path="/cart" element={<Cart />}/>
              <Route exact path="/login" element={<Login />}/>
              {/*<Route exact path="/signup" element={<SignUp />}/>*/}
              <Route exact path="/forgot-password" element={<ForgotPassword />}/>
              <Route exact path="/checkout" element={<Checkout />}/>
              <Route exact path="/flipbook" element={<FlipBook />}/>
              <Route exact path="/terms-and-conditions" element={<TermsAndConditions />}/>
              <Route exact path="/privacy-policy" element={<PrivacyPolicyPage />}/>
              <Route exact path="/refund-and-cancellation" element={<RefundAndCancellation />}/>
              <Route exact path="/return-policy" element={<ReturnPolicy />}/>
              <Route exact path="/shipping-policy" element={<ShippingPolicy />}/>
              {/* we want to protect these routes */}
              <Route element={<RequireAuth allowedRoles={[ROLES.Student,ROLES.Teacher,ROLES.School,ROLES.Customer,ROLES.Admin]} />}>
                  <Route exact path="/account" element={<Account />}/>
              </Route>

              {/* catch all */}
              <Route path="/*" element={<ErrorPage />}/>
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
