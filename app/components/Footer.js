"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebookF, href: "https://www.facebook.com/uiet.goonj?mibextid=ZbWKwL", label: "Facebook" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FaInstagram, href: "https://www.instagram.com/goonj.uietpu?igsh=MnlrOWlxNmh2Ym9o", label: "Instagram" },
    { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Events", href: "/events" },
    { label: "Info", href: "/info" },
    { label: "Register", href: "/register" },
    { label: "Star Night", href: "/star-night" },
    { label: "Contact Us", href: "/contact" }
  ];

  const contactInfo = [
    { icon: FaPhone, text: "+91 XXX XXX XXXX", href: "tel:+91XXXXXXXXXX" },
    { icon: FaEnvelope, text: "contact@goonj25.com", href: "mailto:contact@goonj25.com" },
    { icon: FaMapMarkerAlt, text: "UIET, Panjab University, Chandigarh", href: "https://maps.google.com" },
  ];

  const footerVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, type: "spring", stiffness: 100 },
    },
  };

  const iconVariants = {
    hover: {
      scale: 1.1,
      color: "#FF7B00",
      textShadow: "0 0 8px rgba(255,123,0,0.5)",
      transition: { type: "spring", stiffness: 300, duration: 0.3 },
    },
  };

  return (
    <motion.footer
      className="relative bg-gradient-to-b from-[#1A0F1F] via-[#2D1810] to-[#1A0F1F] pt-16 pb-8 overflow-hidden"
      variants={footerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-green-500 to-orange-500"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <div className="absolute top-2 left-0 w-full h-px bg-gradient-to-r from-orange-300/20 via-green-300/20 to-orange-300/20" />
        
        {/* Animated Corner Decorations */}
        <motion.div
          className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-orange-500/20"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-green-500/20"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h3 className="text-xl font-bold text-orange-500 mb-4">About Goonj</h3>
            <p className="text-orange-100/80 text-sm leading-relaxed mb-6">
              Goonj is UIET&apos;s premier techno-cultural fest, bringing together innovation, 
              creativity, and tradition in a spectacular celebration of talent and technology.
              Join us for an unforgettable experience of cultural harmony and technical excellence.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center md:text-left"
          >
            <h3 className="text-xl font-bold text-orange-500 mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <motion.div key={link.label} whileHover={{ x: 5 }}>
                  <Link 
                    href={link.href}
                    className="text-orange-100/80 hover:text-orange-500 transition-colors text-sm flex items-center justify-center md:justify-start"
                  >
                    <span className="mr-2">→</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center md:text-left"
          >
            <h3 className="text-xl font-bold text-orange-500 mb-4">Contact Us</h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center text-orange-100/80 text-sm justify-center md:justify-start"
                  whileHover={{ x: 5, color: "#FF7B00" }}
                >
                  <info.icon className="mr-3 text-orange-500" />
                  <a href={info.href} className="hover:text-orange-500 transition-colors">
                    {info.text}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Social Links and Copyright */}
        <div className="border-t border-orange-500/20 pt-8">
          <motion.div className="flex justify-center gap-6 mb-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-50 text-xl bg-white/5 p-3 rounded-full hover:bg-white/10"
                variants={iconVariants}
                whileHover="hover"
                aria-label={social.label}
              >
                <social.icon />
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="text-center text-sm text-orange-100/60"
            whileHover={{ color: "#FF7B00" }}
          >
            <p className="mb-2">
              © {new Date().getFullYear()} Goonj&apos;25. All Rights Reserved.
            </p>
            <p className="text-xs">
              Designed with ❤ by UIET Students
            </p>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;