// General routes - Contains routes for main public pages like Home, About, and Contact
export { default as Home } from "@/pages/general/Home/Home";
export { default as Cart } from "@/pages/general/Product/Cart";
export { default as Wishlist } from "@/pages/general/Product/Wishlist";
export { default as Checkout } from "@/pages/general/Product/Checkout";
export { default as PaymentSuccessPage } from "@/pages/general/Product/PaymentSuccessPage";
export { default as Search } from "@/pages/general/Product/Search";
export { default as SingleProduct } from "@/pages/general/Product/SingleProduct";

// Auth routes
export { default as Login } from "@/pages/auth/Login";
export { default as Register } from "@/pages/auth/Register";
export { default as Auth } from "@/pages/auth/Auth";

// Layouts
export { default as AuthLayout } from "@/layouts/AuthLayout";
export { default as LandingLayout } from "@/layouts/LandingLayout";

//Profile
export { default as Profile } from "@/pages/profile/Profile";
