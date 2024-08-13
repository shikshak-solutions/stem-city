import React, {useState} from 'react';
import './MyAccount.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBox, faHeart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Profile from "./AccountTabs/Profile";
import Orders from "./AccountTabs/Orders";
import WishList from "./AccountTabs/WishList";
import {useDispatch} from "react-redux";
import {actionToLogout} from "../../redux/action";
import useAuth from "../../redux/hooks/useAuth";
import {useNavigate} from "react-router-dom";

const MyAccount = () => {
    const { setAuth } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const logout =()=>{
        dispatch(actionToLogout());
        setAuth({});
        navigate('/login')
    }
    const getTabContent =() =>{
        switch (activeTab){
            case 'profile':
                return <Profile />;
            case 'orders':
                return <Orders />;
            case 'wishlist' :
                return  <WishList/>
        }
    }
    return (
        <>
        <div className="account-container">
            <div className="account-sections">
                <div className="account-section">
                    <button className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => handleTabClick('profile')}>
                        <FontAwesomeIcon  icon={faUser} />
                    </button>
                    <h2>Profile</h2>
                </div>
                <div className="account-section">
                    <button className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
                            onClick={() => handleTabClick('orders')}>
                    <FontAwesomeIcon icon={faBox} />
                    </button>
                    <h2>Orders</h2>
                </div>
                <div className="account-section">
                    <button className={`tab ${activeTab === 'wishlist' ? 'active' : ''}`}
                            onClick={() => handleTabClick('wishlist')} >
                    <FontAwesomeIcon icon={faHeart} />
                    </button>
                    <h2>Wishlist</h2>
                </div>
                <div className="account-section" onClick={logout}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <h2>Logout</h2>
                </div>
            </div>
        </div>
            {getTabContent( )}
        </>

    );
};

export default MyAccount;


