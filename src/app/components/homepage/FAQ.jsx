"use client";
import { useState } from "react";

const FAQ = () => {
  const [openIndexLeft, setOpenIndexLeft] = useState(null);
  const [openIndexRight, setOpenIndexRight] = useState(null);

  const leftFaqs = [
    {
      question: "What is your return policy?",
      answer:
        "Cube InfoTech is a website design firm in Toronto that also provides hosting services. Whether your target audience is in Canada, USA or in any other country, our servers are available for all location with good speed. We provide ongoing maintenance and technical support for cloud servers.",
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship worldwide! International shipping fees may apply.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy on most items. Please contact customer support for further details.",
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship worldwide! International shipping fees may apply.",
    },
  ];

  const rightFaqs = [
    {
      question: "How can I track my order?",
      answer:
        "You will receive a tracking number via email once your order ships. Use that number on our tracking page.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and Apple Pay.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy on most items. Please contact customer support for further details.",
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship worldwide! International shipping fees may apply.",
    },
  ];

  const renderFAQCard = (faq, index, openIndex, toggleIndex, setOpenIndex) => (
    <div
      key={index}
      className="bg-white p-4  shadow-md  hover:shadow-lg transition-all duration-300 flex flex-col justify-between "
    >
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setOpenIndex(openIndex === index ? null : index)}
      >
        <span
          className={`text-3xl ${
            openIndex === index
              ? "text-[var(--Five-Color)]"
              : "text-[var(--Secondary-Color)]"
          }`}
        >
          {openIndex === index ? "-" : "+"}
        </span>

        <p className="text-gray-900">{faq.question}</p>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          openIndex === index
            ? "max-h-40 opacity-100 mt-4"
            : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-500 pl-8">{faq.answer}</p>
      </div>
    </div>
  );

  return (
    <section className="max-w-6xl mx-auto py-12 px-6">
      <h2 className="text-center mb-10">Frequently Asked Questions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {leftFaqs.map((faq, index) =>
            renderFAQCard(faq, index, openIndexLeft, index, setOpenIndexLeft)
          )}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {rightFaqs.map((faq, index) =>
            renderFAQCard(faq, index, openIndexRight, index, setOpenIndexRight)
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
