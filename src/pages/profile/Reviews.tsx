import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Eye, Star } from "lucide-react";
import Loader from "@/components/common/Loader";
import { Product, Review } from "@/types/public";
import RatingStars from "@/components/pages/reviews/RatingStars";
import ReviewModal from "@/components/pages/reviews/ReviewModal";
import ProductSelectionModal from "@/components/pages/reviews/ProductSelectionModal";

const Reviews: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [productSelectionModalOpen, setProductSelectionModalOpen] =
    useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>();
  const [currentReview, setCurrentReview] = useState<
    Partial<Review> | undefined
  >();
  const selectedTab = searchParams.get("status") || "published";

  useEffect(() => {
    const savedReviews = localStorage.getItem("userReviews");
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
      setLoading(false);
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error(`API error: ${response.status}`);

        const fetchedProducts: Product[] = await response.json();
        setProducts(fetchedProducts);

        if (!savedReviews) {
          const dummyReviews = generateDummyReviews(fetchedProducts);
          setReviews(dummyReviews);
          localStorage.setItem("userReviews", JSON.stringify(dummyReviews));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        if (!savedReviews) {
          const dummyReviews = generateDummyReviews([]);
          setReviews(dummyReviews);
          localStorage.setItem("userReviews", JSON.stringify(dummyReviews));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const generateDummyReviews = (products: Product[]): Review[] => {
    if (!products.length) return [];

    const reviewTitles = [
      "Great product, highly recommend!",
      "Decent quality for the price",
      "Exceeded my expectations",
      "Not what I expected",
      "Perfect for my needs",
      "Could be better",
      "Amazing value",
      "Just okay",
    ];

    const reviewContents = [
      "This product has been amazing to use. The quality is top-notch and it does exactly what it promises. Would definitely buy again!",
      "I've been using this for a few weeks now and I'm quite satisfied. It's not perfect but it gets the job done well.",
      "Honestly wasn't expecting much but this product blew me away. The attention to detail is impressive.",
      "The item I received doesn't seem to match the description. The quality is lower than I expected.",
      "This is exactly what I needed. Fits perfectly into my daily routine and makes everything easier.",
      "It's alright, but there are a few issues that could be improved. Probably wouldn't purchase again.",
      "Can't believe the quality for this price point. Absolutely worth every penny!",
      "It works, but nothing special. Pretty standard product that does what it says.",
    ];

    return Array.from({ length: 10 }, (_, i) => {
      const product = products[Math.floor(Math.random() * products.length)];
      const reviewDate = new Date();
      reviewDate.setMonth(
        reviewDate.getMonth() - Math.floor(Math.random() * 3)
      );
      reviewDate.setDate(Math.floor(Math.random() * 28) + 1);

      return {
        id: `review-${i + 1}`,
        productId: product.id,
        product,
        rating: Math.floor(Math.random() * 3) + 3,
        title: reviewTitles[Math.floor(Math.random() * reviewTitles.length)],
        content:
          reviewContents[Math.floor(Math.random() * reviewContents.length)],
        date: reviewDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        status: "published" as const,
        helpful: Math.floor(Math.random() * 50),
        verified: Math.random() > 0.3,
        isFollowUp: false,
        parentReviewId: null,
      };
    });
  };

  const handleTabChange = (status: string) => {
    searchParams.set("status", status);
    setSearchParams(searchParams);
  };

  const handleOpenReviewModal = (
    product: Product,
    review?: Review,
    isFollowUp: boolean = false
  ) => {
    setCurrentProduct(product);
    setCurrentReview(
      review
        ? {
            ...review,
            isFollowUp,
            parentReviewId: isFollowUp ? review.id : null,
            originalReviewId: isFollowUp ? review.id : undefined,
          }
        : undefined
    );
    setModalOpen(true);
  };

  const handleSubmitReview = (reviewData: Partial<Review>) => {
    if (currentReview?.id && !currentReview.isFollowUp) {
      // Update existing review
      const updatedReviews = reviews.map((review) =>
        review.id === currentReview.id
          ? {
              ...review,
              ...reviewData,
              title: reviewData.title || review.title,
              content: reviewData.content || review.content,
              rating: reviewData.rating || review.rating,
            }
          : review
      );
      setReviews(updatedReviews);
      localStorage.setItem("userReviews", JSON.stringify(updatedReviews));
    } else if (currentProduct) {
      // Create new review or follow-up
      const newReview: Review = {
        id: `review-${Date.now()}`,
        productId: currentProduct.id,
        product: currentProduct,
        rating: reviewData.rating || 5,
        title: reviewData.title || "",
        content: reviewData.content || "",
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        status: "published",
        helpful: 0,
        verified: true,
        isFollowUp: !!currentReview?.isFollowUp,
        parentReviewId: currentReview?.parentReviewId || null,
        originalReviewId: currentReview?.originalReviewId,
      };
      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);
      localStorage.setItem("userReviews", JSON.stringify(updatedReviews));
    }

    setModalOpen(false);
    setCurrentReview(undefined);
    setCurrentProduct(undefined);
  };

  const getProductsToReview = () => {
    // Get unique productIds from reviews that aren't follow-ups
    const reviewedProductIds = new Set(
      reviews
        .filter((review) => !review.isFollowUp)
        .map((review) => review.productId)
    );

    return products.filter((product) => !reviewedProductIds.has(product.id));
  };

  const getFollowUpReviews = (reviewId: string) => {
    return reviews.filter(
      (review) => review.isFollowUp && review.parentReviewId === reviewId
    );
  };

  const productsToReview = getProductsToReview();
  const userReviews = reviews.filter((review) => !review.isFollowUp);

  // Explicitly type the displayedItems array to avoid type confusion
  const displayedItems: (Review | Product)[] =
    selectedTab === "published"
      ? userReviews.filter((review) => {
          if (!searchQuery) return true;
          const query = searchQuery.toLowerCase();
          return (
            review.title.toLowerCase().includes(query) ||
            review.content.toLowerCase().includes(query) ||
            review.product.title.toLowerCase().includes(query)
          );
        })
      : productsToReview.filter((product) => {
          if (!searchQuery) return true;
          return product.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Function to render the appropriate card based on item type
  const renderItem = (item: Review | Product) => {
    // For the published status, the items are always reviews
    if (selectedTab === "published") {
      const review = item as Review;
      const productFollowUps = getFollowUpReviews(review.id);

      return (
        <div
          key={review.id}
          className="border rounded-lg bg-white shadow-sm overflow-hidden">
          <div className="grid grid-cols-2 p-3 bg-gray-50 border-b">
            <div>
              <div className="text-gray-600 text-xs font-medium">RATING</div>
              <div className="text-sm flex items-center">
                <RatingStars rating={review.rating} />
                <span className="ml-2">{review.rating}/5</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-gray-600 text-xs font-medium">
                REVIEWED ON
              </div>
              <div className="text-sm mt-1 font-medium">{review.date}</div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex gap-4">
              <div className="w-20 h-20 flex-shrink-0">
                <img
                  src={review.product.image}
                  alt={review.product.title}
                  className="w-full h-full object-contain border"
                />
              </div>
              <div className="flex-1">
                <a
                  href="#"
                  className="text-blue-600 hover:underline text-sm font-medium">
                  {review.product.title}
                </a>
                <h3 className="font-semibold mt-3">{review.title}</h3>
                <p className="text-sm mt-1 text-gray-700">{review.content}</p>
                {review.verified && (
                  <div className="mt-2 text-xs text-green-600">
                    ✓ Verified Purchase
                  </div>
                )}
                <div className="mt-2 text-xs text-gray-500">
                  {review.helpful} people found this review helpful
                </div>
                {productFollowUps.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Follow-up Reviews
                    </h4>
                    <div className="space-y-3">
                      {productFollowUps.map((followUp) => (
                        <div
                          key={followUp.id}
                          className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <RatingStars
                                rating={followUp.rating}
                                size="small"
                              />
                              <span className="ml-2 text-xs text-gray-600">
                                {followUp.date}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">
                              Follow-up
                            </span>
                          </div>
                          <p className="text-sm font-medium text-gray-800">
                            {followUp.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {followUp.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleOpenReviewModal(review.product, review)}
                  className="border hover:bg-gray-100 text-black px-4 py-1 text-[10px] rounded-full w-32 text-center flex items-center justify-center">
                  <svg
                    className="h-3 w-3 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit Review
                </button>
                <button
                  onClick={() =>
                    handleOpenReviewModal(review.product, review, true)
                  }
                  className="border hover:bg-gray-100 text-indigo-600 px-4 py-1 text-[10px] rounded-full w-32 text-center flex items-center justify-center">
                  <svg
                    className="h-3 w-3 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  Add Follow-up
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    // For the pending status, the items are always products
    else {
      const product = item as Product;

      return (
        <>
          <div
            key="product-123"
            className="border rounded-lg bg-white shadow-sm overflow-hidden">
            <div className="grid grid-cols-2 p-3 bg-gray-50 border-b">
              <div>
                <div className="text-gray-600 text-xs font-medium">RATING</div>
                <div className="text-sm flex items-center">
                  <RatingStars rating={0} />
                  <span className="ml-2 text-[10px] text-gray-600">
                    No rating given yet
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-gray-600 text-xs font-medium">
                  REVIEWED ON
                </div>
                <div className="text-sm mt-1 font-medium">Not yet reviewed</div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex gap-4">
                <div className="w-20 h-20 flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain border"
                  />
                </div>
                <div className="flex-1">
                  <a
                    href="#"
                    className="text-blue-600 hover:underline text-sm font-medium">
                    Premium Wireless Headphones
                  </a>

                  {/* Added SKU information */}
                  <div className="mt-1 text-gray-500 text-xs flex items-center">
                    <span className="font-medium">SKU:</span>
                    <span className="ml-1">HDP-2023-BLK</span>
                  </div>

                  {/* Added category and brand */}
                  <div className="mt-1 text-gray-500 text-xs flex flex-wrap gap-x-3">
                    <span>
                      <span className="font-medium">Category:</span> Electronics
                    </span>
                    <span>
                      <span className="font-medium">Brand:</span> SoundMaster
                    </span>
                  </div>

                  {/* Added price information */}
                  <div className="mt-1 flex items-center">
                    <span className="text-sm font-medium text-gray-900">
                      $129.99
                    </span>
                    <span className="ml-2 text-xs text-gray-500 line-through">
                      $159.99
                    </span>
                    <span className="ml-2 text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                      19% off
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-green-600">
                    ✓ Verified Purchase
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleOpenReviewModal(product)}
                    className="border hover:bg-gray-100 text-indigo-600 px-4 py-1 text-xs rounded-full text-center flex items-center justify-center">
                    <Star size={14} className="mr-1" /> Write Review
                  </button>

                  {/* Added Quick View button */}
                  <button className="border hover:bg-gray-100 text-gray-600 px-4 py-1 text-xs rounded-full text-center flex items-center justify-center">
                    <Eye size={14} className="mr-1" /> Quick View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Your Reviews</h1>
        <button
          onClick={() =>
            products.length > 0 && setProductSelectionModalOpen(true)
          }
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center">
          <Star size={16} className="mr-2" /> Write a Review
        </button>
      </div>

      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 ${selectedTab === "published" ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"}`}
          onClick={() => handleTabChange("published")}>
          Published
        </button>
        <button
          className={`px-4 py-2 ${selectedTab === "pending" ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"}`}
          onClick={() => handleTabChange("pending")}>
          Pending
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="search"
            className="w-full p-3 pl-10 pr-4 border rounded-lg"
            placeholder={
              selectedTab === "published"
                ? "Search your reviews..."
                : "Search products to review..."
            }
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {loading ? (
        <Loader content="Loading..." />
      ) : displayedItems.length > 0 ? (
        <div className="grid gap-6">
          {displayedItems.map((item) => renderItem(item))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border p-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="bg-gray-100 p-4 rounded-full">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect
                  x="16"
                  y="16"
                  width="32"
                  height="32"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <path
                  d="M28 24L36 32M36 24L28 32"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-medium mb-3">
            {selectedTab === "published"
              ? "You haven't published any reviews yet"
              : "No pending reviews"}
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            {selectedTab === "published"
              ? "Your reviews will appear here once you've written them. Check out the 'Pending' status to get started."
              : "You've already reviewed all available products. Check your published reviews."}
          </p>
          {selectedTab === "published" && productsToReview.length > 0 ? (
            <button
              onClick={() => handleTabChange("pending")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md inline-flex items-center">
              <Star size={16} className="mr-2" /> Browse Products to Review
            </button>
          ) : selectedTab === "pending" ? (
            <button
              onClick={() => handleTabChange("published")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md">
              See Published Reviews
            </button>
          ) : null}
        </div>
      )}

      <ReviewModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setCurrentReview(undefined);
        }}
        onSubmit={handleSubmitReview}
        initialData={currentReview}
        product={currentProduct}
        isFollowUp={currentReview?.isFollowUp || false}
      />

      <ProductSelectionModal
        isOpen={productSelectionModalOpen}
        onClose={() => setProductSelectionModalOpen(false)}
        onSelectProduct={(product: Product) => {
          setCurrentProduct(product);
          setProductSelectionModalOpen(false);
          setModalOpen(true);
        }}
        products={productsToReview}
      />
    </div>
  );
};

export default Reviews;
