import React from "react";
import { X, Smartphone } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface MobilePhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (phoneNumber: string) => void;
  currentPhone: string | null;
}

const AddMobileForm: React.FC<MobilePhoneModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentPhone,
}) => {
  if (!isOpen) return null;

  // Validation schema using Yup
  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .matches(
        /^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        "Please enter a valid phone number"
      )
      .required("Phone number is required"),
  });

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      phoneNumber: currentPhone || "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values.phoneNumber);
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            {currentPhone ? "Edit" : "Add"} Mobile Phone
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <form onSubmit={formik.handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Smartphone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="+1 (123) 456-7890"
                    className={`pl-10 pr-3 py-2 w-full border ${
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumber}
                  />
                </div>
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.phoneNumber}
                  </p>
                )}
                <p className="mt-2 text-xs text-gray-500">
                  We'll send a verification code to this number to confirm it's
                  yours.
                </p>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  disabled={formik.isSubmitting}>
                  {formik.isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMobileForm;
