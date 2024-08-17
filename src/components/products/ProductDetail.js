// import React, {useState, useEffect} from "react";
// import "./Product.css";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faStar} from "@fortawesome/free-solid-svg-icons/faStar";
// import {faIndianRupeeSign} from "@fortawesome/free-solid-svg-icons/faIndianRupeeSign";
// import {useDispatch, useSelector} from "react-redux";
// import {actionToAddToCart} from "../../redux/action";
// import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
// import {faMinus} from "@fortawesome/free-solid-svg-icons";
//
//
// const ProductDetail = () => {
//     const [quantity, setQuantity] = useState(1);
//     const [activeImage, setActiveImage] = useState(""); // State for active image
//     const ProductDetailData = useSelector((state) => state.product.ProductDetailData);
//     const dispatch = useDispatch();
//
//
//
//     useEffect(() => {
//         if (ProductDetailData?.photo) {
//             setActiveImage(ProductDetailData.photo); // Set initial active image
//         }
//     }, [ProductDetailData]);
//
//     const addToCart = () =>{
//         let products = {id: ProductDetailData.id,name:ProductDetailData.name,price:ProductDetailData.price,photo:ProductDetailData.photo, quantity:quantity};
//         console.log(products,'products');
//         dispatch(actionToAddToCart(products));
//     };
//
//     const handleIncrease = () => {
//         setQuantity(prevQuantity => prevQuantity + 1);
//     };
//
//     const handleDecrease = () => {
//         if (quantity > 1) {
//             setQuantity(prevQuantity => prevQuantity - 1);
//         }
//     };
//
//     const handleImageClick = (image) => {
//         setActiveImage(image); // Change the active image
//     };
//
//     if (!ProductDetailData) {
//         return <h2>Product not found</h2>;
//     }
//
//     return (
//         <div className='product-details'>
//             <div className='product-details-left'>
//                 <div className='productdetails-img-list'>
//                     <img
//                         key={'main-image'}
//                         src={ProductDetailData.photo}
//                         alt=''
//                         onClick={() => handleImageClick(ProductDetailData.photo)}
//                         className={activeImage === ProductDetailData.photo ? 'active-image' : ''}
//                     />
//                     {ProductDetailData.photos?.map((photos, index) => (
//                         <img
//                             key={index}
//                             src={photos.photo}
//                             alt=''
//                             onClick={() => handleImageClick(photos.photo)}
//                             className={activeImage === photos.photo ? 'active-image' : ''}
//                         />
//                     ))}
//                 </div>
//                 <div className='productdetails-img'>
//                     <img className='productdetails-main-img' src={activeImage} alt=''/>
//                 </div>
//             </div>
//             <div className='product-details-right'>
//                 <h1>{ProductDetailData.name}</h1>
//                 <div className='productdetails-right-star'>
//                     <FontAwesomeIcon icon={faStar}/>
//                     <FontAwesomeIcon icon={faStar}/>
//                     <FontAwesomeIcon icon={faStar}/>
//                     <FontAwesomeIcon icon={faStar}/>
//                     <FontAwesomeIcon icon={faStar}/>
//                 </div>
//                 <div className='productdetails-right-prices'>
//                     {ProductDetailData.discount_amount_type?.trim() !== '' ?
//                         <>
//                             <div className='productdetails-right-price-old'><FontAwesomeIcon icon={faIndianRupeeSign}/> {ProductDetailData.sale_price}</div>
//                             <div className='productdetails-right-price-new'><FontAwesomeIcon icon={faIndianRupeeSign}/> {
//                                 (ProductDetailData.discount_amount_type === 'percentage' &&
//                                     ProductDetailData.sale_price*ProductDetailData.discount_percentage*0.01 < ProductDetailData.discount_maximum_discount)
//                                     ? ProductDetailData.sale_price *(100-ProductDetailData.discount_percentage)*0.01 : ProductDetailData.sale_price-ProductDetailData.discount_maximum_discount }
//                             </div>
//                         </>
//                         : <div className='productdetails-right-price'><FontAwesomeIcon icon={faIndianRupeeSign}/> {ProductDetailData.sale_price}</div>
//                     }
//                 </div>
//                 <div className='productdetails-right-description' dangerouslySetInnerHTML={{__html: ProductDetailData?.description}}>
//
//                 </div>
//                 <div className='productdetails-right-quantity'>
//                     <h1>Select Quantity :</h1>
//                     <div className="quantity-controls">
//                         <button className="quantity-btn" onClick={handleDecrease}>
//                             <FontAwesomeIcon icon={faMinus} />
//                         </button>
//                         <span className="quantity">{quantity}</span>
//                         <button className="quantity-btn" onClick={handleIncrease}>
//                             <FontAwesomeIcon icon={faPlus} />
//                         </button>
//                     </div>
//                 </div>
//                 <button className='button' onClick={addToCart}>Add to Cart</button>
//                 <p className='productdisplay-right-category'><span>Category :</span> {ProductDetailData.subcategory_name}</p>
//             </div>
//         </div>
//     );
// };
//
// export default ProductDetail;

import React from "react";
import "./Product.css";
import { useParams } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons/faStar";
import {faIndianRupeeSign} from "@fortawesome/free-solid-svg-icons/faIndianRupeeSign";
import {ProductsData} from "../../pages/ProductData";


const ProductDetail = () => {
    const { id } = useParams();
    const product = ProductsData.find(p => p.id === parseInt(id));

    if (!product) {
        return <h2>Product not found</h2>;
    }
    return (
        <div className='product-details'>
            <div className='product-details-left'>
                <div className='productdetails-img-list'>
                    <img src={product.img} alt=''/>
                    <img src={product.img1} alt=''/>
                    <img src={product.img2} alt=''/>
                    <img src={product.img3} alt=''/>
                </div>
                <div className='productdetails-img'>
                    <img className='productdetails-main-img' src={product.img} alt=''/>
                </div>
            </div>
            <div className='product-details-right'>
                <h1>{product.title}</h1>
                <div className='productdetails-right-star'>
                    <FontAwesomeIcon icon={faStar}/>
                    <FontAwesomeIcon icon={faStar}/>
                    <FontAwesomeIcon icon={faStar}/>
                    <FontAwesomeIcon icon={faStar}/>
                </div>
                <div className='productdetails-right-prices'>
                    <div className='productdetails-right-price-old'><FontAwesomeIcon icon={faIndianRupeeSign}/> {product.price2}</div>
                    <div className='productdetails-right-price-new'><FontAwesomeIcon icon={faIndianRupeeSign}/> {product.price}</div>
                </div>
                <div className='productdetails-right-description'>
                    {product.description}
                </div>
                {/*<div className='productdetails-right-quantity'>*/}
                {/*    <h1>Select Qty :</h1>*/}
                {/*    <input className='quantity' placeholder='0' type='number'/>*/}
                {/*</div>*/}
                {/*<button>Add to Cart</button>*/}
                <p className='productdisplay-right-category'><span>Category :</span> {product.category}</p>
            </div>
        </div>
    );
};

export default ProductDetail;
