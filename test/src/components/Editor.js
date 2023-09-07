import { Link } from "react-router-dom"

const Editor = () => {
    return (
        <section>
            <h1>編輯者頁面</h1>
            <br />
            <p>你必須以編輯者身分登入</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Editor
