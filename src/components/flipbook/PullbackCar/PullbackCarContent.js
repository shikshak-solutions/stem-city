import React, { useRef } from 'react';
import "../Flipbook.css";
import HTMLFlipBook from 'react-pageflip';
import PullBackCar from "../../../assets/images/mini creation saprate manual/Pullback Car/Pullback Car saprate-01.jpg";
import PullBackCar1 from "../../../assets/images/mini creation saprate manual/Pullback Car/Pullback Car saprate-02.jpg";
import PullBackCar2 from "../../../assets/images/mini creation saprate manual/Pullback Car/Pullback Car saprate-03.jpg";
import PullBackCar3 from "../../../assets/images/mini creation saprate manual/Pullback Car/Pullback Car saprate-04.jpg";
import PullBackCar4 from "../../../assets/images/mini creation saprate manual/Pullback Car/Pullback Car saprate-05.jpg";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
const PullbackCarContent = () => {
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
                <img src={PullBackCar} alt="Cover Page" className="page-image" />
            </div>
            <div className="page">
                <img src={PullBackCar1} alt="Page 1" className="page-image" />
            </div>
            <div className="page">
                <img src={PullBackCar2} alt="Page 2" className="page-image" />
            </div>
            <div className="page">
                <img src={PullBackCar3} alt="Page 3" className="page-image" />
            </div>
            <div className="page">
                <img src={PullBackCar4} alt="Page 4" className="page-image" />
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

export default PullbackCarContent;
