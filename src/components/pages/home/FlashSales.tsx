import Slider from "react-slick";

import flashSales1 from "@/assets/images/promotions/flash-sales1.jpg";
import flashSales2 from "@/assets/images/promotions/flash-sales2.jpg";
import flashSales3 from "@/assets/images/promotions/flash-sales3.jpg";

const FlashSales = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full h-[60vh] overflow-hidden mb-32 p-8">
      <Slider {...settings}>
        <div className="w-full h-full">
          <img
            src={flashSales1}
            alt="Sale 1"
            className="object-contain w-full h-full rounded-md"
          />
        </div>
        <div className="w-full h-full">
          <img
            src={flashSales2}
            alt="Sale 2"
            className="object-contain w-full h-full rounded-md"
          />
        </div>
        <div className="w-full h-full">
          <img
            src={flashSales3}
            alt="Sale 2"
            className="object-contain w-full h-full rounded-md"
          />
        </div>
      </Slider>
    </div>
  );
};

export default FlashSales;
