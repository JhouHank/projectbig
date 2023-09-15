import React from 'react';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useLogout from "../hooks/useLogout";


const Header = () => {
    const [success, setSuccess] = useState(false);
    const { auth } = useAuth();
    const navigate = useNavigate();
    const logout = useLogout();

    
    useEffect(() => {
        /* 下面是 componentDidMount */
        auth.email ? setSuccess(true) : setSuccess(false);
        /* 上面是 componentDidMount */
    }, [auth.email]); 


    const signOut = async () => {
        await logout();
        navigate('/linkpage');
    }

    return (
        <header className="bg-primary text-white text-center fs-1 mb-5 p-3">
            {success ? <button className="btn btn-light w-25 fs-5" onClick={signOut}>登出</button> : <Link to="/login" className="btn btn-light w-25 fs-5">登入</Link>}
        </header>
    );
}

export default Header;
