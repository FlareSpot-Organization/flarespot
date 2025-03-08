import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Package,
  Settings,
  User,
  Heart,
  CreditCard,
  History,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { LogoutUser } from "@/services/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";

const Profile = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state: any) => state?.auth);

  const profileMenuItems = [
    { icon: Package, label: "My Orders", path: "/profile/orders" },
    { icon: Heart, label: "Wishlist", path: "/wishlist" },
    { icon: MapPin, label: "Addresses", path: "/profile/addresses" },
    {
      icon: CreditCard,
      label: "Payment Methods",
      path: "/profile/payment-methods",
    },
    {
      icon: History,
      label: "Recently Viewed",
      path: "/profile/recently-viewed",
    },
    { icon: Settings, label: "Account Settings", path: "/profile/settings" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    // Add logout logic here
    toast.success("Logged out successfully");
    dispatch(LogoutUser());
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user?.name?.firstname) return "U";
    return user.name?.firstname
      .split(" ")
      .map((part: string) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="bg-gray-200">
      <div className="container mx-auto px-4 py-8  dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            My Account
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Profile Summary Card */}
            <div className="lg:col-span-1">
              <Card className="dark:bg-gray-900 border-0 shadow-md overflow-hidden rounded-xl">
                <div className="h-12 bg-gradient-to-r bg-[#222]"></div>
                <CardHeader className="text-center pb-2 relative">
                  <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-white dark:border-gray-900 mt-[-3rem] shadow-lg">
                    <AvatarImage src={user?.profileImage} />
                    <AvatarFallback className="text-xl bg-gradient-to-br bg-[#222] text-white">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl text-gray-900 dark:text-gray-100 capitalize">
                    {user?.name?.firstname} {user?.name?.lastname}
                  </CardTitle>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    {user?.name?.email || "user@example.com"}
                  </p>
                </CardHeader>
                <CardContent className="pt-4">
                  <Button
                    variant="outline"
                    className="w-full mb-4 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2 text-[#222]" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Profile Menu Options */}
            <div className="lg:col-span-2">
              <Card className="dark:bg-gray-900 border-0 shadow-md rounded-xl overflow-hidden">
                <div className="h-2 bg-gradient-to-r bg-[#222]"></div>
                <CardHeader className="pt-6">
                  <CardTitle className="text-xl text-gray-900 dark:text-gray-100">
                    Account Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profileMenuItems.map((item, index) => (
                      <Card
                        key={index}
                        className="cursor-pointer hover:shadow-md transition-all border border-gray-300 dark:border-gray-800 dark:bg-gray-800/30 overflow-hidden"
                        onClick={() => handleNavigation(item.path)}>
                        <CardContent className="p-4 flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-indigo-900/40 dark:to-purple-900/40 flex items-center justify-center mr-4">
                            <item.icon className="w-5 h-5 text-[#222]" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-gray-100">
                              {item.label}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Manage your {item.label.toLowerCase()}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
