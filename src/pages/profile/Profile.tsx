import React from "react";
import {
  User,
  Package,
  Heart,
  Eye,
  ShoppingCart,
  Star,
  Gift,
  Calendar,
  ChevronRight,
} from "lucide-react";

const Profile = () => {
  // Mock user data
  const user = {
    name: "Sophia Anderson",
    email: "sophia.anderson@example.com",
    memberSince: "March 2023",
    avatar: null, // Set to null to demonstrate name-based avatar
    loyaltyPoints: 245,
    orderStats: {
      total: 17,
      pending: 2,
      completed: 14,
      cancelled: 1,
    },
    wishlists: 8,
    recentlyViewed: 12,
    cart: 3,
    reviews: 5,
  };

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  // Function to generate a consistent background color based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-neutral-800",
      "bg-neutral-700",
      "bg-neutral-900",
      "bg-gray-700",
      "bg-gray-800",
    ];

    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }

    return colors[sum % colors.length];
  };

  // Stat cards to display with updated colors
  const statCards = [
    {
      title: "Total Orders",
      count: user.orderStats.total,
      icon: <Package />,
      color: "bg-neutral-800",
    },
    {
      title: "Pending",
      count: user.orderStats.pending,
      icon: <ShoppingCart />,
      color: "bg-neutral-700",
    },
    {
      title: "Completed",
      count: user.orderStats.completed,
      icon: <Package />,
      color: "bg-neutral-900",
    },
    {
      title: "Wishlists",
      count: user.wishlists,
      icon: <Heart />,
      color: "bg-neutral-800",
    },
    {
      title: "Recently Viewed",
      count: user.recentlyViewed,
      icon: <Eye />,
      color: "bg-neutral-700",
    },
    {
      title: "Reviews",
      count: user.reviews,
      icon: <Star />,
      color: "bg-neutral-900",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Profile Header - Simplified and Fixed Alignment */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex items-center">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full mr-4 border-2 border-neutral-200"
              />
            ) : (
              <div
                className={`w-16 h-16 rounded-full mr-4 flex items-center justify-center text-white text-xl font-bold ${getAvatarColor(user.name)}`}>
                {getInitials(user.name)}
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-600 text-sm">{user.email}</p>
              <div className="flex items-center mt-1 text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="text-xs">Member since {user.memberSince}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loyalty Points Banner */}
      <div className="bg-neutral-900 rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Star className="text-yellow-400 mr-2 h-5 w-5" />
            <span className="text-white font-semibold">Loyalty Points</span>
          </div>
          <div className="text-right">
            <p className="text-white text-xl font-bold">{user.loyaltyPoints}</p>
          </div>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className={`h-2 ${card.color}`}></div>
            <div className="p-6 flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">{card.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {card.count}
                </p>
              </div>
              <div className={`p-3 rounded-full ${card.color} bg-opacity-20`}>
                {React.cloneElement(card.icon, {
                  className: "h-6 w-6 text-neutral-800",
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Activity
          </h2>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            {
              action: "Placed an order",
              item: "Wireless Headphones",
              time: "2 hours ago",
              icon: <Package className="text-neutral-800" />,
            },
            {
              action: "Added to wishlist",
              item: "Smart Watch Series 5",
              time: "Yesterday",
              icon: <Heart className="text-neutral-800" />,
            },
            {
              action: "Viewed product",
              item: "Leather Backpack",
              time: "2 days ago",
              icon: <Eye className="text-neutral-800" />,
            },
          ].map((activity, index) => (
            <div key={index} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-gray-100 mr-4">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800">
                    {activity.action}:{" "}
                    <span className="font-medium">{activity.item}</span>
                  </p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-3 bg-gray-50 text-center">
          <button className="text-neutral-800 font-medium hover:text-neutral-900">
            View All Activity
          </button>
        </div>
      </div>

      {/* Gift Card Balance */}
      <div className="bg-neutral-900 rounded-xl shadow-md overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="p-3 bg-white bg-opacity-10 rounded-full mr-4">
              <Gift className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold">
                Gift Card Balance
              </h3>
              <p className="text-white text-opacity-80">
                Use it on your next purchase
              </p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-white text-3xl font-bold">$75.50</p>
            <button className="mt-2 bg-white text-neutral-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-90">
              Add More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
