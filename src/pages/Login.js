import React, {useState} from "react";
import Navbar from "../components/navbar/NavBar";
import LoginForm from "../components/login/LoginForm";
import SignUpForm from "../components/login/SignUpForm";


const Login = () => {
    const [activePage,setActivePage] = useState('login')
    return (
        <>
            <Navbar/>
            {activePage === 'login' ? <LoginForm setActivePage={setActivePage}/> :   <SignUpForm setActivePage={setActivePage}/>}

        </>
    );
};

export default Login;
