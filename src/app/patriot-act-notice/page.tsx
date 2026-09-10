// NOTE: Structural template only. A licensed financial services attorney must
// review and finalize this notice before the site goes live.
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/ui/JsonLd";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "USA PATRIOT Act / Customer Identification Program Notice",
  description: `Important information about procedures for opening a new account with ${SITE_NAME}. Federal law requires us to obtain, verify, and record information that identifies each applicant.`,
  alternates: { canonical: "/patriot-act-notice" },
};

export default function PatriotActNoticePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "USA PATRIOT Act Notice", url: "/patriot-act-notice" },
        ]}
      />

      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">
            Important Information About Procedures for Opening a New Account
          </h1>
          <p className="mt-3 text-white/70">
            USA PATRIOT Act &mdash; Customer Identification Program
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-text-secondary leading-relaxed">
            <p>
              To help the government fight the funding of terrorism and money
              laundering activities, Federal law requires all financial
              institutions to obtain, verify, and record information that
              identifies each person who opens an account.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                What This Means For You
              </h2>
              <p>
                When you apply for a loan with {SITE_NAME}, we will ask for your
                name, address, date of birth, and other information that will
                allow us to identify you. We may also ask to see your
                driver&apos;s license or other identifying documents during the
                underwriting process.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
