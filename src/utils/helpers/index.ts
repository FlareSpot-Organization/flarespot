import { Sku } from "@/types/product_types";

export type ColorClass = string;
export type IconKey = string;
export type IconValue = string;

export interface IconMapping {
  [key: IconKey]: IconValue;
}

export const colorClasses: ColorClass[] = [
  "bg-blue-50 hover:bg-blue-100",
  "bg-green-50 hover:bg-green-100",
  "bg-yellow-50 hover:bg-yellow-100",
  "bg-pink-50 hover:bg-pink-100",
  "bg-purple-50 hover:bg-purple-100",
  "bg-red-50 hover:bg-red-100",
  "bg-slate-50 hover:bg-slate-100",
  "bg-zinc-50 hover:bg-zinc-100",
  "bg-amber-50 hover:bg-amber-100",
  "bg-indigo-50 hover:bg-indigo-100",
  "bg-emerald-50 hover:bg-emerald-100",
  "bg-cyan-50 hover:bg-cyan-100",
  "bg-fuchsia-50 hover:bg-fuchsia-100",
  "bg-rose-50 hover:bg-rose-100",
  "bg-teal-50 hover:bg-teal-100",
  "bg-violet-50 hover:bg-violet-100",
] as const;

export const iconMapping: IconMapping = {
  "All Departments": "🏪",
  "Alexa Skills": "🗣️",
  "Amazon Devices": "📱",
  "Amazon Explore": "🌎",
  "Amazon Fresh": "🥬",
  "Amazon Pharmacy": "💊",
  "Amazon Warehouse": "🏭",
  Appliances: "🏠",
  "Apps & Games": "🎮",
  "Arts, Crafts & Sewing": "🎨",
  "Audible Books & Originals": "🎧",
  "Automotive Parts & Accessories": "🚗",
  "AWS Courses": "☁️",
  Baby: "👶",
  "Beauty & Personal Care": "💄",
  Books: "📚",
  "CDs & Vinyl": "💿",
  "Cell Phones & Accessories": "📱",
  "Clothing, Shoes & Jewelry": "👔",
  "Collectibles & Fine Art": "🎨",
  Computers: "💻",
  "Credit and Payment Cards": "💳",
  "Digital Educational Resources": "📚",
  "Digital Music": "🎵",
  Electronics: "🔌",
  "Garden & Outdoor": "🌱",
  "Gift Cards": "🎁",
  "Grocery & Gourmet Food": "🛒",
  Handmade: "🎨",
  "Health, Household & Baby Care": "🏥",
  "Home & Business Services": "🏢",
  "Home & Kitchen": "🏠",
  "Industrial & Scientific": "⚙️",
  "Just for Prime": "⭐",
  "Kindle Store": "📱",
  "Luggage & Travel Gear": "🧳",
  "Luxury Stores": "💎",
  "Magazine Subscriptions": "📰",
  "Movies & TV": "🎬",
  "Musical Instruments": "🎸",
  "Office Products": "📎",
  "Pet Supplies": "🐾",
  "Premium Beauty": "✨",
  "Prime Video": "🎥",
  "Smart Home": "🏡",
  Software: "💿",
  "Sports & Outdoors": "⚽",
  "Subscribe & Save": "💰",
  "Subscription Boxes": "📦",
  "Tools & Home Improvement": "🔧",
  "Toys & Games": "🧸",
  "Under $10": "💵",
  "Video Games": "🎮",
  "Whole Foods Market": "🥑",
  Women: "👚",
  Men: "👔",
  Girls: "👗",
  Boys: "👕",
  Fashion: "👔",
} as const;

export const DEFAULT_ICON = "📦";

export const getIcon = (categoryName: string): string => {
  // First try exact match
  if (categoryName in iconMapping) {
    return iconMapping[categoryName as keyof IconMapping];
  }

  // Check for partial matches in the category name
  const matchingKey = Object.keys(iconMapping).find((key) =>
    categoryName.toLowerCase().includes(key.toLowerCase())
  );

  return matchingKey ? iconMapping[matchingKey] : DEFAULT_ICON;
};

export const getColor = (index: number): ColorClass => {
  return colorClasses[index % colorClasses.length];
};

// New function to get Browse Node IDs
// Previous code remains the same until getBrowseNodeId function

export const getBrowseNodeId = (categoryId: string): string => {
  const browseNodeMapping: { [key: string]: string } = {
    aps: "0", // All Departments
    "alexa-skills": "13727921011",
    "amazon-devices": "2102313011",
    "live-explorations": "20338495011",
    amazonfresh: "16310101",
    "amazon-pharmacy": "18115337011",
    "warehouse-deals": "10158976011",
    appliances: "2619526011",
    "mobile-apps": "2350149011",
    "arts-crafts": "2617941011",
    audible: "18145289011",
    automotive: "15684181",
    courses: "17143709011",
    "baby-products": "165796011",
    beauty: "3760911",
    stripbooks: "283155",
    popular: "5174", // CDs & Vinyl
    mobile: "2335752011",
    fashion: "7141123011",
    "fashion-womens": "7147440011",
    "fashion-mens": "7147441011",
    "fashion-girls": "7147442011",
    "fashion-boys": "7147443011",
    "fashion-baby": "7147444011",
    collectibles: "4991425011",
    computers: "541966",
    financial: "3561432011",
    "edu-alt-content": "17143709011",
    "digital-music": "624868011",
    electronics: "172282",
    lawngarden: "2972638011",
    "gift-cards": "2238192011",
    grocery: "16310101",
    handmade: "11260432011",
    hpc: "3760901",
    "local-services": "8098158011",
    garden: "1055398", // Home & Kitchen
    industrial: "16310091",
    "prime-exclusive": "14909136011",
    "digital-text": "133140011", // Kindle Store
    "fashion-luggage": "9479199011",
    luxury: "7141123011",
    magazines: "599858",
    "movies-tv": "2625373011",
    mi: "11091801",
    "office-products": "1064954",
    pets: "2619533011",
    "luxury-beauty": "7175545011",
    "instant-video": "2858778011",
    "smart-home": "6563140011",
    software: "229534",
    sporting: "3375251",
    "specialty-aps-sns": "17726796011",
    "subscribe-with-amazon": "14498690011",
    tools: "228013",
    "toys-and-games": "165793011",
    "under-ten-dollars": "9059510011",
    videogames: "468642",
    wholefoods: "18961850011",
  };

  return browseNodeMapping[categoryId] || "";
};

export const findSkuByValues = (
  array: Sku[],
  value1: string,
  value2: string
): Sku | undefined => {
  return array.find((item) => {
    const pairs = item.skuAttr.split(";");
    let hasFirstValue = false;
    let hasSecondValue = false;

    pairs.forEach((pair) => {
      const [_, valueWithColor] = pair.split(":");
      const value = valueWithColor.split("#")[0];

      if (value == value1) hasFirstValue = true;
      if (value == value2) hasSecondValue = true;
    });

    return hasFirstValue || hasSecondValue;
  });
};

export const cleanImageUrl = (url: string) => {
  return url.replace(/^\/\//, "https://");
};
