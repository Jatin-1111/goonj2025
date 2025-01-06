"use client"
import React, { useState, useEffect, memo } from 'react';
import Hero from './components/Hero';
import FAQ from './components/faqs';
import Preloader from './components/preloader';
import AboutSection from './components/about_home';
import Countdown from './components/countdown';
import EventsSection from './components/Events-carousel';
import GlimpseTimeline from './components/glimpse-timeline';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpCircle } from 'lucide-react';
import BentoGallery from './components/gallery';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    months: 0,
    weeks: 0
  });

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const targetDate = new Date('2025-02-19T00:00:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        // Calculate all time units
        const totalSeconds = Math.floor(difference / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const days = Math.floor(totalHours / 24);

        // Calculate remaining units
        const hours = totalHours % 24;
        const minutes = totalMinutes % 60;
        const seconds = totalSeconds % 60;

        setTimeLeft((prev) => {
          if (
            prev.days === days &&
            prev.hours === hours &&
            prev.minutes === minutes &&
            prev.seconds === seconds
          ) {
            return prev;
          }
          return { days, hours, minutes, seconds };
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <main className="relative">
      <section id="hero" className="relative z-40">
        <Hero timeLeft={timeLeft} Countdown={Countdown} />
      </section>

      {/* Events Carousel Section */}
      <section id="about" className="relative z-40">
        <EventsSection />
      </section>

      {/* About Section */}
      <section id="about" className="relative z-40">
        <AboutSection />
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="relative z-40">
        <BentoGallery />
      </section>

      {/* Glimpse Timeline Section */}
      <section id="timeline" className="relative z-40">
        <GlimpseTimeline />
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-40">
        <FAQ />
      </section>

      <section id="faq" className="relative z-50">
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
      </section>
    </main>
  );
};

export default Home;