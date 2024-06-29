import React from "react";
import Heading from "../shared/Heading";
import ProductCard from "./ProductCard";
import Img1 from "../../assets/images/product/wise-child.png";
import Img2 from "../../assets/images/product/defender.png";
import Img3 from "../../assets/images/product/creative-expansion2.png";
import Img4 from "../../assets/images/product/alpha.png";
import Img5 from "../../assets/images/product/strom.png";
import Img6 from "../../assets/images/product/engineeringset.png";
import Img7 from "../../assets/images/product/alphaA.png";
import Img8 from "../../assets/images/product/alphaB.png";
import Img9 from "../../assets/images/product/steam-park.png";
import Img10 from "../../assets/images/product/coding-express.png";
import Img11 from "../../assets/images/product/bricq-essential.png";
import Img12 from "../../assets/images/product/spike-essential.png";
import Img13 from "../../assets/images/product/bricq-prime.png";
import Img14 from "../../assets/images/product/spike-prime.png";
import Img15 from "../../assets/images/product/ss-basic.png";
import Img16 from "../../assets/images/product/ss-intermediate.png";
import Img17 from "../../assets/images/product/construction-tech.png";

const ProductsData = [
    {
        id: 1,
        img: Img1,
        title: "Wise Child2-Complete Set",
        price: "25,499 /-",
        aosDelay: "0",
    },
    {
        id: 1,
        img: Img1,
        title: "Wise Child2-Elementary",
        price: "25,499 /-",
        aosDelay: "200",
    },
    {
        id: 1,
        img: Img1,
        title: "Wise Child2-Intermediate",
        price: "25,499 /-",
        aosDelay: "400",
    },
    {
        id: 1,
        img: Img1,
        title: "Wise Child2-Advanced",
        price: "25,499 /-",
        aosDelay: "600",
    },
    {
        id: 2,
        img: Img2,
        title: "Defender WiseKit",
        price: "21,550  /-",
        aosDelay: "800",
    },
    {
        id: 3,
        img: Img3,
        title: "Creative Expansion Kit",
        price: "17,327",
        aosDelay: "1000",
    },
    {
        id: 4,
        img: Img4,
        title: "Alpha X",
        price: "14,999 /-",
        aosDelay: "1200",
    },
    {
        id: 5,
        img: Img5,
        title: "Intelligence Storm",
        price: "44,260 /-",
        aosDelay: "1400",
    },
    {
        id: 6,
        img: Img6,
        title: "Engineering Set",
        price: "16,900 /-",
        aosDelay: "1600",
    },
    {
        id: 7,
        img: Img7,
        title: "Alpha A",
        price: "14,592 /-",
        aosDelay: "1800",
    },
    {
        id: 8,
        img: Img8,
        title: "Alpha B",
        price: "12,725 /-",
        aosDelay: "2000",
    },
    {
        id: 8,
        img: Img17,
        title: "Construction Tech Kit",
        price: "17,800 /-",
        aosDelay: "2200",
    },
];
const ProductsData2 = [
    {
        id: 1,
        img: Img9,
        title: "Lego STEAM Park",
        price: "56,999 /-",
        aosDelay: "0",
    },
    {
        id: 2,
        img: Img10,
        title: "Lego Coding Express",
        price: "57,999 /-",
        aosDelay: "200",
    },
    {
        id: 3,
        img: Img11,
        title: "Lego BricQ Essential",
        price: "31,999 /-",
        aosDelay: "400",
    },
    {
        id: 4,
        img: Img12,
        title: "Lego Spike Essential",
        price: "52,499 /-",
        aosDelay: "600",
    },
    {
        id: 5,
        img: Img13,
        title: "Lego BricQ Prime",
        price: "36,999 /-",
        aosDelay: "800",
    },
    {
        id: 6,
        img: Img14,
        title: "Lego Spike Prime",
        price: "65,999 /-",
        aosDelay: "1000",
    },
    {
        id: 7,
        img: Img15,
        title: "SS Basic Robotics Kit",
        price: "8,999 /-",
        aosDelay: "1200",
    },
    {
        id: 8,
        img: Img16,
        title: "SS Intermediate Robotics Kit",
        price: "10,499 /-",
        aosDelay: "1400",
    },
];
const Products = () => {
    return (
        <div>
            <div className="container">
                <Heading title="Our Products" subtitle={"Explore Our Products"} />
                <ProductCard data={ProductsData} />
                <ProductCard data={ProductsData2} />
            </div>
        </div>
    );
};

export default Products;
