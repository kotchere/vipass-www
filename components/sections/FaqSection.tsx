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
  return (
    <section className="framer-rv9o5q" data-framer-name="FAQ" id="faq">
      <div className="framer-pcuxg5" data-framer-name="Container">
        <div className="framer-1xjiuvd" data-framer-name="Heading">
          <div className="framer-1euscwr" data-framer-component-type="RichTextContainer">
            <h2
              className="framer-text framer-styles-preset-1yvd34u"
              data-styles-preset="GKtOymhXV"
            >
              FAQ.
            </h2>
          </div>
          <div
            className="framer-mxm94s"
            data-framer-component-type="RichTextContainer"
          >
            <p
              className="framer-text framer-styles-preset-1n1wh7h"
              data-styles-preset="gd6AWaps9"
              dir="auto"
            >
              Got questions? We've got answers.
            </p>
          </div>
        </div>
        <div className="framer-12yhnwq-container">
          <div style={{ width: "100%", opacity: 1 }}>
            <div style={{ width: "100%" }}>
              {faqs.map((faq, index) => (
                <FaqItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  defaultOpen={index === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
