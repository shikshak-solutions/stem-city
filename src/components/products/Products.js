import React from "react";
import Heading from "../shared/Heading";
import ProductCard from "./ProductCard";
import {ProductsData} from "../../pages/ProductData";

const Products = () => {
    return (
        <div>
            <div className="container">
                <Heading title="Our Products" subtitle={"Explore Our Products"} />
                <ProductCard data={ProductsData} />
            </div>
        </div>
    );
};

export default Products;
