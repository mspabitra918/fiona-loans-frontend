// NOTE: Structural template only. A licensed financial services attorney must
// review and finalize this notice before the site goes live.
import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/ui/JsonLd";
import {
  SITE_NAME,
  BUSINESS_PHONE,
  BUSINESS_PHONE_TEL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Financial Privacy Notice (GLBA)",
  description: `What does ${SITE_NAME} do with your personal information? Read our Gramm-Leach-Bliley Act privacy notice covering what we collect, how we share it, and how we protect it.`,
  alternates: { canonical: "/glba-privacy-notice" },
};

const COLLECTED = [
  "Social Security number and income",
  "Account balances and payment history",
  "Credit history and credit scores",
];

export default function GlbaPrivacyNoticePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Financial Privacy Notice", url: "/glba-privacy-notice" },
        ]}
      />

      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">
            What Does {SITE_NAME} Do With Your Personal Information?
          </h1>
          <p className="mt-3 text-white/70">
            Financial Privacy Notice &mdash; Gramm-Leach-Bliley Act
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-text-secondary leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                Why We Provide This Notice
              </h2>
              <p>
                Federal law requires us to tell you how we collect, share, and
                protect your personal information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                What We Collect
              </h2>
              <p className="mb-3">
                The types of personal information we collect and share depend on
                the product or service you have with us. This information can
                include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                {COLLECTED.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                Questions?
              </h2>
              <p>
                Call{" "}
                <a
                  href={`tel:${BUSINESS_PHONE_TEL}`}
                  className="text-primary hover:underline"
                >
                  {BUSINESS_PHONE}
                </a>{" "}
                or go to{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  our contact page
                </Link>
                .
              </p>
            </div>

            <div className="bg-surface rounded-xl p-6 text-sm">
              <p>
                For full details on how we handle your data &mdash; including
                your opt-out rights, data retention, and security practices
                &mdash; see our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-primary hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
