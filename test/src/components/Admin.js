import { Link } from "react-router-dom"
// import Users from "./Users"

const Admin = () => {
    return (
        <section>
            <h1>管理員頁面</h1>
            <br />
            <p>管理員身分可以存取這個頁面</p>
            <div className="flexGrow">
                <Link to="/">主頁</Link>
            </div>
        </section>
    )
}

export default Admin
