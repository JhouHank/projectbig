import { Outlet } from "react-router-dom"
import Header from "../layout/header"
import Footer from "../layout/footer"

const Layout = () => {
    return (
        <main className="App">
            <Header/>
            <Outlet />
            <Footer/>
        </main>
    )
}

export default Layout
