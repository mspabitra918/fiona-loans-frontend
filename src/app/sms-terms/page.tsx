// NOTE: Structural template only. A licensed financial services attorney must
// review and finalize these terms before the site goes live.
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/ui/JsonLd";
import {
  SITE_NAME,
  BUSINESS_EMAIL,
  BUSINESS_PHONE,
  BUSINESS_PHONE_TEL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "SMS Text Messaging Terms",
  description: `${SITE_NAME} SMS and TCPA terms and conditions. Learn about message frequency, data rates, and how to opt out by texting STOP or get help by texting HELP.`,
  alternates: { canonical: "/sms-terms" },
};

export default function SmsTermsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "SMS Terms", url: "/sms-terms" },
        ]}
      />

      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">SMS Text Messaging Terms</h1>
          <p className="mt-3 text-white/70">
            TCPA terms and conditions for text message communications
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-text-secondary leading-relaxed">
            <p>
              By providing your mobile phone number to {SITE_NAME}, you agree to
              receive text messages from us regarding your loan application,
              underwriting status, funding disbursement, and ongoing account
              servicing.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                Message Frequency and Rates
              </h2>
              <p>
                Message frequency varies based on your application status and
                account activity. Message and data rates may apply.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                Opting Out (STOP)
              </h2>
              <p>
                You can cancel the SMS service at any time. Simply text
                &quot;STOP&quot; to the shortcode or number from which you
                received the message.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                Help and Support (HELP)
              </h2>
              <p>
                If you are experiencing issues with the messaging program, you
                can reply with the keyword &quot;HELP&quot; for more assistance,
                or you can get help directly at{" "}
                <a
                  href={`tel:${BUSINESS_PHONE_TEL}`}
                  className="text-primary hover:underline"
                >
                  {BUSINESS_PHONE}
                </a>{" "}
                or{" "}
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
