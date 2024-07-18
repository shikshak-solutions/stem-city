import React from "react";
import Heading from "../shared/Heading";

// import images
import Img1 from "../../assets/images/curriculum/Introduction of AEC.png";
import Img2 from "../../assets/images/curriculum/Lcd to Aec.png";
import Img3 from "../../assets/images/curriculum/Ldr to Aec.png";

const CurriculumData = [
    {
        title: "Introduction of AEC Microcontroller Board V2 ‪",
        subtitle: "AEC Microcontroller board is best for beginners and intermediate learners. This board help to enhance Robotics and Coding skills with help of AEC board, will reduce more complex wire connection and wrong connection. These are two major factor make powerful of this AEC microcontroller board.",
        published: "Jan 10, 2024",
        image: Img1,
        aosDelay: "0",
    },
    {
        title: "How to integrate LCD(I2C) Module to AEC Microcontroller Board",
        subtitle:
            "Unlock the potential of your AEC Microcontroller Board by learning how to seamlessly integrate an I2C LCD Module with this easy-to-follow tutorial! In this video, we'll guide you through the step-by-step process of connecting your LCD module to the AEC Microcontroller, enabling you to display information with clarity and precision.?",
        published: "Feb 05, 2024",
        image: Img2,
        aosDelay: "200",
    },
    {
        title: "How to connect LDR TO AEC Microcontroller",
        subtitle:
            "Unlock the world of light-dependent resistors (LDR) with our step-by-step guide on connecting this sensor to an AEC Board. Dive into the fascinating realm of electronics as we walk you through the process, demystifying the connections and empowering you to harness the power of light sensing technology effortlessly. Watch and learn how to integrate LDR sensors seamlessly with AEC Boards, opening doors to exciting possibilities in your projects.",
        published: "Feb 10, 2024",
        image: Img3,
        aosDelay: "200",
    },
];
const Curriculum = () => {
    return (
        <div className="my-12">
            <div className="container">
                {/* Header section */}
                <Heading title="Curriculum" subtitle={"Explore Our Curriculum"} />

                {/* Blog section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-8 sm:gap-4 md:gap-7">
                    {/* Blog card */}
                    {CurriculumData.map((data) => (
                        <div
                            data-aos="fade-up"
                            data-aos-delay={data.aosDelay}
                            key={data.title}
                            className="bg-white dark:bg-gray-900"
                        >
                            {/* image section */}
                            <div className="overflow-hidden rounded-2xl mb-2 w-fit shadow-md">
                                <img
                                    src={data.image}
                                    alt=""
                                    className="w-full h-[220px] object-cover rounded-2xl hover:scale-105 duration-500"
                                />
                            </div>
                            {/* content section */}
                            <div className="space-y-2">
                                <p className="text-xs text-gray-500">{data.published}</p>
                                <p className="font-bold line-clamp-1">{data.title}</p>
                                <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                                    {data.subtitle}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Curriculum;
