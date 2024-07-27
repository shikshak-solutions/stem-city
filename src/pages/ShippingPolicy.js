import React from 'react';
import NavBar from "../components/navbar/NavBar";
import Footer from "../footer/Footer";
import Shipping from "../components/policies/Shipping";
const ShippingPolicy = () => {
    return (
        <>
            <NavBar/>
            <div className="container">
                <Shipping/>
            </div>
            <Footer/>
        </>
    );
};

export default ShippingPolicy;
