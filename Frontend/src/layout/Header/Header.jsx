import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
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

// Predefined category icons outside component to prevent recreation
const CATEGORY_ICONS = {
  wedding: <Sparkles size={22} className="mt-1 text-[#D4AF37]" />,
  anniversary: <Sparkles size={22} className="text-[#D4AF37]" />,
  engagement: <Sparkles size={22} className="text-[#D4AF37]" />,
  birthday: <Sparkles size={22} className="text-[#D4AF37]" />,
  "baby shower": <Sparkles size={22} className="text-[#D4AF37]" />,
  "rice ceremony": <Sparkles size={22} className="text-[#D4AF37]" />,
  upanayan: <Sparkles size={22} className="text-[#D4AF37]" />,
  default: <Sparkles size={22} className="text-[#D4AF37]" />,
};

const getCategoryIcon = (categoryName) => {
  return CATEGORY_ICONS[categoryName.toLowerCase()] || CATEGORY_ICONS.default;
};

const DropdownMenu = ({
  id,
  label,
  items,
  isOpen,
  onToggle,
  onClose,
  onItemClick,
}) => {
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
        className={`absolute top-10 left-0 bg-[#0D0D0D] border border-[#D4AF37]/20 shadow-xl rounded-lg py-4 w-[30rem] transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 visible pointer-events-auto"
            : "opacity-0 -translate-y-2 invisible pointer-events-none"
        }`}
      >
        {items.map(({ to, icon, title, desc }) => (
          <Link
            to={to}
            key={`${to}-${title}`}
            onClick={onItemClick}
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
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    user: null,
    profileImage: null,
  });

  const navigate = useNavigate();

  // Static explore items outside component to prevent recreation
  const EXPLORE_ITEMS = [
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

  useEffect(() => {
    const checkAuthState = () => {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      const isLoggedIn = !!token;

      let user = null;
      let profileImage = null;

      if (userStr) {
        try {
          user = JSON.parse(userStr);
          profileImage = user.profileImage || user._doc?.profileImage || null;

          if (profileImage && !profileImage.startsWith("http")) {
            profileImage = `http://localhost:8001/uploads/${profileImage}`;
          }
        } catch (err) {
          console.error("Error parsing user data:", err);
        }
      }

      setAuthState({ isLoggedIn, user, profileImage });
      setIsLoading(false);
    };

    checkAuthState();

    const handleStorageChange = (e) => {
      if (e.key === "token" || e.key === "user") {
        checkAuthState();
      }
    };

    const handleAuthChange = () => checkAuthState();

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "http://localhost:8001/api/category/getAllCategories"
        );
        const data = await res.json();
        setCategories(data.data || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
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

  const handleProfileClick = () => {
    if (!authState.isLoggedIn) return navigate("/login");

    try {
      switch (authState.user?.role) {
        case "admin":
          navigate("/profile");
          break;
        case "eventManager":
          navigate("/profile");
          break;
        default:
          navigate("/profile");
      }
    } catch (err) {
      console.error("Error handling profile click:", err);
      navigate("/login");
    }
  };

  // Generate services items only when categories change
  const servicesItems = categories.map((cat) => ({
    to: `/services/${cat._id}`,
    icon: getCategoryIcon(cat.category),
    title: cat.category,
    desc: cat.descriptions || "Celebrate your moments with us.",
  }));

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/10 backdrop-blur-md border-b border-[#FFFFFF]/10"
          : "bg-[#0D0D0D] border-b border-[#FFFFFF]/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 text-[#D4AF37] font-bold text-2xl transition-colors duration-200"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          <Sparkles size={28} className="text-[#D4AF37]" />
          UtsavAura
        </Link>

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
          {authState.isLoggedIn && (
            <DropdownMenu
              id="services"
              label="Services"
              items={servicesItems}
              isOpen={servicesOpen}
              onToggle={() => {
                setServicesOpen((prev) => !prev);
                setExploreOpen(false);
              }}
              onClose={() => setExploreOpen(false)}
              onItemClick={() => setServicesOpen(false)}
            />
          )}

          <DropdownMenu
            id="explore"
            label="Explore"
            items={EXPLORE_ITEMS}
            isOpen={exploreOpen}
            onToggle={() => {
              setExploreOpen((prev) => !prev);
              setServicesOpen(false);
            }}
            onClose={() => setServicesOpen(false)}
            onItemClick={() => setExploreOpen(false)}
          />

          <Link
            to="/contact"
            className="hover:text-[#D4AF37] transition-colors duration-200"
          >
            Contact Us
          </Link>

          {isLoading ? (
            <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse"></div>
          ) : authState.isLoggedIn ? (
            <div className="relative group">
              <button
                onClick={handleProfileClick}
                className="rounded-full overflow-hidden w-10 h-10 border-2 border-[#D4AF37] hover:brightness-110 transition-all duration-200"
                aria-label="Profile"
                title={authState.user?.name || "Profile"}
              >
                {authState.profileImage ? (
                  <img
                    src={
                      authState.profileImage.startsWith("http") ||
                      authState.profileImage.startsWith("blob:")
                        ? authState.profileImage
                        : `http://localhost:8001/uploads/${authState.profileImage}`
                    }
                    alt="Profile"
                    className="w-full h-full object-cover cursor-pointer"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-[#D4AF37] text-black font-semibold text-lg">
                    <img src="/src/assets/images/user.png" alt="Profile" className="cursor-pointer"  />
                  </div>
                )}
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-[#FF5E5B] text-white px-4 py-2 rounded-full hover:bg-red-500 transition-all duration-200"
            >
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
