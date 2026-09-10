"use client";

import { useSearchParams } from "next/navigation";

export default function ThankYouContent() {
  const searchParams = useSearchParams();

  const applicationId = searchParams.get("applicationId");

  return (
    <div className="min-h-screen bg-[#e9f1ee] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-lg w-full">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Application Submitted!
        </h2>

        <p className="text-gray-600">
          Your details are securely in our system. To receive your funds within
          24 hours, please call our underwriting team right now to finalize your
          terms.
        </p>

        {applicationId && (
          <div className="mt-6 bg-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">Your Application ID:</p>

            <p className="font-mono text-sm font-semibold break-all">
              {applicationId}
            </p>

            <p className="text-xs text-gray-500 mt-2">
              Save this ID to check your loan status anytime.
            </p>
          </div>
        )}

        <a
          href="/loan-status"
          className="inline-block mt-6 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Check Loan Status
        </a>
      </div>
    </div>
  );
}
