"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Wrench, Cog, Gauge } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaToolbox, FaTools, FaTwitter, FaYoutube } from 'react-icons/fa';

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Rotating gear animation component
  const Gear = ({ size = 40, className = "", delay = 0 }) => (
    <motion.div
      className={`absolute ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear",
        delay
      }}
    >
      <Cog size={size} className="text-steel-500/20" />
    </motion.div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const inputClasses = "w-full bg-slate-800/50 backdrop-blur-sm rounded-lg border border-steel-600/30 p-3 text-white placeholder:text-white/50 focus:outline-none focus:border-blue-500/50 transition-colors";

  const SocialIcon = ({ icon: Icon, href, label }) => (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-2 bg-slate-800/50 rounded-lg border border-steel-600/30 hover:bg-slate-700/50 transition-colors"
      aria-label={label}
    >
      <Icon className="w-6 h-6 text-white" />
    </motion.a>
  );

  return (
    <main className="relative bg-[#1a1f2e] py-48 min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#4a90e2 1px, transparent 1px), linear-gradient(90deg, #4a90e2 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Animated Gears Background */}
      <div className="absolute inset-0 overflow-hidden">
        <Gear size={100} className="top-20 left-20" />
        <Gear size={80} className="top-40 left-40" delay={0.2} />
        <Gear size={120} className="bottom-40 right-20" delay={0.4} />
        <Gear size={60} className="bottom-20 right-40" delay={0.6} />
      </div>

      {/* Industrial Gradient Overlay */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(74, 144, 226, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, rgba(96, 165, 250, 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <Settings className="w-8 h-8 text-blue-400" />
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-center text-blue-50 relative inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Contact Us
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-steel-400 to-blue-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5 }}
              />
            </motion.h1>
            <Settings className="w-8 h-8 text-blue-400" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          >
            {/* Contact Form */}
            <motion.form
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              onSubmit={handleSubmit}
              className="bg-slate-900/40 backdrop-blur-sm rounded-xl p-6 border border-steel-600/30 space-y-4 relative"
            >
              {/* Mechanical Corner Accents */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-blue-500/50" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-blue-500/50" />

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className={inputClasses}
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className={inputClasses}
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Subject"
                  className={inputClasses}
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                />
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className={inputClasses}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 via-steel-500 to-blue-600 text-white font-semibold py-3 rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
                type="submit"
              >
                <FaTools className="w-5 h-5" />
                Send Message
              </motion.button>
            </motion.form>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Location Info */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-slate-900/40 backdrop-blur-sm rounded-lg p-6 border border-steel-600/30 relative"
              >
                <Wrench className="absolute top-4 right-4 w-6 h-6 text-blue-400/40" />
                <h3 className="text-xl text-white font-semibold mb-4 flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-blue-400" />
                  Visit Us
                </h3>
                <p className="text-white/80">
                  Mechanical Engineering Department,<br />
                  University Institute of Engineering and Technology,<br />
                  Panjab University, Sector 25, Chandigarh
                </p>
              </motion.div>

              {/* Contact Details */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-slate-900/40 backdrop-blur-sm rounded-lg p-6 border border-steel-600/30"
              >
                <h3 className="text-xl text-white font-semibold mb-4 flex items-center gap-2">
                  <FaToolbox className="w-5 h-5 text-blue-400" />
                  Contact Info
                </h3>
                <div className="space-y-2 text-white/80">
                  <p>Email: mechanical@goonj.com</p>
                  <p>Phone: +91 XXX XXX XXXX</p>
                </div>
              </motion.div>

              {/* Social Media */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-slate-900/40 backdrop-blur-sm rounded-lg p-6 border border-steel-600/30"
              >
                <h3 className="text-xl text-white font-semibold mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-400" />
                  Connect With Us
                </h3>
                <motion.div
                  className="flex gap-4 flex-wrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <SocialIcon icon={FaInstagram} href="#" label="Instagram" />
                  <SocialIcon icon={FaFacebook} href="#" label="Facebook" />
                  <SocialIcon icon={FaTwitter} href="#" label="Twitter" />
                  <SocialIcon icon={FaLinkedin} href="#" label="LinkedIn" />
                  <SocialIcon icon={FaYoutube} href="#" label="YouTube" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};

export default ContactPage;