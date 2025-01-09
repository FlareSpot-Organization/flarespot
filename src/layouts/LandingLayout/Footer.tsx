import {
  BsInstagram,
  BsPinterest,
  BsTiktok,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">About</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Our Story
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Policies
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Careers
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Service Section */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            Customer Service
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Help Center & FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Shipping Information
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Returns & Exchanges
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Order Tracking
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Section */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Refund Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Cookies Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Disclaimer
              </a>
            </li>
          </ul>
        </div>

        {/* Stay Connected Section */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            Stay connected
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <a href="#" className="hover:text-white">
              <BsInstagram size={24} />
            </a>
            <a href="#" className="hover:text-white">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="hover:text-white">
              <BsTwitter size={24} />
            </a>
            <a href="#" className="hover:text-white">
              <BsTiktok size={24} />
            </a>
            <a href="#" className="hover:text-white">
              <BsYoutube size={24} />
            </a>
            <a href="#" className="hover:text-white">
              <BsPinterest size={24} />
            </a>
          </div>
          <div className="mt-6 flex items-center space-x-2">
            <img
              src="/api/placeholder/24/24"
              alt="Language selector"
              className="rounded-full"
            />
            <span>English (US) | 元 (CNY)</span>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-700">
        <p className="text-sm text-center text-gray-400">
          © 2024 FlareSpot, All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
