"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaLeaf,  // Using Leaf as a substitute for Lotus
} from "react-icons/fa";
import { 
  FiCpu,  // CPU icon from Feather Icons
  FiCircle,  // Circuit-like icon from Feather Icons
  FiCode,  // QR Code-like icon from Feather Icons
} from "react-icons/fi";

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
      transition: { 
        duration: 0.7, 
        type: "spring", 
        stiffness: 100 
      },
    },
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: { 
        type: "spring", 
        stiffness: 300,
        duration: 0.5 
      },
    },
  };

  return (
    <motion.footer
      className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 py-12 text-center overflow-hidden"
      variants={footerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Tech-Inspired Background Effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-circuit-pattern"></div>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Logo and Tagline */}
        <motion.div 
          className="flex items-center justify-center mb-6"
          whileHover={{ scale: 1.05 }}
        >
          <FaLeaf className="text-orange-400 mr-4" size={40} />
          <h2 className="text-3xl font-bold text-white">Goonj 2025</h2>
        </motion.div>

        {/* Tagline */}
        <motion.div
          className="text-lg font-medium text-orange-100 mb-6"
          whileHover={{ color: "#FF7B00" }}
        >
          Bridging Tradition with Technological Innovation
        </motion.div>

        {/* Social Links */}
        <motion.div 
          className="flex justify-center gap-8 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl"
              variants={iconVariants}
              whileHover="hover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              aria-label={social.label}
            >
              <social.icon />
            </motion.a>
          ))}
        </motion.div>

        {/* Tech-Culture Icons */}
        <div className="flex justify-center space-x-6 mb-6 opacity-70">
          <FiCircle className="text-green-400" size={30} />
          <FiCpu className="text-blue-400" size={30} />
          <FiCode className="text-purple-400" size={30} />
        </div>

        {/* Copyright */}
        <motion.div
          className="text-sm text-orange-200 font-light"
          whileHover={{ scale: 1.02, color: "#FF7B00" }}
        >
          © {new Date().getFullYear()} Goonj 2025.
        </motion.div>

        {/* Gradient Divider */}
        <div className="relative mt-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
        </div>
      </div>

      {/* Subtle Background Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-green-500 to-purple-500"
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            x: ['-100%', '0%', '100%']
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </motion.footer>
  );
};

export default Footer;