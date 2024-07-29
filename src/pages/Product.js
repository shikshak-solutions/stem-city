import React from "react";
import Heading from "../components/shared/Heading";
import ProductCard from "../components/products/ProductCard";
import NavBar from "../components/navbar/NavBar";
import Footer from "../footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import {useDispatch, useSelector} from "react-redux";
import {useEffectOnce} from "../redux/hooks/useEffectOnce";
import {actionToGetProductsApiCall} from "../redux/action";
const Products = () => {
    const ProductsData = useSelector((state) => state.product.ProductsData);
    const dispatch = useDispatch();
    useEffectOnce(()=>{
        dispatch(actionToGetProductsApiCall());
    })
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
