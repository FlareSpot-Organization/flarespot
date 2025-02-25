import { useLanguage } from "@/contexts/LanguageSelector";
import React from "react";
import LanguageSelector from "./LanguageSelector";

interface SocialLink {
  href: string;
  alt: string;
  icon: string;
}

const socialLinks: SocialLink[] = [
  {
    href: "https://www.instagram.com/#",
    alt: "Instagram",
    icon: "https://aimg.kwcdn.com/upload_aimg/pc/a817be22-932c-43b3-95e4-c768af711c34.png.slim.png?imageView2/2/w/120/q/70/format/webp",
  },
  {
    href: "https://www.facebook.com/#",
    alt: "Facebook",
    icon: "https://aimg.kwcdn.com/upload_aimg/pc/0d1c5252-2094-4504-b6fc-34a6a3f87804.png.slim.png?imageView2/2/w/120/q/70/format/webp",
  },
  {
    href: "https://www.twitter.com/#",
    alt: "Twitter",
    icon: "https://aimg.kwcdn.com/upload_aimg/temupch5/4eb16ee6-f4ed-426e-9ce3-574a2ab4ba6c.png?imageView2/2/w/120/q/70/format/webp",
  },
  {
    href: "https://www.tiktok.com/#",
    alt: "Tiktok",
    icon: "https://aimg.kwcdn.com/upload_aimg/web/7edd0665-db19-4e7a-aa42-5301e5ea396f.png.slim.png?imageView2/2/w/120/q/70/format/webp",
  },
  {
    href: "https://www.youtube.com/#",
    alt: "Youtube",
    icon: "https://aimg.kwcdn.com/upload_aimg/web/18e81de4-adca-4b74-bd52-1aa2d7ebe771.png.slim.png?imageView2/2/w/120/q/70/format/webp",
  },
  {
    href: "https://www.pinterest.com/#",
    alt: "Pinterest",
    icon: "https://aimg.kwcdn.com/upload_aimg/web/2ba1be46-f0c5-4f59-aa05-1ab05ef41126.png.slim.png?imageView2/2/w/120/q/70/format/webp",
  },
];

const Footer: React.FC = () => {
  const onClose = () => console.log("hello");
  const {
    isLanguageModalOpen,
    setIsLanguageModalOpen,
    selectedRegion,
    selectedLanguage,
    selectedCurrency,
    flagSrc,
  } = useLanguage({ onClose });

  return (
    <footer className="bg-[#131920] w-full text-gray-300 px-6">
      <div className="max-w-[1250px] w-full py-[30px] gap-[30px] mx-auto flex sm:flex-row flex-col sm:space-y-0 space-y-4 sm:justify-evenly justify-center sm:items-start items-center sm:text-left text-center">
        {/* About Section */}
        <div className="">
          <h3 className="text-white font-bold text-[16px] leading-[30px]">
            About
          </h3>
          <ul className="">
            <li>
              <a
                href="#"
                className="hover:text-white text-[14px] leading-[28px] text-[rgba(255,255,255,0.8)]">
                About us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white text-[14px] leading-[28px] text-[rgba(255,255,255,0.8)]">
                Our Story
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white text-[14px] leading-[28px] text-[rgba(255,255,255,0.8)]">
                Blog
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white text-[14px] leading-[28px] text-[rgba(255,255,255,0.8)]">
                Policies
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white text-[14px] leading-[28px] text-[rgba(255,255,255,0.8)]">
                Careers
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Service Section */}
        <div>
          <h3 className="text-white font-bold text-[16px] leading-[30px]">
            Customer Service
          </h3>
          <ul className="">
            <li>
              <a
                href="#"
                className="hover:text-white text-[14px] leading-[28px] text-[rgba(255,255,255,0.8)]">
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white text-[14px] leading-[28px] text-[rgba(255,255,255,0.8)]">
                Help Center & FAQ
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white text-[14px] leading-[28px] text-[rgba(255,255,255,0.8)]">
                Shipping Information
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white text-[14px] leading-[28px] text-[rgba(255,255,255,0.8)]">
                Returns & Exchanges
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white text-[14px] leading-[28px] text-[rgba(255,255,255,0.8)]">
                Order Tracking
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Section */}
        <div>
          <h3 className="text-white font-bold text-[16px] leading-[30px]">
            Legal
          </h3>
          <ul className="">
            <li>
              <a
                href="#"
                className="hover:text-white text-[14px] leading-[28px] text-[rgba(255,255,255,0.8)]">
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white text-[14px] leading-[28px] text-[rgba(255,255,255,0.8)]">
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white text-[14px] leading-[28px] text-[rgba(255,255,255,0.8)]">
                Refund Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white text-[14px] leading-[28px] text-[rgba(255,255,255,0.8)]">
                Cookies Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white text-[14px] leading-[28px] text-[rgba(255,255,255,0.8)]">
                Disclaimer
              </a>
            </li>
          </ul>
        </div>

        {/* Stay Connected Section */}
        <div className="relative h-full">
          <h3 className="text-white font-bold text-[16px] leading-[30px]">
            Stay connected
          </h3>

          <div>
            <div
              className="sm:grid flex sm:grid-cols-3 gap-[5px] mb-[15px]"
              style={{ width: "150px" }}>
              {socialLinks.map((social) => (
                <a
                  key={social.alt}
                  href={social.href}
                  rel="nofollow noreferrer"
                  className="icon_tag border hover:border-gray-800 border-transparent rounded-full p-2 sm:-ml-2 ml-0"
                  target="_blank">
                  <img
                    alt={social.alt}
                    referrerPolicy="no-referrer"
                    src={social.icon}
                  />
                </a>
              ))}
            </div>

            <div className="-ml-2 mt-5">
              <button
                onClick={() => setIsLanguageModalOpen(true)}
                className="flex  items-center space-x-2 hover:text-white custom-btn transition-colors ">
                <img
                  src={flagSrc}
                  alt="Language selector"
                  className="rounded-full h-[25px] w-[25px] flex-shrink-0"
                />
                <span className="text-[14px] leading-[28px] text-[rgba(255,255,255,0.8)] ">
                  {selectedLanguage} | {selectedCurrency}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div
        className="max-w-6xl mx-auto h-[72px] flex relative  justify-center items-center"
        style={{ borderTop: "1px solid hsla(0, 0%, 100%, .1)" }}>
        <div className="sm:-ml-2 ml-0 "></div>
        <p className="text-[12px]  leading-[28px] text-[rgba(255,255,255,0.5)] text-center text-gray-400">
          © {new Date().getFullYear()} FlareSpot, All Rights Reserved.
        </p>
      </div>

      <LanguageSelector
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
      />
    </footer>
  );
};

export default Footer;
