import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/ui/JsonLd";
import { SITE_NAME } from "@/lib/constants";
import { FAQS } from "./faq-data";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: {
    absolute: "Personal Loan Frequently Asked Questions | Fiona Loans FAQ",
  },
  description:
    "Have questions about Fiona Loans? Find answers about our 10% APR, minimum and maximum loan amounts, credit score requirements, and 24-hour funding.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  return (
    <>
      <FAQSchema
        faqs={FAQS.map(({ question, plainAnswer }) => ({
          question,
          answer: plainAnswer,
        }))}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "FAQ", url: "/faq" },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Find answers to common questions about {SITE_NAME} personal loans.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-7">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="flex items-center justify-center gap-2 bg-surface rounded-lg py-3 px-4">
            <svg
              className="w-5 h-5 text-primary flex-shrink-0"
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
            <span className="text-xs font-medium text-text-secondary">
              Secure 256-Bit SSL Encrypted
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-surface rounded-lg py-3 px-4">
            <svg
              className="w-5 h-5 text-primary flex-shrink-0"
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
            <span className="text-xs font-medium text-text-secondary">
              Serving All 50 U.S. States
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-surface rounded-lg py-3 px-4">
            <svg
              className="w-5 h-5 text-primary flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
            <span className="text-xs font-medium text-text-secondary">
              $0 Upfront Application Fees
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-primary-light py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Still Have Questions?
          </h2>
          <p className="mt-4 text-white/80 text-lg">
            Our team is here to help. Contact us or start your application
            today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              prefetch={false}
              className="bg-secondary hover:bg-secondary-light text-primary-dark px-10 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl inline-block"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white/30 hover:border-white/60 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
