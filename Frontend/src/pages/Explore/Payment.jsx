import React from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  ShieldCheck,
  Sparkles,
  Zap,
  Lock,
  BadgeCheck,
} from "lucide-react";

const PaymentInfo = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardHover = {
    hover: {
      y: -10,
      boxShadow:
        "0 20px 25px -5px rgba(212, 175, 55, 0.1), 0 10px 10px -5px rgba(212, 175, 55, 0.04)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[180px] z-0"
        />
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5,
          }}
          className="absolute bottom-1/3 -right-40 w-[700px] h-[700px] bg-[#FF5E5B]/10 rounded-full blur-[200px] z-0"
        />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, Math.random() * 40 - 20],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute rounded-full bg-[#D4AF37]/40"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <section className="relative z-10 px-6 py-22 max-w-7xl mx-auto space-y-20">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center space-y-8"
        >
          <motion.div
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full"
          >
            <Sparkles className="text-[#D4AF37]" size={20} />
            <span className="text-[#D4AF37] text-sm font-medium tracking-wider">
              Secure Payments With Stripe
            </span>
          </motion.div>

          <motion.h1
            variants={fadeIn}
            className="text-5xl md:text-6xl font-bold leading-tight"
          >
            <span className="block bg-gradient-to-r from-white via-[#f0f0f0] to-[#D4AF37] bg-clip-text text-transparent">
              Effortless &{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#FF5E5B] to-[#D4AF37] bg-clip-text text-transparent">
                Secure
              </span>
            </span>
            <span className="block bg-gradient-to-r from-white via-[#f0f0f0] to-[#D4AF37] bg-clip-text text-transparent">
              Transactions
            </span>
          </motion.h1>

          <motion.p
            variants={fadeIn}
            className="text-[#B0B0B0] text-xl max-w-4xl mx-auto leading-relaxed"
          >
            UtsavAura partners with Stripe, a global leader in online payments,
            to deliver a seamless checkout experience with bank-grade security
            and multiple payment options.
          </motion.p>
        </motion.div>

        {/* Animated Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <CreditCard className="text-[#D4AF37]" size={40} />,
              title: "Multiple Payment Options",
              desc: "Credit/debit cards, UPI, net banking, wallets, and more — all secured by Stripe's encrypted infrastructure.",
              features: [
                "Visa/Mastercard",
                "AMEX Support",
                "UPI Payments",
                "Net Banking",
              ],
              bg: "bg-[#D4AF37]/5",
            },
            {
              icon: <Lock className="text-[#FF5E5B]" size={40} />,
              title: "Military-Grade Security",
              desc: "End-to-end encryption with 3D Secure authentication and real-time fraud detection for every transaction.",
              features: [
                "PCI DSS Level 1",
                "3D Secure 2.0",
                "AI Fraud Detection",
                "Tokenized Payments",
              ],
              bg: "bg-[#FF5E5B]/5",
            },
            {
              icon: <BadgeCheck className="text-[#D4AF37]" size={40} />,
              title: "Transparent Process",
              desc: "Instant payment confirmations with detailed receipts. No hidden charges or surprise fees.",
              features: [
                "Instant Receipts",
                "No Hidden Fees",
                "Refund Tracking",
                "24h Dispute Resolution",
              ],
              bg: "bg-[#D4AF37]/5",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              whileHover="hover"
              className={`${card.bg} backdrop-blur-lg border border-white/10 rounded-2xl p-8 overflow-hidden relative transition-all duration-300`}
            >
              <div className="relative z-10">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-gradient-to-br from-white/5 to-white/10 rounded-xl">
                    {card.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {card.title}
                </h3>
                <p className="text-[#B0B0B0] mb-6">{card.desc}</p>

                <div className="space-y-2">
                  {card.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Zap className="text-[#D4AF37] flex-shrink-0" size={16} />
                      <span className="text-sm text-[#E0E0E0]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card hover effect elements */}
              <motion.div
                variants={cardHover}
                className="absolute inset-0 -z-10"
              />
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Stripe Badge Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center gap-8"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Trusted by Millions Worldwide
            </h3>
            <p className="text-[#B0B0B0]">
              Stripe powers payments for businesses of all sizes, from startups
              to Fortune 500 companies, with the highest security standards in
              the industry.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { name: "PCI", desc: "DSS Compliant" },
              { name: "3D Secure", desc: "2.0 Authentication" },
              { name: "256-bit", desc: "Encryption" },
              { name: "99.99%", desc: "Uptime" },
            ].map((badge, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-center min-w-[120px]"
              >
                <div className="text-2xl font-bold text-[#D4AF37]">
                  {badge.name}
                </div>
                <div className="text-xs text-[#B0B0B0] mt-1">{badge.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-[#FF5E5B]/10 opacity-60" />
          <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/627a1044a798e6627445c8d1/627a1045a798e6a9f145c9d0_noise-transparent.png')] opacity-10" />
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#D4AF37]/20 rounded-full blur-[100px]" />

          <div className="relative z-10 p-12 text-center">
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block mb-6"
            >
              <ShieldCheck size={48} className="text-[#D4AF37]" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Secure Your Event?
            </h2>
            <p className="text-xl text-[#E0E0E0] max-w-2xl mx-auto mb-8">
              Complete your booking with confidence using our 100% secure
              payment system.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="px-6 py-3 border border-[#D4AF37] text-[#D4AF37] font-medium rounded-full hover:bg-[#D4AF37]/10 transition-colors duration-300"
              >
                Need Help?
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default PaymentInfo;
