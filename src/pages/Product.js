import React from "react";
import Heading from "../components/shared/Heading";
import ProductCard from "../components/products/ProductCard";
import {ProductsData} from "./ProductData";
import NavBar from "../components/navbar/NavBar";
import Footer from "../footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
const Products = () => {
    React.useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-in-sine",
            delay: 100,
            offset: 100,
        });
        AOS.refresh();
    }, []);
    return (
        <div>
            <NavBar/>
            <div className="container">
                <Heading title="Our Products" subtitle={"Explore Our Products"} />
                <ProductCard data={ProductsData} />
            </div>
            <Footer/>
        </div>
    );
};

export default Products;
