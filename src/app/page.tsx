import Link from "next/link";
import LoanCalculator from "@/components/ui/LoanCalculator";
import Testimonials from "@/components/ui/Testimonials";
import { SITE_NAME, BUSINESS_PHONE, BUSINESS_PHONE_TEL } from "@/lib/constants";
import { Metadata } from "next";
import FAQSection from "@/components/FAQSection";

export const metadata: Metadata = {
  title: {
    // `absolute` bypasses the title template in the root layout
    absolute:
      "Fixed Rate Personal Loans $2,000–$10,000 | 10% APR | Fiona Loans",
  },
  description:
    "Direct lender personal loans from $2,000 to $10,000 at one fixed 10.00% APR. No origination fee, no prepayment penalty, 12–48 month terms. See your payment.",
  keywords: [
    "fixed rate personal loans",
    "direct lender personal loans",
    "personal loans no origination fee",
    "online personal loans",
    "low interest personal loans",
    "Fiona Loans",
  ],
  alternates: {
    canonical: "/",
  },
};
const AT_A_GLANCE = [
  { feature: "Loan Amounts", offering: "$2,000 Minimum — $10,000 Maximum" },
  { feature: "Interest Rate", offering: "10% Fixed APR Annually" },
  { feature: "Credit Requirements", offering: "All Credit Scores Accepted" },
  { feature: "Availability", offering: "All 50 U.S. States" },
  { feature: "Funding Speed", offering: "Within 24 Hours of E-Signature" },
];

const LOAN_PURPOSE_USES = [
  "Debt consolidation to simplify your monthly payments",
  "Home improvement and critical repairs",
  "Unexpected medical or dental expenses",
  "Major life purchases and life events",
  "Emergency financial safety nets",
];

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Header */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-primary-light text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Fixed Rate Personal Loans From a{" "}
                <span className="text-secondary">Direct Lender</span>
              </h1>
              <p className="mt-4 text-xl sm:text-2xl text-white font-semibold">
                Borrow $2,000 to $10,000 at one fixed 10.00% APR — the same rate
                for every approved borrower.
              </p>
              <p className="mt-4 text-lg text-white/80 leading-relaxed max-w-lg">
                Terms from 12 to 48 months, no origination fee, and no
                prepayment penalty.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/apply"
                  prefetch={false}
                  className="bg-secondary hover:bg-secondary-light text-primary-dark px-8 py-4 rounded-lg font-bold text-lg text-center transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Check Your Payment
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-success"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Direct lender, not a broker</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-success"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>10.00% fixed APR</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-success"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>$0 origination fee</span>
                </div>
              </div>
            </div>

            {/* Flat-Fee Calculator */}
            <div className="lg:pl-8">
              <LoanCalculator />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">
              What is a Fixed Rate Personal Loan?
            </h2>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed">
              A fixed rate personal loan is an unsecured installment loan you
              repay in equal monthly payments over a set term, at an interest
              rate that never changes. No collateral, no balloon payment, no
              repricing halfway through.
            </p>
            <p className="mt-4 text-lg text-text-secondary leading-relaxed">
              The alternative is variable rate credit, which includes nearly
              every credit card. A card at 24% APR today can be at 27% next
              year, because its rate floats with a benchmark. A fixed rate
              personal loan at 10.00% APR is 10.00% APR in month one and in
              month forty-eight.
            </p>
            <p className="mt-4 text-lg font-semibold text-primary">
              That predictability is the point. You know your monthly payment
              before you sign, and you know the total cost of the loan before
              you sign.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Fiona Loans at a Glance */}
      <section className="bg-surface py-12 sm:py-16 border-b border-surface-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary text-center">
            {SITE_NAME} at a Glance
          </h2>

          {/* Stat Badges */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-primary">
                $2,000&ndash;$10,000
              </p>
              <h3 className="text-sm text-text-secondary mt-1">Loan Amounts</h3>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">10.00%</p>
              <h3 className="text-sm text-text-secondary mt-1">Fixed APR</h3>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">12&ndash;48 Mo</p>
              <h3 className="text-sm text-text-secondary mt-1">Month Terms</h3>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">50 States</p>
              <h3 className="text-sm text-text-secondary mt-1">
                U.S. States Served
              </h3>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mt-10 bg-white rounded-xl shadow-md border border-surface-dark overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <caption className="sr-only">
                  {SITE_NAME} loan features and offerings
                </caption>
                <thead className="bg-surface border-b border-surface-dark">
                  <tr>
                    <th
                      scope="col"
                      className="text-left px-6 py-4 text-sm font-semibold text-text-primary w-1/3"
                    >
                      Feature
                    </th>
                    <th
                      scope="col"
                      className="text-left px-6 py-4 text-sm font-semibold text-text-primary w-2/3"
                    >
                      {SITE_NAME} Offering
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-dark">
                  <tr>
                    <th
                      scope="row"
                      className="text-left px-6 py-4 text-sm text-text-primary font-medium"
                    >
                      Loan amounts
                    </th>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      $2,000 minimum &mdash; $10,000 maximum, in $500 increments
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="text-left px-6 py-4 text-sm text-text-primary font-medium"
                    >
                      Interest rate
                    </th>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      10.00% fixed APR, identical for every approved borrower
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="text-left px-6 py-4 text-sm text-text-primary font-medium"
                    >
                      Loan terms
                    </th>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      12, 24, 36, or 48 months
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="text-left px-6 py-4 text-sm text-text-primary font-medium"
                    >
                      Origination fee
                    </th>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      $0.00
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="text-left px-6 py-4 text-sm text-text-primary font-medium"
                    >
                      Application fee
                    </th>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      $0.00
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="text-left px-6 py-4 text-sm text-text-primary font-medium"
                    >
                      Prepayment penalty
                    </th>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      None
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="text-left px-6 py-4 text-sm text-text-primary font-medium"
                    >
                      Credit requirements
                    </th>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      All credit profiles considered
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="text-left px-6 py-4 text-sm text-text-primary font-medium"
                    >
                      Availability
                    </th>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      All 50 U.S. states
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="text-left px-6 py-4 text-sm text-text-primary font-medium"
                    >
                      Funding
                    </th>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      Typically one business day after your agreement is signed
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">
              Why One Rate Instead of a Range
            </h2>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed">
              Most lenders advertise a range &mdash; &ldquo;rates from 7.99% to
              35.99% APR&rdquo; &mdash; and you discover where you land only
              after you apply. That spread exists because of risk-based pricing:
              a model assigns you a tier, and the tier sets your price.
            </p>
            <p className="mt-4 text-lg text-text-secondary leading-relaxed">
              Risk-based pricing charges the most to the people with the least
              capacity to absorb it. Thin credit files, interrupted employment
              histories, old medical collections. The applicants who most need a
              manageable payment are routinely the ones quoted above 30%.
            </p>
            <p className="mt-4 text-lg text-text-secondary leading-relaxed">
              We removed the variable. Fiona Loans makes an approval decision
              &mdash; yes or no &mdash; and every yes receives{" "}
              <span className="font-semibold text-primary">10.00% APR</span>. We
              won&apos;t always be able to approve an application, and we
              won&apos;t pretend otherwise. But when we can, your credit history
              never costs you extra.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Fiona Loans? */}
      <section className="py-16 sm:py-24 bg-white border-b border-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
              Why Choose {SITE_NAME}?
            </h2>
            <p className="mt-4 text-lg text-text-secondary leading-relaxed">
              We&apos;re a direct lender, not a broker. We fund our own loans,
              make our own credit decisions, and service the accounts ourselves
              &mdash; so the rate you see here is the rate on your agreement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg
                    className="w-8 h-8"
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
                ),
                title: "One Fixed Rate",
                description:
                  'Every approved borrower receives the same 10.00% APR. No risk-based pricing, no rate sheet, no "as low as." Your rate is fixed for the life of the loan, with a $0 origination fee and no prepayment penalty.',
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
                title: "Fast, Predictable Funding",
                description:
                  "Once you complete phone underwriting and e-sign your agreement, we work to disburse your funds within one business day. Most borrowers see the deposit the following morning.",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
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
                ),
                title: "All Credit Profiles Considered",
                description:
                  "We look at your current income and your ability to repay, not just a three-digit score. A thin file or a rough patch doesn't disqualify you — and it doesn't change your rate. Approval isn't guaranteed, but your credit history never costs you more.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-surface rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-surface-dark flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface border-b border-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center lg:text-left mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
              What a Fiona Loans Personal Loan Costs
            </h2>
          </div>

          {/* Payment Breakdown Table */}
          <div className="bg-white rounded-xl shadow-md border border-surface-dark overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <caption className="sr-only">
                  Sample monthly payments across loan amounts and terms at
                  10.00% APR
                </caption>
                <thead className="bg-surface border-b border-surface-dark">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 text-sm font-semibold text-text-primary"
                    >
                      Loan amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-sm font-semibold text-text-primary"
                    >
                      12 months
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-sm font-semibold text-text-primary"
                    >
                      24 months
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-sm font-semibold text-text-primary"
                    >
                      36 months
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-sm font-semibold text-text-primary"
                    >
                      48 months
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-dark font-medium text-text-primary">
                  <tr>
                    <th
                      scope="row"
                      className="px-6 py-4 text-sm font-bold text-primary"
                    >
                      $2,000
                    </th>
                    <td className="px-6 py-4 text-sm">$175.83</td>
                    <td className="px-6 py-4 text-sm">$92.29</td>
                    <td className="px-6 py-4 text-sm">$64.53</td>
                    <td className="px-6 py-4 text-sm">$50.73</td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-6 py-4 text-sm font-bold text-primary"
                    >
                      $2,500
                    </th>
                    <td className="px-6 py-4 text-sm">$219.79</td>
                    <td className="px-6 py-4 text-sm">$115.36</td>
                    <td className="px-6 py-4 text-sm">$80.67</td>
                    <td className="px-6 py-4 text-sm">$63.41</td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-6 py-4 text-sm font-bold text-primary"
                    >
                      $5,000
                    </th>
                    <td className="px-6 py-4 text-sm">$439.58</td>
                    <td className="px-6 py-4 text-sm">$230.72</td>
                    <td className="px-6 py-4 text-sm">$161.34</td>
                    <td className="px-6 py-4 text-sm">$126.81</td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-6 py-4 text-sm font-bold text-primary"
                    >
                      $7,500
                    </th>
                    <td className="px-6 py-4 text-sm">$659.37</td>
                    <td className="px-6 py-4 text-sm">$346.09</td>
                    <td className="px-6 py-4 text-sm">$242.00</td>
                    <td className="px-6 py-4 text-sm">$190.22</td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-6 py-4 text-sm font-bold text-primary"
                    >
                      $10,000
                    </th>
                    <td className="px-6 py-4 text-sm">$879.16</td>
                    <td className="px-6 py-4 text-sm">$461.45</td>
                    <td className="px-6 py-4 text-sm">$322.67</td>
                    <td className="px-6 py-4 text-sm">$253.63</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table Disclaimer */}
          <p className="text-sm text-text-secondary mb-8 text-center sm:text-left">
            All figures at a fixed 10.00% APR with no origination fee. See the
            full rate sheet on our{" "}
            <a
              href="/rates-and-fees"
              className="text-primary underline font-medium hover:text-primary-dark"
            >
              Rates &amp; Fees page
            </a>
            .
          </p>

          {/* Explanatory Callout Box */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-surface-dark max-w-6xl">
            <h3 className="text-lg font-bold text-text-primary mb-2">
              Why &ldquo;no origination fee&rdquo; matters more than it sounds
            </h3>
            <p className="text-text-secondary leading-relaxed">
              A lender quoting &ldquo;10% interest&rdquo; with a 5% origination
              fee on a $10,000 loan hands you $9,500 and charges interest on
              $10,000. The effective APR is meaningfully higher than the
              advertised rate. Our origination fee is $0.00, so the amount
              approved is the amount deposited, and 10.00% APR is the whole
              cost.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Personal Loans for Every Need */}
      <section className="bg-surface py-16 sm:py-24 border-b border-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
              Personal Financing for Every Purpose
            </h2>
            <p className="mt-4 text-lg text-text-secondary leading-relaxed">
              {SITE_NAME} works for most ordinary borrowing needs. Because we
              consider applicants across the credit spectrum, you don&apos;t
              need a perfect file to be considered &mdash; you need income you
              can document and an account we can verify.
            </p>
          </div>

          <ul className="max-w-6xl mx-auto space-y-4">
            {[
              {
                title: "Debt consolidation",
                description:
                  "replace several card balances with one fixed monthly payment at a fixed rate",
              },
              {
                title: "Emergency expenses",
                description:
                  "unexpected bills that can't wait for the next paycheck",
              },
              {
                title: "Auto repair",
                description:
                  "the most common use we see, because a car that won't start puts a job at risk",
              },
              {
                title: "Medical and dental bills",
                description: "including the balance insurance didn't cover",
              },
              {
                title: "Home improvement and repairs",
                description: "roofs, HVAC, plumbing, storm damage",
              },
              {
                title: "Major life events",
                description: "moving, weddings, funerals, short-notice travel",
              },
            ].map((item) => (
              <li
                key={item.title}
                className="flex items-start gap-3 text-text-secondary bg-white p-4 rounded-xl border border-surface-dark shadow-sm"
              >
                <svg
                  className="w-5 h-5 text-success flex-shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="leading-relaxed">
                  <strong className="text-text-primary font-semibold">
                    {item.title}
                  </strong>{" "}
                  &mdash; {item.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-16 sm:py-24 bg-white border-b border-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
              How to Get a Personal Loan From Fiona Loans
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Apply online — about five minutes",
                description:
                  "Enter your loan amount, term, purpose, identity, income, and banking details. You'll receive an Application ID immediately.",
              },
              {
                step: "2",
                title: "Complete underwriting by phone",
                description:
                  "Call (747) 200-5932. A specialist verifies your details, reads your exact terms aloud, answers your questions, and takes your e-signature on the same call. Your application doesn't advance until this happens.",
              },
              {
                step: "3",
                title: "Receive your funds",
                description:
                  "After you sign and your bank account is verified, your file goes to funding. Most borrowers are funded within one to two business days.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-surface rounded-xl p-8 shadow-sm border border-surface-dark text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-text-secondary leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/apply"
              prefetch={false}
              className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg hover:shadow-xl inline-block"
            >
              Start Your Application
            </Link>

            {/* Visual Trust Badges */}
            <div className="mt-6 flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm text-text-secondary">
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-primary"
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
                <span>256-Bit SSL Secure</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-primary"
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
                <span>$0 Origination Fee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 21V7l9-4 9 4v14l-9-4-9 4z"
                  />
                </svg>
                <span>Direct Lender</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>All Credit Profiles Considered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      {/* <Testimonials /> */}

      <section className="py-16 sm:py-24 bg-surface border-b border-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center lg:text-left mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
              Who Qualifies for a Personal Loan
            </h2>
          </div>

          {/* Requirements List */}
          <div className="max-w-6xl mx-auto bg-white rounded-xl p-6 sm:p-8 border border-surface-dark shadow-sm">
            <ul className="space-y-4">
              {[
                "At least 18 years old (19 in Alabama and Nebraska)",
                "U.S. citizen or permanent resident",
                "Verifiable regular income — employment, self-employment, retirement, or benefits",
                "Active checking account in your own name",
                "Valid government-issued ID and Social Security number",
              ].map((req, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-text-secondary"
                >
                  <svg
                    className="w-5 h-5 text-success flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base text-text-primary leading-relaxed">
                    {req}
                  </span>
                </li>
              ))}
            </ul>

            {/* Underwriting Note / Disclaimer */}
            <div className="mt-8 pt-6 border-t border-surface-dark text-sm text-text-secondary leading-relaxed">
              We consider applicants across the credit spectrum and weigh
              current income and ability to repay heavily in our decision.
              Approval is not guaranteed.
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white border-b border-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
              Where We Lend
            </h2>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed">
              Fiona Loans serves qualified borrowers in all 50 U.S. states from
              our corporate headquarters at{" "}
              <span className="font-medium text-text-primary">
                22632 Golden Springs Dr, Suite 315, Diamond Bar, California
              </span>
              . The rate, the terms, and the process are identical wherever you
              live.
            </p>
          </div>
        </div>
      </section>

      <FAQSection />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            See Your Payment Before You Apply
          </h2>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Run the numbers, see the exact monthly payment, and decide from
            there. Applying doesn&apos;t obligate you to accept anything.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#calculator"
              className="bg-secondary hover:bg-secondary-light text-primary-dark px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-block"
            >
              Check Your Payment
            </Link>
            <Link
              href="/apply"
              prefetch={false}
              className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 inline-block"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
