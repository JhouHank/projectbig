import { Link } from "react-router-dom"
import useAuth from '../hooks/useAuth';


// import axios from '../api/axios';    

const Member = () => {
    const { auth } = useAuth();

    return (
        <section>
            <h1>會員資料</h1>
            <br />
            <p>會員名稱：{auth.user}</p>
            <p>會員頭貼: ???</p>
            <div className="flexGrow">
                <Link to={`/member/${auth.user}/changePWD`}>修改密碼</Link> <br/>
                <Link to={`/member/${auth.user}/changePhoto`}>修改大頭貼?</Link> <br/>
                <Link to="/">主頁</Link>
            </div>
        </section>
    )
}

export default Member
