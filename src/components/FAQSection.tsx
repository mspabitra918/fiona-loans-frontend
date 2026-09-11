export default function FAQSection() {
  const faqs = [
    {
      question: "What is the interest rate on a Fiona Loans personal loan?",
      answer:
        "A fixed 10.00% APR for every approved borrower, regardless of loan amount, term, credit profile, or state.",
    },
    {
      question: "How much can I borrow?",
      answer:
        "Between $2,000 and $10,000, in $500 increments. The approved amount depends on your income and existing obligations.",
    },
    {
      question: "Are there any fees?",
      answer:
        "No application fee, no origination fee, and no prepayment penalty. Late and returned payment fees are disclosed in full in your loan agreement.",
    },
    {
      question: "How fast can I get the money?",
      answer:
        "Most borrowers are funded within one to two business days after completing the phone underwriting call and signing their agreement.",
    },
    {
      question: "Do you check credit?",
      answer:
        "Yes, as part of underwriting. Your credit history is one input into the approval decision — but it never changes your rate.",
    },
  ];

  // FAQPage JSON-LD Schema for Search Engine Rich Snippets
  const faqSchema = {
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
    <section className="py-16 sm:py-24 bg-white border-b border-surface-dark">
      {/* Inject FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
            Common Questions
          </h2>
        </div>

        <div className="max-w-6xl mx-auto divide-y divide-surface-dark border-y border-surface-dark">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-6">
              <h3 className="text-lg font-bold text-text-primary mb-2">
                {faq.question}
              </h3>
              <p className="text-text-secondary leading-relaxed text-base">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
