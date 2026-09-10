export const SITE_NAME = "Fiona Loans";
export const SITE_URL = "https://www.fionaloans.com";
export const SITE_DESCRIPTION =
  "Fiona Loans is a direct personal loan provider offering competitive rates for debt consolidation, home improvement, medical expenses, and more. Apply online in minutes.";
export const BUSINESS_EMAIL = "support@fionaloans.com";

export const BUSINESS_PHONE = "(747) 208-0334";

/** E.164 form of BUSINESS_PHONE, for use in `tel:` hrefs. */
export const BUSINESS_PHONE_TEL = "+17472080334";

export const BUSINESS_ADDRESS = {
  street: "5101 Santa Monica Blvd Ste 8",
  city: "Los Angeles",
  state: "CA",
  zip: "90029",
  country: "US",
};

export const BUSINESS_ADDRESS_LINE = `${BUSINESS_ADDRESS.street}, ${BUSINESS_ADDRESS.city}, ${BUSINESS_ADDRESS.state} ${BUSINESS_ADDRESS.zip}`;

export const BUSINESS_HOURS = {
  monday_friday: "06 AM - 4 PM PST",
  saturday: "Closed",
  sunday: "Closed",
};

/** Single-line business hours string used across header, footer, and contact pages. */
export const BUSINESS_HOURS_LINE = `Mon - Fri: ${BUSINESS_HOURS.monday_friday}`;

export const BUSINESS_TOLL_FREE = "(747) 208-0334";

export const LOAN_LIMITS = {
  minAmount: 1000,
  maxAmount: 10000,
  minTerm: 12,
  maxTerm: 48,
  minAPR: 10,
  maxAPR: 10,
};

export const LOAN_PURPOSES = [
  ...[
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
  ].map((label) => ({ value: label, label })),
];

export const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
  { value: "DC", label: "District of Columbia" },
];

export const ALLOWED_COUNTRIES = ["US"];

export const EMPLOYMENT_STATUSES = [
  { value: "employed", label: "Employed" },
  { value: "self-employed", label: "Self-Employed" },
  { value: "retired", label: "Retired" },
  { value: "other", label: "Other" },
];

export const ACCOUNT_TYPES = [
  { value: "checking", label: "Checking" },
  { value: "savings", label: "Savings" },
];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/rates-and-fees", label: "Rates & Fees" },
  { href: "/about", label: "About Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/loan-status", label: "Loan Status" },
  { href: "/contact", label: "Contact" },
];

export const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/fair-lending", label: "Fair Lending Statement" },
  { href: "/direct-lender-disclosure", label: "Direct Lender Disclosure" },
  { href: "/state-licenses", label: "State Licenses & Disclosures" },
  { href: "/e-sign-consent", label: "E-Sign Consent" },
  { href: "/glba-privacy-notice", label: "Financial Privacy Notice (GLBA)" },
  { href: "/patriot-act-notice", label: "USA PATRIOT Act Notice" },
  { href: "/sms-terms", label: "SMS Terms (TCPA)" },
  { href: "/site-map", label: "Sitemap" },
];
