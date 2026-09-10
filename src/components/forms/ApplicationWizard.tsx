"use client";

import React, { useState, useEffect, useMemo } from "react";
import { apiUrl } from "@/lib/api";
import { usePlaidLink } from "react-plaid-link";
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
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  ACCOUNT_AGE_OPTIONS,
  BANK_LOOKUP,
  EMPLOYMENT_STATUSES,
  formatUSPhone,
  HOUSING_STATUSES,
  isNextPayDateValid,
  isZipValidForState,
  LOAN_PURPOSES,
  PAY_FREQUENCIES,
  PRIMARY_INCOME_TYPES,
  SUFFIXES,
  TIME_AT_ADDRESS,
  US_STATES,
  validateUSPhone,
} from "@/types/application";

export default function ApplicationWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPrequalAnimation, setShowPrequalAnimation] = useState(false);
  const [showUnderwritingAnimation, setShowUnderwritingAnimation] =
    useState(false);
  const [showAdminDrawer, setShowAdminDrawer] = useState(false);
  const [ssnVisible, setSsnVisible] = useState(false);
  const [bankTab, setBankTab] = useState("plaid"); // 'plaid' or 'manual'
  const [applicationId, setApplicationId] = useState("");
  const [plaidConnected, setPlaidConnected] = useState(false);
  const [plaidLinkToken, setPlaidLinkToken] = useState<string | null>(null);
  const [openPlaidWhenReady, setOpenPlaidWhenReady] = useState(false);
  const [plaidInstitutionName, setPlaidInstitutionName] = useState<string>("");
  const [plaidDetails, setPlaidDetails] = useState<{
    itemId: string;
    accountId: string;
    accountMask: string;
    accountType: string;
  } | null>(null);
  const [applicationStatus, setApplicationStatus] = useState<string>("draft");
  const [serverDerivedData, setServerDerivedData] = useState<{
    applicantAge: number | null;
    grossAnnualIncome: number;
    totalMonthlyIncome: number;
    debtToIncomeRatio: number;
    disposableIncome: number;
    paymentToIncomeRatio: number;
    jobTenureMonths: number;
    residenceTenureMonths: number;
    estimatedInstallment: number;
  } | null>(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    // Step 1
    loanAmount: 5000,
    loanPurpose: "",
    purposeOtherDetail: "",
    loanTerm: "12",
    firstName: "",
    middleInitial: "",
    lastName: "",
    suffix: "",
    email: "",
    confirmEmail: "",
    mobilePhone: "",
    dob: "",
    streetAddress: "",
    aptUnit: "",
    city: "",
    state: "",
    zipCode: "",
    timeAtAddress: "",
    housingStatus: "",
    monthlyHousingPayment: "",
    employmentStatus: "",
    primaryIncomeType: "",
    employerName: "",
    jobTitle: "",
    employerPhone: "",
    timeAtJob: "",
    netMonthlyIncome: "",
    payFrequency: "",
    nextPayDate: "",
    directDeposit: "",
    additionalMonthlyIncome: "",
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
    dlState: "",
    dlExpiration: "",
    hardCreditConsent: false,

    // Step 3 (Manual Bank)
    routingNumber: "",
    bankName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    accountType: "",
    accountStatus: "",
    accountAge: "",
    achConsent: false,

    // System / Hidden metadata
  });

  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [draftHydrated, setDraftHydrated] = useState(false);

  useEffect(() => {
    const resumeId = new URLSearchParams(window.location.search).get("resume");
    if (resumeId) sessionStorage.setItem("fiona_application_session", resumeId);

    try {
      const savedDraft = localStorage.getItem("fiona_application_draft");
      if (savedDraft)
        setFormData((previous) => ({ ...previous, ...JSON.parse(savedDraft) }));
      const savedApplicationId = localStorage.getItem("fiona_application_id");
      if (savedApplicationId) setApplicationId(savedApplicationId);
      const savedStep = localStorage.getItem("fiona_application_step");
      if (savedStep) setStep(Math.min(3, Math.max(1, Number(savedStep))));
    } catch {
      localStorage.removeItem("fiona_application_draft");
    }
    setDraftHydrated(true);
  }, []);

  useEffect(() => {
    // Do not re-save draft if the form is in the middle of submitting or already finished
    if (!draftHydrated || isSubmitting) return;

    const {
      ssn,
      confirmSsn,
      dlNumber,
      accountNumber,
      confirmAccountNumber,
      routingNumber,
      ...safeDraft
    } = formData;

    localStorage.setItem("fiona_application_draft", JSON.stringify(safeDraft));
    if (applicationId) {
      localStorage.setItem("fiona_application_id", applicationId);
    }
    localStorage.setItem("fiona_application_step", String(step));
  }, [applicationId, draftHydrated, formData, isSubmitting, step]);

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

  const underwritingData = serverDerivedData
    ? {
        applicantAge: serverDerivedData.applicantAge,
        totalMonthlyIncome: serverDerivedData.totalMonthlyIncome,
        grossAnnualEst: serverDerivedData.grossAnnualIncome,
        dti: String(serverDerivedData.debtToIncomeRatio),
        disposableIncome: serverDerivedData.disposableIncome,
        paymentToIncome: String(serverDerivedData.paymentToIncomeRatio),
        jobTenureMonths: serverDerivedData.jobTenureMonths,
        residenceTenureMonths: serverDerivedData.residenceTenureMonths,
        estimatedMonthlyPayment: serverDerivedData.estimatedInstallment,
      }
    : derivedData;

  const createPlaidLinkToken = async () => {
    try {
      const response = await fetch(apiUrl("/api/plaid/create-link-token"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to initialize Plaid");
      }

      setPlaidLinkToken(result.linkToken);
      return result.linkToken;
    } catch (error) {
      console.error("Plaid token init failed:", error);
      setErrors((previous) => ({
        ...previous,
        plaid:
          error instanceof Error ? error.message : "Unable to initialize Plaid",
      }));
      return null;
    }
  };

  const { open: openPlaidLink, ready: plaidReady } = usePlaidLink({
    token: plaidLinkToken || "",
    onSuccess: async (publicToken) => {
      try {
        const response = await fetch(
          apiUrl("/api/plaid/exchange-public-token"),
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ publicToken }),
          },
        );

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || "Plaid exchange failed");
        }

        setPlaidConnected(true);
        setPlaidInstitutionName(result.institutionName || "Connected account");
        setPlaidDetails({
          itemId: result.itemId || "",
          accountId: result.accountId || "",
          accountMask: result.accountMask || "",
          accountType: result.accountType || "",
        });
        setErrors((previous) => ({ ...previous, plaid: null }));
      } catch (error) {
        console.error("Plaid exchange failed:", error);
        setErrors((previous) => ({
          ...previous,
          plaid:
            error instanceof Error
              ? error.message
              : "Unable to complete bank connection",
        }));
      }
    },
    onExit: () => {
      setErrors((previous) => ({
        ...previous,
        plaid: previous.plaid || "Plaid verification was cancelled.",
      }));
    },
  });

  useEffect(() => {
    if (openPlaidWhenReady && plaidReady) {
      setOpenPlaidWhenReady(false);
      openPlaidLink();
    }
  }, [openPlaidWhenReady, plaidReady, openPlaidLink]);

  const handleInputChange = (field: string, value: string | boolean) => {
    let formattedValue = value;

    // Mobile Phone formatting: (XXX) XXX-XXXX
    if (field === "mobilePhone" || field === "employerPhone") {
      formattedValue = formatUSPhone(String(value));
    }

    // SSN formatting: XXX-XX-XXXX
    if (field === "ssn" || field === "confirmSsn") {
      const cleaned = String(value).replace(/\D/g, "");
      const match = cleaned.match(/^(\d{0,3})(\d{0,2})(\d{0,4})$/);
      if (match) {
        formattedValue = !match[2]
          ? match[1]
          : `${match[1]}-${match[2]}${match[3] ? `-${match[3]}` : ""}`;
      }
    }

    // ABA Routing Number Lookup logic
    if (field === "routingNumber") {
      const cleaned = String(value).replace(/\D/g, "").slice(0, 9);
      formattedValue = cleaned;
      if (cleaned.length === 9) {
        const foundBank =
          BANK_LOOKUP[cleaned as keyof typeof BANK_LOOKUP] ||
          "Federal Reserve Recognized Bank";
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
      formattedValue = String(value).replace(/[^a-zA-Z\s'-.]/g, "");
      if (formattedValue.length > 0) {
        formattedValue =
          String(formattedValue).charAt(0).toUpperCase() +
          String(formattedValue).slice(1);
      }
    }

    setFormData((prev) => ({ ...prev, [field]: formattedValue }));
    // Clear error for field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateField = (field: string) => {
    let message: string | null = null;
    const value = String((formData as Record<string, unknown>)[field] ?? "");
    switch (field) {
      case "firstName":
      case "lastName":
        if (value.trim().length < 2)
          message = "This field is required (min 2 chars)";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          message = "Enter a valid email address";
        break;
      case "confirmEmail":
        if (value !== formData.email) message = "Emails do not match";
        break;
      case "mobilePhone":
        message = validateUSPhone(value);
        break;
      case "zipCode":
        if (!/^\d{5}$/.test(value))
          message = "ZIP code must be exactly 5 digits";
        else if (!isZipValidForState(value, formData.state))
          message = "ZIP code does not match the selected state";
        break;
      case "netMonthlyIncome":
        if (!value || Number(value) < 500)
          message = "Net income must be at least $500/mo";
        break;
      case "ssn":
        if (value.replace(/\D/g, "").length !== 9)
          message = "Valid 9-digit SSN required";
        break;
      case "confirmSsn":
        if (value !== formData.ssn) message = "SSNs do not match";
        break;
      case "routingNumber":
        if (value.length !== 9) message = "9-digit ABA routing number required";
        break;
      case "accountNumber":
        if (value.length < 4) message = "Valid account number required";
        break;
      case "confirmAccountNumber":
        if (value !== formData.accountNumber)
          message = "Account numbers do not match";
        break;
      default:
        break;
    }
    setErrors((previous) => ({ ...previous, [field]: message }));
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.loanPurpose)
      errs.loanPurpose = "Please select a loan purpose";
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

    // Phone check: length alone would allow 000/555/900 and invalid NPA/NXX values.
    const phoneError = validateUSPhone(formData.mobilePhone);
    if (phoneError) errs.mobilePhone = phoneError;

    // DOB Check (>=18)
    if (!formData.dob) {
      errs.dob = "Date of birth required";
    } else if (
      underwritingData.applicantAge !== null &&
      underwritingData.applicantAge < 18
    ) {
      errs.dob = "Must be at least 18 years old";
    }

    // Address
    if (!formData.streetAddress || formData.streetAddress.length < 5)
      errs.streetAddress = "Valid street address required";
    else if (/^p\.?\s*o\.?\s*box\b/i.test(formData.streetAddress.trim()))
      errs.streetAddress = "Primary residence cannot be a PO Box";
    if (!formData.city) errs.city = "City is required";
    if (!formData.state) errs.state = "Please select a state";
    if (!/^\d{5}$/.test(formData.zipCode))
      errs.zipCode = "ZIP code must be exactly 5 digits";
    else if (!isZipValidForState(formData.zipCode, formData.state))
      errs.zipCode = "ZIP code does not match the selected state";
    if (!formData.timeAtAddress)
      errs.timeAtAddress = "Please select your time at address";
    if (!formData.housingStatus)
      errs.housingStatus = "Please select your housing status";

    // Housing payment check
    if (["rent", "own_with_mortgage"].includes(formData.housingStatus)) {
      if (
        !formData.monthlyHousingPayment ||
        Number(formData.monthlyHousingPayment) <= 0
      ) {
        errs.monthlyHousingPayment = "Monthly payment amount required";
      }
    }

    // Employment specifics
    const isEmployed = [
      "employed_full_time",
      "employed_part_time",
      "self_employed",
    ].includes(formData.employmentStatus);
    if (!formData.employmentStatus)
      errs.employmentStatus = "Please select your employment status";
    if (!formData.primaryIncomeType)
      errs.primaryIncomeType = "Please select your primary income type";
    if (isEmployed) {
      if (!formData.employerName)
        errs.employerName = "Employer/Business name required";
      if (!formData.jobTitle) errs.jobTitle = "Job title required";
      if (!formData.employerPhone)
        errs.employerPhone = "Employer phone number required";

      if (!formData.timeAtJob)
        errs.timeAtJob = "Please select your time at job";
    }

    // Income
    if (!formData.netMonthlyIncome || Number(formData.netMonthlyIncome) < 500) {
      errs.netMonthlyIncome = "Net income must be at least $500/mo";
    }
    if (!formData.payFrequency)
      errs.payFrequency = "Please select your pay frequency";
    if (!formData.directDeposit) errs.directDeposit = "Please select Yes or No";

    if (formData.payFrequency !== "irregular") {
      if (!formData.nextPayDate) {
        errs.nextPayDate = "Next pay date is required";
      } else if (!isNextPayDateValid(formData.nextPayDate)) {
        errs.nextPayDate = "Next pay date must be within the next 35 days";
      }
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
    const errs: Record<string, string> = {};
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
    if (!formData.dlState) errs.dlState = "Please select the issuing state";
    if (!formData.dlExpiration) errs.dlExpiration = "Expiration date required";
    if (
      !formData.dlExpiration ||
      new Date(formData.dlExpiration) < new Date()
    ) {
      errs.dlExpiration = "Expiration date must be in the future";
    }

    if (!formData.hardCreditConsent)
      errs.hardCreditConsent =
        "Hard credit pull authorization required for Step 2";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
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
      if (!["Negative", "Positive"].includes(formData.accountStatus))
        errs.accountStatus = "Please select your account status";
      if (!formData.achConsent)
        errs.achConsent = "ACH authorization agreement required";
      if (!formData.accountType)
        errs.accountType = "Please select an account type";
      if (!formData.accountAge) errs.accountAge = "Please select account age";
      if (!formData.accountType)
        errs.accountType = "Please select an account type";
      if (!formData.accountStatus)
        errs.accountStatus = "Please select an account status";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const saveApplicationStep = async (stepNumber: 1 | 2 | 3) => {
    const sessionId =
      sessionStorage.getItem("fiona_application_session") ||
      crypto.randomUUID();
    sessionStorage.setItem("fiona_application_session", sessionId);

    const data =
      stepNumber === 1
        ? { ...formData, purposeDetail: formData.purposeOtherDetail }
        : stepNumber === 2
          ? formData
          : {
              ...formData,
              bankAuthMode: bankTab === "plaid" ? "instant" : "manual",
              bankName:
                bankTab === "plaid" ? plaidInstitutionName : formData.bankName,
              accountType:
                bankTab === "plaid"
                  ? plaidDetails?.accountType || ""
                  : formData.accountType,
              plaidDetails: bankTab === "plaid" ? plaidDetails : undefined,
            };

    const response = await fetch(apiUrl("/api/applications/steps"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, step: stepNumber, data }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(
        result.message || result.error || "Unable to save application",
      );
    }
    if (result.applicationId) setApplicationId(result.applicationId);
    if (result.status) setApplicationStatus(result.status);
    if (result.derivedData) setServerDerivedData(result.derivedData);
    return result as {
      applicationId?: string;
      status?: string;
      derivedData?: typeof serverDerivedData;
    };
  };

  const handleNextStep1 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep1()) return;

    setIsSubmitting(true);
    try {
      const result = await saveApplicationStep(1);
      setIsSubmitting(false);
      if (result.status === "declined") {
        setStep(4);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setShowPrequalAnimation(true);
      setTimeout(() => {
        setShowPrequalAnimation(false);
        setStep(2);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 2200);
    } catch (error) {
      setIsSubmitting(false);
      setErrors((previous) => ({
        ...previous,
        submit:
          error instanceof Error ? error.message : "Unable to save application",
      }));
    }
  };

  const handleNextStep2 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsSubmitting(true);
    try {
      const result = await saveApplicationStep(2);
      setIsSubmitting(false);
      if (result.status === "declined") {
        setStep(4);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setShowUnderwritingAnimation(true);
      setTimeout(() => {
        setShowUnderwritingAnimation(false);
        setStep(3);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 2400);
    } catch (error) {
      setIsSubmitting(false);
      setErrors((previous) => ({
        ...previous,
        submit:
          error instanceof Error
            ? error.message
            : "Unable to save identity verification",
      }));
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Verify validation passes
    if (!validateStep3()) {
      console.warn("Step 3 validation failed:", errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await saveApplicationStep(3);
      const finalAppId = result?.applicationId || applicationId;

      // 1. Set the cookie required by your middleware (valid for 1 hour)
      document.cookie =
        "applicationSubmitted=true; path=/; max-age=3600; SameSite=Lax";

      // 2. Clear all storage items right before redirect
      localStorage.removeItem("fiona_application_draft");
      localStorage.removeItem("fiona_application_id");
      localStorage.removeItem("fiona_application_step");
      sessionStorage.removeItem("fiona_application_session");

      // 3. Force hard navigation to prevent client-state sync interception
      const targetUrl = finalAppId
        ? `/thank-you?applicationId=${encodeURIComponent(finalAppId)}`
        : "/thank-you";

      window.location.href = targetUrl;
    } catch (error) {
      setIsSubmitting(false);
      console.error("Submission failed:", error);
      setErrors((previous) => ({
        ...previous,
        submit:
          error instanceof Error
            ? error.message
            : "Unable to save bank details",
      }));
    }
  };

  const startNewApplication = () => {
    sessionStorage.removeItem("fiona_application_session");
    localStorage.removeItem("fiona_application_draft");
    localStorage.removeItem("fiona_application_id");
    localStorage.removeItem("fiona_application_step");
    setFormData((previous) => {
      const values = previous as Record<string, string | number | boolean>;
      return Object.fromEntries(
        Object.keys(values).map((key) => [
          key,
          key === "loanAmount"
            ? 5000
            : key === "loanTerm"
              ? "36"
              : typeof values[key] === "boolean"
                ? false
                : "",
        ]),
      ) as typeof previous;
    });
    setApplicationId("");
    setApplicationStatus("draft");
    setServerDerivedData(null);
    setPlaidConnected(false);
    setPlaidInstitutionName("");
    setPlaidDetails(null);
    setErrors({});
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="application-shell min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 pb-16">
      <div className="application-progress-wrap">
        <div className="mx-auto max-w-5xl px-5 py-5 sm:px-8">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="application-kicker">Your application</p>
              <h1 className="application-title">
                {step === 1
                  ? "Tell us what you need"
                  : step === 2
                    ? "Verify your identity"
                    : step === 3
                      ? "Choose where to fund"
                      : "Application received"}
              </h1>
            </div>
            <span className="application-step-count">
              {step === 4 ? "Complete" : `Step ${step} of 3`}
            </span>
          </div>
          <div
            className="application-progress-track"
            aria-label={`Step ${Math.min(step, 3)} of 3`}
          >
            <span
              className="application-progress-fill"
              style={{ width: `${(Math.min(step, 3) / 3) * 100}%` }}
            />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
            {["Loan details", "Identity", "Funding"].map((label, index) => {
              const number = index + 1;
              return (
                <span
                  key={label}
                  className={
                    number <= step
                      ? "application-progress-label is-active"
                      : "application-progress-label"
                  }
                >
                  {String(number).padStart(2, "0")} {label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 pt-8 pb-12 sm:px-8">
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
              {applicationId}
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
          <form
            onSubmit={handleNextStep1}
            onBlurCapture={(event) => {
              const field = (event.target as unknown as HTMLInputElement).name;
              if (field) validateField(field);
            }}
            className="space-y-8"
          >
            {errors.submit && (
              <div
                className="rounded-xl border border-rose-500/40 bg-white px-4 py-3 text-sm text-rose-700"
                role="alert"
              >
                {errors.submit}
              </div>
            )}
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
                  <span className="text-2xl font-bold text-white bg-emerald border border-emerald-800/50 px-3 py-1 rounded-xl">
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
                    <option value="">Select a purpose</option>
                    {LOAN_PURPOSES.map((purpose) => (
                      <option key={purpose} value={purpose}>
                        {purpose}
                      </option>
                    ))}
                  </select>
                  {errors.loanPurpose && (
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                      {errors.loanPurpose}
                    </p>
                  )}
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
                    <p className="text-xs text-red-500 mt-1">
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
                    name="firstName"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    placeholder="Jane"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Middle Name.
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
                    name="lastName"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    placeholder="Doe"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
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
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) =>
                      handleInputChange("email", e.target.value.toLowerCase())
                    }
                    placeholder="jane.doe@example.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
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
                    name="confirmEmail"
                    onPaste={(e) => e.preventDefault()}
                    value={formData.confirmEmail}
                    onChange={(e) =>
                      handleInputChange(
                        "confirmEmail",
                        e.target.value.toLowerCase(),
                      )
                    }
                    placeholder="jane.doe@example.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  {errors.confirmEmail && (
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
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
                    name="mobilePhone"
                    inputMode="numeric"
                    autoComplete="tel"
                    value={formData.mobilePhone}
                    onChange={(e) =>
                      handleInputChange("mobilePhone", e.target.value)
                    }
                    placeholder="(555) 000-0000"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  {errors.mobilePhone && (
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
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
                    name="dob"
                    value={formData.dob}
                    onChange={(e) => handleInputChange("dob", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
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
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
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
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
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
                    <option value="">Select a state</option>
                    {US_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                      {errors.state}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    ZIP Code <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    maxLength={5}
                    autoComplete="postal-code"
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
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
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
                    <option value="">Select time at address</option>
                    {TIME_AT_ADDRESS.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  {errors.timeAtAddress && (
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                      {errors.timeAtAddress}
                    </p>
                  )}
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
                    <option value="">Select housing status</option>
                    {HOUSING_STATUSES.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  {errors.housingStatus && (
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                      {errors.housingStatus}
                    </p>
                  )}
                </div>
              </div>

              {["rent", "own_with_mortgage"].includes(
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
                      name="monthlyHousingPayment"
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
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
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
                    <option value="">Select employment status</option>
                    {EMPLOYMENT_STATUSES.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  {errors.employmentStatus && (
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                      {errors.employmentStatus}
                    </p>
                  )}
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
                    <option value="">Select income type</option>
                    {PRIMARY_INCOME_TYPES.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  {errors.primaryIncomeType && (
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                      {errors.primaryIncomeType}
                    </p>
                  )}
                </div>
              </div>

              {/* Conditional Employer Fields */}
              {[
                "employed_full_time",
                "employed_part_time",
                "self_employed",
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
                        <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
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
                        <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
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
                      {errors.employerPhone && (
                        <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                          {errors.employerPhone}
                        </p>
                      )}
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
                        <option value="">Select Time at Current Job</option>
                        {TIME_AT_ADDRESS.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                      {errors.timeAtJob && (
                        <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                          {errors.timeAtJob}
                        </p>
                      )}
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
                      name="netMonthlyIncome"
                      inputMode="numeric"
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
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
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
                    <option value="">Select pay frequency</option>
                    {PAY_FREQUENCIES.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  {errors.payFrequency && (
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                      {errors.payFrequency}
                    </p>
                  )}
                </div>

                {formData.payFrequency !== "irregular" && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Next Pay Date <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="date"
                      name="nextPayDate"
                      value={formData.nextPayDate}
                      min={new Date(Date.now() + 86400000)
                        .toISOString()
                        .slice(0, 10)}
                      max={new Date(Date.now() + 35 * 86400000)
                        .toISOString()
                        .slice(0, 10)}
                      onChange={(e) =>
                        handleInputChange("nextPayDate", e.target.value)
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                    {errors.nextPayDate && (
                      <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                        {errors.nextPayDate}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Is your income deposited directly into your bank account?{" "}
                    <span className="text-emerald-400">*</span>
                  </label>
                  <div className="flex gap-5 pt-2 text-sm text-slate-200">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="directDeposit"
                        value="Yes"
                        checked={formData.directDeposit === "Yes"}
                        onChange={(e) =>
                          handleInputChange("directDeposit", e.target.value)
                        }
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="directDeposit"
                        value="No"
                        checked={formData.directDeposit === "No"}
                        onChange={(e) =>
                          handleInputChange("directDeposit", e.target.value)
                        }
                      />
                      No
                    </label>
                  </div>
                  {errors.directDeposit && (
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                      {errors.directDeposit}
                    </p>
                  )}
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
                    checked={Boolean(
                      (formData as Record<string, unknown>)[c.id],
                    )}
                    onChange={(e) => handleInputChange(c.id, e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span>{c.text}</span>
                </label>
              ))}
              {(errors.tcpaConsent ||
                errors.esignConsent ||
                errors.softCreditConsent ||
                errors.privacyConsent ||
                errors.termsConsent) && (
                <p className="text-xs text-rose-400 font-semibold pt-1">
                  You must agree to all required consents to proceed.
                </p>
              )}
            </section>

            {/* Submit Step 1 Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-linear-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-base rounded-xl shadow-xl shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-300 transition-all flex items-center justify-center gap-2"
            >
              <span>
                {isSubmitting
                  ? "Processing..."
                  : "See Pre-Qualified Loan Offers"}
              </span>
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
            </button>
          </form>
        )}

        {/* ========================================================================= */}
        {/* STEP 2 FORM — Identity Verification (SSN & Driver's License)              */}
        {/* ========================================================================= */}
        {!showPrequalAnimation && !showUnderwritingAnimation && step === 2 && (
          <form
            onSubmit={handleNextStep2}
            onBlurCapture={(event) => {
              const field = (event.target as unknown as HTMLInputElement).name;
              if (field) validateField(field);
            }}
            className="space-y-6 animate-fadeIn"
          >
            <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-white">
                  Soft-Pull Pre-Qualification Passed!
                </h3>
                <p className="text-xs text-slate-300">
                  Application ID: {applicationId} — Soft offers available.
                  Complete verification to lock in your rates.
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
                      name="ssn"
                      maxLength={11}
                      inputMode="numeric"
                      autoComplete="off"
                      data-sensitive="true"
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
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
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
                    name="confirmSsn"
                    maxLength={11}
                    inputMode="numeric"
                    autoComplete="off"
                    data-sensitive="true"
                    onPaste={(e) => e.preventDefault()}
                    value={formData.confirmSsn}
                    onChange={(e) =>
                      handleInputChange("confirmSsn", e.target.value)
                    }
                    placeholder="Paste disabled"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                  {errors.confirmSsn && (
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
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
                    name="dlNumber"
                    autoComplete="off"
                    data-sensitive="true"
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
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
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
                    <option value="">Select issuing state</option>
                    {US_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  {errors.dlState && (
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                      {errors.dlState}
                    </p>
                  )}
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
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
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
              {/* <button
                type="button"
                onClick={() => setStep(1)}
                className="py-4 px-6 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm rounded-xl transition-all flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Step 1
              </button> */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-4 bg-linear-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-base rounded-xl shadow-xl shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-300 transition-all flex items-center justify-center gap-2"
              >
                <span>
                  {isSubmitting
                    ? "Verifying..."
                    : "Verify Identity & Run Underwriting"}
                </span>
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <ArrowRight className="w-5 h-5" />
                )}
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
            onBlurCapture={(event) => {
              const field = (event.target as unknown as HTMLInputElement).name;
              if (field) validateField(field);
            }}
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
                  Monthly: ${underwritingData.estimatedMonthlyPayment}/mo
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
                    <span>
                      {plaidInstitutionName || "Connected bank account"}{" "}
                      connected
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={async () => {
                      const token = await createPlaidLinkToken();
                      if (token) {
                        setOpenPlaidWhenReady(true);
                      }
                    }}
                    className="py-3 px-6 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs rounded-xl border border-slate-700 transition-all inline-flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" /> Launch Plaid Link
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
                      name="routingNumber"
                      maxLength={9}
                      inputMode="numeric"
                      autoComplete="off"
                      data-sensitive="true"
                      value={formData.routingNumber}
                      onChange={(e) =>
                        handleInputChange("routingNumber", e.target.value)
                      }
                      placeholder="Try 021000021"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                    />
                    {errors.routingNumber && (
                      <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
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
                      name="accountNumber"
                      inputMode="numeric"
                      autoComplete="off"
                      data-sensitive="true"
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
                      <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
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
                      name="confirmAccountNumber"
                      inputMode="numeric"
                      onPaste={(e) => e.preventDefault()}
                      autoComplete="off"
                      data-sensitive="true"
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
                      <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
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
                      {["checking", "savings"].map((type) => (
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
                    {errors.accountType && (
                      <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                        {errors.accountType}
                      </p>
                    )}
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
                      <option value="">Select account age</option>
                      {ACCOUNT_AGE_OPTIONS.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                    {errors.accountAge && (
                      <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                        {errors.accountAge}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Account Status <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    value={formData.accountStatus}
                    onChange={(e) =>
                      handleInputChange("accountStatus", e.target.value)
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  >
                    <option value="">Select account status</option>
                    <option value="Positive">Positive</option>
                    <option value="Negative">Negative</option>
                  </select>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Self-reported account balance status.
                  </p>
                  {errors.accountStatus && (
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                      {errors.accountStatus}
                    </p>
                  )}
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
                className="flex-1 py-4 bg-linear-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-base rounded-xl shadow-xl shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-300 transition-all flex items-center justify-center gap-2"
              >
                <span>
                  {isSubmitting
                    ? "Finalizing..."
                    : "Finalize & Authorize Loan Deposit"}
                </span>
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-5 h-5" />
                )}
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
                {applicationStatus === "declined"
                  ? "Application Decision"
                  : "Loan Application Finalized!"}
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                {applicationStatus === "declined"
                  ? "Your application is not eligible to proceed at this time."
                  : "Your loan has been successfully submitted and scheduled for funding."}
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-left space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Application ID:</span>
                <span className="text-emerald-400 font-bold">
                  {applicationId}
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
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-400 font-bold">
                  {applicationStatus}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Applicant:</span>
                <span className="text-white">
                  {formData.firstName} {formData.lastName}
                </span>
              </div>
              {applicationStatus !== "declined" && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Est. Deposit Arrival:</span>
                  <span className="text-emerald-400 font-bold">
                    1–2 Business Days
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => router.push("/loan-status")}
              className="py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-all inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Check Application Status
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
