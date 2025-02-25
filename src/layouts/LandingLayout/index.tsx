import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useHeader } from "@/contexts/LandingHeaderLayouts";
import TopNavbar from "./TopNavbar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useEffect } from "react";
import {
  getCurrencies,
  getLanguages,
  getRegions,
} from "@/services/features/language/languageSlice";

const LandingLayout = () => {
  const { overlay, setOverLay } = useHeader();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getLanguages());
    dispatch(getRegions());
    dispatch(getCurrencies());
  }, []);

  return (
    <div className="flex flex-col items-center">
      <TopNavbar />
      <Header />
      <div className="w-full flex justify-center">
        <div
          className="relative w-full "
          onMouseEnter={() => setOverLay(false)}>
          {/* Overlay */}
          {overlay && (
            <div
              className="w-full h-full bg-black/70 z-10"
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
      </div>
      <Footer />
    </div>
  );
};

export default LandingLayout;
