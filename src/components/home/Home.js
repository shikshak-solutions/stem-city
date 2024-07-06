import React from "react";
import Slider from "react-slick";
import Image1 from "../../assets/images/home/wisechild.png";
import Image2 from "../../assets/images/home/construction-tech.png";
import Image3 from "../../assets/images/home/intelligence-strom.png";
import Button from "../shared/Button";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from "react-router-dom";


const HomeData = [
    {
        id: 1,
        img: Image1,
        subtitle: "Make your Child more Creative with STEM City's",
        title: "STEM Kits",
        title2: "WiseChild",
    },
    {
        id: 2,
        img: Image2,
        subtitle: "Make your Child more Creative with STEM City's",
        title: "Robotics Kits",
        title2: "Construction Tech",
    },
    {
        id: 3,
        img: Image3,
        subtitle: "Make your Child more Creative with STEM City's",
        title: "AI Kits",
        title2: "Intelligence Storm",
    },
];

const Home = ({ handleOrderPopup }) => {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 800,
        slidesToScroll: 1,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        cssEase: "ease-in-out",
        pauseOnHover: false,
        pauseOnFocus: true,
    };
    return (
        <div className="container">
            <div className="overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] md:min-h-[650px] hero-bg-color flex justify-center items-center">
                <div className="container pb-8 sm:pb-0 md:pb-0">
                    <Slider {...settings}>
                        {HomeData.map((data) => (
                            <div key={data.id}>
                                <div className="grid grid-cols-1 sm:grid-cols-2">
                                    <div className="flex flex-col justify-center gap-4 sm:pl-3 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 md:pl-3 md:pt-0 md:text-left  md:order-1 relative z-10 ">
                                        <h1
                                            data-aos="zoom-out"
                                            data-aos-duration="500"
                                            data-aos-once="true"
                                            className="text-2xl sm:text-6xl md:text-2xl lg:text-2xl font-bold"
                                        >
                                            {data.subtitle}
                                        </h1>
                                        <h1
                                            data-aos="zoom-out"
                                            data-aos-duration="500"
                                            data-aos-once="true"
                                            className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-bold"
                                        >
                                            {data.title}
                                        </h1>
                                        <h1
                                            data-aos="zoom-out"
                                            data-aos-duration="500"
                                            data-aos-once="true"
                                            className="text-5xl text-white dark:text-white/5 sm:text-[80px] md:text-[80px] xl:text-[150px] font-bold"
                                        >
                                            {data.title2}
                                        </h1>
                                        <div
                                            data-aos="fade-up"
                                            data-aos-offset="0"
                                            data-aos-duration="500"
                                            data-aos-delay="300"
                                        >
                                            <Link to='/products'>
                                            <Button
                                                text="Shop By Category"
                                                bgColor="bg-primary"
                                                textColor="text-white"
                                                handler={handleOrderPopup}
                                            /></Link>
                                        </div>
                                    </div>
                                    <div className="order-1 md:order-2 sm:order-2">
                                        <div
                                            data-aos="zoom-in"
                                            data-aos-once="true"
                                            className="relative z-10"
                                        >
                                            <img
                                                src={data.img}
                                                alt=""
                                                className="w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] sm:scale-105 md:scale-115 lg:scale-120 object-contain mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] relative z-40"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Home;
