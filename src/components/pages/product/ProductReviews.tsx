import { ChevronLeft, ChevronRight, Verified } from "lucide-react";
import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";

interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  verified: boolean;
  title: string;
  content: string;
}

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const generateReviews = (count: number): Review[] => {
  const firstNames = [
    "John",
    "Emma",
    "Michael",
    "Sophia",
    "David",
    "Olivia",
    "James",
    "Ava",
    "Robert",
    "Isabella",
    "William",
    "Mia",
    "Joseph",
    "Charlotte",
    "Daniel",
    "Amelia",
    "Matthew",
    "Harper",
    "Anthony",
    "Evelyn",
  ];

  const lastNameInitials = ["S", "M", "B", "K", "P", "L", "H", "R", "W", "D"];

  const positiveAdjectives = [
    "Amazing",
    "Excellent",
    "Fantastic",
    "Outstanding",
    "Incredible",
    "Superb",
    "Wonderful",
    "Great",
    "Impressive",
    "Top-notch",
  ];

  const productDescriptors = ["Product", "Item", "Purchase", "Order", "Buy"];

  const generateTitle = (rating: number): string => {
    const titleTypes = [
      () =>
        `${positiveAdjectives[Math.floor(Math.random() * positiveAdjectives.length)]} ${productDescriptors[Math.floor(Math.random() * productDescriptors.length)]}`,
      () => `${rating > 3 ? "Highly" : "Somewhat"} Recommended`,
      () => `Great ${rating > 3 ? "Experience" : "Potential"}`,
      () => `${rating > 3 ? "Exceeded" : "Meets"} Expectations`,
      () => `${rating > 3 ? "Exceptional" : "Decent"} Quality`,
    ];

    return titleTypes[Math.floor(Math.random() * titleTypes.length)]();
  };

  const generateContent = (rating: number): string => {
    const contentOptions =
      rating > 4
        ? [
            "Exceeded all my expectations!",
            "Absolutely love this product!",
            "Would definitely recommend to others.",
            "Great value for the price.",
            "Performs exactly as described.",
          ]
        : rating > 2
          ? [
              "Does the job, but nothing special.",
              "Decent product with some room for improvement.",
              "Meets basic requirements.",
              "Okay, but not outstanding.",
            ]
          : [
              "Disappointed with the quality.",
              "Expected more for the price.",
              "Several issues with the product.",
              "Not worth the investment.",
            ];

    return contentOptions[Math.floor(Math.random() * contentOptions.length)];
  };

  const reviews: Review[] = [];
  const currentDate = new Date();

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastInitial =
      lastNameInitials[Math.floor(Math.random() * lastNameInitials.length)];

    const reviewDate = new Date(currentDate);
    reviewDate.setDate(currentDate.getDate() - Math.floor(Math.random() * 365));

    const rating = Math.floor(Math.random() * 5) + 1;

    reviews.push({
      id: i + 1,
      name: `${firstName} ${lastInitial}***`,
      date: reviewDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      rating,
      verified: Math.random() > 0.2,
      title: generateTitle(rating),
      content: generateContent(rating),
    });
  }

  return reviews;
};

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

  const generatePageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [1];

    if (validCurrentPage > 3) {
      pages.push("...");
    }

    const startPage = Math.max(2, validCurrentPage - 1);
    const endPage = Math.min(totalPages - 1, validCurrentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (validCurrentPage < totalPages - 2) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex items-center  space-x-2 mt-1">
      <button
        onClick={() => onPageChange(validCurrentPage - 1)}
        disabled={validCurrentPage === 1}
        className="px-3 py-1 rounded-full bg-white">
        <ChevronLeft />
      </button>

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`
            w-8 h-8 rounded-full flex items-center justify-center text-sm
            ${
              page === validCurrentPage
                ? "bg-black text-white"
                : page === "..."
                  ? "cursor-default text-gray-500"
                  : "bg-white text-black border"
            }
          `}
          disabled={page === "..."}>
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(validCurrentPage + 1)}
        disabled={validCurrentPage === totalPages}
        className="px-3 py-1 rounded-full bg-white">
        <ChevronRight />
      </button>
    </div>
  );
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex -mt-1">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={index < rating ? "#000000" : "#E0E0E0"}
          className="w-5 h-5">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
};

const getInitials = (name: string): string => {
  const names = name.split(" ");
  return names
    .map((n) => n[0].toUpperCase())
    .slice(0, 2)
    .join("");
};

const generateAvatar = (name: string): React.ReactNode => {
  const initials = getInitials(name);
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];

  // Choose a color based on the first character of the name
  const colorIndex = name.charCodeAt(0) % colors.length;

  return (
    <div
      className={`
          w-7 h-7 rounded-full flex items-center justify-center 
          ${colors[colorIndex]} text-white font-semibold text-[8px]
          mr-1 flex-shrink-0
        `}>
      {initials}
    </div>
  );
};

const ReviewCard: React.FC<Review> = ({
  name,
  date,
  rating,
  verified,
  title,
  content,
}) => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            {generateAvatar(name)}
            <div className="flex items-center space-x-2">
              <span className="text-[16px] h-[33px] font-[600] text-[rgb(34, 34, 34)] min-w-[44px] leading-[33px]">
                {name}
              </span>
              <span className="text-[14px] leading-[14px] mt-[1px] ml-[4px] font-[400] text-gray-400">
                {date}
              </span>
            </div>
          </div>
          {verified && (
            <div className="text-[10px] text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
              <Verified className="w-3 h-3 inline-block " />
              <span> Verified buyer</span>
            </div>
          )}
        </div>
      </div>
      <StarRating rating={rating} />
      <div className="mt-5">
        <h3 className="font-bold mt-1 mb-1">{title}</h3>
        <p className="text-sm text-gray-700">{content}</p>
      </div>
    </div>
  );
};

const ProductReview: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { singleProduct } = useSelector((state: any) => state.products);

  // Generate 100 reviews
  const allReviews = useMemo(() => generateReviews(100), []);

  // Calculate overall rating
  const averageRating = useMemo(() => {
    const totalRating = allReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return totalRating / allReviews.length;
  }, [allReviews]);

  // Get current review
  const currentReview = allReviews[currentPage - 1];

  return (
    <div className="mt-2">
      <div
        className="flex justify-between items-center px-4 py-2"
        style={{ borderBottom: "1px solid rgb(236, 236, 236)" }}>
        <div className="flex items-center space-x-2">
          <span className="text-[18px] text-[rgb(34, 34, 34)] font-[600]">
            {allReviews.length} reviews{" "}
          </span>{" "}
          <span className="text-gray-300"> | </span>
          <div className="flex items-center space-x-1">
            <span className="text-[18px] text-[rgb(34,34,34)] leading-[29px] font-[600]">
              {singleProduct?.result?.reviews?.averageStar}
            </span>
            <StarRating
              rating={Math.round(singleProduct?.result?.reviews?.averageStar)}
            />
          </div>
        </div>
        <div className=" w-[20%]  text-gray-500 flex justify-end items-center ">
          <span className="leading-[30px] text-[13px] cursor-pointer font-[600] text-[#222]">
            {" "}
            Powered by{" "}
          </span>
          <svg
            enable-background="new 0 0 71.1 76"
            className="h-7 w-7"
            viewBox="0 0 71.1 76"
            xmlns="http://www.w3.org/2000/svg">
            <ellipse
              cx="36"
              cy="38.3"
              fill="#000"
              rx="33.1"
              ry="34.1"></ellipse>
            <g fill="#fff">
              <path d="m17.5 25.1h3.9l3 5.5 2.9-5.5h3.7l-4.9 8.8v4.7h-3.6v-4.6z"></path>
              <path d="m29.9 31.9c0-4.1 3.3-6.9 7.1-6.9s7.1 2.9 7.1 6.9c0 4.1-3.3 7-7.1 7-3.8-.1-7.1-2.9-7.1-7m10.5 0c0-2.1-1.3-3.8-3.5-3.8s-3.5 1.7-3.5 3.8 1.3 3.8 3.5 3.8c2.3 0 3.5-1.7 3.5-3.8"></path>
              <path d="m47.4 28.1h-3.5v-3h10.6v3h-3.5v10.5h-3.6z"></path>
              <path d="m22.1 53.4h-3.5v-13.5h5c3.6 0 5.6 2.3 5.6 5.3s-2 5.3-5.6 5.3h-1.5zm1.3-6c1.6 0 2.2-.9 2.2-2.2s-.6-2.3-2.2-2.3h-1.3v4.5z"></path>
              <path d="m29.8 46.7c0-4.1 3.3-6.9 7.1-6.9s7.1 2.9 7.1 6.9c0 4.1-3.3 7-7.1 7-3.8-.1-7.1-2.9-7.1-7m10.6 0c0-2.1-1.3-3.8-3.5-3.8s-3.5 1.7-3.5 3.8 1.3 3.8 3.5 3.8 3.5-1.7 3.5-3.8"></path>
              <path d="m44 51.7c0-1.2.9-2 1.9-2s1.9.8 1.9 2-.9 2-1.9 2c-1-.1-1.9-.9-1.9-2"></path>
            </g>
          </svg>
        </div>
      </div>

      <ReviewCard {...currentReview} />

      <Pagination
        totalPages={allReviews.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductReview;
