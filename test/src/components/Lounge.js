import { Link } from "react-router-dom"

const Lounge = () => {
    return (
        <section>
            <h1>休息室</h1>
            <br />
            <p>管理員及編輯者可以存取這個頁面</p>
            <div className="flexGrow">
                <Link to="/">主頁</Link>
            </div>
        </section>
    )
}

export default Lounge
