import type { ReactNode } from "react";
import { SITE_NAME, LOAN_LIMITS } from "@/lib/constants";

export type Faq = {
  question: string;
  /** Plain-text form used for the FAQPage JSON-LD schema. */
  plainAnswer: string;
  answer: ReactNode;
};

export const FAQS: Faq[] = [
  {
    question: `What credit score do I need to get a loan with ${SITE_NAME}?`,
    plainAnswer: `${SITE_NAME} accepts all credit scores. We work with borrowers across the entire credit spectrum to provide accessible financing.`,
    answer: (
      <>
        {SITE_NAME} accepts <strong>all credit scores</strong>. We work with
        borrowers across the entire credit spectrum to provide accessible
        financing.
      </>
    ),
  },
  {
    question: "How much can I borrow?",
    plainAnswer: `We offer personal loans starting at a minimum of $${LOAN_LIMITS.minAmount.toLocaleString()} up to a maximum of $${LOAN_LIMITS.maxAmount.toLocaleString()}.`,
    answer: (
      <>
        We offer personal loans starting at a minimum of{" "}
        <strong>${LOAN_LIMITS.minAmount.toLocaleString()}</strong> up to a
        maximum of <strong>${LOAN_LIMITS.maxAmount.toLocaleString()}</strong>.
      </>
    ),
  },
  {
    question: "What is the interest rate on a Fiona Loan?",
    plainAnswer: `Every borrower receives a fixed ${LOAN_LIMITS.minAPR}% Annual Percentage Rate (APR). We do not use variable rates.`,
    answer: (
      <>
        Every borrower receives a{" "}
        <strong>
          fixed {LOAN_LIMITS.minAPR}% Annual Percentage Rate (APR)
        </strong>
        . We do not use variable rates.
      </>
    ),
  },
  {
    question: `What states does ${SITE_NAME} operate in?`,
    plainAnswer: `${SITE_NAME} provides personal loans to borrowers in all 50 states within the U.S.`,
    answer: (
      <>
        {SITE_NAME} provides personal loans to borrowers in{" "}
        <strong>all 50 states</strong> within the U.S.
      </>
    ),
  },
  {
    question: "How fast will I receive my money?",
    plainAnswer:
      "Once you have completed the phone underwriting process and e-signed your loan agreement, your funds will be disbursed within 24 hours.",
    answer: (
      <>
        Once you have completed the phone underwriting process and e-signed your
        loan agreement, your funds will be disbursed{" "}
        <strong>within 24 hours</strong>.
      </>
    ),
  },
  {
    question: `What is ${SITE_NAME}?`,
    plainAnswer: `${SITE_NAME} is a direct personal loan provider headquartered in Los Angeles, California. We are not a marketplace or broker — we fund loans directly, which means faster decisions for borrowers in all 50 U.S. states.`,
    answer: (
      <>
        {SITE_NAME} is a <strong>direct</strong> personal loan provider
        headquartered in Los Angeles, California. We are not a marketplace or
        broker&mdash;we fund loans directly, which means faster decisions for
        borrowers in all 50 U.S. states.
      </>
    ),
  },
  {
    question: "How long do I have to repay my loan?",
    plainAnswer: `We provide flexible repayment terms ranging from ${LOAN_LIMITS.minTerm} to ${LOAN_LIMITS.maxTerm} months. You can choose the term that best fits your monthly budget.`,
    answer: (
      <>
        We provide flexible repayment terms ranging from{" "}
        <strong>
          {LOAN_LIMITS.minTerm} to {LOAN_LIMITS.maxTerm} months
        </strong>
        . You can choose the term that best fits your monthly budget.
      </>
    ),
  },
  {
    question: `What fees does ${SITE_NAME} charge?`,
    plainAnswer:
      "There is no origination fee, no application fee, and no upfront cost. There is also no prepayment penalty — you can pay off your loan early at any time.",
    answer: (
      <>
        There is{" "}
        <strong>
          no origination fee, no application fee, and no upfront cost
        </strong>
        . There is also no prepayment penalty&mdash;you can pay off your loan
        early at any time.
      </>
    ),
  },
  {
    question: "What are the eligibility requirements?",
    plainAnswer:
      "You must be at least 18 years old, be a resident of the United States, have a valid government-issued ID, a verifiable source of income, and a bank account for direct deposit. There is no minimum credit score.",
    answer: (
      <>
        You must be at least 18 years old, be a{" "}
        <strong>resident of the United States</strong>, have a valid
        government-issued ID, a verifiable source of income, and a bank account
        for direct deposit. There is <strong>no minimum credit score</strong>.
      </>
    ),
  },
];
