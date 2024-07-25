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

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route exact path="/" element={<HomePage />}/>
              <Route exact path="/product/:id" element={<ProductOverview />}/>
              <Route exact path="/products" element={<Product />}/>
              <Route exact path="/cart" element={<Cart />}/>
              <Route exact path="/account" element={<Account />}/>
              <Route exact path="/login" element={<Login />}/>
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
