import { Outlet } from "react-router";
import Navbar from "./Navbar.jsx";

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export default AppLayout;
