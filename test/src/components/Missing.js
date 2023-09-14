import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <article className="container text-center">
            <h1>錯誤！</h1>
            <p>找不到頁面</p>
            <div className="flexGrow">
                <Link to="/linkpage">連結頁面</Link> <br/>
            </div>
        </article>
    )
}

export default Missing
