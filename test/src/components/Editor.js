import { Link } from "react-router-dom"

const Editor = () => {
    return (
        <section>
            <h1>編輯者頁面</h1>
            <br />
            <p>編輯者身分可以存取這個頁面</p>
            <div className="flexGrow">
                <Link to="/">主頁</Link>
            </div>
        </section>
    )
}

export default Editor
