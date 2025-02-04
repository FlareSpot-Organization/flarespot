import { Outlet } from "react-router-dom";
import Header from "./Header";

const AuthLayout = () => {
  return (
    <div>
      {/* <Header /> */}
      <Outlet />
    </div>
  );
};

export default AuthLayout;
