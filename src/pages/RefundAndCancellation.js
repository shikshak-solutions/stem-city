import React from 'react';
import NavBar from "../components/navbar/NavBar";
import Footer from "../footer/Footer";
import TermsConditions from "../components/policies/TermsConditions";
import RefundCancellation from "../components/policies/RefundCancellation";
const TermsAndConditions = () => {
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

export default TermsAndConditions;
