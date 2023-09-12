import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
// import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from '../api/axios';
const FORGETPWD_URL = '/forgetPWD';


const ForgetPWD = () => {
    const navigate = useNavigate();
    // const location = useLocation();
    // const from = location.state?.from?.pathname || "/";

    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [user, email])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(FORGETPWD_URL,
                JSON.stringify({ user, email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            setUser('');
            setEmail('');
            navigate("/login", {replace:true});
            // navigate(from, {replace:true});
        } catch (err) {
            console.log(err);
            if (!err?.response) {
                setErrMsg('伺服器沒有回應');
            } else if (err.response?.status === 400) {
                setErrMsg('查無此帳號');
            } else if (err.response?.status === 401) {
                setErrMsg('驗證信傳送失敗');
            } else {
                setErrMsg('登入失敗');
            }
        }
    }
    return (
        <section>
            <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            <h1>忘記密碼</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="user">驗證帳號:</label>
                <input
                    type="text"
                    id="user"
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label htmlFor="email">電子信箱:</label>
                <input
                    type="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <button>傳送驗證信</button>
            </form>
            <div className="flexGrow">
                <Link to="/linkpage">回到連結頁面</Link> <br/>
                <Link to="/" replace>回到上一頁</Link>
            </div>
        </section>
)
}

export default ForgetPWD;
