import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from '../api/axios';

const FORGETPWD_URL = '/forgetPWD';

const ForgetPWD = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [name, email])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(FORGETPWD_URL,
                JSON.stringify({ name, email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            setName('');
            setEmail('');
            navigate("/login", {replace:true});
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
        <div className="container text-center">
            <section>
                <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                <h1>忘記密碼</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name" className='form-label'>驗證帳號:</label>
                    <input
                        className='form-control form-control-lg bg-light fs-6'
                        type="text"
                        id="name"
                        autoComplete="off"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />

                    <label htmlFor="email" className='form-label'>電子信箱:</label>
                    <input
                        className='form-control form-control-lg bg-light fs-6'
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <button className="btn btn-primary w-25 fs-5 mt-3">傳送驗證信</button>
                </form>
                <div className="flexGrow">
                    <Link to="/linkpage">回到連結頁面</Link> <br/>
                    <Link to="/" replace>回到上一頁</Link>
                </div>
            </section>
        </div>
    )
}

export default ForgetPWD;
