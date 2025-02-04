import {
  BsInstagram,
  BsPinterest,
  BsTiktok,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import chinaFlag from "@/assets/images/china-flag.png";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="w-[95%] mx-auto flex sm:flex-row flex-col sm:space-y-0 space-y-4 sm:justify-around justify-center sm:items-start items-center sm:text-left text-center ">
        {/* About Section */}
        <div>
          <h3 className="text-white font-semibold  mb-4">About</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white text-sm">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white text-sm">
                Our Story
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white text-sm">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white text-sm">
                Policies
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white text-sm">
                Careers
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Service Section */}
        <div>
          <h3 className="text-white font-semibold  mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white text-sm">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white text-sm">
                Help Center & FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white text-sm">
                Shipping Information
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white text-sm">
                Returns & Exchanges
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white text-sm">
                Order Tracking
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Section */}
        <div>
          <h3 className="text-white font-semibold  mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white text-sm">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white text-sm">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white text-sm">
                Refund Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white text-sm">
                Cookies Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white text-sm">
                Disclaimer
              </a>
            </li>
          </ul>
        </div>

        {/* Stay Connected Section */}
        <div>
          <h3 className="text-white font-semibold  mb-4">Stay connected</h3>
          <div className="grid sm:grid-cols-3 grid-cols-6 gap-y-6 sm:gap-x-0 gap-x-6">
            <a href="#" className="hover:text-white text-sm">
              <BsInstagram size={24} />
            </a>
            <a href="#" className="hover:text-white text-sm">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="hover:text-white text-sm">
              <BsTwitter size={24} />
            </a>
            <a href="#" className="hover:text-white text-sm">
              <BsTiktok size={24} />
            </a>
            <a href="#" className="hover:text-white text-sm">
              <BsYoutube size={24} />
            </a>
            <a href="#" className="hover:text-white text-sm">
              <BsPinterest size={24} />
            </a>
          </div>
          <div className="mt-6 flex items-center justify-center space-x-2">
            <img
              src={chinaFlag}
              alt="Language selector"
              className="rounded-full h-4 w-4"
            />
            <span className="text-sm">English (US) | 元 (CNY)</span>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-700">
        <p className="text-sm text-center text-gray-400">
          © {new Date().getFullYear()} FlareSpot, All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
