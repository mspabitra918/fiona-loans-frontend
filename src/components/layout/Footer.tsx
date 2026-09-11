import Link from "next/link";
import {
  SITE_NAME,
  BUSINESS_EMAIL,
  BUSINESS_PHONE,
  BUSINESS_PHONE_TEL,
  BUSINESS_ADDRESS_LINE,
  BUSINESS_HOURS_LINE,
  NAV_LINKS,
  LEGAL_LINKS,
} from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <span className="font-extrabold tracking-tight text-white text-3xl">
                Fiona<span className="text-white font-normal"> Loans</span>
              </span>
            </div>

            <p className="text-white/70 text-sm leading-relaxed">
              Fiona Loans is a direct lender offering fixed-rate personal loans
              to qualified borrowers across the United States. One rate for
              every approved borrower, disclosed in full before you sign.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-secondary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/apply"
                  prefetch={false}
                  className="text-secondary hover:text-secondary-light transition-colors text-sm font-medium"
                >
                  Apply Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-secondary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/state-licenses"
                  className="text-white/70 hover:text-secondary transition-colors text-sm"
                >
                  State Licenses &amp; Disclosures
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start space-x-2">
                <svg
                  className="w-5 h-5 mt-0.5 text-secondary flex-shrink-0"
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
                <a
                  href={`mailto:${BUSINESS_EMAIL}`}
                  className="hover:text-secondary transition-colors"
                >
                  {BUSINESS_EMAIL}
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <svg
                  className="w-5 h-5 mt-0.5 text-secondary flex-shrink-0"
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
                <a
                  href={`tel:${BUSINESS_PHONE_TEL}`}
                  className="hover:text-secondary transition-colors"
                >
                  {BUSINESS_PHONE}
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <svg
                  className="w-5 h-5 mt-0.5 text-secondary flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{BUSINESS_HOURS_LINE}</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg
                  className="w-5 h-5 mt-0.5 text-secondary flex-shrink-0"
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
                <address className="not-italic">
                  {BUSINESS_ADDRESS_LINE}
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* APR & Disclosures */}
        <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
          <p className="text-xs text-white/50 leading-relaxed">
            Fiona Loans offers a fixed 10.00% APR on all personal loans. Loan
            amounts range from $2,000 to $10,000 with terms of 12, 24, 36, or 48
            months. Origination fee: $0.00. Application fee: $0.00. Prepayment
            penalty: none. Representative example: a $5,000 loan repaid over 36
            months at a fixed 10.00% APR has 36 monthly payments of $161.34 and
            a total repayment of $5,808.24, of which $808.24 is interest. All
            loans are subject to credit approval, identity and income
            verification, and completion of our phone-based underwriting
            process. Not all applicants will qualify.
          </p>

          <p className="text-xs text-white/50 leading-relaxed">
            Fiona Loans is an equal opportunity lender and does not discriminate
            on the basis of race, color, religion, national origin, sex, marital
            status, age, disability, or receipt of public assistance. State
            license information is available at{" "}
            <Link
              href="/state-licenses"
              className="underline hover:text-white transition-colors"
            >
              State Licenses &amp; Disclosures
            </Link>
            .
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
