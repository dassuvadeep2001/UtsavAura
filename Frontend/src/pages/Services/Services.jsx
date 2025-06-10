import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  ChevronRight,
  CalendarDays,
  Tag,
  User,
  Star,
  Heart,
  Zap,
  Briefcase,
} from "lucide-react";
import { Link } from "react-router-dom";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};
const cardVariants = {
  hover: {
    y: -10,
    scale: 1.02,
    boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.3)",
    transition: { duration: 0.3 },
  },
};

const Services = () => {
  const { categoryId } = useParams();
  const [eventManagers, setEventManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState({
    title: "",
    description: "",
    image: "",
    accentColor: "#D4AF37",
    gradient: "from-[#D4AF37] to-[#FFD700]",
    sectionContent: {
      title: "",
      subtitle: "",
      description1: "",
      description2: "",
      stats: [],
      coreValues: [],
      mission: "",
      vision: "",
    },
  });

  // Fetch event managers
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:8001/api/category/categoryWiseEventManagers/${categoryId}`
        );
        const data = await res.json();
        if (data.status === 200) setEventManagers(data.data);
        else throw new Error(data.message || "Failed to load");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [categoryId]);
  // Add this effect at the top of your component
  useEffect(() => {
    if (!loading && !error) {
      console.log("Event Managers Data:", eventManagers);
    }
  }, [eventManagers, loading, error]);

  // Set category content based on ID
  useEffect(() => {
    const getCategoryContent = () => {
      let content = {
        title: "",
        description: "",
        image: "",
        accentColor: "#D4AF37",
        gradient: "from-[#D4AF37] to-[#FFD700]",
        sectionContent: {
          title: "",
          subtitle: "",
          description1: "",
          description2: "",
          stats: [],
          coreValues: [],
          mission: "",
          vision: "",
        },
      };

      switch (categoryId) {
        case "6836ec9b412211f70d5bc638": // Wedding
          content.title = "Dream Weddings with UtsavAura";
          content.description =
            "From royal themes to beachside mandaps, we create unforgettable wedding experiences filled with love and luxury.";
          content.image = "/src/assets/images/wedding-banner.jpg";
          content.accentColor = "#D4AF37";
          content.gradient = "from-[#D4AF37] to-[#FFD700]";
          content.sectionContent = {
            title: "Crafting Timeless Weddings",
            subtitle: "Your Perfect Day, Our Passion",
            description1:
              "With over a decade of experience in wedding planning, we understand that your wedding is more than an event—it's the beginning of your forever. Our team specializes in creating seamless, personalized celebrations that reflect your unique love story.",
            description2:
              "From venue selection to vendor coordination, we handle every detail with precision and care, ensuring your wedding day is everything you've dreamed of and more.",
            coreValues: [
              {
                icon: <Sparkles className="text-[#D4AF37]" size={20} />,
                title: "Personalization",
                desc: "Every wedding is unique, and we tailor every detail to reflect your personality",
              },
              {
                icon: <Heart className="text-[#FF5E5B]" size={20} />,
                title: "Romance",
                desc: "We infuse every moment with the magic and emotion it deserves",
              },
              {
                icon: <Briefcase className="text-[#D4AF37]" size={20} />,
                title: "Precision",
                desc: "Meticulous planning ensures your day flows perfectly",
              },
            ],
            mission:
              "To create weddings that are as unique as your love story, filled with meaningful moments and flawless execution.",
            vision:
              "To redefine wedding celebrations by blending tradition with innovation, creating experiences that last a lifetime.",
          };
          break;
        case "6836ee51cfb6236aa3b77ace": // Birthday
          content.title = "Celebrate Every Birthday in Style";
          content.description =
            "Whether it's a toddler's first or a grand 60th bash, our birthday events are vibrant, themed, and full of joy.";
          content.image = "/src/assets/images/birthday-banner.jpg";
          content.accentColor = "#FF5E5B";
          content.gradient = "from-[#FF5E5B] to-[#FF9E7D]";
          content.sectionContent = {
            title: "Birthday Celebrations That Shine",
            subtitle: "Marking Milestones with Magic",
            description1:
              "Birthdays are more than just another year—they're celebrations of life, growth, and joy. Our team specializes in creating birthday parties that capture the essence of the guest of honor.",
            description2:
              "Whether you want an intimate gathering or a grand celebration, we'll bring your vision to life with creative themes, exciting entertainment, and unforgettable moments.",
            coreValues: [
              {
                icon: <Sparkles className="text-[#FF5E5B]" size={20} />,
                title: "Joy",
                desc: "We design celebrations that spark happiness and create lasting memories",
              },
              {
                icon: <Zap className="text-[#FF5E5B]" size={20} />,
                title: "Energy",
                desc: "Our parties are filled with vibrant energy from start to finish",
              },
              {
                icon: <User className="text-[#FF5E5B]" size={20} />,
                title: "Personal Touch",
                desc: "Every celebration reflects the personality of the guest of honor",
              },
            ],
            mission:
              "To create birthday celebrations that make the guest of honor feel truly special while giving guests an unforgettable experience.",
            vision:
              "To transform birthday parties into extraordinary events that celebrate life's precious moments.",
          };
          break;
        case "6836ed78412211f70d5bc63e": // Anniversary
          content.title = "Timeless Celebrations for Your Journey";
          content.description =
            "Mark milestones of love with candle-lit dinners, elegant décor, and personal touches that say 'Forever.'";
          content.image = "/src/assets/images/anniversary-banner.jpg";
          content.accentColor = "#9B59B6";
          content.gradient = "from-[#9B59B6] to-[#E74C3C]";
          content.sectionContent = {
            title: "Celebrating Love That Lasts",
            subtitle: "Honoring Your Journey Together",
            description1:
              "Anniversaries are testaments to enduring love and commitment. We specialize in creating celebrations that honor your unique journey as a couple.",
            description2:
              "From intimate vow renewals to grand anniversary galas, we design events that reflect your relationship's depth and the love you continue to share.",
            coreValues: [
              {
                icon: <Heart className="text-[#9B59B6]" size={20} />,
                title: "Sentiment",
                desc: "We craft events that honor your shared history and love story",
              },
              {
                icon: <Sparkles className="text-[#9B59B6]" size={20} />,
                title: "Elegance",
                desc: "Sophisticated designs that match the significance of the occasion",
              },
              {
                icon: <CalendarDays className="text-[#9B59B6]" size={20} />,
                title: "Tradition",
                desc: "Honoring timeless traditions while creating new memories",
              },
            ],
            mission:
              "To create anniversary celebrations that beautifully reflect a couple's journey and the love that has grown between them.",
            vision:
              "To make every anniversary a meaningful celebration of enduring love and partnership.",
          };
          break;
        case "6836ef1787b9f621d8d7f579": // Engagement
          content.title = "Engagement Ceremonies That Sparkle";
          content.description =
            "From dreamy proposals to elegant ring ceremonies, we create magical beginnings for lifelong journeys.";
          content.image = "/src/assets/images/engagement-banner.jpg";
          content.accentColor = "#3498DB";
          content.gradient = "from-[#3498DB] to-[#2ECC71]";
          content.sectionContent = {
            title: "The Art of the Perfect Engagement",
            subtitle: "Where Forever Begins",
            description1:
              "An engagement marks the exciting beginning of your journey toward marriage. We specialize in creating engagement celebrations that are as unique as your love story.",
            description2:
              "Whether you envision an intimate gathering or a lavish party, we'll design an event that captures the magic of this special moment while reflecting your personal style.",
            coreValues: [
              {
                icon: <Sparkles className="text-[#3498DB]" size={20} />,
                title: "Romance",
                desc: "We create moments filled with love and heartfelt emotion",
              },
              {
                icon: <Heart className="text-[#3498DB]" size={20} />,
                title: "Intimacy",
                desc: "Designing celebrations that feel personal and meaningful",
              },
              {
                icon: <Zap className="text-[#3498DB]" size={20} />,
                title: "Surprise",
                desc: "Specializing in magical moments that take your breath away",
              },
            ],
            mission:
              "To craft engagement celebrations that perfectly capture the joy and promise of this special moment in your relationship.",
            vision:
              "To make every engagement an unforgettable celebration of love's beautiful beginning.",
          };
          break;
        case "6836ef3b87b9f621d8d7f57d": // Rice-Ceremony
          content.title = "First Bites of Blessings";
          content.description =
            "Celebrate this precious moment with soulful traditions, cultural décor, and heartwarming rituals.";
          content.image = "/src/assets/images/riceceremony-banner.jpg";
          content.accentColor = "#2ECC71";
          content.gradient = "from-[#2ECC71] to-[#F1C40F]";
          content.sectionContent = {
            title: "Celebrating New Beginnings",
            subtitle: "Honoring Tradition, Creating Memories",
            description1:
              "Rice ceremonies (Annaprashan) are beautiful cultural celebrations marking a baby's first solid food. We specialize in creating events that honor tradition while making the day special for the entire family.",
            description2:
              "From traditional setups to modern interpretations, we design ceremonies that respect cultural significance while creating a joyful atmosphere for all guests.",
            coreValues: [
              {
                icon: <Heart className="text-[#2ECC71]" size={20} />,
                title: "Tradition",
                desc: "Respecting and honoring cultural rituals and customs",
              },
              {
                icon: <Sparkles className="text-[#2ECC71]" size={20} />,
                title: "Joy",
                desc: "Creating celebrations filled with happiness and family bonding",
              },
              {
                icon: <User className="text-[#2ECC71]" size={20} />,
                title: "Family",
                desc: "Designing events that bring generations together in celebration",
              },
            ],
            mission:
              "To create rice ceremonies that beautifully blend tradition with modern celebration, making the occasion memorable for the child and family.",
            vision:
              "To preserve cultural traditions while making them accessible and enjoyable for contemporary families.",
          };
          break;
        case "6836ef4887b9f621d8d7f581": // Baby-Shower
          content.title = "Blessings for Mom & Baby";
          content.description =
            "We make baby showers a bundle of joy with soft hues, themed décor, and heart-touching moments.";
          content.image = "/src/assets/images/babyshower-banner.jpg";
          content.accentColor = "#F39C12";
          content.gradient = "from-[#F39C12] to-[#E91E63]";
          content.sectionContent = {
            title: "Celebrating New Life",
            subtitle: "Showering Mom & Baby with Love",
            description1:
              "A baby shower is a beautiful celebration of new life and the journey into parenthood. We specialize in creating events that honor the expecting mother while creating joyful memories for all attendees.",
            description2:
              "From elegant tea parties to fun-themed celebrations, we design baby showers that reflect the parents' style while creating a warm, welcoming atmosphere.",
            coreValues: [
              {
                icon: <Heart className="text-[#F39C12]" size={20} />,
                title: "Warmth",
                desc: "Creating events filled with love and support for the new parents",
              },
              {
                icon: <Sparkles className="text-[#F39C12]" size={20} />,
                title: "Whimsy",
                desc: "Designing celebrations that capture the magic of new beginnings",
              },
              {
                icon: <User className="text-[#F39C12]" size={20} />,
                title: "Comfort",
                desc: "Ensuring the expecting mother feels celebrated and relaxed",
              },
            ],
            mission:
              "To create baby showers that beautifully celebrate the journey into parenthood while showering the expecting mother with love and support.",
            vision:
              "To make every baby shower a memorable celebration of life's most precious gift.",
          };
          break;
        case "6836efda87b9f621d8d7f585": // Thread-Ceremony
          content.title = "Graceful Upanayanam Ceremonies";
          content.description =
            "Uphold age-old traditions with purity and elegance in this sacred rite of passage.";
          content.image = "/src/assets/images/upanayanam-banner.jpg";
          content.accentColor = "#1ABC9C";
          content.gradient = "from-[#1ABC9C] to-[#3498DB]";
          content.sectionContent = {
            title: "Sacred Thread Ceremonies",
            subtitle: "Honoring Tradition with Grace",
            description1:
              "The Upanayanam (Thread Ceremony) is a significant rite of passage in many cultures. We specialize in creating ceremonies that respect tradition while making the event accessible and meaningful for modern families.",
            description2:
              "From traditional setups to contemporary interpretations, we ensure the ceremony maintains its spiritual significance while creating a celebration the whole family can enjoy.",
            coreValues: [
              {
                icon: <Heart className="text-[#1ABC9C]" size={20} />,
                title: "Spirituality",
                desc: "Maintaining the sacred nature of this important ritual",
              },
              {
                icon: <Sparkles className="text-[#1ABC9C]" size={20} />,
                title: "Elegance",
                desc: "Designing ceremonies with grace and beauty",
              },
              {
                icon: <User className="text-[#1ABC9C]" size={20} />,
                title: "Family",
                desc: "Creating events that bring generations together in celebration",
              },
            ],
            mission:
              "To conduct thread ceremonies that honor ancient traditions while creating a meaningful experience for the entire family.",
            vision:
              "To preserve cultural heritage by making traditional ceremonies accessible and memorable for contemporary families.",
          };
          break;
        default:
          // Default case if ID doesn't match
          content.title = "Celebrate with UtsavAura";
          content.description =
            "We create unforgettable experiences tailored to your special occasions.";
          content.image = "/src/assets/images/wedding-banner.jpg";
          content.sectionContent = {
            title: "Your Celebration, Our Expertise",
            subtitle: "Crafting Unforgettable Moments",
            description1:
              "At UtsavAura, we believe every celebration deserves to be extraordinary. Our team of experienced professionals is dedicated to making your special occasion truly memorable.",
            description2:
              "Whether it's a intimate gathering or a grand celebration, we bring creativity, precision, and passion to every event we plan.",
            stats: [
              { value: "1000+", label: "Events" },
              { value: "100%", label: "Dedication" },
              { value: "50+", label: "Team Members" },
              { value: "98%", label: "Satisfaction" },
            ],
            coreValues: [
              {
                icon: <Sparkles className="text-[#D4AF37]" size={20} />,
                title: "Creativity",
                desc: "Innovative ideas that make your event stand out",
              },
              {
                icon: <Briefcase className="text-[#D4AF37]" size={20} />,
                title: "Professionalism",
                desc: "Meticulous planning and flawless execution",
              },
              {
                icon: <Heart className="text-[#D4AF37]" size={20} />,
                title: "Passion",
                desc: "Genuine love for creating memorable experiences",
              },
            ],
            mission:
              "To craft extraordinary celebrations that reflect your unique story while exceeding every expectation.",
            vision:
              "To revolutionize event experiences through innovation, authenticity, and unparalleled service.",
          };
      }

      setCategory(content);
    };
    getCategoryContent();
  }, [categoryId]);

  return (
    <div className="bg-[#0D0D0D] text-white relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/90 z-10"></div>
        <img
          src={category.image}
          alt={category.title}
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto px-6 relative z-20 text-center space-y-8"
        >
          <motion.div variants={fadeIn} className="inline-block mb-6">
            <div className="flex items-center justify-center bg-[#D4AF37]/10 backdrop-blur-sm px-6 py-3 rounded-full border border-[#D4AF37]/30">
              <Sparkles className="text-[#D4AF37] mr-2" size={18} />
              <span className="text-[#D4AF37] text-sm font-medium">
                UtsavAura Services
              </span>
            </div>
          </motion.div>
          <motion.h1
            variants={fadeIn}
            className="text-5xl md:text-6xl font-bold leading-tight tracking-tight text-white"
          >
            <span className="bg-gradient-to-r from-white via-[#FF5E5B] to-white bg-clip-text text-transparent">
              {category.title}
            </span>
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-[#B0B0B0] max-w-3xl mx-auto leading-relaxed text-xl md:text-2xl"
          >
            {category.description}
          </motion.p>
          <motion.div variants={fadeIn} className="pt-8">
            <motion.a
              href="#managers"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] text-[#0D0D0D] font-bold rounded-full hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Managers <ChevronRight size={20} />
            </motion.a>
          </motion.div>
        </motion.div>
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

        {/* Floating Decor Elements */}
        <motion.div
          className="absolute top-1/4 left-10 z-0"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles size={24} className="text-[#D4AF37]/50" />
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-20 z-0"
          animate={{ y: [0, 20, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <Sparkles size={24} className="text-[#FF5E5B]/50" />
        </motion.div>
      </section>

      {/* Category-Specific Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-[#FF5E5B]/10 blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              {/* Badge & Title */}
              <div>
                <div
                  className={`inline-flex items-center space-x-2 px-4 py-2 bg-[${category.accentColor}]/20 backdrop-blur-sm rounded-full border border-[${category.accentColor}]/30 mb-6 shadow-lg`}
                >
                  <Heart
                    className={`text-[${category.accentColor}]`}
                    size={18}
                  />
                  <span
                    className={`text-sm font-semibold text-[${category.accentColor}]`}
                  >
                    {category.sectionContent.subtitle}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-white leading-tight">
                  {category.sectionContent.title}
                </h2>
              </div>
              {/* Description Text */}
              <div className="space-y-5 text-base md:text-lg text-gray-400">
                <p>{category.sectionContent.description1}</p>
                <p>{category.sectionContent.description2}</p>
              </div>
            </motion.div>

            {/* Right Info Column */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              {/* Approach Card */}
              <div className="relative group">
                <div
                  className={`absolute -inset-1 bg-[${category.accentColor}]/20 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity`}
                ></div>
                <div className="relative bg-black/40 p-8 rounded-2xl shadow-xl border border-gray-700 backdrop-blur-md">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Our Approach
                  </h3>
                  <div className="space-y-6">
                    {category.sectionContent.coreValues.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 group/item"
                      >
                        <div
                          className={`mt-1 text-[${category.accentColor}] group-hover/item:scale-110 transition-transform`}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white text-lg">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-400">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mission & Vision Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Mission */}
                <div
                  className={`bg-gradient-to-br from-black/70 to-gray-900/50 p-6 rounded-xl border border-[${category.accentColor}]/30 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <h4
                    className={`font-bold text-lg text-[${category.accentColor}] mb-3`}
                  >
                    Our Mission
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {category.sectionContent.mission}
                  </p>
                </div>
                {/* Vision */}
                <div
                  className={`bg-gradient-to-br from-black/70 to-gray-900/50 p-6 rounded-xl border border-[${category.accentColor}]/30 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <h4
                    className={`font-bold text-lg text-[${category.accentColor}] mb-3`}
                  >
                    Our Vision
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {category.sectionContent.vision}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Manager Section */}
      <section id="managers" className="py-28 px-6 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
            >
              Meet Our{" "}
              <span
                className={`text-transparent bg-clip-text bg-gradient-to-r ${category.gradient}`}
              >
                Event Specialists
              </span>
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-lg text-[#B0B0B0] max-w-2xl mx-auto leading-relaxed"
            >
              Handpicked professionals who transform your vision into
              unforgettable experiences
            </motion.p>
          </div>

          {/* Event Manager Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {loading && (
              <div className="col-span-full flex justify-center items-center py-20">
                <div className="inline-flex items-center gap-3 text-xl text-[#D4AF37]">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles size={24} />
                  </motion.div>
                  Loading our talented event managers...
                </div>
              </div>
            )}
            {error && (
              <div className="col-span-full text-center py-20 text-red-400 text-xl">
                ❌ {error}
              </div>
            )}
            {!loading &&
              !error &&
              eventManagers.map((manager) => (
                <motion.div
                  key={manager.eventManagerId}
                  variants={fadeIn}
                  whileHover="hover"
                  className="group relative bg-gradient-to-b from-[#1F1F1F] to-[#121212] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#333] flex flex-col items-center p-8 hover:border-[#D4AF37] hover:scale-[1.02]"
                >
                  {/* Circular Profile Image with Glow */}
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#D4AF37] mb-6 group-hover:ring-2 ring-[#D4AF37] ring-opacity-50 transition-all duration-300">
                    <img
                      src={`http://localhost:8001/uploads/${manager.profileImage}`}
                      alt={manager.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  {/* Name */}
                  <h3 className="text-2xl font-bold text-white text-center mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {manager.name}
                  </h3>
                  {/* Location (Address) */}
                  <div className="flex items-center gap-2 text-[#B0B0B0] mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{manager.address || "Kolkata"}</span>
                  </div>
                  {/* Rating */}

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const rating =
                        manager.avgReview || manager.averageRating || 0;
                      const isFilled = star <= Math.floor(rating);
                      const isHalf =
                        star === Math.ceil(rating) && rating % 1 > 0;

                      return (
                        <div key={star} className="relative h-5 w-5">
                          {/* Default empty star */}
                          <Star
                            size={20}
                            className="absolute top-0 left-0 text-gray-500"
                          />

                          {/* Filled or half part of the star */}
                          {isFilled ? (
                            <Star
                              size={20}
                              className="fill-[#D4AF37] text-[#D4AF37]"
                            />
                          ) : isHalf ? (
                            <div className="overflow-hidden absolute top-0 left-0 h-full w-1/2 pointer-events-none">
                              <Star
                                size={20}
                                className="fill-[#D4AF37] text-[#D4AF37]"
                              />
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                    <span className="ml-1 text-sm text-gray-300">
                      ({manager.reviews?.length || manager.totalReviews || 0})
                    </span>
                  </div>
                  {/* View Portfolio Button */}
                  <Link
                    to={`/event-manager-details/${manager.eventManagerId}`}
                    className="block w-full py-2 bg-[#FF5E5B] rounded-full text-[#0D0D0D] font-semibold hover:text-white transition-all duration-300 text-center mt-4 shadow-md hover:shadow-lg"
                  >
                    View Portfolio
                  </Link>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] to-[#0D0D0D] z-0"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-2xl"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-[#FF5E5B]/10 blur-2xl"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold"
          >
            Ready to <span className="text-[#D4AF37]">Celebrate</span>?
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-lg text-[#E0E0E0]"
          >
            Get in touch with us to turn your ideas into beautifully
            orchestrated events filled with meaning and joy.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="pt-4"
          >
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] text-[#0D0D0D] font-bold rounded-full hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Plan Your Celebration
              <span className="flex items-center">
                <ChevronRight size={20} className="mr-1" />
              </span>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
