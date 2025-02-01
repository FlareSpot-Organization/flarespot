import React from "react";
import { Search, PackageSearch } from "lucide-react";

const NotFound = ({ query }: { query: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative mb-6">
        <PackageSearch className="w-24 h-24 text-gray-300" />
        <div className="absolute -right-2 -bottom-2">
          <Search className="w-10 h-10 text-gray-400" />
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        No results found
      </h2>

      <p className="text-gray-500 text-center max-w-md mb-6">
        We couldn't find any products matching
        <span className="px-2 py-1 mx-1 bg-gray-100 rounded-md font-medium">
          "{query}"
        </span>
      </p>

      <div className="space-y-3 text-gray-600">
        <p className="text-center">Try:</p>
        <ul className="text-sm space-y-2">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            Checking for spelling errors
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            Using more general keywords
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            Reducing filters
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NotFound;
