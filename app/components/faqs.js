"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, MessageCircleQuestion, Mail, Search, Filter, ArrowUpCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const faqs = [
    {
      question: "What is Goonj 2025?",
      answer: "Goonj 2025 is the annual Techno-Cultural fest of the University Institute of Engineering and Technology (UIET). It's a platform where technology meets culture, featuring various events, workshops, competitions, and performances.",
      category: "general"
    },
    {
      question: "When and where will Goonj 2025 take place?",
      answer: "Goonj 2025 will be held from February 19-21, 2025, at the UIET campus. The event spans three days filled with exciting activities and performances.",
      category: "event"
    },
    {
      question: "How can I register for Goonj 2025?",
      answer: "Registration will open soon through our official website. You can register either as an individual participant or as a team, depending on the events you're interested in. Stay tuned to our social media channels for registration updates.",
      category: "registration"
    },
    {
      question: "What types of events can I participate in?",
      answer: "Goonj 2025 offers a wide range of events including technical competitions, hackathons, cultural performances, workshops, gaming tournaments, and more. Detailed event categories and schedules will be announced closer to the date.",
      category: "events"
    },
    {
      question: "Is there an accommodation facility for outstation participants?",
      answer: "Yes, we provide accommodation facilities for outstation participants. Details about accommodation and charges will be available during the registration process. Make sure to request accommodation while registering.",
      category: "accommodation"
    },
    {
      question: "Can first-year students participate?",
      answer: "Absolutely! Goonj welcomes participants from all years of study. There are special events designed specifically for first-year students to encourage their participation.",
      category: "eligibility"
    },
    {
      question: "Are there any prizes for the winners?",
      answer: "Yes, winners of various competitions will receive exciting prizes, including cash rewards, certificates, and sponsored gifts. The total prize pool for Goonj 2025 will be announced soon.",
      category: "prizes"
    },
    {
      question: "How can I volunteer for Goonj 2025?",
      answer: "We welcome volunteers who want to be part of organizing Goonj 2025. Volunteer registration forms will be available on our website. You can choose from various departments like event management, logistics, hospitality, etc.",
      category: "volunteer"
    }
  ];

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'general', label: 'General' },
    { id: 'event', label: 'Event Details' },
    { id: 'registration', label: 'Registration' },
    { id: 'events', label: 'Events' },
    { id: 'accommodation', label: 'Accommodation' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'prizes', label: 'Prizes' },
    { id: 'volunteer', label: 'Volunteer' },
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcuts handler
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === '/') {
        event.preventDefault();
        document.querySelector('input[type="text"]')?.focus();
      }
      if (event.key === 'Escape') {
        setSearchQuery('');
        setSelectedCategory('all');
        document.querySelector('input[type="text"]')?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mouse position tracker for background effect
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="bg-[#0D0221] py-20 relative overflow-hidden min-h-screen">
      {/* SVG Background Layer */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        animate={{
          scale: openIndex !== null ? 1.1 : 1,
          opacity: openIndex !== null ? 0.7 : 1
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 800"
          preserveAspectRatio="xMidYMid slice"
          className="absolute w-full h-full object-cover"
        >
          <defs>
            {/* Gradient Definitions with South Indian Color Palette */}
            <linearGradient id="south-indian-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#DB2777" stopOpacity="0.3" />
            </linearGradient>

            {/* Kolam-inspired Intricate Pattern */}
            <pattern id="kolam-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <path
                d="M100 0 
           Q150 50, 100 100 
           Q50 150, 100 200 
           Q150 250, 100 100 
           Q50 50, 100 0"
                fill="none"
                stroke="#9333EA"
                strokeWidth="1"
                opacity="0.2"
              />
            </pattern>

            {/* Lotus Flower Clip Path */}
            <clipPath id="lotus-clip">
              <path
                d="M100 0 
           Q150 50, 100 100 
           Q50 150, 0 100 
           Q50 50, 100 0 
           M100 0 
           Q150 50, 200 100 
           Q150 150, 100 200 
           Q50 150, 100 0"
              />
            </clipPath>

            {/* Bharatanatyam Dance Inspired Patterns */}
            <pattern id="dance-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M50 0 L75 50 L25 50 Z 
           M50 100 L75 50 L25 50 Z"
                fill="#6D28D9"
                opacity="0.1"
              />
            </pattern>
          </defs>

          {/* Background Layers */}
          <rect width="1000" height="800" fill="url(#kolam-pattern)" opacity="0.3" />
          <rect width="1000" height="800" fill="url(#south-indian-gradient)" opacity="0.2" />
          <rect width="1000" height="800" fill="url(#dance-pattern)" opacity="0.1" />

          {/* Decorative Elements */}
          {/* Lotus Flower Inspired Shapes */}
          <g transform="translate(200, 200)">
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="2"
              strokeDasharray="10 5"
              opacity="0.3"
            />
            <path
              d="M100 20 
         Q140 60, 100 100 
         Q60 140, 100 180 
         Q140 220, 100 180"
              fill="none"
              stroke="#DB2777"
              strokeWidth="2"
              opacity="0.4"
            />
          </g>

          {/* Rangoli-like Circular Patterns */}
          <g transform="translate(600, 500)">
            <path
              d="M100 0 
         Q150 50, 100 100 
         Q50 150, 0 100 
         Q50 50, 100 0
         M100 0 
         Q150 50, 200 100 
         Q150 150, 100 200 
         Q50 150, 0 100"
              fill="none"
              stroke="#9333EA"
              strokeWidth="1"
              opacity="0.3"
            />
          </g>

          {/* Temple Architecture Inspired Border */}
          <rect
            x="10" y="10"
            width="980"
            height="780"
            fill="none"
            stroke="#7E22CE"
            strokeWidth="5"
            strokeDasharray="40 20"
            opacity="0.5"
          />

          {/* Tamil Script Inspired Text */}
          <text
            x="500"
            y="750"
            textAnchor="middle"
            fontFamily="Tamil"
            fontSize="40"
            fill="rgba(255,255,255,0.2)"
            transform="rotate(-5 500 750)"
          >
            தென்னிந்திய கலாச்சாரம்
          </text>
        </svg>
      </motion.div>

      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(600px at var(--mouse-x) var(--mouse-y), rgba(255, 165, 0, 0.1), transparent 80%)',
            'radial-gradient(600px at var(--mouse-x) var(--mouse-y), rgba(0, 255, 255, 0.1), transparent 80%)',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{
          '--mouse-x': useTransform(mouseX, v => `${v}px`),
          '--mouse-y': useTransform(mouseY, v => `${v}px`),
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <MessageCircleQuestion className="w-16 h-16 text-orange-500" />
            </motion.div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 via-cyan-500 to-orange-500 mx-auto mb-8" />

          {/* Search and Filter Section */}
          <div className="max-w-xl mx-auto space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500/50"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-orange-500/30 transition-all duration-300"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.label}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-6">
          <AnimatePresence>
            {filteredFaqs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Alert variant="destructive">
                  <AlertDescription className="text-center">
                    No FAQs found matching your search criteria. Try adjusting your search or filters.
                  </AlertDescription>
                </Alert>
              </motion.div>
            ) : (
              filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  onMouseMove={handleMouseMove}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-cyan-500/20 rounded-lg blur-xl"
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      scale: hoveredIndex === index ? 1.02 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="bg-white/5 backdrop-blur-md rounded-lg overflow-hidden relative border border-white/10"
                    animate={{
                      scale: hoveredIndex === index ? 1.02 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full text-left p-6 flex items-center justify-between group"
                    >
                      <span className="text-lg text-white font-medium pr-8 group-hover:text-orange-400 transition-colors">
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{
                          rotate: openIndex === index ? 180 : 0,
                          scale: hoveredIndex === index ? 1.1 : 1
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-6 h-6 text-orange-500" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="p-6 pt-0">
                            <motion.p
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-gray-300"
                            >
                              {faq.answer}
                            </motion.p>
                            <div className="mt-4">
                              <Badge variant="outline" className="text-orange-500 border-orange-500/30">
                                {categories.find(c => c.id === faq.category)?.label}
                              </Badge>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
            <Mail className="w-5 h-5 text-orange-500" />
            <span className="text-gray-300">Have more questions?</span>
            <a
              href="mailto:contact@goonj2025.com"
              className="text-orange-500 hover:text-orange-400 font-medium transition-colors"
            >
              contact@goonj2025.com
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-2 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-colors"
          >
            <ArrowUpCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-96 h-96 -translate-x-1/2 translate-y-1/2">
        <motion.div
          className="absolute inset-0 border-l-2 border-b-2 border-orange-500/20 rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity },
            opacity: { duration: 4, repeat: Infinity },
          }}
        />
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="absolute inset-0 border-r-2 border-t-2 border-cyan-500/20 rounded-full"
          animate={{
            rotate: -360,
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, delay: 2 },
            opacity: { duration: 4, repeat: Infinity, delay: 2 },
          }}
        />
      </div>

      {/* Mouse Trail Effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-50"
        animate={{
          background: [
            'radial-gradient(20px at var(--mouse-x) var(--mouse-y), rgba(255,165,0,0.15), transparent)',
            'radial-gradient(20px at var(--mouse-x) var(--mouse-y), rgba(0,255,255,0.15), transparent)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          '--mouse-x': useTransform(mouseX, v => `${v}px`),
          '--mouse-y': useTransform(mouseY, v => `${v}px`)
        }}
      />
    </div>
  );
};


export default FAQ;