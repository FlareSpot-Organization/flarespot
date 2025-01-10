import { categories, fashionItems } from "@/utils/Content";
import shopBanner from "@/assets/images/categories/shopBg.jpg";

const ShopCategory = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
        Shop by Category
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Fashion Section */}
        <div className="md:col-span-2 relative rounded-lg overflow-hidden">
          {/* Background Image on Left */}
          <div
            className="p-5 inset-0 bg-cover bg-left bg-no-repeat"
            style={{ backgroundImage: `url(${shopBanner})` }}>
            <div className="absolute inset-0 bg-gradient-to-r from-black opacity-20"></div>
            <div className="z-10 relative mb-6 text-white">
              <h2 className="text-3xl font-bold">Viva</h2>
              <p className="text-gray-300">Your fashion choice</p>
              <button className="bg-black dark:bg-gray-800 text-white px-6 py-3 rounded mt-4 hover:bg-gray-700 dark:hover:bg-gray-700 transition-colors">
                Shop Now
              </button>
            </div>

            <div className="mt-32 sm:mt-48 z-40">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {fashionItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
                    <img
                      src={item.image}
                      alt={`Fashion item ${item.id}`}
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                    <div className="flex justify-center">
                      <button className="bg-black dark:bg-gray-700 text-[10px] text-white px-4 py-2 rounded mt-2 hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                        Visit Shop
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Categories Slider */}
        <div className="relative grid grid-cols-2 gap-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl">
              <div className="flex-1">
                <h3 className="font-semibold text-[11px] text-gray-900 dark:text-gray-100">
                  {category.title}
                </h3>
              </div>
              <img
                src={category.image}
                alt={category.title}
                className="w-24 h-24 object-cover rounded-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopCategory;
