import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/ui/JsonLd";
import { SITE_NAME, LEGAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sitemap",
  description: `Browse every page on the ${SITE_NAME} website, including loan information, application pages, and legal disclosures.`,
  alternates: { canonical: "/site-map" },
};

const SECTIONS: { heading: string; links: { href: string; label: string }[] }[] =
  [
    {
      heading: "Main Pages",
      links: [
        { href: "/", label: "Home" },
        { href: "/apply", label: "Apply Now" },
        { href: "/how-it-works", label: "How It Works" },
        { href: "/rates-and-fees", label: "Rates, Fees & Repayment Terms" },
        { href: "/about", label: "About Us" },
        { href: "/faq", label: "FAQ" },
        { href: "/contact", label: "Contact Us" },
        { href: "/loan-status", label: "Loan Status" },
      ],
    },
    {
      heading: "Legal & Compliance",
      // `/site-map` is this page — no need to link it to itself.
      links: LEGAL_LINKS.filter((link) => link.href !== "/site-map"),
    },
  ];

export default function SiteMapPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Sitemap", url: "/site-map" },
        ]}
      />

      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Sitemap</h1>
          <p className="mt-3 text-white/70">
            Every page on the {SITE_NAME} website
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {SECTIONS.map((section) => (
              <div key={section.heading}>
                <h2 className="text-2xl font-bold text-text-primary mb-4">
                  {section.heading}
                </h2>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-primary hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
