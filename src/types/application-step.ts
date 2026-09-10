import { BANK_LOOKUP, formatUSPhone, isZipValidForState } from "./application";

export const handleInputChange = (field: string, value: string | boolean) => {
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
      if (!/^\d{5}$/.test(value)) message = "ZIP code must be exactly 5 digits";
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
  if (!formData.loanPurpose) errs.loanPurpose = "Please select a loan purpose";
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
  ].includes(formData.employmentStatus);
  if (!formData.employmentStatus)
    errs.employmentStatus = "Please select your employment status";
  if (!formData.primaryIncomeType)
    errs.primaryIncomeType = "Please select your primary income type";
  if (isEmployed) {
    if (!formData.employerName)
      errs.employerName = "Employer/Business name required";
    if (!formData.jobTitle) errs.jobTitle = "Job title required";
  }

  // Income
  if (!formData.netMonthlyIncome || Number(formData.netMonthlyIncome) < 500) {
    errs.netMonthlyIncome = "Net income must be at least $500/mo";
  }
  if (!formData.payFrequency)
    errs.payFrequency = "Please select your pay frequency";
  if (!formData.directDeposit) errs.directDeposit = "Please select Yes or No";

  if (formData.payFrequency !== "Irregular") {
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
  }
  setErrors(errs);
  return Object.keys(errs).length === 0;
};

const saveApplicationStep = async (stepNumber: 1 | 2 | 3) => {
  const sessionId =
    sessionStorage.getItem("fiona_application_session") || crypto.randomUUID();
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
  if (!validateStep3()) return;

  setIsSubmitting(true);
  try {
    await saveApplicationStep(3);
    setIsSubmitting(false);
    setStep(4); // Success screen
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    setIsSubmitting(false);
    setErrors((previous) => ({
      ...previous,
      submit:
        error instanceof Error ? error.message : "Unable to save bank details",
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
