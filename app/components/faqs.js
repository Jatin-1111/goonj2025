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

  // Mouse trail effect setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const transformedX = useTransform(mouseX, v => `${v}px`);
  const transformedY = useTransform(mouseY, v => `${v}px`);

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

  // Mouse movement tracker for trail effect
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleMouseMove = (e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  // Utility function for scroll-to-top
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-2 bg-[#D6A531] text-[#1A0F2E] rounded-full shadow-lg hover:bg-[#CC704B] transition-colors"
          >
            <ArrowUpCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mouse Trail Effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-50"
        animate={{
          background: [
            `radial-gradient(20px at var(--mouse-x) var(--mouse-y), rgba(214,165,49,0.15), transparent)`,
            `radial-gradient(20px at var(--mouse-x) var(--mouse-y), rgba(164,30,52,0.15), transparent)`
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          '--mouse-x': transformedX,
          '--mouse-y': transformedY
        }}
      />
    </div>
  );
};

export default FAQ;



// FOR DARK THEME:

// return (
//   <div className="bg-[#1A0F2E] py-20 relative overflow-hidden min-h-screen">
//     {/* SVG Background Layer */}
//     <motion.div
//       className="absolute inset-0 overflow-hidden pointer-events-none"
//       animate={{
//         scale: openIndex !== null ? 1.1 : 1,
//         opacity: openIndex !== null ? 0.7 : 1
//       }}
//       transition={{
//         duration: 0.3,
//         ease: "easeInOut"
//       }}
//     >
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice">
//         <defs>
//           {/* Enhanced Gradient with Dark Theme Colors */}
//           <linearGradient id="south-indian-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#A41E34" stopOpacity="0.2" />
//             <stop offset="33%" stopColor="#CC704B" stopOpacity="0.15" />
//             <stop offset="66%" stopColor="#D6A531" stopOpacity="0.15" />
//             <stop offset="100%" stopColor="#B87333" stopOpacity="0.2" />
//           </linearGradient>

//           {/* Dark Theme Kolam Pattern */}
//           <pattern id="kolam-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
//             <path d="M25 25 L75 25 L75 75 L25 75 Z M50 0 L100 50 L50 100 L0 50 Z"
//               fill="none" stroke="#B87333" strokeWidth="0.5" opacity="0.15" />
//             <circle cx="50" cy="50" r="25" fill="none" stroke="#CC704B" strokeWidth="0.5" opacity="0.15" />
//             <path d="M25 50 Q50 25, 75 50 Q50 75, 25 50" fill="none" stroke="#D6A531" strokeWidth="0.5" opacity="0.15" />
//           </pattern>

//           {/* Dark Theme Traditional Pattern */}
//           <pattern id="traditional-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
//             <path d="M50 0 Q75 50, 50 100 Q25 50, 50 0" fill="none" stroke="#A41E34" strokeWidth="1" opacity="0.1" />
//             <circle cx="50" cy="50" r="5" fill="#CC704B" opacity="0.1" />
//           </pattern>

//           {/* Dark Theme Motif Pattern */}
//           <pattern id="motif-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
//             <path d="M30 0 Q45 30, 30 60 Q15 30, 30 0" fill="none" stroke="#D6A531" strokeWidth="0.5" opacity="0.1" />
//           </pattern>
//         </defs>

//         {/* Background Layers */}
//         <rect width="1000" height="800" fill="#1A0F2E" />
//         <rect width="1000" height="800" fill="url(#kolam-pattern)" />
//         <rect width="1000" height="800" fill="url(#south-indian-gradient)" opacity="0.15" />
//         <rect width="1000" height="800" fill="url(#traditional-pattern)" opacity="0.1" />
//         <rect width="1000" height="800" fill="url(#motif-pattern)" opacity="0.1" />

//         {/* Cultural Elements */}
//         <g transform="translate(300,300)">
//           <path d="M0 0 Q50 -25, 100 0 Q150 25, 100 50 Q50 75, 0 50 Z"
//             fill="none" stroke="#A41E34" strokeWidth="2" opacity="0.2" />
//           <path d="M90 0 L90 50" stroke="#CC704B" strokeWidth="1" opacity="0.2" />
//           <circle cx="90" cy="10" r="5" fill="#D6A531" opacity="0.2" />
//           <circle cx="90" cy="40" r="5" fill="#D6A531" opacity="0.2" />
//         </g>

//         {/* Border with Traditional Pattern */}
//         <rect x="20" y="20" width="960" height="760"
//           fill="none" stroke="#D6A531" strokeWidth="15" opacity="0.1" />

//         {/* Corner Elements */}
//         <g opacity="0.2">
//           <path d="M0 0 L50 0 L50 50 L0 50 Q25 25, 0 0 Z" fill="#A41E34" transform="translate(30,30)" />
//           <path d="M0 0 L50 0 L50 50 L0 50 Q25 25, 0 0 Z" fill="#A41E34" transform="translate(920,30) scale(-1,1)" />
//           <path d="M0 0 L50 0 L50 50 L0 50 Q25 25, 0 0 Z" fill="#A41E34" transform="translate(30,720) scale(1,-1)" />
//           <path d="M0 0 L50 0 L50 50 L0 50 Q25 25, 0 0 Z" fill="#A41E34" transform="translate(920,720) scale(-1,-1)" />
//         </g>

//         {/* Scripts with Dark Theme Colors */}
//         <text x="500" y="750" textAnchor="middle" fontFamily="Tamil" fontSize="40"
//           fill="#FEF8EF" opacity="0.1" transform="rotate(-5 500 750)">
//           தென்னிந்திய கலாச்சாரம்
//         </text>
//         <text x="500" y="700" textAnchor="middle" fontFamily="Malayalam" fontSize="30"
//           fill="#FEF8EF" opacity="0.1" transform="rotate(5 500 700)">
//           തെക്കേ ഇന്ത്യൻ സംസ്കാരം
//         </text>
//       </svg>
//     </motion.div>

//     <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//       {/* Header Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6 }}
//         className="text-center mb-16"
//       >
//         <div className="flex justify-center mb-6">
//           <motion.div
//             animate={{
//               scale: [1, 1.1, 1],
//               rotate: [0, 5, -5, 0]
//             }}
//             transition={{
//               duration: 4,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//           >
//             <MessageCircleQuestion className="w-16 h-16 text-[#D6A531]" />
//           </motion.div>
//         </div>
//         <h2 className="text-4xl md:text-5xl font-bold text-[#FEF8EF] mb-4">
//           Frequently Asked Questions
//         </h2>
//         <div className="w-24 h-1 bg-gradient-to-r from-[#A41E34] via-[#D6A531] to-[#CC704B] mx-auto mb-8" />

//         {/* Search Section */}
//         <div className="max-w-xl mx-auto space-y-6">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FEF8EF]/60" />
//             <Input
//               type="text"
//               placeholder="Search FAQs..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10 bg-white/5 border-[#D6A531]/20 text-[#FEF8EF] placeholder:text-[#FEF8EF]/40 focus:ring-2 focus:ring-[#D6A531]/50"
//             />
//           </div>

//           <div className="flex flex-wrap gap-2 justify-center">
//             {categories.map((category) => (
//               <Badge
//                 key={category.id}
//                 variant={selectedCategory === category.id ? "default" : "secondary"}
//                 className={`cursor-pointer transition-all duration-300 ${selectedCategory === category.id
//                     ? 'bg-[#D6A531] hover:bg-[#CC704B] text-[#1A0F2E]'
//                     : 'bg-white/5 hover:bg-[#D6A531]/20 text-[#FEF8EF]'
//                   }`}
//                 onClick={() => setSelectedCategory(category.id)}
//               >
//                 {category.label}
//               </Badge>
//             ))}
//           </div>
//         </div>
//       </motion.div>

//       {/* FAQ Items */}
//       <div className="space-y-6">
//         <AnimatePresence>
//           {filteredFaqs.map((faq, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ delay: index * 0.1 }}
//               className="relative"
//             >
//               <motion.div
//                 className="absolute inset-0 bg-gradient-to-r from-[#A41E34]/10 to-[#D6A531]/10 rounded-lg blur-xl"
//                 animate={{
//                   opacity: hoveredIndex === index ? 1 : 0,
//                   scale: hoveredIndex === index ? 1.02 : 1
//                 }}
//                 transition={{ duration: 0.3 }}
//               />
//               <motion.div
//                 className="bg-white/5 backdrop-blur-md rounded-lg overflow-hidden relative border border-[#D6A531]/10"
//                 animate={{
//                   scale: hoveredIndex === index ? 1.02 : 1
//                 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <button
//                   onClick={() => setOpenIndex(openIndex === index ? null : index)}
//                   className="w-full text-left p-6 flex items-center justify-between group"
//                 >
//                   <span className="text-lg text-[#FEF8EF] font-medium pr-8 group-hover:text-[#D6A531] transition-colors">
//                     {faq.question}
//                   </span>
//                   <ChevronDown className="w-6 h-6 text-[#D6A531]" />
//                 </button>

//                 <AnimatePresence>
//                   {openIndex === index && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="p-6 pt-0"
//                     >
//                       <p className="text-[#FEF8EF]/80">{faq.answer}</p>
//                       <div className="mt-4">
//                         <Badge
//                           variant="outline"
//                           className="text-[#D6A531] border-[#D6A531]/30"
//                         >
//                           {categories.find(c => c.id === faq.category)?.label}
//                         </Badge>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>

//       {/* Contact Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ delay: 0.5 }}
//         className="mt-16 text-center"
//       >
//         <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-[#D6A531]/20">
//           <Mail className="w-5 h-5 text-[#D6A531]" />
//           <span className="text-[#FEF8EF]/80">Have more questions?</span>
//           <a
//             href="mailto:contact@goonj2025.com"
//             className="text-[#D6A531] hover:text-[#CC704B] font-medium transition-colors"
//           >
//             contact@goonj2025.com
//           </a>
//         </div>
//       </motion.div>
//     </div>

//     {/* Scroll to Top Button */}
//     <AnimatePresence>
//       {showScrollTop && (
//         <motion.button
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.8 }}
//           onClick={scrollToTop}
//           className="fixed bottom-8 right-8 p-2 bg-[#D6A531] text-[#1A0F2E] rounded-full shadow-lg hover:bg-[#CC704B] transition-colors"
//         >
//           <ArrowUpCircle className="w-6 h-6" />
//         </motion.button>
//       )}
//     </AnimatePresence>

//     {/* Mouse Trail Effect */}
//     <motion.div
//       className="fixed inset-0 pointer-events-none z-50"
//       animate={{
//         background: [
//           `radial-gradient(20px at var(--mouse-x) var(--mouse-y), rgba(${parseInt("#D6A531".slice(1, 3), 16)},${parseInt("#D6A531".slice(3, 5), 16)},${parseInt("#D6A531".slice(5, 7), 16)},0.15), transparent)`,
//           `radial-gradient(20px at var(--mouse-x) var(--mouse-y), rgba(${parseInt("#A41E34".slice(1, 3), 16)},${parseInt("#A41E34".slice(3, 5), 16)},${parseInt("#A41E34".slice(5, 7), 16)},0.15), transparent)`
//         ]
//       }}
//       transition={{ duration: 2, repeat: Infinity }}
//       style={{
//         '--mouse-x': useTransform(mouseX, v => `${v}px`),
//         '--mouse-y': useTransform(mouseY, v => `${v}px`)
//       }}
//     />

//     {/* Decorative Elements */}
//     <div className="absolute bottom-0 left-0 w-96 h-96 -translate-x-1/2 translate-y-1/2">
//       <motion.div
//         className="absolute inset-0 border-l-2 border-b-2 border-[#D6A531]/20 rounded-full"
//         animate={{
//           rotate: 360,
//           scale: [1, 1.1, 1],
//           opacity: [0.1, 0.2, 0.1],
//         }}
//         transition={{
//           rotate: { duration: 20, repeat: Infinity, ease: "linear" },
//           scale: { duration: 4, repeat: Infinity },
//           opacity: { duration: 4, repeat: Infinity },
//         }}
//       />
//     </div>
//     <div className="absolute top-0 right-0 w-96 h-96 translate-x-1/2 -translate-y-1/2">
//       <motion.div
//         className="absolute inset-0 border-r-2 border-t-2 border-[#A41E34]/20 rounded-full"
//         animate={{
//           rotate: -360,
//           scale: [1, 1.1, 1],
//           opacity: [0.1, 0.2, 0.1],
//         }}
//         transition={{
//           rotate: { duration: 20, repeat: Infinity, ease: "linear" },
//           scale: { duration: 4, repeat: Infinity, delay: 2 },
//           opacity: { duration: 4, repeat: Infinity, delay: 2 },
//         }}
//       />
//     </div>

//     {/* Additional Decorative Elements */}
//     <div className="absolute top-1/4 left-1/4 w-64 h-64">
//       <motion.div
//         className="absolute inset-0 border border-[#CC704B]/10 rounded-full"
//         animate={{
//           scale: [1, 1.2, 1],
//           opacity: [0.1, 0.2, 0.1],
//         }}
//         transition={{
//           duration: 6,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }}
//       />
//     </div>

//     {/* Traditional Ornamental Corners */}
//     <div className="absolute top-0 left-0 w-32 h-32">
//       <motion.div
//         className="absolute inset-0"
//         animate={{
//           opacity: [0.1, 0.2, 0.1],
//         }}
//         transition={{
//           duration: 4,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }}
//       >
//         <svg viewBox="0 0 100 100">
//           <path
//             d="M0 0 L100 0 L100 20 C60 20 20 60 20 100 L0 100 Z"
//             fill="#D6A531"
//             opacity="0.1"
//           />
//         </svg>
//       </motion.div>
//     </div>
//     <div className="absolute top-0 right-0 w-32 h-32">
//       <motion.div
//         className="absolute inset-0"
//         animate={{
//           opacity: [0.1, 0.2, 0.1],
//         }}
//         transition={{
//           duration: 4,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }}
//       >
//         <svg viewBox="0 0 100 100">
//           <path
//             d="M0 0 L100 0 L100 100 L80 100 C80 60 40 20 0 20 Z"
//             fill="#D6A531"
//             opacity="0.1"
//           />
//         </svg>
//       </motion.div>
//     </div>

//     {/* Floating Particles Effect */}
//     <div className="absolute inset-0 pointer-events-none">
//       {Array.from({ length: 20 }).map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-2 h-2 rounded-full bg-[#D6A531]"
//           style={{
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//           }}
//           animate={{
//             y: [0, -20, 0],
//             opacity: [0.1, 0.2, 0.1],
//           }}
//           transition={{
//             duration: 3 + Math.random() * 2,
//             repeat: Infinity,
//             delay: Math.random() * 2,
//           }}
//         />
//       ))}
//     </div>

//     {/* Background Gradient Animation */}
//     <div
//       className="absolute inset-0 pointer-events-none"
//       style={{
//         background: 'radial-gradient(circle at 50% 50%, rgba(214, 165, 49, 0.03) 0%, rgba(26, 15, 46, 0) 50%)',
//       }}
//     >
//       <motion.div
//         className="absolute inset-0"
//         animate={{
//           background: [
//             'radial-gradient(circle at 30% 30%, rgba(164, 30, 52, 0.03) 0%, rgba(26, 15, 46, 0) 50%)',
//             'radial-gradient(circle at 70% 70%, rgba(204, 112, 75, 0.03) 0%, rgba(26, 15, 46, 0) 50%)',
//           ]
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }}
//       />
//     </div>
//   </div>
// );







// FOR LIGHT THEME

// return (
//   <div className="bg-[#F3E8D5] py-20 relative overflow-hidden min-h-screen">
//     {/* SVG Background Layer */}
//     <motion.div
//       className="absolute inset-0 overflow-hidden pointer-events-none"
//       animate={{
//         scale: openIndex !== null ? 1.1 : 1,
//         opacity: openIndex !== null ? 0.7 : 1
//       }}
//       transition={{
//         duration: 0.3,
//         ease: "easeInOut"
//       }}
//     >
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice">
//         <defs>
//           {/* Enhanced Gradient with New Color Palette */}
//           <linearGradient id="south-indian-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#A41E34" stopOpacity="0.4" />
//             <stop offset="33%" stopColor="#CC704B" stopOpacity="0.3" />
//             <stop offset="66%" stopColor="#D6A531" stopOpacity="0.3" />
//             <stop offset="100%" stopColor="#B87333" stopOpacity="0.3" />
//           </linearGradient>

//           {/* More Complex Kolam Pattern */}
//           <pattern id="kolam-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
//             <path d="M25 25 L75 25 L75 75 L25 75 Z M50 0 L100 50 L50 100 L0 50 Z"
//               fill="none" stroke="#B87333" strokeWidth="0.5" opacity="0.2" />
//             <circle cx="50" cy="50" r="25" fill="none" stroke="#CC704B" strokeWidth="0.5" opacity="0.2" />
//             <path d="M25 50 Q50 25, 75 50 Q50 75, 25 50" fill="none" stroke="#D6A531" strokeWidth="0.5" opacity="0.2" />
//           </pattern>

//           {/* Enhanced Jasmine Pattern */}
//           <pattern id="jasmine-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
//             <circle cx="25" cy="25" r="10" fill="#FEF8EF" opacity="0.1" />
//             <circle cx="25" cy="25" r="5" fill="#F3E8D5" opacity="0.2" />
//             <path d="M25 15 Q30 20, 25 25 Q20 30, 15 25" fill="none" stroke="#FEF8EF" strokeWidth="0.5" opacity="0.2" />
//             <path d="M25 15 Q20 20, 25 25 Q30 30, 35 25" fill="none" stroke="#FEF8EF" strokeWidth="0.5" opacity="0.2" />
//           </pattern>

//           {/* Enhanced Temple Gopuram Pattern */}
//           <pattern id="gopuram-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
//             <path d="M0 200 L100 0 L200 200 Z" fill="none" stroke="#A41E34" strokeWidth="1" opacity="0.15" />
//             <path d="M50 200 L100 50 L150 200 Z" fill="none" stroke="#CC704B" strokeWidth="1" opacity="0.15" />
//             <path d="M25 200 L100 25 L175 200" fill="none" stroke="#D6A531" strokeWidth="1" opacity="0.15" />
//           </pattern>

//           {/* Enhanced Traditional Patterns */}
//           <pattern id="traditional-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
//             <path d="M50 0 Q75 50, 50 100 Q25 50, 50 0" fill="none" stroke="#B87333" strokeWidth="1" opacity="0.2" />
//             <circle cx="50" cy="50" r="5" fill="#CC704B" opacity="0.2" />
//           </pattern>

//           {/* Traditional Motif Pattern */}
//           <pattern id="motif-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
//             <path d="M30 0 Q45 30, 30 60 Q15 30, 30 0" fill="none" stroke="#D6A531" strokeWidth="0.5" opacity="0.2" />
//           </pattern>
//         </defs>

//         {/* Background Layers */}
//         <rect width="1000" height="800" fill="#F3E8D5" />
//         <rect width="1000" height="800" fill="url(#kolam-pattern)" />
//         <rect width="1000" height="800" fill="url(#south-indian-gradient)" opacity="0.2" />
//         <rect width="1000" height="800" fill="url(#jasmine-pattern)" opacity="0.1" />
//         <rect width="1000" height="800" fill="url(#traditional-pattern)" opacity="0.1" />
//         <rect width="1000" height="800" fill="url(#motif-pattern)" opacity="0.1" />

//         {/* Enhanced Cultural Elements */}
//         <g transform="translate(300,300)">
//           <path d="M0 0 Q50 -25, 100 0 Q150 25, 100 50 Q50 75, 0 50 Z"
//             fill="none" stroke="#A41E34" strokeWidth="2" opacity="0.3" />
//           <path d="M90 0 L90 50" stroke="#CC704B" strokeWidth="1" opacity="0.3" />
//           <circle cx="90" cy="10" r="5" fill="#D6A531" opacity="0.3" />
//           <circle cx="90" cy="40" r="5" fill="#D6A531" opacity="0.3" />
//         </g>

//         {/* Traditional Design Elements */}
//         <g transform="translate(700, 200) scale(0.5)">
//           <path d="M0 0 Q50 -20, 100 0 Q150 20, 100 40 Q50 60, 0 40 Z"
//             fill="none" stroke="#A41E34" strokeWidth="3" opacity="0.4" />
//           <circle cx="30" cy="20" r="5" fill="#CC704B" opacity="0.4" />
//           <circle cx="70" cy="20" r="5" fill="#CC704B" opacity="0.4" />
//         </g>

//         {/* Border with Traditional Pattern */}
//         <rect x="20" y="20" width="960" height="760"
//           fill="none" stroke="#D6A531" strokeWidth="15" opacity="0.3" />

//         {/* Corner Elements */}
//         <g opacity="0.4">
//           <path d="M0 0 L50 0 L50 50 L0 50 Q25 25, 0 0 Z" fill="#A41E34" transform="translate(30,30)" />
//           <path d="M0 0 L50 0 L50 50 L0 50 Q25 25, 0 0 Z" fill="#A41E34" transform="translate(920,30) scale(-1,1)" />
//           <path d="M0 0 L50 0 L50 50 L0 50 Q25 25, 0 0 Z" fill="#A41E34" transform="translate(30,720) scale(1,-1)" />
//           <path d="M0 0 L50 0 L50 50 L0 50 Q25 25, 0 0 Z" fill="#A41E34" transform="translate(920,720) scale(-1,-1)" />
//         </g>

//         {/* South Indian Scripts */}
//         <text x="500" y="750" textAnchor="middle" fontFamily="Tamil" fontSize="40"
//           fill="#4A4A4A" transform="rotate(-5 500 750)">
//           தென்னிந்திய கலாச்சாரம்
//         </text>
//         <text x="500" y="700" textAnchor="middle" fontFamily="Malayalam" fontSize="30"
//           fill="#4A4A4A" transform="rotate(5 500 700)">
//           തെക്കേ ഇന്ത്യൻ സംസ്കാരം
//         </text>
//       </svg>
//     </motion.div>

//     {/* Background Animation */}
//     <motion.div
//       className="absolute inset-0 pointer-events-none"
//       animate={{
//         background: [
//           `radial-gradient(600px at var(--mouse-x) var(--mouse-y), rgba(${parseInt("#D6A531".slice(1, 3), 16)}, ${parseInt("#D6A531".slice(3, 5), 16)}, ${parseInt("#D6A531".slice(5, 7), 16)}, 0.1), transparent 80%)`,
//           `radial-gradient(600px at var(--mouse-x) var(--mouse-y), rgba(${parseInt("#CC704B".slice(1, 3), 16)}, ${parseInt("#CC704B".slice(3, 5), 16)}, ${parseInt("#CC704B".slice(5, 7), 16)}, 0.1), transparent 80%)`,
//         ]
//       }}
//       transition={{ duration: 10, repeat: Infinity }}
//       style={{
//         '--mouse-x': useTransform(mouseX, v => `${v}px`),
//         '--mouse-y': useTransform(mouseY, v => `${v}px`),
//       }}
//     />

//     <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//       {/* Header Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6 }}
//         className="text-center mb-16"
//       >
//         <div className="flex justify-center mb-6">
//           <motion.div
//             animate={{
//               scale: [1, 1.1, 1],
//               rotate: [0, 5, -5, 0]
//             }}
//             transition={{
//               duration: 4,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//           >
//             <MessageCircleQuestion className="w-16 h-16 text-[#A41E34]" />
//           </motion.div>
//         </div>
//         <h2 className="text-4xl md:text-5xl font-bold text-[#4A4A4A] mb-4">
//           Frequently Asked Questions
//         </h2>
//         <div className="w-24 h-1 bg-gradient-to-r from-[#A41E34] via-[#D6A531] to-[#CC704B] mx-auto mb-8" />

//         {/* Search and Filter Section */}
//         <div className="max-w-xl mx-auto space-y-6">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
//             <Input
//               type="text"
//               placeholder="Search FAQs..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10 bg-white/10 border-[#D6A531]/20 text-[#4A4A4A] placeholder:text-[#4A4A4A]/60 focus:ring-2 focus:ring-[#A41E34]/50"
//             />
//           </div>

//           <div className="flex flex-wrap gap-2 justify-center">
//             {categories.map((category) => (
//               <Badge
//                 key={category.id}
//                 variant={selectedCategory === category.id ? "default" : "secondary"}
//                 className="cursor-pointer hover:bg-[#A41E34]/30 transition-all duration-300"
//                 onClick={() => setSelectedCategory(category.id)}
//               >
//                 {category.label}
//               </Badge>
//             ))}
//           </div>
//         </div>
//       </motion.div>

//       {/* FAQ Items */}
//       <div className="space-y-6">
//         <AnimatePresence>
//           {filteredFaqs.map((faq, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ delay: index * 0.1 }}
//               className="relative"
//             >
//               <motion.div
//                 className="absolute inset-0 bg-gradient-to-r from-[#A41E34]/20 to-[#D6A531]/20 rounded-lg blur-xl"
//                 animate={{
//                   opacity: hoveredIndex === index ? 1 : 0,
//                   scale: hoveredIndex === index ? 1.02 : 1
//                 }}
//                 transition={{ duration: 0.3 }}
//               />
//               <motion.div
//                 className="bg-[#FEF8EF]/80 backdrop-blur-md rounded-lg overflow-hidden relative border border-[#D6A531]/20"
//                 animate={{
//                   scale: hoveredIndex === index ? 1.02 : 1
//                 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <button
//                   onClick={() => setOpenIndex(openIndex === index ? null : index)}
//                   className="w-full text-left p-6 flex items-center justify-between group"
//                 >
//                   <span className="text-lg text-[#4A4A4A] font-medium pr-8 group-hover:text-[#A41E34] transition-colors">
//                     {faq.question}
//                   </span>
//                   <ChevronDown className="w-6 h-6 text-[#A41E34]" />
//                 </button>

//                 <AnimatePresence>
//                   {openIndex === index && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="p-6 pt-0"
//                     >
//                       <p className="text-[#4A4A4A]">{faq.answer}</p>
//                       <div className="mt-4">
//                         <Badge variant="outline" className="text-[#A41E34] border-[#A41E34]/30">
//                           {categories.find(c => c.id === faq.category)?.label}
//                         </Badge>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>

//       {/* Contact Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ delay: 0.5 }}
//         className="mt-16 text-center"
//       >
//         <div className="inline-flex items-center space-x-3 bg-[#FEF8EF]/10 backdrop-blur-md px-6 py-3 rounded-full border border-[#D6A531]/20">
//           <Mail className="w-5 h-5 text-[#A41E34]" />
//           <span className="text-[#4A4A4A]">Have more questions?</span>
//           <a
//             href="mailto:contact@goonj2025.com"
//             className="text-[#A41E34] hover:text-[#CC704B] font-medium transition-colors"
//           >
//             contact@goonj2025.com
//           </a>
//         </div>
//       </motion.div>
//     </div>

//     {/* Scroll to Top Button */}
//     <AnimatePresence>
//       {showScrollTop && (
//         <motion.button
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.8 }}
//           onClick={scrollToTop}
//           className="fixed bottom-8 right-8 p-2 bg-[#A41E34] text-[#FEF8EF] rounded-full shadow-lg hover:bg-[#CC704B] transition-colors"
//         >
//           <ArrowUpCircle className="w-6 h-6" />
//         </motion.button>
//       )}
//     </AnimatePresence>

//     {/* Decorative Elements */}
//     <div className="absolute bottom-0 left-0 w-96 h-96 -translate-x-1/2 translate-y-1/2">
//       <motion.div
//         className="absolute inset-0 border-l-2 border-b-2 border-[#A41E34]/20 rounded-full"
//         animate={{
//           rotate: 360,
//           scale: [1, 1.1, 1],
//           opacity: [0.2, 0.4, 0.2],
//         }}
//         transition={{
//           rotate: { duration: 20, repeat: Infinity, ease: "linear" },
//           scale: { duration: 4, repeat: Infinity },
//           opacity: { duration: 4, repeat: Infinity },
//         }}
//       />
//     </div>
//     <div className="absolute top-0 right-0 w-96 h-96 translate-x-1/2 -translate-y-1/2">
//       <motion.div
//         className="absolute inset-0 border-r-2 border-t-2 border-[#D6A531]/20 rounded-full"
//         animate={{
//           rotate: -360,
//           scale: [1, 1.1, 1],
//           opacity: [0.2, 0.4, 0.2],
//         }}
//         transition={{
//           rotate: { duration: 20, repeat: Infinity, ease: "linear" },
//           scale: { duration: 4, repeat: Infinity, delay: 2 },
//           opacity: { duration: 4, repeat: Infinity, delay: 2 },
//         }}
//       />
//     </div>

//     {/* Mouse Trail Effect */}
//     <motion.div
//       className="fixed inset-0 pointer-events-none z-50"
//       animate={{
//         background: [
//           `radial-gradient(20px at var(--mouse-x) var(--mouse-y), rgba(${parseInt("#A41E34".slice(1, 3), 16)},${parseInt("#A41E34".slice(3, 5), 16)},${parseInt("#A41E34".slice(5, 7), 16)},0.15), transparent)`,
//           `radial-gradient(20px at var(--mouse-x) var(--mouse-y), rgba(${parseInt("#D6A531".slice(1, 3), 16)},${parseInt("#D6A531".slice(3, 5), 16)},${parseInt("#D6A531".slice(5, 7), 16)},0.15), transparent)`
//         ]
//       }}
//       transition={{ duration: 2, repeat: Infinity }}
//       style={{
//         '--mouse-x': useTransform(mouseX, v => `${v}px`),
//         '--mouse-y': useTransform(mouseY, v => `${v}px`)
//       }}
//     />
//   </div>
// );