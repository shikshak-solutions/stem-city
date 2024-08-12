import React, {useState} from "react";
import "./Product.css";
import { useParams } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons/faStar";
import {faIndianRupeeSign} from "@fortawesome/free-solid-svg-icons/faIndianRupeeSign";
import {useDispatch, useSelector} from "react-redux";
import {useEffectOnce} from "../../redux/hooks/useEffectOnce";
import {actionToAddToCart, actionToGetProductsDetailsApiCall} from "../../redux/action";


const ProductDetail = () => {
    const { cat_slug,sub_cat_slug,product_slug } = useParams();
    const [quantity, setQuantity] = useState(1);
    const ProductDetailData = useSelector((state) => state.product.ProductDetailData);
    const dispatch = useDispatch();
    useEffectOnce(()=>{
        dispatch(actionToGetProductsDetailsApiCall({cat_slug:cat_slug,sub_cat_slug:sub_cat_slug,product_slug:product_slug}));
    })
    const addToCart = () =>{
        let products = {id: ProductDetailData.id,name:ProductDetailData.name,price:ProductDetailData.price,photo:ProductDetailData.photo, quantity:quantity};
        console.log(products,'products')
        dispatch(actionToAddToCart(products));
    }

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
                    {ProductDetailData.discount_amount_type?.trim() !== '' ?
                        <>
                            <div className='productdetails-right-price-old'><FontAwesomeIcon icon={faIndianRupeeSign}/> {ProductDetailData.sale_price}</div>
                            <div className='productdetails-right-price-new'><FontAwesomeIcon icon={faIndianRupeeSign}/> {
                                (ProductDetailData.discount_amount_type == 'percentage' &&
                                    ProductDetailData.sale_price*ProductDetailData.discount_percentage*0.01 < ProductDetailData.discount_maximum_discount)
                                    ? ProductDetailData.sale_price *(100-ProductDetailData.discount_percentage)*0.01 : ProductDetailData.sale_price-ProductDetailData.discount_maximum_discount }
                            </div>
                        </>
                  : <div className='productdetails-right-price'><FontAwesomeIcon icon={faIndianRupeeSign}/> {ProductDetailData.sale_price}</div>
                    }
                </div>
                <div className='productdetails-right-description' dangerouslySetInnerHTML={{__html: ProductDetailData?.description}}>

                </div>
                <div className='productdetails-right-quantity'>
                    <h1>Select Quantity :</h1>
                    <input className='quantity' type='number' value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                </div>
                <button onClick={()=> addToCart()}>Add to Cart</button>
                <p className='productdisplay-right-category'><span>Category :</span> {ProductDetailData.subcategory_name}</p>
            </div>
        </div>
    );
};

export default ProductDetail;
