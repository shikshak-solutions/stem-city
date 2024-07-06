import React from "react";
import "./Login.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";
import {faLock} from "@fortawesome/free-solid-svg-icons/faLock";

const LoginForm = () => {
    return (
        <div className='container'>
            <div className='form-box'>
                <h1>Sign Up</h1>
                <form>
                    <div className='input-group'>
                        <div className='input-field'>
                           <FontAwesomeIcon className='icon' icon={faUser}/>
                           <input type='text' placeholder='Name'/>
                        </div>
                        <div className='input-field'>
                            <FontAwesomeIcon className='icon' icon={faEnvelope}/>
                            <input type='text' placeholder='Email'/>
                        </div>
                        <div className='input-field'>
                            <FontAwesomeIcon className='icon' icon={faLock}/>
                            <input type='password' placeholder='Password'/>
                        </div>
                        <p>Forgot Password?<a href=''>  Click Here to reset</a></p>
                    </div>
                    <div className='btn-field'>
                        <button type='button'>Sign up</button>
                        <button type='button'>Sign in</button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default LoginForm;
