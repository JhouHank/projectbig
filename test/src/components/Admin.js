import { Link } from "react-router-dom"
import Users from "./Users"

const Admin = () => {
    return (
        <div className="container text-center">
            <section>
                <h1>會員頁面</h1>
                <br />
                <Users/>
                <p>管理員身分可以存取這個頁面</p>
                <div className="flexGrow">
                    <Link to="/">主頁</Link>
                </div>
            </section>
        </div>
    )
}

export default Admin
