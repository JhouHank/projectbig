import { Link } from "react-router-dom"
// import Users from "./Users"

const Admin = () => {
    return (
        <section>
            <h1>管理員頁面</h1>
            <br />
            {/* <Users/> */}
            <br />
            <p>你必須以管理員身分登入</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Admin
