import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Transition from '../Transition';
import cake from "../assets/images/cake.jpg";

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
            // console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, roles, accessToken });
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
        <Transition>
            <section className="container d-flex justify-content-center align-items-center">
                <div className="row border rounded-5 p-3 bg-white shadow box-area">
                    <div className="col-md-6 left-box rounded-4 d-flex justify-content-center align-items-center flex-column bg-primary">
                        <div className="featured-image mb-3">
                            <img src={cake} className="img-fluid" alt='cake'/>
                        </div>
                        <p className="text-white fs-2 fw-bolder">Be Verified</p>
                        <small className="text-white text-wrap text-center">Join experienced Designers on this platform.</small>
                    </div>
                    <div className="col-md-6 right-box p-3">
                        <div className="row align-items-center">
                            <h2>你好！</h2>
                            <p>歡迎回來！</p>
                            <form onSubmit={handleSubmit} className='mt-1'>
                                <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                                <label htmlFor="user" className='form-label'>帳號:</label>
                                <input
                                    className='form-control form-control-lg bg-light fs-6'
                                    type="text"
                                    id="user"
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    required
                                />

                                <label htmlFor="pwd" className='form-label'>密碼:</label>
                                <input
                                    className='form-control form-control-lg bg-light fs-6'
                                    type="password"
                                    id="pwd"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                />
                                <Link to="/forgetPWD">忘記密碼？</Link>
                                <button className="btn btn-primary w-100 fs-5">登入</button>
                            </form>
                            <div className="mt-2">
                                <p>尚未創建帳戶？</p>
                                <Link to="/register">註冊</Link><br/>
                                <Link to="/linkpage">連結頁面</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Transition>
    )
}

export default Login
