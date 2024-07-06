import React from "react";
import CartItems from "../components/cart/CartItems";
import Navbar from "../components/navbar/NavBar";
import Footer from "../footer/Footer";


const Cart = () => {
    return (
        <>
            <Navbar/>
            <CartItems/>
            <Footer/>
        </>
    );
};

export default Cart;
