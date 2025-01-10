import { useSelector } from "react-redux";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LandingLayout from "./layouts/LandingLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Cart from "./pages/general/Product/Cart";
import Checkout from "./pages/general/Product/Checkout";
import PaymentSuccessPage from "./pages/general/Product/PaymentSuccessPage";
import Search from "./pages/general/Product/Search";
import { Home } from "./routes";

export default function App() {
  const { token } = useSelector((state: any) => state.auth);
  const router = createBrowserRouter([
    // Default route to redirect to /home
    {
      path: "/",
      element: <Navigate to="/home" />,
    },

    // Landing Routes
    {
      path: "/",
      element: <LandingLayout />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "checkout",
          element: <Checkout />,
        },
        {
          path: "paymentSuccess",
          element: <PaymentSuccessPage />,
        },
        {
          path: "search",
          element: <Search />,
        },
      ],
    },

    // Auth Routes
    {
      path: "/auth",
      element: token ? <Navigate to="/" /> : <Navigate to="/auth/login" />,
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },

    // Catch-all route to redirect to a default dashboard page
    {
      path: "*",
      element: <Navigate to="/dashboard/home" />,
    },
  ]);

  return <RouterProvider router={router} />;
}
