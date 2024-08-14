import React from "react";
import "./ProductTabs.css";
import product from "../../pages/Product";
import {useSelector} from "react-redux";

const ProductTabs = () => {
    const Product = useSelector((state) => state.product.ProductDetailData);

    if (!product) {
        return <h2>Product not found</h2>;
    }
    return (
        <div className='descriptionbox'>
           <div className='descriptionbox-description' dangerouslySetInnerHTML={{__html: Product?.long_description}}>
           </div>
        </div>
    )
}

export default ProductTabs
