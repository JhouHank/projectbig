import { Link } from "react-router-dom"
import useAuth from '../hooks/useAuth';

const Member = () => {
    const { auth } = useAuth();

    return (
        <div className="contanier text-center">
            <section>
                <h1>會員資料</h1>
                <br />
                <p>會員名稱：{auth.name}</p>
                <div className="flexGrow">
                    <Link to={`/member/${auth.name}/changePWD`}>修改密碼</Link> <br/>
                    <Link to={`/member/order`}>我的訂單</Link> <br/>
                    <Link to="/">主頁</Link>
                </div>
            </section>
        </div>
    )
}

export default Member
