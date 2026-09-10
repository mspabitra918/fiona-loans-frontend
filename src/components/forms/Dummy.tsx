"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Shield,
  Lock,
  CheckCircle2,
  AlertCircle,
  Building2,
  CreditCard,
  UserCheck,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Sparkles,
  Info,
  ChevronDown,
  Check,
  Terminal,
  RefreshCw,
  Database,
  ExternalLink,
  ShieldCheck,
  FileText,
  DollarSign,
  Briefcase,
  Home,
  User,
  Calendar,
  HelpCircle,
  Clock,
  Landmark,
} from "lucide-react";

const LOAN_PURPOSES = [
  "Debt Consolidation",
  "Emergency Expenses",
  "Medical Expenses",
  "Dental Expenses",
  "Home Improvement",
  "Auto Repair",
  "Moving Expenses",
  "Wedding Expenses",
  "Vacation",
  "Education",
  "Rent or Utilities",
  "Major Purchase",
  "Childcare Expenses",
  "Funeral Expenses",
  "Tax Payments",
  "Business Expenses",
  "Other Personal Expenses",
];

const SUFFIXES = ["None", "Jr", "Sr", "II", "III", "IV"];

const US_STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const TIME_AT_ADDRESS = [
  "Under 6 months",
  "6–11 months",
  "1–2 years",
  "3–5 years",
  "5+ years",
];

const HOUSING_STATUSES = [
  "Rent",
  "Own with mortgage",
  "Own outright",
  "Living with family or friends",
  "Military housing",
  "Other",
];

const EMPLOYMENT_STATUSES = [
  "Employed — Full Time",
  "Employed — Part Time",
  "Self-Employed",
  "Active Military",
  "Retired",
  "Disability",
  "Social Security",
  "Unemployment Benefits",
  "Other Benefits",
  "Student",
  "Not Currently Employed",
];

const PRIMARY_INCOME_TYPES = [
  "Employment",
  "Self-Employment",
  "Retirement or Pension",
  "Social Security",
  "Disability",
  "Unemployment",
  "Other",
];

const PAY_FREQUENCIES = [
  "Weekly",
  "Every two weeks",
  "Twice a month",
  "Monthly",
  "Irregular",
];

const ACCOUNT_AGE_OPTIONS = [
  "Under 6 months",
  "1 Year",
  "2 Years",
  "3 Years",
  "4 Years",
  "5 years +",
];

// ABA Routing Number Lookup Mock Data
const BANK_LOOKUP = {
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

export default function App() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPrequalAnimation, setShowPrequalAnimation] = useState(false);
  const [showUnderwritingAnimation, setShowUnderwritingAnimation] =
    useState(false);
  const [showAdminDrawer, setShowAdminDrawer] = useState(false);
  const [ssnVisible, setSsnVisible] = useState(false);
  const [bankTab, setBankTab] = useState("plaid"); // 'plaid' or 'manual'
  const [plaidConnected, setPlaidConnected] = useState(false);

  // Form Fields State
  const [formData, setFormData] = useState({
    // Step 1
    loanAmount: 5000,
    loanPurpose: "Debt Consolidation",
    purposeOtherDetail: "",
    loanTerm: "36",
    firstName: "",
    middleInitial: "",
    lastName: "",
    suffix: "None",
    email: "",
    confirmEmail: "",
    mobilePhone: "",
    dob: "",
    streetAddress: "",
    aptUnit: "",
    city: "",
    state: "CA",
    zipCode: "",
    timeAtAddress: "1–2 years",
    housingStatus: "Rent",
    monthlyHousingPayment: "1200",
    employmentStatus: "Employed — Full Time",
    primaryIncomeType: "Employment",
    employerName: "",
    jobTitle: "",
    employerPhone: "",
    timeAtJob: "1–2 years",
    netMonthlyIncome: "4500",
    payFrequency: "Every two weeks",
    nextPayDate: "",
    directDeposit: "Yes",
    additionalMonthlyIncome: "0",
    additionalIncomeSource: "",
    // Step 1 Consents
    tcpaConsent: false,
    esignConsent: false,
    softCreditConsent: false,
    privacyConsent: false,
    termsConsent: false,

    // Step 2
    ssn: "",
    confirmSsn: "",
    dlNumber: "",
    dlState: "CA",
    dlExpiration: "",
    hardCreditConsent: false,

    // Step 3 (Manual Bank)
    routingNumber: "",
    bankName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    accountType: "Checking",
    accountAge: "2 Years",
    achConsent: false,

    // System / Hidden metadata
    applicationId: "",
    clientIp: "198.51.100.42",
    userAgent:
      typeof navigator !== "undefined"
        ? navigator.userAgent
        : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    jornayaLeadId: "J83921-99201-4821",
    trustedFormCertUrl: "https://cert.trustedform.com/284910284019284",
    step1StartedAt: new Date().toISOString(),
  });

  const [errors, setErrors] = useState({});

  // Generate App ID on mount or step 1 submit
  useEffect(() => {
    if (!formData.applicationId) {
      const randomId = "FL-" + Math.floor(100000 + Math.random() * 900000);
      setFormData((prev) => ({ ...prev, applicationId: randomId }));
    }
  }, []);

  // Filter available terms based on loan amount
  const availableTerms = useMemo(() => {
    const amt = Number(formData.loanAmount);
    let terms = [12, 24, 36, 48];
    if (amt < 3000) {
      terms = terms.filter((t) => t !== 48); // Suppress 48m for < $3k
    }
    return terms;
  }, [formData.loanAmount]);

  // Handle term fallback if selected term gets suppressed
  useEffect(() => {
    if (!availableTerms.includes(Number(formData.loanTerm))) {
      setFormData((prev) => ({ ...prev, loanTerm: String(availableTerms[0]) }));
    }
  }, [availableTerms]);

  // Derived Values Calculation Engine (for Admin Inspector & Underwriting)
  const derivedData = useMemo(() => {
    const dob = formData.dob ? new Date(formData.dob) : null;
    let age = null;
    if (dob && !isNaN(dob.getTime())) {
      const ageDifMs = Date.now() - dob.getTime();
      const ageDate = new Date(ageDifMs);
      age = Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const netMonthly = parseFloat(formData.netMonthlyIncome) || 0;
    const addMonthly = parseFloat(formData.additionalMonthlyIncome) || 0;
    const totalMonthlyIncome = netMonthly + addMonthly;
    const grossAnnualEst = Math.round(totalMonthlyIncome * 12 * 1.28); // Estimated gross

    const housing = parseFloat(formData.monthlyHousingPayment) || 0;
    const estimatedBureauDebt = 450; // Mock estimated monthly credit debts
    const dti =
      totalMonthlyIncome > 0
        ? (
            ((housing + estimatedBureauDebt) / totalMonthlyIncome) *
            100
          ).toFixed(1)
        : "0";

    // Estimated monthly installment
    const rate = 0.1199; // 11.99% APR demo
    const n = parseInt(formData.loanTerm) || 36;
    const r = rate / 12;
    const P = formData.loanAmount;
    const pmt =
      P > 0 ? (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : 0;
    const paymentToIncome =
      totalMonthlyIncome > 0
        ? ((pmt / totalMonthlyIncome) * 100).toFixed(1)
        : "0";

    return {
      applicantAge: age,
      totalMonthlyIncome,
      grossAnnualEst,
      dti,
      estimatedMonthlyPayment: Math.round(pmt),
      paymentToIncome,
      jobTenureMonths:
        formData.timeAtJob === "Under 3 months"
          ? 2
          : formData.timeAtJob === "3–5 months"
            ? 4
            : 18,
      residenceTenureMonths:
        formData.timeAtAddress === "Under 6 months" ? 3 : 24,
    };
  }, [formData]);

  const handleInputChange = (field, value) => {
    let formattedValue = value;

    // Mobile Phone formatting: (XXX) XXX-XXXX
    if (field === "mobilePhone" || field === "employerPhone") {
      const cleaned = ("" + value).replace(/\D/g, "");
      const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
      if (match) {
        formattedValue = !match[2]
          ? match[1]
          : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ""}`;
      }
    }

    // SSN formatting: XXX-XX-XXXX
    if (field === "ssn" || field === "confirmSsn") {
      const cleaned = ("" + value).replace(/\D/g, "");
      const match = cleaned.match(/^(\d{0,3})(\d{0,2})(\d{0,4})$/);
      if (match) {
        formattedValue = !match[2]
          ? match[1]
          : `${match[1]}-${match[2]}${match[3] ? `-${match[3]}` : ""}`;
      }
    }

    // ABA Routing Number Lookup logic
    if (field === "routingNumber") {
      const cleaned = value.replace(/\D/g, "").slice(0, 9);
      formattedValue = cleaned;
      if (cleaned.length === 9) {
        const foundBank =
          BANK_LOOKUP[cleaned] || "Federal Reserve Recognized Bank";
        setFormData((prev) => ({
          ...prev,
          bankName: foundBank,
          routingNumber: cleaned,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          bankName: "",
          routingNumber: cleaned,
        }));
      }
      return;
    }

    // Auto title-case for names
    if (field === "firstName" || field === "lastName") {
      formattedValue = value.replace(/[^a-zA-Z\s'-.]/g, "");
      if (formattedValue.length > 0) {
        formattedValue =
          formattedValue.charAt(0).toUpperCase() + formattedValue.slice(1);
      }
    }

    setFormData((prev) => ({ ...prev, [field]: formattedValue }));
    // Clear error for field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateStep1 = () => {
    const errs = {};
    if (!formData.firstName || formData.firstName.length < 2)
      errs.firstName = "First name required (min 2 chars)";
    if (!formData.lastName || formData.lastName.length < 2)
      errs.lastName = "Last name required (min 2 chars)";

    // Email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      errs.email = "Valid RFC 5322 email required";
    if (formData.email !== formData.confirmEmail)
      errs.confirmEmail = "Emails do not match";

    // Phone check
    if (formData.mobilePhone.replace(/\D/g, "").length !== 10)
      errs.mobilePhone = "10-digit US phone required";

    // DOB Check (>=18)
    if (!formData.dob) {
      errs.dob = "Date of birth required";
    } else if (
      derivedData.applicantAge !== null &&
      derivedData.applicantAge < 18
    ) {
      errs.dob = "Must be at least 18 years old";
    }

    // Address
    if (!formData.streetAddress || formData.streetAddress.length < 5)
      errs.streetAddress = "Valid street address required";
    if (!formData.city) errs.city = "City is required";
    if (!formData.zipCode || formData.zipCode.length !== 5)
      errs.zipCode = "5-digit ZIP code required";

    // Housing payment check
    if (["Rent", "Own with mortgage"].includes(formData.housingStatus)) {
      if (
        !formData.monthlyHousingPayment ||
        Number(formData.monthlyHousingPayment) <= 0
      ) {
        errs.monthlyHousingPayment = "Monthly payment amount required";
      }
    }

    // Employment specifics
    const isEmployed = [
      "Employed — Full Time",
      "Employed — Part Time",
      "Self-Employed",
      "Active Military",
    ].includes(formData.employmentStatus);
    if (isEmployed) {
      if (!formData.employerName)
        errs.employerName = "Employer/Business name required";
      if (!formData.jobTitle) errs.jobTitle = "Job title required";
    }

    // Income
    if (!formData.netMonthlyIncome || Number(formData.netMonthlyIncome) < 500) {
      errs.netMonthlyIncome = "Net income must be at least $500/mo";
    }

    // Purpose Other
    if (
      formData.loanPurpose === "Other Personal Expenses" &&
      !formData.purposeOtherDetail
    ) {
      errs.purposeOtherDetail = "Please specify the purpose";
    }

    // Consents
    if (!formData.tcpaConsent) errs.tcpaConsent = "TCPA consent required";
    if (!formData.esignConsent) errs.esignConsent = "E-SIGN consent required";
    if (!formData.softCreditConsent)
      errs.softCreditConsent = "Credit pull authorization required";
    if (!formData.privacyConsent)
      errs.privacyConsent = "Privacy policy acknowledgement required";
    if (!formData.termsConsent)
      errs.termsConsent = "Terms of use agreement required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs = {};
    const ssnClean = formData.ssn.replace(/\D/g, "");
    if (ssnClean.length !== 9) errs.ssn = "Valid 9-digit SSN required";
    if (formData.ssn !== formData.confirmSsn)
      errs.confirmSsn = "SSNs do not match";

    // Check known invalid SSNs
    if (
      ssnClean.startsWith("000") ||
      ssnClean.startsWith("666") ||
      ssnClean.startsWith("9")
    ) {
      errs.ssn = "Invalid SSN range provided";
    }

    if (!formData.dlNumber || formData.dlNumber.length < 3)
      errs.dlNumber = "Driver's License required";
    if (!formData.dlExpiration) errs.dlExpiration = "Expiration date required";

    if (!formData.hardCreditConsent)
      errs.hardCreditConsent =
        "Hard credit pull authorization required for Step 2";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs = {};
    if (bankTab === "plaid") {
      if (!plaidConnected) {
        errs.plaid = "Please complete instant bank connection below";
      }
    } else {
      if (formData.routingNumber.length !== 9)
        errs.routingNumber = "9-digit ABA routing number required";
      if (!formData.accountNumber || formData.accountNumber.length < 4)
        errs.accountNumber = "Valid account number required";
      if (formData.accountNumber !== formData.confirmAccountNumber)
        errs.confirmAccountNumber = "Account numbers do not match";
      if (!formData.achConsent)
        errs.achConsent = "ACH authorization agreement required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep1 = (e) => {
    e.preventDefault();
    if (!validateStep1()) return;

    setIsSubmitting(true);
    // Simulate soft-pull pre-qualification check
    setTimeout(() => {
      setIsSubmitting(false);
      setShowPrequalAnimation(true);
      setTimeout(() => {
        setShowPrequalAnimation(false);
        setStep(2);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 2200);
    }, 1200);
  };

  const handleNextStep2 = (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsSubmitting(true);
    // Simulate full underwriting decision check
    setTimeout(() => {
      setIsSubmitting(false);
      setShowUnderwritingAnimation(true);
      setTimeout(() => {
        setShowUnderwritingAnimation(false);
        setStep(3);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 2400);
    }, 1500);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4); // Success screen
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 pb-16">
      {/* Top Notification Bar */}
      <div className="bg-emerald-600/90 text-white text-xs font-medium py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4" />
        <span>
          Soft-pull credit check: Applying will NOT impact your credit score
          during Step 1
        </span>
      </div>

      {/* Main Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-emerald-500/20">
              F
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                Fiona<span className="text-emerald-400">Loans</span>
              </span>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                Personal Loans $1,000–$10,000
              </p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="hidden md:flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit SSL Encryption</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800">
              <Shield className="w-3.5 h-3.5 text-teal-400" />
              <span>GLBA Compliant</span>
            </div>
          </div>

          {/* Admin Inspector Toggle Button */}
          <button
            onClick={() => setShowAdminDrawer(true)}
            className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-emerald-400 font-medium px-3 py-1.5 rounded-lg border border-slate-700 transition-all shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Admin Inspector</span>
          </button>
        </div>

        {/* 3-Step Progress Bar */}
        {step <= 3 && (
          <div className="border-t border-slate-800/60 bg-slate-950/40">
            <div className="max-w-3xl mx-auto px-4 py-2.5">
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    num: 1,
                    title: "Loan & Profile",
                    desc: "Soft-pull pre-qual",
                  },
                  { num: 2, title: "Verification", desc: "Identity & SSN" },
                  { num: 3, title: "Bank & Funding", desc: "Direct Deposit" },
                ].map((s) => {
                  const isActive = step === s.num;
                  const isCompleted = step > s.num;
                  return (
                    <div
                      key={s.num}
                      className={`flex items-center gap-2.5 p-1.5 rounded-lg transition-all ${
                        isActive
                          ? "bg-slate-800/80 border border-emerald-500/40"
                          : "opacity-70"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isCompleted
                            ? "bg-emerald-500 text-slate-950"
                            : isActive
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500"
                              : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : (
                          s.num
                        )}
                      </div>
                      <div className="hidden sm:block text-left overflow-hidden">
                        <div
                          className={`text-xs font-semibold truncate ${isActive ? "text-white" : "text-slate-300"}`}
                        >
                          {s.title}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">
                          {s.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        {/* Soft-pull Pre-qual Transition Loader */}
        {showPrequalAnimation && (
          <div className="my-16 text-center space-y-6 py-12 bg-slate-950/80 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-md">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 animate-ping"></div>
              <div className="w-20 h-20 rounded-full border-4 border-t-emerald-400 border-r-teal-400 border-b-slate-800 border-l-slate-800 animate-spin flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-emerald-400 animate-pulse" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Analyzing Pre-Qualification Offers...
              </h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Checking lender matrix for $
                {Number(formData.loanAmount).toLocaleString()} loan request
                without affecting your credit score.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 font-mono">
              <CheckCircle2 className="w-4 h-4" /> Application ID Generated:{" "}
              {formData.applicationId}
            </div>
          </div>
        )}

        {/* Underwriting Hard Check Transition Loader */}
        {showUnderwritingAnimation && (
          <div className="my-16 text-center space-y-6 py-12 bg-slate-950/80 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-md">
            <div className="relative w-20 h-20 mx-auto">
              <div className="w-20 h-20 rounded-full border-4 border-t-emerald-400 border-r-teal-400 border-b-slate-800 border-l-slate-800 animate-spin flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Verifying Identity & Final Underwriting...
              </h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Running Bureau SSN Cross-Check & MLA Covered Borrower
                Verification...
              </p>
            </div>
            <div className="flex justify-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-400" /> Encrypted
                Session
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> DL Pattern
                Verified
              </span>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 1 FORM — Loan Request, Contact, Residence, Income                     */}
        {/* ========================================================================= */}
        {!showPrequalAnimation && !showUnderwritingAnimation && step === 1 && (
          <form onSubmit={handleNextStep1} className="space-y-8">
            {/* Step 1.1 Loan Request */}
            <section className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80 shadow-xl space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-bold text-white">
                  1. Loan Request Details
                </h2>
              </div>

              {/* Loan Amount Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <label className="text-sm font-medium text-slate-300">
                    Desired Loan Amount
                  </label>
                  <span className="text-2xl font-black text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1 rounded-xl">
                    ${Number(formData.loanAmount).toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="500"
                  value={formData.loanAmount}
                  onChange={(e) =>
                    handleInputChange("loanAmount", e.target.value)
                  }
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-xs text-slate-500 font-mono">
                  <span>$1,000</span>
                  <span>$5,000</span>
                  <span>$10,000</span>
                </div>
              </div>

              {/* Term Selection & Loan Purpose */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Loan Term (Months)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[12, 24, 36, 48].map((term) => {
                      const isDisabled = !availableTerms.includes(term);
                      const isSelected = Number(formData.loanTerm) === term;
                      return (
                        <button
                          key={term}
                          type="button"
                          disabled={isDisabled}
                          onClick={() =>
                            handleInputChange("loanTerm", String(term))
                          }
                          className={`py-2 text-sm font-bold rounded-lg border transition-all ${
                            isDisabled
                              ? "bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed opacity-50"
                              : isSelected
                                ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20"
                                : "bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600"
                          }`}
                        >
                          {term}m
                        </button>
                      );
                    })}
                  </div>
                  {formData.loanAmount < 3000 && (
                    <p className="text-[11px] text-slate-500 mt-1.5">
                      * 48-month term suppressed for amounts under $3,000.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Primary Loan Purpose{" "}
                    <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    value={formData.loanPurpose}
                    onChange={(e) =>
                      handleInputChange("loanPurpose", e.target.value)
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    {LOAN_PURPOSES.map((purpose) => (
                      <option key={purpose} value={purpose}>
                        {purpose}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Conditional Purpose Other Detail */}
              {formData.loanPurpose === "Other Personal Expenses" && (
                <div className="pt-2 animate-fadeIn">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Specify Loan Details{" "}
                    <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={120}
                    placeholder="Brief description of loan purpose (3–120 characters)"
                    value={formData.purposeOtherDetail}
                    onChange={(e) =>
                      handleInputChange("purposeOtherDetail", e.target.value)
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  {errors.purposeOtherDetail && (
                    <p className="text-xs text-rose-400 mt-1">
                      {errors.purposeOtherDetail}
                    </p>
                  )}
                </div>
              )}
            </section>

            {/* Step 1.2 Applicant Identity */}
            <section className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80 shadow-xl space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <User className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-bold text-white">
                  2. Applicant Identity
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    First Name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    placeholder="Jane"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  {errors.firstName && (
                    <p className="text-[11px] text-rose-400 mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    M.I.
                  </label>
                  <input
                    type="text"
                    maxLength={1}
                    value={formData.middleInitial}
                    onChange={(e) =>
                      handleInputChange(
                        "middleInitial",
                        e.target.value.toUpperCase(),
                      )
                    }
                    placeholder="A"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 uppercase text-center"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Last Name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    placeholder="Doe"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  {errors.lastName && (
                    <p className="text-[11px] text-rose-400 mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Suffix
                  </label>
                  <select
                    value={formData.suffix}
                    onChange={(e) =>
                      handleInputChange("suffix", e.target.value)
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    {SUFFIXES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Email Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Email Address <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      handleInputChange("email", e.target.value.toLowerCase())
                    }
                    placeholder="jane.doe@example.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-400 mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Confirm Email <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="email"
                    onPaste={(e) => e.preventDefault()}
                    value={formData.confirmEmail}
                    onChange={(e) =>
                      handleInputChange(
                        "confirmEmail",
                        e.target.value.toLowerCase(),
                      )
                    }
                    placeholder="Paste disabled"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  {errors.confirmEmail && (
                    <p className="text-[11px] text-rose-400 mt-1">
                      {errors.confirmEmail}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone & DOB */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Mobile Phone <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={formData.mobilePhone}
                    onChange={(e) =>
                      handleInputChange("mobilePhone", e.target.value)
                    }
                    placeholder="(555) 000-0000"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  {errors.mobilePhone && (
                    <p className="text-[11px] text-rose-400 mt-1">
                      {errors.mobilePhone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Date of Birth <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleInputChange("dob", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  {errors.dob && (
                    <p className="text-[11px] text-rose-400 mt-1">
                      {errors.dob}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Step 1.3 Residence */}
            <section className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80 shadow-xl space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <Home className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-bold text-white">
                  3. Residential Address
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Street Address (No PO Boxes){" "}
                    <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.streetAddress}
                    onChange={(e) =>
                      handleInputChange("streetAddress", e.target.value)
                    }
                    placeholder="123 Main Street"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  {errors.streetAddress && (
                    <p className="text-[11px] text-rose-400 mt-1">
                      {errors.streetAddress}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Apt / Unit / Suite
                  </label>
                  <input
                    type="text"
                    value={formData.aptUnit}
                    onChange={(e) =>
                      handleInputChange("aptUnit", e.target.value)
                    }
                    placeholder="Apt 4B"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    City <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Los Angeles"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  {errors.city && (
                    <p className="text-[11px] text-rose-400 mt-1">
                      {errors.city}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    State <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    {US_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    ZIP Code <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    inputMode="numeric"
                    value={formData.zipCode}
                    onChange={(e) =>
                      handleInputChange(
                        "zipCode",
                        e.target.value.replace(/\D/g, ""),
                      )
                    }
                    placeholder="90210"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  {errors.zipCode && (
                    <p className="text-[11px] text-rose-400 mt-1">
                      {errors.zipCode}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Time at Address <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    value={formData.timeAtAddress}
                    onChange={(e) =>
                      handleInputChange("timeAtAddress", e.target.value)
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    {TIME_AT_ADDRESS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Housing Status <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    value={formData.housingStatus}
                    onChange={(e) =>
                      handleInputChange("housingStatus", e.target.value)
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    {HOUSING_STATUSES.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {["Rent", "Own with mortgage"].includes(
                formData.housingStatus,
              ) && (
                <div className="animate-fadeIn">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Monthly Housing Payment ($){" "}
                    <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-slate-500">
                      $
                    </span>
                    <input
                      type="number"
                      min="0"
                      max="15000"
                      value={formData.monthlyHousingPayment}
                      onChange={(e) =>
                        handleInputChange(
                          "monthlyHousingPayment",
                          e.target.value,
                        )
                      }
                      placeholder="1200"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-8 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  {errors.monthlyHousingPayment && (
                    <p className="text-[11px] text-rose-400 mt-1">
                      {errors.monthlyHousingPayment}
                    </p>
                  )}
                </div>
              )}
            </section>

            {/* Step 1.4 Employment & Income */}
            <section className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80 shadow-xl space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <Briefcase className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-bold text-white">
                  4. Employment & Income
                </h2>
              </div>

              {/* Reg B Notice Banner */}
              <div className="bg-slate-900 border-l-4 border-amber-400 p-3.5 rounded-r-xl text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-300">
                    Reg B Notice:
                  </span>{" "}
                  Alimony, child support, or separate maintenance income need
                  not be revealed if you do not wish to have it considered as a
                  basis for repaying this obligation.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Employment Status{" "}
                    <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    value={formData.employmentStatus}
                    onChange={(e) =>
                      handleInputChange("employmentStatus", e.target.value)
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    {EMPLOYMENT_STATUSES.map((emp) => (
                      <option key={emp} value={emp}>
                        {emp}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Primary Income Type{" "}
                    <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    value={formData.primaryIncomeType}
                    onChange={(e) =>
                      handleInputChange("primaryIncomeType", e.target.value)
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    {PRIMARY_INCOME_TYPES.map((inc) => (
                      <option key={inc} value={inc}>
                        {inc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Conditional Employer Fields */}
              {[
                "Employed — Full Time",
                "Employed — Part Time",
                "Self-Employed",
                "Active Military",
              ].includes(formData.employmentStatus) && (
                <div className="space-y-4 pt-2 border-t border-slate-800/80 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Employer / Company Name{" "}
                        <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.employerName}
                        onChange={(e) =>
                          handleInputChange("employerName", e.target.value)
                        }
                        placeholder="Acme Corporation"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                      />
                      {errors.employerName && (
                        <p className="text-[11px] text-rose-400 mt-1">
                          {errors.employerName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Job Title <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.jobTitle}
                        onChange={(e) =>
                          handleInputChange("jobTitle", e.target.value)
                        }
                        placeholder="Software Engineer"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                      />
                      {errors.jobTitle && (
                        <p className="text-[11px] text-rose-400 mt-1">
                          {errors.jobTitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Employer Phone
                      </label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        value={formData.employerPhone}
                        onChange={(e) =>
                          handleInputChange("employerPhone", e.target.value)
                        }
                        placeholder="(555) 000-0000"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Time at Current Job
                      </label>
                      <select
                        value={formData.timeAtJob}
                        onChange={(e) =>
                          handleInputChange("timeAtJob", e.target.value)
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                      >
                        {TIME_AT_ADDRESS.map((tj) => (
                          <option key={tj} value={tj}>
                            {tj}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Income Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Net Monthly Income (Take-Home){" "}
                    <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-slate-500">
                      $
                    </span>
                    <input
                      type="number"
                      min="500"
                      max="50000"
                      value={formData.netMonthlyIncome}
                      onChange={(e) =>
                        handleInputChange("netMonthlyIncome", e.target.value)
                      }
                      placeholder="4500"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-8 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  {errors.netMonthlyIncome && (
                    <p className="text-[11px] text-rose-400 mt-1">
                      {errors.netMonthlyIncome}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Pay Frequency <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    value={formData.payFrequency}
                    onChange={(e) =>
                      handleInputChange("payFrequency", e.target.value)
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    {PAY_FREQUENCIES.map((pf) => (
                      <option key={pf} value={pf}>
                        {pf}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Additional Income Optional Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Additional Monthly Income (Optional)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-slate-500">
                      $
                    </span>
                    <input
                      type="number"
                      min="0"
                      max="20000"
                      value={formData.additionalMonthlyIncome}
                      onChange={(e) =>
                        handleInputChange(
                          "additionalMonthlyIncome",
                          e.target.value,
                        )
                      }
                      placeholder="0"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-8 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {Number(formData.additionalMonthlyIncome) > 0 && (
                  <div className="animate-fadeIn">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Additional Income Source
                    </label>
                    <input
                      type="text"
                      value={formData.additionalIncomeSource}
                      onChange={(e) =>
                        handleInputChange(
                          "additionalIncomeSource",
                          e.target.value,
                        )
                      }
                      placeholder="e.g. Consulting, Investments"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                )}
              </div>
            </section>

            {/* Step 1 Legal Consents */}
            <section className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80 shadow-xl space-y-3 text-xs">
              <h3 className="text-sm font-bold text-white mb-2">
                Required Consents & Legal Disclosures
              </h3>

              {[
                {
                  id: "tcpaConsent",
                  text: "TCPA Consent: I agree to receive communications, calls, and SMS from Fiona Loans and its network of lenders using automated technology.",
                },
                {
                  id: "esignConsent",
                  text: "E-SIGN Consent: I agree to receive disclosures, notices, and agreements electronically.",
                },
                {
                  id: "softCreditConsent",
                  text: "Soft Credit Pull Authorization: I authorize Fiona Loans to perform a soft credit inquiry to pre-qualify me without affecting my credit score.",
                },
                {
                  id: "privacyConsent",
                  text: "Privacy Policy & GLBA Notice: I acknowledge receipt of the Privacy Policy and financial disclosure terms.",
                },
                {
                  id: "termsConsent",
                  text: "Terms of Use: I agree to the Fiona Loans Terms of Use and platform policies.",
                },
              ].map((c) => (
                <label
                  key={c.id}
                  className="flex items-start gap-2.5 cursor-pointer text-slate-300"
                >
                  <input
                    type="checkbox"
                    checked={formData[c.id]}
                    onChange={(e) => handleInputChange(c.id, e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span>{c.text}</span>
                </label>
              ))}
              {(errors.tcpaConsent ||
                errors.esignConsent ||
                errors.softCreditConsent) && (
                <p className="text-xs text-rose-400 font-semibold pt-1">
                  You must agree to all required consents to proceed.
                </p>
              )}
            </section>

            {/* Submit Step 1 Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-base rounded-xl shadow-xl shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-300 transition-all flex items-center justify-center gap-2"
            >
              <span>See Pre-Qualified Loan Offers</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}

        {/* ========================================================================= */}
        {/* STEP 2 FORM — Identity Verification (SSN & Driver's License)              */}
        {/* ========================================================================= */}
        {!showPrequalAnimation && !showUnderwritingAnimation && step === 2 && (
          <form onSubmit={handleNextStep2} className="space-y-6 animate-fadeIn">
            <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-white">
                  Soft-Pull Pre-Qualification Passed!
                </h3>
                <p className="text-xs text-slate-300">
                  Application ID: {formData.applicationId} — Soft offers
                  available. Complete verification to lock in your rates.
                </p>
              </div>
            </div>

            <section className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-lg font-bold text-white">
                    Social Security & Verification
                  </h2>
                </div>
                <span className="text-xs bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 px-2.5 py-1 rounded-full font-mono">
                  AES-256 Encrypted
                </span>
              </div>

              {/* SSN Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Social Security Number (SSN){" "}
                    <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={ssnVisible ? "text" : "password"}
                      maxLength={11}
                      inputMode="numeric"
                      value={formData.ssn}
                      onChange={(e) => handleInputChange("ssn", e.target.value)}
                      placeholder="XXX-XX-XXXX"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-3.5 pr-10 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setSsnVisible(!ssnVisible)}
                      className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                    >
                      {ssnVisible ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.ssn && (
                    <p className="text-[11px] text-rose-400 mt-1">
                      {errors.ssn}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Confirm SSN <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="password"
                    maxLength={11}
                    inputMode="numeric"
                    onPaste={(e) => e.preventDefault()}
                    value={formData.confirmSsn}
                    onChange={(e) =>
                      handleInputChange("confirmSsn", e.target.value)
                    }
                    placeholder="Paste disabled"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                  {errors.confirmSsn && (
                    <p className="text-[11px] text-rose-400 mt-1">
                      {errors.confirmSsn}
                    </p>
                  )}
                </div>
              </div>

              {/* Driver's License */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Driver's License #{" "}
                    <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.dlNumber}
                    onChange={(e) =>
                      handleInputChange(
                        "dlNumber",
                        e.target.value.toUpperCase(),
                      )
                    }
                    placeholder="D1234567"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-emerald-500 uppercase"
                  />
                  {errors.dlNumber && (
                    <p className="text-[11px] text-rose-400 mt-1">
                      {errors.dlNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    DL Issuing State <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    value={formData.dlState}
                    onChange={(e) =>
                      handleInputChange("dlState", e.target.value)
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    {US_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    DL Expiration Date{" "}
                    <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.dlExpiration}
                    onChange={(e) =>
                      handleInputChange("dlExpiration", e.target.value)
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  {errors.dlExpiration && (
                    <p className="text-[11px] text-rose-400 mt-1">
                      {errors.dlExpiration}
                    </p>
                  )}
                </div>
              </div>

              {/* Hard Credit Pull Consent */}
              <div className="pt-4 border-t border-slate-800">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.hardCreditConsent}
                    onChange={(e) =>
                      handleInputChange("hardCreditConsent", e.target.checked)
                    }
                    className="mt-0.5 w-4 h-4 rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span>
                    FCRA Hard Credit Authorization: I authorize Fiona Loans and
                    its partner lenders to perform a formal hard credit inquiry
                    with credit bureaus for full underwriting.
                  </span>
                </label>
                {errors.hardCreditConsent && (
                  <p className="text-xs text-rose-400 mt-1">
                    {errors.hardCreditConsent}
                  </p>
                )}
              </div>
            </section>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-4 px-6 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm rounded-xl transition-all flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Step 1
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-4 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-base rounded-xl shadow-xl shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-300 transition-all flex items-center justify-center gap-2"
              >
                <span>Verify Identity & Run Underwriting</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}

        {/* ========================================================================= */}
        {/* STEP 3 FORM — Bank & Funding Connection                                    */}
        {/* ========================================================================= */}
        {!showPrequalAnimation && !showUnderwritingAnimation && step === 3 && (
          <form
            onSubmit={handleFinalSubmit}
            className="space-y-6 animate-fadeIn"
          >
            <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 rounded-xl flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Underwriting Approved!
                </h3>
                <p className="text-xs text-slate-300">
                  Approved Amount: $
                  {Number(formData.loanAmount).toLocaleString()} • Estimated
                  Monthly: ${derivedData.estimatedMonthlyPayment}/mo
                </p>
              </div>
              <span className="text-xs bg-emerald-500 text-slate-950 font-bold px-2.5 py-1 rounded-full">
                Approved
              </span>
            </div>

            {/* Bank Method Tab Switcher */}
            <div className="grid grid-cols-2 gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setBankTab("plaid")}
                className={`py-3 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  bankTab === "plaid"
                    ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Instant Verification (Plaid)</span>
              </button>
              <button
                type="button"
                onClick={() => setBankTab("manual")}
                className={`py-3 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  bankTab === "manual"
                    ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Landmark className="w-4 h-4" />
                <span>Manual ACH Entry</span>
              </button>
            </div>

            {/* Plaid Flow Tab */}
            {bankTab === "plaid" && (
              <section className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80 shadow-xl text-center space-y-4">
                <div className="w-16 h-16 bg-slate-900 border border-slate-700 rounded-2xl mx-auto flex items-center justify-center">
                  <Landmark className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Instant Bank Connection
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                    Connect your checking account instantly via Plaid for
                    same-day funding approval.
                  </p>
                </div>

                {plaidConnected ? (
                  <div className="bg-emerald-950/60 border border-emerald-800 p-4 rounded-xl flex items-center justify-center gap-2 text-emerald-300 font-semibold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Chase Checking Account (...4821) Connected</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlaidConnected(true)}
                    className="py-3 px-6 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs rounded-xl border border-slate-700 transition-all inline-flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" /> Launch Simulated Plaid
                    Link
                  </button>
                )}
                {errors.plaid && (
                  <p className="text-xs text-rose-400">{errors.plaid}</p>
                )}
              </section>
            )}

            {/* Manual ACH Fallback Tab */}
            {bankTab === "manual" && (
              <section className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80 shadow-xl space-y-4">
                <h3 className="text-sm font-bold text-white pb-2 border-b border-slate-800">
                  Direct Deposit ACH Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Routing Number (9 Digits){" "}
                      <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      maxLength={9}
                      inputMode="numeric"
                      value={formData.routingNumber}
                      onChange={(e) =>
                        handleInputChange("routingNumber", e.target.value)
                      }
                      placeholder="Try 021000021"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                    />
                    {errors.routingNumber && (
                      <p className="text-[11px] text-rose-400 mt-1">
                        {errors.routingNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Bank Name (Auto-Derived)
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={formData.bankName}
                      placeholder="Auto-populated on routing entry"
                      className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Account Number <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formData.accountNumber}
                      onChange={(e) =>
                        handleInputChange(
                          "accountNumber",
                          e.target.value.replace(/\D/g, ""),
                        )
                      }
                      placeholder="1234567890"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                    />
                    {errors.accountNumber && (
                      <p className="text-[11px] text-rose-400 mt-1">
                        {errors.accountNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Confirm Account Number{" "}
                      <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      onPaste={(e) => e.preventDefault()}
                      value={formData.confirmAccountNumber}
                      onChange={(e) =>
                        handleInputChange(
                          "confirmAccountNumber",
                          e.target.value.replace(/\D/g, ""),
                        )
                      }
                      placeholder="Paste disabled"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                    />
                    {errors.confirmAccountNumber && (
                      <p className="text-[11px] text-rose-400 mt-1">
                        {errors.confirmAccountNumber}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Account Type
                    </label>
                    <div className="flex gap-4 pt-2">
                      {["Checking", "Savings"].map((type) => (
                        <label
                          key={type}
                          className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="accountType"
                            checked={formData.accountType === type}
                            onChange={() =>
                              handleInputChange("accountType", type)
                            }
                            className="text-emerald-500 focus:ring-emerald-500"
                          />
                          <span>{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Account Age
                    </label>
                    <select
                      value={formData.accountAge}
                      onChange={(e) =>
                        handleInputChange("accountAge", e.target.value)
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    >
                      {ACCOUNT_AGE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={formData.achConsent}
                      onChange={(e) =>
                        handleInputChange("achConsent", e.target.checked)
                      }
                      className="mt-0.5 w-4 h-4 rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>
                      ACH Electronic Authorization: I authorize Fiona Loans to
                      initiate electronic credit/debit entries for my personal
                      loan repayment.
                    </span>
                  </label>
                  {errors.achConsent && (
                    <p className="text-xs text-rose-400 mt-1">
                      {errors.achConsent}
                    </p>
                  )}
                </div>
              </section>
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="py-4 px-6 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm rounded-xl transition-all flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Step 2
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-4 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-base rounded-xl shadow-xl shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-300 transition-all flex items-center justify-center gap-2"
              >
                <span>Finalize & Authorize Loan Deposit</span>
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}

        {/* ========================================================================= */}
        {/* STEP 4 — APPLICATION SUCCESS / FUNDING CONFIRMATION SCREEN               */}
        {/* ========================================================================= */}
        {step === 4 && (
          <div className="bg-slate-950/80 border border-slate-800 p-8 rounded-2xl text-center space-y-6 shadow-2xl animate-fadeIn">
            <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-white">
                Loan Application Finalized!
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Your loan has been successfully submitted and scheduled for
                funding.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-left space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Application ID:</span>
                <span className="text-emerald-400 font-bold">
                  {formData.applicationId}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Requested Amount:</span>
                <span className="text-white">
                  ${Number(formData.loanAmount).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Term Length:</span>
                <span className="text-white">{formData.loanTerm} Months</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Applicant:</span>
                <span className="text-white">
                  {formData.firstName} {formData.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Est. Deposit Arrival:</span>
                <span className="text-emerald-400 font-bold">
                  1–2 Business Days
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setStep(1);
                setPlaidConnected(false);
              }}
              className="py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-all inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Start New Demo Application
            </button>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* ADMIN & SYSTEM DATA INSPECTOR DRAWER                                     */}
      {/* ========================================================================= */}
      {showAdminDrawer && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full p-6 overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-sm">
                  System Data Inspector
                </h3>
              </div>
              <button
                onClick={() => setShowAdminDrawer(false)}
                className="text-slate-400 hover:text-white text-xs font-bold bg-slate-800 px-2.5 py-1 rounded-lg"
              >
                Close ✕
              </button>
            </div>

            {/* Derived Fields Section */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" /> Derived Server Fields
              </h4>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Applicant Age:</span>
                  <span className="text-white">
                    {derivedData.applicantAge !== null
                      ? `${derivedData.applicantAge} yrs`
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Monthly Income:</span>
                  <span className="text-emerald-400">
                    ${derivedData.totalMonthlyIncome.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Est. Gross Annual:</span>
                  <span className="text-white">
                    ${derivedData.grossAnnualEst.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Calculated DTI Ratio:</span>
                  <span className="text-amber-400">{derivedData.dti}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Payment-to-Income:</span>
                  <span className="text-teal-400">
                    {derivedData.paymentToIncome}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Job Tenure Bucket:</span>
                  <span className="text-white">
                    {derivedData.jobTenureMonths} months
                  </span>
                </div>
              </div>
            </div>

            {/* Compliance Metadata */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Compliance & Audit
                Tokens
              </h4>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono space-y-2 truncate">
                <div>
                  <span className="text-slate-400 block text-[10px]">
                    APPLICATION ID
                  </span>
                  <span className="text-white">{formData.applicationId}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">
                    CLIENT IP ADDRESS
                  </span>
                  <span className="text-white">{formData.clientIp}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">
                    JORNAYA LEAD ID
                  </span>
                  <span className="text-white">{formData.jornayaLeadId}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">
                    TRUSTEDFORM CERT URL
                  </span>
                  <span className="text-emerald-400 truncate block">
                    {formData.trustedFormCertUrl}
                  </span>
                </div>
              </div>
            </div>

            {/* Current Form State JSON */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Raw Payload State
              </h4>
              <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[10px] text-slate-300 font-mono overflow-x-auto max-h-48">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
