import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import useLogout from "../hooks/useLogout";

const CHANGEPWD_URL = '/changePWD';
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

const ChangePWD = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const webUser = useParams().user;

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');

    const [newPwd, setNewPwd] = useState('');
    const [validNewPwd, setValidNewPwd] = useState(false);
    const [newPwdFocus, setNewPwdFocus] = useState(false);
    
    const [errMsg, setErrMsg] = useState('');

    const logout = useLogout();


    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, newPwd])

    useEffect(() => {
        setValidNewPwd(PWD_REGEX.test(newPwd));
    }, [newPwd])

    const signOut = async () => {
        await logout();
        navigate('/linkpage');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(CHANGEPWD_URL,
                JSON.stringify({ webUser, user, pwd, newPwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            setUser('');
            setPwd('');
            setNewPwd('');
            signOut();
        } catch (err) {
            console.log(err);
            if (!err?.response) {
                setErrMsg('伺服器沒有回應');
            } else if (err.response?.status === 401) {
                setErrMsg('驗證帳號或驗證密碼不正確');
            } else if (err.response?.status === 400) {
                setErrMsg('舊密碼與新密碼相同');
            } else {
                setErrMsg('登入失敗');
            }
        }
    }

    return (
        <div className="container text-center">
            <section >
                <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                <h1>修改密碼</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="user">驗證帳號:</label>
                    <input
                        className='form-control form-control-lg bg-light fs-6'
                        type="text"
                        id="user"
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />
                    <label htmlFor="oldpwd">驗證舊密碼:</label>
                    <input
                        className='form-control form-control-lg bg-light fs-6'
                        type="password"
                        id="oldpwd"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <label htmlFor="newPwd">
                        新密碼:
                        <FontAwesomeIcon icon={faCheck} className={validNewPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validNewPwd || !newPwd  ? "hide" : "invalid"} />
                    </label>
                    <input
                        className='form-control form-control-lg bg-light fs-6'
                        type="password"
                        id="newPwd"
                        onChange={(e) => setNewPwd(e.target.value)}
                        value={newPwd}
                        required
                        onFocus={() => setNewPwdFocus(true)}
                        onBlur={() => setNewPwdFocus(false)}
                    />
                    <p id="newPwdnote" className={newPwdFocus && !validNewPwd  ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8至24個字元<br />
                        必須包含至少一個小寫字母、大寫字母、一個數字<br />
                        不允許特殊字符<br />
                        不允許與舊密碼相同
                    </p>
                    <button
                    className="btn btn-primary w-50 fs-5 mt-3" 
                    disabled={ !validNewPwd ? true : false}>更改密碼</button>
                </form>
                <p>
                    <span className="line">
                    <Link to={`/member/${auth.user}`} >取消</Link>
                    </span>
                </p>
            </section>
        </div>
    )
}

export default ChangePWD
