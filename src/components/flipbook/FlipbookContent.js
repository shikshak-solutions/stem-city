import React from 'react';
import "../flipbook/Flipbook.css"
import HTMLFlipBook from 'react-pageflip';
import Flip1 from "../../assets/images/Flip/001.png";
import Flip2 from "../../assets/images/Flip/002.png";
import Flip3 from "../../assets/images/Flip/003.png";
import Flip4 from "../../assets/images/Flip/004.png";
import Flip5 from "../../assets/images/Flip/005.png";
import Flip6 from "../../assets/images/Flip/006.png";
import Flip7 from "../../assets/images/Flip/007.png";
import Flip8 from "../../assets/images/Flip/008.png";
import Flip9 from "../../assets/images/Flip/009.png";
import Flip10 from "../../assets/images/Flip/010.png";
import Flip11 from "../../assets/images/Flip/011.png";
import Flip12 from "../../assets/images/Flip/012.png";
import Flip13 from "../../assets/images/Flip/013.png";
import Flip14 from "../../assets/images/Flip/014.png";
import Flip15 from "../../assets/images/Flip/015.png";
import Flip16 from "../../assets/images/Flip/016.png";
const FlipbookContent = () => {
    return (
        <HTMLFlipBook width={600} height={800}>
            <div className="page">
                <img src={Flip1} alt="Page 1" className="page-image" />
            </div>
            <div className="page">
                <img src={Flip2} alt="Page 2" className="page-image" />
            </div>
            <div className="page">
                <img src={Flip3} alt="Page 3" className="page-image" />
            </div>
            <div className="page">
                <img src={Flip4} alt="Page 4" className="page-image" />
            </div>
            <div className="page">
                <img src={Flip5} alt="Page 5" className="page-image" />
            </div>
            <div className="page">
                <img src={Flip6} alt="Page 6" className="page-image" />
            </div>
            <div className="page">
                <img src={Flip7} alt="Page 7" className="page-image" />
            </div>
            <div className="page">
                <img src={Flip8} alt="Page 8" className="page-image" />
            </div>
            <div className="page">
                <img src={Flip9} alt="Page 9" className="page-image" />
            </div>
            <div className="page">
                <img src={Flip10} alt="Page 10" className="page-image" />
            </div>
            <div className="page">
                <img src={Flip11} alt="Page 11" className="page-image" />
            </div>
            <div className="page">
                <img src={Flip12} alt="Page 12" className="page-image" />
            </div>
            <div className="page">
                <img src={Flip13} alt="Page 13" className="page-image" />
            </div>
            <div className="page">
                <img src={Flip14} alt="Page 14" className="page-image" />
            </div>
            <div className="page">
                <img src={Flip15} alt="Page 15" className="page-image" />
            </div>
            <div className="page">
                <img src={Flip16} alt="Page 16" className="page-image" />
            </div>
        </HTMLFlipBook>
    );
};

export default FlipbookContent;
