import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ChevronRight,
  Star,
  Zap,
  Award,
  Smile,
  Check,
  Heart,
  Facebook,
  Instagram,
  Globe,
  Building,
  Utensils,
  Palette,
  Camera,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css";

// Reusable Components
const Counter = ({ target, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    if (start === end) return;

    const incrementTime = (duration * 8000) / end;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const PercentageCounter = ({ target, duration = 2 }) => {
  return <Counter target={target} suffix="%" duration={duration} />;
};

// Data

const statsImages = [
  "src/assets/images/birthday2.jpg",
  "src/assets/images/upanayanam2.jpg",
  "src/assets/images/baby-shower1.jpg",
  "src/assets/images/anniversary2.jpg",
];

const eventTypes = [
  {
    title: "Wedding",
    description:
      "Celebrate the union of two souls with traditional ceremonies and modern festivities",
    image: "src/assets/images/wedding.jpg",
  },
  {
    title: "Anniversary",
    description:
      "Commemorate years of love and partnership with a memorable celebration",
    image: "src/assets/images/anniversary.jpg",
  },
  {
    title: "Engagement",
    description:
      "Mark the beginning of a couple's journey toward marriage with an intimate ceremony",
    image: "src/assets/images/engagement.jpg",
  },
  {
    title: "Upanayanam",
    description:
      "Sacred thread ceremony marking a young boy's entry into formal education",
    image: "src/assets/images/upanayanam.jpg",
  },
  {
    title: "Baby Shower",
    description:
      "Celebrate the upcoming arrival of a new family member with gifts and blessings",
    image: "src/assets/images/baby-shower.jpg",
  },
  {
    title: "Birthday",
    description:
      "Annual celebration of life, growth, and happiness for all ages",
    image: "src/assets/images/birthday.jpg",
  },
  {
    title: "Rice Ceremony",
    description:
      "Traditional first feeding ceremony celebrating a baby's transition to solid food",
    image: "src/assets/images/rice-ceremony.jpg",
  },
];

const stats = [
  {
    icon: <Zap className="text-[#D4AF37]" size={20} />,
    value: <Counter target="500" suffix="+" />,
    label: "Events Executed",
  },
  {
    icon: <Smile className="text-[#D4AF37]" size={20} />,
    value: <PercentageCounter target="98" />,
    label: "Client Satisfaction",
  },
  {
    icon: <Award className="text-[#D4AF37]" size={20} />,
    value: <Counter target="50" suffix="+" />,
    label: "Awards Won",
  },
  {
    icon: <Heart className="text-[#D4AF37]" size={20} />,
    value: <PercentageCounter target="100" />,
    label: "Passion",
  },
];

const tabs = [
  { id: "event-managers", label: "Event Managers" },
  { id: "socket-communication", label: "1:1 Real-Time Chat" },
  { id: "stripe-payments", label: "Secure Payments" },
];

const tabContentData = [
  // 1. EVENT MANAGERS (Full Indian Event Coverage)
  {
    id: "event-managers",
    title: "End-to-End Event Managers",
    description:
      "Professional handlers who orchestrate complete Indian ceremonies from planning to execution.",
    features: [
      "📌 Single-point coordination for weddings, receptions, and all rituals",
      "🕉️ Pandit/Vedic ceremony specialists for Upanayanam/Mundan",
      "👶 Baby shower & Annaprashan planning with theme customization",
      "💍 Engagement-to-reception timeline management",
      "💰 Budget optimization across venues, decor, and catering",
      "🆘 24/7 on-ground crisis handling",
    ],
    cta: "Get Custom Manager Plan",
  },

  // 2. SOCKET CHAT (Tech-Focused)
  {
    id: "socket-communication",
    title: "1:1 Encrypted Chat",
    description:
      "Secure real-time messaging for vendors, families, and guests.",
    features: [
      "🔒 Socket.io encrypted messaging",
      "📞 Voice note and file sharing",
      "👨‍👩‍👧‍👦 Group chats for family coordination",
      "⏱️ Message read receipts",
      "🌐 Multi-language support",
    ],
    cta: "Try Live Chat Demo",
  },

  // 3. STRIPE PAYMENTS (Transaction-Focused)
  {
    id: "stripe-payments",
    title: "Stripe Payment Gateway",
    description:
      "Seamless transactions for event advances, vendor payments, and donations.",
    features: [
      "💳 Accept payments in 100+ currencies",
      "🔄 Auto-split payments to vendors",
      "📊 Instant payment reconciliation",
      "🛡️ Chargeback protection",
      "🎟️ E-invoices for hawans/rituals",
    ],
    cta: "See Payment Dashboard",
  },
];

const platforms = [
  {
    name: "Google",
    rating: 4.9,
    icon: <Globe className="text-white" size={24} />,
    color: "#4285F4",
    reviews: "12,500+ reviews",
  },
  {
    name: "Facebook",
    rating: 5.0,
    icon: <Facebook className="text-white" size={24} />,
    color: "#1877F2",
    reviews: "8,200+ reviews",
  },
  {
    name: "Instagram",
    rating: 4.8,
    icon: <Instagram className="text-white" size={24} />,
    color: "#E4405F",
    reviews: "5,700+ reviews",
  },
  {
    name: "Trustpilot",
    rating: 4.7,
    icon: <Award className="text-white" size={24} />,
    color: "#00B67A",
    reviews: "3,400+ reviews",
  },
];
const serviceCards = [
  {
    icon: <Building className="text-[#D4AF37]" size={20} />,
    color: "#D4AF37",
    title: "Banquets",
    desc: "Elegant venues perfect for weddings, anniversaries, and formal gatherings.",
  },
  {
    icon: <Utensils className="text-[#FF5E5B]" size={20} />,
    color: "#FF5E5B",
    title: "Caterers",
    desc: "Delicious, customizable menus for all occasions and dietary preferences.",
  },
  {
    icon: <Palette className="text-[#2A8AF6]" size={20} />,
    color: "#2A8AF6",
    title: "Decorators",
    desc: "From dreamy weddings to playful birthdays—theme-based decor magic.",
  },
  {
    icon: <Camera className="text-[#9B59B6]" size={20} />,
    color: "#9B59B6",
    title: "Studios",
    desc: "Capture timeless memories with our top-tier photo and video services.",
  },
];
const serviceImages = [
  "src/assets/images/banquet.jpg",
  "src/assets/images/banquet1.jpg",
  "src/assets/images/caterer.jpg",

  "src/assets/images/caterer1.jpg",
];

const Home = () => {
  const [activeTab, setActiveTab] = useState("event-managers");

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("right");

  const swiperRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Scroll handlers
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      const section = document.getElementById("services-section");
      if (!section) return;

      const scrollPosition = window.scrollY;
      const rect = section.getBoundingClientRect();
      const sectionTop = scrollPosition + rect.top;
      const sectionHeight = rect.height;

      // Determine scroll direction
      setScrollDirection(scrollPosition > lastScrollY ? "right" : "left");
      lastScrollY = scrollPosition;

      // Calculate image index
      const scrollProgress =
        (scrollPosition - sectionTop + window.innerHeight) /
        (sectionHeight + window.innerHeight);

      if (scrollProgress >= 0 && scrollProgress <= 1) {
        const newIndex = Math.min(
          Math.floor(scrollProgress * serviceImages.length),
          serviceImages.length - 1
        );
        setCurrentImageIndex(newIndex);
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Any additional animation updates
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [serviceImages.length]);

  return (
    <div className="bg-[#0D0D0D] text-[#FFFFFF] overflow-hidden">
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
          <source src="src/assets/videos/home.mp4" type="video/mp4" />
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
                Elevating Events Since 2020
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Where Dreams{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] bg-clip-text text-transparent">
              Become
            </span>{" "}
            Celebrations
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-[#B0B0B0] max-w-3xl mx-auto mb-10"
          >
            UtsavAura transforms your vision into unforgettable experiences with
            bespoke event planning and flawless execution.
          </motion.p>

          {!localStorage.getItem("token") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="/choose-user"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="px-8 py-3.5 bg-gradient-to-r from-[#FF5E5B] to-[#D4AF37] text-white cursor-pointer font-semibold rounded-full shadow-lg hover:shadow-xl transition flex items-center justify-center">
                  Register Now <ChevronRight className="ml-2" size={18} />
                </button>
              </motion.a>
            </motion.div>
          )}
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

      {/* Event Types Section */}

      <section className="py-24 px-6 bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-[#FF5E5B]/10 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              One <span className="text-[#D4AF37]">Event</span> Platform
            </h2>
            <h3 className="text-xl md:text-2xl text-white">
              Powerful solutions for all.
            </h3>
          </div>

          <Swiper
            ref={swiperRef}
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            loop={true}
            autoplay={{ delay: 3000 }}
            speed={1000}
            centeredSlides={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {eventTypes.map((event, index) => (
              <SwiperSlide key={index}>
                <div className="slide-card relative w-[400px] h-[300px] mx-auto rounded-xl overflow-hidden shadow-lg transition-all duration-500">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 z-10"></div>
                  <div className="relative z-20 h-full flex flex-col mt-20 items-center justify-center p-6 text-center">
                    <h3 className="text-xl md:text-2xl font-bold text-[#D4AF37] mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-white">{event.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-24 px-6 bg-[#0D0D0D] relative overflow-hidden">
        <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-[#FF5E5B]/10 blur-3xl"></div>
        <div className="absolute -left-40 -bottom-40 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl"></div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center bg-[#D4AF37]/10 px-4 py-2 rounded-full border border-[#D4AF37]/30 mb-4">
                <Star
                  className="text-[#D4AF37] mr-2"
                  size={16}
                  fill="currentColor"
                />
                <span className="text-[#D4AF37] text-sm font-medium">
                  Our Portfolio
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#FFFFFF] mb-6">
                A Glimpse of Our <span className="text-[#D4AF37]">Magic</span>
              </h2>
            </div>

            <p className="text-lg text-[#B0B0B0] leading-relaxed">
              Each event we craft is a unique masterpiece, blending creativity
              with precision to create moments that linger in memory long after
              the celebration ends.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A] shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                >
                  <div className="flex items-center mb-2">
                    {stat.icon}
                    <p className="text-2xl font-bold text-[#D4AF37] ml-2">
                      {stat.value}
                    </p>
                  </div>
                  <p className="text-sm text-[#B0B0B0]">{stat.label}</p>
                </div>
              ))}
            </div>

            <a href="/blog">
              <button className="mt-6 px-6 py-3 bg-transparent text-white font-medium rounded-full border-2 cursor-pointer border-[#D4AF37] hover:bg-[#D4AF37]/10 transition flex items-center">
                View Blog <ChevronRight className="ml-2" size={16} />
              </button>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 relative">
            {statsImages.slice(0, 4).map((img, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-xl aspect-square shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-10"></div>
                <img
                  src={img}
                  alt={`Event showcase ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabbed Content Section */}

      <section className="py-24 px-6 bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-[#FF5E5B]/10 blur-3xl"></div>
        {/* Ambient Glow / Sparkles */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)] animate-pulse-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Revolutionizing Celebrations:{" "}
              <span className="text-[#D4AF37]">Tradition</span>{" "}
              <span className="text-white">Meets</span>{" "}
              <span className="text-[#D4AF37]">Technology</span>
            </h2>
            <p className="text-lg text-[#B0B0B0] max-w-3xl mx-auto">
              Experience seamless event management from weddings to Upanayanam,
              powered by AI coordination, real-time vendor tracking, and secure
              payments.
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            <div className="relative p-1 rounded-full bg-gradient-to-r from-[#D4AF37]/20 via-[#FF5E5B]/20 to-[#2A8AF6]/20 backdrop-blur-md shadow-inner">
              <div className="flex bg-black/30 p-1 rounded-full">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative z-10 px-6 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                      activeTab === tab.id
                        ? "text-white"
                        : "text-[#B0B0B0] hover:text-white"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTabBg"
                        className="absolute inset-0 bg-[#D4AF37] rounded-full z-[-1] "
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {tabContentData.map(
                  (tabData) =>
                    activeTab === tabData.id && (
                      <div key={tabData.id}>
                        <h3 className="text-2xl font-bold text-white mb-3">
                          {tabData.title}
                        </h3>
                        <p className="text-[#B0B0B0] mb-6">
                          {tabData.description}
                        </p>

                        <div className="space-y-3 mb-8">
                          {tabData.features.map((feature, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <div className="p-1 bg-[#FFD700]/10 rounded-full mt-1">
                                <Check className="text-[#FFD700]" size={16} />
                              </div>
                              <span className="text-[#B0B0B0]">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )
                )}
              </motion.div>
            </AnimatePresence>

            {/* Video Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden aspect-video shadow-[0_0_40px_#FFD70040] bg-[#1A1A1A]/30 backdrop-blur-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 to-[#FF5E5B]/10 z-0" />
              <video
                src="src/assets/videos/event.mp4"
                className="w-full h-full object-cover z-10 relative"
                autoPlay
                loop
                muted
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-20">
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white via-[#FF5E5B] to-[#D4AF37] bg-clip-text text-transparent">
                    Tradition Meets Modern Excellence
                  </h3>
                  <p className="text-white">
                    We're redefining Indian celebrations with seamless
                    technology and authentic cultural execution.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ratings & Reviews Section */}
      <section className="py-24 px-6 bg-[#0D0D0D] relative overflow-hidden">
        <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-[#FF5E5B]/10 blur-3xl"></div>
        <div className="absolute -left-40 -bottom-40 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl"></div>
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-[160px] animate-float1"></div>
          <div className="absolute bottom-1/4 right-1/3 w-[420px] h-[420px] bg-[#FF5E5B]/10 rounded-full blur-[180px] animate-float2"></div>
          <div className="absolute top-[20%] right-[15%] w-[500px] h-[500px] bg-[#2A8AF6]/10 rounded-full blur-[200px] animate-float3"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#D4AF37]/20 rounded-full blur-[100px] animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Loved by Clients,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFD700]">
                Rated by Platforms
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-[#B0B0B0] max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Consistently rated{" "}
              <span className="text-white font-semibold">4.9+ stars</span>{" "}
              across global platforms. Join our trusted network today.
            </motion.p>
          </motion.div>

          {/* Ratings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 z-10 relative">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative rounded-3xl overflow-hidden w-full h-72 flex items-center justify-center group border border-white/10 bg-white/5 backdrop-blur-[14px] shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-300 ]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0 opacity-60 group-hover:opacity-80 transition-opacity rounded-3xl"></div>
                <div className="absolute top-0 left-0 w-full h-full border border-white/10 rounded-3xl pointer-events-none"></div>
                <div className="relative z-10 p-8 text-center w-full">
                  <div
                    className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-xl shadow-inner shadow-[#ffffff0a]"
                    style={{ backgroundColor: `${platform.color}22` }}
                  >
                    {platform.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {platform.name}
                  </h3>
                  <div className="flex justify-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < Math.floor(platform.rating)
                            ? "text-[#FFD700] fill-current"
                            : "text-[#333]"
                        }
                      />
                    ))}
                    <span className="ml-2 text-[#FFD700] font-medium">
                      {platform.rating}
                    </span>
                  </div>
                  <p className="text-[#CCCCCC] text-sm">{platform.reviews}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="text-center mt-24"
          >
            <p className="text-lg text-[#CCCCCC] mb-6">
              Join{" "}
              <span className="text-white font-semibold">
                thousands of elite clients
              </span>{" "}
              who trust our premium services
            </p>
          </motion.div>
        </div>

        <style jsx>{`
          @keyframes float1 {
            0%,
            100% {
              transform: translate(0, 0) rotate(0deg);
            }
            50% {
              transform: translate(30px, 20px) rotate(6deg);
            }
          }
          @keyframes float2 {
            0%,
            100% {
              transform: translate(0, 0) rotate(0deg);
            }
            50% {
              transform: translate(-20px, 25px) rotate(-5deg);
            }
          }
          @keyframes float3 {
            0%,
            100% {
              transform: translate(0, 0) rotate(0deg);
            }
            50% {
              transform: translate(15px, -15px) rotate(4deg);
            }
          }
          .animate-float1 {
            animation: float1 20s ease-in-out infinite;
          }
          .animate-float2 {
            animation: float2 18s ease-in-out infinite;
          }
          .animate-float3 {
            animation: float3 22s ease-in-out infinite;
          }
        `}</style>
      </section>

      {/* Services Section */}

      <section
        id="services-section"
        className="py-24 px-6 bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] relative overflow-hidden"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-center relative z-10 mb-6">
          Our <span className="text-[#D4AF37]">Comprehensive</span> Services
        </h2>
        <p className="text-center text-lg text-[#B0B0B0] max-w-2xl mx-auto mb-16">
          Discover how our tailored solutions bring tradition and innovation
          together for seamless, unforgettable events.
        </p>
        {/* Decorative glows */}
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-[#FF5E5B]/10 blur-3xl"></div>
        <div className="absolute inset-0 opacity-5 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI0Q0QUYzNyIgY3g9IjIwIiBjeT0iMjAiIHI9IjEuNSIvPjwvZz48L3N2Zz4=')]" />
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-10 items-center relative z-10">
          {/* Image Carousel */}
          <div className="md:col-span-3 relative h-[515px] rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <div className="absolute inset-0 border-2 bg-gradient-to-t from-black/90 via-transparent to-black/30 border-[#D4AF37]/30 rounded-2xl pointer-events-none z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 z-10" />

            <AnimatePresence mode="wait">
              {serviceImages.map(
                (image, index) =>
                  currentImageIndex === index && (
                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        x: scrollDirection === "right" ? 60 : -60,
                        scale: 0.98,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                      }}
                      exit={{
                        opacity: 0,
                        x: scrollDirection === "right" ? -60 : 60,
                        transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] },
                      }}
                      className="absolute inset-0"
                    >
                      <img
                        src={image}
                        alt={`Service ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    </motion.div>
                  )
              )}
            </AnimatePresence>

            <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-10">
              {serviceImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentImageIndex === i ? "bg-[#D4AF37] w-4" : "bg-white/30"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Service Cards */}
          <div className="md:col-span-2 space-y-5">
            {serviceCards.map((card, i) => (
              <div
                key={i}
                className="p-5 bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${card.color}20` }}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="text-sm text-[#B0B0B0] mt-1">{card.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="py-24 px-6 bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden z-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#D4AF37]/20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10 flex flex-col items-center justify-center ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center bg-[#D4AF37]/10 px-6 py-2 rounded-full border border-[#D4AF37]/30 mb-6"
          >
            <Sparkles className="text-[#D4AF37] mr-2" size={18} />
            <span className="text-[#D4AF37] text-sm font-medium">
              READY TO ELEVATE YOUR EVENTS?
            </span>
          </motion.div>

          {localStorage.getItem("token") ? (
            // If token exists: Show welcome message without the button
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                Welcome to <span className="text-[#D4AF37]">UtsavAura</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-[#B0B0B0] max-w-3xl mx-auto mb-10"
              >
                Explore our services and start planning unforgettable events
                with ease.
              </motion.p>
            </motion.div>
          ) : (
            // If no token: Show original Get Started section
            <>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                Begin Your <span className="text-[#D4AF37]">Extraordinary</span>{" "}
                Journey
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-[#B0B0B0] max-w-3xl mx-auto mb-10"
              >
                Join thousands of event professionals and enthusiasts who trust
                UtsavAura to transform their visions into breathtaking
                realities.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.a
                  href="/login"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] text-white cursor-pointer font-semibold rounded-full shadow-lg hover:shadow-xl transition flex items-center justify-center">
                    Get Started <ChevronRight className="ml-2" size={20} />
                  </button>
                </motion.a>
              </motion.div>
            </>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 flex flex-wrap justify-center items-center gap-6 text-[#B0B0B0] text-sm"
          >
            <div className="flex items-center">
              <Star className="text-[#D4AF37] mr-2" size={16} fill="#D4AF37" />
              <span>Trusted by 500+ event organizers</span>
            </div>
            <div className="flex items-center">
              <Award className="text-[#D4AF37] mr-2" size={16} />
              <span>Industry award winner</span>
            </div>
            <div className="flex items-center">
              <Heart className="text-[#D4AF37] mr-2" size={16} fill="#D4AF37" />
              <span>98% customer satisfaction</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
