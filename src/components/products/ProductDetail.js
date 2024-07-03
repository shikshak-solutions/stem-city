import React from "react";
import "./Product.css";
import Img1 from "../../assets/images/product/p-1.png";
import { useParams } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons/faStar";
import NavBar from "../navbar/NavBar";
import {faRupee} from "@fortawesome/free-solid-svg-icons";
import {faRupeeSign} from "@fortawesome/free-solid-svg-icons/faRupeeSign";
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
                <div className='productdetails-right-quantity'>
                    <h1>Select Qty :</h1>
                    <input className='quantity' placeholder='0' type='number'/>
                </div>
                <button>Add to Cart</button>
                <p className='productdisplay-right-category'><span>Category :</span> {product.category}</p>
            </div>
        </div>
    );
};

export default ProductDetail;
