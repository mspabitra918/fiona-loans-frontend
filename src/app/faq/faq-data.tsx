import type { ReactNode } from "react";
import { SITE_NAME, BUSINESS_PHONE } from "@/lib/constants";

export type FAQItem = {
  question: string;
  plainAnswer: string;
  answer: ReactNode;
};

export type FAQSection = {
  category: string;
  items: FAQItem[];
};

export const FAQ_DATA: FAQSection[] = [
  {
    category: "About the Loan",
    items: [
      {
        question: "What is Fiona Loans?",
        plainAnswer:
          "Fiona Loans is a direct lender offering fixed-rate personal loans from $2,000 to $10,000, repayable over 12 to 48 months at a fixed 10.00% APR. We fund our own loans and make our own credit decisions — we are not a marketplace or a broker.",
        answer: (
          <>
            {SITE_NAME} is a direct lender offering fixed-rate personal loans
            from $2,000 to $10,000, repayable over 12 to 48 months at a fixed
            10.00% APR. We fund our own loans and make our own credit decisions
            — we are not a marketplace or a broker.
          </>
        ),
      },
      {
        question: "What is a personal loan?",
        plainAnswer:
          "An unsecured installment loan repaid in equal monthly payments over a fixed term. Unsecured means no collateral: you don't pledge your car or your home.",
        answer: (
          <>
            An unsecured installment loan repaid in equal monthly payments over
            a fixed term. Unsecured means no collateral: you don't pledge your
            car or your home.
          </>
        ),
      },
      {
        question: "How much can I borrow?",
        plainAnswer:
          "Between $2,000 and $10,000, in $500 increments. The amount we approve depends on your income and existing obligations, so you may be approved for less than you request.",
        answer: (
          <>
            Between $2,000 and $10,000, in $500 increments. The amount we
            approve depends on your income and existing obligations, so you may
            be approved for less than you request.
          </>
        ),
      },
      {
        question: "How long do I have to repay my loan?",
        plainAnswer:
          "Choose 12, 24, 36, or 48 months. Longer terms mean lower monthly payments and more total interest.",
        answer: (
          <>
            Choose 12, 24, 36, or 48 months. Longer terms mean lower monthly
            payments and more total interest.
          </>
        ),
      },
      {
        question:
          "Do you offer payday loans, title loans, or no-credit-check loans?",
        plainAnswer:
          "No. Fiona Loans offers fixed-rate installment loans only. We check credit on every application.",
        answer: (
          <>
            No. {SITE_NAME} offers fixed-rate installment loans only. We check
            credit on every application.
          </>
        ),
      },
    ],
  },
  {
    category: "Rates and Fees",
    items: [
      {
        question: "What is the interest rate on a Fiona Loan?",
        plainAnswer:
          "A fixed 10.00% APR. Every approved borrower receives the same rate, regardless of loan amount, term, credit profile, or state. It never adjusts.",
        answer: (
          <>
            A fixed 10.00% APR. Every approved borrower receives the same rate,
            regardless of loan amount, term, credit profile, or state. It never
            adjusts.
          </>
        ),
      },
      {
        question: "Is the rate really the same for everyone?",
        plainAnswer:
          "Yes. We make a yes-or-no approval decision rather than pricing each borrower individually. There is no rate sheet and no credit-tier pricing.",
        answer: (
          <>
            Yes. We make a yes-or-no approval decision rather than pricing each
            borrower individually. There is no rate sheet and no credit-tier
            pricing.
          </>
        ),
      },
      {
        question: "Is 10% a good APR for a personal loan?",
        plainAnswer:
          "It's below the average for unsecured personal loans and well under the 36% ceiling most states allow. Whether it's the best option for you depends on your alternatives.",
        answer: (
          <>
            It's below the average for unsecured personal loans and well under
            the 36% ceiling most states allow. Whether it's the best option for
            you depends on your alternatives.
          </>
        ),
      },
      {
        question: "What's the difference between an interest rate and an APR?",
        plainAnswer:
          "APR includes interest plus most mandatory fees, so it reflects the full cost of borrowing. Because we charge no origination or application fee, our interest rate and our APR are both 10.00%.",
        answer: (
          <>
            APR includes interest plus most mandatory fees, so it reflects the
            full cost of borrowing. Because we charge no origination or
            application fee, our interest rate and our APR are both 10.00%.
          </>
        ),
      },
      {
        question: "What fees does Fiona Loans charge?",
        plainAnswer:
          "No application fee, no origination fee, no processing fee, and no prepayment penalty. A late payment fee applies after a five-day grace period, and a returned payment fee may apply. Both are disclosed in full in your loan agreement.",
        answer: (
          <>
            No application fee, no origination fee, no processing fee, and no
            prepayment penalty. A late payment fee applies after a five-day
            grace period, and a returned payment fee may apply. Both are
            disclosed in full in your loan agreement.
          </>
        ),
      },
      {
        question: "Can I pay my loan off early?",
        plainAnswer:
          "Yes, at any time, with no penalty. Extra payments reduce your principal and lower your total interest.",
        answer: (
          <>
            Yes, at any time, with no penalty. Extra payments reduce your
            principal and lower your total interest.
          </>
        ),
      },
      {
        question: "How much is a $5,000 loan per month?",
        plainAnswer:
          "At a fixed 10.00% APR: $439.58 over 12 months, $230.72 over 24, $161.34 over 36, or $126.81 over 48.",
        answer: (
          <>
            At a fixed 10.00% APR: $439.58 over 12 months, $230.72 over 24,
            $161.34 over 36, or $126.81 over 48.
          </>
        ),
      },
    ],
  },
  {
    category: "Eligibility and Credit",
    items: [
      {
        question: "What are the eligibility requirements?",
        plainAnswer:
          "You must be at least 18 (19 in Alabama and Nebraska), a U.S. citizen or permanent resident, with verifiable regular income, an active checking account in your own name, and a valid government-issued ID and Social Security number.",
        answer: (
          <>
            You must be at least 18 (19 in Alabama and Nebraska), a U.S. citizen
            or permanent resident, with verifiable regular income, an active
            checking account in your own name, and a valid government-issued ID
            and Social Security number.
          </>
        ),
      },
      {
        question: "What credit score do I need for a personal loan?",
        plainAnswer:
          "There is no published minimum. We consider applicants across the credit spectrum and focus on verifiable income and ability to repay. A lower score doesn't disqualify you and doesn't change your rate — but approval is not guaranteed, and we do decline applications.",
        answer: (
          <>
            There is no published minimum. We consider applicants across the
            credit spectrum and focus on verifiable income and ability to repay.
            A lower score doesn't disqualify you and doesn't change your rate —
            but approval is not guaranteed, and we do decline applications.
          </>
        ),
      },
      {
        question: "Can I get a personal loan with bad credit?",
        plainAnswer:
          "Possibly. Credit history is one input among several, and it has no effect on your rate if you're approved.",
        answer: (
          <>
            Possibly. Credit history is one input among several, and it has no
            effect on your rate if you're approved.
          </>
        ),
      },
      {
        question: "Can I get a personal loan with no credit history?",
        plainAnswer:
          "Possibly. A thin file isn't automatically disqualifying, particularly where income is well documented.",
        answer: (
          <>
            Possibly. A thin file isn't automatically disqualifying,
            particularly where income is well documented.
          </>
        ),
      },
      {
        question: "Can I apply if I'm self-employed or receive benefits?",
        plainAnswer:
          "Yes. We accept self-employment income, retirement income, disability, and other regular benefit income, provided it's verifiable.",
        answer: (
          <>
            Yes. We accept self-employment income, retirement income,
            disability, and other regular benefit income, provided it's
            verifiable.
          </>
        ),
      },
      {
        question: "Do I need a cosigner?",
        plainAnswer: "No. We don't currently offer cosigned loans.",
        answer: <>No. We don't currently offer cosigned loans.</>,
      },
      {
        question: "What states does Fiona Loans operate in?",
        plainAnswer: "All 50 U.S. states.",
        answer: <>All 50 U.S. states.</>,
      },
    ],
  },
  {
    category: "The Application Process",
    items: [
      {
        question: "How do I apply for a personal loan?",
        plainAnswer: `Complete our online application, then call ${BUSINESS_PHONE} to finish underwriting with a specialist and e-sign your agreement.`,
        answer: (
          <>
            Complete our online application, then call{" "}
            <a
              href={`tel:${BUSINESS_PHONE.replace(/\D/g, "")}`}
              className="font-medium text-primary hover:underline"
            >
              {BUSINESS_PHONE}
            </a>{" "}
            to finish underwriting with a specialist and e-sign your agreement.
          </>
        ),
      },
      {
        question: "How long does it take to get a personal loan?",
        plainAnswer:
          "The application takes about five minutes. Most borrowers are funded within one to two business days after completing the phone call and signing. Your timeline depends mostly on how quickly you call.",
        answer: (
          <>
            The application takes about five minutes. Most borrowers are funded
            within one to two business days after completing the phone call and
            signing. Your timeline depends mostly on how quickly you call.
          </>
        ),
      },
      {
        question: "Why do I have to call in?",
        plainAnswer:
          "Phone underwriting confirms your identity and gives you the chance to hear your full terms and ask questions before signing. Your application doesn't progress without it.",
        answer: (
          <>
            Phone underwriting confirms your identity and gives you the chance
            to hear your full terms and ask questions before signing. Your
            application doesn't progress without it.
          </>
        ),
      },
      {
        question: "How will I receive my money?",
        plainAnswer:
          "By direct deposit into the checking account you verified during the application.",
        answer: (
          <>
            By direct deposit into the checking account you verified during the
            application.
          </>
        ),
      },
      {
        question: "Can I apply more than once?",
        plainAnswer:
          "One active application at a time; duplicates are blocked. Declined applicants may reapply 90 days after the original submission date.",
        answer: (
          <>
            One active application at a time; duplicates are blocked. Declined
            applicants may reapply 90 days after the original submission date.
          </>
        ),
      },
      {
        question: "What happens if my application is declined?",
        plainAnswer:
          "You'll receive an Adverse Action Notice by email explaining the specific reasons and how to obtain a free copy of any credit report we used.",
        answer: (
          <>
            You'll receive an Adverse Action Notice by email explaining the
            specific reasons and how to obtain a free copy of any credit report
            we used.
          </>
        ),
      },
      {
        question: "How do I check my application status?",
        plainAnswer:
          "Use our Loan Status page with your Application ID and the email address you applied with.",
        answer: (
          <>
            Use our Loan Status page with your Application ID and the email
            address you applied with.
          </>
        ),
      },
    ],
  },
  {
    category: "Repayment",
    items: [
      {
        question: "When is my first payment due?",
        plainAnswer:
          "Approximately 30 days after your loan is funded. The exact date is in your loan agreement.",
        answer: (
          <>
            Approximately 30 days after your loan is funded. The exact date is
            in your loan agreement.
          </>
        ),
      },
      {
        question: "How do I make payments?",
        plainAnswer:
          "Payments are automatically debited from the checking account you verified, on the same date each month.",
        answer: (
          <>
            Payments are automatically debited from the checking account you
            verified, on the same date each month.
          </>
        ),
      },
      {
        question: "What if I can't make a payment?",
        plainAnswer:
          "Call us before the due date. We'd much rather work something out than watch an account go delinquent. Missed payments carry fees and credit consequences, so the earlier the conversation, the better.",
        answer: (
          <>
            Call us before the due date. We'd much rather work something out
            than watch an account go delinquent. Missed payments carry fees and
            credit consequences, so the earlier the conversation, the better.
          </>
        ),
      },
    ],
  },
  {
    category: "Privacy and Security",
    items: [
      {
        question: "Is my information safe?",
        plainAnswer:
          "The site uses 256-bit encryption, and your data is transmitted and stored securely.",
        answer: (
          <>
            The site uses 256-bit encryption, and your data is transmitted and
            stored securely.
          </>
        ),
      },
      {
        question: "Do you sell my information?",
        plainAnswer:
          "No. We're a direct lender and we don't sell your personal information to lead buyers or other lenders. Our full practices are set out in our Privacy Policy.",
        answer: (
          <>
            No. We're a direct lender and we don't sell your personal
            information to lead buyers or other lenders. Our full practices are
            set out in our Privacy Policy.
          </>
        ),
      },
      {
        question: "How do I stop marketing calls or texts?",
        plainAnswer: `Reply STOP to any text, use the unsubscribe link in any email, or contact us at support@fionaloans.com or ${BUSINESS_PHONE}. Opting out of marketing has no effect on your application or your loan.`,
        answer: (
          <>
            Reply STOP to any text, use the unsubscribe link in any email, or
            contact us at{" "}
            <a
              href="mailto:support@fionaloans.com"
              className="text-primary hover:underline font-medium"
            >
              support@fionaloans.com
            </a>{" "}
            or{" "}
            <a
              href={`tel:${BUSINESS_PHONE.replace(/\D/g, "")}`}
              className="text-primary hover:underline font-medium"
            >
              {BUSINESS_PHONE}
            </a>
            . Opting out of marketing has no effect on your application or your
            loan.
          </>
        ),
      },
    ],
  },
];
