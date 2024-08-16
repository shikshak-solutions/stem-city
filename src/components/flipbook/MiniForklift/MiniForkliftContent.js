import React, { useRef } from 'react';
import "../Flipbook.css";
import HTMLFlipBook from 'react-pageflip';
import MiniForkLift from "../../../assets/images/mini creation saprate manual/Mini forkllift/Mini forkllift saprate-01.jpg";
import MiniForkLift1 from "../../../assets/images/mini creation saprate manual/Mini forkllift/Mini forkllift saprate-02.jpg";
import MiniForkLift2 from "../../../assets/images/mini creation saprate manual/Mini forkllift/Mini forkllift saprate-03.jpg";
import MiniForkLift3 from "../../../assets/images/mini creation saprate manual/Mini forkllift/Mini forkllift saprate-04.jpg";
import MiniForkLift4 from "../../../assets/images/mini creation saprate manual/Mini forkllift/Mini forkllift saprate-05.jpg";

import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
const MiniForkliftContent = () => {
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
                <img src={MiniForkLift} alt="Cover Page" className="page-image" />
            </div>
            <div className="page">
                <img src={MiniForkLift1} alt="Page 1" className="page-image" />
            </div>
            <div className="page">
                <img src={MiniForkLift2} alt="Page 2" className="page-image" />
            </div>
            <div className="page">
                <img src={MiniForkLift3} alt="Page 3" className="page-image" />
            </div>
            <div className="page">
                <img src={MiniForkLift4} alt="Page 4" className="page-image" />
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

export default MiniForkliftContent;
