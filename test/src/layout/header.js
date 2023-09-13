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
        auth.user ? setSuccess(true) : setSuccess(false);
        /* 上面是 componentDidMount */
    }, [auth.user]); 


    const signOut = async () => {
        await logout();
        navigate('/linkpage');
    }

    return (
        <header>
            <p className='header'>這是Header</p>
            {success ? <button onClick={signOut}>登出</button> : <Link to="/login">登入</Link>}
        </header>
    );
}

export default Header;
