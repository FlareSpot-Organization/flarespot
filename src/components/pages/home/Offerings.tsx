import React from "react";
import Slider from "react-slick";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface Stat {
  value: string;
  label: string;
  gradient: string;
}

interface Category {
  icon: string;
  name: string;
  color: string;
}

interface ArrowProps {
  onClick?: () => void;
}

const Offerings: React.FC = () => {
  const stats: Stat[] = [
    {
      value: "200M+",
      label: "products",
      gradient: "from-orange-400 to-pink-500",
    },
    {
      value: "200K+",
      label: "suppliers",
      gradient: "from-blue-400 to-purple-500",
    },
    {
      value: "5,900",
      label: "product categories",
      gradient: "from-green-400 to-teal-500",
    },
    {
      value: "200+",
      label: "countries and regions",
      gradient: "from-yellow-400 to-orange-500",
    },
  ];

  const categories: Category[] = [
    {
      icon: "🌱",
      name: "Environment",
      color: "bg-green-50 hover:bg-green-100",
    },
    {
      icon: "👔",
      name: "Apparel & Accessories",
      color: "bg-blue-50 hover:bg-blue-100",
    },
    {
      icon: "🏠",
      name: "Home & Garden",
      color: "bg-yellow-50 hover:bg-yellow-100",
    },
    { icon: "💄", name: "Beauty", color: "bg-pink-50 hover:bg-pink-100" },
    {
      icon: "👟",
      name: "Shoes & Accessories",
      color: "bg-purple-50 hover:bg-purple-100",
    },
    {
      icon: "🧸",
      name: "Mother, Kids & Toys",
      color: "bg-red-50 hover:bg-red-100",
    },
    {
      icon: "🚗",
      name: "Vehicle Parts & Accessories",
      color: "bg-slate-50 hover:bg-slate-100",
    },
    {
      icon: "🔧",
      name: "Tools & Hardware",
      color: "bg-zinc-50 hover:bg-zinc-100",
    },
    { icon: "⭐", name: "testtest", color: "bg-amber-50 hover:bg-amber-100" },
    {
      icon: "🎧",
      name: "Consumer Electronics",
      color: "bg-indigo-50 hover:bg-indigo-100",
    },
    {
      icon: "💪",
      name: "Sports & Entertainment",
      color: "bg-emerald-50 hover:bg-emerald-100",
    },
    {
      icon: "📋",
      name: "Commercial Equipment",
      color: "bg-cyan-50 hover:bg-cyan-100",
    },
    {
      icon: "📦",
      name: "Packaging & Printing",
      color: "bg-fuchsia-50 hover:bg-fuchsia-100",
    },
    {
      icon: "💎",
      name: "Jewelry, Eyewear",
      color: "bg-rose-50 hover:bg-rose-100",
    },
    { icon: "🪑", name: "Furniture", color: "bg-teal-50 hover:bg-teal-100" },
    {
      icon: "🏭",
      name: "Industrial Machinery",
      color: "bg-violet-50 hover:bg-violet-100",
    },
  ];

  const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 hover:shadow-xl transition-all duration-300 z-10">
      <ChevronRight className="w-6 h-6 text-gray-600" />
    </button>
  );

  const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 hover:shadow-xl transition-all duration-300 z-10">
      <ChevronLeft className="w-6 h-6 text-gray-600" />
    </button>
  );

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="w-full  px-4 py-12 bg-white">
      <div className="mb-16">
        <h1 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Explore millions of offerings tailored to your business needs
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <span
                className={`sm:text-4xl text-xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </span>
              <span className="text-gray-600 text-center">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-8">
        <Slider {...settings}>
          {categories.map((category, index) => (
            <div key={index} className="px-2">
              <div
                className={`flex flex-col items-center justify-center p-6 rounded-2xl ${category.color} cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}>
                <span className="sm:text-3xl text-xl mb-3">
                  {category.icon}
                </span>
                <span className="sm:text-xs text-[10px] text-center font-medium text-gray-700">
                  {category.name}
                </span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Offerings;
