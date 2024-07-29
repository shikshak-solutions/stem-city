import React from 'react';
import NavBar from "../components/navbar/NavBar";
import Footer from "../footer/Footer";
const ErrorPage = () => {
    return (
        <>
            <NavBar/>
            <div className="container">
               404 Page
            </div>
            <Footer/>
        </>
    );
};

export default ErrorPage;
