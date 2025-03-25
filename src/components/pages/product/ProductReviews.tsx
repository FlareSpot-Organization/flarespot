import Pagination from "@/components/common/Pagination";
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
