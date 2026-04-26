"use client";

import { useState } from "react";
import FaqItem from "@/components/ui/FaqItem";

const faqs = [
  { question: "Is Vipass free to use?", answer: "Yes, downloading and browsing events is completely free. You only pay when you purchase a ticket." },
  { question: "Can I create and sell tickets for my own event?", answer: "Absolutely. You can set up your event, configure ticket tiers, and start selling directly from your phone in minutes." },
  { question: "How do I track how my event is performing?", answer: "You get a real-time dashboard with ticket sales, revenue, and audience engagement so you always know where things stand." },
  { question: "How do I get updates about an event I'm attending?", answer: "You'll receive real-time notifications with any changes to the lineup, schedule, or venue details so you're always in the know." },
  { question: "When do I get paid for ticket sales?", answer: "Payouts are processed directly to your account. You can track your earnings and payout status right from the app." },
  { question: "Is my payment information secure?", answer: "Yes. All transactions are processed through industry-standard encrypted payment systems. We never store your card details directly." },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="f-rv9o5q" data-f-name="FAQ" id="faq">
      <div className="f-pcuxg5" data-f-name="Container">
        <div className="f-1xjiuvd" data-f-name="Heading">
          <div className="ssr-variant hidden-f3lv8x">
            <div
              className="f-1euscwr"
              data-f-component-type="RichTextContainer"
              style={{ willChange: "transform", opacity: 1, transform: "none" }}
            >
              <h2
                className="f-text f-styles-preset-1yvd34u"
                data-styles-preset="GKtOymhXV"
              >
                FAQ.
              </h2>
            </div>
          </div>
          <div
            className="f-mxm94s"
            data-f-component-type="RichTextContainer"
            style={{ transform: "none" }}
          >
            <p
              className="f-text f-styles-preset-1n1wh7h"
              data-styles-preset="gd6AWaps9"
              dir="auto"
            >
              Got questions? We&apos;ve got answers.
            </p>
          </div>
        </div>
        <div className="ssr-variant hidden-f3lv8x hidden-tsn51j">
          <div
            className="f-12yhnwq-container"
            style={{ willChange: "transform", opacity: 1, transform: "none" }}
          >
            <div
              className="f-sABwM f-10950d3 f-v-10950d3"
              data-f-name="Desktop"
              style={{ width: "100%", opacity: 1 }}
            >
              <div className="f-mbtw9f-container" style={{ opacity: 1 }}>
                <div style={{ width: "100%" }}>
                  {faqs.map((faq, i) => (
                    <FaqItem
                      key={i}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openIndex === i}
                      onToggle={() => toggleItem(i)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
