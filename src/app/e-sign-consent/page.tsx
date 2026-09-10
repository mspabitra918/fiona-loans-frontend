// NOTE: Structural template only. A licensed financial services attorney must
// review and finalize this disclosure before the site goes live.
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/ui/JsonLd";
import {
  SITE_NAME,
  BUSINESS_EMAIL,
  BUSINESS_PHONE,
  BUSINESS_PHONE_TEL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Electronic Signature and Delivery Consent",
  description: `${SITE_NAME} E-Sign consent disclosure. Learn how we deliver loan agreements and disclosures electronically under the federal E-SIGN Act, and how to withdraw consent.`,
  alternates: { canonical: "/e-sign-consent" },
};

export default function ESignConsentPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "E-Sign Consent", url: "/e-sign-consent" },
        ]}
      />

      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">
            Electronic Signature and Delivery Consent
          </h1>
          <p className="mt-3 text-white/70">
            Your consent to receive Communications electronically
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-text-secondary leading-relaxed">
            <p>
              To apply for and receive a loan from {SITE_NAME}, we must provide
              you with certain disclosures, notices, and agreements
              (&quot;Communications&quot;). Under the federal E-SIGN Act, we can
              provide these Communications to you electronically only if you
              consent.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                1. Electronic Delivery of Communications
              </h2>
              <p>
                By clicking &quot;Submit&quot; on our application and proceeding
                with our phone underwriting process, you agree to receive all
                legal and financial Communications from {SITE_NAME}
                electronically. This includes, but is not limited to, your loan
                agreement, Truth in Lending disclosures, privacy notices, and
                account statements.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                2. Withdrawing Your Consent
              </h2>
              <p>
                You have the right to withdraw your consent to receive
                electronic Communications at any time at no cost. However,
                because our lending process is strictly digital, withdrawing
                your consent prior to signing will result in the termination of
                your loan application. To withdraw consent, please contact us at{" "}
                <a
                  href={`mailto:${BUSINESS_EMAIL}`}
                  className="text-primary hover:underline"
                >
                  {BUSINESS_EMAIL}
                </a>{" "}
                or{" "}
                <a
                  href={`tel:${BUSINESS_PHONE_TEL}`}
                  className="text-primary hover:underline"
                >
                  {BUSINESS_PHONE}
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                3. Updating Your Contact Information
              </h2>
              <p>
                You are responsible for keeping your email address and phone
                number current. You must promptly notify us of any changes by
                emailing{" "}
                <a
                  href={`mailto:${BUSINESS_EMAIL}`}
                  className="text-primary hover:underline"
                >
                  {BUSINESS_EMAIL}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
