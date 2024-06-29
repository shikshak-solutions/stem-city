import React from "react";
import "./Product.css";
import Img1 from "../../assets/images/product/p-1.png";
import Img2 from "../../assets/images/product/defender.png";
import Img3 from "../../assets/images/product/creative-expansion2.png";
import Img4 from "../../assets/images/product/alpha.png";
import Img5 from "../../assets/images/product/strom.png";
import Img6 from "../../assets/images/product/engineeringset.png";
import Img7 from "../../assets/images/product/alphaA.png";
import Img8 from "../../assets/images/product/alphaB.png";
import Img17 from "../../assets/images/product/construction-tech.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons/faStar";
import NavBar from "../navbar/NavBar";
import {faRupee} from "@fortawesome/free-solid-svg-icons";
import {faRupeeSign} from "@fortawesome/free-solid-svg-icons/faRupeeSign";
import {faIndianRupeeSign} from "@fortawesome/free-solid-svg-icons/faIndianRupeeSign";


const ProductDetail = () => {

    const ProductsDetailsData = [
        {
            id: 1,
            name: "Wise Child 2",
            price: 200,
            image: Img1,
            description: "Expertly rendered by Carl Hansen & Søn, the lounge chair—first introduced in 1951 and enduring ever since—is available in oak or as a combination of oak and walnut, sourced from sustainable forestry. Choose from seat and back upholstery in a selection of leather options or in a custom fabric."
        },
        {
            id: 2,
            name:" LD02 LOUNGE CHAIR",
            price: 250,
            image: "img/2.png",
            description: "Expertly rendered by Carl Hansen & Søn, the lounge chair—first introduced in 1951 and enduring ever since—is available in oak or as a combination of oak and walnut, sourced from sustainable forestry. Choose from seat and back upholstery in a selection of leather options or in a custom fabric."
        },
        {
            id: 3,
            name:" LD03 LOUNGE CHAIR",
            price: 290,
            image: "img/3.png",
            description: "Expertly rendered by Carl Hansen & Søn, the lounge chair—first introduced in 1951 and enduring ever since—is available in oak or as a combination of oak and walnut, sourced from sustainable forestry. Choose from seat and back upholstery in a selection of leather options or in a custom fabric."
        },
        {
            id: 4,
            name:" LD03 LOUNGE CHAIR",
            price: 290,
            image: "img/3.png",
            description: "Expertly rendered by Carl Hansen & Søn, the lounge chair—first introduced in 1951 and enduring ever since—is available in oak or as a combination of oak and walnut, sourced from sustainable forestry. Choose from seat and back upholstery in a selection of leather options or in a custom fabric."
        },
        {
            id: 5,
            name:" LD03 LOUNGE CHAIR",
            price: 290,
            image: "img/3.png",
            description: "Expertly rendered by Carl Hansen & Søn, the lounge chair—first introduced in 1951 and enduring ever since—is available in oak or as a combination of oak and walnut, sourced from sustainable forestry. Choose from seat and back upholstery in a selection of leather options or in a custom fabric."
        },
        {
            id: 6,
            name:" LD03 LOUNGE CHAIR",
            price: 290,
            image: "img/3.png",
            description: "Expertly rendered by Carl Hansen & Søn, the lounge chair—first introduced in 1951 and enduring ever since—is available in oak or as a combination of oak and walnut, sourced from sustainable forestry. Choose from seat and back upholstery in a selection of leather options or in a custom fabric."
        },
        {
            id: 7,
            name:" LD07 LOUNGE CHAIR",
            price: 200,
            image: "img/7.png",
            description: "Expertly rendered by Carl Hansen & Søn, the lounge chair—first introduced in 1951 and enduring ever since—is available in oak or as a combination of oak and walnut, sourced from sustainable forestry. Choose from seat and back upholstery in a selection of leather options or in a custom fabric."
        },
        {
            id: 8,
            name:" LD03 LOUNGE CHAIR",
            price: 290,
            image: "img/3.png",
            description: "Expertly rendered by Carl Hansen & Søn, the lounge chair—first introduced in 1951 and enduring ever since—is available in oak or as a combination of oak and walnut, sourced from sustainable forestry. Choose from seat and back upholstery in a selection of leather options or in a custom fabric."
        },
    ];
    return (
        <div className='product-details'>
            <div className='product-details-left'>
                <div className='productdetails-img-list'>
                    <img src={Img1} alt=''/>
                    <img src={Img1} alt=''/>
                    <img src={Img1} alt=''/>
                    <img src={Img1} alt=''/>
                </div>
                <div className='productdetails-img'>
                    <img className='productdetails-main-img' src={Img1} alt=''/>
                </div>
            </div>
            <div className='product-details-right'>
                <h1>Product Name</h1>
                <div className='productdetails-right-star'>
                    <FontAwesomeIcon icon={faStar}/>
                    <FontAwesomeIcon icon={faStar}/>
                    <FontAwesomeIcon icon={faStar}/>
                    <FontAwesomeIcon icon={faStar}/>
                </div>
                <div className='productdetails-right-prices'>
                    <div className='productdetails-right-price-old'><FontAwesomeIcon icon={faIndianRupeeSign}/> 28,000</div>
                    <div className='productdetails-right-price-new'><FontAwesomeIcon icon={faIndianRupeeSign}/> 25,000</div>
                </div>
                <div className='productdetails-right-description'>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                    in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </div>
                <div className='productdetails-right-quantity'>
                    <h1>Select Qty :</h1>
                    <input className='quantity' placeholder='0' type='number'/>
                </div>
                <button>Add to Cart</button>
                <p className='productdisplay-right-category'><span>Category :</span>STEM, STEM Kits, Wise Child</p>
            </div>
        </div>
    );
};

export default ProductDetail;
