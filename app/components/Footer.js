"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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

  const { scrollYProgress } = useScroll();

  // Create spring-based animations for smoother scaling
  const scaleAnimation = useSpring(
    useTransform(scrollYProgress, [0.7, 0.9], [0.95, 1]),
    { stiffness: 100, damping: 30 }
  );

  const opacityAnimation = useSpring(
    useTransform(scrollYProgress, [0.7, 0.9], [0.5, 1]),
    { stiffness: 100, damping: 30 }
  );

  // Wave scale animation based on scroll
  const waveScaleY = useSpring(
    useTransform(scrollYProgress, [0.7, 0.9], [0.5, 1]),
    { stiffness: 100, damping: 30 }
  );

  const contentY = useSpring(
    useTransform(scrollYProgress, [0.7, 0.9], [30, 0]),
    { stiffness: 100, damping: 30 }
  );

  const contentScale = useSpring(
    useTransform(scrollYProgress, [0.7, 0.9], [0.95, 1]),
    { stiffness: 100, damping: 30 }
  );

  const contentOpacity = useSpring(
    useTransform(scrollYProgress, [0.7, 0.9], [0.5, 1]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <motion.footer
      className="relative bg-gradient-to-b from-[#1A0F1F] via-[#2D1810] to-[#1A0F1F] pt-16 pb-8 overflow-hidden"
      variants={footerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Enhanced Background Effects with SVG */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Existing gradient borders */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-green-500 to-orange-500"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <div className="absolute top-2 left-0 w-full h-px bg-gradient-to-r from-orange-300/20 via-green-300/20 to-orange-300/20" />

        {/* SVG Decorative Elements */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Gradient definitions */}
            <linearGradient id="footer-gradient" x1="0" y1="0" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,123,0,0.1)" />
              <stop offset="50%" stopColor="rgba(34,197,94,0.1)" />
              <stop offset="100%" stopColor="rgba(255,123,0,0.1)" />
            </linearGradient>

            {/* Pattern definitions */}
            <pattern id="footer-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="rgba(255,123,0,0.1)" />
            </pattern>

            {/* Glow filter */}
            <filter id="footer-glow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background patterns */}
          <rect width="100%" height="100%" fill="url(#footer-dots)" />

          {/* Enhanced Decorative waves */}
          <g className="waves">
            <motion.path
              d="M -100 50 Q 150 20, 400 50 T 900 50 T 1400 50 T 1900 50"
              stroke="url(#footer-gradient)"
              strokeWidth="1.5"
              fill="none"
              filter="url(#footer-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: 0.5,
                x: [-20, 0, -20]
              }}
              transition={{
                pathLength: { duration: 2, repeat: Infinity },
                x: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
            />

            {/* Second wave layer - slightly offset */}
            <motion.path
              d="M -100 70 Q 200 40, 500 70 T 900 70 T 1300 70 T 1700 70"
              stroke="url(#footer-gradient)"
              strokeWidth="1"
              fill="none"
              filter="url(#footer-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: 0.3,
                x: [0, -20, 0]
              }}
              transition={{
                pathLength: { duration: 2.5, repeat: Infinity },
                x: { duration: 10, repeat: Infinity, ease: "easeInOut" }
              }}
            />

            {/* Third wave layer - more pronounced curves */}
            <motion.path
              d="M -100 90 Q 250 30, 600 90 T 1100 90 T 1600 90 T 2100 90"
              stroke="url(#footer-gradient)"
              strokeWidth="0.8"
              fill="none"
              filter="url(#footer-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: 0.4,
                x: [-10, 10, -10]
              }}
              transition={{
                pathLength: { duration: 3, repeat: Infinity },
                x: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          </g>

          {/* Updated gradient definition for waves */}
          <defs>
            <linearGradient id="footer-gradient" x1="0" y1="0" x2="100%" y2="0">
              <stop offset="0%" stopColor="rgba(255,123,0,0.2)">
                <animate
                  attributeName="stopColor"
                  values="rgba(255,123,0,0.2); rgba(34,197,94,0.2); rgba(255,123,0,0.2)"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="50%" stopColor="rgba(34,197,94,0.2)">
                <animate
                  attributeName="stopColor"
                  values="rgba(34,197,94,0.2); rgba(255,123,0,0.2); rgba(34,197,94,0.2)"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="rgba(255,123,0,0.2)">
                <animate
                  attributeName="stopColor"
                  values="rgba(255,123,0,0.2); rgba(34,197,94,0.2); rgba(255,123,0,0.2)"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>

          {/* Animated circles */}
          <g>
            <motion.circle
              cx="20%"
              cy="80%"
              r="4"
              fill="none"
              stroke="rgba(255,123,0,0.2)"
              strokeWidth="1"
              filter="url(#footer-glow)"
              animate={{
                r: [4, 6, 4],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <motion.circle
              cx="80%"
              cy="20%"
              r="4"
              fill="none"
              stroke="rgba(34,197,94,0.2)"
              strokeWidth="1"
              filter="url(#footer-glow)"
              animate={{
                r: [4, 6, 4],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </g>


          {/* Corner decorations */}
          <motion.path
            d="M 0 0 L 50 0 L 50 50"
            stroke="rgba(255,123,0,0.2)"
            strokeWidth="1"
            fill="none"
            filter="url(#footer-glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />

          <motion.path
            d="M 100% 100% L calc(100% - 50px) 100% L calc(100% - 50px) calc(100% - 50px)"
            stroke="rgba(34,197,94,0.2)"
            strokeWidth="1"
            fill="none"
            filter="url(#footer-glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 1
            }}
          />
        </svg>

        {/* Keep existing animated corner decorations */}
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
      <motion.div
        className="container mx-auto px-4 relative z-10"
        style={{
          scale: scaleAnimation,
          opacity: opacityAnimation,
          y: contentY
        }}
      >
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
      </motion.div>
    </motion.footer>
  );
};

export default Footer;