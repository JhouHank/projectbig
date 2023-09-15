import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import useLogout from "../hooks/useLogout";
import Transition from '../Transition';


const Home = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/linkpage');
    }

    return (
        <Transition>
            <div className="container text-center">
                <section>
                    <h1>主頁</h1>
                    <br />
                    <p>你已登入！</p>
                    <br />
                    <Link to="/admin">後台？</Link>
                    <br />
                    <Link to={`/member/${auth.name}`} >會員頁</Link>
                    <br />
                    <Link to="/linkpage">連結頁面</Link>
                    <div className="flexGrow">
                        <button className="btn btn-primary w-25 fs-5" onClick={signOut}>登出</button>
                    </div>
                </section>
            </div>
        </Transition>
    )
}

export default  Home;
