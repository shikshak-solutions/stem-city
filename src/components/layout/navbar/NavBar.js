import React from "react";
import { IoMdSearch  } from "react-icons/io";
import { FaCaretDown, FaCartShopping, FaRightToBracket} from "react-icons/fa6";
import logo from "../../../assets/images/logo2.png";
import {FaUser} from "react-icons/fa";
import {Link} from "react-router-dom";
import useAuth from "../../../redux/hooks/useAuth";
import {useSelector} from "react-redux";

const MenuLinks = [
    {
        id: 1,
        name: "Home",
        link: "/#",
    },
    {
        id: 2,
        name: "Products",
        link: "/products",
    },
    // {
    //     id: 3,
    //     name: "About",
    //     link: "/#about",
    // },
    {
        id: 4,
        name: "Curriculum",
        link: "/curriculum",
    },
    {
        id: 3,
        name: "Shop",
        link: "/shop",
    },
];


const Navbar = () => {
    const { auth } = useAuth();
    const cartItem = useSelector((state)=> {
        let quantity = 0;
        state.product.cartItems.map(item => quantity+= item.quantity)
        return {quantity:quantity};
    })
    return (
        <div className="bg-white duration-200 relative z-40">
            <div className="py-4">
                <div className="container flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link to='/'>
                        <img src={logo} className="logo" alt={"Stemcity logo"}/>
                        </Link>
                        <div className="hidden lg:block">
                            <ul className="flex items-center gap-4">
                                {MenuLinks.map((data, index) => (
                                    <li key={index}>
                                        <Link to={data.link}
                                            className="inline-block px-4 font-semibold text-gray-500 hover:text-red-600 dark:hover:text-white duration-200"
                                        >
                                            {data.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/*<div className="flex justify-between items-center gap-4">
                        <div className="relative group hidden sm:block">
                            <input
                                type="text"
                                placeholder="Search"
                                className="search-bar"/>
                            <IoMdSearch className="text-xl text-gray-600 group-hover:text-primary dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 duration-200" />
                        </div>
                        {auth?.id ?
                            <Link to='/account'>
                                <button className="relative p-3">
                                    <FaUser className="text-xl text-gray-600 hover:text-red-600 dark:text-gray-400" />
                                </button>
                            </Link> :
                            <Link to='/login'>
                                <button className="relative p-3">
                                    <FaRightToBracket className="text-xl text-gray-600 hover:text-red-600 dark:text-gray-400" />
                                </button>
                            </Link>
                        }


                        <Link to='/cart'>
                        <button className="relative p-3">
                            <FaCartShopping className="text-xl text-gray-600 hover:text-red-600 dark:text-gray-400" />
                            <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                                {cartItem.quantity}
                            </div>
                        </button>
                        </Link>
                    </div>*/}
                </div>
            </div>
        </div>
    );
};

export default Navbar;

// overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] flex justify-center items-center
