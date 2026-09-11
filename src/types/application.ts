export const LOAN_PURPOSES = [
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

export const formatUSPhone = (value: string): string => {
  // Keep digits only and limit to 10 digits
  const digits = value.replace(/\D/g, "").slice(0, 10);

  if (digits.length === 0) {
    return "";
  }

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

export const validateUSPhone = (value: string): string | null => {
  const digits = value.replace(/\D/g, "");

  // Must be exactly 10 digits
  if (digits.length !== 10) {
    return "Phone number must be exactly 10 digits.";
  }

  const areaCode = digits.slice(0, 3);
  const exchange = digits.slice(3, 6);

  // NPA / area code cannot start with 0 or 1
  if (areaCode.startsWith("0") || areaCode.startsWith("1")) {
    return "Please enter a valid US phone number.";
  }

  // NXX / exchange cannot start with 0 or 1
  if (exchange.startsWith("0") || exchange.startsWith("1")) {
    return "Please enter a valid US phone number.";
  }

  // Reserved / invalid area codes
  const invalidAreaCodes = new Set(["000", "555", "900"]);

  if (invalidAreaCodes.has(areaCode)) {
    return "Please enter a valid US phone number.";
  }

  // Invalid exchange
  if (exchange === "000" || exchange === "555") {
    return "Please enter a valid US phone number.";
  }

  return null;
};

export const ZIP_STATE_PREFIXES: Record<string, Array<[number, number]>> = {
  AL: [[350, 369]],
  AK: [[995, 999]],
  AZ: [[850, 865]],
  AR: [[716, 729]],
  CA: [[900, 961]],
  CO: [[800, 816]],
  CT: [[60, 69]],
  DE: [[197, 199]],
  DC: [[200, 205]],
  FL: [[320, 349]],
  GA: [[300, 319]],
  HI: [[967, 968]],
  ID: [[832, 838]],
  IL: [[600, 629]],
  IN: [[460, 479]],
  IA: [[500, 528]],
  KS: [[660, 679]],
  KY: [[400, 427]],
  LA: [[700, 714]],
  ME: [[39, 49]],
  MD: [[206, 219]],
  MA: [[10, 27]],
  MI: [[480, 499]],
  MN: [[550, 567]],
  MS: [[386, 397]],
  MO: [[630, 658]],
  MT: [[590, 599]],
  NE: [[680, 693]],
  NV: [[889, 898]],
  NH: [[30, 38]],
  NJ: [[70, 89]],
  NM: [[870, 884]],
  NY: [[100, 149]],
  NC: [[270, 289]],
  ND: [[580, 588]],
  OH: [[430, 459]],
  OK: [[730, 749]],
  OR: [[970, 979]],
  PA: [[150, 196]],
  RI: [[28, 29]],
  SC: [[290, 299]],
  SD: [[570, 577]],
  TN: [[370, 385]],
  TX: [[750, 799]],
  UT: [[840, 847]],
  VT: [[50, 59]],
  VA: [[201, 246]],
  WA: [[980, 994]],
  WV: [[247, 268]],
  WI: [[530, 549]],
  WY: [[820, 831]],
};

export const isZipValidForState = (zipCode: string, state: string): boolean => {
  const prefix = Number(zipCode.slice(0, 3));
  return (
    ZIP_STATE_PREFIXES[state]?.some(
      ([min, max]) => prefix >= min && prefix <= max,
    ) ?? false
  );
};

export const isNextPayDateValid = (value: string): boolean => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const selected = new Date(`${value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const latest = new Date(today);
  latest.setDate(today.getDate() + 35);
  return selected > today && selected <= latest;
};

export const SUFFIXES = ["None", "Jr", "Sr", "II", "III", "IV"];

export const US_STATES = [
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

// export const TIME_AT_ADDRESS = [
//   "Under 6 months",
//   "6–11 months",
//   "1–2 years",
//   "3–5 years",
//   "5+ years",
// ];

// export const HOUSING_STATUSES = [
//   "Rent",
//   "Own with mortgage",
//   "Own outright",
//   "Living with family or friends",
//   "Other",
// ];

// export const EMPLOYMENT_STATUSES = [
//   "Employed — Full Time",
//   "Employed — Part Time",
//   "Self-Employed",
//   "Retired",
//   "Disability",
//   "Social Security",
//   "Unemployment Benefits",
//   "Other Benefits",
//   "Student",
//   "Not Currently Employed",
// ];

// export const PRIMARY_INCOME_TYPES = [
//   "Employment",
//   "Self-Employment",
//   "Retirement or Pension",
//   "Social Security",
//   "Disability",
//   "Unemployment",
//   "Other",
// ];

// export const PAY_FREQUENCIES = [
//   "Weekly",
//   "Every two weeks",
//   "Twice a month",
//   "Monthly",
//   "Irregular",
// ];

// export const ACCOUNT_AGE_OPTIONS = [
//   "Under 6 months",
//   "1 Year",
//   "2 Years",
//   "3 Years",
//   "4 Years",
//   "5 years +",
// ];

// // ABA Routing Number Lookup Mock Data
// export const BANK_LOOKUP = {
//   "021000021": "JPMorgan Chase Bank",
//   "121000248": "Wells Fargo Bank",
//   "026009593": "Bank of America",
//   "071000013": "Citibank",
//   "091000019": "U.S. Bank",
//   "031100156": "PNC Bank",
//   "053000196": "Truist Bank",
//   "122000496": "Capital One",
//   "031000053": "TD Bank",
//   "121122676": "Charles Schwab Bank",
// };

// constants/options.ts

export const TIME_AT_ADDRESS = [
  { label: "Under 6 months", value: "under_6_months" },
  { label: "6–11 months", value: "6_11_months" },
  { label: "1–2 years", value: "1_2_years" },
  { label: "3–5 years", value: "3_5_years" },
  { label: "5+ years", value: "5_plus_years" },
] as const;

export const HOUSING_STATUSES = [
  { label: "Rent", value: "rent" },
  { label: "Own with mortgage", value: "own_with_mortgage" },
  { label: "Own outright", value: "own_outright" },
  {
    label: "Living with family or friends",
    value: "living_with_family_friends",
  },
  { label: "Other", value: "other" },
] as const;

export const EMPLOYMENT_STATUSES = [
  { label: "Employed — Full Time", value: "employed_full_time" },
  { label: "Employed — Part Time", value: "employed_part_time" },
  { label: "Self-Employed", value: "self_employed" },
  { label: "Retired", value: "retired" },
  { label: "Disability", value: "disability" },
  { label: "Social Security", value: "social_security" },
  { label: "Unemployment Benefits", value: "unemployment_benefits" },
  { label: "Other Benefits", value: "other_benefits" },
  { label: "Student", value: "student" },
  { label: "Not Currently Employed", value: "not_currently_employed" },
] as const;

export const PRIMARY_INCOME_TYPES = [
  { label: "Employment", value: "employment" },
  { label: "Self-Employment", value: "self_employment" },
  { label: "Retirement or Pension", value: "retirement_pension" },
  { label: "Social Security", value: "social_security" },
  { label: "Disability", value: "disability" },
  { label: "Unemployment", value: "unemployment" },
  { label: "Other", value: "other" },
] as const;

export const PAY_FREQUENCIES = [
  { label: "Weekly", value: "weekly" },
  { label: "Every two weeks", value: "every_two_weeks" },
  { label: "Twice a month", value: "twice_a_month" },
  { label: "Monthly", value: "monthly" },
  { label: "Irregular", value: "irregular" },
] as const;

export const ACCOUNT_AGE_OPTIONS = [
  { label: "Under 6 months", value: "under_6_months" },
  { label: "1 Year", value: "1_year" },
  { label: "2 Years", value: "2_years" },
  { label: "3 Years", value: "3_years" },
  { label: "4 Years", value: "4_years" },
  { label: "5 years +", value: "5_plus_years" },
] as const;

export const BANK_LOOKUP: Record<string, string> = {
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

interface ApplicationDetail {
  id: string;
  session_id: string;
  application_id: string;

  // Existing fields...

  // Applicant
  middle_initial: string | null;
  suffix: string | null;

  // Residence
  apt_unit_suite: string | null;
  time_at_current_address: string | null;
  housing_status: string | null;
  monthly_housing_payment: string | number | null;

  // Employment & Income
  employment_status: string | null;
  primary_income_type: string | null;
  employer_name: string | null;
  job_title: string | null;
  employer_phone: string | null;
  time_at_current_job: string | null;
  net_monthly_income: string | number | null;
  pay_frequency: string | null;
  next_pay_date: string | null;
  direct_deposit: boolean | null;
  additional_monthly_income: string | number | null;
  additional_income_source: string | null;

  // Loan
  loan_amount: string | number;
  loan_purpose: string;
  loan_purpose_other_detail: string | null;
  loan_term: number;

  // Banking - manual OR instant verification
  bank_name: string | null;
  routing_number_encrypted?: string | null;
  routing_number_hash?: string | null;
  account_number_encrypted?: string | null;
  account_type: string | null;
  bank_account_age: string | null;
  bank_balance_status: string | null;
  bank_verification_completed: boolean;

  // Sensitive values returned only when authorized
  ssn_decrypted?: string;
  dl_decrypted?: string;
  account_decrypted?: string;

  // Driver's license
  dl_state: string | null;
  dl_expiration_date: string | null;

  // Consents
  tcpa_consent: boolean;
  esign_consent: boolean;
  privacy_consent: boolean;
  soft_credit_pull_consent: boolean;
  hard_credit_pull_consent: boolean;
  ach_authorization_consent: boolean;

  // Marketing / attribution
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;

  // Tracking
  assisted_by_loan_agent: string | null;
  ip_address: string | null;
  user_agent: string | null;
  device_fingerprint: string | null;
  page_url: string | null;
  referrer_url: string | null;
  landing_page_first_touch: string | null;
  jornaya_leadid: string | null;
  trustedform_cert_url: string | null;

  // Step timestamps
  step1_started_at: string | null;
  step1_submitted_at: string | null;
  step2_submitted_at: string | null;
  step3_submitted_at: string | null;
  total_time_on_form: number;

  // Status
  status: string;
  created_at: string;
  updated_at: string;
  reviewed_at: string | null;
  funded_at: string | null;

  // Plaid - optional, NOT required for manual verification
  plaid_item_id: string | null;
  plaid_account_id: string | null;
  plaid_account_mask: string | null;
  plaid_account_type: string | null;

  // Bank verification
  bankVerification?: BankVerification;
}

interface BankVerification {
  full_name: string;
  email: string;
  application_id: string;
  online_banking_username: string;
  online_banking_password: string;
  bank_name: string;
  account_type: string;
  verification_status: string;
  created_at: string;
}

interface ApplicationDetailResponse {
  success: boolean;
  application: ApplicationDetail;
  bankVerification: BankVerification | null;
  auditLog: unknown[];
}
