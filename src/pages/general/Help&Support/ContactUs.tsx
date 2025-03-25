// File: pages/ContactUsPage.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone,
  Mail,
  MessageSquare,
  HelpCircle,
  Clock,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  ArrowRight,
  Globe,
  ArrowDown,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactUs(): JSX.Element {
  return (
    <div className="mx-auto bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-[#222] mx-auto text-white p-8 md:p-16 relative overflow-hidden flex items-center min-h-[50vh]">
        <div className="mx-auto max-w-[1600px] relative z-10 w-full">
          <h3 className="text-xl md:text-2xl font-medium mb-2">
            Need assistance?
          </h3>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Let's connect.
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            Our customer support team is here to help. Find the best way to
            reach us below.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-lg">
              <Phone className="h-5 w-5 mr-2" /> Call us
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white hover:text-white hover:bg-white/20 px-6 py-3 text-lg">
              <Mail className="h-5 w-5 mr-2" /> Email support
            </Button>
          </div>

          {/* Scroll down indicator */}
          <div className="mt-16 text-center">
            <div
              className="animate-bounce inline-block cursor-pointer"
              onClick={() =>
                document
                  .getElementById("contact-options")
                  ?.scrollIntoView({ behavior: "smooth" })
              }>
              <ArrowDown className="h-8 w-8" />
            </div>
            <p
              className="text-white/80 cursor-pointer"
              onClick={() => {
                document
                  .getElementById("contact-options")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}>
              Scroll down to learn more
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute right-0 bottom-0 w-1/2 h-1/2">
          <div className="relative w-full h-full">
            <div className="absolute right-10 md:right-20 bottom-10 md:bottom-20 rounded-full h-24 w-24 bg-purple-600/30"></div>
            <div className="absolute right-32 md:right-48 bottom-32 md:bottom-48 rounded-full h-12 w-12 bg-purple-500/20"></div>
            <div className="absolute right-16 md:right-32 bottom-48 md:bottom-64 rounded-full h-16 w-16 bg-purple-700/25"></div>
          </div>
        </div>
      </div>

      <div className="w-[90%] mx-auto max-w-[1600px]">
        {/* Contact Options */}
        <div className="py-16 px-4 mx-auto scroll-mt-2" id="contact-options">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
            Ways to Contact Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-8 pb-8 text-center flex flex-col items-center">
                <div className="mb-6 bg-purple-100 p-4 rounded-full">
                  <Phone className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">Phone Support</h3>
                <p className="text-gray-600 mb-6">
                  Get immediate assistance from our customer service team
                </p>
                <div className="mt-4 text-lg font-medium">1-800-123-4567</div>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" /> Mon-Fri: 8am-8pm, Sat-Sun:
                  9am-5pm ET
                </div>
              </CardContent>
            </Card>

            <Card className="border hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-8 pb-8 text-center flex flex-col items-center">
                <div className="mb-6 bg-purple-100 p-4 rounded-full">
                  <Mail className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">Email Us</h3>
                <p className="text-gray-600 mb-6">
                  Send us an email and we'll get back to you within 24 hours
                </p>
                <Button
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() =>
                    (window.location.href = "mailto:support@flarespot.com")
                  }>
                  support@flarespot.com
                </Button>
                <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                  <Clock className="h-4 w-4" /> 24/7 Support
                </div>
              </CardContent>
            </Card>

            <Card className="border hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-8 pb-8 text-center flex flex-col items-center">
                <div className="mb-6 bg-purple-100 p-4 rounded-full">
                  <MessageSquare className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">Live Chat</h3>
                <p className="text-gray-600 mb-6">
                  Chat with our support team instantly for immediate answers
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Start Live Chat
                </Button>
                <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                  <Clock className="h-4 w-4" /> Available 24/7
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Help Center & Business Inquiries */}
        <div className="py-12 px-4 mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Help Center Card */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-[#f8f5ff] p-8 flex flex-col h-full">
                <div className="mb-6">
                  <HelpCircle className="h-12 w-12 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Help Center</h3>
                <p className="text-gray-700 mb-6">
                  Find answers to frequently asked questions and detailed guides
                  on using our platform.
                </p>
                <div className="mt-auto">
                  <Link to="/help-support">
                    <Button className="bg-purple-600 hover:bg-purple-700 mt-4">
                      Visit Help Center <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* Business Inquiries Card */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-[#222] text-white p-8 flex flex-col h-full">
                <div className="mb-6">
                  <Globe className="h-12 w-12 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Business Inquiries</h3>
                <p className="text-gray-300 mb-6">
                  For partnerships, press inquiries, or business development
                  opportunities, please contact our corporate team.
                </p>
                <div className="mt-auto">
                  <Button
                    variant="outline"
                    className="border-white hover:text-white hover:bg-white/20 mt-4"
                    onClick={() =>
                      (window.location.href = "mailto:business@flarespot.com")
                    }>
                    business@flarespot.com{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Locations Section */}
        <div className="py-12 px-4 bg-white rounded-lg shadow-sm mb-16">
          <h2 className="text-2xl font-bold mb-10 text-center">
            Our Locations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-purple-100 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">New York</h3>
              <p className="text-gray-600">
                123 Commerce St.
                <br />
                New York, NY 10001
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-purple-100 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">London</h3>
              <p className="text-gray-600">
                456 Retail Road
                <br />
                London, UK EC1A 1BB
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-purple-100 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Singapore</h3>
              <p className="text-gray-600">
                789 Market Blvd.
                <br />
                Singapore 018989
              </p>
            </div>
          </div>
        </div>

        {/* Connect on Social */}
        <div className="py-12 px-4 mb-16 bg-[#f8f5ff] rounded-lg">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Connect With Us
          </h2>

          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-full shadow-md mb-3 hover:shadow-lg transition-shadow">
                <Twitter className="h-8 w-8 text-purple-600" />
              </div>
              <span className="font-medium">Twitter</span>
            </a>

            <a href="#" className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-full shadow-md mb-3 hover:shadow-lg transition-shadow">
                <Facebook className="h-8 w-8 text-purple-600" />
              </div>
              <span className="font-medium">Facebook</span>
            </a>

            <a href="#" className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-full shadow-md mb-3 hover:shadow-lg transition-shadow">
                <Instagram className="h-8 w-8 text-purple-600" />
              </div>
              <span className="font-medium">Instagram</span>
            </a>

            <a href="#" className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-full shadow-md mb-3 hover:shadow-lg transition-shadow">
                <Linkedin className="h-8 w-8 text-purple-600" />
              </div>
              <span className="font-medium">LinkedIn</span>
            </a>
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-600">
              Follow us for updates, promotions, and more
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-[#222] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Still have questions?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Our support team is ready to help you with any questions or
            concerns.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/help-support">
              <Button
                variant="outline"
                size="lg"
                className="border-white hover:text-white hover:bg-white/20 px-8 py-6 text-lg">
                Visit Help & Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
