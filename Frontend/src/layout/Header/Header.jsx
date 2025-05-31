import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Heart,
  Gift,
  BookOpen,
  CreditCard,
  Users,
  HelpCircle,
  FileText,
  CalendarDays as Calendar,
  Gem as Ring,
  Baby,
  UtensilsCrossed as Utensils,
} from "lucide-react";

// Reusable Dropdown Component
const DropdownMenu = ({ id, label, items, isOpen, onToggle, onClose }) => {
  return (
    <div className="relative">
      <button
        id={`${id}-btn`}
        onClick={() => {
          onToggle();
          onClose();
        }}
        className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors cursor-pointer duration-200"
      >
        {label} {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      <div
        id={`${id}-dropdown`}
        className={`absolute top-10 left-0 bg-[#0D0D0D] border border-[#D4AF37]/20 shadow-xl rounded-lg py-4 w-[28rem] transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 visible pointer-events-auto"
            : "opacity-0 -translate-y-2 invisible pointer-events-none"
        }`}
      >
        {items.map(({ to, icon, title, desc }, idx) => (
          <Link
            to={to}
            key={idx}
            className="flex items-start gap-4 px-6 py-3 hover:bg-[#1A1A1A] transition-colors duration-200 group"
          >
            <div className="group-hover:scale-110 transition-transform duration-200">
              {icon}
            </div>
            <div>
              <div className="font-semibold text-[#FFFFFF] group-hover:text-[#D4AF37] transition-colors duration-200">
                {title}
              </div>
              <div className="text-sm text-[#B0B0B0] mt-1">{desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest("#services-dropdown") &&
        !e.target.closest("#services-btn")
      ) {
        setServicesOpen(false);
      }
      if (
        !e.target.closest("#explore-dropdown") &&
        !e.target.closest("#explore-btn")
      ) {
        setExploreOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const servicesItems = [
    {
      to: "/services/wedding",
      icon: <Heart size={22} className="mt-1 text-[#D4AF37]" />,
      title: "Wedding",
      desc: "Celebrate your love with a grand and memorable wedding.",
    },
    {
      to: "/services/anniversary",
      icon: <Calendar size={22} className="text-[#D4AF37]" />,
      title: "Anniversary",
      desc: "Rekindle the magic with a beautifully curated celebration.",
    },
    {
      to: "/services/engagement",
      icon: <Ring size={22} className="text-[#D4AF37]" />,
      title: "Engagement",
      desc: "Make your special moment unforgettable with us.",
    },
    {
      to: "/services/birthday",
      icon: <Gift size={22} className="text-[#D4AF37]" />,
      title: "Birthday",
      desc: "Host an extraordinary birthday bash for every age.",
    },
    {
      to: "/services/baby-shower",
      icon: <Baby size={22} className="text-[#D4AF37]" />,
      title: "Baby Shower",
      desc: "Welcome the little one with joy and elegance.",
    },
    {
      to: "/services/rice-ceremony",
      icon: <Utensils size={22} className="text-[#D4AF37]" />,
      title: "Rice Ceremony",
      desc: "A joyful celebration marking the first meal of your child.",
    },
    {
      to: "/services/upanayan",
      icon: <Users size={22} className="text-[#D4AF37]" />,
      title: "Upanayan",
      desc: "Sacred ceremony celebrating tradition and spiritual growth.",
    },
  ];

  const exploreItems = [
    {
      to: "/blog",
      icon: <BookOpen size={22} className="text-[#D4AF37]" />,
      title: "Blog",
      desc: "Tips, trends, and inspiration for your events.",
    },
    {
      to: "/payment-info",
      icon: <CreditCard size={22} className="text-[#D4AF37]" />,
      title: "Payment Info",
      desc: "Know how to book and pay securely.",
    },
    {
      to: "/faq",
      icon: <HelpCircle size={22} className="text-[#D4AF37]" />,
      title: "FAQs",
      desc: "Answers to common questions about us.",
    },
    {
      to: "/legal",
      icon: <FileText size={22} className="text-[#D4AF37]" />,
      title: "Legal",
      desc: "Terms, policies, and legal information.",
    },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/10 backdrop-blur-md border-b border-[#FFFFFF]/10"
          : "bg-[#0D0D0D] border-b border-[#FFFFFF]/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-[#D4AF37] font-bold text-2xl transition-colors duration-200"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          <Sparkles size={28} className="text-[#D4AF37]" />
          UtsavAura
        </Link>

        {/* Navigation Links */}
        <div
          className="hidden md:flex items-center gap-8 text-[#FFFFFF] font-medium relative text-[18px]"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <Link
            to="/about"
            className="hover:text-[#D4AF37] transition-colors duration-200"
          >
            About
          </Link>

          <DropdownMenu
            id="services"
            label="Services"
            items={servicesItems}
            isOpen={servicesOpen}
            onToggle={() => setServicesOpen((prev) => !prev)}
            onClose={() => setExploreOpen(false)}
          />

          <DropdownMenu
            id="explore"
            label="Explore"
            items={exploreItems}
            isOpen={exploreOpen}
            onToggle={() => setExploreOpen((prev) => !prev)}
            onClose={() => setServicesOpen(false)}
          />

          <Link
            to="/contact"
            className="hover:text-[#D4AF37] transition-colors duration-200"
          >
            Contact Us
          </Link>

          <Link
            to="/login"
            className="ml-4 px-5 py-2.5 bg-[#FF5E5B] text-white rounded-full hover:bg-[#FF5E5B]/90 transition-colors duration-200 font-medium"
          >
            Login or Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-[#FFFFFF] hover:text-[#D4AF37] transition-colors duration-200">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
