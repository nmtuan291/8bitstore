import NavBar from "../components/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import "./Layout.scss";
import MobileMenu from "../components/Header/MobileMenu";
import Breadcrumb from "../components/Breadcrumb";
import { useState } from "react";

const Layout = () => {
  const [displayMobile, setDisplayMobile] = useState<boolean>(false);
  const location = useLocation();

  const hiddenPaths = ["/home", "/", "/payment-result"];

  const showBreadcrumbs = !hiddenPaths.includes(location.pathname);

  return (
    <div className="layout-wrapper"> 
      <NavBar displayMobile={() => setDisplayMobile(true)}/>
      <main>
        <Outlet />
      </main>
      <Footer />
      { displayMobile && <MobileMenu user={null} isVisible={displayMobile} setIsVisible={(visible: boolean) => setDisplayMobile(visible)}></MobileMenu>}
    </div>
  )
}

export default Layout;