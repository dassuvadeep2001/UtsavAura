import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const Faq = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const [openIndex, setOpenIndex] = React.useState(null);
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      category: "General",
      items: [
        {
          question: "What services does UtsavAura offer?",
          answer:
            "We specialize in weddings, corporate events, birthdays, festivals, fashion shows, inaugurations, and more. Our team handles everything from planning to execution.",
        },
        {
          question: "How far in advance should I book your services?",
          answer:
            "For weddings and large events, we recommend booking 6–12 months in advance. Smaller events can be booked as little as 3 months ahead.",
        },
        {
          question: "Do you work outside of India?",
          answer:
            "Yes! We have experience managing international events and destination weddings across the globe.",
        },
      ],
    },
    {
      category: "Payments & Pricing",
      items: [
        {
          question: "Is there a deposit required to book an event?",
          answer:
            "Yes, a 30% non-refundable deposit is required to secure your date. The remaining balance is due 30 days before your event.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept credit/debit cards, bank transfers, and online payments via our secure payment gateway.",
        },
        {
          question: "Are there any hidden fees?",
          answer:
            "No hidden fees. You’ll receive a detailed quote upfront with all costs clearly outlined.",
        },
      ],
    },
    {
      category: "Changes & Cancellations",
      items: [
        {
          question: "Can I make changes to my event after booking?",
          answer:
            "Minor changes are allowed at no extra cost. Major revisions may incur additional charges based on vendor availability.",
        },
        {
          question: "What is your cancellation policy?",
          answer:
            "Deposits are non-refundable. For cancellations made 90+ days prior to the event, 50% of the total amount will be refunded. No refunds within 30 days.",
        },
      ],
    },
  ];

  return (
    <div className="bg-[#0D0D0D] text-white">
      {/* FAQ Content */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-[#FF5E5B]/10 blur-3xl"></div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
            }}
            className="text-center mb-20"
          >
            <motion.div variants={fadeIn} className="inline-block mb-4">
              <div className="flex items-center justify-center bg-[#D4AF37]/10 px-4 py-2 rounded-full border border-[#D4AF37]/30">
                <HelpCircle className="text-[#D4AF37] mr-2" size={16} />
                <span className="text-[#D4AF37] text-sm font-medium">
                  Frequently Asked Questions
                </span>
              </div>
            </motion.div>

            <motion.h2
              variants={fadeIn}
              className="text-4xl md:text-5xl font-bold text-[#FFFFFF] mb-6"
            >
              Got{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] bg-clip-text text-transparent">
                Questions?
              </span>{" "}
              We've Got Answers.
            </motion.h2>

            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl text-[#B0B0B0] max-w-3xl mx-auto"
            >
              Find quick answers to common questions about our services,
              pricing, and process.
            </motion.p>
          </motion.div>

          {faqs.map((group, groupIndex) => (
            <motion.div
              key={groupIndex}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-white">
                {group.category}
              </h2>
              <div className="space-y-3">
                {group.items.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#2A2A2A]"
                  >
                    <button
                      onClick={() => toggleFaq(`${groupIndex}-${index}`)}
                      className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
                    >
                      <span className="text-white font-medium">
                        {faq.question}
                      </span>
                      <ChevronDown
                        size={20}
                        className={`transition-transform duration-300 ${
                          openIndex === `${groupIndex}-${index}`
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>
                    {openIndex === `${groupIndex}-${index}` && (
                      <div className="px-6 pb-4 text-[#B0B0B0]">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Contact Support Section */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#1A1A1A] to-[#0D0D0D] p-8 rounded-xl border border-[#2A2A2A] text-center"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-[#B0B0B0] mb-6">
              Feel free to reach out to us directly for personalized assistance.
            </p>
            <a
              href="mailto:support@utsavaura.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0D0D0D] font-semibold rounded-full transition"
            >
              Email Us Directly
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
