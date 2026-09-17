import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { BreadcrumbSchema } from "@/components/ui/JsonLd";
import {
  SITE_NAME,
  BUSINESS_PHONE,
  BUSINESS_PHONE_TEL,
  LOAN_LIMITS,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    absolute:
      "How to Get a Personal Loan — Apply, Verify, Get Funded | Fiona Loans",
  },
  description:
    "How a Fiona Loans personal loan works: apply online in five minutes, complete underwriting on one phone call, and receive funds typically within one business day.",
  keywords: [
    "how to get a personal loan",
    "personal loan application process",
    "how long does it take to get a personal loan",
  ],
  alternates: {
    canonical: "/how-it-works",
  },
};

const STEPS = [
  {
    step: "1",
    title: "Step 1 — Apply Online",
    timeline: "About 5 minutes",
    image: "/images/how-it-works/apply-online.jpg",
    imageAlt:
      "Customer completing an online personal loan application on a laptop",
    intro:
      "Complete our secure online application with your loan amount, term, purpose, identity, employment, income, and banking details. We ask for your Social Security number so we can verify your identity and check your credit. When you submit, you'll receive an Application ID on screen and by email. Keep it — you'll need it to check your status.",
    details: [
      <>
        <strong>100% online</strong> — no paperwork, faxing, or printing
        required
      </>,
      <>
        <strong>$0 upfront fees</strong> — no application or processing charges,
        ever
      </>,
      <>
        <strong>Available nationwide</strong> — borrowers in all 50 U.S. states
        are welcome to apply
      </>,
      <>
        <strong>Instant Application ID</strong> — track your file from the
        moment you submit
      </>,
    ],
    prepNote:
      "What to have ready: government-issued ID, Social Security number, employer name and phone, net monthly income, and your checking account routing and account numbers.",
  },
  {
    step: "2",
    title: "Step 2 — Complete Live Underwriting",
    timeline: "Same day",
    image: "/images/how-it-works/phone-underwriting.jpg",
    imageAlt:
      "Friendly Fiona Loans underwriting specialist assisting a customer over the phone",
    intro: (
      <>
        Call us at{" "}
        <a
          href={`tel:${BUSINESS_PHONE_TEL}`}
          className="font-semibold text-primary hover:underline"
        >
          {BUSINESS_PHONE}
        </a>
        . A specialist will verify your details, read your exact terms aloud —
        amount, APR, term, monthly payment, and total of payments — answer your
        questions, and help you electronically sign your agreement on the same
        call.
      </>
    ),
    details: [
      <>
        <strong>Human-first underwriting</strong> — you speak with a specialist,
        not a decision engine
      </>,
      <>
        <strong>Fixed 10.00% APR</strong> — every approved borrower receives the
        same rate
      </>,
      <>
        <strong>Review and e-sign on the call</strong> — your full terms are
        read to you before you sign
      </>,
      <>
        <strong>No prepayment penalty</strong> — pay the loan off early at any
        time at no extra cost
      </>,
    ],
    whyNote:
      "Why by phone? Two reasons. It confirms you are the person who applied, which is the most effective fraud control available to a lender. And it means nobody signs a loan agreement without hearing the numbers from a human being first.",
    holdingNote:
      "This step is not automated and not optional. Your application sits in a holding state until it happens. If we don't hear from you, we'll send a short series of reminder emails and then stop contacting you.",
  },
  {
    step: "3",
    title: "Step 3 — Receive Your Funds",
    timeline: "Typically 1 business day",
    image: "/images/how-it-works/funds-deposited.jpg",
    imageAlt: "Customer checking their bank account after receiving loan funds",
    intro:
      "After your agreement is signed and your bank account is verified, your file goes to our funding team for final review and disbursement into the checking account you verified.",
    details: [
      <>
        <strong>Direct deposit</strong> into your eligible U.S. checking account
      </>,
      <>
        <strong>$0 origination fee</strong> — you receive the full approved
        amount, not a reduced one
      </>,
      <>
        <strong>Funding goal:</strong> one business day after your agreement is
        complete
      </>,
      <>
        <strong>Ongoing support</strong> — the same team is reachable after
        funding, not only before
      </>,
    ],
    prepNote:
      "Funding timelines depend on your bank's processing schedule and on completion of verification. Most borrowers are funded within one to two business days.",
  },
];

const TIMELINE_ROWS = [
  { stage: "Application submitted", timing: "Minute 0" },
  { stage: "Application ID emailed", timing: "Immediate" },
  { stage: "Phone underwriting and e-signature", timing: "Same day" },
  { stage: "Bank verification", timing: "Same day, usually instant" },
  { stage: "Underwriting decision", timing: "Usually within one business day" },
  { stage: "Funds disbursed", timing: "Typically next business day" },
];

const PROCESS_FAQS = [
  {
    question: "Do I have to call in?",
    answer:
      "Yes. It's how we verify your identity and how you hear your full terms before signing anything.",
  },
  {
    question: "What if I miss the reminder emails?",
    answer:
      "They stop after a few days. Call us and we'll pick your file back up.",
  },
  {
    question: "Can I apply more than once?",
    answer:
      "You can have one active application at a time; duplicates are blocked automatically. Declined applicants may reapply 90 days after the original submission date.",
  },
  {
    question: "How do I check where my application stands?",
    answer:
      "Use our Loan Status page with your Application ID and the email address you applied with.",
  },
  {
    question: "Can I change my loan amount after applying?",
    answer:
      "Discuss it on your underwriting call. Changes before signing are usually straightforward.",
  },
];

export default function HowItWorksPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PROCESS_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "How It Works", url: "/how-it-works" },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">
            How to Get a Personal Loan From Fiona Loans
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Three steps: apply online, complete underwriting by phone, receive
            your funds. Most borrowers go from application to deposit in one to
            two business days.
          </p>
        </div>
      </section>

      {/* Detailed Steps */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {STEPS.map((item, index) => (
              <div
                key={item.step}
                className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center"
              >
                {/* Text Side */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="inline-flex items-center gap-3 mb-5">
                    <span className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                      {item.step}
                    </span>
                    <span className="uppercase tracking-wide text-primary font-semibold text-sm">
                      {item.timeline}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                    {item.title}
                  </h2>

                  <p className="text-lg text-text-secondary leading-8 mb-6">
                    {item.intro}
                  </p>

                  {item.holdingNote && (
                    <div className="mb-6 p-4 rounded-lg bg-surface border-l-4 border-primary text-sm text-text-secondary leading-relaxed">
                      {item.holdingNote}
                    </div>
                  )}

                  <ul className="space-y-3 mb-6">
                    {item.details.map((detail, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-text-secondary"
                      >
                        <svg
                          className="w-5 h-5 text-success flex-shrink-0 mt-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {item.whyNote && (
                    <p className="text-sm text-text-secondary italic mb-4 leading-relaxed">
                      {item.whyNote}
                    </p>
                  )}

                  {item.prepNote && (
                    <p className="text-sm text-text-primary font-medium bg-surface p-3 rounded-lg border border-surface-dark">
                      {item.prepNote}
                    </p>
                  )}
                </div>

                {/* Image Side */}
                <div
                  className={`${
                    index % 2 === 1 ? "lg:order-1" : ""
                  } rounded-3xl overflow-hidden shadow-xl`}
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    width={700}
                    height={500}
                    priority={index === 0}
                    className="w-full h-[340px] md:h-[420px] object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: How Long Does It Take To Get A Personal Loan */}
      <section className="py-16 bg-surface border-y border-surface-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary text-center mb-6">
            How Long Does It Take to Get a Personal Loan?
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed text-center mb-10">
            The application itself takes about five minutes. Everything after
            that depends on how quickly you complete the phone call — that's the
            variable that determines your timeline, not our processing speed.
          </p>

          <div className="bg-white rounded-xl shadow-sm border border-surface-dark overflow-hidden">
            <div className="p-4 bg-primary text-white font-semibold text-center sm:text-left">
              A realistic sequence for someone who applies and calls the same
              morning:
            </div>
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-surface-dark bg-surface/50 text-text-primary font-bold">
                  <th className="py-3 px-6">Stage</th>
                  <th className="py-3 px-6">Timing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-dark text-text-secondary">
                {TIMELINE_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-surface/30">
                    <td className="py-3 px-6 font-medium text-text-primary">
                      {row.stage}
                    </td>
                    <td className="py-3 px-6">{row.timing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-sm text-text-secondary text-center">
            Applicants who wait several days to call simply add that delay to
            the front of the process. The fastest thing you can do to get funded
            is pick up the phone.
          </p>
        </div>
      </section>

      {/* Section: What Happens After You're Funded */}
      <section className="py-16 bg-white border-b border-surface-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary text-center mb-6">
            What Happens After You're Funded
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed text-base">
            <p>
              Your first payment is due approximately 30 days after
              disbursement, then monthly on the same date, automatically debited
              from the account you verified.
            </p>
            <p>
              You can pay extra or pay the loan off entirely at any point with
              no penalty, and every additional dollar goes against your
              principal. If you're ever going to miss a payment, call us before
              the due date — that conversation is far more productive than the
              one afterward.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Why Borrowers Choose This Process */}
      <section className="bg-surface py-14 sm:py-16 border-b border-surface-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary text-center mb-10">
            Why Borrowers Choose This Process
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-text-primary">Fast Funding</h3>
              <p className="mt-2 text-sm text-text-secondary">
                After your agreement is complete, we work to fund approved loans
                within one business day.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-text-primary">Fixed 10% APR</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Every approved borrower receives the same fixed rate for the
                life of the loan.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-text-primary">
                Available Nationwide
              </h3>
              <p className="mt-2 text-sm text-text-secondary">
                Serving qualified borrowers throughout all 50 U.S. states.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Process FAQ */}
      <section className="py-16 bg-white border-b border-surface-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary text-center mb-10">
            Process FAQ
          </h2>
          <div className="divide-y divide-surface-dark border-y border-surface-dark">
            {PROCESS_FAQS.map((faq) => (
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

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-primary to-primary-light py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Get Started?
          </h2>

          <p className="mt-4 text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
            Complete your online application today. When you're ready for step
            two, call our underwriting team and we'll take you through the rest.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/apply"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-xl bg-secondary px-10 py-4 text-lg font-bold text-primary-dark transition-all hover:bg-secondary-light shadow-lg hover:shadow-xl"
            >
              Apply Online
            </Link>

            <a
              href={`tel:${BUSINESS_PHONE_TEL}`}
              aria-label={`Call ${SITE_NAME} at ${BUSINESS_PHONE}`}
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-10 py-4 text-lg font-semibold text-white transition-all hover:border-white hover:bg-white/10"
            >
              Call {BUSINESS_PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
