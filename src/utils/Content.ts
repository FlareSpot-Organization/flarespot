import {
  Categories,
  Category,
  FashionItem,
  Product,
  ProductCard2,
} from "@/types/public";

import product1 from "@/assets/images/products/product1.jpg";
import product2 from "@/assets/images/products/product2.jpg";
import product3 from "@/assets/images/products/product3.jpg";
import product4 from "@/assets/images/products/product4.jpg";
import product5 from "@/assets/images/products/product5.jpg";
import product6 from "@/assets/images/products/product6.jpg";
import product7 from "@/assets/images/products/product7.jpg";
import product8 from "@/assets/images/products/product8.jpg";
import product9 from "@/assets/images/products/product9.jpg";
import product10 from "@/assets/images/products/product10.jpg";
import product11 from "@/assets/images/products/product11.jpg";
import product12 from "@/assets/images/products/product12.jpg";

import categorySale1 from "@/assets/images/categories/category-sale1.jpg";
import categorySale2 from "@/assets/images/categories/category-sale2.png";
import categorySale3 from "@/assets/images/categories/category-sale4.png";

import petCategory from "@/assets/images/categories/pets.jpg";
import beautyCategory from "@/assets/images/categories/beauty.png";
import tools from "@/assets/images/categories/tools.jpg";
import security from "@/assets/images/categories/security.jpg";
import lingeries from "@/assets/images/categories/lingeries.jpg";
import jewelries from "@/assets/images/categories/jewelries.jpg";

import slide1 from "@/assets/images/slide1.jpg";
import slide2 from "@/assets/images/slide2.jpg";
import slide3 from "@/assets/images/slide3.jpg";
import slide4 from "@/assets/images/slide4.jpg";

import shoe from "@/assets/images/products/shoe1.jpg";
import shoe2 from "@/assets/images/products/shoe2.jpg";
import chair1 from "@/assets/images/products/chair1.jpg";
import chair2 from "@/assets/images/products/chair2.jpg";
import bag1 from "@/assets/images/products/bag1.jpg";
import bag2 from "@/assets/images/products/bag2.jpg";
import camera1 from "@/assets/images/products/product10.jpg";
import camera2 from "@/assets/images/products/product13.jpg";
import shirt1 from "@/assets/images/categories/category-sale1.jpg";
import shirt2 from "@/assets/images/categories/category-sale4.png";
import tv1 from "@/assets/images/products/tv1.jpg";
import tv2 from "@/assets/images/products/tv2.jpg";
import sofer1 from "@/assets/images/products/sofer1.jpg";
import sofer2 from "@/assets/images/products/sofer2.jpg";
import sneaker1 from "@/assets/images/products/product5.jpg";
import sneaker2 from "@/assets/images/products/product14.jpg";
import blueShirt1 from "@/assets/images/products/blue-shirt1.jpg";
import blueShirt2 from "@/assets/images/products/blue-shirt2.jpg";
import allStars1 from "@/assets/images/products/allstars1.jpg";
import allStars2 from "@/assets/images/products/allstars2.jpg";
import hoodie1 from "@/assets/images/products/hoodie1.jpg";
import hoodie2 from "@/assets/images/products/hoodie2.jpg";
import cap1 from "@/assets/images/products/cap1.jpg";
import cap2 from "@/assets/images/products/cap2.jpg";
import phone1 from "@/assets/images/products/phone1.jpg";
import phone2 from "@/assets/images/products/phone2.jpg";
import laptop1 from "@/assets/images/products/laptop1.jpg";
import laptop2 from "@/assets/images/products/laptop2.png";

export const mainCategories: string[] = [
  "Featured",
  "Home & Kitchen",
  "Women's Clothing",
  "Women's Shoes",
  "Men's Clothing",
  "Men's Shoes",
  "Sports & Outdoors",
  "Jewelry & Accessories",
  "Beauty & Health",
  "Toys & Games",
  "Automotive",
];

export const categoryData: Categories = {
  "Sports & Outdoors": {
    "Camping & Hiking": [
      "Backpacks",
      "Tents",
      "Sleeping Bags",
      "Camping Stoves",
      "Hiking Boots",
      "Camping Furniture",
      "Camping Lanterns",
    ],
    Fitness: [
      "Dumbbells",
      "Exercise Bikes",
      "Treadmills",
      "Yoga Mats",
      "Resistance Bands",
      "Kettlebells",
      "Ellipticals",
    ],
    Cycling: [
      "Mountain Bikes",
      "Road Bikes",
      "Helmets",
      "Gloves",
      "Shoes",
      "Locks",
      "Jerseys",
    ],
    Running: [
      "Running Shoes",
      "Clothing",
      "Hydration Packs",
      "Belts",
      "Socks",
      "Fitness Trackers",
      "Headbands",
    ],
    "Water Sports": [
      "Paddleboards",
      "Kayaks",
      "Life Jackets",
      "Wetsuits",
      "Snorkeling Gear",
      "Swimming Goggles",
      "Diving Fins",
    ],
    "Team Sports": [
      "Soccer",
      "Basketball",
      "Baseball",
      "Volleyball",
      "Hockey",
      "Football",
      "Cricket",
    ],
    Fishing: [
      "Rods",
      "Reels",
      "Lures",
      "Line",
      "Tackle Boxes",
      "Nets",
      "Apparel",
    ],
    Hunting: [
      "Rifles",
      "Knives",
      "Archery",
      "Camouflage Clothing",
      "Game Cameras",
      "Boots",
      "Treestands",
    ],
    "Winter Sports": [
      "Skiing",
      "Snowboarding",
      "Ice Skating",
      "Sleds",
      "Snowshoes",
      "Winter Clothing",
      "Ski Goggles",
    ],
    Climbing: [
      "Ropes",
      "Harnesses",
      "Shoes",
      "Carabiners",
      "Helmets",
      "Chalk",
      "Backpacks",
    ],
  },
};

export const bundleDeals = [
  {
    image: product1,
    title: "10 in 1 TYPE-C / USB Tester DC Digital",
    currentPrice: 7155.7,
    originalPrice: 14714.15,
    rating: 4.9,
    soldCount: 2000,
  },
  {
    image: product2,
    title: "Screwdriver Set Magnetic Torx Phillips Screw Bit Kit",
    currentPrice: 6797.02,
    originalPrice: 10541.49,
    rating: 4.3,
    soldCount: 10000,
  },
];

export const superDeals = [
  {
    image: product3,
    title: "Smart Watch GT5 Men Women 1.77 Full Touch",
    currentPrice: 12404.09,
    originalPrice: 35443.74,
    discount: 65,
  },
  {
    image: product4,
    title: "Original Ashwagandha Tablet Pen-is Enlargement",
    currentPrice: 14326.3,
    originalPrice: 42134.8,
    discount: 66,
  },
];

export const bigSave = [
  {
    image: product5,
    title: "ECG+PPG Bluetooth Call Smart Watch Men Laser",
    currentPrice: 29723.46,
    originalPrice: 61925.31,
    savings: 32201.85,
  },
  {
    image: product6,
    title: "COLMI R06 Smart Ring Men Women, Heart Rate",
    currentPrice: 25688.79,
    originalPrice: 59739.66,
    savings: 34050.87,
  },
];

export const trending = [
  {
    image: product7,
    title: "Apple AirPods Pro (2nd Generation) with MagSafe Case",
    currentPrice: 89999.99,
    originalPrice: 120000.0,
    rating: 4.8,
    soldCount: 15000,
    discount: 25,
  },
  {
    image: product8,
    title: "Samsung 65-Inch QLED 4K Q80C Smart TV (2023 Model)",
    currentPrice: 450000.0,
    originalPrice: 599999.99,
    rating: 4.7,
    soldCount: 3500,
    discount: 25,
  },
];

export const hotDeals = [
  {
    image: product9,
    title: "PlayStation 5 DualSense Edge Wireless Controller",
    currentPrice: 45999.99,
    originalPrice: 89999.99,
    discount: 49,
    savings: 44000.0,
  },
  {
    image: product10,
    title: "Xiaomi Robot Vacuum S10+ with Self-Empty Station",
    currentPrice: 159999.99,
    originalPrice: 299999.99,
    discount: 47,
    savings: 140000.0,
  },
];

export const newArrivals = [
  {
    image: product11,
    title: "ASUS ROG Zephyrus G14 Gaming Laptop (2024) RTX 4070",
    currentPrice: 799999.99,
    originalPrice: 899999.99,
    rating: 4.9,
    soldCount: 500,
  },
  {
    image: product12,
    title: "Samsung Galaxy S24 Ultra 512GB - Titanium Gray",
    currentPrice: 699999.99,
    originalPrice: 749999.99,
    rating: 4.8,
    soldCount: 1200,
  },
];

export const fashionItems: FashionItem[] = [
  {
    id: 1,
    image: categorySale1,
    currentPrice: "NGN15,294.72",
    originalPrice: "NGN29,413.67",
    rating: 4.4,
    soldCount: 800,
  },
  {
    id: 2,
    image: categorySale2,
    currentPrice: "NGN29,596.62",
    originalPrice: "NGN56,917.33",
    rating: 4.6,
    soldCount: 220,
  },
  {
    id: 3,
    image: categorySale3,
    currentPrice: "NGN16,929.78",
    originalPrice: "NGN38,486.55",
    rating: 5.0,
    soldCount: 39,
  },
];

export const categories: Category[] = [
  { title: "Toys & Games", id: "toys-and-games", image: petCategory },
  {
    title: "Automotive Parts & Accessories",
    id: "automotive",
    image: security,
  },
  { title: "Beauty & Personal Care", id: "beauty", image: beautyCategory },
  { title: "Industrial & Scientific", id: "industrial", image: tools },
  { title: "Lingerie & Loungewear", id: "fashion-women", image: lingeries },
  { title: " Jewelry", id: "fashion", image: jewelries },
];
const productImages = {
  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
  product7,
  product8,
  product9,
  product10,
  product11,
  product12,
};

// Then modify your products generation code to use this mapping
export const productsDemo = Array.from({ length: 50 }, (_, index) => {
  const id = index + 1;
  const imageIndex = (id % 12) + 1;
  return {
    id,
    title: `Product Title ${id}`,
    price: Number((Math.random() * (50000 - 1000) + 1000).toFixed(2)),
    originalPrice: Number((Math.random() * (60000 - 50000) + 50000).toFixed(2)),
    discount: Math.floor(Math.random() * (70 - 10) + 10),
    image: productImages[`product${imageIndex}` as keyof typeof productImages], // Use the mapping here
    shipping: "Free shipping over NGN17,934.19",
    rating: Number((Math.random() * (5 - 3) + 3).toFixed(1)),
    reviews: Math.floor(Math.random() * (1000 - 50) + 50),
    badge: Math.random() > 0.7 ? "Extra 5% off with coins" : undefined,
  };
});

export const fashionImages = [
  {
    url: slide4,
    alt: "Fashion Model 1",
    title: "Summer Collection",
    subtitle: "Discover the latest trends",
  },
  {
    url: slide2,
    alt: "Fashion Model 2",
    title: "Autumn Essentials",
    subtitle: "Elevate your style",
  },
  {
    url: slide1,
    alt: "Fashion Model 3",
    title: "Winter Elegance",
    subtitle: "Timeless pieces",
  },

  {
    url: slide3,
    alt: "Fashion Model 4",
    title: "Acute Fashion",
    subtitle: "Standard wear",
  },
];

export const demoProductsHeader: any[] = [
  { name: "Product Name 1", imageUrl: "/api/placeholder/200/200" },
  { name: "Product Name 2", imageUrl: "/api/placeholder/200/200" },
  { name: "Product Name 3", imageUrl: "/api/placeholder/200/200" },
  { name: "Product Name 4", imageUrl: "/api/placeholder/200/200" },
];

export const demoCategoriesHeader = [
  "Featured",
  "Home & Kitchen",
  "Women's Clothing",
  "Women's Curve Clothing",
  "Women's Shoes",
  "Women's Lingerie & Lounge",
  "Men's Clothing",
  "Men's Shoes",
  "Men's Big & Tall",
  "Sports & Outdoors",
  "Jewelry & Accessories",
  "Beauty & Health",
  "Toys & Games",
  "Automotive",
  "Electronics",
  "Home Improvement",
  "Pet Supplies",
  "Baby & Kids",
  "Office Products",
];

export const dealsOfDay: ProductCard2[] = [
  {
    id: 1,
    title: "Standard Shoe Fleezy",
    primaryImage: shoe,
    secondaryImage: shoe2,
    tag: "Deals",
  },
  {
    id: 2,
    title: "Comfy Sofer Chair",
    primaryImage: chair1,
    secondaryImage: chair2,
    tag: "Deals",
  },
  {
    id: 3,
    title: "Double strap lady bags",
    primaryImage: bag1,
    secondaryImage: bag2,
    tag: "Deals",
  },
  {
    id: 4,
    title: "Blue Hoodie Wear",
    primaryImage: blueShirt1,
    secondaryImage: blueShirt2,
    tag: "Deals",
  },
  {
    id: 5,
    title: "Nike Cap Comft",
    primaryImage: cap1,
    secondaryImage: cap2,
    tag: "Deals",
  },
  {
    id: 6,
    title: "Hp Folio Laptop x86",
    primaryImage: laptop1,
    secondaryImage: laptop2,
    tag: "Deals",
  },
];

export const favorites: ProductCard2[] = [
  {
    id: 7,
    title: "Navy Accent Jacket",
    primaryImage: shirt1,
    secondaryImage: shirt2,
    tag: "Sale",
  },
  {
    id: 8,
    title: "White Mesh Chair",
    primaryImage: sofer1,
    secondaryImage: sofer2,
  },

  {
    id: 9,
    title: "Blue Decorative Sneaker",
    primaryImage: sneaker1,
    secondaryImage: sneaker2,
  },
  {
    id: 10,
    title: "Iphone 12pro",
    primaryImage: phone1,
    secondaryImage: phone2,
    tag: "Sale",
  },
  {
    id: 11,
    title: "White Hoodie",
    primaryImage: hoodie1,
    secondaryImage: hoodie2,
  },

  {
    id: 12,
    title: "Blue Allstars Sneaker",
    primaryImage: allStars1,
    secondaryImage: allStars2,
  },
];
