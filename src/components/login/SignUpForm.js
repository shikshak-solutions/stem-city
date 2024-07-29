import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "./Login.css";
import {Link} from "react-router-dom";
const SignUpForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: ''
    });

    const [formErrors, setFormErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Confirm password is required';
        } else if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = 'Passwords do not match';
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
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    return (
        <div className='container'>
            <div className='form-box'>
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <div className='input-field'>
                            <FontAwesomeIcon className='icon' icon={faUser} />
                            <input
                                type='text'
                                placeholder='Name'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        {formErrors.name && <span className="error">{formErrors.name}</span>}
                        <div className='input-field'>
                            <FontAwesomeIcon className='icon' icon={faEnvelope} />
                            <input
                                type='text'
                                placeholder='Email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {formErrors.email && <span className="error">{formErrors.email}</span>}
                        </div>
                        <div className='input-field'>
                            <FontAwesomeIcon className='icon' icon={faPhone} />
                            <input
                                type='number'
                                placeholder='Mobile'
                                name='mobile'
                                value={formData.mobile}
                                onChange={handleChange}
                            />
                            {formErrors.mobile && <span className="error">{formErrors.mobile}</span>}
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
                        <div className='input-field'>
                            <FontAwesomeIcon className='icon' icon={faLock} />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder='Confirm Password'
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <FontAwesomeIcon
                                className={`eye-icon ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                onClick={toggleConfirmPasswordVisibility}
                                icon={showConfirmPassword ? faEyeSlash : faEye}
                            />
                            {formErrors.confirmPassword && <span className="error">{formErrors.confirmPassword}</span>}
                        </div>
                        {formErrors.contact && <span className="error">{formErrors.contact}</span>}
                        <p>Already Have an Account?<a href='/login'>  Click Here to Sign in</a></p>
                    </div>
                    <div className='btn-field'>
                        <button type='submit'>Sign up</button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default SignUpForm;