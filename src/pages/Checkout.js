import React from "react";
import Navbar from "../components/navbar/NavBar";
import Footer from "../footer/Footer";
import CheckOut from "../components/cart/CheckOut";


const Checkout = () => {
    return (
        <>
            <Navbar/>
            <CheckOut/>
            <Footer/>
        </>
    );
};

export default Checkout;
