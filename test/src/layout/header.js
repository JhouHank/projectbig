import React from 'react';
import '../assets/layout/header.css'
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Header = () => {
    const [success, setSuccess] = useState(false);
    const {auth, setAuth} = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        /* 下面是 componentDidMount */
        auth.user ? setSuccess(true) : setSuccess(false);
        /* 上面是 componentDidMount */
    }, [auth.user]); 

    const logout = async () => {
        // 登出的時候把auth的值設為空物件
        setAuth({});
        // 然後轉到連結頁面
        navigate('/linkpage');
    }
    return (
        <header>
            <p className='header'>這是Header</p>
            {success ? <button onClick={logout}>登出</button> : <Link to="/login">登入</Link>}
        </header>
    );
}

export default Header;
