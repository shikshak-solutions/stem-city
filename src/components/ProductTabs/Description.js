import React from "react";
import "./ProductTabs.css";
import {ProductsData} from "../../pages/ProductData";
import product from "../../pages/Product";
import {useParams} from "react-router-dom";

const ProductTabs = () => {
    const { id } = useParams();
    const product = ProductsData.find(p => p.id === parseInt(id));

    if (!product) {
        return <h2>Product not found</h2>;
    }
    return (
        <div className='descriptionbox'>
           <div className='descriptionbox-description'>
               <p>{product.description}</p>
           </div>
        </div>
    )
}

export default ProductTabs
