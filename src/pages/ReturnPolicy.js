import React from 'react';
import NavBar from "../components/navbar/NavBar";
import Footer from "../footer/Footer";
import Return from "../components/policies/Return";
const ReturnPolicy = () => {
    return (
        <>
            <NavBar/>
            <div className="container">
                <Return/>
            </div>
            <Footer/>
        </>
    );
};

export default ReturnPolicy;
