import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import "./Login.css";
import { useNavigate} from "react-router-dom";
import {useEffectOnce} from "../../redux/hooks/useEffectOnce";
const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

    };

    useEffectOnce(()=>{
        if(localStorage.getItem('user')){
            navigate("/");
        }
    });
    return (
        <div className='container'>
            <div className='form-box'>
                <h1>Reset your Password</h1>
                <h2>Please Provide the Email address or Mobile Number that you used when you signed up for your account.</h2>
                <form >
                    <div className='input-group'>
                        <div className='input-field'>
                            <FontAwesomeIcon className='icon' icon={faEnvelope} />
                            <input
                                type='text'
                                placeholder='Email or Mobile'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {/*{formErrors.email && <span className="error">{formErrors.email}</span>}*/}
                        </div>
                        <h2>We will Send you an Email that will Allow you to Reset your Password.</h2>
                    </div>
                    <div className='btn-field'>
                        <button type='button'>Reset Password</button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default LoginForm;
