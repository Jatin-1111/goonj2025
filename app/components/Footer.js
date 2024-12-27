"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
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
      className="relative bg-gradient-to-b from-[#1A0F1F] via-[#2D1810] to-[#1A0F1F] py-12 text-center overflow-hidden"
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
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-lg font-semibold text-orange-50 mb-4"
          whileHover={{ color: "#FF7B00" }}
        >
          Tradition Meets Technology
        </motion.div>

        <motion.div className="flex justify-center gap-6 mb-6">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-50 text-xl"
              variants={iconVariants}
              whileHover="hover"
              aria-label={social.label}
            >
              <social.icon />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="text-sm text-orange-100 font-light"
          whileHover={{ color: "#FF7B00" }}
        >
          © {new Date().getFullYear()} Goonj&apos;25. All Rights Reserved.
        </motion.div>

        {/* Gradient Divider */}
        <div className="relative mt-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
