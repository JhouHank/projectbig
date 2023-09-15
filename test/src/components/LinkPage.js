import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useLogout from "../hooks/useLogout";

const LinkPage = () => {
    const [success, setSuccess] = useState(false);
    const { auth } = useAuth();
    const navigate = useNavigate();
    const logout = useLogout();

    
    // auth.name改變的時候會觸發裡面的判斷式
    useEffect(() => {
        auth.name ? setSuccess(true) : setSuccess(false);
    }, [auth.name]); 

    const signOut = async () => {
        await logout();
        navigate('/linkpage');
    }
    
    return (
        <div className="container text-center">
            <section className="">
                <h1>連結頁面</h1>
                <br />
                <h2>公共連結</h2>
                {success ? <button 
                className="btn btn-primary w-25 fs-5"
                onClick={signOut}>登出</button> : <Link className="btn btn-primary w-25 fs-5" to="/login">登入</Link>}<br/>
                <Link to="/register">註冊</Link>
                <br />
                <h2>私人連結</h2>
                <Link to="/">主頁</Link><br />
                <Link to="/editor">後台？</Link><br />
                <Link to="/admin">主 會員頁面</Link>
            </section>
        </div>
        )
}

export default LinkPage
