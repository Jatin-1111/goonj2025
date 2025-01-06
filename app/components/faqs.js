"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircleQuestion, Mail, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMounted, setIsMounted] = useState(false);

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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#0D0221] py-20 relative overflow-hidden min-h-screen">
      {/* Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-purple-900/10 to-indigo-900/10 animate-[pulse_10s_infinite]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="flex justify-center mb-6"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="p-4 rounded-lg bg-orange-500/10">
              <MessageCircleQuestion className="w-12 h-12 text-orange-500" />
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-1 bg-gradient-to-r from-orange-500 via-cyan-500 to-orange-500 mx-auto mb-8 rounded"
          />

          {/* Search Section */}
          <div className="max-w-xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-cyan-500/20 text-white placeholder:text-gray-400 
                  focus:ring-2 focus:ring-cyan-500/50 hover:border-cyan-500/40 transition-all duration-300"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-2 justify-center"
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  <Badge
                    variant={selectedCategory === category.id ? "default" : "secondary"}
                    className={`cursor-pointer transition-all duration-300 ${selectedCategory === category.id
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-white'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border-cyan-500/20'
                      }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.label}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="w-full p-6 bg-white/5 rounded-lg border border-cyan-500/20
                    hover:bg-white/10 hover:border-cyan-500/40 transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full text-left flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="p-2 rounded-lg bg-orange-500/10"
                      >
                        <MessageCircleQuestion className="text-orange-500 w-6 h-6" />
                      </motion.div>
                      <span className="text-xl font-semibold text-white group-hover:text-orange-500 transition-colors duration-300">
                        {faq.question}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                    >
                      <ChevronDown className="w-6 h-6 text-cyan-500" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                        className="mt-6 space-y-4"
                      >
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="flex items-center mb-3">
                            <div className="w-1 h-4 bg-gradient-to-b from-cyan-500 to-purple-500 rounded mr-2" />
                            <h4 className="text-lg font-semibold text-cyan-500">Answer</h4>
                          </div>
                          <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="pt-4"
                        >
                          <Badge
                            variant="outline"
                            className="text-purple-500 border-purple-500/30 bg-purple-500/10"
                          >
                            {categories.find(c => c.id === faq.category)?.label}
                          </Badge>
                        </motion.div>
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
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center space-x-3 bg-white/5 px-6 py-3 rounded-lg 
              border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
          >
            <div className="p-2 rounded-lg bg-orange-500/10">
              <Mail className="w-5 h-5 text-orange-500" />
            </div>
            <span className="text-gray-300">Have more questions?</span>
            <a
              href="mailto:contact@goonj2025.com"
              className="text-cyan-500 hover:text-cyan-400 font-medium transition-colors"
            >
              contact@goonj2025.com
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;