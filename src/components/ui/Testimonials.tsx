"use client";

import { useRef } from "react";
import { SITE_NAME } from "@/lib/constants";

export interface Testimonial {
  /** Whole-number star rating from a real review, 1–5. */
  rating: number;
  headline: string;
  /** The customer's actual words. */
  quote: string;
  /** Attribution exactly as compliance has approved it for publication. */
  attribution: string;
}

/**
 * ⚠️ PLACEHOLDER CONTENT — NOT REAL REVIEWS. Replace every entry below with
 * genuine, permission-cleared customer testimonials before publishing.
 *
 * FTC Rule on Consumer Reviews & Testimonials (16 CFR Part 465) prohibits
 * posting fabricated or misattributed reviews. Only publish quotes a real
 * customer actually gave, attributed as they've consented to, with any
 * specific claims (rates, funding speed, outcomes) being accurate.
 */
const TESTIMONIALS: Testimonial[] = [
  {
    rating: 5,
    headline: "A lifesaver for unexpected expenses.",
    quote:
      "I needed $3,000 for an emergency home repair and my credit isn't perfect. Fiona Loans didn't just approve me; they gave me the exact same 10% rate they advertise. The money was in my account the next morning.",
    attribution: "— Sarah M., Texas",
  },
  {
    rating: 5,
    headline: "Finally, a lender with no hidden fees.",
    quote:
      "I was tired of variable rates and hidden charges from other online lenders. The Fiona Loans process was incredibly straightforward. I borrowed $8,000, and my repayment schedule was crystal clear from day one.",
    attribution: "— David R., Ohio",
  },
  {
    rating: 5,
    headline: "Real people actually answer the phone.",
    quote:
      "The best part of my experience was the phone underwriting. Instead of dealing with an automated bot, I spoke to a real person in their Los Angeles office who walked me through the e-signature process in five minutes. Highly recommend.",
    attribution: "— Elena G., Florida",
  },
];

function StarRating({ rating }: { rating: number }) {
  const rounded = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${rounded} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          aria-hidden="true"
          className={`w-5 h-5 ${
            i < rounded ? "text-secondary" : "text-surface-dark"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.958c.3.921-.755 1.688-1.54 1.118l-3.367-2.447a1 1 0 00-1.176 0l-3.367 2.447c-.784.57-1.838-.197-1.539-1.118l1.286-3.958a1 1 0 00-.363-1.118L2.075 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.958z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="bg-white rounded-xl p-8 shadow-md border border-surface-dark flex flex-col h-full">
      <StarRating rating={testimonial.rating} />
      <figcaption className="mt-5 text-lg font-bold text-text-primary">
        {testimonial.headline}
      </figcaption>
      <blockquote className="mt-3 text-text-secondary leading-relaxed grow">
        {testimonial.quote}
      </blockquote>
      <p className="mt-6 text-sm font-semibold text-text-primary">
        {testimonial.attribution}
      </p>
    </figure>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Previous testimonial" : "Next testimonial"}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-surface-dark bg-white text-primary shadow-md transition-colors hover:bg-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <svg
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={isPrev ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
        />
      </svg>
    </button>
  );
}

export default function Testimonials({
  testimonials = TESTIMONIALS,
}: {
  testimonials?: Testimonial[];
}) {
  const scrollRef = useRef<HTMLUListElement>(null);

  if (!testimonials.length) return null;

  const scroll = (direction: "prev" | "next") => {
    const container = scrollRef.current;
    if (!container) return;
    // Advance by one card (first item's width incl. the gap) per click.
    const firstItem = container.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(container).columnGap) || 0;
    const step = firstItem
      ? firstItem.offsetWidth + gap
      : container.clientWidth;
    container.scrollBy({
      left: direction === "prev" ? -step : step,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="bg-surface py-16 sm:py-24"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl font-bold text-text-primary"
          >
            What {SITE_NAME} Customers Say
          </h2>
        </div>

        {/* Desktop: 3-column grid. Mobile: swipeable snap-scroll carousel. */}
        <ul
          ref={scrollRef}
          className="
            flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 -mx-4 px-4
            md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-3 md:overflow-visible md:snap-none
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          "
        >
          {testimonials.map((testimonial, i) => (
            <li
              key={i}
              className="snap-center shrink-0 basis-[85%] sm:basis-[60%] md:basis-auto md:shrink"
            >
              <TestimonialCard testimonial={testimonial} />
            </li>
          ))}
        </ul>

        {/* Prev/Next controls — mobile carousel only (desktop is a static grid). */}
        <div className="mt-6 flex justify-center gap-4 md:hidden">
          <ArrowButton direction="prev" onClick={() => scroll("prev")} />
          <ArrowButton direction="next" onClick={() => scroll("next")} />
        </div>
      </div>
    </section>
  );
}
