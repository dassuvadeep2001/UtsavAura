import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] border-t border-[#D4AF37]/30 px-6 py-8 font-[Poppins] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-20"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#D4AF37]/5 blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-[#D4AF37]/5 blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10 mt-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-[#E0E0E0]">
          {/* Brand & Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="flex items-center gap-2 text-[#D4AF37] font-bold text-2xl transition-colors duration-200"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                UtsavAura
              </Link>
            </div>
            <p className="leading-relaxed text-[#B0B0B0] text-sm mt-4">
              Utsavaura brings the magic to your celebrations by connecting you
              with top event professionals. Celebrate your moments royally and
              effortlessly.
            </p>
            <div className="flex flex-wrap gap-2 pt-4">
              {["Birthday", "Wedding", "Ceremonies"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-[#1E1E1E] text-[#D4AF37] px-3 py-1 rounded-full border border-[#D4AF37]/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <h3 className="text-white font-semibold text-lg mb-6">
              QUICK LINKS
            </h3>

            <ul className="space-y-3">
              {[
                { to: "/about", label: "About Us" },

                { to: "/blog", label: "Blog" },
                { to: "/contact", label: "Contact Us" },
                { to: "/payment-info", label: "Payments" },

                { to: "/faq", label: "FAQ" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-[#B0B0B0] hover:text-[#D4AF37] transition-colors duration-200 text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:pl-8">
            <h3 className="text-white font-semibold text-lg mb-6">LEGAL</h3>

            <ul className="space-y-3">
              {[
                { to: "/legal", label: "Privacy Policy" },
                { to: "/legal", label: "Terms of Service" },
                { to: "/legal", label: "Cookie Policy" },
                { to: "/legal", label: "Refund Policy" },
                { to: "/legal", label: "Security" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-[#B0B0B0] hover:text-[#D4AF37] transition-colors duration-200 text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="lg:pl-8">
            <h3 className="text-white font-semibold text-lg mb-6">
              CONNECT WITH US
            </h3>

            <p className="text-[#B0B0B0] text-sm mb-6">
              Follow us or get in touch for queries. We're here to make your
              events extraordinary.
            </p>

            <div className="flex gap-4 mb-6">
              {[
                {
                  href: "https://facebook.com/utsavaura",
                  icon: Facebook,
                  label: "Facebook",
                },
                {
                  href: "https://twitter.com/utsavaura",
                  icon: Twitter,
                  label: "Twitter",
                },
                {
                  href: "https://instagram.com/utsavaura",
                  icon: Instagram,
                  label: "Instagram",
                },
                {
                  href: "https://linkedin.com/company/utsavaura",
                  icon: Linkedin,
                  label: "LinkedIn",
                },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[#B0B0B0] hover:text-[#D4AF37] transition-colors duration-200"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <Mail className="text-[#D4AF37] mr-2" size={16} />
                <a
                  href="mailto:support@utsavaura.com"
                  className="text-[#B0B0B0] hover:text-[#D4AF37] transition-colors duration-200"
                >
                  Support@utsavaura.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="text-[#D4AF37] mr-2" size={16} />
                <span className="text-[#B0B0B0]">+1 (123) 455-7890</span>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal divider and copyright */}
        <div className="border-t border-[#333333] mt-16 pt-8 text-center">
          <p className="text-[#B0B0B0]/70 text-xs">
            © 2025 UtsavAura. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
