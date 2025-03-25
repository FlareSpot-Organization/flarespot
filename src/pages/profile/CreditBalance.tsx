import React, { useState } from "react";
import {
  Lock,
  Info,
  ChevronRight,
  X,
  Trash2,
  Check,
  AlertTriangle,
} from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: string;
}

const CreditBalance: React.FC = () => {
  // Mock data for transactions with sample data
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "txn-001",
      date: "2025-02-15",
      description: "Refund for Order #45892",
      amount: 129.99,
      status: "Completed",
    },
    {
      id: "txn-002",
      date: "2025-02-10",
      description: "Credit for canceled subscription",
      amount: 19.99,
      status: "Completed",
    },
    {
      id: "txn-003",
      date: "2025-01-28",
      description: "Product return credit",
      amount: 59.5,
      status: "Completed",
    },
    {
      id: "txn-004",
      date: "2025-01-15",
      description: "Promotional credit",
      amount: 25.0,
      status: "Completed",
    },
    {
      id: "txn-005",
      date: "2025-01-05",
      description: "Customer satisfaction adjustment",
      amount: 15.75,
      status: "Completed",
    },
  ]);

  // State for tracking selected transactions
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>(
    []
  );
  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [deleteType, setDeleteType] = useState<"single" | "multiple" | "all">(
    "single"
  );
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(
    null
  );

  // Calculate total credit balance
  const totalCreditBalance = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle toggle selection of a transaction
  const toggleTransactionSelection = (id: string) => {
    if (selectedTransactions.includes(id)) {
      setSelectedTransactions(
        selectedTransactions.filter((txnId) => txnId !== id)
      );
    } else {
      setSelectedTransactions([...selectedTransactions, id]);
    }
  };

  // Handle select all transactions
  const selectAllTransactions = () => {
    if (selectedTransactions.length === transactions.length) {
      setSelectedTransactions([]);
    } else {
      setSelectedTransactions(transactions.map((txn) => txn.id));
    }
  };

  // Show delete confirmation for single transaction
  const confirmDeleteTransaction = (id: string) => {
    setTransactionToDelete(id);
    setDeleteType("single");
    setShowDeleteConfirm(true);
  };

  // Show delete confirmation for selected transactions
  const confirmDeleteSelected = () => {
    if (selectedTransactions.length > 0) {
      setDeleteType("multiple");
      setShowDeleteConfirm(true);
    }
  };

  // Show delete confirmation for all transactions
  const confirmClearAll = () => {
    if (transactions.length > 0) {
      setDeleteType("all");
      setShowDeleteConfirm(true);
    }
  };

  // Execute deletion based on the delete type
  const executeDelete = () => {
    if (deleteType === "single" && transactionToDelete) {
      setTransactions(
        transactions.filter((txn) => txn.id !== transactionToDelete)
      );
      setTransactionToDelete(null);
    } else if (deleteType === "multiple") {
      setTransactions(
        transactions.filter((txn) => !selectedTransactions.includes(txn.id))
      );
      setSelectedTransactions([]);
      setIsSelectMode(false);
    } else if (deleteType === "all") {
      setTransactions([]);
      setSelectedTransactions([]);
      setIsSelectMode(false);
    }

    setShowDeleteConfirm(false);
  };

  // Cancel deletion
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setTransactionToDelete(null);
  };

  // Toggle select mode
  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    if (isSelectMode) {
      // Clear selections when exiting select mode
      setSelectedTransactions([]);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen rounded-md">
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
          <h1 className="text-4xl font-bold">
            ${totalCreditBalance.toFixed(2)}
          </h1>
        </div>
      </div>

      <hr className="border-gray-200 my-6" />

      {/* History Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">History</h2>

          {/* {transactions.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={toggleSelectMode}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                {isSelectMode ? "Cancel" : "Select"}
              </button>

              {isSelectMode && (
                <button
                  onClick={confirmDeleteSelected}
                  disabled={selectedTransactions.length === 0}
                  className={`px-3 py-1 text-sm border rounded ${
                    selectedTransactions.length > 0
                      ? "border-red-500 text-red-500 hover:bg-red-50"
                      : "border-gray-300 text-gray-400 cursor-not-allowed"
                  }`}>
                  Delete Selected ({selectedTransactions.length})
                </button>
              )}

              <button
                onClick={confirmClearAll}
                className="px-3 py-1 text-sm border border-red-500 text-red-500 rounded hover:bg-red-50">
                Clear All
              </button>
            </div>
          )} */}
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                {isSelectMode && (
                  <th className="p-4">
                    <div
                      onClick={selectAllTransactions}
                      className={`w-5 h-5 border rounded cursor-pointer flex items-center justify-center ${
                        selectedTransactions.length === transactions.length &&
                        transactions.length > 0
                          ? "bg-blue-500 border-blue-500"
                          : "border-gray-300"
                      }`}>
                      {selectedTransactions.length === transactions.length &&
                        transactions.length > 0 && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                    </div>
                  </th>
                )}
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Date
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Description
                </th>
                <th className="py-3 px-4 text-right font-medium text-gray-600">
                  Amount
                </th>
                <th className="py-3 px-4 text-right font-medium text-gray-600">
                  Status
                </th>
                {/* {!isSelectMode && (
                  <th className="py-3 px-4 text-right font-medium text-gray-600">
                    Action
                  </th>
                )} */}
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b hover:bg-gray-50">
                    {isSelectMode && (
                      <td className="p-4">
                        <div
                          onClick={() =>
                            toggleTransactionSelection(transaction.id)
                          }
                          className={`w-5 h-5 border rounded cursor-pointer flex items-center justify-center ${
                            selectedTransactions.includes(transaction.id)
                              ? "bg-blue-500 border-blue-500"
                              : "border-gray-300"
                          }`}>
                          {selectedTransactions.includes(transaction.id) && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </td>
                    )}
                    <td className="py-3 px-4">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="py-3 px-4">{transaction.description}</td>
                    <td className="py-3 px-4 text-right font-medium">
                      ${transaction.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {transaction.status}
                      </span>
                    </td>
                    {/* {!isSelectMode && (
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() =>
                            confirmDeleteTransaction(transaction.id)
                          }
                          className="text-gray-500 hover:text-red-500">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    )} */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={isSelectMode ? 5 : 5} className="py-16">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 border border-gray-300 rounded-full flex items-center justify-center mb-4">
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
              <h3 className="text-lg font-medium">Confirm Deletion</h3>
            </div>

            <p className="mb-6 text-gray-600">
              {deleteType === "single" &&
                "Are you sure you want to delete this transaction?"}
              {deleteType === "multiple" &&
                `Are you sure you want to delete ${selectedTransactions.length} selected transaction(s)?`}
              {deleteType === "all" &&
                "Are you sure you want to clear all transaction history? This action cannot be undone."}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                Cancel
              </button>
              <button
                onClick={executeDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditBalance;
