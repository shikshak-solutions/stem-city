import React, { useRef } from 'react';
import "../Flipbook.css";
import HTMLFlipBook from 'react-pageflip';
import SlingShot from "../../../assets/images/mini creation saprate manual/Slingshot/Slingshot saprate-01.jpg"
import SlingShot1 from "../../../assets/images/mini creation saprate manual/Slingshot/Slingshot saprate-02.jpg"
import SlingShot2 from "../../../assets/images/mini creation saprate manual/Slingshot/Slingshot saprate-03.jpg"
import SlingShot3 from "../../../assets/images/mini creation saprate manual/Slingshot/Slingshot saprate-04.jpg"
import SlingShot4 from "../../../assets/images/mini creation saprate manual/Slingshot/Slingshot saprate-05.jpg"
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";


const SlingShotContent = () => {
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
                      width={400}
                      height={600}
                      size="fixed"
                      minWidth={200}
                      maxWidth={800}
                      minHeight={300}
                      maxHeight={1000}
                      drawShadow={true}
                      flippingTime={1000}
                      usePortrait={true}
                      startZIndex={0}
                      autoSize={true}
                      maxShadowOpacity={1}
                      showCover={true}
                      mobileScrollSupport={true}
                      className="flipbook">
            <div className="page cover">
                <img src={SlingShot} alt="Cover Page" className="page-image" />
            </div>
            <div className="page">
                <img src={SlingShot1} alt="Page 1" className="page-image" />
            </div>
            <div className="page">
                <img src={SlingShot2} alt="Page 2" className="page-image" />
            </div>
            <div className="page">
                <img src={SlingShot3} alt="Page 3" className="page-image" />
            </div>
            <div className="page">
                <img src={SlingShot4} alt="Page 4" className="page-image" />
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

export default SlingShotContent;
