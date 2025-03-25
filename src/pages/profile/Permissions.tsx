import React from "react";
import {
  Lock,
  User,
  Bluetooth,
  Mic,
  MapPin,
  Image,
  Camera,
  MoreHorizontal,
} from "lucide-react";

const Permissions = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen rounded-md">
      {/* Header Section */}
      <div className="flex items-center mb-4">
        <Lock className="text-green-600 w-8 h-8 mr-2" />
        <div>
          <h1 className="text-lg font-bold text-green-600">
            Flarespot DOES NOT obtain your permissions on the browser
          </h1>
          <p className="text-sm text-gray-700">
            To learn about the permissions of Flarespot App,{" "}
            <span className="text-orange-500 font-medium cursor-pointer">
              click here &gt;
            </span>
          </p>
        </div>
      </div>

      {/* Permissions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Contacts */}
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              <span className="font-medium">Contacts</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-500 font-bold">&times;</span>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Flarespot does not request to access your contacts on the browser.
            Flarespot will only use the contacts permissions you grant to the
            Chrome browser if needed.
          </p>
        </div>

        {/* Bluetooth */}
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <Bluetooth className="w-5 h-5 mr-2" />
              <span className="font-medium">Bluetooth</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-500 font-bold">&times;</span>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Flarespot does not request access to your Bluetooth on the browser.
          </p>
        </div>

        {/* Microphone */}
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <Mic className="w-5 h-5 mr-2" />
              <span className="font-medium">Microphone</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-500 font-bold">&times;</span>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Flarespot does not request to access your microphone on the browser.
            Even though the browser may request access to your microphone
            permissions in situations like leaving a review with video, etc.
            Flarespot will only use the microphone permissions you grant to the
            Chrome browser to take videos.
          </p>
        </div>

        {/* Location */}
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="font-medium">Location</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-500 font-bold">&times;</span>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            In most countries/regions, such as the US, the UK, etc., Flarespot
            does not request access to your location on the browser. For users
            in the Middle East only, the browser might request access to your
            location permissions. Flarespot will only use the location
            permissions you grant to the Chrome browser to make it easier for
            users to accurately fill in their shipping address.
          </p>
        </div>

        {/* Photos */}
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <Image className="w-5 h-5 mr-2" />
              <span className="font-medium">Photos</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-500 font-bold">&times;</span>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Flarespot does not request access to your photos on the browser.
            Even though the browser may request access to your photos
            permissions in situations like leaving a review, searching items,
            etc. Flarespot will only use the photo permissions you grant to the
            Chrome browser to upload images.
          </p>
        </div>

        {/* Camera */}
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <Camera className="w-5 h-5 mr-2" />
              <span className="font-medium">Camera</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-500 font-bold">&times;</span>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Flarespot does not request permission to access your camera on the
            browser. Even when we use the camera to leave a review, search
            items, etc., Flarespot will only use the camera permissions you
            grant to the Chrome browser to take photos.
          </p>
        </div>

        {/* Others */}
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <MoreHorizontal className="w-5 h-5 mr-2" />
              <span className="font-medium">Others</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-500 font-bold">&times;</span>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            In addition to the above device features, Flarespot will not request
            access to any other device features, such as your calendar,
            reminders, etc.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-sm text-gray-700">
        <p>
          Flarespot believes in being transparent and requesting a minimal
          amount of permissions. You can also learn more about how we operate to
          protect our user's privacy in the{" "}
          <span className="font-medium cursor-pointer">Privacy policy</span>,
          which includes details about how we handle information that does not
          involve requesting permission or personal privacy.
        </p>
      </div>
    </div>
  );
};

export default Permissions;
