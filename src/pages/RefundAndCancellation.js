import React from 'react';
import NavBar from "../components/navbar/NavBar";
import Footer from "../footer/Footer";
import RefundCancellation from "../components/policies/RefundCancellation";
const RefundAndCancellation = () => {
    return (
        <>
            <NavBar/>
            <div className="container">
                <RefundCancellation/>
            </div>
            <Footer/>
        </>
    );
};

export default RefundAndCancellation;
