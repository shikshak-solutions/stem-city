import React, {useState} from "react";
import LoginForm from "../components/login/LoginForm";
import SignUpForm from "../components/login/SignUpForm";


const Login = () => {
    const [activePage,setActivePage] = useState('login')
    return (
        <>
            {activePage === 'login' ? <LoginForm setActivePage={setActivePage}/> :   <SignUpForm setActivePage={setActivePage}/>}

        </>
    );
};

export default Login;
