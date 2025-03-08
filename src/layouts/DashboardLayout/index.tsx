import {
  Clock,
  CreditCard,
  Key,
  Lock,
  MapPin,
  Menu,
  MessageSquare,
  ShoppingBag,
  Tag,
  User,
  X,
  Home,
  Star,
  Settings,
  ChevronUp,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

// Define interface for NavItem props
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  onClick?: () => void;
  isActive: boolean;
  className?: string;
}

// Define interface for nav items
interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  path,
  onClick,
  isActive,
  className,
}) => {
  return (
    <Link
      to={path}
      className={`flex items-center p-2.5 rounded-md transition-all duration-200 ${
        isActive
          ? "bg-indigo-50 text-indigo-700 font-medium"
          : "text-gray-700 hover:bg-gray-50"
      } ${className || ""}`}
      onClick={onClick}>
      <span className="flex items-center justify-center w-6 h-6">{icon}</span>
      <span className="ml-3 text-sm">{label}</span>
    </Link>
  );
};

const DashboardLayout: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const location = useLocation();

  // Close drawer when route changes on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setDrawerOpen(false);
    }
  }, [location.pathname]);

  const isActive = (path: string): boolean => {
    return location.pathname === path || location.pathname.includes(path);
  };

  // Helper function to get current page name from pathname
  const getCurrentPageName = (): string => {
    const pathParts = location.pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];

    // Convert slug to title case with spaces
    return lastPart
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Main nav items data with paths
  const navItems: NavItem[] = [
    {
      icon: <User className="w-5 h-5" />,
      label: "Your profile",
      path: "/user/profile",
    },
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      label: "Orders",
      path: "/user/orders",
    },
    {
      icon: <Tag className="w-5 h-5" />,
      label: "Coupons & offers",
      path: "/user/coupons",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: "Credit balance",
      path: "/user/credit-balance",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Browsing history",
      path: "/user/browsing-history",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Addresses",
      path: "/user/addresses",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: "Your payment methods",
      path: "/user/payments",
    },
    {
      icon: <Lock className="w-5 h-5" />,
      label: "Account security",
      path: "/user/account-security",
    },
    {
      icon: <Key className="w-5 h-5" />,
      label: "Permissions",
      path: "/user/permissions",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-8rem)] bg-gray-50">
      {/* Breadcrumb - Mobile & Desktop */}
      <div className="bg-white py-3 px-4 border-b border-gray-200 md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="text-gray-600 hover:text-indigo-600">
              <Home className="w-4 h-4" />
            </Link>
            <span>/</span>
            <span className="font-medium text-gray-800">
              {getCurrentPageName()}
            </span>
          </div>
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="p-1.5 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setDrawerOpen(false)}></div>
      )}

      {/* Bottom Drawer for Mobile */}
      <div
        className={`
          fixed inset-x-0 bottom-0 z-40 md:hidden
          transform transition-transform duration-300 ease-in-out
          ${drawerOpen ? "translate-y-0" : "translate-y-full"}
          bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto
        `}>
        <div className="sticky top-0 bg-white pt-3 pb-2 px-6 border-b border-gray-100">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-1.5 rounded-full bg-gray-300"></div>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-lg text-gray-900">
              Dashboard Menu
            </h3>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-1.5 rounded-full hover:bg-gray-100">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* User Profile Card */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-slate-800 text-white rounded-full w-12 h-12 flex items-center justify-center text-base font-medium">
                SA
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Sophia Anderson</h3>
                <p className="text-xs text-gray-500">Member since March 2023</p>
              </div>
            </div>
            <div className="mt-3 bg-gray-800 text-white rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center">
                <Star
                  className="w-4 h-4 text-yellow-400 mr-2"
                  fill="currentColor"
                />
                <span className="text-sm">Loyalty Points</span>
              </div>
              <span className="font-bold">256</span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="space-y-1">
            {navItems.map((item, index) => (
              <NavItem
                key={index}
                icon={item.icon}
                label={item.label}
                path={item.path}
                isActive={isActive(item.path)}
                onClick={() => setDrawerOpen(false)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar - Visible on larger screens */}
      <aside className="hidden md:block w-72 bg-white shadow-md border-r border-gray-200 overflow-y-auto sticky top-0 h-screen">
        <div className="p-4">
          {/* User Profile Card */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-slate-800 text-white rounded-full w-12 h-12 flex items-center justify-center text-base font-medium">
                SA
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Sophia Anderson</h3>
                <p className="text-xs text-gray-500">Member since March 2023</p>
              </div>
            </div>
            <div className="mt-3 bg-gray-800 text-white rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center">
                <Star
                  className="w-4 h-4 text-yellow-400 mr-2"
                  fill="currentColor"
                />
                <span className="text-sm">Loyalty Points</span>
              </div>
              <span className="font-bold">256</span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="space-y-1">
            {navItems.map((item, index) => (
              <NavItem
                key={index}
                icon={item.icon}
                label={item.label}
                path={item.path}
                isActive={isActive(item.path)}
              />
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-6">
        {/* Desktop breadcrumb */}
        <div className="hidden md:flex items-center mb-6 text-sm">
          <Link
            to="/"
            className="text-gray-600 hover:text-indigo-600 flex items-center">
            <Home className="w-4 h-4 mr-1" />
            <span>Home</span>
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/user" className="text-gray-600 hover:text-indigo-600">
            Dashboard
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="font-medium text-gray-800">
            {getCurrentPageName()}
          </span>
        </div>

        {/* Content from child routes */}
        <Outlet />
      </main>

      {/* Mobile drawer pull tab (when closed) */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-20 md:hidden flex justify-center items-center py-2 bg-white rounded-t-lg shadow-lg border border-gray-200 transform transition-all duration-300 ${drawerOpen ? "opacity-0 translate-y-full" : "opacity-100"}`}
        onClick={() => setDrawerOpen(true)}>
        <div className="w-10 h-1 rounded-full bg-gray-300 mb-1"></div>
        <ChevronUp className="w-5 h-5 text-gray-500" />
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-20 right-6 flex flex-col space-y-3 z-10 md:bottom-6">
        <button className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 hover:bg-gray-50">
          <MessageSquare className="w-6 h-6" />
        </button>
        <button className="bg-indigo-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-white hover:bg-indigo-700">
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default DashboardLayout;
