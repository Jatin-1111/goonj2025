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
    <div className="bg-[#0D0221] py-24 relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 800" className="w-full h-full">
          <defs>
            {/* Gradient and Pattern Definitions */}
            <linearGradient id="code-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6" />
            </linearGradient>

            <pattern id="circuit-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M0 10 L10 10 M10 0 L10 10 M10 20 L10 10" fill="none" stroke="#7E22CE" strokeWidth="1" opacity="0.3" />
            </pattern>
          </defs>

          {/* Computer Science - Code Representation */}
          <g transform="translate(50, 100)">
            <rect width="300" height="200" fill="url(#code-gradient)" rx="10" ry="10" opacity="0.7" />
            <text x="10" y="30" fontFamily="monospace" fontSize="16" fill="#FFFFFF">
              <tspan x="10" dy="0">def indian_tech_innovation():</tspan>
              <tspan x="10" dy="30">    cs_fields = [</tspan>
              <tspan x="30" dy="30">{'AI'} {'Machine Learning'},</tspan>
              <tspan x="30" dy="30">{'Quantum Computing'}</tspan>
              <tspan x="10" dy="30">    return innovate(cs_fields)</tspan>
            </text>
          </g>

          {/* IT - Network and Code */}
          <g transform="translate(400, 100)">
            <rect width="300" height="200" fill="#10B981" rx="10" ry="10" opacity="0.6" />
            <path d="M50 100 Q100 50, 150 100 T250 100" fill="none" stroke="#FFFFFF" strokeWidth="3" />
            <text x="10" y="30" fontFamily="monospace" fontSize="16" fill="#FFFFFF">
              <tspan x="10" dy="0">class NetworkInnovation:</tspan>
              <tspan x="10" dy="30">    def connect_india(self):</tspan>
              <tspan x="30" dy="30">        global_network =</tspan>
              <tspan x="30" dy="30">            create_infrastructure()</tspan>
            </text>
          </g>

          {/* ECE - Circuit Board */}
          <g transform="translate(50, 400)">
            <rect width="300" height="200" fill="url(#circuit-pattern)" rx="10" ry="10" opacity="0.8" />
            <path d="M50 100 L100 50 L150 100 L200 50 L250 100" fill="none" stroke="#8B5CF6" strokeWidth="3" />
            <circle cx="75" cy="100" r="10" fill="#6D28D9" />
            <circle cx="175" cy="50" r="10" fill="#6D28D9" />
            <text x="10" y="180" fontFamily="sans-serif" fontSize="16" fill="#4C1D95">
              Electronic Circuits
            </text>
          </g>

          {/* Electrical Engineering - Advanced Circuit Design */}
          <g transform="translate(400, 400)">
            <rect width="300" height="200" fill="#F43F5E" rx="10" ry="10" opacity="0.6" />
            <path d="M50 50 L100 100 L150 50 L200 100 L250 50" fill="none" stroke="#FFFFFF" strokeWidth="3" />
            <rect x="75" y="75" width="50" height="50" fill="#FFFFFF" opacity="0.3" />
            <text x="10" y="180" fontFamily="sans-serif" fontSize="16" fill="#FFFFFF">
              Electrical Systems Design
            </text>
          </g>

          {/* Mechanical Engineering - Gears and Tools */}
          <g transform="translate(50, 650)">
            <rect width="300" height="200" fill="#F97316" rx="10" ry="10" opacity="0.7" />
            <path
              d="M100 100 
               A50 50 0 1 1 100 200 
               A50 50 0 1 1 100 100 
               M100 125 L150 125 
               M100 175 L150 175"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="5"
            />
            <path
              d="M200 150 L250 100 L300 150 L250 200 Z"
              fill="#FFFFFF"
              opacity="0.3"
            />
            <text x="10" y="180" fontFamily="sans-serif" fontSize="16" fill="#FFFFFF">
              Mechanical Design & Tools
            </text>
          </g>

          {/* Bio-tech - DNA and Molecular Structure */}
          <g transform="translate(400, 650)">
            <rect width="300" height="200" fill="#22D3EE" rx="10" ry="10" opacity="0.7" />
            <path
              d="M100 50 Q150 100, 100 150 Q50 100, 100 50 
               M100 50 L120 30 M100 150 L120 170
               M100 50 L80 30 M100 150 L80 170"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3"
            />
            <circle cx="100" cy="100" r="20" fill="#FFFFFF" opacity="0.3" />
            <text x="10" y="180" fontFamily="sans-serif" fontSize="16" fill="#FFFFFF">
              Biotechnology Innovations
            </text>
          </g>

          {/* Decorative Indian Cultural Border */}
          <rect
            x="10" y="10"
            width="980"
            height="780"
            fill="none"
            stroke="#7E22CE"
            strokeWidth="5"
            strokeDasharray="20,10"
          />
        </svg>
      </div>

      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(600px at var(--mouse-x) var(--mouse-y), rgba(255, 165, 0, 0.15), transparent 80%)',
            'radial-gradient(600px at var(--mouse-x) var(--mouse-y), rgba(0, 255, 255, 0.15), transparent 80%)',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{
          '--mouse-x': useTransform(mouseX, v => `${v}px`),
          '--mouse-y': useTransform(mouseY, v => `${v}px`),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
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
          <h2 className="text-4xl md:text-5xl font-bold text-rose-600 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 via-cyan-500 to-orange-500 mx-auto mb-8" />

          {/* Search and Filter Section */}
          <div className="max-w-xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-orange-500/20"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.label}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredFaqs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Alert>
                  <AlertDescription>
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
                    className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden relative"
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
          <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full">
            <Mail className="w-5 h-5 text-orange-500" />
            <span className="text-gray-300">Have more questions? Email us at</span>
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