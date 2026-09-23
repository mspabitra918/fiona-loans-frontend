"use client";

import { useSearchParams } from "next/navigation";

export default function ThankYouContent() {
  const searchParams = useSearchParams();
  const applicationId = searchParams.get("applicationId");
  const email = searchParams.get("email");

  return (
    <main className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-900/5 overflow-hidden">
          <div className="px-6 py-8 sm:px-10 sm:py-10 text-center">
            {/* Heading */}
            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">
              Application Complete
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Thank You!
            </h1>

            <p className="mt-4 text-slate-600 leading-7 max-w-md mx-auto">
              Your loan application has been successfully submitted. Our
              underwriting team is ready to help you complete the next step.
            </p>

            {/* Application ID */}
            {applicationId && (
              <div className="mt-7 rounded-2xl bg-slate-50 border border-slate-200 p-5 text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Application ID
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Submitted
                  </span>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl px-4 py-3">
                  <p className="font-mono text-lg font-bold text-slate-900 break-all">
                    {applicationId}
                  </p>
                </div>

                <p className="text-xs text-slate-500 mt-3">
                  Please keep this application ID for your records.
                </p>
              </div>
            )}

            {/* Next Step */}
            {/* <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-5 text-left">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">Next step</h3>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Please contact our underwriting team to finalize your loan
                    terms and discuss the next steps.
                  </p>
                </div>
              </div>
            </div> */}

            {/* Actions */}
            <div className="mt-7 space-y-3">
              <a
                href={`/loan-status?applicationId=${applicationId}&email=${email}`}
                className="flex items-center justify-center w-full rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 px-6 transition-all duration-200 shadow-lg shadow-slate-900/10"
              >
                Check Loan Status
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14m-6-6 6 6-6 6"
                  />
                </svg>
              </a>

              <a
                href="/"
                className="flex items-center justify-center w-full rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium py-3.5 px-6 transition-colors"
              >
                Return to Home
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-4 text-center">
            <p className="text-xs text-slate-500">
              Your application information has been securely submitted.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
