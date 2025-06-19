import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Sparkles,
  CalendarCheck2,
  Star,
  Briefcase,
  PhoneCall,
  Heart,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "http://localhost:8001/api/review/getReviews"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        // Extract the reviews array from the response
        const reviewsData = result.data || [];

        if (!Array.isArray(reviewsData)) {
          throw new Error(
            "Expected an array of reviews but got something else"
          );
        }

        setReviews(reviewsData);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
        setReviews([]);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading testimonials...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }

  if (!reviews || reviews.length === 0) {
    return <div className="text-center py-12">No testimonials available</div>;
  }

  return (
    <div className="bg-[#0D0D0D] text-[#FFFFFF] overflow-hidden">
      {/* Hero Section with Video - Luxury Midnight Theme */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/90 z-10"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="src/assets/videos/about.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-20 flex flex-col items-center justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6"
          >
            <div className="flex items-center justify-center bg-[#D4AF37]/10 backdrop-blur-sm px-4 py-2 rounded-full border border-[#D4AF37]/30">
              <Sparkles className="text-[#D4AF37] mr-2" size={18} />
              <span className="text-[#D4AF37] text-sm font-medium">
                Event Specialists Since 2020
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] bg-clip-text text-transparent">
              Crafting
            </span>{" "}
            Unforgettable Celebrations
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-[#B0B0B0] max-w-3xl mx-auto mb-10"
          >
            At UtsavAura, we blend innovation with tradition to create events
            that tell your unique story through every detail.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a href="/blog">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 bg-transparent cursor-pointer text-white font-semibold rounded-full border-2 border-[#D4AF37]/40 hover:border-[#D4AF37]/80 transition flex items-center justify-center"
              >
                View Blog
              </motion.button>
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="animate-bounce w-10 h-10 rounded-full bg-[#D4AF37]/10 backdrop-blur-sm border border-[#D4AF37]/20 flex items-center justify-center">
            <ChevronRight
              className="text-[#D4AF37] transform rotate-90"
              size={20}
            />
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us Section - Luxury Midnight Theme */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-[#FF5E5B]/10 blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
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
                <Heart className="text-[#D4AF37] mr-2" size={16} />
                <span className="text-[#D4AF37] text-sm font-medium">
                  Why We're Different
                </span>
              </div>
            </motion.div>
            <motion.h2
              variants={fadeIn}
              className="text-4xl md:text-5xl font-bold text-[#FFFFFF] mb-6"
            >
              The UtsavAura Difference
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl text-[#B0B0B0] max-w-3xl mx-auto"
            >
              We go beyond event planning to create immersive experiences that
              resonate with your personality and values.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <div className="relative">
                    <div className="absolute -inset-4 bg-[#D4AF37]/10 rounded-full blur opacity-70"></div>
                    <Sparkles size={40} className="relative text-[#D4AF37]" />
                  </div>
                ),
                title: "Creative Excellence",
                desc: "Our award-winning designers transform ideas into stunning visual realities with unmatched creativity and precision craftsmanship.",
                highlight: "200+ award-winning designs",
              },
              {
                icon: (
                  <div className="relative">
                    <div className="absolute -inset-4 bg-[#FF5E5B]/10 rounded-full blur opacity-70"></div>
                    <Users size={40} className="relative text-[#FF5E5B]" />
                  </div>
                ),
                title: "Expert Team",
                desc: "A carefully curated team of 50+ event specialists passionate about creating celebrations that exceed expectations.",
                highlight: "50+ event specialists",
              },
              {
                icon: (
                  <div className="relative">
                    <div className="absolute -inset-4 bg-[#D4AF37]/10 rounded-full blur opacity-70"></div>
                    <CalendarCheck2
                      size={40}
                      className="relative text-[#D4AF37]"
                    />
                  </div>
                ),
                title: "Seamless Execution",
                desc: "Our proprietary project management system ensures flawless execution from first consultation to final farewell.",
                highlight: "98% client satisfaction",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                transition={{ delay: i * 0.2 }}
                className="bg-[#1A1A1A] p-8 rounded-2xl shadow-xl hover:shadow-2xl border border-[#2A2A2A] transition-all duration-500 hover:-translate-y-2"
              >
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold text-[#FFFFFF] mb-3">
                  {item.title}
                </h3>
                <p className="text-[#B0B0B0] mb-4">{item.desc}</p>
                <p className="text-sm font-medium text-[#D4AF37]">
                  {item.highlight}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story / Mission / Vision - Luxury Midnight Theme */}
      <section className="py-24 px-6 bg-[#0D0D0D] relative overflow-hidden">
        <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-[#FF5E5B]/10 blur-3xl"></div>
        <div className="absolute -left-40 -bottom-40 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl"></div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <div className="inline-flex items-center bg-[#D4AF37]/10 px-4 py-2 rounded-full border border-[#D4AF37]/30 mb-4">
                <Heart className="text-[#D4AF37] mr-2" size={16} />
                <span className="text-[#D4AF37] text-sm font-medium">
                  Our Journey
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#FFFFFF] mb-6">
                From Passion to{" "}
                <span className="text-[#D4AF37]">Profession</span>
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-[#B0B0B0] leading-relaxed">
                Founded in 2020 by a team of event enthusiasts, UtsavAura began
                as a dream to redefine celebrations. What started as a small
                boutique agency has now blossomed into one of the most sought-
                after event management companies in the region.
              </p>
              <p className="text-lg text-[#B0B0B0] leading-relaxed">
                Our secret? Treating every event as if it were our own,
                maintaining a network of the finest vendors, and staying true to
                our core values of creativity, integrity, and excellence.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              {[
                { value: "500+", label: "Events" },
                { value: "100%", label: "Passion" },
                { value: "50+", label: "Team Members" },
                { value: "98%", label: "Satisfaction" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A] shadow-sm"
                >
                  <p className="text-2xl font-bold text-[#D4AF37]">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[#B0B0B0]">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-[#D4AF37]/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-[#1A1A1A] p-8 rounded-2xl shadow-lg border border-[#2A2A2A]">
                <h3 className="text-2xl font-bold text-[#FFFFFF] mb-6">
                  Our Core Values
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: <Sparkles className="text-[#D4AF37]" size={20} />,
                      title: "Creativity",
                      desc: "Pushing boundaries to deliver unique, memorable experiences",
                    },
                    {
                      icon: <Briefcase className="text-[#FF5E5B]" size={20} />,
                      title: "Professionalism",
                      desc: "Meticulous attention to detail and flawless execution",
                    },
                    {
                      icon: <Heart className="text-[#FF5E5B]" size={20} />,
                      title: "Passion",
                      desc: "Genuine love for what we do shines in every event",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 mt-1">{item.icon}</div>
                      <div>
                        <h4 className="font-semibold text-[#FFFFFF]">
                          {item.title}
                        </h4>
                        <p className="text-[#B0B0B0] text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] p-6 rounded-xl border border-[#D4AF37]/30 shadow-sm hover:shadow-md transition">
                <h4 className="font-bold text-[#D4AF37] mb-3 text-lg">
                  Our Mission
                </h4>
                <p className="text-[#B0B0B0]">
                  To craft extraordinary celebrations that reflect your unique
                  story while exceeding every expectation.
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] p-6 rounded-xl border border-[#FF5E5B]/30 shadow-sm hover:shadow-md transition">
                <h4 className="font-bold text-[#FF5E5B] mb-3 text-lg">
                  Our Vision
                </h4>
                <p className="text-[#B0B0B0]">
                  To revolutionize event experiences through innovation,
                  authenticity, and unparalleled service.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview - Luxury Midnight Theme */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] relative overflow-hidden">
        <div className="absolute -right-40 top-1/3 w-80 h-80 rounded-full bg-[#FF5E5B]/10 blur-3xl"></div>
        <div className="absolute -left-40 bottom-1/3 w-80 h-80 rounded-full bg-[#D4AF37]/10 blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
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
                <CalendarCheck2 className="text-[#D4AF37] mr-2" size={16} />
                <span className="text-[#D4AF37] text-sm font-medium">
                  Our Services
                </span>
              </div>
            </motion.div>
            <motion.h2
              variants={fadeIn}
              className="text-4xl md:text-5xl font-bold text-[#FFFFFF] mb-6"
            >
              Comprehensive Event Solutions
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl text-[#B0B0B0] max-w-3xl mx-auto"
            >
              From intimate gatherings to grand celebrations, we handle every
              detail with precision and care.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Wedding Planning",
                desc: "Complete wedding coordination from venue selection to honeymoon planning",
                icon: (
                  <div className="relative">
                    <div className="absolute -inset-4 bg-[#FF5E5B]/20 rounded-full blur"></div>
                    <Heart className="relative text-[#FF5E5B]" size={32} />
                  </div>
                ),
                stats: [
                  "Custom Themes",
                  "Vendor Management",
                  "Day-of Coordination",
                ],
              },
              {
                title: "Religious Ceremony",
                desc: "Sacred celebrations and traditional rituals with modern execution",
                icon: (
                  <div className="relative">
                    <div className="absolute -inset-4 bg-[#D4AF37]/20 rounded-full blur"></div>
                    <Star className="relative text-[#D4AF37]" size={32} />
                  </div>
                ),
                stats: [
                  "Annaprashan (First Rice Ceremony)",
                  "Upanayan (Sacred Thread)",
                  "Baby Shower",
                ],
              },
              {
                title: "Birthday Celebrations",
                desc: "Personalized parties that reflect the guest of honor",
                icon: (
                  <div className="relative">
                    <div className="absolute -inset-4 bg-[#FF5E5B]/20 rounded-full blur"></div>
                    <Sparkles className="relative text-[#FF5E5B]" size={32} />
                  </div>
                ),
                stats: [
                  "Milestone Birthdays",
                  "Themed Parties",
                  "Surprise Events",
                ],
              },
              {
                title: "Anniversary",
                desc: "Memorable celebrations of love and commitment through the years",
                icon: (
                  <div className="relative">
                    <div className="absolute -inset-4 bg-[#D4AF37]/20 rounded-full blur"></div>
                    <Heart className="relative text-[#D4AF37]" size={32} />
                  </div>
                ),
                stats: [
                  "Traditional Varmala Renewal",
                  "Milestone Saat Phere Ceremony",
                  "Bollywood-Themed Celebrations",
                ],
              },
              {
                title: "Venue Selection",
                desc: "Access to exclusive venues and bespoke location options",
                icon: (
                  <div className="relative">
                    <div className="absolute -inset-4 bg-[#FF5E5B]/20 rounded-full blur"></div>
                    <CalendarCheck2
                      className="relative text-[#FF5E5B]"
                      size={32}
                    />
                  </div>
                ),
                stats: [
                  "Destination Weddings",
                  "Unique Spaces",
                  "Vendor Negotiation",
                ],
              },
              {
                title: "Vendor Coordination",
                desc: "Curated network of trusted professionals and artisans",
                icon: (
                  <div className="relative">
                    <div className="absolute -inset-4 bg-[#D4AF37]/20 rounded-full blur"></div>
                    <Users className="relative text-[#D4AF37]" size={32} />
                  </div>
                ),
                stats: ["Photographers", "Caterers", "Entertainment"],
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                transition={{ delay: Math.floor(i / 3) * 0.2 + (i % 3) * 0.1 }}
                className="bg-[#1A1A1A] p-8 rounded-2xl shadow-lg hover:shadow-xl border border-[#2A2A2A] transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="mb-6">{service.icon}</div>
                <h4 className="text-xl font-bold text-[#FFFFFF] mb-3 group-hover:text-[#D4AF37] transition">
                  {service.title}
                </h4>
                <p className="text-[#B0B0B0] mb-4">{service.desc}</p>
                <ul className="space-y-2">
                  {service.stats.map((stat, idx) => (
                    <li key={idx} className="flex items-center">
                      <ChevronRight className="text-[#D4AF37] mr-2" size={16} />
                      <span className="text-sm text-[#B0B0B0]">{stat}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials / Reviews - Luxury Midnight Theme */}
      <section className="py-24 px-6 bg-[#0D0D0D] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/5f6bc60e665f54545a1e52a5/615d3c0a93cffa5e0e1f57e0_noise.png')] opacity-5"></div>
        <div className="absolute -right-40 top-1/4 w-80 h-80 rounded-full bg-[#FF5E5B]/10 blur-3xl"></div>
        <div className="absolute -left-40 bottom-1/4 w-80 h-80 rounded-full bg-[#D4AF37]/10 blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
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
                <Star
                  className="text-[#D4AF37] mr-2"
                  size={16}
                  fill="currentColor"
                />
                <span className="text-[#D4AF37] text-sm font-medium">
                  Client Love
                </span>
              </div>
            </motion.div>
            <motion.h2
              variants={fadeIn}
              className="text-4xl md:text-5xl font-bold text-[#FFFFFF] mb-6"
            >
              Voices of Delight
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl text-[#B0B0B0] max-w-3xl mx-auto"
            >
              Don't just take our word for it—here's what our clients have to
              say about their experiences.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((testimonial, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                transition={{ delay: i * 0.2 }}
                className="bg-[#1A1A1A] p-8 rounded-2xl shadow-lg border border-[#2A2A2A] hover:shadow-xl transition"
              >
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating || 5)].map((_, idx) => (
                    <Star
                      key={idx}
                      size={20}
                      className="text-[#D4AF37]"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="italic text-[#B0B0B0] mb-8 text-lg leading-relaxed">
                  "{testimonial.review}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#2A2A2A] overflow-hidden mr-4">
                    <img
                      src={`http://localhost:8001/uploads/${testimonial.ProfileImage}`}
                      alt={testimonial.Name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[#FFFFFF]">
                      {testimonial.Name}
                    </p>
                    <p className="text-sm text-[#B0B0B0]">
                      Managed by: {testimonial.EventManagerName}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Luxury Midnight Theme */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] to-[#0D0D0D] z-0"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-2xl"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-[#FF5E5B]/10 blur-2xl"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
            className="mb-8"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.2 } },
              }}
              className="inline-flex items-center bg-[#D4AF37]/10 backdrop-blur-sm px-4 py-2 rounded-full border border-[#D4AF37]/20 mb-6"
            >
              <PhoneCall className="text-[#D4AF37] mr-2" size={16} />
              <span className="text-[#D4AF37] text-sm font-medium">
                Let's Connect
              </span>
            </motion.div>
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.3 } },
              }}
              className="text-4xl md:text-4xl font-bold text-[#FFFFFF] mb-6"
            >
              Ready to Begin Your <br />
              <span className="text-[#D4AF37]">Event Journey?</span>
            </motion.h2>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.4 } },
              }}
              className="text-xl text-[#B0B0B0] max-w-2xl mx-auto"
            >
              Schedule a free consultation with our team to discuss your vision
              and how we can bring it to life.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#FF5E5B] to-[#D4AF37] text-white cursor-pointer font-bold rounded-full shadow-xl hover:shadow-2xl transition flex items-center justify-center"
              >
                Book Free Consultation{" "}
                <ChevronRight className="ml-2" size={20} />
              </motion.button>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
