import React from "react";
import NavBar from "../components/navbar/NavBar";
import ProductDetail from "../components/products/ProductDetail";
import ProductTabs from "../components/ProductTabs/ProductTabs";
import Footer from "../footer/Footer";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";

const ProductOverview = () => {
    return(
        <div>
            <NavBar/>
            <ProductDetail/>
            <ProductTabs/>
            <RelatedProducts/>
            <Footer/>
        </div>
    )
}

export default ProductOverview
