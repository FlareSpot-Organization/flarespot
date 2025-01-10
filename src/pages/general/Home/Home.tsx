import Hero from "@/components/pages/home/Hero";
import MoreProducts from "@/components/pages/home/MoreProducts";
import Offerings from "@/components/pages/home/Offerings";
import ShopCategory from "@/components/pages/home/ShopCategory";
import TodaysDeals from "@/components/pages/home/TodaysDeals";
import TopArrivals from "@/components/pages/home/TopArrivals";
import useProductsFetch from "@/hooks/useProductsFetch";

const Home = () => {
  const { products: productsDemo } = useProductsFetch();
  return (
    <div>
      <div className="sm:w-[90%] w-[95%] m-auto">
        <Hero />
        <Offerings />
        <TodaysDeals />
      </div>
      <div className="bg-[#f7f7f7] dark:bg-black mt-10">
        <TopArrivals />
      </div>
      <div className="sm:w-[90%] w-[95%] m-auto">
        <ShopCategory />
        {/* <FlashSales /> */}
        <MoreProducts productsDemo={productsDemo?.data?.products} />
      </div>
    </div>
  );
};

export default Home;
