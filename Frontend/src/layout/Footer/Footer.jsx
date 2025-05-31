import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0D0D0D] border-t border-[#D4AF37]/20 py-16 px-6 font-[Poppins]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-[#B0B0B0]">
        {/* Brand & Description */}
        <div>
          <Link
            to="/"
            className="flex items-center gap-2 text-[#D4AF37] text-2xl font-bold tracking-wide mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            UtsavAura
          </Link>
          <p className="leading-relaxed text-sm">
            UtsavAura brings the magic to your celebrations by connecting you
            with top event professionals. Celebrate your moments royally and effortlessly.
          </p>
          <p className="mt-6 text-xs text-[#B0B0B0]/70">
            © {new Date().getFullYear()} UtsavAura. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-[#FFFFFF] font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/about", label: "About Us" },
              { to: "/services", label: "Services" },
              { to: "/blog", label: "Blog" },
              { to: "/contact", label: "Contact Us" },
              { to: "/faq", label: "FAQ" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="hover:text-[#D4AF37] transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-[#FFFFFF] font-semibold text-lg mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/privacy", label: "Privacy Policy" },
              { to: "/terms", label: "Terms of Service" },
              { to: "/cookie", label: "Cookie Policy" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="hover:text-[#D4AF37] transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="text-[#FFFFFF] font-semibold text-lg mb-4">Connect with Us</h3>
          <p className="text-sm mb-4">Follow us or get in touch for queries.</p>
          <div className="flex items-center space-x-4 mb-6">
            {[
              { href: "https://facebook.com/utsavaura", icon: Facebook, label: "Facebook" },
              { href: "https://twitter.com/utsavaura", icon: Twitter, label: "Twitter" },
              { href: "https://instagram.com/utsavaura", icon: Instagram, label: "Instagram" },
              { href: "https://linkedin.com/company/utsavaura", icon: Linkedin, label: "LinkedIn" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hover:text-[#D4AF37] transition-colors duration-200"
              >
                <Icon size={22} />
              </a>
            ))}
          </div>
          <div className="space-y-1 text-sm">
            <p>
              Email:{" "}
              <a
                href="mailto:support@utsavaura.com"
                className="text-[#FF5E5B] hover:text-[#D4AF37] underline transition-colors"
              >
                support@utsavaura.com
              </a>
            </p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
