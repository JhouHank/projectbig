import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <article style={{ padding: "100px" }}>
            <h1>錯誤！</h1>
            <p>找不到頁面</p>
            <div className="flexGrow">
                <Link to="/linkpage">回到連結頁面</Link> <br/>
                <Link to="/" replace>回到上一頁</Link>
            </div>
        </article>
    )
}

export default Missing
