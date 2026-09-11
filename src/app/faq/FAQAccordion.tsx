"use client";

import { useState } from "react";
import { FAQ_DATA, type FAQItem } from "./faq-data";

function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-surface-dark rounded-xl overflow-hidden bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-surface/50 transition-colors"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-bold text-text-primary pr-4">
          {item.question}
        </h3>
        <svg
          className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-5 pt-1 text-text-secondary leading-relaxed text-base border-t border-surface-dark/40">
          {item.answer}
        </div>
      )}
    </div>
  );
}

export default function FAQAccordion() {
  const [openState, setOpenState] = useState<string | null>("0-0");

  return (
    <div className="space-y-12">
      {FAQ_DATA.map((group, groupIdx) => (
        <div key={group.category} className="space-y-4">
          <h2 className="text-2xl font-bold text-text-primary pb-2 border-b border-surface-dark">
            {group.category}
          </h2>
          <div className="space-y-3">
            {group.items.map((item, itemIdx) => {
              const key = `${groupIdx}-${itemIdx}`;
              return (
                <FAQAccordionItem
                  key={item.question}
                  item={item}
                  isOpen={openState === key}
                  onToggle={() => setOpenState(openState === key ? null : key)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
