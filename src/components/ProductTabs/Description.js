// import React from "react";
// import "./ProductTabs.css";
// import product from "../../pages/Product";
// import {useSelector} from "react-redux";
//
// const ProductTabs = () => {
//     const Product = useSelector((state) => state.product.ProductDetailData);
//
//     if (!product) {
//         return <h2>Product not found</h2>;
//     }
//     return (
//         <div className='descriptionbox'>
//            <div className='descriptionbox-description' dangerouslySetInnerHTML={{__html: Product?.long_description}}>
//            </div>
//         </div>
//     )
// }
//
// export default ProductTabs
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
