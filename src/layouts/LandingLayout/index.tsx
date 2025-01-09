import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const LandingLayout = () => {
  return (
    <div>
      <Header />

      <Outlet />
      <Footer />
    </div>
  );
};

export default LandingLayout;
