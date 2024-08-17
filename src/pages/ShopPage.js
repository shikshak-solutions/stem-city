import React, {useEffect, useState} from "react";
import Heading from "../components/shared/Heading";
import CurriculumCard from "../components/curriculum/CurriculumCard";
import {ProductCurriculum} from "./ProductCurriculum";
import ProductCard from "../components/products/ProductCard";
import {ProductsData} from "./ProductData";
import AOS from "aos";
const ShopPage = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-in-sine",
            delay: 100,
            offset: 100,
        });
        AOS.refresh();
    }, []);
    ProductsData.splice(4,ProductsData.length-4);
    ProductCurriculum.splice(4,ProductCurriculum.length-4);
    return (
        <div>
            <div className="container">
                <Heading title="Our Shop is Coming Soon!" subtitle={"We are working hard to launch our eCommerce functionality. Stay tuned!"} />
                <ProductCard data={ProductsData} />
                <CurriculumCard data={ProductCurriculum} />
            </div>
        </div>
    );
};

export default ShopPage;
