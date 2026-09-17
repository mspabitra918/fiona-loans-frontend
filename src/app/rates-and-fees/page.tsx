import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/ui/JsonLd";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    absolute:
      "Personal Loan Rates & Fees — 10.00% Fixed APR, No Origination Fee",
  },
  description:
    "The complete Fiona Loans rate sheet: 10.00% fixed APR on $2,000–$10,000 loans, 12–48 month terms, $0 origination fee, no prepayment penalty. Full payment tables.",
  keywords: [
    "personal loan rates",
    "personal loans no origination fee",
    "personal loan APR",
    "no prepayment penalty personal loan",
  ],
  alternates: { canonical: "/rates-and-fees" },
};

const PAYMENT_MATRIX = [
  {
    amount: "$2,000",
    m12: "$175.83",
    m24: "$92.29",
    m36: "$64.53",
    m48: "$50.73",
  },
  {
    amount: "$2,500",
    m12: "$219.79",
    m24: "$115.36",
    m36: "$80.67",
    m48: "$63.41",
  },
  {
    amount: "$3,000",
    m12: "$263.75",
    m24: "$138.43",
    m36: "$96.80",
    m48: "$76.09",
  },
  {
    amount: "$4,000",
    m12: "$351.66",
    m24: "$184.58",
    m36: "$129.07",
    m48: "$101.45",
  },
  {
    amount: "$5,000",
    m12: "$439.58",
    m24: "$230.72",
    m36: "$161.34",
    m48: "$126.81",
  },
  {
    amount: "$6,000",
    m12: "$527.50",
    m24: "$276.87",
    m36: "$193.60",
    m48: "$152.18",
  },
  {
    amount: "$7,500",
    m12: "$659.37",
    m24: "$346.09",
    m36: "$242.00",
    m48: "$190.22",
  },
  {
    amount: "$8,000",
    m12: "$703.33",
    m24: "$369.16",
    m36: "$258.14",
    m48: "$202.90",
  },
  {
    amount: "$10,000",
    m12: "$879.16",
    m24: "$461.45",
    m36: "$322.67",
    m48: "$253.63",
  },
];

const COMPARISON_ROWS = [
  {
    apr: "10.00% — Fiona Loans",
    payment: "$161.34",
    total: "$5,808.24",
    interest: "$808.24",
    isHighlight: true,
  },
  {
    apr: "20.00%",
    payment: "approx. $185.80",
    total: "approx. $6,689",
    interest: "approx. $1,689",
    isHighlight: false,
  },
  {
    apr: "24.00%",
    payment: "approx. $196.16",
    total: "approx. $7,062",
    interest: "approx. $2,062",
    isHighlight: false,
  },
  {
    apr: "29.99%",
    payment: "approx. $212.24",
    total: "approx. $7,641",
    interest: "approx. $2,641",
    isHighlight: false,
  },
  {
    apr: "35.99%",
    payment: "approx. $229.01",
    total: "approx. $8,244",
    interest: "approx. $3,244",
    isHighlight: false,
  },
];

const RATES_FAQS = [
  {
    question: "What is the APR on a Fiona Loans personal loan?",
    answer: "10.00% fixed, for every approved borrower, in every state.",
  },
  {
    question: "Is 10% a good APR for a personal loan?",
    answer:
      "It sits well below the average for unsecured personal loans and far below the 36% ceiling most states permit. Whether it's right for you depends on your alternatives — a 0% promotional credit card you can clear before it expires may cost less.",
  },
  {
    question: "Does my credit score change my rate?",
    answer:
      "No. Credit history is one input into whether we approve your application, not into what you're charged.",
  },
  {
    question: "Are there prepayment penalties?",
    answer: "None. You can pay off any portion of your loan at any time.",
  },
  {
    question: "What's the difference between the interest rate and the APR?",
    answer:
      "APR includes interest plus most mandatory fees, so it reflects the full cost of borrowing. Because we charge no origination or application fee, our interest rate and our APR are both 10.00%.",
  },
  {
    question: "Do rates differ by state?",
    answer: "No. 10.00% APR in all 50 states.",
  },
];

export default function RatesAndFeesPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: RATES_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Rates & Fees", url: "/rates-and-fees" },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Personal Loan Rates and Fees
          </h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            The complete rate sheet on one page. In accordance with the Truth in
            Lending Act, every cost associated with a Fiona Loans personal loan
            is disclosed below — there is no second page of fine print.
          </p>
          <div className="mt-6 inline-block bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 text-sm sm:text-base font-semibold">
            10.00% Fixed APR &middot; $0 Origination &amp; Application Fees
            &middot; 12–48 Months to Repay
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section: Rates at a Glance */}
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6">
            Personal Loan Rates at a Glance
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-surface-dark overflow-hidden mb-16">
            <table className="w-full">
              <caption className="sr-only">
                Personal Loan Rates at a Glance
              </caption>
              <tbody className="divide-y divide-surface-dark text-sm">
                {[
                  { term: "Minimum loan amount", value: "$2,000" },
                  { term: "Maximum loan amount", value: "$10,000" },
                  { term: "Loan increments", value: "$500" },
                  {
                    term: "Annual Percentage Rate (APR)",
                    value: "10.00% fixed",
                  },
                  {
                    term: "Rate type",
                    value: "Fixed — never adjusts for the life of the loan",
                  },
                  {
                    term: "Repayment terms",
                    value: "12, 24, 36, or 48 months",
                  },
                  {
                    term: "Payment schedule",
                    value: "Equal monthly payments, automatically debited",
                  },
                  {
                    term: "First payment due",
                    value: "Approximately 30 days after funding",
                  },
                ].map((row) => (
                  <tr key={row.term} className="hover:bg-surface/30">
                    <th
                      scope="row"
                      className="text-left px-6 py-4 text-text-primary font-medium w-1/2"
                    >
                      {row.term}
                    </th>
                    <td className="px-6 py-4 text-text-secondary w-1/2">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section: Representative Example */}
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
            Representative Example
          </h2>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 sm:p-8 mb-16">
            <p className="text-text-primary leading-relaxed text-base sm:text-lg">
              Borrow <strong>$5,000</strong> over a{" "}
              <strong>36-month term</strong> at a fixed{" "}
              <strong>10.00% APR</strong>. Your monthly payment is{" "}
              <strong>$161.34</strong>. The total amount repaid over the life of
              the loan is <strong>$5,808.24</strong>, of which{" "}
              <strong>$808.24</strong> is interest. There is no origination fee
              and no prepayment penalty.
            </p>
          </div>

          {/* Section: What Fees Does Fiona Loans Charge? */}
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6">
            What Fees Does Fiona Loans Charge?
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-surface-dark overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead className="bg-surface">
                <tr>
                  <th className="text-left px-6 py-4 font-bold text-text-primary">
                    Fee type
                  </th>
                  <th className="text-left px-6 py-4 font-bold text-text-primary">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-dark text-text-secondary">
                <tr>
                  <td className="px-6 py-4 font-medium text-text-primary">
                    Origination fee
                  </td>
                  <td className="px-6 py-4">$0.00</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-text-primary">
                    Application fee
                  </td>
                  <td className="px-6 py-4">$0.00</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-text-primary">
                    Processing fee
                  </td>
                  <td className="px-6 py-4">$0.00</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-text-primary">
                    Prepayment penalty
                  </td>
                  <td className="px-6 py-4">None</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-text-primary">
                    Late payment fee
                  </td>
                  <td className="px-6 py-4">
                    $5.00 after a 5-day grace period (may vary by state)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-surface p-6 rounded-xl border border-surface-dark mb-16 text-sm text-text-secondary space-y-3 leading-relaxed">
            <p className="font-bold text-text-primary text-base">
              Why the origination fee line matters.
            </p>
            <p>
              Origination fees are the most common way an advertised personal
              loan rate understates the real cost of borrowing. A 5% origination
              fee on a $10,000 loan means $9,500 arrives in your account while
              you repay interest on the full $10,000 — the effective APR is
              materially above the headline number.
            </p>
            <p>
              Ours is zero. The amount we approve is the amount that reaches
              your account, and 10.00% APR is the entire cost of the loan.
            </p>
          </div>

          {/* Section: Monthly Payments at Every Amount and Term */}
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6">
            Monthly Payments at Every Amount and Term
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-surface-dark overflow-x-auto mb-4">
            <table className="w-full text-sm min-w-[600px]">
              <thead className="bg-surface text-text-primary">
                <tr>
                  <th className="py-4 px-6 text-left font-bold">Loan amount</th>
                  <th className="py-4 px-6 text-left font-bold">12 months</th>
                  <th className="py-4 px-6 text-left font-bold">24 months</th>
                  <th className="py-4 px-6 text-left font-bold">36 months</th>
                  <th className="py-4 px-6 text-left font-bold">48 months</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-dark text-text-secondary">
                {PAYMENT_MATRIX.map((row) => (
                  <tr key={row.amount} className="hover:bg-surface/30">
                    <td className="py-3 px-6 font-bold text-text-primary">
                      {row.amount}
                    </td>
                    <td className="py-3 px-6">{row.m12}</td>
                    <td className="py-3 px-6">{row.m24}</td>
                    <td className="py-3 px-6">{row.m36}</td>
                    <td className="py-3 px-6">{row.m48}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-text-secondary italic mb-16">
            Fixed 10.00% APR with no origination fee. Total repayment equals the
            monthly payment multiplied by the number of payments.
          </p>

          {/* Section: How 10% APR Compares */}
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
            How 10% APR Compares
          </h2>
          <p className="text-text-secondary mb-6 leading-relaxed">
            In most states, consumer installment lenders may legally charge up
            to 36% APR, and many price close to that ceiling. Here is what the
            same $5,000 loan over 36 months costs at different rates:
          </p>
          <div className="bg-white rounded-xl shadow-sm border border-surface-dark overflow-x-auto mb-4">
            <table className="w-full text-sm min-w-[600px]">
              <thead className="bg-surface text-text-primary">
                <tr>
                  <th className="py-4 px-6 text-left font-bold">APR</th>
                  <th className="py-4 px-6 text-left font-bold">
                    Monthly payment
                  </th>
                  <th className="py-4 px-6 text-left font-bold">
                    Total repaid
                  </th>
                  <th className="py-4 px-6 text-left font-bold">
                    Total interest
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-dark text-text-secondary">
                {COMPARISON_ROWS.map((row) => (
                  <tr
                    key={row.apr}
                    className={
                      row.isHighlight
                        ? "bg-primary/10 font-medium text-text-primary"
                        : "hover:bg-surface/30"
                    }
                  >
                    <td className="py-3.5 px-6 font-bold">{row.apr}</td>
                    <td className="py-3.5 px-6">{row.payment}</td>
                    <td className="py-3.5 px-6">{row.total}</td>
                    <td className="py-3.5 px-6">{row.interest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm font-semibold text-text-primary mb-2">
            Same loan, same term, same borrower. The rate is the entire
            difference.
          </p>
          <p className="text-xs text-text-secondary italic mb-16">
            Comparison figures are calculated illustrations at the APRs shown.
            They are not quotes from, or offers by, any named lender.
          </p>

          {/* Section: The Same Rate in Every State */}
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
            The Same Rate in Every State
          </h2>
          <p className="text-text-secondary mb-6 leading-relaxed">
            Fiona Loans charges a fixed 10.00% APR to every approved borrower,
            in every state we serve. Geography does not change your cost of
            credit.
          </p>
          <div className="bg-white rounded-xl shadow-sm border border-surface-dark overflow-hidden mb-4">
            <table className="w-full text-sm">
              <thead className="bg-surface text-text-primary">
                <tr>
                  <th className="py-4 px-6 text-left font-bold">Region</th>
                  <th className="py-4 px-6 text-left font-bold">APR</th>
                  <th className="py-4 px-6 text-left font-bold">Loan range</th>
                  <th className="py-4 px-6 text-left font-bold">Terms</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr>
                  <td className="py-4 px-6 font-bold text-text-primary">
                    All 50 U.S. states
                  </td>
                  <td className="py-4 px-6">10.00% fixed</td>
                  <td className="py-4 px-6">$2,000 – $10,000</td>
                  <td className="py-4 px-6">12–48 months</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-text-secondary italic mb-16">
            Specific loan terms and fees may vary where required by state law.
            State-specific disclosures are available on our{" "}
            <Link
              href="/state-licenses"
              className="underline hover:text-text-primary"
            >
              State Licenses &amp; Disclosures
            </Link>{" "}
            page.
          </p>

          {/* Section: Choosing Your Term */}
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
            Choosing Your Term
          </h2>
          <div className="bg-surface p-6 sm:p-8 rounded-xl border border-surface-dark mb-16 space-y-4">
            <p className="text-text-secondary text-base leading-relaxed">
              A longer term lowers your monthly payment and raises your total
              cost. The same $10,000 loan:
            </p>
            <ul className="space-y-2 text-text-primary font-medium">
              <li>
                &bull; <strong>36 months</strong> — $322.67 per month &middot;
                $11,616.12 total &middot; $1,616.12 in interest
              </li>
              <li>
                &bull; <strong>48 months</strong> — $253.63 per month &middot;
                $12,174.24 total &middot; $2,174.24 in interest
              </li>
            </ul>
            <p className="text-text-primary font-semibold">
              That's $69.04 less every month, for $558.12 more overall.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              Neither is the wrong answer. Choose the payment you can make
              comfortably every month without straining your budget, then pay
              extra when you're able. There is no prepayment penalty, and every
              additional dollar reduces your principal — which reduces the
              interest charged on every month that follows.
            </p>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            <div className="flex items-center space-x-3 bg-white rounded-xl p-5 shadow-sm border border-surface-dark">
              <svg
                className="w-8 h-8 text-primary flex-shrink-0"
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
              <span className="text-sm font-medium text-text-primary">
                256-Bit SSL Encryption
              </span>
            </div>
            <div className="flex items-center space-x-3 bg-white rounded-xl p-5 shadow-sm border border-surface-dark">
              <svg
                className="w-8 h-8 text-primary flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-medium text-text-primary">
                $0 Upfront Cost
              </span>
            </div>
            <div className="flex items-center space-x-3 bg-white rounded-xl p-5 shadow-sm border border-surface-dark">
              <svg
                className="w-8 h-8 text-primary flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 21V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2z"
                />
              </svg>
              <span className="text-sm font-medium text-text-primary">
                U.S.-Based Team
              </span>
            </div>
          </div>

          {/* Pricing Disclosure */}
          <div className="bg-surface rounded-xl p-6 text-sm text-text-secondary leading-relaxed mb-16">
            <h3 className="font-semibold text-text-primary mb-2">
              Pricing Disclosure
            </h3>
            <p>
              Fiona Loans offers a fixed 10.00% Annual Percentage Rate on all
              personal loans from $2,000 to $10,000, with repayment terms of 12,
              24, 36, or 48 months. We do not charge origination fees,
              application fees, or processing fees. Your APR is fixed for the
              life of the loan and does not vary by credit profile, loan amount,
              term, or state of residence. All loans are subject to credit
              approval and verification. Not all applicants will qualify.
            </p>
          </div>

          {/* Section: Rates and Fees FAQ */}
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary text-center mb-10">
            Rates and Fees FAQ
          </h2>
          <div className="divide-y divide-surface-dark border-y border-surface-dark mb-16">
            {RATES_FAQS.map((faq) => (
              <div key={faq.question} className="py-6">
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  {faq.question}
                </h3>
                <p className="text-text-secondary leading-relaxed text-base">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-primary-light py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Apply today at a fixed 10.00% APR — the same rate every approved
            borrower receives.
          </p>
          <Link
            href="/apply"
            prefetch={false}
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-secondary hover:bg-secondary-light px-10 py-4 text-lg font-bold text-primary-dark transition-all shadow-lg hover:shadow-xl"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </>
  );
}
