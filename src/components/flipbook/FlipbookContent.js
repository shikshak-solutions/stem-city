import React, { useRef } from 'react';
import "../flipbook/Flipbook.css"
import HTMLFlipBook from 'react-pageflip';
import Flip1 from "../../assets/images/Flip/BalancingBird/balance bird-02.jpg";
import Flip2 from "../../assets/images/Flip/BalancingBird/balance bird-03.jpg";
import Flip3 from "../../assets/images/Flip/BalancingBird/balance bird-04.jpg";
import Flip4 from "../../assets/images/Flip/BalancingBird/balance bird-05.jpg";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
const FlipbookContent = () => {
    const flipBookRef = useRef(null);
    const handleNext = () => {
        if (flipBookRef.current) {
            flipBookRef.current.pageFlip().flipNext();
        }
    };

    const handlePrev = () => {
        if (flipBookRef.current) {
            flipBookRef.current.pageFlip().flipPrev();
        }
    };
    return (
        <>
        <div className='flip-container'>
        <HTMLFlipBook ref={flipBookRef}
                      width={600}
                      height={800}
                      startPage={0}
                      showCover={true}
                      maxShadowOpacity={0.5}
                      className="flipbook">
            <div className="page cover">
                <img src={Flip1} alt="Cover Page" className="page-image" />
            </div>
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
        </HTMLFlipBook>
        </div>
            <div className="navigation-buttons">
                <button onClick={handlePrev} className="prev-button"><FaArrowLeft className="text-xl text-gray-600 hover:text-red-600 dark:text-gray-400" /></button>
                <button onClick={handleNext} className="next-button"><FaArrowRight className="text-xl text-gray-600 hover:text-red-600 dark:text-gray-400" /></button>
            </div>
    </>

    );
};

export default FlipbookContent;
