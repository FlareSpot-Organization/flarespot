import React, { useState } from "react";
import {
  Home,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  MapPin,
  ChevronRight,
  Shield,
  AlertCircle,
} from "lucide-react";

const Address = () => {
  // Mock address data
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      street: "123 Main Street",
      city: "Austin",
      state: "TX",
      zipCode: "78701",
      country: "United States",
      isDefault: true,
      phone: "(512) 555-1234",
    },
    {
      id: 2,
      name: "Work",
      street: "456 Office Plaza, Suite 200",
      city: "Austin",
      state: "TX",
      zipCode: "78704",
      country: "United States",
      isDefault: false,
      phone: "(512) 555-5678",
    },
  ]);

  // Function to handle address deletion
  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  // Function to set default address
  const handleSetDefault = (id: number) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-neutral-800 rounded-full mr-4">
              <Home className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Manage Addresses
              </h1>
              <p className="text-gray-600 text-sm">
                Add and manage your delivery addresses
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Address Button */}
      <div
        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden mb-6 cursor-pointer"
        role="button">
        <div className="p-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="p-3 bg-neutral-800 bg-opacity-10 rounded-full mr-4">
              <Plus className="h-6 w-6 text-neutral-800" />
            </div>
            <p className="font-medium text-neutral-800">Add a new address</p>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Addresses List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            Your Addresses
          </h2>
        </div>
        <div className="divide-y divide-gray-100">
          {addresses.map((address) => (
            <div key={address.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between mb-2">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-800 mr-2">
                    {address.name}
                  </span>
                  {address.isDefault && (
                    <span className="bg-neutral-800 text-white text-xs px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Edit className="h-4 w-4 text-gray-600" />
                  </button>
                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={() => handleDeleteAddress(address.id)}>
                    <Trash2 className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="text-gray-600 mb-1">{address.street}</div>
              <div className="text-gray-600 mb-1">
                {address.city}, {address.state} {address.zipCode}
              </div>
              <div className="text-gray-600 mb-3">{address.country}</div>
              <div className="text-gray-500 text-sm mb-3">
                Phone: {address.phone}
              </div>
              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefault(address.id)}
                  className="flex items-center text-sm text-neutral-800 hover:text-neutral-900">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Set as default address
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Address Security Information */}
      <div className="bg-neutral-900 rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-white mr-3" />
            <h3 className="text-white text-lg font-semibold">
              Address Information Security
            </h3>
          </div>
          <p className="text-white text-opacity-80 mb-4">
            Your address information is securely stored and encrypted. We never
            share your personal data with third parties without your consent.
          </p>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-start mb-2">
              <AlertCircle className="h-5 w-5 text-white mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-white text-opacity-90 text-sm">
                If you need to add a shipping address for a different country,
                please note that additional shipping fees may apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
