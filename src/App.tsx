import { useSelector } from "react-redux";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LandingLayout from "./layouts/LandingLayout";
import {
  AccountSecurity,
  Address,
  Auth,
  Cart,
  Checkout,
  Coupons,
  CreditBalance,
  DashboardLayout,
  History,
  Home,
  Login,
  Order,
  PaymentMethods,
  PaymentSuccessPage,
  Permissions,
  Profile,
  Register,
  Search,
  SingleProduct,
  Wishlist,
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
      path: "/user",
      element: <LandingLayout />,
      children: [
        {
          path: "",
          element: <DashboardLayout />,
          children: [
            // Dashboard-specific routes can go here
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "orders",
              element: <Order />,
            },
            {
              path: "coupons",
              element: <Coupons />,
            },
            {
              path: "addresses",
              element: <Address />,
            },
            {
              path: "credit-balance",
              element: <CreditBalance />,
            },
            {
              path: "payments",
              element: <PaymentMethods />,
            },
            {
              path: "browsing-history",
              element: <History />,
            },
            {
              path: "account-security",
              element: <AccountSecurity />,
            },
            {
              path: "permissions",
              element: <Permissions />,
            },
          ],
        },
      ],
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
          path: "wishlist",
          element: <Wishlist />,
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
        {
          path: "product",
          element: <SingleProduct />,
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
        // {
        //   path: "",
        //   element: <Auth />,
        // },
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
