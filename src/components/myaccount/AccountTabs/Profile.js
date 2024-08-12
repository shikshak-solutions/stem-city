import React, { useState } from 'react';
import '../MyAccount.css';
import useAuth from "../../../redux/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {actionToLogout} from "../../../redux/action";


const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { setAuth } = useAuth();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    const logout =()=>{
        dispatch(actionToLogout());
        setAuth({});
        navigate('/login')
    }

    return (
        <div className="accordion">
            <div className="accordion-item">
                <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(0)}
                >
                    Edit Personal Information
                </button>
                <div className={`accordion-content ${activeIndex === 0 ? 'active' : ''}`}>
                    <form className='account-form'>
                        <label className='account-label'>
                            Name:
                            <input className='account-input' type="text" name="name" />
                        </label>
                        <label className='account-label' >
                            Phone:
                            <input className='account-input' type="text" name="phone" />
                        </label>
                    </form>
                    <form className='account-form'>
                        <label className='account-label'>
                            Email:
                            <input className='account-input' type="email" name="email" />
                        </label>
                        <label className='account-label' >
                            Gender:
                            <input className='account-input' type="text" name="phone" />
                        </label>
                    </form>
                    <button className='account-button' type="submit">Save</button>
                </div>
            </div>

            <div className="accordion-item">
                <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(1)}
                >
                    Change Email and Password
                </button>
                <div className={`accordion-content ${activeIndex === 1 ? 'active' : ''}`}>
                    <form className='account-form'>
                        <label className='account-label'>
                            New Password:
                            <input className='account-input' type="password" name="new-password" />
                        </label>
                        <label className='account-label'>
                            Confirm Password:
                            <input className='account-input' type="password" name="confirm-password" />
                        </label>
                    </form>
                    <button className='account-button' type="submit">Save</button>
                </div>
            </div>

            <div className="accordion-item">
                <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(2)}
                >
                    Modify Saved Address
                </button>
                <div className={`accordion-content ${activeIndex === 2 ? 'active' : ''}`}>
                    <form className='account-form'>
                        <label className='account-label' >
                            Address:
                            <input className='account-input' type="text" name="address" />
                        </label>
                        <label className='account-label'>
                            City:
                            <input className='account-input' type="text" name="city" />
                        </label>
                    </form>
                    <form className='account-form'>
                        <label className='account-label'>
                            Country:
                            <input className='account-input' type="text" name="city" />
                        </label>
                    </form>
                    <form className='account-form'>
                        <label className='account-label' >
                            State:
                            <input className='account-input' type="text" name="address" />
                        </label>
                        <label className='account-label'>
                            Pin Code:
                            <input className='account-input' type="text" name="postal-code" />
                        </label>
                    </form>
                    <button className='account-button' type="submit">Save</button>
                </div>
            </div>
            <div className='log-out'>
                <button className='account-button' onClick={logout}>Log Out</button>
            </div>
        </div>
    );
};

export default Accordion;
