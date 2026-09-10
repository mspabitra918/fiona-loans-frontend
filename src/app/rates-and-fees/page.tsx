import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/ui/JsonLd";
import { SITE_NAME, LOAN_LIMITS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Rates, Fees & Repayment Terms (TILA Disclosures)",
  description: `${SITE_NAME} personal loan disclosures under the Truth in Lending Act: $2,000–$10,000 loan amounts, a fixed 10.00% APR, $0 origination fee, and no prepayment penalty.`,
  alternates: { canonical: "/rates-and-fees" },
};

export default function RatesAndFeesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Rates & Fees", url: "/rates-and-fees" },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Transparent Lending Disclosures
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            In accordance with the Truth in Lending Act (TILA), {SITE_NAME}
            provides full transparency regarding the costs associated with your
            personal loan.
          </p>
        </div>
      </section>

      {/* Top Value Cards */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl p-8 shadow-md border border-surface-dark text-center">
              <p className="text-4xl font-bold text-primary">10%</p>
              <p className="text-text-secondary mt-2">Flat Rate</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md border border-surface-dark text-center">
              <p className="text-4xl font-bold text-primary">$0</p>
              <p className="text-text-secondary mt-2">Upfront Fees</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md border border-surface-dark text-center">
              <p className="text-4xl font-bold text-primary">Flexible</p>
              <p className="text-text-secondary mt-2">Terms: 24–60 Months</p>
            </div>
          </div>

          {/* TILA Key Terms */}
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Key Loan Terms
          </h2>
          <div className="bg-white rounded-xl shadow-md border border-surface-dark overflow-hidden mb-12">
            <table className="w-full">
              <caption className="sr-only">
                Truth in Lending Act key loan terms
              </caption>
              <tbody className="divide-y divide-surface-dark">
                {[
                  {
                    term: "Minimum Loan Amount",
                    value: `$${LOAN_LIMITS.minAmount.toLocaleString()}`,
                  },
                  {
                    term: "Maximum Loan Amount",
                    value: `$${LOAN_LIMITS.maxAmount.toLocaleString()}`,
                  },
                  {
                    term: "Annual Percentage Rate (APR)",
                    value: `${LOAN_LIMITS.minAPR.toFixed(2)}% Fixed`,
                  },
                  {
                    term: "Repayment Terms",
                    value: `${LOAN_LIMITS.minTerm} to ${LOAN_LIMITS.maxTerm} months`,
                  },
                ].map((row) => (
                  <tr key={row.term}>
                    <th
                      scope="row"
                      className="text-left px-6 py-4 text-sm text-text-primary font-medium"
                    >
                      {row.term}
                    </th>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Representative Example */}
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Representative Example
          </h2>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
            <p className="text-text-primary leading-relaxed">
              If you borrow <strong>$5,000</strong> over a{" "}
              <strong>36-month term</strong> at a fixed{" "}
              <strong>10.00% APR</strong>, your monthly payment will be{" "}
              <strong>$161.34</strong>. The total amount repaid over the life of
              the loan, including principal and interest, will be{" "}
              <strong>$5,808.09</strong>.
            </p>
          </div>

          {/* Fee Schedule */}
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Fees and Penalties
          </h2>
          <div className="bg-white rounded-xl shadow-md border border-surface-dark overflow-hidden mb-12">
            <table className="w-full">
              <thead className="bg-surface">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">
                    Fee Type
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-dark">
                {[
                  { fee: "Origination Fee", amount: "$0.00" },
                  { fee: "Prepayment Penalty", amount: "None" },
                  { fee: "Application Fee", amount: "$0.00" },
                  { fee: "Upfront Processing Fee", amount: "$0.00" },
                  {
                    fee: "Late Payment Fee",
                    amount: "$5 (after 5-day grace period)",
                  },
                ].map((item) => (
                  <tr key={item.fee}>
                    <td className="px-6 py-4 text-sm text-text-primary font-medium">
                      {item.fee}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {item.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Transparent Rates Nationwide */}
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Transparent Rates Nationwide (All 50 US States)
          </h2>
          <p className="text-text-secondary mb-6">
            Fiona Loans provides a consistent fixed 10% APR regardless of your
            state. We believe geography shouldn&apos;t dictate your cost of
            capital.
          </p>
          <p className="text-xs text-text-secondary mb-6 italic">
            Availability of specific loan terms may vary based on state-specific
            regulations.
          </p>
          <div className="bg-white rounded-xl shadow-md border border-surface-dark overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">
                      Region
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">
                      Fixed APR{" "}
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">
                      Loan Range
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-dark">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-text-primary">
                      All 50 U.S. States
                    </td>

                    <td className="px-6 py-4 text-sm text-text-secondary">
                      Fixed 10.00% APR
                    </td>

                    <td className="px-6 py-4 text-sm text-text-secondary">
                      $2,000 – $10,000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* The Power of the Flat Fee */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Finally, Math You Can Understand.
            </h2>
            <p className="text-text-secondary mb-6">
              Most lenders hide behind confusing compound interest formulas.
              Fiona Loans keeps it simple with a fixed 10% APR so you always
              know exactly what you&apos;ll pay each month.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <span className="text-primary font-bold mt-0.5">&#10003;</span>
                <span className="text-text-primary">
                  Borrow $2,000: Repay just <strong>$92.29/mo</strong> for 24
                  months.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-primary font-bold mt-0.5">&#10003;</span>
                <span className="text-text-primary">
                  Borrow $5,000: Repay just <strong>$106.24/mo</strong> for 60
                  months.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-primary font-bold mt-0.5">&#10003;</span>
                <span className="text-text-primary font-medium">
                  No hidden maintenance or service fees.
                </span>
              </li>
            </ul>
            <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-surface-dark">
              <p className="text-sm text-text-secondary mb-2">
                Monthly payment example
              </p>
              <p className="text-text-primary">
                $5,000 loan at 10% APR for 60 months ={" "}
                <span className="text-3xl font-bold text-primary">
                  $106.24/mo
                </span>
              </p>
              <p className="text-xs text-text-secondary mt-1">
                Less than most cell phone bills.
              </p>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
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
                256-Bit Secure Data Encrypted
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
                $0 Upfront Cost Guarantee
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
                U.S-Based & Operated
              </span>
            </div>
          </div>

          {/* Pricing Disclosure */}
          <div className="bg-surface rounded-xl p-6 text-sm text-text-secondary leading-relaxed">
            <h3 className="font-semibold text-text-primary mb-2">
              Pricing Disclosure
            </h3>
            <p>
              Fiona Loans offers a fixed 10% Annual Percentage Rate (APR) on all
              personal loans. We do not charge upfront fees, application fees,
              or origination fees. Your cost of capital is transparent and fixed
              for the life of the loan.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-primary-light py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Get Started?
          </h2>

          <p className="mt-4 text-lg text-white/85 max-w-2xl mx-auto">
            Apply today to lock in your fixed 10.00% APR. No hidden fees, no
            variable rates, and no surprises.
          </p>

          <Link
            href="/apply"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-secondary hover:bg-secondary-light px-10 py-4 text-lg font-bold text-primary-dark transition-all shadow-lg hover:shadow-xl"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </>
  );
}
