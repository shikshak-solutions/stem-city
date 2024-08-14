import React, { useRef } from 'react';
import "../flipbook/Flipbook.css"
import HTMLFlipBook from 'react-pageflip';
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import {useSelector} from "react-redux";
const FlipbookContent = () => {
    const flipBookRef = useRef(null);
    const curriculum = useSelector((state) => state.product.ProductDetailData.curriculum[0]);
console.log(curriculum,'ProductDetailData')
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
            {curriculum ?
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
                <img src={curriculum.photo} alt="Cover Page" className="page-image" />
            </div>
            {curriculum.curriculum_content?.map(content =>{
                return <div className="page">
                    <img src={content.url} alt={'Page'+content.ordering} className="page-image" />
                </div>
                })}
        </HTMLFlipBook>:''}
        </div>
            <div className="navigation-buttons">
                <button onClick={handlePrev} className="prev-button"><FaArrowLeft className="text-xl text-gray-600 hover:text-red-600 dark:text-gray-400" /></button>
                <button onClick={handleNext} className="next-button"><FaArrowRight className="text-xl text-gray-600 hover:text-red-600 dark:text-gray-400" /></button>
            </div>
    </>

    );
};

export default FlipbookContent;
