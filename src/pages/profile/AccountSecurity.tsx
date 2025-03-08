import React, { useState } from "react";
import {
  Shield,
  Smartphone,
  Mail,
  Lock,
  CheckCircle,
  ChevronRight,
  AlertCircle,
  LogIn,
  User,
  Facebook,
  Apple,
} from "lucide-react";
import { Google } from "@mui/icons-material";

const AccountSecurity = () => {
  // Mock user data
  const [user, setUser] = useState({
    email: "sirelite11@gmail.com",
    mobilePhone: null,
    twoFactorEnabled: false,
    linkedAccounts: {
      google: true,
      facebook: false,
      apple: false,
    },
  });

  // Function to handle two-factor authentication toggle
  const handleToggleTwoFactor = () => {
    setUser({
      ...user,
      twoFactorEnabled: !user.twoFactorEnabled,
    });
  };

  // Function to link an account
  const handleLinkAccount = (provider: string) => {
    setUser({
      ...user,
      linkedAccounts: {
        ...user.linkedAccounts,
        [provider]: true,
      },
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-neutral-800 rounded-full mr-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Account Security
              </h1>
              <p className="text-gray-600 text-sm">
                Manage your account security settings
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Protected Banner */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex items-start">
            <div className="p-2 bg-green-100 rounded-full mr-4 flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-1">
                Your account is protected
              </h2>
              <p className="text-gray-600">
                Your Temu account is protected by advanced security. Keeping
                this information up-to-date safeguards your account even more.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            Security Settings
          </h2>
        </div>
        <div className="divide-y divide-gray-100">
          {/* Mobile Phone Section */}
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-full mr-4">
                <Smartphone className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-800 font-medium">Mobile phone number</p>
                {user.mobilePhone ? (
                  <p className="text-gray-600 text-sm">{user.mobilePhone}</p>
                ) : (
                  <p className="text-gray-500 text-sm">Not added</p>
                )}
              </div>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm">
              Add
            </button>
          </div>

          {/* Email Section */}
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-full mr-4">
                <Mail className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-800 font-medium">Email</p>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm">
              Edit
            </button>
          </div>

          {/* Password Section */}
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-full mr-4">
                <Lock className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-800 font-medium">Password</p>
                <p className="text-gray-500 text-sm">••••••••</p>
              </div>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm">
              Add
            </button>
          </div>

          {/* Two-Factor Authentication */}
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-full mr-4">
                <Shield className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-800 font-medium">
                  Two-factor authentication:{" "}
                  {user.twoFactorEnabled ? "On" : "Off"}
                </p>
                <p className="text-gray-600 text-sm">
                  Protect your account by adding an extra layer of security.
                </p>
              </div>
            </div>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm"
              onClick={handleToggleTwoFactor}>
              {user.twoFactorEnabled ? "Turn off" : "Turn on"}
            </button>
          </div>
        </div>
      </div>

      {/* Third-Party Accounts */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            Third-party accounts
          </h2>
        </div>
        <div className="divide-y divide-gray-100">
          {/* Google */}
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 rounded-full mr-4">
                <Google className="h-5 w-5 text-gray-600" />
              </div>
              <p className="text-gray-800 font-medium">Google</p>
            </div>
            <div>
              {user.linkedAccounts.google ? (
                <span className="text-orange-500 font-medium">Linked</span>
              ) : (
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm"
                  onClick={() => handleLinkAccount("google")}>
                  Link
                </button>
              )}
            </div>
          </div>

          {/* Facebook */}
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 rounded-full mr-4">
                <Facebook className="h-5 w-5 text-gray-600" />
              </div>
              <p className="text-gray-800 font-medium">Facebook</p>
            </div>
            <div>
              {user.linkedAccounts.facebook ? (
                <span className="text-orange-500 font-medium">Linked</span>
              ) : (
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm"
                  onClick={() => handleLinkAccount("facebook")}>
                  Link
                </button>
              )}
            </div>
          </div>

          {/* Apple */}
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 rounded-full mr-4">
                <Apple className="h-5 w-5 text-gray-600" />
              </div>
              <p className="text-gray-800 font-medium">Apple</p>
            </div>
            <div>
              {user.linkedAccounts.apple ? (
                <span className="text-orange-500 font-medium">Linked</span>
              ) : (
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm"
                  onClick={() => handleLinkAccount("apple")}>
                  Link
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sign-in Activity */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            Sign in activity
          </h2>
        </div>
        <div className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-full mr-4">
              <LogIn className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <button className="text-neutral-800 font-medium hover:text-neutral-900 inline-flex items-center">
                Review sign in activity for this account
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Security Tips */}
      <div className="bg-neutral-900 rounded-xl shadow-md overflow-hidden mt-6">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-white mr-3" />
            <h3 className="text-white text-lg font-semibold">Security Tips</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-white mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-white text-opacity-90 text-sm">
                Use a strong, unique password that you don't use for other
                accounts.
              </p>
            </div>
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-white mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-white text-opacity-90 text-sm">
                Enable two-factor authentication for an additional layer of
                security.
              </p>
            </div>
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-white mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-white text-opacity-90 text-sm">
                Regularly check your sign-in activity for any suspicious
                behavior.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSecurity;
