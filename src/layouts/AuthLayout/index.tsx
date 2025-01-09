import { Outlet } from "react-router-dom";
import Header from "./Header";

const LandingLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default LandingLayout;
