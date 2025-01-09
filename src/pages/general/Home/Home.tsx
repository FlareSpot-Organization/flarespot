import FlashSales from "@/components/pages/home/FlashSales";
import Hero from "@/components/pages/home/Hero";
import MoreProducts from "@/components/pages/home/MoreProducts";
import Offerings from "@/components/pages/home/Offerings";
import ShopCategory from "@/components/pages/home/ShopCategory";
import TodaysDeals from "@/components/pages/home/TodaysDeals";
import TopArrivals from "@/components/pages/home/TopArrivals";

const Home = () => {
  return (
    <div>
      <div className="sm:w-[90%] w-[95%] m-auto">
        <Hero />
        <Offerings />
        <TodaysDeals />
      </div>
      <div className="bg-[#f7f7f7] mt-10">
        <TopArrivals />
      </div>
      <div className="sm:w-[90%] w-[95%] m-auto">
        <ShopCategory />
        {/* <FlashSales /> */}
        <MoreProducts />
      </div>
    </div>
  );
};

export default Home;
