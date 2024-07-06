import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductOverview from "./pages/ProductOverview";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Login from "./pages/Login";


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
          </Routes>
      </BrowserRouter>

  );
}

export default App;
