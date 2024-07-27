import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "./Login.css";
import {Link} from "react-router-dom";
const LoginForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: ''
    });

    const [formErrors, setFormErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {
        let errors = {};

        if (!formData.name) {
            errors.name = 'Name is required';
        }

        if (!formData.email && !formData.mobile) {
            errors.contact = 'Either Email or Mobile is required';
        } else {
            if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
                errors.email = 'Email is invalid';
            }
            if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
                errors.mobile = 'Mobile must be a 10-digit number';
            }
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            console.log('Form data is valid:', formData);
        } else {
            setFormErrors(errors);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className='container'>
            <div className='form-box'>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
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
                        <div className='input-field'>
                            <FontAwesomeIcon className='icon' icon={faLock} />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder='Password'
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <FontAwesomeIcon
                                className={`eye-icon ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                onClick={togglePasswordVisibility}
                                icon={showPassword ? faEyeSlash : faEye}
                            />
                            {formErrors.password && <span className="error">{formErrors.password}</span>}
                        </div>
                        {formErrors.contact && <span className="error">{formErrors.contact}</span>}
                        <p>Forgot Password?<a href=''>  Click Here to reset</a></p>
                        <p>Don't Have an Account?<a href='/signup'>  Click Here to Register</a></p>
                    </div>
                    <div className='btn-field'>
                        <button type='submit'>Sign in</button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default LoginForm;
