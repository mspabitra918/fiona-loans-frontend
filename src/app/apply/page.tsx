import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/ui/JsonLd";
import ApplicationWizard from "@/components/forms/ApplicationWizard";
import { BUSINESS_PHONE, BUSINESS_PHONE_TEL } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    absolute: "Apply for a Personal Loan | Quick Application | Fiona Loans",
  },
  description:
    "Start your Fiona Loans application today. Borrow up to $10k with a fixed 10% APR. All credit scores accepted. Submit your form and call for instant underwriting.",
  alternates: { canonical: "/apply" },
};

export default function ApplyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Apply Now", url: "/apply" },
        ]}
      />

      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Secure Loan Application
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto leading-relaxed">
            Start your journey to financial clarity. Fill out the secure form
            below. Because we accept all credit scores, your application is
            strictly for verifying your identity and loan requirements.
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ApplicationWizard />
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-surface py-12 sm:py-16 border-t border-surface-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Next Steps: Call Us Immediately
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            Once you click submit, your application is in our system. To
            finalize your loan, you must call us at{" "}
            <a
              href={`tel:${BUSINESS_PHONE_TEL}`}
              className="text-primary font-semibold hover:underline"
            >
              {BUSINESS_PHONE}
            </a>
            . You will be instantly transferred to our underwriting team to
            e-sign your agreement over the phone.
          </p>
          <a
            href={`tel:${BUSINESS_PHONE_TEL}`}
            className="mt-8 bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg hover:shadow-xl inline-block"
          >
            Call {BUSINESS_PHONE}
          </a>
        </div>
      </section>
    </>
  );
}
