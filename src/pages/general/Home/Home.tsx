import Hero from "@/components/pages/home/Hero";
import Hero1 from "@/components/pages/home/Hero1";
import Hero2 from "@/components/pages/home/Hero2";
import Hero3 from "@/components/pages/home/Hero3";
import Hero4 from "@/components/pages/home/Hero4";
import MoreProducts from "@/components/pages/home/MoreProducts";
import Offerings from "@/components/pages/home/Offerings";
import ShopCategory from "@/components/pages/home/ShopCategory";
import TodaysDeals from "@/components/pages/home/TodaysDeals";
import TopArrivals from "@/components/pages/home/TopArrivals";
import { useHero } from "@/contexts/HeroContext";
import { useHeader } from "@/contexts/LandingHeaderLayouts";
import useLandingHeader2 from "@/hooks/useLandingHeader2";
import useProductsFetch from "@/hooks/useProductsFetch";

const Home = () => {
  const { products: productsDemo } = useProductsFetch();
  const { currentHero } = useHero();
  const { overlay, setOverLay } = useHeader();

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
    <div className="relative" onMouseEnter={() => setOverLay(false)}>
      {/* Overlay */}
      {overlay && (
        <div
          className=" w-full h-full bg-black/70 z-10"
          style={{ position: "fixed", top: 45, left: 0, right: 0, bottom: 0 }}
        />
      )}

      {/* Main Content */}
      <div className="relative">
        {renderHero()}
        <div className="sm:w-[90%] w-[95%] mx-auto mt-10">
          <Offerings />
          <TodaysDeals />
        </div>
        <div className="bg-[#f7f7f7] dark:bg-black mt-10">
          <TopArrivals />
        </div>
        <div className="sm:w-[90%] w-[95%] m-auto">
          <ShopCategory />
          <MoreProducts productsDemo={productsDemo?.data?.products} />
        </div>
      </div>
    </div>
  );
};

export default Home;
