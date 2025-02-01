import Hero from "@/components/pages/home/Hero";
import Hero1 from "@/components/pages/home/Hero1";
import Hero2 from "@/components/pages/home/Hero2";
import Hero4 from "@/components/pages/home/Hero4";
import MoreProducts from "@/components/pages/home/product-cards/MoreProducts";
import Offerings from "@/components/pages/home/Offerings";
import ShopCategory from "@/components/pages/home/ShopCategory";
import TodaysDeals from "@/components/pages/home/TodaysDeals";
import TopArrivals from "@/components/pages/home/TopArrivals";
import useProductsFetch from "@/hooks/useProductsFetch";

const Home = () => {
  const { products: productsDemo } = useProductsFetch();
  return (
    <div>
      <Hero />
      <div className="sm:w-[90%] w-[95%] m-auto">
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
