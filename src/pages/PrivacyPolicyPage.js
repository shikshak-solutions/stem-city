import React from 'react';
import NavBar from "../components/navbar/NavBar";
import Footer from "../footer/Footer";
import PrivacyPolicy from "../components/policies/PrivacyPolicy";
const PrivacyPolicyPage = () => {
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

export default PrivacyPolicyPage;
