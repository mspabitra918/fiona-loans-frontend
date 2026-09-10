import {
  SITE_NAME,
  SITE_URL,
  BUSINESS_EMAIL,
  BUSINESS_PHONE,
  BUSINESS_ADDRESS,
  LOAN_LIMITS,
} from "@/lib/constants";

export function FinancialServiceSchema() {
  const address = {
    "@type": "PostalAddress",
    streetAddress: BUSINESS_ADDRESS.street,
    addressLocality: BUSINESS_ADDRESS.city,
    addressRegion: BUSINESS_ADDRESS.state,
    postalCode: BUSINESS_ADDRESS.zip,
    addressCountry: BUSINESS_ADDRESS.country,
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: SITE_NAME,
    url: SITE_URL,
    description: `${SITE_NAME} is a direct personal loan provider offering $${LOAN_LIMITS.minAmount.toLocaleString()} to $${LOAN_LIMITS.maxAmount.toLocaleString()} loans at a fixed ${LOAN_LIMITS.minAPR}% APR to borrowers in all 50 U.S. states, regardless of credit score.`,
    areaServed: [{ "@type": "Country", name: "United States" }],
    serviceType: "Personal Loans",
    email: BUSINESS_EMAIL,
    telephone: BUSINESS_PHONE,
    address,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "06:00",
        closes: "16:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Personal Loans",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "LoanOrCredit",
            name: "Personal Loan",
            loanType: "Unsecured personal loan",
            currency: "USD",
            amount: {
              "@type": "MonetaryAmount",
              currency: "USD",
              minValue: LOAN_LIMITS.minAmount,
              maxValue: LOAN_LIMITS.maxAmount,
            },
            annualPercentageRate: LOAN_LIMITS.minAPR,
            loanTerm: {
              "@type": "QuantitativeValue",
              minValue: LOAN_LIMITS.minTerm,
              maxValue: LOAN_LIMITS.maxTerm,
              unitCode: "MON",
            },
          },
        },
      ],
    },
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      email: BUSINESS_EMAIL,
      telephone: BUSINESS_PHONE,
      address,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
