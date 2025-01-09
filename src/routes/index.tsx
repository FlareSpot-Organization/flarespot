import { lazy } from "react";

// General routes - Contains routes for main public pages like Home, About and Contact
export const Home = lazy(() => import("@/pages/general/Home/Home"));
export const About = lazy(() => import("@/pages/general/About/About"));
export const Contact = lazy(() => import("@/pages/general/Contact/Contact"));
