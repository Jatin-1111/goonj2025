"use client"
import React, { useState, useEffect, memo } from 'react';
import Hero from './components/Hero';
import Gallery from './components/gallery';
import FAQ from './components/faqs';
import Preloader from './components/preloader';
import AboutSection from './components/about_home';
import Countdown from './components/countdown';
import EventsSection from './components/Events-carousel';
import GlimpseTimeline from './components/glimpse-timeline';

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

  // if (loading) {
  //   return <Preloader />;
  // }

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
        <Gallery />
      </section>

      {/* Glimpse Timeline Section */}
      <section id="timeline" className="relative z-40">
        <GlimpseTimeline />
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