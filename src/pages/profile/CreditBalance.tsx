import React from "react";
import { Lock, Info, ChevronRight, X } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: string;
}

const CreditBalancePage: React.FC = () => {
  // Mock data for transactions - empty array for now
  const transactions: Transaction[] = [];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Credit Balance Section */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <h2 className="text-2xl font-semibold mr-2">Credit balance</h2>
          <Info className="w-5 h-5 text-gray-500" />
        </div>

        <div className="flex items-center mb-4">
          <Lock className="w-4 h-4 text-green-600 mr-2" />
          <span className="text-green-600 text-sm">All data is encrypted</span>
        </div>

        <div className="mb-2">
          <p className="text-gray-600">Total(USD):</p>
          <h1 className="text-4xl font-bold">$0.00</h1>
        </div>
      </div>

      <hr className="border-gray-200 my-6" />

      {/* History Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">History</h2>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left font-medium text-gray-600">
                  Date
                </th>
                <th className="py-2 text-left font-medium text-gray-600">
                  Description
                </th>
                <th className="py-2 text-right font-medium text-gray-600">
                  Amount
                </th>
                <th className="py-2 text-right font-medium text-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="py-3">{transaction.date}</td>
                    <td className="py-3">{transaction.description}</td>
                    <td className="py-3 text-right">
                      ${transaction.amount.toFixed(2)}
                    </td>
                    <td className="py-3 text-right">{transaction.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-16">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center mb-4">
                        <X className="w-8 h-8 text-gray-300" strokeWidth={1} />
                      </div>
                      <p className="text-gray-700 text-center">
                        You don't have any activities
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Can't find your credit section */}
      <div className="mt-8">
        <h3 className="font-medium mb-4">Can't find your credit?</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sign in with another account option */}
          <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center">
              <span>Try signing in with another account</span>
              <div className="flex ml-4 space-x-1">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-xs">G</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                  <span className="text-white text-xs">A</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-xs">F</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                  <span className="text-white text-xs">X</span>
                </div>
              </div>
            </div>
            <ChevronRight className="text-gray-400" />
          </div>

          {/* Self-service option */}
          <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
            <span>Self-service to find credit</span>
            <ChevronRight className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditBalancePage;
