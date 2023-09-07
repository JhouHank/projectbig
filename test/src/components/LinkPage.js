import { Link } from "react-router-dom"

const LinkPage = () => {
    return (
        <section>
            <h1>連結</h1>
            <br />
            <h2>公共連結</h2>
            <Link to="/login">登入</Link>
            <Link to="/register">註冊</Link>
            <br />
            <h2>私人連結</h2>
            <Link to="/">主頁</Link>
            <Link to="/editor">編輯者頁面</Link>
            <Link to="/admin">管理員頁面</Link>
        </section>
    )
}

export default LinkPage
