import React from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  Mail,
  PhoneCall,
  MapPin,
  Send,
  ChevronRight,
  Sparkles,
  ArrowUpCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form Submitted:", data);
    reset();
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.8, 0.2, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const gradientText = {
    hidden: { backgroundPosition: "0% 50%" },
    visible: {
      backgroundPosition: "100% 50%",
      transition: {
        duration: 8,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  // Custom hook for scroll-triggered animations
  const useScrollAnimation = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

    React.useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

    return [ref, controls];
  };

  const [formRef, formControls] = useScrollAnimation();
  const [infoRef, infoControls] = useScrollAnimation();
  const [mapRef, mapControls] = useScrollAnimation();

  return (
    <div className="bg-[#0D0D0D] text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/90 z-10"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="src/assets/videos/contact.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Floating particles */}
        <AnimatePresence>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: [0, 0.6, 0],
                y: [0, -100],
                x: Math.random() * 200 - 100,
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                delay: Math.random() * 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute rounded-full bg-[#D4AF37]"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </AnimatePresence>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="inline-block mb-6"
          >
            <div className="flex items-center justify-center bg-[#D4AF37]/10 backdrop-blur-sm px-4 py-2 rounded-full border border-[#D4AF37]/30">
              <Mail className="text-[#D4AF37] mr-2" size={18} />
              <span className="text-[#D4AF37] text-sm font-medium">
                Get in Touch
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="text-5xl md:text-6xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Let's Bring Your Event to <br />
            <motion.span
              className="bg-gradient-to-r from-[#D4AF37] via-[#FF5E5B] to-[#D4AF37] bg-clip-text text-transparent bg-[length:300%_100%] inline-block"
              variants={gradientText}
              initial="hidden"
              animate="visible"
            >
              Life
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.6,
              duration: 0.8,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="text-xl md:text-2xl text-[#B0B0B0] max-w-3xl mx-auto"
          >
            Have questions or ready to start planning? We'd love to hear from
            you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.8,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="mt-12"
          >
            <motion.a href="/login">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-[#FF5E5B] to-[#D4AF37] text-[#0D0D0D] font-bold rounded-full shadow-lg"
              >
                Get Started
                <ChevronRight className="ml-2 inline" size={18} />
              </motion.button>
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        >
          <ArrowUpCircle size={40} className="rotate-180 text-[#D4AF37]/80" />
        </motion.div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl"
        ></motion.div>

        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-[#FF5E5B]/10 blur-3xl"
        ></motion.div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 relative z-10">
          {/* Contact Form */}
          <motion.div
            ref={formRef}
            initial="hidden"
            animate={formControls}
            variants={staggerContainer}
            className="bg-[#1A1A1A] p-8 rounded-2xl shadow-2xl shadow-[#D4AF37]/10 border-1 border-[#D4AF37]/80 backdrop-blur-sm"
          >
            <motion.h3
              variants={fadeInUp}
              className="text-2xl font-bold text-white mb-6"
            >
              Send Us a Message
            </motion.h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <motion.div variants={fadeInUp}>
                <label
                  htmlFor="name"
                  className="block text-sm text-[#B0B0B0] mb-2"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#2A2A2A] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-white transition-all duration-300 hover:border-[#D4AF37]/50"
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-red-500 text-sm"
                  >
                    {errors.name.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label
                  htmlFor="email"
                  className="block text-sm text-[#B0B0B0] mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#2A2A2A] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-white transition-all duration-300 hover:border-[#D4AF37]/50"
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-red-500 text-sm"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label
                  htmlFor="message"
                  className="block text-sm text-[#B0B0B0] mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  {...register("message", { required: "Message is required" })}
                  placeholder="Tell us about your event..."
                  className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#2A2A2A] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-white transition-all duration-300 hover:border-[#D4AF37]/50"
                ></textarea>
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-red-500 text-sm"
                  >
                    {errors.message.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 5px 15px rgba(212, 175, 55, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-[#FF5E5B] to-[#D4AF37] text-[#0D0D0D] font-semibold py-3 rounded-md shadow-lg transition flex items-center justify-center ${
                    isSubmitting ? "opacity-80" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <>
                      Send Message <Send className="inline ml-2" size={18} />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            ref={infoRef}
            initial="hidden"
            animate={infoControls}
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-bold text-white mb-6">
                Contact Details
              </h3>
              <p className="text-[#B0B0B0] mb-6">
                Whether it's a simple question or a full-scale event inquiry,
                we're here to help bring your vision to life.
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} className="space-y-6">
              <motion.div
                variants={fadeInUp}
                className="flex items-start gap-4 group"
                whileHover={{ x: 5 }}
              >
                <div className="mt-1 text-[#D4AF37] group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Email</h4>
                  <a
                    href="mailto:support@utsavaura.com"
                    className="text-[#B0B0B0] hover:text-[#D4AF37] transition-colors inline-block relative"
                  >
                    support@utsavaura.com
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-px bg-[#D4AF37]"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </a>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex items-start gap-4 group"
                whileHover={{ x: 5 }}
              >
                <div className="mt-1 text-[#FF5E5B] group-hover:scale-110 transition-transform">
                  <PhoneCall size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Phone</h4>
                  <a
                    href="tel:+11234567890"
                    className="text-[#B0B0B0] hover:text-[#FF5E5B] transition-colors inline-block relative"
                  >
                    +1 (123) 456-7890
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-px bg-[#FF5E5B]"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </a>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex items-start gap-4 group"
                whileHover={{ x: 5 }}
              >
                <div className="mt-1 text-[#D4AF37] group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Office Location</h4>
                  <p className="text-[#B0B0B0]">
                    123 Celebration Avenue, Luxe City, India
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <motion.a href="/faq">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(212, 175, 55, 0.1)",
                    borderColor: "#D4AF37",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-transparent text-white font-semibold rounded-full border-2 border-[#D4AF37]/40 transition flex items-center gap-2"
                >
                  View FAQ <ChevronRight size={18} />
                </motion.button>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="py-16 px-6 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <motion.h3
            ref={mapRef}
            initial="hidden"
            animate={mapControls}
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-bold text-center text-white mb-8"
          >
            Find Us on Map
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl border border-[#2A2A2A] relative"
          >
            <div className="absolute inset-0 bg-[#D4AF37]/10 z-10 pointer-events-none"></div>
            <iframe
              title="Location Map"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className=" transition-all duration-500"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
