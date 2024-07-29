import React from "react";
import Heading from "../shared/Heading";
import ProductCard from "./ProductCard";
import {useEffectOnce} from "../../redux/hooks/useEffectOnce";
import {actionToGetProductsApiCall} from "../../redux/action";
import {useDispatch, useSelector} from "react-redux";

const Products = () => {
    const ProductsData = useSelector((state) => state.product.ProductsData);
    const dispatch = useDispatch();
    useEffectOnce(()=>{
        dispatch(actionToGetProductsApiCall());
    })
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
