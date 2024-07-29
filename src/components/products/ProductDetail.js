import React from "react";
import "./Product.css";
import { useParams } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons/faStar";
import {faIndianRupeeSign} from "@fortawesome/free-solid-svg-icons/faIndianRupeeSign";
import {useDispatch, useSelector} from "react-redux";
import {useEffectOnce} from "../../redux/hooks/useEffectOnce";
import { actionToGetProductsDetailsApiCall} from "../../redux/action";


const ProductDetail = () => {
    const { cat_slug,sub_cat_slug,product_slug } = useParams();
    const ProductDetailData = useSelector((state) => state.product.ProductDetailData);
    const dispatch = useDispatch();
    useEffectOnce(()=>{
        dispatch(actionToGetProductsDetailsApiCall({cat_slug:cat_slug,sub_cat_slug:sub_cat_slug,product_slug:product_slug}));
    })

    if (!ProductDetailData) {
        return <h2>Product not found</h2>;
    }
    return (
        <div className='product-details'>
            <div className='product-details-left'>
                <div className='productdetails-img-list'>
                    {ProductDetailData.photos?.map(photos =>{
                        return <img src={photos.photo} alt=''/>;
                    }) }
                </div>
                <div className='productdetails-img'>
                    <img className='productdetails-main-img' src={ProductDetailData.photo} alt=''/>
                </div>
            </div>
            <div className='product-details-right'>
                <h1>{ProductDetailData.name}</h1>
                <div className='productdetails-right-star'>
                    <FontAwesomeIcon icon={faStar}/>
                    <FontAwesomeIcon icon={faStar}/>
                    <FontAwesomeIcon icon={faStar}/>
                    <FontAwesomeIcon icon={faStar}/>
                </div>
                <div className='productdetails-right-prices'>
                    <div className='productdetails-right-price-old'><FontAwesomeIcon icon={faIndianRupeeSign}/> {ProductDetailData.price2}</div>
                    <div className='productdetails-right-price-new'><FontAwesomeIcon icon={faIndianRupeeSign}/> {ProductDetailData.price}</div>
                </div>
                <div className='productdetails-right-description' dangerouslySetInnerHTML={{__html: ProductDetailData?.description}}>

                </div>
                <div className='productdetails-right-quantity'>
                    <h1>Select Qty :</h1>
                    <input className='quantity' placeholder='0' type='number'/>
                </div>
                <button>Add to Cart</button>
                <p className='productdisplay-right-category'><span>Category :</span> {ProductDetailData.subcategory_name}</p>
            </div>
        </div>
    );
};

export default ProductDetail;
