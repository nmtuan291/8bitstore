import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import "./Layout.scss";
import MobileMenu from "../components/NavBar/MobileMenu";
import { useState } from "react";

const Layout = () => {
  const [displayMobile, setDisplayMobile] = useState<boolean>(false);

  return (
    <div className="layout-wrapper"> 
      <NavBar displayMobile={() => setDisplayMobile(true)}/>
      <main>
        <Outlet></Outlet>
      </main>
      <Footer />
      { displayMobile && <MobileMenu user={null}></MobileMenu>}
    </div>
  )
}

export default Layout;