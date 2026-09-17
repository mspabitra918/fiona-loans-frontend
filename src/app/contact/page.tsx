import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/ui/JsonLd";
import ContactForm from "@/components/forms/ContactForm";
import {
  BUSINESS_EMAIL,
  BUSINESS_PHONE,
  BUSINESS_PHONE_TEL,
  BUSINESS_ADDRESS,
  BUSINESS_HOURS_LINE,
} from "@/lib/constants";
import { CiCircleCheck } from "react-icons/ci";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Fiona Loans | Customer Support & Underwriting",
  },
  description:
    "Get in touch with Fiona Loans. Call us to complete your underwriting process, or reach out via email or mail. View our business hours and full contact details.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Contact Us", url: "/contact" },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">
            We Are Here to Help
          </h1>

          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Whether you are calling to complete your loan underwriting or simply
            have a question about our fixed 10% APR personal loans, our team is
            ready to assist you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Email */}
            <div className="bg-white rounded-xl p-8 shadow-md border border-surface-dark text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-text-primary mb-2">
                Email
              </h3>

              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="text-primary hover:text-primary-light transition-colors break-all"
              >
                {BUSINESS_EMAIL}
              </a>

              <p className="text-sm text-text-secondary mt-2">
                We typically respond within one business day.
              </p>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-xl p-8 shadow-md border border-surface-dark text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-text-primary mb-2">
                Phone
              </h3>

              <a
                href={`tel:${BUSINESS_PHONE_TEL}`}
                className="text-primary font-semibold hover:text-primary-light transition-colors"
              >
                {BUSINESS_PHONE}
              </a>

              <p className="text-sm text-text-secondary mt-2">
                {BUSINESS_HOURS_LINE}
              </p>

              <p className="text-xs text-primary font-semibold mt-3">
                Ready to move forward? Call us to complete Step 2 of your loan
                application with a live underwriting specialist.
              </p>
            </div>

            {/* Office */}
            <div className="bg-white rounded-xl p-8 shadow-md border border-surface-dark text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-text-primary mb-2">
                Office
              </h3>

              <p className="text-text-secondary text-sm leading-6">
                {BUSINESS_ADDRESS.street}
                <br />
                {BUSINESS_ADDRESS.city}, {BUSINESS_ADDRESS.state}{" "}
                {BUSINESS_ADDRESS.zip}
              </p>

              <p className="text-xs text-primary font-semibold mt-3">
                Corporate Headquarters
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary text-center mb-6">
              Send Us a Message
            </h2>

            <ContactForm />

            {/* Trust Badge */}
            <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
              <div className="flex justify-center my-3">
                <CiCircleCheck className="w-10 h-10 text-primary stroke-[0.1]" />
              </div>
              <h3 className="text-lg font-bold text-primary">
                Nationwide Direct Lender
              </h3>

              <p className="mt-2 text-sm text-text-secondary max-w-lg mx-auto">
                Providing transparent fixed-rate personal loans for qualified
                borrowers across the United States while operating from our
                California corporate headquarters.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
