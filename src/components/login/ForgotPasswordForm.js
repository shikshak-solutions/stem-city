import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../redux/hooks/useAuth';
import "./Login.css";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { actionToLogin} from "../../redux/action";
import {useEffectOnce} from "../../redux/hooks/useEffectOnce";
const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [signInError, setSignInError] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const { setAuth } = useAuth();
    const dispatch = useDispatch();

    const validate = () => {
        let errors = {};
        if (!formData.email && !formData.mobile) {
            errors.contact = 'Either Email or Mobile is required';
        }
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        return errors;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleLogin = async (e) => {
        setIsSubmitting(true);
       // e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            dispatch(actionToLogin(formData.email,formData.password)).then(
                res => {
                    setAuth({...res});
                    navigate(-1);
                    setIsSubmitting(false);
                },
                (error) => {
                    setSignInError(error?.response?.data?.errors[0]?.msg)
                    setIsSubmitting(false);
                }
            )
        } else {
            setFormErrors(errors);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                            {formErrors.email && <span className="error">{formErrors.email}</span>}
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