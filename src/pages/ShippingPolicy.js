import React from 'react';
import NavBar from "../components/navbar/NavBar";
import Footer from "../footer/Footer";
import TermsConditions from "../components/policies/TermsConditions";
import RefundCancellation from "../components/policies/RefundCancellation";
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
