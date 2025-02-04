import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useHeader } from "@/contexts/LandingHeaderLayouts";

const LandingLayout = () => {
  const { overlay, setOverLay } = useHeader();

  return (
    <div>
      <Header />
      <div className="relative" onMouseEnter={() => setOverLay(false)}>
        {/* Overlay */}
        {overlay && (
          <div
            className=" w-full h-full bg-black/70 z-10"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        )}

        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default LandingLayout;
