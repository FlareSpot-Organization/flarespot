import { lazy } from "react";

// General routes - Contains routes for main public pages like Home, About and Contact
export const Home = lazy(() => import("@/pages/general/Home/Home"));
