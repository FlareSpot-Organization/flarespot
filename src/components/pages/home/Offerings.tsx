import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useProductsFetch from "@/hooks/useProductsFetch";
import { getIcon } from "@/utils/helpers";

interface Stat {
  value: string;
  label: string;
  gradient: string;
}

interface ArrowProps {
  onClick?: () => void;
}

const Offerings: React.FC = () => {
  const { categories, isLoading } = useProductsFetch();

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

  const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-xl transition-all duration-300 z-10">
      <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
    </button>
  );

  const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-xl transition-all duration-300 z-10">
      <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
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
    <div
      className="w-full px-4 py-12 bg-white dark:bg-gray-900 transition-colors duration-300"
      style={{ borderRadius: "8px" }}>
      <div className="mb-16">
        <h1 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
          Explore millions of offerings tailored to your business needs
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
              <span
                className={`sm:text-4xl text-xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </span>
              <span className="text-gray-600 dark:text-gray-300 text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-8">
        {isLoading ? (
          <div className="grid grid-cols-8 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 dark:bg-gray-700 animate-pulse rounded-2xl p-6">
                <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-full mb-4"></div>
                <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <Slider {...settings}>
            {categories?.data?.slice(7).map(
              (
                category: {
                  name: string;
                  color: string;
                  icon?: string;
                  id: string;
                },
                index: number
              ) => (
                <Link to={category?.id} key={`${category?.name}-${index}`}>
                  <div className="px-2">
                    <div
                      className={`flex flex-col items-center justify-center p-6 rounded-2xl ${
                        category.color || "bg-gray-200 dark:bg-gray-700"
                      } cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}>
                      <span className="sm:text-3xl text-xl mb-3">
                        {getIcon(category?.name)} {category?.icon}
                      </span>
                      <span className="sm:text-xs text-[10px] text-center font-medium text-gray-700 dark:text-gray-200">
                        {category?.name}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            )}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Offerings;
