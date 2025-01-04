"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ChevronDown, MessageCircleQuestion, Mail, Search, ArrowUpCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const FAQ = () => {
  // Component state management
  const [openIndex, setOpenIndex] = useState(null);            // Controls FAQ item expansion
  const [hoveredIndex, setHoveredIndex] = useState(null);      // Tracks hovered FAQ item
  const [searchQuery, setSearchQuery] = useState('');          // Search input value
  const [selectedCategory, setSelectedCategory] = useState('all');  // Selected filter category
  const [showScrollTop, setShowScrollTop] = useState(false);   // Controls scroll-to-top button
  const [isMounted, setIsMounted] = useState(false);          // Handles client-side rendering

  // FAQ data structure
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
      question: "Can first-year students participate?",
      answer: "Absolutely! Goonj welcomes participants from all years of study. There are special events designed specifically for first-year students to encourage their participation.",
      category: "eligibility"
    },
    {
      question: "Are there any prizes for the winners?",
      answer: "Yes, winners of various competitions will receive exciting prizes, including cash rewards, certificates, and sponsored gifts. The total prize pool for Goonj 2025 will be announced soon.",
      category: "prizes"
    },
  ];

  // Category definitions for filtering
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'general', label: 'General' },
    { id: 'event', label: 'Event Details' },
    { id: 'registration', label: 'Registration' },
    { id: 'events', label: 'Events' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'prizes', label: 'Prizes' },
  ];

  // Filter FAQs based on search query and selected category
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Client-side initialization
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Scroll handler for showing/hiding scroll-to-top button
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        setShowScrollTop(window.scrollY > 300);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Keyboard shortcuts handler
  useEffect(() => {
    if (typeof window !== 'undefined') {
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
    }
  }, []);

  // Wait for client-side rendering
  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-[#1A0F2E] py-20 relative overflow-hidden min-h-screen">
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
              <MessageCircleQuestion className="w-16 h-16 text-[#D6A531]" />
            </motion.div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#FEF8EF] mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#A41E34] via-[#D6A531] to-[#CC704B] mx-auto mb-8" />

          {/* Search Section */}
          <div className="max-w-xl mx-auto space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FEF8EF]/60" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-[#D6A531]/20 text-[#FEF8EF] placeholder:text-[#FEF8EF]/40 focus:ring-2 focus:ring-[#D6A531]/50"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "secondary"}
                  className={`cursor-pointer transition-all duration-300 ${selectedCategory === category.id
                    ? 'bg-[#D6A531] hover:bg-[#CC704B] text-[#1A0F2E]'
                    : 'bg-white/5 hover:bg-[#D6A531]/20 text-[#FEF8EF]'
                    }`}
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
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <motion.div
                  className="bg-white/5 backdrop-blur-md rounded-lg overflow-hidden relative border border-[#D6A531]/10"
                  animate={{
                    scale: hoveredIndex === index ? 1.02 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full text-left p-6 flex items-center justify-between group"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <span className="text-lg text-[#FEF8EF] font-medium pr-8 group-hover:text-[#D6A531] transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown className="w-6 h-6 text-[#D6A531]" />
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 pt-0"
                      >
                        <p className="text-[#FEF8EF]/80">{faq.answer}</p>
                        <div className="mt-4">
                          <Badge
                            variant="outline"
                            className="text-[#D6A531] border-[#D6A531]/30"
                          >
                            {categories.find(c => c.id === faq.category)?.label}
                          </Badge>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
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
          <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-[#D6A531]/20">
            <Mail className="w-5 h-5 text-[#D6A531]" />
            <span className="text-[#FEF8EF]/80">Have more questions?</span>
            <a
              href="mailto:contact@goonj2025.com"
              className="text-[#D6A531] hover:text-[#CC704B] font-medium transition-colors"
            >
              contact@goonj2025.com
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;