import FavouriteDeals from "@/components/pages/home/FavouriteDeals";
import Hero from "@/components/pages/home/Hero";
import Hero1 from "@/components/pages/home/Hero1";
import Hero2 from "@/components/pages/home/Hero2";
import Hero3 from "@/components/pages/home/Hero3";
import Hero4 from "@/components/pages/home/Hero4";
import LightningDeals from "@/components/pages/home/LighteningDeals";
import Offerings from "@/components/pages/home/Offerings";
import ShopCategory from "@/components/pages/home/ShopCategory";
import TodaysDeals from "@/components/pages/home/TodaysDeals";
import TopArrivals from "@/components/pages/home/TopArrivals";
import MoreProducts from "@/components/pages/home/product-cards/MoreProducts";
import { useHero } from "@/contexts/HeroContext";
import { useHeader } from "@/contexts/LandingHeaderLayouts";
import useProductsFetch from "@/hooks/useProductsFetch";

const Home = () => {
  const { products: productsDemo } = useProductsFetch();
  const { currentHero } = useHero();

  const renderHero = () => {
    switch (currentHero) {
      case "hero":
        return <Hero />;
      case "hero1":
        return <Hero1 />;
      case "hero2":
        return <Hero2 />;
      case "hero3":
        return <Hero3 />;
      default:
        return <Hero4 />;
    }
  };

  return (
    <div>
      {/* Main Content */}
      <div className="relative">
        {renderHero()}
        <div className="sm:w-[90%] w-[95%] mx-auto mt-10">
          <FavouriteDeals />
          <Offerings />
          <LightningDeals products={productsDemo} />
          <TodaysDeals />
        </div>
        <div className="bg-[#f7f7f7] dark:bg-black mt-10">
          <TopArrivals />
        </div>
        <div className="sm:w-[90%] w-[95%] m-auto">
          <ShopCategory />
          {/* <MoreProducts productsDemo={productsDemo} /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
