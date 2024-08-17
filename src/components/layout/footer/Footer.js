import React from "react";
import { FaMobileAlt } from "react-icons/fa";
import {FaLocationArrow} from "react-icons/fa6";
import logo from "../../../assets/images/logo2.png";

const FooterLinks = [
    {
        title: "Home",
        link: "/#",
    },
    {
        title: "Products",
        link: "/products",
    },
    {
        title: "About",
        link: "/#about",
    },
    {
        title: "Contact",
        link: "/#contact",
    },
    {
        title: "Curriculum",
        link: "/#curriculum",
    },
];
const ImportantLinks = [
    {
        title: "Terms & Conditions",
        link: "/terms-and-conditions",
    },
    {
        title: "Privacy Policy",
        link: "/privacy-policy",
    },
    {
        title: "Refund and Cancellation Policy",
        link: "/refund-and-cancellation",
    },
    {
        title: "Return Policy",
        link: "/return-policy",
    },
    {
        title: "Shipping Policy",
        link: "/shipping-policy",
    },
];

const Footer = () => {
    return (
        <div className="dark:bg-gray-950">
            <div className="container">
                <div className="grid md:grid-cols-3 pb-20 pt-5">
                    <div className="py-8 px-4">
                        <img src={logo} className="logo"/>
                        <p className="text-gray-600 dark:text-white/70  lg:pr-24 pt-3">
                            "Explore our hands-on approach to innovation in STEM, Robotics and Artificial Intelligence.
                            Whether you need custom solutions or want to access our high-tech AI and Robotics Lab,
                            we're here to guide you on your path into the exciting world of technology."
                        </p>
                    </div>

                    {/* Footer links */}
                    <div className="col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10">
                        <div className="py-8 px-4">
                            <h1 className="text-xl font-bold sm:text-left mb-3">
                                Quick Links
                            </h1>
                            <ul className="space-y-3">
                                {FooterLinks.map((data, index) => (
                                    <li key={index}>
                                        <a
                                            href={data.link}
                                            className="text-gray-600 dark:text-gray-400 hover:dark:text-white hover:text-black duration-300"
                                        >
                                            {data.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="py-8 px-4">
                            <h1 className="text-xl font-bold sm:text-left mb-3">
                                Important Links
                            </h1>
                            <ul className="space-y-3">
                                {ImportantLinks.map((data, index) => (
                                    <li key={index}>
                                        <a
                                            href={data.link}
                                            className="text-gray-600 dark:text-gray-400 hover:dark:text-white hover:text-black duration-300"
                                        >
                                            {data.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="py-8 px-4 col-span-2 sm:col-auto">
                            <h1 className="text-xl font-bold sm:text-left mb-3">Address</h1>
                            <div>
                                <div className="flex items-center gap-3">
                                    <FaLocationArrow />
                                    <p>B8-505, Adjacent to White Land, Kherki Daula Road, Gurugram, Haryana</p>
                                </div>
                                <div className="flex items-center gap-3 mt-6">
                                    <FaMobileAlt />
                                    <p>+91 9599185057</p>
                                </div>
                                <div className={"text-red-600"}>
                                    Order Online Functionality Launching Soon!
                                </div>

                                {/* social links */}
                                {/*<div className="flex items-center gap-3 mt-6">*/}
                                {/*    <a href="#">*/}
                                {/*        <FaInstagram className="text-3xl hover:text-primary duration-300" />*/}
                                {/*    </a>*/}
                                {/*    <a href="#">*/}
                                {/*        <FaFacebook className="text-3xl hover:text-primary duration-200" />*/}
                                {/*    </a>*/}
                                {/*    <a href="#">*/}
                                {/*        <FaLinkedin className="text-3xl hover:text-primary duration-200" />*/}
                                {/*    </a>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
