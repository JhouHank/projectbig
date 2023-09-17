import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    // controller.signal這個信號通常用於中止請求，
                    // 以確保在組件卸載或不再需要請求的情況下能夠停止請求的進行。
                    signal: controller.signal
                });
                // console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="container">
            <article>
                <h2>管理員列表</h2>
                {users?.length
                    ? (
                            <ul className="list-unstyled">
                                {users.map((user, i) => <li key={i}>{user}</li>)}
                            </ul>
                    ) : <p>無管理員</p>
                }
            </article>
        </div>
    );
};

export default Users;
