import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Star } from "lucide-react";
import Loader from "@/components/common/Loader";

// Import types and components
import { Product, Review, ReviewStatus } from "@/types/public/index";
import RatingStars from "@/components/pages/reviews/RatingStars";
import ReviewModal from "@/components/pages/reviews/ReviewModal";
import ProductSelectionModal from "@/components/pages/reviews/ProductSelectionModal";
import DeleteConfirmationModal from "@/components/pages/reviews/DeleteConfirmationModal";

// Main Reviews Component
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
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [reviewToDelete, setReviewToDelete] = useState<string>("");

  // Get the selected tab from search params or default to "published"
  const selectedTab =
    (searchParams.get("status") as ReviewStatus) || "published";

  useEffect(() => {
    // Try to load reviews from localStorage first
    const savedReviews = localStorage.getItem("userReviews");

    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
      setLoading(false);
    }

    // Fetch dummy products for reviews
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const fetchedProducts = await response.json();
        setProducts(fetchedProducts);

        // If we didn't have saved reviews, generate some dummy ones
        if (!savedReviews) {
          const dummyReviews = generateDummyReviews(fetchedProducts);
          setReviews(dummyReviews);
          // Save to localStorage
          localStorage.setItem("userReviews", JSON.stringify(dummyReviews));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        // Generate some reviews anyway with empty products array
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

  // Generate dummy reviews with different statuses
  const generateDummyReviews = (products: Product[]): Review[] => {
    if (!products.length) return [];

    const dummyReviews: Review[] = [];
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

    // Create 15 dummy reviews (10 published, 5 pending)
    for (let i = 0; i < 15; i++) {
      const randomProductIndex = Math.floor(Math.random() * products.length);
      const product = products[randomProductIndex];

      const titleIndex = Math.floor(Math.random() * reviewTitles.length);
      const contentIndex = Math.floor(Math.random() * reviewContents.length);

      // Create review date (within last 3 months)
      const now = new Date();
      const reviewDate = new Date(
        now.getFullYear(),
        now.getMonth() - Math.floor(Math.random() * 3),
        Math.floor(Math.random() * 28) + 1
      );

      dummyReviews.push({
        id: `review-${i + 1}`,
        productId: product.id,
        product: product,
        rating: Math.floor(Math.random() * 3) + 3, // 3-5 stars
        title: reviewTitles[titleIndex],
        content: reviewContents[contentIndex],
        date: reviewDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        status: i < 10 ? "published" : "pending",
        helpful: Math.floor(Math.random() * 50),
        verified: Math.random() > 0.3, // 70% are verified purchases
      });
    }

    return dummyReviews;
  };

  // Handle tab change
  const handleTabChange = (status: ReviewStatus) => {
    searchParams.set("status", status);
    setSearchParams(searchParams);
  };

  // Handle opening the review modal
  const handleOpenReviewModal = (product: Product, review?: Review) => {
    setCurrentProduct(product);
    setCurrentReview(review);
    setModalOpen(true);
  };

  // Handle submitting a new or updated review
  const handleSubmitReview = (reviewData: Partial<Review>) => {
    if (currentReview?.id) {
      // Update existing review
      const updatedReviews = reviews.map((review) =>
        review.id === currentReview.id
          ? { ...review, ...reviewData, status: "pending" }
          : review
      );
      setReviews(updatedReviews as unknown as Review[]);
      localStorage.setItem("userReviews", JSON.stringify(updatedReviews));
    } else if (currentProduct) {
      // Create new review
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
        status: "pending",
        helpful: 0,
        verified: true,
      };

      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);
      localStorage.setItem("userReviews", JSON.stringify(updatedReviews));
    }
  };

  // Delete a review
  const handleDeleteReview = (reviewId: string) => {
    const updatedReviews = reviews.filter((review) => review.id !== reviewId);
    setReviews(updatedReviews);
    localStorage.setItem("userReviews", JSON.stringify(updatedReviews));
  };

  // Find products that haven't been reviewed yet
  const getProductsToReview = () => {
    const reviewedProductIds = reviews.map((review) => review.productId);
    return products
      .filter((product) => !reviewedProductIds.includes(product.id))
      .slice(0, 4);
  };

  // Get random products to review if needed
  const productsToReview = getProductsToReview();

  // Filter reviews based on selected tab
  const filteredReviews = reviews.filter(
    (review) => review.status === selectedTab
  );

  // Filter reviews based on search query
  const searchedReviews = filteredReviews.filter((review) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    // Search by review title, content or product title
    return (
      review.title.toLowerCase().includes(query) ||
      review.content.toLowerCase().includes(query) ||
      review.product.title.toLowerCase().includes(query)
    );
  });

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen rounded-md">
      {/* Page Header with Title and Write Review Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Your Reviews</h1>
        <button
          onClick={() => {
            // If we have products to review, show product selection dialog
            if (products.length > 0) {
              setProductSelectionModalOpen(true);
            }
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center">
          <Star size={16} className="mr-2" /> Write a Review
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        {(["published", "pending"] as ReviewStatus[]).map((status) => (
          <button
            key={status}
            className={`px-4 py-2 capitalize ${
              selectedTab === status
                ? "border-b-2 border-blue-500 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => handleTabChange(status)}>
            {status} reviews
          </button>
        ))}
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="search"
            className="w-full p-3 pl-10 pr-4 border rounded-lg"
            placeholder="Search reviews or products..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Products You Can Review Section (shown when appropriate) */}
      {productsToReview.length > 0 && (
        <div className="mb-8 bg-white p-4 rounded-lg border shadow-sm">
          <h2 className="text-lg font-medium mb-3">Products You Can Review</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {productsToReview.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-3 flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-2">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h5 className="font-medium text-xs line-clamp-2 mb-2">
                  {product.title}
                </h5>
                <button
                  onClick={() => handleOpenReviewModal(product)}
                  className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-full hover:bg-indigo-700 w-full">
                  Write a Review
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews list */}
      {loading ? (
        <Loader content="Fetching Reviews" />
      ) : searchedReviews.length > 0 ? (
        <div className="grid gap-6">
          {searchedReviews.map((review) => (
            <div
              key={review.id}
              className="border rounded-lg bg-white shadow-sm overflow-hidden">
              {/* Review header section */}
              <div className="grid grid-cols-2 p-3 bg-gray-50 border-b">
                <div>
                  <div className="text-gray-600 text-xs font-medium">
                    RATING
                  </div>
                  <div className="text-sm flex items-center">
                    <RatingStars rating={review.rating} />
                    <span className="ml-2">{review.rating}/5</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gray-600 text-xs font-medium">
                    REVIEW STATUS
                  </div>
                  <div
                    className={`inline-block px-2 py-1 text-xs rounded-full mt-1 font-medium ${
                      review.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                    {review.status === "published"
                      ? "Published"
                      : "Pending Approval"}
                  </div>
                </div>
              </div>

              {/* Review details section */}
              <div className="p-4">
                <div className="flex gap-4">
                  {/* Product image */}
                  <div className="w-20 h-20 flex-shrink-0">
                    <img
                      src={review.product.image}
                      alt={review.product.title}
                      className="w-full h-full object-contain border"
                    />
                  </div>

                  {/* Product and review content */}
                  <div className="flex-1">
                    <a
                      href="#"
                      className="text-blue-600 hover:underline text-sm font-medium">
                      {review.product.title}
                    </a>

                    <h3 className="font-semibold mt-3">{review.title}</h3>
                    <p className="text-sm mt-1 text-gray-700">
                      {review.content}
                    </p>

                    {review.verified && (
                      <div className="mt-2 text-xs text-green-600">
                        ✓ Verified Purchase
                      </div>
                    )}

                    {review.status === "published" && (
                      <div className="mt-2 text-xs text-gray-500">
                        {review.helpful} people found this review helpful
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() =>
                        handleOpenReviewModal(review.product, review)
                      }
                      className="border hover:bg-gray-100 text-black px-4 py-1 text-xs rounded-full w-32 text-center flex items-center justify-center">
                      <svg
                        className="h-3 w-3 mr-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                      Edit Review
                    </button>
                    <button
                      onClick={() => {
                        setReviewToDelete(review.id);
                        setDeleteModalOpen(true);
                      }}
                      className="border hover:bg-gray-100 text-red-600 px-4 py-1 text-xs rounded-full w-32 text-center">
                      Delete Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
            No {selectedTab} reviews found
          </h3>

          {selectedTab === "pending" && (
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              When you submit a new review, it will appear here while waiting
              for approval. Once approved, it will move to the "Published" tab.
            </p>
          )}

          {selectedTab === "published" && (
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              This is where your approved reviews will appear after they've been
              reviewed by our team.
            </p>
          )}

          {productsToReview.length > 0 && (
            <button
              onClick={() => handleOpenReviewModal(productsToReview[0])}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md inline-flex items-center">
              <Star size={16} className="mr-2" /> Write Your First Review
            </button>
          )}

          {/* Product suggestions grid */}
          {productsToReview.length > 0 && (
            <div className="mt-10 border-t pt-8">
              <h4 className="text-lg font-medium mb-6">
                Select a Product to Review
              </h4>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {productsToReview.map((product) => (
                  <div
                    key={product.id}
                    className="border rounded-lg p-4 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => handleOpenReviewModal(product)}>
                    <div className="h-32 flex items-center justify-center mb-3">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <h5 className="font-medium text-sm mb-3 line-clamp-2">
                      {product.title}
                    </h5>
                    <button className="w-full text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-md transition-colors">
                      Select & Review
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Review Modal */}
      <ReviewModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setCurrentReview(undefined);
        }}
        onSubmit={handleSubmitReview}
        initialData={currentReview}
        product={currentProduct}
      />

      {/* Product Selection Modal */}
      <ProductSelectionModal
        isOpen={productSelectionModalOpen}
        onClose={() => setProductSelectionModalOpen(false)}
        onSelectProduct={(product: any) => {
          setCurrentProduct(product);
          setProductSelectionModalOpen(false);
          setModalOpen(true);
        }}
        products={products}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => handleDeleteReview(reviewToDelete)}
        reviewTitle={reviews.find((r) => r.id === reviewToDelete)?.title || ""}
      />
    </div>
  );
};

export default Reviews;
