import { useSelector } from "react-redux";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LandingLayout from "./layouts/LandingLayout";
import {
  Cart,
  Checkout,
  Home,
  Login,
  PaymentSuccessPage,
  Register,
  Search,
} from "./routes";

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
