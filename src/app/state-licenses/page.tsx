// NOTE: Structural template only. A licensed financial services attorney must
// review and finalize this page — including the state licensing table below —
// before the site goes live.
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/ui/JsonLd";
import { SITE_NAME, BUSINESS_EMAIL, LOAN_LIMITS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "State Licenses & Disclosures",
  description: `${SITE_NAME} provides personal financing to residents in all 50 U.S. states. Review our general lending disclosure and state-specific licensing information.`,
  alternates: { canonical: "/state-licenses" },
};

// Populated by legal counsel prior to launch.
const STATE_LICENSES = [
  { state: "California", license: "License number pending" },
  { state: "New York", license: "License number pending" },
  { state: "Texas", license: "License number pending" },
];

export default function StateLicensesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "State Licenses & Disclosures", url: "/state-licenses" },
        ]}
      />

      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">State Licenses &amp; Disclosures</h1>
          <p className="mt-3 text-white/70">
            Lending regulations and licensing by state
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-text-secondary leading-relaxed">
            <p>
              {SITE_NAME} provides personal financing to residents in all 50
              U.S. states. As a direct lender, we adhere to state-specific
              lending regulations.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                General Disclosure
              </h2>
              <p>
                {SITE_NAME} offers personal loans ranging from a minimum of $
                {LOAN_LIMITS.minAmount.toLocaleString()} to a maximum of $
                {LOAN_LIMITS.maxAmount.toLocaleString()}. All loans carry a
                fixed Annual Percentage Rate (APR) of {LOAN_LIMITS.minAPR}%.
                Loan approval is subject to the completion of our application
                and phone-based underwriting process. Funding disbursal is
                completed within 24 hours only after the loan agreement has been
                successfully e-signed by the borrower.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                State-Specific Licensing
              </h2>
              <div className="bg-white rounded-xl shadow-md border border-surface-dark overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-surface">
                      <tr>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">
                          State
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">
                          License / Registration
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-dark">
                      {STATE_LICENSES.map((row) => (
                        <tr key={row.state}>
                          <td className="px-6 py-4 text-sm text-text-primary font-medium">
                            {row.state}
                          </td>
                          <td className="px-6 py-4 text-sm text-text-secondary">
                            {row.license}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                Questions About Licensing
              </h2>
              <p>
                For questions about our licensing status in your state, contact
                us at{" "}
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
