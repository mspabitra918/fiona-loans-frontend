import { z } from "zod";
import { LOAN_PURPOSES } from "@/lib/constants";

const LOAN_PURPOSE_VALUES = LOAN_PURPOSES.map(
  (purpose) => purpose.label,
) as unknown as [string, ...string[]];
const NAME_PATTERN = /^[A-Za-z .'-]+$/;
const PHONE_PATTERN = /^(?!000|555|900)\d{3}[2-9]\d{6}$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isAdultWithinRange(value: string): boolean {
  if (!DATE_PATTERN.test(value)) return false;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return false;
  const now = new Date();
  const youngest = new Date(
    now.getFullYear() - 18,
    now.getMonth(),
    now.getDate(),
  );
  const oldest = new Date(
    now.getFullYear() - 100,
    now.getMonth(),
    now.getDate(),
  );
  return date <= youngest && date >= oldest;
}

const requiredConsent = z.literal(true, {
  message: "This consent is required",
});

export const step1Schema = z
  .object({
    loanAmount: z.number().int().min(2000).max(10000),
    loanPurpose: z.enum(LOAN_PURPOSE_VALUES),
    purposeDetail: z.string().trim().min(3).max(120).optional(),
    loanTerm: z.enum(["12", "24", "36", "48"]),
    firstName: z.string().trim().min(2).max(40).regex(NAME_PATTERN),
    middleInitial: z.string().regex(/^[A-Za-z]?$/),
    lastName: z.string().trim().min(2).max(40).regex(NAME_PATTERN),
    email: z.string().trim().email(),
    confirmEmail: z.string().trim().email(),
    mobilePhone: z
      .string()
      .transform((value) => value.replace(/\D/g, ""))
      .pipe(z.string().regex(PHONE_PATTERN)),
    dob: z
      .string()
      .refine(
        isAdultWithinRange,
        "Date of birth must be between 18 and 100 years ago",
      ),
    streetAddress: z
      .string()
      .trim()
      .min(5)
      .max(100)
      .refine(
        (value) => !/^p\.?\s*o\.?\s*box\b/i.test(value),
        "Primary residence cannot be a PO Box",
      ),
    aptUnit: z.string().max(20),
    city: z
      .string()
      .trim()
      .min(2)
      .max(50)
      .regex(/^[A-Za-z .'-]+$/),
    state: z.string().length(2),
    zipCode: z.string().regex(/^\d{5}$/),
    timeAtAddress: z.string().min(1),
    housingStatus: z.string().min(1),
    monthlyHousingPayment: z.coerce.number().int().min(0).max(15000).optional(),
    employmentStatus: z.string().min(1),
    primaryIncomeType: z.string().min(1),
    employerName: z.string().trim().min(2).max(60).optional(),
    jobTitle: z.string().trim().min(2).max(50).optional(),
    employerPhone: z
      .string()
      .transform((value) => value.replace(/\D/g, ""))
      .pipe(z.string().regex(PHONE_PATTERN))
      .optional(),
    timeAtJob: z.string().optional(),
    netMonthlyIncome: z.coerce.number().int().min(500).max(50000),
    payFrequency: z.string().min(1),
    nextPayDate: z.string().optional(),
    directDeposit: z.enum(["Yes", "No"]),
    additionalIncome: z.coerce.number().int().min(0).max(20000),
    additionalIncomeSource: z.string().trim().min(2).max(50).optional(),
    consentTCPA: requiredConsent,
    consentESIGN: requiredConsent,
    consentSoftPull: requiredConsent,
    consentPrivacy: requiredConsent,
    consentTerms: requiredConsent,
  })
  .superRefine((data, ctx) => {
    if (data.email.toLowerCase() !== data.confirmEmail.toLowerCase()) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmEmail"],
        message: "Email addresses must match",
      });
    }
    if (
      ["Rent", "Own with mortgage"].includes(data.housingStatus) &&
      data.monthlyHousingPayment === undefined
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["monthlyHousingPayment"],
        message: "Monthly housing payment is required",
      });
    }
    if (
      [
        "Employed — Full Time",
        "Employed — Part Time",
        "Self-Employed",
        "Active Military",
      ].includes(data.employmentStatus)
    ) {
      for (const field of [
        "employerName",
        "jobTitle",
        "employerPhone",
        "timeAtJob",
      ] as const) {
        if (!data[field])
          ctx.addIssue({
            code: "custom",
            path: [field],
            message: "This field is required",
          });
      }
    }
    if (data.loanPurpose === "Other Personal Expenses" && !data.purposeDetail) {
      ctx.addIssue({
        code: "custom",
        path: ["purposeDetail"],
        message: "Please describe your purpose",
      });
    }
    if (data.additionalIncome > 0 && !data.additionalIncomeSource) {
      ctx.addIssue({
        code: "custom",
        path: ["additionalIncomeSource"],
        message: "Please enter the income source",
      });
    }
    if (data.payFrequency !== "Irregular" && !data.nextPayDate) {
      ctx.addIssue({
        code: "custom",
        path: ["nextPayDate"],
        message: "Next pay date is required",
      });
    }
  });

export const step2Schema = z
  .object({
    ssn: z
      .string()
      .regex(/^(?!000|666|9\d\d)\d{3}-?(?!00)\d{2}-?(?!0000)\d{4}$/),
    confirmSsn: z.string(),
    dlNumber: z.string().regex(/^[A-Za-z0-9]{1,20}$/),
    dlState: z.string().length(2),
    dlExpiration: z
      .string()
      .refine(
        (value) =>
          DATE_PATTERN.test(value) &&
          new Date(`${value}T00:00:00`) > new Date(),
        "License must not be expired",
      ),
    consentHardPull: requiredConsent,
  })
  .superRefine((data, ctx) => {
    if (data.ssn.replace(/\D/g, "") !== data.confirmSsn.replace(/\D/g, "")) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmSsn"],
        message: "SSNs must match",
      });
    }
  });

export const step3Schema = z
  .object({
    routingNumber: z.string().regex(/^\d{9}$/),
    bankName: z.string().min(2),
    accountNumber: z.string().regex(/^\d{4,17}$/),
    confirmAccountNumber: z.string(),
    accountType: z.enum(["Checking", "Savings"]),
    accountStatus: z.enum(["Positive", "Negative"]),
    accountAge: z.string().min(1),
    consentACH: requiredConsent,
  })
  .superRefine((data, ctx) => {
    if (data.accountNumber !== data.confirmAccountNumber) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmAccountNumber"],
        message: "Account numbers must match",
      });
    }
  });

export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "First name contains invalid characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Last name contains invalid characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(
      /^\(?\d{3}\)?\s?\d{3}[-.\s]?\d{4}$/,
      "Please enter a valid phone number",
    ),
  dateOfBirth: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Please enter date as MM/DD/YYYY")
    .refine(
      (dob) => {
        const [month, day, year] = dob.split("/").map(Number);
        const date = new Date(year, month - 1, day);
        if (date.getMonth() !== month - 1 || date.getDate() !== day)
          return false;
        const now = new Date();
        const age = now.getFullYear() - date.getFullYear();
        const monthDiff = now.getMonth() - date.getMonth();
        const actualAge =
          monthDiff < 0 || (monthDiff === 0 && now.getDate() < date.getDate())
            ? age - 1
            : age;
        return actualAge >= 18 && actualAge <= 100;
      },
      { message: "You must be at least 18 years old" },
    ),
});

export const identificationSchema = z.object({
  ssn: z
    .string()
    .min(1, "This field is required")
    .refine(
      (val) =>
        // US SSN: XXX-XX-XXXX
        /^\d{3}-?\d{2}-?\d{4}$/.test(val),
      { message: "Please enter a valid identification number" },
    ),
  driverLicenseNumber: z
    .string()
    .min(4, "Please enter a valid ID number")
    .max(20, "ID number is too long"),
  driverLicenseState: z.string().min(2, "Please select a state"),
});

export const addressSchema = z.object({
  streetAddress: z
    .string()
    .min(5, "Please enter a valid street address")
    .max(100, "Address is too long"),
  city: z
    .string()
    .min(2, "Please enter a valid city")
    .max(50, "City name is too long"),
  state: z.string().min(2, "Please select a state/province"),
  zipCode: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
  country: z.enum(["US"]),
});

export const employmentSchema = z.object({
  employmentStatus: z.enum(["employed", "self-employed", "retired", "other"]),
  employerName: z
    .string()
    .min(2, "Please enter your employer's name")
    .max(100, "Employer name is too long"),
  jobTitle: z
    .string()
    .min(2, "Please enter your job title")
    .max(50, "Job title is too long"),
  monthlyIncome: z
    .number()
    .min(500, "Monthly income must be at least $500")
    .max(1000000, "Please enter a valid monthly income"),
  yearsEmployed: z
    .number()
    .min(0, "Years employed cannot be negative")
    .max(50, "Please enter a valid number of years"),
});

export const loanDetailsSchema = z.object({
  loanAmount: z
    .number()
    .min(2000, "Minimum loan amount is $2,000")
    .max(50000, "Maximum loan amount is $50,000"),
  loanPurpose: z.enum(LOAN_PURPOSE_VALUES),
  loanTerm: z.number().refine((v) => [12, 24, 36, 48, 60].includes(v), {
    message: "Please select a valid loan term",
  }),
});

export const bankingSchema = z.object({
  routingNumber: z
    .string()
    .min(1, "This field is required")
    .refine(
      (val) => /^\d{9}$/.test(val) || /^[A-Z]{4}0[A-Z0-9]{6}$/i.test(val),
      { message: "Enter a valid 9-digit routing number" },
    ),
  accountNumber: z
    .string()
    .min(6, "Account number must be at least 6 digits")
    .max(20, "Account number is too long")
    .regex(/^\d+$/, "Account number must contain only digits"),
  bankAccountAge: z
    .string()
    .min(1, "Please select or enter your bank account age"),
  bankBalanceStatus: z.enum(["positive_balance", "overdrawn"], {
    message: "Please select your bank account balance status",
  }),
  accountType: z.enum(["checking", "savings"]),
  bankName: z.string().min(2, "Bank name is required"),
});

export const consentSchema = z.object({
  tcpaConsent: z.literal(true, {
    message: "You must agree to the TCPA consent",
  }),
  privacyConsent: z.literal(true, {
    message: "You must agree to the Privacy Policy",
  }),
  creditCheckConsent: z.literal(true, {
    message: "You must consent to the credit check",
  }),
});

export function extractFieldErrors(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (key && typeof key === "string") {
      fieldErrors[key] = issue.message;
    }
  }
  return fieldErrors;
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim();
}
