import React, {useState} from "react";
import "./ProductTabs.css";
import Description from "./Description";
import Models from "./Models";
import Review from "./Review";
const ProductTabs = () => {
    const [activeTab, setActiveTab] = useState('description');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const getTabContent =() =>{
        switch (activeTab){
            case 'description':
                return <Description />;
            case 'models':
                return <Models />;
            case 'reviews' :
                return  <Review/>
        }
    }
    return (
        <div className='product-tab-container'>
            <div className="tab">
                <button
                    className={`tab ${activeTab === 'description' ? 'active' : ''}`}
                    onClick={() => handleTabClick('description')}
                >
                    Description
                </button>
                <button
                    className={`tab ${activeTab === 'models' ? 'active' : ''}`}
                    onClick={() => handleTabClick('models')}
                >
                    Models
                </button>
                <button
                    className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
                    onClick={() => handleTabClick('reviews')}
                >
                    Reviews
                </button>
            </div>
            <div className="tab-content">
                {getTabContent()}
            </div>
        </div>
    )
}

export default ProductTabs
