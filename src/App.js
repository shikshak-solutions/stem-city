import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetail from "./components/products/ProductDetail";
import ProductOverview from "./pages/ProductOverview";
import Product from "./pages/Product";


function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route exact path="/" element={<HomePage />}/>
              <Route exact path="/product/:id" element={<ProductOverview />}/>
              <Route exact path="/products" element={<Product />}/>
          </Routes>
      </BrowserRouter>

  );
}

export default App;
