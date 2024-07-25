import React from 'react';
import NavBar from "../components/navbar/NavBar";
import Footer from "../footer/Footer";
import TermsConditions from "../components/policies/TermsConditions";
const TermsAndConditions = () => {
    return (
        <>
            <NavBar/>
            <div className="container">
                <TermsConditions/>
            </div>
            <Footer/>
        </>
    );
};

export default TermsAndConditions;
