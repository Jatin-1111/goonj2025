import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Goonj 2025?",
      answer: "Goonj 2025 is the annual Techno-Cultural fest of the University Institute of Engineering and Technology (UIET). It's a platform where technology meets culture, featuring various events, workshops, competitions, and performances."
    },
    {
      question: "When and where will Goonj 2025 take place?",
      answer: "Goonj 2025 will be held from February 19-21, 2025, at the UIET campus. The event spans three days filled with exciting activities and performances."
    },
    {
      question: "How can I register for Goonj 2025?",
      answer: "Registration will open soon through our official website. You can register either as an individual participant or as a team, depending on the events you're interested in. Stay tuned to our social media channels for registration updates."
    },
    {
      question: "What types of events can I participate in?",
      answer: "Goonj 2025 offers a wide range of events including technical competitions, hackathons, cultural performances, workshops, gaming tournaments, and more. Detailed event categories and schedules will be announced closer to the date."
    },
    {
      question: "Is there an accommodation facility for outstation participants?",
      answer: "Yes, we provide accommodation facilities for outstation participants. Details about accommodation and charges will be available during the registration process. Make sure to request accommodation while registering."
    },
    {
      question: "Can first-year students participate?",
      answer: "Absolutely! Goonj welcomes participants from all years of study. There are special events designed specifically for first-year students to encourage their participation."
    },
    {
      question: "Are there any prizes for the winners?",
      answer: "Yes, winners of various competitions will receive exciting prizes, including cash rewards, certificates, and sponsored gifts. The total prize pool for Goonj 2025 will be announced soon."
    },
    {
      question: "How can I volunteer for Goonj 2025?",
      answer: "We welcome volunteers who want to be part of organizing Goonj 2025. Volunteer registration forms will be available on our website. You can choose from various departments like event management, logistics, hospitality, etc."
    }
  ];

  return (
    <div className="bg-[#0D0221] py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(255, 165, 0, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, rgba(0, 255, 255, 0.05) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 via-cyan-500 to-orange-500 mx-auto"/>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 flex items-center justify-between hover:bg-white/10 transition-colors"
              >
                <span className="text-lg text-white font-medium pr-8">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
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
                    <div className="p-6 pt-0 text-gray-300">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-300">
            Still have questions? Feel free to reach out to us at
          </p>
          <a
            href="mailto:contact@goonj2025.com"
            className="text-orange-500 hover:text-orange-400 font-medium mt-2 inline-block"
          >
            contact@goonj2025.com
          </a>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64">
        <motion.div
          className="absolute inset-0 border-l-2 border-b-2 border-orange-500/20"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
      </div>
      <div className="absolute top-0 right-0 w-64 h-64">
        <motion.div
          className="absolute inset-0 border-r-2 border-t-2 border-cyan-500/20"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 2,
          }}
        />
      </div>
    </div>
  );
};

export default FAQ;