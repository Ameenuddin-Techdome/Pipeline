"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { PlusCircle } from "@untitledui/icons";

interface RichTextBlock {
  type: string;
  children: { text: string }[];
}

interface DisclosureData {
  fda_disclaimer: RichTextBlock[];
  usage_info: RichTextBlock[];
  regulatory_info: RichTextBlock[];
  resources_link: string;
}

export const extractText = (blocks?: RichTextBlock[]) => {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .map((b) => b.children?.map((c) => c.text).join(" ") || "")
    .join(" ");
};

const AccordionItem = ({ item, isOpen, onClick }: any) => {
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const innerRef = React.useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = React.useState(0);

  React.useEffect(() => {
    if (innerRef.current) {
      setContentHeight(innerRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div className="py-5 sm:py-6 border-b border-gray-200">
      {/* Question (header) */}
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={onClick}
      >
        <span className="text-[16px] sm:text-lg lg:text-xl font-semibold text-[#181D27]">
          {item.question}
        </span>

        <PlusCircle
          style={{ color: "#A4A7AE" }}
          className={`transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"
            }`}
        />
      </button>

      {/* Answer */}
      <div
        ref={contentRef}
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : "0px",
        }}
      >
        <div ref={innerRef} className="pt-3">
          <p className="text-[15px] sm:text-base leading-[22px] sm:leading-[24px] text-[#535862] pr-4 sm:pr-8">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const FaqSection = ({ disclosure }: { disclosure: DisclosureData }) => {
  if (!disclosure) {
    return null;
  }
  
  const faqData = [
    {
      id: 1,
      question: "FDA Disclaimer",
      answer: extractText(disclosure.fda_disclaimer),
    },
    {
      id: 2,
      question: "Usage Information",
      answer: extractText(disclosure.usage_info),
    },
    {
      id: 3,
      question: "Regulatory Information",
      answer: extractText(disclosure.regulatory_info),
    },
    {
      id: 4,
      question: "Resources",
      answer: disclosure.resources_link,
    },
  ];

  const [openItemId, setOpenItemId] = useState<number | null>(null);

  return (
    <div className="w-full py-14 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-bold leading-tight tracking-[-0.02em] text-[#181D27]">
            Frequently asked questions
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl text-[#535862]">
            Everything you need to know about the product and billing.
          </p>
        </div>

        {/* Accordion */}
        <div className="w-full mx-auto">
          {faqData.map((item) => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openItemId === item.id}
              onClick={() =>
                setOpenItemId((prev) => (prev === item.id ? null : item.id))
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;


