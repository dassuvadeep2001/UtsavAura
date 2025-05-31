import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Navbar from "./Header/Header";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-26 min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
