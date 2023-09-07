import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/linkpage');
    }

    return (
        <section>
            <h1>主頁</h1>
            <br />
            <p>你已登入！</p>
            <br />
            <Link to="/editor">前往編輯者頁面</Link>
            <br />
            <Link to="/admin">前往管理員頁面</Link>
            <br />
            <Link to="/lounge">前往休息室</Link>
            <br />
            <Link to="/linkpage">前往連結頁面</Link>
            <br />
            <Link to="/member">前往會員頁</Link>
            <div className="flexGrow">
                <button onClick={logout}>登出</button>
            </div>
        </section>
    )
}

export default Home