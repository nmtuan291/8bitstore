import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import "./Layout.scss";
import Footer from "../components/Footer";

const Layout = () => {
  
  return (
    <div className="layout-wrapper"> 
      <NavBar />
      <main>
        <Outlet></Outlet>
      </main>
      <Footer />
    </div>
  )
}

export default Layout;