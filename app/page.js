"use client"
import React, { useState, useEffect, memo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import Gallery from './components/gallery';
import FAQ from './components/faqs';
import Preloader from './components/preloader';
import AboutSection from './components/about_home';
import EventTimeline from './components/glimpse-timeline';

// Memoized CountdownBox to prevent unnecessary re-renders
const CountdownBox = memo(({ value, label }) => (
  <div className="flex flex-col items-center">
    <div
      className="w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-orange-500/20 hover:scale-105 transition-transform duration-200"
    >
      <span className="text-3xl md:text-4xl font-bold text-white">
        {String(value).padStart(2, '0')}
      </span>
    </div>
    <div className="text-sm md:text-base text-white/80 uppercase tracking-wider mt-2">{label}</div>
  </div>
));

CountdownBox.displayName = 'CountdownBox';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    months: 0,
    weeks: 0
  });

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
        const totalDays = Math.floor(totalHours / 24);

        // Calculate months (approximate - assuming 30.44 days per month)
        const months = Math.floor(totalDays / 30.44);

        // Calculate weeks from remaining days after months
        const remainingDaysAfterMonths = totalDays % 30.44;
        const weeks = Math.floor(remainingDaysAfterMonths / 7);

        // Calculate remaining units
        const days = Math.floor(remainingDaysAfterMonths % 7);
        const hours = totalHours % 24;
        const minutes = totalMinutes % 60;
        const seconds = totalSeconds % 60;

        setTimeLeft((prev) => {
          if (
            prev.months === months &&
            prev.weeks === weeks &&
            prev.days === days &&
            prev.hours === hours &&
            prev.minutes === minutes &&
            prev.seconds === seconds
          ) {
            return prev;
          }
          return { months, weeks, days, hours, minutes, seconds };
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
        <Hero timeLeft={timeLeft} CountdownBox={CountdownBox} />
      </section>

      {/* About Section */}
      <section id="about" className="relative z-40">
        <AboutSection />
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="relative z-40">
        <Gallery />
      </section>

      {/* Glimpse Timeline Section */}
      <section id="timeline" className="relative z-40">
        <EventTimeline />
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-40">
        <FAQ />
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .stars {
          background-image: 
            radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 40px 70px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 50px 160px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 90px 40px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 130px 80px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 160px 120px, #ffffff, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          animation: float 3s ease-in-out infinite;
          width: 100%;
          height: 100%;
        }

        @keyframes subtle-zoom {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.05);
          }
        }

        .animate-subtle-zoom {
          animation: subtle-zoom 20s ease-in-out infinite alternate;
        }
      `}</style>
    </main>
  );
};

export default Home;