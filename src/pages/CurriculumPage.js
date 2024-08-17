import React from "react";
import Heading from "../components/shared/Heading";
import AOS from "aos";
import "aos/dist/aos.css";
import {ProductCurriculum} from "./ProductCurriculum";
import CurriculumCard from "../components/curriculum/CurriculumCard";
const CurriculumPage = () => {
    // const ProductsData = useSelector((state) => state.product.ProductsData);
    React.useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-in-sine",
            delay: 100,
            offset: 100,
        });
        AOS.refresh();
    }, []);
    return (
        <div>
            <div className="container">
                <Heading title="Our Curriculum" subtitle={"Explore Our Curriculum"} />
                <CurriculumCard data={ProductCurriculum} />
            </div>
        </div>
    );
};

export default CurriculumPage;
