import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ChevronDown, Scale, Shield, Mail } from "lucide-react";

const Legal = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const [openIndex, setOpenIndex] = React.useState(["0-0", "1-0"]); // Open first items by default

  const toggleSection = (index) => {
    setOpenIndex((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const legalSections = [
    {
      category: "Terms & Conditions",
      icon: <Scale className="text-[#D4AF37] mr-3" size={20} />,
      items: [
        {
          title: "Usage Agreement",
          content: (
            <>
              <p className="mb-4">
                These terms govern your use of our website and services. By
                accessing or using our platform, you agree to be bound by these
                Terms and Conditions.
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>You must be at least 18 years old to use this service.</li>
                <li>Payment is required to book events or services.</li>
                <li>
                  We reserve the right to modify or terminate services at any
                  time.
                </li>
                <li>
                  All bookings are subject to availability and confirmation.
                </li>
                <li>
                  User content must not violate any laws or third-party rights.
                </li>
              </ul>
              <p>
                For more details, please contact us or review the full legal
                document.
              </p>
            </>
          ),
        },
        {
          title: "Intellectual Property",
          content: (
            <>
              <p className="mb-4">
                All content on this website, including text, graphics, logos,
                and images, is our property or the property of our licensors and
                is protected by copyright laws.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Unauthorized use may violate copyright, trademark, and other
                  laws.
                </li>
                <li>
                  You may view and print content for personal, non-commercial
                  use.
                </li>
                <li>Commercial use requires our express written permission.</li>
              </ul>
            </>
          ),
        },
      ],
    },
    {
      category: "Privacy Policy",
      icon: <Shield className="text-[#D4AF37] mr-3" size={20} />,
      items: [
        {
          title: "Data Collection",
          content: (
            <>
              <p className="mb-4">
                We respect your privacy and are committed to protecting your
                personal information. This policy outlines how we collect, use,
                and safeguard your data.
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  We collect basic info such as name, email, and payment
                  details.
                </li>
                <li>
                  Data is stored securely and used only for providing services.
                </li>
                <li>We do not sell your information to third parties.</li>
                <li>
                  Cookies may be used to improve user experience and analyze
                  traffic.
                </li>
                <li>
                  You can request access, correction, or deletion of your data.
                </li>
              </ul>
              <p>
                If you have any concerns about your privacy, feel free to reach
                out to us.
              </p>
            </>
          ),
        },
        {
          title: "Data Protection",
          content: (
            <>
              <p className="mb-4">
                We implement appropriate technical and organizational measures
                to ensure a level of security appropriate to the risk.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  All data transmissions are encrypted using SSL technology
                </li>
                <li>Regular security audits of our systems</li>
                <li>Limited access to personal data within our organization</li>
                <li>Compliance with GDPR and other relevant regulations</li>
              </ul>
            </>
          ),
        },
      ],
    },
  ];

  return (
    <div className="bg-[#0D0D0D] text-white">
      {/* Legal Content */}
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
                <FileText className="text-[#D4AF37] mr-2" size={16} />
                <span className="text-[#D4AF37] text-sm font-medium">
                  Legal Documentation
                </span>
              </div>
            </motion.div>

            <motion.h2
              variants={fadeIn}
              className="text-4xl md:text-5xl font-bold text-[#FFFFFF] mb-6"
            >
              Our{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] bg-clip-text text-transparent">
                Legal Policies
              </span>
            </motion.h2>

            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl text-[#B0B0B0] max-w-3xl mx-auto"
            >
              Review our comprehensive legal documentation to understand your
              rights and our responsibilities.
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {legalSections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                variants={fadeIn}
                className="space-y-4"
              >
                <div className="flex items-center">
                  {section.icon}
                  <h2 className="text-2xl font-bold text-white">
                    {section.category}
                  </h2>
                </div>

                <div className="space-y-3">
                  {section.items.map((item, itemIndex) => {
                    const index = `${sectionIndex}-${itemIndex}`;
                    const isOpen = openIndex.includes(index);

                    return (
                      <div
                        key={itemIndex}
                        className="bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#2A2A2A] transition-all hover:border-[#D4AF37]/30"
                      >
                        <button
                          onClick={() => toggleSection(index)}
                          className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none group"
                        >
                          <span className="text-white font-medium group-hover:text-[#D4AF37] transition-colors">
                            {item.title}
                          </span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown
                              size={20}
                              className="text-[#B0B0B0] group-hover:text-[#D4AF37] transition-colors"
                            />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{
                                duration: 0.3,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 text-[#B0B0B0]">
                                {item.content}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Section */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#1A1A1A] to-[#0D0D0D] p-8 rounded-xl border border-[#2A2A2A] text-center"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Need Legal Clarification?
            </h3>
            <p className="text-[#B0B0B0] mb-6">
              Our legal team is available to answer any specific questions you
              may have about our policies.
            </p>
            <a
              href="mailto:legal@utsavaura.com"
              className="inline-flex items-center gap-2 px-6 py-3 text-white bg-[#D4AF37] hover:bg-[#D4AF37]/90 font-semibold rounded-full transition"
            >
              <Mail size={18} />
              Contact Legal Team
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Legal;
