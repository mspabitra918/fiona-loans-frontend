import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { BreadcrumbSchema } from "@/components/ui/JsonLd";
import {
  SITE_NAME,
  BUSINESS_PHONE,
  BUSINESS_PHONE_TEL,
  LOAN_LIMITS,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    absolute: "How to Get a Personal Loan Fast | Fiona Loans Process",
  },
  description:
    "Learn how the Fiona Loans 3-step process works. Apply online, call for live underwriting and e-sign your agreement, then receive your funds within 24 hours.",
  alternates: {
    canonical: "/how-it-works",
  },
};

const STEPS = [
  {
    step: "1",
    title: "Apply Online",
    timeline: "About 5 Minutes",

    image: "/images/how-it-works/apply-online.jpg",
    imageAlt:
      "Customer completing an online personal loan application on a laptop",

    details: [
      <>
        <strong>Complete our secure online application</strong> in just a few
        minutes to tell us about yourself and the amount you'd like to borrow.
      </>,
      <>
        <strong>100% Online</strong> — no paperwork, faxing, or printing
        required.
      </>,
      <>
        <strong>$0 Upfront Fees</strong> — there are never application or
        processing charges.
      </>,
      <>
        <strong>Available Nationwide</strong> — borrowers from all 50 U.S.
        states are welcome to apply.
      </>,
    ],
  },

  {
    step: "2",
    title: "Complete Live Underwriting",
    timeline: "Immediate",

    image: "/images/how-it-works/phone-underwriting.jpg",
    imageAlt:
      "Friendly Fiona Loans underwriting specialist assisting a customer over the phone",

    details: [
      <>
        <strong>Human-First Underwriting</strong> — speak directly with one of
        our underwriting specialists.
      </>,
      <>
        <strong>Fixed {LOAN_LIMITS.minAPR}% APR</strong> — every approved
        borrower receives the same transparent fixed interest rate.
      </>,
      <>
        <strong>Review & E-Sign</strong> your loan agreement during your call.
      </>,
      <>
        <strong>No Prepayment Penalty</strong> — pay your loan off early at any
        time without additional fees.
      </>,
    ],
  },

  {
    step: "3",
    title: "Receive Your Funds",
    timeline: "Within 24 Hours",

    image: "/images/how-it-works/funds-deposited.jpg",
    imageAlt: "Customer checking their bank account after receiving loan funds",

    details: [
      <>
        <strong>Direct Deposit</strong> into your eligible U.S. checking
        account.
      </>,
      <>
        <strong>Funding Goal: 24 Hours</strong> after completing your loan
        agreement.
      </>,
      <>
        <strong>$0 Origination Fees</strong> — receive your full approved loan
        amount.
      </>,
      <>
        <strong>Ongoing Customer Support</strong> whenever you need assistance.
      </>,
    ],
  },
];
export default function HowItWorksPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "How It Works", url: "/how-it-works" },
        ]}
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Get Funded in 3 Simple Steps
          </h1>

          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Apply online in minutes, complete your underwriting with one quick
            phone call, and receive your funds in as little as 24 hours.
          </p>
        </div>
      </section>
      {/* Detailed Steps */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {STEPS.map((item, index) => (
              <div
                key={item.step}
                className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center"
              >
                {/* Text */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="inline-flex items-center gap-3 mb-5">
                    <span className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                      {item.step}
                    </span>

                    <span className="uppercase tracking-wide text-primary font-semibold text-sm">
                      {item.timeline}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                    {item.title}
                  </h2>

                  {/* Step Description */}
                  {item.step === "1" && (
                    <p className="text-lg text-text-secondary leading-8 mb-8">
                      Complete our secure online application to tell us about
                      yourself, your income, and how much you'd like to borrow.
                      It only takes a few minutes to get started.
                    </p>
                  )}

                  {item.step === "2" && (
                    <p className="text-lg text-text-secondary leading-8 mb-8">
                      Call us at{" "}
                      <a
                        href={`tel:${BUSINESS_PHONE_TEL}`}
                        className="font-semibold text-primary hover:underline"
                      >
                        {BUSINESS_PHONE}
                      </a>{" "}
                      to complete your underwriting with a live specialist.
                      We'll review your loan terms, answer any questions, and
                      help you electronically sign your agreement during the
                      same call.
                    </p>
                  )}

                  {item.step === "3" && (
                    <p className="text-lg text-text-secondary leading-8 mb-8">
                      Once your agreement has been completed, we begin final
                      processing and work to deposit your approved loan directly
                      into your bank account within 24 hours.
                    </p>
                  )}

                  <ul className="space-y-4">
                    {item.details.map((detail, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-text-secondary"
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

                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lifestyle Image */}
                <div
                  className={`${
                    index % 2 === 1 ? "lg:order-1" : ""
                  } rounded-3xl overflow-hidden shadow-xl`}
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    width={700}
                    height={500}
                    priority={index === 0}
                    className="w-full h-[340px] md:h-[420px] object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>{" "}
      {/* Trust Signals */}
      <section className="bg-surface py-14 sm:py-16 border-y border-surface-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h3 className="font-bold text-text-primary">
                Funding Goal Within 24 Hours
              </h3>

              <p className="mt-2 text-sm text-text-secondary">
                After completing your loan agreement, we work to fund approved
                loans as quickly as possible.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>

              <h3 className="font-bold text-text-primary">
                Fixed {LOAN_LIMITS.minAPR}% APR
              </h3>

              <p className="mt-2 text-sm text-text-secondary">
                Every approved borrower receives the same transparent fixed
                interest rate with no hidden surprises.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h3 className="font-bold text-text-primary">
                Available Nationwide
              </h3>

              <p className="mt-2 text-sm text-text-secondary">
                Serving qualified borrowers throughout all 50 U.S. states.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-primary to-primary-light py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Get Started?
          </h2>

          <p className="mt-4 text-lg text-white/85 max-w-2xl mx-auto">
            Complete your online application today. When you're ready for Step
            2, simply call our underwriting team and we'll guide you through the
            remainder of the process.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/apply"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-xl bg-secondary px-10 py-4 text-lg font-bold text-primary-dark transition-all hover:bg-secondary-light shadow-lg hover:shadow-xl"
            >
              Apply Online
            </Link>

            <a
              href={`tel:${BUSINESS_PHONE_TEL}`}
              aria-label={`Call ${SITE_NAME} at ${BUSINESS_PHONE}`}
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-10 py-4 text-lg font-semibold text-white transition-all hover:border-white hover:bg-white/10"
            >
              Call {BUSINESS_PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
