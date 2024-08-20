import React, {useEffect, useState} from "react";
import Heading from "../shared/Heading";

// import images
import CurriculumCard from "./CurriculumCard";
import {ProductCurriculum} from "../../pages/ProductCurriculum";

const Curriculum = () => {
    const [curriculum,setCurriculum] = useState([]);
    useEffect(()=>{
        let curriculumData = [...ProductCurriculum];
        curriculumData.length > 4 && curriculumData.splice(3,curriculumData.length-3)
        setCurriculum(curriculumData)
    },[ProductCurriculum]);
    return (
        <div className="my-12">
            <div className="container">
                {/* Header section */}
                <Heading title="Curriculum" subtitle={"Explore Our Curriculum"} />

                {/* Blog section */}
                <CurriculumCard data={curriculum} />
            </div>
        </div>
    );
};

export default Curriculum;
