import React from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  User,
  Tag,
  ChevronRight,
  Sparkles,
  Heart,
  Bookmark,
  Share2,
} from "lucide-react";

const Blog = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
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

  const blogPosts = [
    {
      title: "10 Magical Themes for Your Dream Wedding",
      image: "src/assets/images/wedding1.jpg",
      date: "May 15, 2025",
      author: "UtsavAura Team",
      tag: "Weddings",
      excerpt:
        "Planning your big day? Dive into these 10 stunning themes that will turn your wedding into an unforgettable celebration.",
      likes: 142,
      saved: 89,
    },
    {
      title: "Rituals & Richness: A Guide to Traditional Upanayanam Ceremonies",
      image: "src/assets/images/Upanayanam1.jpg",
      date: "April 28, 2025",
      author: "Pandit Shri Ramesh",
      tag: "Ceremonies",
      excerpt:
        "Discover the sacred rituals and meaning behind Upanayanam, and how we at UtsavAura help you honor this milestone with purity and grace.",
      likes: 98,
      saved: 56,
    },
    {
      title: "Birthday Bash Ideas That Wow at Every Age",
      image: "src/assets/images/birthday1.jpg",
      date: "March 20, 2025",
      author: "UtsavAura Crew",
      tag: "Birthdays",
      excerpt:
        "From toddlers to teens to grandparents, here are birthday celebration ideas that blend fun, themes, and flawless execution.",
      likes: 210,
      saved: 134,
    },
    {
      title: "Cherish Forever: Planning an Unforgettable Engagement Ceremony",
      image: "src/assets/images/engagement1.jpg",
      date: "May 5, 2025",
      author: "Ritika Sharma",
      tag: "Engagement",
      excerpt:
        "Make your ring ceremony a heartwarming memory with these elegant décor ideas, personalized rituals, and perfect photography tips.",
      likes: 176,
      saved: 102,
    },
    {
      title: "Timeless Love: Elegant Anniversary Celebration Ideas",
      image: "src/assets/images/anniversary1.jpg",
      date: "February 14, 2025",
      author: "UtsavAura Moments",
      tag: "Anniversary",
      excerpt:
        "Celebrate years of togetherness with charming themes, romantic dinner setups, and memorable gifting suggestions.",
      likes: 231,
      saved: 187,
    },
    {
      title: "First Bites of Tradition: A Soulful Rice Ceremony Guide",
      image: "src/assets/images/rice-ceremony1.jpg",
      date: "January 10, 2025",
      author: "Ananya Das",
      tag: "Rice Ceremony",
      excerpt:
        "Celebrate your baby's first rice meal with love and tradition—explore cultural meanings, outfit ideas, and décor inspirations.",
      likes: 87,
      saved: 45,
    },
  ];

  return (
    <div className="bg-[#0D0D0D] text-white relative overflow-hidden">
      {/* Hero Section with Video */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="src/assets/videos/blog.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/30 to-black/90"></div>

        {/* Hero Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto px-6 relative z-20 text-center space-y-8"
        >
          <motion.div variants={fadeIn}>
            <motion.span
              className="inline-flex items-center gap-2 mb-4 px-6 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-sm font-medium text-[#D4AF37]"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles size={16} className="text-[#D4AF37]" />
              UtsavAura Blog
            </motion.span>
          </motion.div>

          <motion.h1
            variants={fadeIn}
            className="text-5xl md:text-6xl font-bold leading-tight"
          >
            Stories, Ideas & <span className="text-[#D4AF37]">Rituals</span> to{" "}
            <span className="text-[#FF5E5B]">Celebrate</span> Life
          </motion.h1>

          <motion.p
            variants={fadeIn}
            className="text-lg md:text-xl text-[#E0E0E0] max-w-3xl mx-auto"
          >
            Explore inspiring stories, expert tips, and cultural deep-dives from
            the world of unforgettable celebrations.
          </motion.p>

          <motion.div variants={fadeIn} className="pt-6">
            <motion.a
              href="#blog-posts"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] text-[#0D0D0D] font-bold rounded-full hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Articles <ChevronRight size={20} />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
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

      <section
        id="blog-posts"
        className="py-24 px-6 relative z-10 bg-[#0D0D0D] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-20 text-center"
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl md:text-5xl font-bold mb-6 text-white"
            >
              Latest{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFD700]">
                Articles
              </span>
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-lg text-[#B0B0B0] max-w-3xl mx-auto leading-relaxed"
            >
              Discover our collection of curated content to inspire your next
              celebration.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#D4AF37]/30 transition-all duration-300 h-[500px] shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
              >
                {/* Image Container */}
                <div className="relative h-3/4 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                  {/* Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4AF37] text-[#0D0D0D] text-xs font-bold">
                      {post.tag}
                    </span>
                  </div>
                </div>

                {/* Static Info (Always Visible) */}
                <div className="h-1/4 p-6 flex flex-col justify-between">
                  <div className="text-md text-[#AFAFAF]">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="flex items-center gap-3">
                        <CalendarDays size={20} />
                        <span>{post.date}</span>
                      </span>
                      <span className="flex items-center gap-3">
                        <User size={20} />
                        <span>{post.author}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Blurry Overlay with Hidden Content */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-10 flex flex-col justify-end pb-6 px-6">
                  <div className="pointer-events-auto">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-[#B0B0B0] text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#2A2A2A]">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-sm text-[#AFAFAF] hover:text-[#FF5E5B] transition-colors">
                          <Heart size={16} className="fill-[#FF5E5B]/20" />
                          {post.likes}
                        </button>
                        <button className="flex items-center gap-1 text-sm text-[#AFAFAF] hover:text-[#D4AF37] transition-colors">
                          <Bookmark size={16} className="fill-[#D4AF37]/20" />
                          {post.saved}
                        </button>
                      </div>
                      <button className="text-[#AFAFAF] hover:text-white transition-colors">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
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

export default Blog;
