import React, {useEffect, useState} from "react";
import Heading from "../components/shared/Heading";
import CurriculumCard from "../components/curriculum/CurriculumCard";
import {ProductCurriculum} from "./ProductCurriculum";
import ProductCard from "../components/products/ProductCard";
import {ProductsData} from "./ProductData";
import AOS from "aos";
const ShopPage = () => {
    const [product,setProduct] = useState([]);
    const [curriculum,setCurriculum] = useState([]);
    useEffect(()=>{
        let productData = ProductsData;
        productData.length > 4 && productData.splice(4,productData.length-4)
        setProduct(productData)
    },[ProductsData]);
    useEffect(()=>{
        let curriculumData = ProductCurriculum;
        curriculumData.length > 4 && curriculumData.splice(3,curriculumData.length-3)
        setCurriculum(curriculumData)
    },[ProductCurriculum]);
    useEffect(() => {
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
            <div className="container">
                <Heading title="We will accepting online order soon!" subtitle={"We are working hard to launch our eCommerce functionality. Stay tuned!"} />
                <div className="text-center mb-10 max-w-[600px] mx-auto space-y-2">
                <p className="text-xl font-bold lg:text-xl">Thank you for waiting</p>
                <p className="text-xl font-bold lg:text-xl"> Currently accepting offline order by call</p>
                </div>
                <Heading title="Our Products" subtitle={"Explore Our Products"} />
                <ProductCard data={product} />
                <Heading title="Curriculum" subtitle={"Explore Our Curriculum"} />
                <CurriculumCard data={curriculum} />
            </div>
        </div>
    );
};

export default ShopPage;
