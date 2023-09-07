import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth";


const Member = () => {
    const { auth } = useAuth();

    return (
        <section>
            <h1>會員資料</h1>
            <br />
            <p>會員名稱：{auth.user}</p>
            <button>修改密碼</button>
            <div className="flexGrow">
                <Link to="/">主頁</Link>
            </div>
        </section>
    )
}

export default Member
