import React from 'react';
import NavBar from "../components/navbar/NavBar";
import Footer from "../footer/Footer";
import TermsConditions from "../components/policies/TermsConditions";
import PrivacyPolicy from "../components/policies/PrivacyPolicy";
const TermsAndConditions = () => {
    return (
        <>
            <NavBar/>
            <div className="container">
                <PrivacyPolicy/>
            </div>
            <Footer/>
        </>
    );
};

export default TermsAndConditions;
