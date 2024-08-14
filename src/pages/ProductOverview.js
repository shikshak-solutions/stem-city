import React from "react";
import ProductDetail from "../components/products/ProductDetail";
import ProductTabs from "../components/ProductTabs/ProductTabs";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";

const ProductOverview = () => {
    return(
        <div>
            <ProductDetail/>
            <ProductTabs/>
            <RelatedProducts/>
        </div>
    )
}

export default ProductOverview
