import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom'

import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            navigate(from, {replace:true});
        } catch (err) {
            console.log(err);
            if (!err?.response) {
                setErrMsg('伺服器沒有回應');
            } else if (err.response?.status === 400) {
                setErrMsg('使用者名稱或密碼不正確');
            } else if (err.response?.status === 401) {
                setErrMsg('無此帳號或密碼');
            } else {
                setErrMsg('登入失敗');
            }
        }
    }

    return (
                <section>
                    <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                    <h1>登入</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="user">帳號:</label>
                        <input
                            type="text"
                            id="user"
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="pwd">密碼:</label>
                        <input
                            type="password"
                            id="pwd"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>登入</button>
                    </form>
                    <p>
                        尚未創建帳戶？<br />
                        <span className="line">
                            <Link to="/register">註冊</Link><br/>
                            <Link to="/forgetPWD">忘記密碼</Link><br/>
                            <Link to="/linkpage">連結頁面</Link>
                        </span>
                    </p>
                </section>
    )
}

export default Login
