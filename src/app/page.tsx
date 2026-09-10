import Link from "next/link";
import LoanCalculator from "@/components/ui/LoanCalculator";
import Testimonials from "@/components/ui/Testimonials";
import { SITE_NAME, BUSINESS_PHONE, BUSINESS_PHONE_TEL } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  // `absolute` so the root layout's "%s | Fiona Loans" template doesn't append
  // a second brand suffix to a title that already carries one.
  title: {
    absolute:
      "Personal Loans for All Credit Scores | Fixed 10% APR | Fiona Loans",
  },
  description:
    "Fiona Loans offers personal loans from $2,000 to $10,000 with a fixed 10% APR. Available in all 50 U.S. states for all credit scores. Apply and get funded within 24 hours.",
  keywords: [
    "personal loans",
    "personal loans all credit scores",
    "fixed 10% APR loan",
    "direct lender",
    "debt consolidation loans",
    "online loans",
    "fast personal loans",
    "Fiona Loans",
  ],
  alternates: { canonical: "/" },
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
                Fixed 10% APR Personal Loans for{" "}
                <span className="text-secondary">All Credit Scores</span>
              </h1>
              <p className="mt-4 text-xl sm:text-2xl text-white font-semibold">
                Borrow $2,000 to $10,000 nationwide. Fast approvals & 24-hour
                funding
              </p>
              {/* <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-lg">
                At {SITE_NAME}, we believe in straightforward financing. Whether
                you are living on the East Coast, the West Coast, or anywhere in
                between, we provide personal loans to residents in all 50 U.S.
                states. With a single, fixed annual percentage rate (APR) and
                acceptance for all credit profiles, getting the funds you need
                has never been clearer.
              </p> */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/apply"
                  prefetch={false}
                  className="bg-secondary hover:bg-secondary-light text-primary-dark px-8 py-4 rounded-lg font-bold text-lg text-center transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Apply Now
                </Link>
                {/* <a
                  href={`tel:${BUSINESS_PHONE_TEL}`}
                  aria-label={`Call ${SITE_NAME} today at ${BUSINESS_PHONE}`}
                  className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg text-center transition-all duration-200"
                >
                  Call Us Today
                </a> */}
              </div>
              {/* Trust Tags */}
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
                  {/* <span>All Credit Scores Accepted</span> */}
                  <span>All 50 States</span>
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
                  {/* <span>$0 Upfront Fees</span> */}
                  <span>Fixed 10% APR</span>
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
                  <span>24 Hours Funding</span>
                  {/* <span>Serving All 50 States</span> */}
                </div>
              </div>
            </div>

            {/* 2. Flat-Fee Calculator */}
            <div className="lg:pl-8">
              <LoanCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Fiona Loans at a Glance */}
      <section className="bg-surface py-12 sm:py-16 border-b border-surface-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary text-center">
            {SITE_NAME} at a Glance
          </h2>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-primary">
                $2,000&ndash;$10,000
              </p>
              <h3 className="text-sm text-text-secondary mt-1">Loan Amounts</h3>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">10%</p>
              <h3 className="text-sm text-text-secondary mt-1">Fixed APR</h3>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">All</p>
              <h3 className="text-sm text-text-secondary mt-1">
                Credit Scores
              </h3>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">24 HRS</p>
              <h3 className="text-sm text-text-secondary mt-1">
                Funding Speed
              </h3>
            </div>
          </div>

          <div className="mt-10 bg-white rounded-xl shadow-md border border-surface-dark overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <caption className="sr-only">
                  {SITE_NAME} loan features and offerings
                </caption>
                <thead className="bg-surface">
                  <tr>
                    <th
                      scope="col"
                      className="text-left px-6 py-4 text-sm font-semibold text-text-primary"
                    >
                      Feature
                    </th>
                    <th
                      scope="col"
                      className="text-left px-6 py-4 text-sm font-semibold text-text-primary"
                    >
                      {SITE_NAME} Offering
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-dark">
                  {AT_A_GLANCE.map((row) => (
                    <tr key={row.feature}>
                      <th
                        scope="row"
                        className="text-left px-6 py-4 text-sm text-text-primary font-medium"
                      >
                        {row.feature}
                      </th>
                      <td className="px-6 py-4 text-sm text-text-secondary">
                        {row.offering}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Fiona Loans? */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
              Why Choose {SITE_NAME}?
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              We&apos;re a direct lender, not a broker. We&apos;ve redesigned
              the personal loan to be as clear as a mountain stream &mdash; one
              fixed rate, every credit profile, all 50 states.
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
                title: "Radical Transparency",
                description:
                  "No hidden fees, no variable rates. Every borrower receives the exact same fixed 10% APR, with $0 origination fee and no prepayment penalty.",
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
                title: "Fast Funding",
                description:
                  "Once you complete phone underwriting and e-sign your agreement, your funds are disbursed within 24 hours.",
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
                title: "Universal Acceptance",
                description:
                  "Your financial future is more than a three-digit number. We accept applicants across all credit score ranges, in all 50 U.S. states.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow border border-surface-dark"
              >
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
            ))}
          </div>
        </div>
      </section>

      {/* 5. Personal Loans for Every Need */}
      <section className="bg-surface py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
              Personal Financing for Every Purpose
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              {SITE_NAME} provides flexible capital tailored to your specific
              situation. Because we accept all credit score ranges, you can
              secure funding without the typical barriers. You can use your{" "}
              {SITE_NAME} personal loan for any purpose, including:
            </p>
          </div>

          <ul className="max-w-2xl mx-auto  space-y-3">
            {LOAN_PURPOSE_USES.map((use) => (
              <li
                key={use}
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
                <span>{use}</span>
              </li>
            ))}
          </ul>

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Debt Consolidation",
                description:
                  "Combine multiple debts into one manageable monthly payment with a fixed rate.",
                href: "/apply",
              },
              {
                title: "Home Improvement",
                description:
                  "Finance renovations and upgrades to increase your home's value and comfort.",
                href: "/apply",
              },
              {
                title: "Medical Expenses",
                description:
                  "Cover unexpected medical bills or planned procedures without financial stress.",
                href: "/apply",
              },
              {
                title: "Auto Repairs",
                description:
                  "Fund auto repairs or maintenance to keep you on the road without breaking the bank.",
                href: "/apply",
              },
              {
                title: "Business",
                description:
                  "Invest in your business growth with flexible personal financing options.",
                href: "/apply",
              },
              {
                title: "Education",
                description:
                  "Pursue your educational goals with affordable personal loan financing.",
                href: "/apply",
              },
            ].map((purpose) => (
              <Link
                key={purpose.title}
                href={purpose.href}
                prefetch={false}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-surface-dark group"
              >
                <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors">
                  {purpose.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  {purpose.description}
                </p>
                <span className="mt-4 inline-flex items-center text-primary font-medium text-sm">
                  Apply Now
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div> */}
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
              Get Funded in 3 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Apply Online",
                description:
                  "Fill out our secure, basic online application form to establish your profile and requested loan amount. Takes about 5 minutes.",
              },
              {
                step: "2",
                title: "Call for Underwriting",
                description: `Call our team at ${BUSINESS_PHONE}. We will transfer you to underwriting to review your terms and e-sign your agreement.`,
              },
              {
                step: "3",
                title: "Receive Your Funds",
                description:
                  "Your call is transferred to funding for final processing. Funds are sent to your account within 24 hours.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-text-primary mt-6 mb-3">
                  {item.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
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
                <span>$0 Upfront Fee Guarantee</span>
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
                <span>Nationwide Direct Lender</span>
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
                <span>All Credit Scores Accepted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Apply online in minutes, then call {BUSINESS_PHONE} to complete
            underwriting and e-sign your agreement.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="bg-secondary hover:bg-secondary-light text-primary-dark px-10 py-4 rounded-lg font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-block"
            >
              Apply Now
            </Link>
            <a
              href={`tel:${BUSINESS_PHONE_TEL}`}
              aria-label={`Call ${SITE_NAME} at ${BUSINESS_PHONE}`}
              className="border-2 border-white/30 hover:border-white/60 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-200 inline-block"
            >
              Call {BUSINESS_PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
