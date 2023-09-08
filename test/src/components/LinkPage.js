import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const LinkPage = () => {
    const [success, setSuccess] = useState(false);
    const {auth, setAuth} = useAuth();
    const navigate = useNavigate();
    
    // auth.user改變的時候會觸發裡面的判斷式
    useEffect(() => {
        auth.user ? setSuccess(true) : setSuccess(false);
    }, [auth.user]); 

    const logout = async () => {
        // 登出的時候把auth的值設為空物件
        setAuth({});
        // 然後轉到連結頁面
        navigate('/linkpage');
    }
    
    return (
            <section>
                <h1>連結</h1>
                <br />
                <h2>公共連結</h2>
                {success ? <button onClick={logout}>登出</button> : <Link to="/login">登入</Link>}
                <Link to="/register">註冊</Link>
                <br />
                <h2>私人連結</h2>
                <Link to="/">主頁</Link>
                <Link to="/editor">編輯者頁面</Link>
                <Link to="/admin">管理員頁面</Link>
            </section>
        )
}

export default LinkPage
