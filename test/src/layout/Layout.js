import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Navbar from "./Navbar";

const Layout = () => {
    return (
        <main className="d-flex">
            <div className="w-auto">
                <SideBar/>
            </div>
            <div className="col">
                <Navbar/>
                <Outlet/>
            </div>
        </main>
    )
}

export default Layout
