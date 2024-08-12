import React from 'react';
import FlipbookContent from "../components/flipbook/FlipbookContent";
import NavBar from "../components/navbar/NavBar";
import Footer from "../footer/Footer";
const FlipBook = () => {
    return (
        <>
            <NavBar/>
            <div className="container">
                <FlipbookContent />
            </div>
            <Footer/>
        </>
    );
};

export default FlipBook;
