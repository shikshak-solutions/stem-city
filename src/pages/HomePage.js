import React from "react";
import NavBar from "../components/navbar/NavBar";
import Home from "../components/home/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import Category from "../components/category/Category";
import Category2 from "../components/category/Category2";
import Services from "../components/services/Services";
import Banner from "../components/banner/Banner";
import Defender from "../assets/images/home/defender.png";
import creativeExpansion from "../assets/images/home/creative.png";
import Products from "../components/products/Products";
import Curriculum from "../components/curriculum/Curriculum";
import Footer from "../footer/Footer";
import Partners from "../components/partners/Partners";


const HomePage = () => {


    React.useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-in-sine",
            delay: 100,
            offset: 100,
        });
        AOS.refresh();
    }, []);

    const BannerData = {
        discount: "Enjoy Learning with",
        title: "Creative Expansion Kit",
        image: creativeExpansion,
        title2: "Get this",
        title3: "@Only 20,445 /-",
        title4:
            "Explore our Creative Expansion Kit and make various Creative models",
        bgColor: "#f42c37",
    };

    const BannerData2 = {
        discount: "Enjoy Learning with",
        title: "Defender WiseKit",
        image: Defender,
        title2: "Get this",
        title3: "@Only 25,499 /-",
        title4:
            "Explore our Defender WiseKit and make various Creative models",
        bgColor: "#2dcc6f",
    };

    return (
        <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
            <NavBar/>
            <Home />
            <Category/>
            <Category2/>
            <Services/>
            <Banner data={BannerData} />
            <Products/>
            <Banner data={BannerData2} />
            <Curriculum/>
            <Partners/>
            <Footer/>
        </div>
    )
}

export default HomePage;
