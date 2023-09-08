import { Link } from "react-router-dom"
import { useParams } from "react-router-dom";

const ChangePhoto = () => {
    const user = useParams();

    return (
        <section>
        <h1>更改大頭貼</h1>
        <br />
        <Link to={`/member/${user}`} >取消</Link>
    </section>
    )
}

export default ChangePhoto
